import { MyInfo, MyInfoResponse } from "@/types/user/MyInfo";
import { apiClient, apiClientCached } from "@/utils/axios/api";
import { getSession } from "next-auth/react";
import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

interface UserStore extends MyInfo {
  loaded: boolean;
  imageLoaded: boolean;
  image?: string;
  energyTimeout: NodeJS.Timeout | null;
  startCheckEnergyTimeout: (recoverAt: Date) => void;
  updateEnergy: () => void;
  fetchUserInfo: () => Promise<void>;
}

const userStore: StateCreator<UserStore, [["zustand/devtools", never]]> = (
  set,
  get
) => ({
  loaded: false,
  imageLoaded: false,
  id: "0",
  name: "",
  email: "",
  level: 1,
  energy: 0,
  recoverAt: new Date(),
  unreadMails: 0,
  gold: 0,
  exp: 0,
  expNeeded: 0,
  energyTimeout: null,
  startCheckEnergyTimeout: (recoverAt: Date) => {
    let energyTimeout = get().energyTimeout;
    if (energyTimeout) {
      clearTimeout(energyTimeout);
    }

    const checkTime = recoverAt.getTime() - Date.now();
    if (checkTime < 0) {
      return;
    }
    energyTimeout = setTimeout(async () => {
      get().updateEnergy();
    }, checkTime);

    set(
      {
        energyTimeout,
      },
      false,
      "setEnergyTimeout"
    );
  },
  updateEnergy: async () => {
    const energyInfo = (await apiClient.get("users/me/energy")).data;
    set(
      {
        energy: energyInfo.energy,
        recoverAt: new Date(energyInfo.recoverAt),
      },
      false,
      "updateUserEnergy"
    );

    get().startCheckEnergyTimeout(new Date(energyInfo.recoverAt));
  },
  fetchUserInfo: async () => {
    try {
      const user = getSession();
      const userInfo = (await apiClient.get<MyInfoResponse>("/users/me")).data;
      userInfo.recoverAt = new Date(userInfo.recoverAt);

      get().startCheckEnergyTimeout(userInfo.recoverAt);

      set(
        {
          loaded: true,
          imageLoaded: false,
          image: undefined,
          ...user,
          ...userInfo,
        },
        false,
        "setUserInfo"
      );

      const imageBlob = await apiClientCached.get("/users/me/image", {
        responseType: "blob",
      });

      if (imageBlob.data) {
        const image = URL.createObjectURL(imageBlob.data);

        set(
          {
            imageLoaded: true,
            image: image,
          },
          false,
          "setImage"
        );
      } else {
        set(
          {
            imageLoaded: true,
          },
          false,
          "noImage"
        );
      }
    } catch (err) {
      console.log(err);
    }
  },
});

const useUserStore = create<UserStore>()(
  devtools(userStore, { name: "userStore" })
);

export default useUserStore;

import { UserInfo } from "@/types/user/UserInfo";
import { apiClient } from "@/utils/axios/api";
import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

interface UserStore extends UserInfo {
  loaded: boolean;
  energyTimeout: NodeJS.Timeout | null;
  startCheckEnergyTimeout: (recoverAt: Date) => void;
  setUserInfo: (user: UserInfo) => void;
}

const userStore: StateCreator<UserStore, [["zustand/devtools", never]]> = (
  set,
  get
) => ({
  loaded: false,
  id: "0",
  name: "",
  email: "",
  level: 1,
  energy: 0,
  recoverAt: new Date(),
  unreadEmails: 0,
  gold: 0,
  exp: 0,
  energyTimeout: null,
  startCheckEnergyTimeout: (recoverAt: Date) => {
    let energyTimeout = get().energyTimeout;
    if (energyTimeout) {
      clearTimeout(energyTimeout);
    }

    const checkTime = recoverAt.getTime() - Date.now();
    energyTimeout = setTimeout(async () => {
      const energyInfo = (await apiClient.get("users/me/energy")).data;
      set(
        {
          energy: energyInfo.energy,
          recoverAt: new Date(energyInfo.recoverAt),
        },
        false,
        "setUserEnergy"
      );

      get().startCheckEnergyTimeout(new Date(energyInfo.recoverAt));
    }, checkTime);

    set(
      {
        energyTimeout,
      },
      false,
      "setEnergyTimeout"
    );
  },
  setUserInfo: (user: UserInfo) => {
    get().startCheckEnergyTimeout(new Date(user.recoverAt));

    set(
      {
        loaded: true,
        ...user,
        recoverAt: new Date(user.recoverAt),
      },
      false,
      "setUserInfo"
    );
  },
});

const useUserStore = create<UserStore>()(
  devtools(userStore, { name: "userStore" })
);

export default useUserStore;

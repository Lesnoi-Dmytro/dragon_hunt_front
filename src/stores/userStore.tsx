import { UserInfo } from "@/types/user/UserInfo";
import { apiClient } from "@/utils/axios/api";
import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

interface UserStore extends UserInfo {
  loaded: boolean;
  energyTimeout: NodeJS.Timeout | null;
  setUserInfo: (user: UserInfo) => void;
}

function startCheckEnergyTimeout(set: any, recoverAt: Date) {
  const checkTime = recoverAt.getTime() - Date.now();

  return setTimeout(async () => {
    const energyInfo = (await apiClient.get("users/me/energy")).data;
    const energyTimeout = startCheckEnergyTimeout(
      set,
      new Date(energyInfo.recoverAt)
    );

    set(
      {
        energy: energyInfo.energy,
        recoverAt: new Date(energyInfo.recoverAt),
        energyTimeout,
      },
      false,
      "setUserEnergy"
    );
  }, checkTime);
}

const userStore: StateCreator<UserStore, [["zustand/devtools", never]]> = (
  set,
  get
) => ({
  loaded: false,
  energyTimeout: null,
  id: "0",
  name: "",
  email: "",
  level: 1,
  energy: 0,
  recoverAt: new Date(),
  unreadEmails: 0,
  gold: 0,
  exp: 0,
  setUserInfo: (user: UserInfo) => {
    let energyTimeout = get().energyTimeout;
    if (energyTimeout) {
      clearTimeout(energyTimeout);
    }
    energyTimeout = startCheckEnergyTimeout(set, new Date(user.recoverAt));

    set(
      {
        loaded: true,
        ...user,
        recoverAt: new Date(user.recoverAt),
        energyTimeout,
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

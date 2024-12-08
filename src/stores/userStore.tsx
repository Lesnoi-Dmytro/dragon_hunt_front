import { UserInfo } from "@/types/user/UserInfo";
import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

interface UserStore extends UserInfo {
  loaded: boolean;
  level: number;
  energy: number;
  recoveredAt: Date;
  gold: number;
  exp: number;
  unreadEmails: number;
  setUserInfo: (user: UserInfo) => void;
}

const userStore: StateCreator<UserStore, [["zustand/devtools", never]]> = (
  set
) => ({
  loaded: false,
  id: "0",
  name: "",
  email: "",
  level: 1,
  energy: 0,
  recoveredAt: new Date(),
  unreadEmails: 0,
  gold: 0,
  exp: 0,
  setUserInfo: (user: UserInfo) => {
    set(
      {
        loaded: true,
        ...user,
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

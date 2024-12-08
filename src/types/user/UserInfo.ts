export interface UserInfo extends UserInfoResponse {
  name: string;
  email: string;
  image?: string;
}

export interface UserInfoResponse extends EnergyInfoResponse {
  level: number;
  gold: number;
  exp: number;
  unreadMails: number;
}

export interface EnergyInfoResponse {
  energy: number;
  recoverAt: Date;
}

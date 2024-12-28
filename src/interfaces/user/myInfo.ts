export interface MyInfo extends MyInfoResponse {
  name: string;
  email: string;
  image?: string;
}

export interface MyInfoResponse extends EnergyInfoResponse {
  level: number;
  gold: number;
  exp: number;
  expNeeded: number;
  unreadMails: number;
}

export interface EnergyInfoResponse {
  energy: number;
  recoverAt: Date;
}

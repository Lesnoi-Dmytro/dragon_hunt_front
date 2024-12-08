export interface UserInfo extends UserInfoResponse {
  name: string;
  email: string;
  image?: string;
}

export interface UserInfoResponse {
  level: number;
  energy: number;
  recoveredAt: Date;
  gold: number;
  exp: number;
}

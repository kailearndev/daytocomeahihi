export interface UserInfoRes {
  id: number;
  username: string;
  avatar: string;
  avatarName: string;
  day: Day[];
}
export interface Day {
  id: number;
  date: string;
  detail: string;
  isLate: boolean;
}
[];

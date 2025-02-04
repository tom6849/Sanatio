
import { Medication } from "./Medication";

export type User = {
  id : string
  email: string;
  password: string;
  selectedAvatar: string;
  username: string;
  height: string;
  weight: string;
  med : Medication
};

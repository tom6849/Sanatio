
import { Medication } from "./Medication";

export type User = {
  id : string
  email: string;
  password: string;
  selectedAvatar: string| null;
  username: string;
  height: string;
  weight: string;
  medications: Medication[] | null;
  medecin : []
};


import { Medecin } from "./Medecin";
import { Medication } from "./Medication";
import { Effet } from "../type/Effect";

export type User = {
  id : string
  email: string;
  password: string;
  selectedAvatar: string| null;
  username: string;
  height: string;
  weight: string;
  medications: Medication[] | null;
  medecin : Medecin[]
  birthDate: string;
  effet : Effet[];
};

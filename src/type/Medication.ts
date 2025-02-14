export type Medication = {
  id: string;
  isoStartDate?: string;
  isoEndDate?: string;
  name: string;
  pharmaForm: string;
  administrationRoutes: string;
  time?: string;
  jours: string[];
  date: { date: string; taken: boolean }[];
  pill:number;
};

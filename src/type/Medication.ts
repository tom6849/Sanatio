export type Medication = {
  id: string;
  isoStartDate: string;
  isoEndDate: string;
  name: string;
  pharmaForm: string;
  administrationRoutes: string;
  time: string;
  jours: { [key: string]: boolean };
  date: { date: string; taken: boolean }[];
};

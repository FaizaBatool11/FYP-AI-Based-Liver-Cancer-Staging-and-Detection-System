export interface Patient {
  id: number;
  name: string;
  email: string;
  gender: string;
  age: number;
  phone: string;
  dateAdded: string;
  lastVisit: string;
  status: "Active" | "Under Treatment" | "Recovered" | "Critical";
  diagnosis?: string;
  stage?: string;
  clinicalData?: {
    age_at_index: string;
    bmi: string;
    tumor_nodul: string;
    hepatitis: string;
    afp: string;
    afp_group: string;
    alk: string;
    metastasis: string;
  };
}

export const patientsMockData: Patient[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    gender: "Male",
    age: 55,
    phone: "+1 234-567-8901",
    dateAdded: "2024-01-15",
    lastVisit: "2024-12-10",
    status: "Under Treatment",
    diagnosis: "Liver Cancer",
    stage: "Stage II",
    clinicalData: {
      age_at_index: "55",
      bmi: "28.5",
      tumor_nodul: "2",
      hepatitis: "1",
      afp: "150",
      afp_group: "1",
      alk: "180",
      metastasis: "0",
    },
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    gender: "Female",
    age: 48,
    phone: "+1 234-567-8902",
    dateAdded: "2024-02-20",
    lastVisit: "2024-12-12",
    status: "Active",
    diagnosis: "Monitoring",
    stage: "Stage I",
    clinicalData: {
      age_at_index: "48",
      bmi: "24.2",
      tumor_nodul: "1",
      hepatitis: "0",
      afp: "45",
      afp_group: "1",
      alk: "95",
      metastasis: "0",
    },
  },
  {
    id: 3,
    name: "Ali Khan",
    email: "ali@example.com",
    gender: "Male",
    age: 62,
    phone: "+1 234-567-8903",
    dateAdded: "2024-03-10",
    lastVisit: "2024-12-14",
    status: "Critical",
    diagnosis: "Liver Cancer",
    stage: "Stage III",
    clinicalData: {
      age_at_index: "62",
      bmi: "31.8",
      tumor_nodul: "4",
      hepatitis: "1",
      afp: "850",
      afp_group: "2",
      alk: "320",
      metastasis: "1",
    },
  },
  {
    id: 4,
    name: "Sara Ahmed",
    email: "sara@example.com",
    gender: "Female",
    age: 41,
    phone: "+1 234-567-8904",
    dateAdded: "2024-04-05",
    lastVisit: "2024-11-28",
    status: "Recovered",
    diagnosis: "Post-treatment",
    stage: "Stage I",
    clinicalData: {
      age_at_index: "40",
      bmi: "22.5",
      tumor_nodul: "1",
      hepatitis: "0",
      afp: "12",
      afp_group: "0",
      alk: "75",
      metastasis: "0",
    },
  },
];

import { Patient } from "./patientsData";

export function getStatusColor(status: string) {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-800 border-green-200";
    case "Under Treatment":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "Critical":
      return "bg-red-100 text-red-800 border-red-200";
    case "Recovered":
      return "bg-purple-100 text-purple-800 border-purple-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

export function filterPatients(
  patients: Patient[],
  search: string,
  statusFilter: string,
  genderFilter: string
) {
  return patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(search.toLowerCase()) ||
      patient.email.toLowerCase().includes(search.toLowerCase()) ||
      patient.phone.includes(search);

    const matchesStatus =
      statusFilter === "All" || patient.status === statusFilter;
    const matchesGender =
      genderFilter === "All" || patient.gender === genderFilter;

    return matchesSearch && matchesStatus && matchesGender;
  });
}

export function getPatientStats(patients: Patient[]) {
  return {
    total: patients.length,
    active: patients.filter((patient) => patient.status === "Active").length,
    underTreatment: patients.filter(
      (patient) => patient.status === "Under Treatment"
    ).length,
    critical: patients.filter((patient) => patient.status === "Critical").length,
    recovered: patients.filter((patient) => patient.status === "Recovered").length,
  };
}

export function exportPatientsAsCsv(patients: Patient[]) {
  const csvContent = [
    [
      "ID",
      "Name",
      "Email",
      "Gender",
      "Age",
      "Phone",
      "Status",
      "Diagnosis",
      "Stage",
      "Date Added",
      "Last Visit",
    ],
    ...patients.map((patient) => [
      patient.id,
      patient.name,
      patient.email,
      patient.gender,
      patient.age,
      patient.phone,
      patient.status,
      patient.diagnosis || "",
      patient.stage || "",
      patient.dateAdded,
      patient.lastVisit,
    ]),
  ]
    .map((row) => row.join(","))
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `patients-${Date.now()}.csv`;
  anchor.click();
}

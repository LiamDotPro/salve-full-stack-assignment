import { isErrorWithCode } from "./guards";
import { ErrnoException, Patient } from "./interfaces";
import { dataCache, readCSVFile } from "./parse";

function getPatientFilePath(clinicId: number): string {
  return `../data/patients-${clinicId}.csv`;
}

// Define a mapping function for the Patient model
function mapPatient(row: any): Patient {
  return {
    id: parseInt(row.id),
    clinic_id: parseInt(row.clinic_id),
    first_name: row.first_name,
    last_name: row.last_name,
    date_of_birth: row.date_of_birth,
  };
}

// Generic function to read patients data for any clinic with caching
export async function getPatientsForClinic(
  clinicId: number
): Promise<Patient[]> {
  const cacheKey = `patients${clinicId}`;

  // Check if data is already cached
  if (!dataCache[cacheKey]) {
    try {
      const filePath = getPatientFilePath(clinicId);
      dataCache[cacheKey] = await readCSVFile<Patient>(filePath, mapPatient);
    } catch (error) {
      if (isErrorWithCode(error) && error.code === "ENOENT") {
        const err = new Error(
          `Patients data for clinic ID ${clinicId} is not available.`
        ) as ErrnoException;

        err.code = "ENOENT";

        throw err;
      } else {
        throw error;
      }
    }
  }

  return dataCache[cacheKey] as Patient[];
}

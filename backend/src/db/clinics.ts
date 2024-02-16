import { Clinic } from "./interfaces";
import { dataCache, fileMappings, readCSVFile } from "./parse";

// Define a mapping function for the Clinic model
function mapClinic(row: any): Clinic {
  return {
    id: parseInt(row.id),
    name: row.name,
  };
}

// Function to read clinic data with caching
export async function getClinics(): Promise<Clinic[]> {
  if (!dataCache.clinics) {
    dataCache.clinics = await readCSVFile<Clinic>(
      fileMappings.clinics,
      mapClinic
    );
  }
  return dataCache.clinics;
}

// Function to find a specific clinic name using the id
export async function getClinicName(clinicId: number): Promise<string> {
  try {
    const clinics = await getClinics();
    const clinic = clinics.find((clinic) => clinic.id === clinicId);

    if (!clinic) {
      // If no clinic is found with the given ID, throw an error or return a default message
      throw new Error(`Clinic with ID ${clinicId} not found.`);
    }

    return clinic.name; // Return the name of the found clinic
  } catch (error) {
    throw error; // Rethrow the error or handle it as per your error handling strategy
  }
}
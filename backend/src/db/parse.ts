import csvParser from "csv-parser";
import { createReadStream } from "fs";
import fs from "fs/promises";
import path from "path";
import { Clinic, ErrnoException, Patient } from "./interfaces";

// Adjusted Cache object to store data in memory. Explicitly typing each cache key.
interface DataCache {
  clinics?: Clinic[];
  [key: string]: Patient[] | Clinic[] | undefined; // Allows for dynamic keys for patients
}

export let dataCache: DataCache = {};

// Generic function to read CSV file and convert to JSON
export async function readCSVFile<T>(
  filePath: string,
  mapFn: (row: any) => T
): Promise<T[]> {
  const resolvedPath = path.resolve(__dirname, filePath);

  try {
    await fs.access(resolvedPath, fs.constants.F_OK | fs.constants.R_OK);
  } catch (err) {
    const error = new Error(
      `File at ${resolvedPath} not found or not readable.`
    ) as ErrnoException;
    error.code = "ENOENT";
    return Promise.reject(error);
  }

  return new Promise((resolve, reject) => {
    const results: T[] = [];
    createReadStream(resolvedPath)
      .pipe(csvParser())
      .on("data", (row: any) => {
        results.push(mapFn(row));
      })
      .on("end", () => resolve(results))
      .on("error", (error) => reject(error));
  });
}

export const fileMappings = {
  clinics: "../data/clinics.csv",
};

// Define TypeScript interfaces for the data models
export interface Clinic {
  id: number;
  name: string;
}

export interface Patient {
  id: number;
  clinic_id: number;
  first_name: string;
  last_name: string;
  date_of_birth: string;
}

export interface ErrnoException extends Error {
  code?: string;
}
// generated with @7nohe/openapi-react-query-codegen@0.5.3 
import { useQuery, useMutation, UseQueryResult, UseQueryOptions, UseMutationOptions, UseMutationResult } from "@tanstack/react-query";
import { Patient } from "../requests/models/Patient";
import { ErrorResponse } from "../requests/models/ErrorResponse";
import { Clinic } from "../requests/models/Clinic";
import { DefaultService } from "../requests/services/DefaultService";
export type DefaultServiceGetClinicsDefaultResponse = Awaited<ReturnType<typeof DefaultService.getClinics>>;
export type DefaultServiceGetClinicsQueryResult<TData = DefaultServiceGetClinicsDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useDefaultServiceGetClinicsKey = "DefaultServiceGetClinics";
/**
 * Retrieves a list of all current clinics
 * This endpoint returns a list of all the clinics currently registered in the system.
 */
export const useDefaultServiceGetClinics = <TData = DefaultServiceGetClinicsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useDefaultServiceGetClinicsKey, ...(queryKey ?? [])], queryFn: () => DefaultService.getClinics() as TData, ...options });
export type DefaultServiceGetPatientsDefaultResponse = Awaited<ReturnType<typeof DefaultService.getPatients>>;
export type DefaultServiceGetPatientsQueryResult<TData = DefaultServiceGetPatientsDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useDefaultServiceGetPatientsKey = "DefaultServiceGetPatients";
/**
 * Gets a list of patients for a specified clinic
 * Retrieves a list of patients associated with the clinic ID provided in the path.
 */
export const useDefaultServiceGetPatients = <TData = DefaultServiceGetPatientsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ clinicId }: {
    clinicId: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useDefaultServiceGetPatientsKey, ...(queryKey ?? [{ clinicId }])], queryFn: () => DefaultService.getPatients(clinicId) as TData, ...options });

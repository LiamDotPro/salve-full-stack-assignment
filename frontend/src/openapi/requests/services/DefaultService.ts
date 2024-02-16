/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Clinic } from '../models/Clinic';
import type { Patient } from '../models/Patient';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {

    /**
     * Retrieves a list of all current clinics
     * This endpoint returns a list of all the clinics currently registered in the system.
     * @returns any Successfully retrieved a list of clinics.
     * @throws ApiError
     */
    public static getClinics(): CancelablePromise<{
message?: string;
code?: string;
status?: string;
data?: Array<Clinic>;
}> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/clinics',
            errors: {
                500: `Failed to fetch clinics data.`,
            },
        });
    }

    /**
     * Gets a list of patients for a specified clinic
     * Retrieves a list of patients associated with the clinic ID provided in the path.
     * @param clinicId The ID of the clinic to retrieve patients for.
     * @returns any A list of patients for the clinic.
     * @throws ApiError
     */
    public static getPatients(
clinicId: number,
): CancelablePromise<{
message?: string;
code?: string;
status?: string;
data?: Array<Patient>;
}> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/patients/{clinicId}',
            path: {
                'clinicId': clinicId,
            },
            errors: {
                404: `Patients data for this clinic is not available.`,
                500: `Something went wrong with your request.`,
            },
        });
    }

}

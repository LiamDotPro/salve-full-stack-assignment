import express, { Request, Response } from "express";
import { getClinicName } from "../db/clinics";
import { isErrorWithCode } from "../db/guards";
import { getPatientsForClinic } from "../db/paitents";
import {
  HttpStatusCode,
  getErrorResponse,
  getSuccessResponse,
} from "../responses";

const router = express.Router();

/**
 * @openapi
 * /patients/{clinicId}:
 *   get:
 *     summary: Gets a list of patients for a specified clinic
 *     description: Retrieves a list of patients associated with the clinic ID provided in the path.
 *     parameters:
 *       - in: path
 *         name: clinicId
 *         required: true
 *         description: The ID of the clinic to retrieve patients for.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of patients for the clinic.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 code:
 *                   type: string
 *                 status:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Patient'
 *       404:
 *         description: Patients data for this clinic is not available.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Something went wrong with your request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 * components:
 *   schemas:
 *     Patient:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         clinic_id:
 *           type: integer
 *         first_name:
 *           type: string
 *         last_name:
 *           type: string
 *         date_of_birth:
 *           type: string
 *           format: date
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         code:
 *           type: string
 *         status:
 *           type: string
 */
router.get("/:clinicId", async (req: Request, res: Response) => {
  const clinicId = parseInt(req.params.clinicId);

  try {
    const clinicName = await getClinicName(clinicId);
    const patients = await getPatientsForClinic(clinicId);
    res.json(
      getSuccessResponse(
        patients,
        `Here's a list of patients for the clinic: ${clinicName}`
      )
    );
  } catch (error) {
    // Use the isErrorWithCode type guard
    if (isErrorWithCode(error)) {
      // Check for the ENOENT code directly
      if (error.code === "ENOENT") {
        res
          .status(404)
          .json(
            getErrorResponse(
              "Patients data for this clinic is not available.",
              HttpStatusCode.NotFound
            )
          );
      } else {
        res
          .status(500)
          .json(getErrorResponse("Something went wrong with your request."));
      }
    } else {
      // Fallback error response if the caught object does not have a code
      res
        .status(500)
        .json(getErrorResponse("Something went wrong with your request."));
    }
  }
});

export default router;

import express, { Request, Response } from "express";
import { getClinics } from "../db/clinics";
import { getErrorResponse, getSuccessResponse } from "../responses";

const router = express.Router();

/**
 * @openapi
 * /clinics:
 *   get:
 *     summary: Retrieves a list of all current clinics
 *     description: This endpoint returns a list of all the clinics currently registered in the system.
 *     responses:
 *       200:
 *         description: Successfully retrieved a list of clinics.
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
 *                     $ref: '#/components/schemas/Clinic'
 *       500:
 *         description: Failed to fetch clinics data.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 * components:
 *   schemas:
 *     Clinic:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         established:
 *           type: string
 *           format: date
 *           description: The date when the clinic was established.
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
router.get("/", async (req: Request, res: Response) => {
  try {
    const clinics = await getClinics();
    res
      .status(200)
      .json(
        getSuccessResponse(clinics, "Here's a list of all the current clinics")
      );
  } catch (error) {
    res.status(500).json(getErrorResponse("Failed to fetch clinics data."));
  }
});

export default router

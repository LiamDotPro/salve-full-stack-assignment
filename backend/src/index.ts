import cors from "cors";
import express from "express";
// import fs from "fs";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import clinicRouter from "./routes/clinics";
import paitentRouter from "./routes/paitents";

const swaggerDefinition = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API for salve health care clinics",
      version: "1.0.0",
      URL: "locahost:3000"
    },
  },
  apis: ["**/*.ts"], // files containing annotations as above
};

const swaggerSpec = swaggerJSDoc(swaggerDefinition);

// fs.writeFileSync('./swagger-spec.json', JSON.stringify(swaggerSpec, null, 2), 'utf8');

const app = express();
const port = 3000;

const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:4173"],
};

app.use(cors(corsOptions));

// Routes are in the routes folder
app.use("/patients", paitentRouter);
app.use("/clinics", clinicRouter);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

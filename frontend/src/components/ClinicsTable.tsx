import { FC } from "react";
import { useDefaultServiceGetClinics } from "../openapi/queries";

interface Props {
  updateSelectedClinic: (id: number | undefined) => void;
  updateClinicName: (name: string | undefined) => void;
}

const ClinicsTable: FC<Props> = ({
  updateSelectedClinic,
  updateClinicName,
}) => {
  const { data, isLoading } = useDefaultServiceGetClinics();
  return (
    <>
      {isLoading && <div>Loading...</div>}
      {!isLoading && data && (
        <div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {data.data?.map((clinic) => (
                <tr key={`clinic-row-${clinic.id}`}>
                  <td>{clinic.id}</td>
                  <td>{clinic.name}</td>
                  <td>
                    <button
                      onClick={() => {
                        updateClinicName(clinic.name);
                        updateSelectedClinic(clinic.id);
                      }}
                    >
                      View Paitents
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default ClinicsTable;

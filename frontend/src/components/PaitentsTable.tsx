import { FC, useMemo, useState } from "react";
import { useDefaultServiceGetPatients } from "../openapi/queries";
import { Patient } from "../openapi/requests/models/Patient";

interface Props {
  id: number;
  selectedClinicName: string | undefined;
  updateSelectedClinic: (id: number | undefined) => void;
}

const sortOptions = [
  { label: "No Sorting", value: "" },
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Date of Birth", value: "date_of_birth" },
];

const PaitentsTable: FC<Props> = ({
  id,
  updateSelectedClinic,
  selectedClinicName,
}) => {
  const { data, isLoading } = useDefaultServiceGetPatients({ clinicId: id });

  const [sortField, setSortField] = useState<string>("");

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortField(e.target.value);
  };

  const sortedData = useMemo(() => {
    if (!data?.data || sortField === "") {
      return data?.data || [];
    }
    return [...data.data].sort((a, b) => {
      const key = sortField as keyof Patient;
      const aValue = a[key];
      const bValue = b[key];

      // Ensures undefined fields are pushed to the bottom.
      if (aValue === undefined && bValue === undefined) return 0;
      if (aValue === undefined) return 1;
      if (bValue === undefined) return -1;

      if (aValue < bValue) return -1;
      if (aValue > bValue) return 1;
      return 0;
    });
  }, [data?.data, sortField]);

  return (
    <>
      <button
        onClick={() => {
          updateSelectedClinic(undefined);
        }}
      >
        Back
      </button>
      <select onChange={handleSortChange} value={sortField}>
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {isLoading && <div>Loading..</div>}
      {!isLoading && data && (
        <>
          <div>Selected Clinic: {selectedClinicName}</div>
          <table border={1}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Clinic ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Date of Birth</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((el) => {
                return (
                  <tr key={`paitent-row-${el.id}`}>
                    <td>{el.id}</td>
                    <td>{el.clinic_id}</td>
                    <td>{el.first_name}</td>
                    <td>{el.last_name}</td>
                    <td>{el.date_of_birth}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default PaitentsTable;

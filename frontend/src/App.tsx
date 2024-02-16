import { FC, useState } from "react";
import ClinicsTable from "./components/ClinicsTable";
import PaitentsTable from "./components/PaitentsTable";

const App: FC = () => {
  const [selectedClinic, setSelectedClinic] = useState<number | undefined>();
  const [selectedClinicName, setSelectedClinicName] = useState<
    string | undefined
  >();

  return (
    <>
      <div>Salve Health Care Clinic Viewer</div>

      {!selectedClinic && (
        <ClinicsTable
          updateClinicName={setSelectedClinicName}
          updateSelectedClinic={setSelectedClinic}
        />
      )}
      {selectedClinic && (
        <PaitentsTable
          selectedClinicName={selectedClinicName}
          updateSelectedClinic={setSelectedClinic}
          id={selectedClinic}
        />
      )}
    </>
  );
};

export default App;

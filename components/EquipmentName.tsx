import { useEffect, useState } from "react";

const EquipmentName = () => {
  const [equipmentName, setEquipmentName] = useState("");

  useEffect(() => {
    const storedEquipmentName = localStorage.getItem("EquipmentName");
    if (storedEquipmentName) {
      setEquipmentName(JSON.parse(storedEquipmentName));
    }
  }, []);
  return <h2 className="p-4">{equipmentName}</h2>;
};

export default EquipmentName;

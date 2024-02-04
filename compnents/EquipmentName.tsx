import { useEffect, useState } from "react";

const EquipmentName = () => {
  const [equipmentName, setEquipmentName] = useState("");

  useEffect(() => {
    const storedEquipmentName = localStorage.getItem("EquipmentName");
    if (storedEquipmentName) {
      setEquipmentName(JSON.parse(storedEquipmentName));
    }
  }, []);
  return <div>{equipmentName}</div>;
};

export default EquipmentName;

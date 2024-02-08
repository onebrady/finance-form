"use client";

import Image from "next/image";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EquipmentName from "@/components/EquipmentName";
import MyFormComponent from "@/components/CompleteForm";
import StartContent from "@/components/StartContent";
import { useState } from "react";
import GoogleMapsScript from "@/components/GoogleMapsScript";

export default function Page() {
  const [startHide, setStartHide] = useState<boolean>(true);
  function handleInitialpop() {
    setStartHide(false);
    console.log(startHide);
  }
  return (
    <>
      <GoogleMapsScript />
      <main className="flex min-h-dvh flex-col items-center justify-start p-8">
        <div className="w-full flex flex-col items-center justify-center p-8 bg-white rounded-lg ">
          <EquipmentName />
          <div className="w-full max-w-screen-xl min-h-dvh py-10 bg-jayma-tan rounded-lg">
            {startHide && <StartContent onStateChange={handleInitialpop} />}
            {startHide == false && <MyFormComponent />}
          </div>
        </div>
      </main>
    </>
  );
}

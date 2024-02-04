"use client";

import Image from "next/image";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EquipmentName from "@/compnents/EquipmentName";

const page = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8">
      <div className="w-full flex justify-center p-8 bg-white rounded-lg ">
        <EquipmentName />
        <div className="w-full max-w-screen-xl py-52 bg-jayma-tan rounded-lg">
          <div className="flex justify-center items-center flex-col">
            <Image
              className="relative"
              src="/jayma-cover.jpg"
              alt="MulchMule Logo"
              width={379}
              height={224}
              priority
            />
            <h1 className="font-serif text-5xl text-dark-text pt-9">
              Get Preapproved NOW!
            </h1>
            <div className="flex flex-col">
              <button className="text-lg font-semibold text-white bg-gradient-to-r from-base-red to-darker-red rounded-lg py-3 px-6 mt-6 mb-4">
                Start
              </button>
              <div className="text-dark-text flex items-center space-x-2">
                <AccessTimeIcon className="text-dark-text" />
                <span>Takes 2 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;

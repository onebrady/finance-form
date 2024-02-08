import Image from "next/image";
import { useState } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const StartContent = ({ onStateChange }: any) => {
  function startHandler() {
    onStateChange(false);
  }
  // console.log(onStateChange);
  return (
    <>
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
          <button
            onClick={startHandler}
            className="text-lg font-semibold text-white bg-gradient-to-r from-base-red to-darker-red rounded-lg py-3 px-6 mt-6 mb-4"
          >
            Start
          </button>
          <div className="text-dark-text flex items-center space-x-2">
            <AccessTimeIcon className="text-dark-text" />
            <span>Takes 2 minutes</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default StartContent;

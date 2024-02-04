"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  function handleSubmit(event: any) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    localStorage.setItem("EquipmentName", JSON.stringify(data.EquipmentName));
    localStorage.setItem("price", JSON.stringify(data.price));
    console.log(data.EquipmentName, data.price);
    router.push("/form");
  }

  return (
    <main className="flex min-h-screen flex-col bg-white items-center justify-start p-24">
      <div className="pb-5">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/Logo-Red-final-Small.png"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full max-w-64 space-y-4"
      >
        <div>
          <label
            htmlFor="EquipmentName"
            className="block text-sm font-normal leading-6 text-gray-900"
          >
            Equipment Name
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <input
              required
              type="text"
              name="EquipmentName"
              placeholder="Equipment Name"
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-normal leading-6 text-gray-900"
          >
            Equipment Price
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="text"
              name="price"
              id="price"
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="0.00"
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <span className="h-full flex items-center rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
                USD
              </span>
            </div>
          </div>
        </div>

        <div className="w-full text-sm pt-3 text-gray-500">
          <button
            type="submit"
            className="w-full p-4 text-lg font-semibold text-white bg-gradient-to-r from-base-red to-darker-red rounded-lg"
          >
            Continue
          </button>
        </div>
      </form>
    </main>
  );
}

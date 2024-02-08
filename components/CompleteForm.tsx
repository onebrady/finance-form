import React from "react";
import {
  useForm,
  FieldValues,
  Controller,
  FormProvider,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ownderSchema, FormValues } from "@/components/ZodValidation"; // Import your Zod schema
import Image from "next/image";
import FinanceForm from "./AddressAutoComplete";
import DatePicker from "./DatePicker";

export default function MyFormComponent() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(ownderSchema),
  });

  const onSubmit = async (data: FormValues) => {
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    reset();
  };

  // Function to format SSN
  const formatSSN = (value: string) => {
    // Keep only digits and limit the length to 9
    const numericOnly = value.replace(/\D/g, "").slice(0, 9);
    const part1 = numericOnly.slice(0, 3);
    const part2 = numericOnly.slice(3, 5);
    const part3 = numericOnly.slice(5);

    return [part1, part2, part3].filter(Boolean).join("-");
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-numeric characters
    const numbers = value.replace(/\D/g, "");
    // Extract parts using slices
    const areaCode = numbers.slice(0, 3);
    const middle = numbers.slice(3, 6);
    const last = numbers.slice(6, 10);
    // Build the formatted string conditionally
    let formatted = "";
    if (numbers.length > 0) {
      formatted = `(${areaCode}`;
    }
    if (numbers.length >= 4) {
      formatted += `) ${middle}`;
    }
    if (numbers.length > 6) {
      formatted += `-${last}`;
    }
    return formatted;
  };

  return (
    <>
      <form className="px-4" onSubmit={handleSubmit(onSubmit)}>
        <Image
          className="relative mx-auto mb-8"
          src="/Logo-Red-final-Small.png"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
        <div className="border-b max-w-2xl mx-auto border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold text-xl text-gray-900">
            Owner Information
          </h2>

          <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="firstname" className="label-text">
                First Name
              </label>
              <div>
                <input
                  {...register("firstNameOwner")}
                  type="text"
                  placeholder="First Name"
                  className={`${
                    errors.firstNameOwner ? "input-error" : ""
                  } input-text `}
                />
                {errors.firstNameOwner && (
                  <p className="text-red-500 text-xs">
                    {errors.firstNameOwner.message}
                  </p>
                )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="region" className="label-text">
                Middle Name
              </label>
              <div>
                <input
                  {...register("middleNameOwner")}
                  type="text"
                  placeholder="Middle Name"
                  className="input-text"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="postal-code" className="label-text">
                Last Name
              </label>
              <div>
                <input
                  type="text"
                  placeholder="Last Name"
                  {...register("lastNameOwner")}
                  autoComplete="postal-code"
                  className={`${
                    errors.lastNameOwner ? "input-error" : ""
                  } input-text`}
                />
                {errors.lastNameOwner && (
                  <p className="text-red-500 text-xs">
                    {errors.lastNameOwner.message}
                  </p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="label-text">
                Email
              </label>
              <div>
                <input
                  type="text"
                  {...register("ownerEmail")}
                  placeholder="Email"
                  className={`${
                    errors.lastNameOwner ? "input-error" : ""
                  } input-text`}
                />
                {errors.ownerEmail && (
                  <p className="text-red-500 text-xs">
                    {errors.ownerEmail.message}
                  </p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="label-text">
                Title
              </label>
              <div>
                <select // style with 36px height
                  style={{ height: "36px" }}
                  {...register("ownerTitle", {
                    required: "You must select a title.", // This message is shown when no option is selected.
                  })}
                  className={`block bg-white w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    errors.ownerTitle ? "input-error" : ""
                  }`}
                >
                  <option value="">Select a Title</option>
                  {/* Add a default option */}
                  <option value="President">President</option>
                  <option value="Vice President">Vice President</option>
                  <option value="Secretary">Secretary</option>
                  <option value="Member">Member</option>
                  <option value="Manager">Manager</option>
                  <option value="Owner">Owner</option>
                  <option value="Other">Other</option>
                </select>
                {errors.ownerTitle && (
                  <p className="text-red-500">{errors.ownerTitle.message}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="label-text">
                Phone
              </label>
              <div>
                <Controller
                  name="ownerPhone"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Phone number is required",
                    pattern: {
                      value: /^\(\d{3}\) \d{3}-\d{4}$/,
                      message: "Invalid phone format",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      type="text"
                      placeholder="Phone"
                      {...field}
                      value={formatPhoneNumber(field.value)}
                      onChange={(e) =>
                        field.onChange(formatPhoneNumber(e.target.value))
                      }
                      className={`${
                        errors.ownerPhone ? "input-error" : ""
                      } input-text`}
                    />
                  )}
                />
                {errors.ownerPhone && (
                  <p className="text-red-500 text-xs">
                    {errors.ownerPhone.message}
                  </p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="label-text">
                Ownership Percentage
              </label>
              <div>
                <Controller
                  name="ownerOwnershipPercentage"
                  control={control}
                  defaultValue={10}
                  rules={{
                    required: "Ownership Percentage is required",
                    pattern: {
                      value: /^\d*$/, // Ensures only digits are entered
                      message: "Only numeric values are allowed",
                    },
                    min: {
                      value: 0,
                      message: "Ownership Percentage cannot be negative",
                    },
                    max: {
                      value: 100,
                      message: "Ownership Percentage cannot exceed 100",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      type="text"
                      {...field}
                      onChange={(e) => {
                        // Use regex to allow only digits, filtering out any non-digit character
                        const filteredValue = e.target.value.replace(
                          /[^\d]/g,
                          ""
                        );
                        // Convert the filtered string of digits to a number, if not empty
                        const numericValue =
                          filteredValue === ""
                            ? undefined
                            : Number(filteredValue);
                        // Update the field value with either the number or undefined
                        field.onChange(numericValue);
                      }}
                      placeholder="Ownership Percentage"
                      className={`${
                        errors.ownerOwnershipPercentage ? "input-error" : ""
                      }input-text`}
                    />
                  )}
                />

                {errors.ownerOwnershipPercentage && (
                  <p className="text-red-500 text-xs">
                    {errors.ownerOwnershipPercentage.message}
                  </p>
                )}
              </div>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="label-text">
                Social Security #
              </label>
              <div>
                <Controller
                  name="ownerSocialSecurity"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Social Security Number is required",
                    pattern: {
                      value: /^\d{3}-\d{2}-\d{4}$/,
                      message: "Invalid SSN format",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      type="text"
                      {...field}
                      value={formatSSN(field.value)}
                      onChange={(e) => {
                        // Directly apply formatting to the value before updating it
                        const formattedValue = formatSSN(e.target.value);
                        field.onChange(formattedValue);
                      }}
                      placeholder="Social Security #"
                      className={`${
                        errors.ownerSocialSecurity ? "input-error" : ""
                      } input-text`}
                    />
                  )}
                />

                {errors.ownerSocialSecurity && (
                  <p className="text-red-500 text-xs">
                    {errors.ownerSocialSecurity.message}
                  </p>
                )}
              </div>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="label-text">
                Date of Birth
              </label>
              <div>
                <DatePicker />
                {errors.ownerDateOfBirth && (
                  <p className="text-red-500 text-xs">
                    {errors.ownerDateOfBirth.message}
                  </p>
                )}
              </div>
            </div>

            <FinanceForm />
          </div>
        </div>

        <button
          className="flex sm:col-span-3 justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          type="submit"
        >
          Submit
        </button>
      </form>
    </>
  );
}

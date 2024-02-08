import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

// Define Zod schema for form validation
const schema = z.object({
  streetAddress: z.string().nonempty(),
  city: z.string().nonempty(),
  state: z.string().nonempty(),
  zipcode: z.string().nonempty(),
});

type AddressSuggestion = {
  placeId: string;
  description: string;
  active: boolean;
};

const FinanceForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
  });

  // Initialize state for the street address
  const [streetAddress, setStreetAddress] = useState<string>("");

  const onSubmit = (data: any) => {
    console.log(data); // Handle form submission
  };

  // Handle selection of address suggestion
  const handleSelect = async (address: string) => {
    try {
      const results = await geocodeByAddress(address);
      // Extract street number and route from the address components
      const streetNumberObj = results[0].address_components.find((component) =>
        component.types.includes("street_number")
      );
      const routeObj = results[0].address_components.find((component) =>
        component.types.includes("route")
      );

      // Combine street number and route for full street address
      const streetAddress = `${
        streetNumberObj ? streetNumberObj.long_name : ""
      } ${routeObj ? routeObj.long_name : ""}`.trim();

      setStreetAddress(streetAddress); // Update the local state for the streetAddress input

      // Set the detailed parts of the address in other form fields
      setValue("streetAddress", streetAddress); // Now setting only the street part
      setValue(
        "city",
        results[0].address_components.find((component) =>
          component.types.includes("locality")
        )?.long_name ?? ""
      );
      setValue(
        "state",
        results[0].address_components.find((component) =>
          component.types.includes("administrative_area_level_1")
        )?.short_name ?? ""
      );
      setValue(
        "zipcode",
        results[0].address_components.find((component) =>
          component.types.includes("postal_code")
        )?.long_name ?? ""
      );
    } catch (error) {
      console.error("Error selecting address:", error);
    }
  };

  return (
    <>
      <div className="sm:col-span-6">
        <label className="label-text">Street Address</label>
        {/* Address input with autocomplete */}
        <PlacesAutocomplete
          value={streetAddress} // Pass streetAddress state as value
          onChange={(value) => setStreetAddress(value)} // Update streetAddress state
          onSelect={handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div className="relative">
              <input
                {...getInputProps({
                  placeholder: "Enter your address",
                  className: errors.streetAddress ? "error" : "",
                })}
                className="input-text"
              />
              <div className="suggestion-item">
                {loading ? <div>Loading...</div> : null}

                {suggestions.map((suggestion) => {
                  // Removed type annotation to avoid conflict
                  const style = {
                    backgroundColor: suggestion.active ? "#fafafa" : "#ffffff",
                  };

                  // Directly use the suggestion object provided by the library
                  const suggestionProps = getSuggestionItemProps(suggestion, {
                    style,
                  });

                  return (
                    <div
                      {...suggestionProps} // Spreads all necessary props, including `key`
                      key={suggestion.placeId} // Add a unique key prop
                      className="px-1" // Additional classes or styles can still be applied
                    >
                      {suggestion.description}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
        {errors.streetAddress && (
          <span className="error-message">Address is required</span>
        )}
      </div>
      <div className="sm:col-span-2 sm:col-start-1">
        <label className="label-text">City</label>
        <input
          {...register("city")}
          className="input-text"
          placeholder="Enter city"
        />
        {errors.city && <span className="error-message">City is required</span>}
      </div>
      <div className="sm:col-span-2">
        <label className="label-text">State</label>
        <input
          {...register("state")}
          className="input-text"
          placeholder="Enter state"
        />
        {errors.state && (
          <span className="error-message">State is required</span>
        )}
      </div>
      <div className="sm:col-span-2">
        <label className="label-text">Zip Code</label>
        <input
          {...register("zipcode")}
          className="input-text"
          placeholder="Enter zip code"
        />
        {errors.zipcode && (
          <span className="error-message">Zip code is required</span>
        )}
      </div>
    </>
  );
};

export default FinanceForm;

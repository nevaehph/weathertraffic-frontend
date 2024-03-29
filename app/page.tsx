"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import FormInputs from "./components/FormInputs";
import LocationList from "./components/LocationList";
import Screenshot from "./components/Screenshot";
import Recommendations from "./components/Recommendations";

export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState(undefined);
  const [locations, setLocations] = useState([]);
  const clearLocations = () => {
    setLocations([]);
    setSelectedLocation(undefined);
  };
  let currentTimeString = `${
    new Date().getHours().toString().length < 2
      ? `0${new Date().getHours()}`
      : new Date().getHours()
  }:${
    new Date().getMinutes().toString().length < 2
      ? `0${new Date().getMinutes()}`
      : `${new Date().getMinutes()}`
  }`;
  const methods = useForm({
    defaultValues: {
      date: new Date(new Date().setHours(0, 0, 0, 0)),
      time: currentTimeString,
    },
  });

  return (
    <div className="m-auto p-6 flex justify-center flex-col max-w-[1280px]">
      <FormProvider {...methods}>
        <h1 className="mb-4 text-2xl font-extrabold leading-none text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
          Weather & Traffic
        </h1>
        <FormInputs
          setLocations={setLocations}
          clearLocations={clearLocations}
        />
        <Recommendations />
        <LocationList
          locations={locations}
          selectLocation={setSelectedLocation}
          selectedLocation={selectedLocation}
        />
        <Screenshot selectedLocation={selectedLocation} />
      </FormProvider>
    </div>
  );
}

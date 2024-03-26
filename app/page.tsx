"use client";

import { useState } from "react";
import FormInputs from "./components/FormInputs";
import LocationList from "./components/LocationList";
import Screenshot from "./components/Screenshot";

export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <div>
      <FormInputs />
      <LocationList />
      <Screenshot />
    </div>
  );
}

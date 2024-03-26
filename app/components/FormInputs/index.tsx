/*
    Component to display all Form Inputs
*/
"use client";

import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { Datepicker, Button } from "flowbite-react";

function FormInputs() {
  const onSubmit = (data: object) => console.log(data);
  return (
    <form className="w-full mb-4">
      <div className="flex justify-stretch">
        <FormItem title="Date">
          <Datepicker />
        </FormItem>
        <FormItem title="Time">
          <Timepicker />
        </FormItem>
      </div>
      <div className="mt-4">
        <Button pill>Submit</Button>
      </div>
    </form>
  );
}

function FormItem({ title, children }) {
  return (
    <div>
      <h5>{title}</h5>
      <div>{children}</div>
    </div>
  );
}

/*
    As Flowbite React does not provide a Timepicker, it will be created manually
*/
function Timepicker({}) {
  return (
    <div className="relative">
      <input
        type="time"
        className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        min="09:00"
        max="18:00"
        value="00:00"
      />
    </div>
  );
}

export default FormInputs;

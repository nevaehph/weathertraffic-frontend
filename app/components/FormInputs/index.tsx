/*
    Component to display all Form Inputs
*/
"use client";

import {
  useFormContext,
  Controller,
  ControllerRenderProps,
} from "react-hook-form";
import { ReactElement } from "react";
import { Datepicker, Button } from "flowbite-react";

type FormData = {
  date: Date;
  time: string;
};

function FormInputs() {
  const { handleSubmit, control } = useFormContext<FormData>();
  const onSubmit = (d: FormData) => {
    let timeSplit = d.time.split(":");
    let hours = parseInt(timeSplit[0]);
    let minutes = parseInt(timeSplit[1]);
    let data = new Date(d.date);
    data.setHours(hours, minutes);
    console.log(data);
  };
  return (
    <form className="w-full mb-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-stretch">
        <FormItem title="Date">
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <Datepicker
                defaultDate={field.value}
                onSelectedDateChanged={field.onChange}
              />
            )}
          />
        </FormItem>
        <FormItem title="Time">
          <Controller
            name="time"
            control={control}
            render={({ field }) => (
              <Timepicker
                name={field.name}
                onChange={field.onChange}
                onBlur={field.onBlur}
                value={field.value}
              />
            )}
          />
        </FormItem>
      </div>
      <div className="mt-4">
        <Button type="submit" pill>
          Submit
        </Button>
      </div>
    </form>
  );
}

function FormItem(formItem: { title: string; children: ReactElement }) {
  return (
    <div>
      <h5>{formItem.title}</h5>
      <div>{formItem.children}</div>
    </div>
  );
}

function Timepicker(field: any) {
  return (
    <div className="relative">
      <input
        type="time"
        className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        {...field}
      />
    </div>
  );
}

export default FormInputs;

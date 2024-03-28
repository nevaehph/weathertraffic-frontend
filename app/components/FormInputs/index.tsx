/*
    Component to display all Form Inputs
*/
"use client";

import { useFormContext, Controller } from "react-hook-form";
import { ReactElement } from "react";
import { Datepicker, Button } from "flowbite-react";
import apiHook from "../../hooks/ApiHook";
import recommendationHook from "../../hooks/RecommendationHook";

type props = {
  setLocations: React.Dispatch<React.SetStateAction<any>>;
  clearLocations(): void;
};

type FormData = {
  date: Date;
  time: string;
};

function FormInputs(props: props) {
  const { handleSubmit, control } = useFormContext<FormData>();

  const { loading, locationRequest, error } = apiHook();
  const { addRecentDateTime } = recommendationHook();

  const onSubmit = async (d: FormData) => {
    props.clearLocations();
    let timeSplit = d.time.split(":");
    let hours = parseInt(timeSplit[0]);
    let minutes = parseInt(timeSplit[1]);
    let data = new Date(d.date);
    data.setHours(hours, minutes);
    //add timezone offset to request
    await locationRequest(data.getTime()).then((response) => {
      props.setLocations(response);

      //if location is retrieved successfully, store it as recentDateTime in localStorage
      addRecentDateTime(data);
    });
  };
  return (
    <form className="w-full mb-4" onSubmit={handleSubmit(onSubmit)}>
      <p className="mb-2">Get started by selecting a Date and Time.</p>
      <div className="grid gap-2 md:grid-cols-1 lg:w-2/3 lg:grid-cols-2">
        <FormItem title="Date">
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <Datepicker
                value={new Intl.DateTimeFormat("en-SG", {
                  dateStyle: "medium",
                }).format(field.value)}
                onSelectedDateChanged={field.onChange}
                disabled={loading}
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
                disabled={loading}
              />
            )}
          />
        </FormItem>
      </div>
      {error && (
        <div className="mt-2 mb-2 font-bold text-red-500">
          An Error has occurred. Please try again. <br />
          {error}
        </div>
      )}
      <div className="mt-4">
        <Button disabled={loading} type="submit" pill>
          Submit
        </Button>
      </div>
    </form>
  );
}

function FormItem(formItem: { title: string; children: ReactElement }) {
  return (
    <div>
      <p className="mb-2 font-bold">{formItem.title}</p>
      <div>{formItem.children}</div>
    </div>
  );
}

function Timepicker(field: any) {
  return (
    <div className="relative">
      <input
        type="time"
        className="bg-gray-50 border leading-none disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500 focus:border-cyan-500 focus:ring-cyan-500"
        {...field}
      />
    </div>
  );
}

export default FormInputs;

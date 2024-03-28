/*
    Component to display Recommendations for Date Time
*/

import { Card } from "flowbite-react";
import { useFormContext } from "react-hook-form";
import recommendationHook from "../../hooks/RecommendationHook";
import apiHook from "../../hooks/ApiHook";
import { useEffect, useState } from "react";

type DateTimeListProps = {
  datetimes: Date[];
  title: string;
};

function Recommendations() {
  const { recentDateTimes } = recommendationHook();
  const { recommendationRequest } = apiHook();
  const [recomDateTimes, setRecomDateTimes] = useState<Date[]>([]);

  useEffect(() => {
    loadRecommendations();
  }, []);

  const loadRecommendations = async () => {
    await recommendationRequest().then((response: any) => {
      let recommArray = [];
      for (var i = 0; i < response.length; i++) {
        recommArray.push(new Date(response[i]));
      }

      setRecomDateTimes(recommArray);
    });
  };

  return (
    <>
      <Card className="mt-2 mb-2 lg:w-2/3">
        <p className="font-bold">
          Here are some recommended dates to select from:
        </p>
        <div className="grid gap-2 md:grid-cols-1 lg:grid-cols-2">
          <DateTimeList
            title={"Past Date Times:"}
            datetimes={recentDateTimes}
          />
          <DateTimeList
            title={"Other User's Date Times:"}
            datetimes={recomDateTimes}
          />
        </div>
      </Card>
    </>
  );
}

function DateTimeList(props: DateTimeListProps) {
  const { setValue } = useFormContext<FormData>();

  const applyDateTime = (date: Date) => {
    let newDate = new Date(date);
    setValue("time", newDate.toLocaleTimeString());
    setValue("date", new Date(newDate.setHours(0, 0, 0, 0)));
  };

  const dateFormat = (date: Date) => {
    return new Intl.DateTimeFormat("en-SG", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  return (
    <div>
      <p className="mb-2">{props.title}</p>
      <ul>
        {props.datetimes.length > 0 &&
          props.datetimes.map((item, index) => {
            return (
              <li
                key={index}
                className="underline cursor-pointer w-fit p-1 rounded transition hover:bg-cyan-700 hover:text-white"
                onClick={() => {
                  applyDateTime(item);
                }}
              >
                <p>{dateFormat(item)}</p>
              </li>
            );
          })}
        {props.datetimes.length == 0 && (
          <li>
            <p>None at the moment</p>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Recommendations;

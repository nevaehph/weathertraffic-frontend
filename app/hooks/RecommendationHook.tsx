import { useEffect, useState } from "react";

export default function RecommendationHook() {
  const [recentDateTimes, setRecentDateTimes] = useState<Date[]>([]);
  const maxRecentLength = 3;
  const recentDateKey = "recentDateTimes";

  useEffect(() => {
    try {
      //check if there are any datetimes in localstorage
      let localDateTimes = localStorage.getItem(recentDateKey);
      if (localDateTimes) {
        let parsedLocal = JSON.parse(localDateTimes);
        for (var i = 0; i < parsedLocal.length; i++) {
          parsedLocal[i] = new Date(parsedLocal[i]);
        }
        setRecentDateTimes(parsedLocal);
      }
    } catch (err) {
      console.log("Failed to retrieve Recent Date Times");
    }
  }, []);

  const addRecentDateTime = (datetime: Date) => {
    let currentDateTimes = [...recentDateTimes];
    if (recentDateTimes.length > maxRecentLength - 1) {
      currentDateTimes.pop();
    }
    currentDateTimes.unshift(datetime);
    //store data in localstorage
    localStorage.setItem(recentDateKey, JSON.stringify(currentDateTimes));
  };

  return {
    recentDateTimes,
    addRecentDateTime,
  };
}

import { useEffect, useState } from "react";
import {
  addMinutes,
  differenceInMilliseconds,
  format,
  startOfMinute,
} from "date-fns";
import AquaTick from "./components/AquaTick/AquaTick";

const calcDelayToNextMinute = (now: Date): number => {
  const startOfThisMinute = startOfMinute(now);
  const nextMinuteStart = addMinutes(startOfThisMinute, 1);

  const delay = differenceInMilliseconds(nextMinuteStart, now);

  return delay;
};

function App() {
  const getCurrentDate = () => new Date();

  const [now, setCurrentDate] = useState(getCurrentDate());
  const currentDate = format(now, "MM/dd");
  const currentTime = format(now, "HH:mm");
  const currentDay = format(now, "E");
  const initialDelay = calcDelayToNextMinute(now);

  useEffect(() => {
    let timeoutId;
    let intervalId: number | undefined;

    const updateTime = () => {
      setCurrentDate(getCurrentDate());
    };

    timeoutId = setTimeout(() => {
      updateTime();
      intervalId = setInterval(updateTime, 60000);
    }, initialDelay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <AquaTick startOffset={60 - initialDelay / 1000}>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <h3>{currentDate}</h3>
          <h3>{currentDay}</h3>
        </div>
        <hr />
        <h2>{currentTime}</h2>
      </AquaTick>
    </>
  );
}
export default App;

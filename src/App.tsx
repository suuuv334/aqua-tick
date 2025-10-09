import { useEffect, useState } from "react";
import "./App.css";
import {
  addMinutes,
  differenceInMilliseconds,
  format,
  startOfMinute,
} from "date-fns";

const calcDelayToNextMin = (now: Date): number => {
  const startOfThisMinute = startOfMinute(now);
  const nextMinuteStart = addMinutes(startOfThisMinute, 1);

  const delay = differenceInMilliseconds(nextMinuteStart, now);

  return delay;
};

function App() {
  const getCurrentDate = () => new Date();
  const [currentDate, setCurrentDate] = useState(getCurrentDate());

  useEffect(() => {
    let timeoutId;
    let intervalId: number;

    // 分が切り替わった瞬間の処理
    const updateTime = () => {
      setCurrentDate(getCurrentDate());
    };

    const initialDelay = calcDelayToNextMin(currentDate);

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
      <h1>{format(currentDate, "MM/dd")}</h1>
      <h1>{format(currentDate, "HH:mm")}</h1>
    </>
  );
}

export default App;

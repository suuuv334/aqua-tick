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
        <div
          style={{
            width: "fit-content",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <h3
              style={{
                margin: 0,
                fontSize: "4em",
                whiteSpace: "nowrap",
                color: "#636363",
              }}
            >
              {currentDate}
            </h3>
            <h3
              style={{
                margin: 0,
                fontSize: "4em",
                whiteSpace: "nowrap",
                color: "#636363",
              }}
            >
              {currentDay}
            </h3>
          </div>
          <h2
            style={{
              margin: 0,
              fontSize: "8em",
              whiteSpace: "nowrap",
              color: "#636363",
            }}
          >
            <hr color="#636363" style={{ margin: 0 }} />
            {currentTime}
          </h2>
        </div>
      </AquaTick>
    </>
  );
}
export default App;

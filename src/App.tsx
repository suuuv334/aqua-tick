import { useEffect, useState } from "react";
import "./App.css";
import {
  addMinutes,
  differenceInMilliseconds,
  format,
  startOfMinute,
} from "date-fns";
import AquaContainer from "./components/AquaContainer/AquaContainer";
import WavyText from "./components/WavyText/WavyText";

const calcDelayToNextMin = (now: Date): number => {
  const startOfThisMinute = startOfMinute(now);
  const nextMinuteStart = addMinutes(startOfThisMinute, 1);

  const delay = differenceInMilliseconds(nextMinuteStart, now);

  return delay;
};

function App() {
  const getCurrentDate = () => new Date();
  const [now, setCurrentDate] = useState(getCurrentDate());
  const currentDate = format(now, "MM/dd E");
  const currentTime = format(now, "HH:mm");
  useEffect(() => {
    let timeoutId;
    let intervalId: number | undefined;

    const updateTime = () => {
      setCurrentDate(getCurrentDate());
    };

    const initialDelay = calcDelayToNextMin(now);

    timeoutId = setTimeout(() => {
      updateTime();
      // setIntervalはNode.js環境ではNodeJS.Timerを返す可能性があるためキャスト
      intervalId = setInterval(updateTime, 60000) as unknown as number;
    }, initialDelay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, []);
  return (
    <>
      <AquaContainer>
        <WavyText text={currentDate}></WavyText>
        <WavyText text={currentTime}></WavyText>
      </AquaContainer>
    </>
  );
}
export default App;

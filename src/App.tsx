import { useEffect, useState } from "react";
import {
  addMinutes,
  differenceInMilliseconds,
  format,
  startOfMinute,
} from "date-fns";
import AquaTick from "./components/AquaTick/AquaTick";
import { darken, desaturate } from "polished";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { globalTheme } from "./index.css";

const calcDelayToNextMinute = (now: Date): number => {
  const startOfThisMinute = startOfMinute(now);
  const nextMinuteStart = addMinutes(startOfThisMinute, 1);

  const delay = differenceInMilliseconds(nextMinuteStart, now);

  return delay;
};

// クエリがある場合に色を変える
export const ColorBase: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [colors, setColors] = useState<{
    base: string;
    shadow: string;
    deep: string;
  }>();
  const [textColorState, setTextColor] = useState<string>();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const colorParam = params.get("color");
    const base = `#${colorParam || "BAE6FF"}`;
    console.log(base);
    const shadow = darken(0.1, desaturate(0.3, base));
    const deep = darken(0.4, desaturate(0.6, base));
    console.log(shadow);
    console.log(deep);
    setColors({
      base: base,
      shadow: shadow,
      deep: deep,
    });

    const textColorParam = params.get("text_color");
    setTextColor(`#${textColorParam || "636363"}`);
  }, []);
  return (
    <div
      style={assignInlineVars({
        [globalTheme.color.base]: colors?.base,
        [globalTheme.color.shadow]: colors?.shadow,
        [globalTheme.color.deep]: colors?.deep,
        [globalTheme.font.color]: textColorState,
      })}
    >
      {children}
    </div>
  );
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
    <ColorBase>
      <AquaTick startOffset={60 - initialDelay / 1000}>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <h3>{currentDate}</h3>
          <h3>{currentDay}</h3>
        </div>
        <hr />
        <h2>{currentTime}</h2>
      </AquaTick>
    </ColorBase>
  );
}
export default App;

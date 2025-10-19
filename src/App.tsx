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
/**
 * 与えられた文字列が有効な16進数カラーコード（3桁または6桁）であるかを検証します。
 * # の有無はチェックしません（引数の文字列から # を取り除いて検証することを想定）。
 * * @param {string} code 検証するカラーコード文字列
 * @returns {boolean} 有効なカラーコードであれば true
 */
function isValidHexColorCode(code: string) {
  // # を取り除く（ユーザーが # を含めて入力した場合に対応するため）
  const cleanCode = code.startsWith("#") ? code.substring(1) : code;

  // 以下の正規表現で検証:
  // ^      - 文字列の先頭
  // [0-9A-Fa-f] - 0から9までの数字、またはAからF（大小文字を区別しない）のアルファベット
  // {3}    - 3文字に完全に一致
  // |      - または
  // [0-9A-Fa-f] - 0から9までの数字、またはAからF（大小文字を区別しない）のアルファベット
  // {6}    - 6文字に完全に一致
  // $      - 文字列の末尾
  const regex = /^([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;

  return regex.test(cleanCode);
}
// クエリがある場合に色を変える
export const ColorBase: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const DEFAULT_BASE_COLOR = "#BAE6FF"; // デフォルトの基本色（#RRGGBB形式）
  const DEFAULT_TEXT_COLOR = "#636363"; // デフォルトのテキスト色

  const [colors, setColors] = useState<{
    base: string;
    shadow: string;
    deep: string;
  }>();
  const [textColorState, setTextColor] = useState<string>();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const colorParam = params.get("color");
    let baseColor = DEFAULT_BASE_COLOR;

    if (colorParam && isValidHexColorCode(colorParam)) {
      // colorParamから先頭の#を安全に取り除く
      const cleanColorCode = colorParam.startsWith("#")
        ? colorParam.substring(1)
        : colorParam;

      // 検証済みのクリーンなコードに # を付けて使用
      baseColor = `#${cleanColorCode}`;
    }

    // baseColor を使って影の色を計算
    let shadow = darken(0.1, desaturate(0.2, baseColor));
    // shadowは自動計算するが指定されている場合はそちらを使用
    const shadowParam = params.get("shadow");

    if (shadowParam && isValidHexColorCode(shadowParam)) {
      const cleanColorCode = shadowParam.startsWith("#")
        ? shadowParam.substring(1)
        : shadowParam;
      shadow = `#${cleanColorCode}`;
      console.log(shadow);
    }
    console.log(shadow);
    const deep = darken(0.1, desaturate(0.2, shadow));

    setColors({
      base: baseColor,
      shadow: shadow,
      deep: deep,
    });

    const textColorParam = params.get("text_color");
    let textColor = DEFAULT_TEXT_COLOR; // 初期値としてデフォルトを設定

    // text_color の検証を追加
    if (textColorParam && isValidHexColorCode(textColorParam)) {
      // colorParamから先頭の#を安全に取り除く
      const cleanColorCode = textColor.startsWith("#")
        ? textColor.substring(1)
        : colorParam;

      // 検証済みのクリーンなコードに # を付けて使用
      textColor = `#${cleanColorCode}`;
    }

    setTextColor(textColor);
  }, []);

  const assign = assignInlineVars({
    [globalTheme.color.base]: colors?.base,
    [globalTheme.color.shadow]: colors?.shadow,
    [globalTheme.color.deep]: colors?.deep,
    [globalTheme.font.color]: textColorState,
  });

  return <div style={assign}>{children}</div>;
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

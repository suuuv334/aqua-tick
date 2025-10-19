// src/components/AquaContainer.tsx

import React from "react";
import {
  aquaTick,
  aquaTickContent,
  aquaTickMask,
  aquaTickPath,
  aquaTickSvg,
  secondHand,
} from "../AquaTick/AquaTick.css.ts"; // スタイルをインポート
import { motion } from "motion/react";
import {
  aquaPathAnimationSettings,
  secondHandAnimationSettings,
  svgRotationAnim,
  svgRotationTrans,
} from "./AquaTick.anime.ts";

interface AquaTickProps {
  children: React.ReactNode;
  className?: string;
  startOffset?: number;
}
// TODO: 引数で色や形をカスタマイズ
// TODO: SVGは静的文字列になってるがGenerater関数を作成する
const AquaTick: React.FC<AquaTickProps> = ({
  children,
  className,
  startOffset = 0,
}) => {
  console.log(startOffset);
  const combinedClassName = className ? `${aquaTick} ${className}` : aquaTick;
  return (
    <>
      <div className={combinedClassName}>
        <motion.svg className={aquaTickSvg} viewBox="0 0 200 200">
          <motion.g animate={svgRotationAnim} transition={svgRotationTrans}>
            <motion.g>
              <motion.path
                className={aquaTickPath}
                {...aquaPathAnimationSettings}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="5%" stopColor="#9e8cb6ff"></stop>
                  <stop offset="95%" stopColor="#423750ff"></stop>
                </linearGradient>
                <mask id="wave-mask">
                  <motion.g
                    animate={svgRotationAnim}
                    transition={svgRotationTrans}
                  >
                    <motion.path
                      className={aquaTickMask}
                      {...aquaPathAnimationSettings}
                    />
                  </motion.g>
                </mask>
              </defs>
            </motion.g>
          </motion.g>

          <g mask="url(#wave-mask)">
            <motion.g {...secondHandAnimationSettings}>
              <motion.path
                className={secondHand}
                {...aquaPathAnimationSettings}
              />
            </motion.g>
          </g>
        </motion.svg>
        <div className={aquaTickContent}>{children}</div>
      </div>
    </>
  );
};
export default AquaTick;

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
  getSecondHandAnimation,
  svgRotationAnim,
  svgRotationTrans,
} from "./AquaTick.anime.ts";
import { globalTheme } from "../../index.css.ts";

interface AquaTickProps {
  children: React.ReactNode;
  className?: string;
  startOffset?: number;
}
const AquaTick: React.FC<AquaTickProps> = ({
  children,
  className,
  startOffset = 0,
}) => {
  const combinedClassName = className ? `${aquaTick} ${className}` : aquaTick;
  const secondhandAmimationSettings = getSecondHandAnimation(startOffset);
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
                  <stop
                    className="gradStart"
                    stopColor={globalTheme.color.shadow}
                    offset="5%"
                  ></stop>
                  <stop
                    className="gradEnd"
                    stopColor={globalTheme.color.deep}
                    offset="95%"
                  ></stop>
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
            <motion.g {...secondhandAmimationSettings}>
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

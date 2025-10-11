// src/components/AquaContainer.tsx

import React from "react";
import {
  aquaContainer,
  aquaContent,
  aquaMask,
  aquaPath,
  aquaSvg,
} from "./AquaContainer.css.ts"; // スタイルをインポート
import { motion } from "motion/react";
import {
  aquaPathAnimationSettings,
  svgRotationAnim,
  svgRotationTrans,
} from "./AquaContainer.anime.ts";

interface AquaTickProps {
  children: React.ReactNode;
  className?: string;
}
// TODO: 引数で色や形をカスタマイズ
// TODO: SVGは静的文字列になってるがGenerater関数を作成する
const AquaTick: React.FC<AquaTickProps> = ({ children, className }) => {
  const combinedClassName = className
    ? `${aquaContainer} ${className}`
    : aquaContainer;
  return (
    <>
      <div className={combinedClassName}>
        <motion.svg className={aquaSvg} viewBox="0 0 200 200">
          <motion.g animate={svgRotationAnim} transition={svgRotationTrans}>
            <motion.path className={aquaPath} {...aquaPathAnimationSettings} />
          </motion.g>
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="5%" stop-color="#9e8cb6ff"></stop>
              <stop offset="95%" stop-color="#423750ff"></stop>
            </linearGradient>
            <mask id="wave-mask">
              <motion.g animate={svgRotationAnim} transition={svgRotationTrans}>
                <motion.path
                  className={aquaMask}
                  {...aquaPathAnimationSettings}
                />
              </motion.g>
            </mask>
          </defs>

          <g mask="url(#wave-mask)">
            <motion.g
              animate={{
                y: [170, 20],
              }}
              transition={{
                duration: 60,
                ease: "linear",
                repeatType: "loop",
                repeat: Infinity,
              }}
            >
              <motion.path
                style={{
                  transform: "translate(100px, 100px) scale(1.5) ",
                  fill: "url(#gradient)",
                }}
                {...aquaPathAnimationSettings}
              />
            </motion.g>
          </g>
        </motion.svg>
        <div className={aquaContent}>{children}</div>
      </div>
    </>
  );
};
export default AquaTick;

// src/components/AquaContainer.tsx

import React from "react";
import {
  aquaContainer,
  aquaContent,
  aquaPath,
  aquaSvg,
} from "./AquaContainer.css.ts"; // スタイルをインポート
import { motion } from "motion/react";
import { aquaPathAnimationSettings } from "./AquaContainer.anime.ts";

interface AquaContainerProps {
  children?: React.ReactNode;
  className?: string;
}
// TODO: 引数で色や形をカスタマイズ
// TODO: SVGは静的文字列になってるがGenerater関数を作成する
const AquaContainer: React.FC<AquaContainerProps> = ({
  children,
  className,
}) => {
  const combinedClassName = className
    ? `${aquaContainer} ${className}`
    : aquaContainer;
  return (
    <>
      <div className={combinedClassName}>
        <motion.svg className={aquaSvg} viewBox="0 0 200 200">
          <motion.path className={aquaPath} {...aquaPathAnimationSettings} />
        </motion.svg>
        <div className={aquaContent}>{children}</div>
      </div>
    </>
  );
};
export default AquaContainer;

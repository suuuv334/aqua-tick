// src/components/AquaContainer.tsx

import React from "react";
import {
  aquaContainerClass,
  aquaPathClass,
  aquaSvgClass,
} from "./AquaContainer.css.ts"; // スタイルをインポート
import { motion } from "motion/react";
import {
  aquaPathAnimationSettings,
  pathVariants,
  svgRotationAnim,
  svgRotationTrans,
} from "./AquaContainer.anim.ts";

interface AquaContainerProps {
  children: React.ReactNode;
  className?: string;
}

const AquaContainer: React.FC<AquaContainerProps> = ({
  children,
  className,
}) => {
  const combinedClassName = className
    ? `${aquaContainerClass} ${className}`
    : aquaContainerClass;

  return (
    <>
      <div className={combinedClassName}>
        <motion.svg
          className={aquaSvgClass}
          viewBox="0 0 200 200"
          animate={svgRotationAnim}
          transition={svgRotationTrans}
        >
          <motion.path
            className={aquaPathClass}
            variants={pathVariants}
            {...aquaPathAnimationSettings}
          />
        </motion.svg>
        <div>{children}</div>
      </div>
    </>
  );
};
export default AquaContainer;

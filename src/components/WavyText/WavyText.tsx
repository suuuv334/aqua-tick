import { motion } from "motion/react";
import { content, textStroke, textAnimated } from "./WavyText.css.ts"; // スタイルをインポート
import { waveVariants } from "./WavyText.anim.ts";

interface WaveyTextProps {
  text: string;
  className?: string; // 外部からのクラス結合用
}

const MotionDiv = motion.div;
const WavyText: React.FC<WaveyTextProps> = ({ text, className }) => {
  // 外部からのクラスと結合

  return (
    <div className={content}>
      <div className={textStroke}>{text}</div>
      <MotionDiv
        className={textAnimated}
        variants={waveVariants}
        animate="animate"
      >
        {text}
      </MotionDiv>
    </div>
  );
};

export default WavyText;

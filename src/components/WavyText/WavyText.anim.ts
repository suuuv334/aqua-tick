import type { Variants } from "motion";

export const waveVariants: Variants = {
  // アニメーションの状態を 'animate' という名前で定義
  animate: {
    // clipPath の値を配列として定義することで、キーフレームのような動きを実現
    clipPath: [
      // 0% (始点)
      "polygon(0% 45%, 16% 44%, 33% 50%, 54% 60%, 70% 61%, 84% 59%, 100% 52%, 100% 100%, 0% 100%)",
      // 50% (中間点)
      "polygon(0% 60%, 15% 65%, 34% 66%, 51% 62%, 67% 50%, 84% 45%, 100% 46%, 100% 100%, 0% 100%)",
      // 100% (終点 - 始点に戻る)
      "polygon(0% 45%, 16% 44%, 33% 50%, 54% 60%, 70% 61%, 84% 59%, 100% 52%, 100% 100%, 0% 100%)",
    ],
    transition: {
      ease: "easeInOut",
      duration: 6, // 期間
      repeat: Infinity, // 無限ループ
    },
  },
};

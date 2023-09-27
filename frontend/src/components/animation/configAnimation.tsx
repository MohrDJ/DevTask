import React, { useEffect, useRef } from 'react';
import lottie, { AnimationItem } from 'lottie-web'; 

interface LottieAnimationProps {
  animationData: object;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({ animationData }) => {
  const animationContainer = useRef<HTMLDivElement | null>(null);
  let anim: AnimationItem | null = null;

  useEffect(() => {
    if (animationContainer.current && animationData) {
      anim = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: animationData, 
      });

      return () => {
        if (anim) {
          anim.destroy();
        }
      };
    }
  }, [animationData]);

  return <div ref={animationContainer} />;
};

export default LottieAnimation;

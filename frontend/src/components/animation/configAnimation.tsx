import React, { useEffect, useRef } from 'react';
import lottie, { AnimationItem } from 'lottie-web'; 

interface LottieAnimationProps {
  animationData: object;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({ animationData }) => {
  const animationContainer = useRef<HTMLDivElement | null>(null);
  const animRef = useRef<AnimationItem | null>(null);

  useEffect(() => {
    if (animationContainer.current && animationData) {
      animRef.current = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: animationData, 
      });

      return () => {
        if (animRef.current) {
          animRef.current.destroy();
        }
      };
    }
  }, [animationData]);

  return <div ref={animationContainer} />;
};

export default LottieAnimation;

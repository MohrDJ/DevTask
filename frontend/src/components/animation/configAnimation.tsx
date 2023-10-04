import React, { useEffect, useRef } from 'react';
import lottie, { AnimationItem } from 'lottie-web'; 

interface LottieAnimationProps {
  animationData: object;
  width?: string; 
  height?: string; 
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({ animationData, width, height }) => {
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

      if (width && height) {
        animationContainer.current.style.width = width;
        animationContainer.current.style.height = height;
      }

      return () => {
        if (animRef.current) {
          animRef.current.destroy();
        }
      };
    }
  }, [animationData, width, height]);

  return <div ref={animationContainer} />;
};

export default LottieAnimation;

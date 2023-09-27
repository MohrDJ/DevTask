interface LottieAnimationProps {
    animationData: {
      v: string;
      meta: {
        g: string;
        a: string;
        k: string;
        d: string;
      };
      fr: number;
      ip: number;
      op: number;
      w: number;
      h: number;
      nm: string;
      ddd: number;
      assets: { id: string; layers: Layer[] }[];
      layers: Layer[]; 
    };
  }
  
  interface Layer {
    ddd: number;
    ind: number;
    ty: number;
    nm: string;
    sr: number;
    ks: {
      o: {
        a: number;
        k: number;
      };
      r: {
        a: number;
        k: number;
      };
      p: {
        a: number;
        k: number[];
      };
      a: {
        a: number;
        k: number[];
      };
      s: {
        a: number;
        k: number[];
      };
    };
    ao: number;
    ip: number;
    op: number;
    st: number;
    bm: number;
  }
  
  export default LottieAnimationProps;
  
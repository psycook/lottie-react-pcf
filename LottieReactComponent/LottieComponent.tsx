import * as React from 'react';
import { render } from 'react-dom';
import missing from './animation/missing.json';
import Lottie from 'react-lottie';

export interface ILottieComponentProps {
  json: string;
  loop: boolean;
  loopCount: number;
  autoplay: boolean;
  width: string;
  height: string;
}

export const LottieComponent: React.FC<ILottieComponentProps> = ({ json, loop, loopCount, autoplay, width, height }) => {
  const computedLoop: number | boolean = (loop === false) ? false : (loopCount === -1) ? true : loopCount;

  if (json === undefined || json === null || json === "" || json === "{}") {
    json = JSON.stringify(missing);
    autoplay = true;
    loop = true;
  }
  else {
    try {
      JSON.parse(json);
    }
    catch (e) {
      json = JSON.stringify(missing);
      autoplay = true;
      loop = true;
    }
  }

  const defaultOptions = {
    loop: computedLoop,
    autoplay: autoplay,
    animationData: JSON.parse(json),
    rendererSettings: {
      preserveAspectRatio: "xMidYMid meet",
      className: "lottie-anim",
      id: "lottie-anim-id"
    }
  };

  return (
    <div id="lottie-container" style={{ width: width, height: height }}>
      <Lottie
        options={defaultOptions}
        width={width}
        height={height}
      />
    </div>
  );
}
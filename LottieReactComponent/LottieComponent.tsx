import React from 'react';
import missing from './animation/missing.json';
import Lottie from 'react-lottie';

export interface ILottieComponentProps {
  json: string;
  loop: boolean;
  loopCount: number;
  playing: boolean;
  width: string;
  height: string;
}

export const LottieComponent: React.FC<ILottieComponentProps> = ({ json, loop, loopCount, playing, width, height }) => {
  const computedLoop: number | boolean = (loop === false) ? false : (loopCount === -1) ? true : loopCount;

  if (json === undefined || json === null || json === "" || json === "{}") {
    json = JSON.stringify(missing);
    playing = true;
    loop = true;
  }
  else {
    try {
      JSON.parse(json);
    }
    catch (e) {
      json = JSON.stringify(missing);
      playing = true;
      loop = true;
    }
  }

  const defaultOptions = {
    loop: computedLoop,
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
        isStopped={!playing}
        isPaused={!playing}
      />
    </div>
  );
}
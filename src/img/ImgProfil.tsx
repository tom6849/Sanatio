import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

const ImgProfil = ({ size = 24, color = "black"}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      strokeLinejoin="round"
      d="M4 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"
      fill="none"
      stroke={color}
      strokeWidth={1}
    />
    <Circle cx="12" cy="7" r="3" fill="none" stroke={color} strokeWidth={1} />
  </Svg>
);

export default ImgProfil;

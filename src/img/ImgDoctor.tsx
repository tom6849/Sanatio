import React from 'react';
import Svg, { Path } from 'react-native-svg';

const ImgDoctor = ({ size = 24, color = "#292F35" }) => (
  <Svg width={size} height={size} viewBox="0 0 12 12" fill={color}>
    <Path d="M4 3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1h1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H8v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h1zm3 0H5v1.5a.5.5 0 0 1-.5.5H3v2h1.5a.5.5 0 0 1 .5.5V9h2V7.5a.5.5 0 0 1 .5-.5H9V5H7.5a.5.5 0 0 1-.5-.5z" />
  </Svg>
);

export default ImgDoctor;
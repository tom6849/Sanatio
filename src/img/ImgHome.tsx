import React from 'react';
import Svg, { Path } from 'react-native-svg';

const ImgHome = ({ size = 24, color = "black" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="m12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81zM12 3L2 12h3v8h6v-6h2v6h6v-8h3z" fill={color} />
  </Svg>
);

export default ImgHome;

import React from 'react';
import Svg, { Path } from 'react-native-svg';

const ImgArrowRight = ({ size = 24, color = "white" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path fill={color} d="m13.172 12l-4.95-4.95l1.414-1.413L16 12l-6.364 6.364l-1.414-1.415z"/>
  </Svg>
);

export default ImgArrowRight;

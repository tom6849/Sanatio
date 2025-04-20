import React from 'react';
import Svg, { Path } from 'react-native-svg';

const ImgHeight = ({ size = 24, color = "black" }) => (
  <Svg width={size} height={size} viewBox="0 0 21 21" fill="none">
    <Path 
      d="m14.519 5.497l-4-4l-4.015 4m8.015 10l-4 4l-4.015-4m4-13.993v18"
      stroke={color} 
      strokeWidth={1} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
  </Svg>
);

export default ImgHeight;

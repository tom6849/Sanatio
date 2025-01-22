import React from 'react';
import Svg, { Path } from 'react-native-svg';

const ImgHome = ({ size = 100, color = "black" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M8 4h8V2h2v2h1a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1V2h2zM5 8v12h14V8zm2 3h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2zm0 4h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2H7z" fill={color} />
  </Svg>
);

export default ImgHome;

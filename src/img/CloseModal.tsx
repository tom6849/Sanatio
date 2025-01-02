import React from 'react';
import Svg, { Path } from 'react-native-svg';

const CloseModal = ({ size = 18, color = "white" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      fill={color}  
      d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"
    />
  </Svg>
);

export default CloseModal;

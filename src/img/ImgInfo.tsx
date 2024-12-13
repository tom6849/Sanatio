import React from 'react';
import Svg, { Path } from 'react-native-svg';

const ImgInfo = ({ size = 18, color = "white" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      fill="#292F35"
      d="M12 1.999c5.524 0 10.002 4.478 10.002 10.002c0 5.523-4.478 10.001-10.002 10.001S2 17.524 2 12.001C1.999 6.477 6.476 1.999 12 1.999"
      opacity={0.3}
    />
    <Path
      fill={color}
      d="M12.001 6.5a1.252 1.252 0 1 0 .002 2.503A1.252 1.252 0 0 0 12 6.5zm-.005 3.749a1 1 0 0 0-.992.885l-.007.116l.004 5.502l.006.117a1 1 0 0 0 1.987-.002L13 16.75l-.004-5.501l-.007-.117a1 1 0 0 0-.994-.882z"
    />
  </Svg>
);

export default ImgInfo;

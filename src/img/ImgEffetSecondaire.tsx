import React from 'react';
import Svg, { Path } from 'react-native-svg';

const ImgEffetSecondaire = ({ size = 24, color = "#292F35" }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
  >
    <Path
      stroke={color}
      strokeLinejoin="round"
      strokeWidth="4"
      d="M24 44a19.94 19.94 0 0 0 14.142-5.858A19.94 19.94 0 0 0 44 24a19.94 19.94 0 0 0-5.858-14.142A19.94 19.94 0 0 0 24 4A19.94 19.94 0 0 0 9.858 9.858A19.94 19.94 0 0 0 4 24a19.94 19.94 0 0 0 5.858 14.142A19.94 19.94 0 0 0 24 44Z"
    />
    <Path
      fill={color}
      fillRule="evenodd"
      d="M24 37a2.5 2.5 0 1 0 0-5a2.5 2.5 0 0 0 0 5"
      clipRule="evenodd"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="4"
      d="M24 12v16"
    />
  </Svg>
);

export default ImgEffetSecondaire;

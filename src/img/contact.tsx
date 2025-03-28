import React from 'react';
import Svg, { Path, Rect, G } from 'react-native-svg';

const Contact = ({ size = 100, color = "black" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <G color={color}>
      <Rect width="17.5" height="20" x="4" y="2" rx="4" />
      <Path d="M10.59 13.74c-.629.422-2.277 1.282-1.273 2.358c.49.526 1.037.902 1.723.902h3.92c.686 0 1.233-.376 1.723-.902c1.004-1.076-.644-1.936-1.273-2.357a4.29 4.29 0 0 0-4.82 0M15 9a2 2 0 1 1-4 0a2 2 0 0 1 4 0M5 6H2.5M5 12H2.5M5 18H2.5" />
    </G>
  </Svg>
);

export default Contact;

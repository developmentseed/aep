import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from 'styled-components';

const calculateBreakpoints = (ranges) => {
  const w = window.innerWidth;
  const mediaKeys = Object.keys(ranges);
  return mediaKeys.reduce((acc, k) => {
    const [lower, upper] = ranges[k];

    if (lower) {
      acc[`${k}Up`] = w >= lower;
    }
    if (upper) {
      acc[`${k}Down`] = w <= upper;
    }
    if (lower && upper) {
      acc[`${k}Only`] = w >= lower && w <= upper;
    }

    return acc;
  }, {});
};

export default function useBreakpoints() {
  const theme = useContext(ThemeContext);
  const [breakpoints, setBreakpoints] = useState(
    calculateBreakpoints(theme.mediaRanges)
  );

  useEffect(() => {
    const listener = () => {
      const newBreak = calculateBreakpoints(theme.mediaRanges);
      // Quick compare check to see if properties changed.
      for (const r in newBreak) {
        if (newBreak[r] !== breakpoints[r]) {
          setBreakpoints(newBreak);
          return;
        }
      }
    };

    window.addEventListener('resize', listener);
    return () => {
      window.removeEventListener('resize', listener);
    };
  }, [breakpoints, theme.mediaRanges]);

  return breakpoints;
}

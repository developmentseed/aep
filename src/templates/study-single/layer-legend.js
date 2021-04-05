import React from 'react';
import T from 'prop-types';
import styled, { css } from 'styled-components';
import {
  glsp,
  visuallyHidden,
  themeVal,
  truncated
} from '@devseed-ui/theme-provider';
import { headingAlt } from '@devseed-ui/typography';

import { formatThousands } from '../../utils/format';
import { graphql, useStaticQuery } from 'gatsby';

const makeGradient = (stops) => {
  const d = 100 / stops.length - 1;
  const steps = stops.map((s, i) => `${s} ${i * d}%`);
  return `linear-gradient(to right, ${steps.join(', ')})`;
};

const printLegendVal = (val) =>
  typeof val === 'number' ? formatThousands(val, { shorten: true }) : val;

const LayerLegendSelf = styled.div`
  grid-row: 2;
  grid-column: 1 / span 2;
`;

const LegendList = styled.dl`
  display: grid;
  grid-gap: 0 ${glsp(1 / 8)};
  grid-auto-columns: minmax(1rem, 1fr);
  grid-auto-flow: column;

  dt {
    grid-row: 1;
  }

  dd {
    ${headingAlt()}
    font-size: 0.75rem;
    line-height: 1rem;
    grid-row: 2;
    display: flex;

    /* stylelint-disable-next-line no-descending-specificity */
    > * {
      width: 8rem;

      /* stylelint-disable-next-line no-descending-specificity */
      > * {
        ${truncated()}
        display: block;
      }

      &:last-child:not(:first-child) {
        text-align: right;
      }
    }

    &:last-of-type:not(:first-of-type) {
      justify-content: flex-end;
      text-align: right;
    }

    &:not(:first-of-type):not(:last-of-type) {
      ${visuallyHidden()}
    }

    i {
      margin: 0 auto;
      opacity: 0;
    }
  }
`;

const LegendSwatch = styled.span`
  display: block;
  font-size: 0;
  height: 0.5rem;
  border-radius: ${themeVal('shape.rounded')};
  background: ${({ stops }) =>
    typeof stops === 'string' ? stops : makeGradient(stops)};
  margin: 0 0 ${glsp(1 / 8)} 0;
  box-shadow: inset 0 0 0 1px ${themeVal('color.baseAlphaB')};
  cursor: ${(props) => (props['data-tip'] ? 'help' : 'auto')};
`;

const LayerLegendTitle = styled.h2`
  ${visuallyHidden()}
`;

const computeBorder = ({ dashed, color }) => {
  return css`
    border: 1px ${dashed ? 'dashed' : 'solid'} ${color};
  `;
};

const LayerSubtitle = styled.p`
  grid-column: 1;
  box-shadow: 1px 0 0 0 ${themeVal('color.baseAlphaC')};
  padding-right: 0.25rem;

  span {
    position: relative;
    display: flex;
    border-radius: ${themeVal('shape.rounded')};

    height: 1.25rem;
    width: 1.25rem;
    font-size: 0;
    justify-content: center;
    align-items: center;

    ${({ type }) =>
      type === 'circle'
        ? css`
            display: block;
            content: '';
            background: red;
          `
        : css`
            &::before {
              ${computeBorder}
              display: block;
              content: '';
              height: 100%;
              width: 1px;
              transform: rotate(45deg);
              border-radius: ${themeVal('shape.ellipsoid')};
            }
          `}
  }
`;

export function LegendGradient(props) {
  const { min, max, stops } = props;

  return (
    <LayerLegendSelf>
      <LayerLegendTitle>Legend</LayerLegendTitle>
      <LegendList>
        <dt>
          <LegendSwatch stops={stops}>
            {stops[0]} to {stops[stops.length - 1]}
          </LegendSwatch>
        </dt>
        <dd>
          <span>{printLegendVal(min)}</span>
          <i> – </i>
          <span>{printLegendVal(max)}</span>
        </dd>
      </LegendList>
    </LayerLegendSelf>
  );
}

LegendGradient.propTypes = {
  min: T.oneOfType([T.string, T.number]),
  max: T.oneOfType([T.string, T.number]),
  stops: T.array
};

export function LegendIcon(props) {
  const { type, color, icon, dashed } = props;

  const icons = useStaticQuery(graphql`
    query {
      allFile(filter: { sourceInstanceName: { eq: "icons" } }) {
        nodes {
          name
          publicURL
        }
      }
    }
  `);

  if (type === 'gradient') {
    return null;
  }

  if (type === 'symbol') {
    const iconData = icons.allFile.nodes.find((n) => n.name === icon);
    return (
      iconData && (
        <LayerSubtitle>
          <img src={iconData.publicURL} />
        </LayerSubtitle>
      )
    );
  }

  return (
    <LayerSubtitle type={type} color={color} dashed={dashed}>
      <span>{type} type layer</span>
    </LayerSubtitle>
  );
}

LegendIcon.propTypes = {
  type: T.string,
  color: T.string,
  icon: T.string,
  dashed: T.bool
};

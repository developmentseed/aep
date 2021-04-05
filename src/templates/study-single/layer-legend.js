import React from 'react';
import T from 'prop-types';
import styled, { css } from 'styled-components';
import { tint } from 'polished';
import {
  glsp,
  visuallyHidden,
  stylizeFunction,
  themeVal,
  truncated
} from '@devseed-ui/theme-provider';
import { headingAlt } from '@devseed-ui/typography';

import { formatThousands } from '../../utils/format';
import { graphql, useStaticQuery } from 'gatsby';

const _tint = stylizeFunction(tint);

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

const renderIconography = ({ type, dashed, color }) => {
  switch (type) {
    case 'line': {
      const borderStyle = css`
        border: 1px ${dashed ? 'dashed' : 'solid'} ${color};
      `;

      return css`
        &::before {
          ${borderStyle}
          display: block;
          content: '';
          height: 100%;
          width: 1px;
          transform: rotate(45deg);
          border-radius: ${themeVal('shape.ellipsoid')};
        }
      `;
    }
    case 'circle':
      return css`
        &::before {
          display: block;
          height: 0.75rem;
          width: 0.75rem;
          content: '';
          background: ${color};
          border-radius: ${themeVal('shape.ellipsoid')};
        }
      `;
    case 'gradient':
      return css`
        &::before {
          display: block;
          height: 100%;
          width: 100%;
          content: '';
          background: blue;
          background: linear-gradient(
            to right,
            ${_tint(0.8, themeVal('color.base'))},
            ${_tint(0.32, themeVal('color.base'))}
          );
          border-radius: ${themeVal('shape.rounded')};
        }
      `;
  }
};

const LayerSubtitle = styled.p`
  grid-column: 1;

  span {
    position: relative;
    display: flex;
    height: 1rem;
    width: 1rem;
    justify-content: center;
    align-items: center;
    font-size: 0;

    ${renderIconography}

    img {
      max-width: 100%;
      height: auto;
    }
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

  if (type === 'symbol') {
    const iconData = icons.allFile.nodes.find((n) => n.name === icon);
    return (
      iconData && (
        <LayerSubtitle>
          <span>
            <img src={iconData.publicURL} alt='Layer icon' />
            {type} type layer
          </span>
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

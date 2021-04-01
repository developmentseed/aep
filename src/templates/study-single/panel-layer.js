import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';
// import ReactTooltip from 'react-tooltip';
import { glsp, media, themeVal, truncated } from '@devseed-ui/theme-provider';
import { AccordionFold } from '@devseed-ui/accordion';
import { Heading } from '@devseed-ui/typography';
import { Button } from '@devseed-ui/button';
import { headingAlt } from '@devseed-ui/typography';

import Prose from '../../styles/typography/prose';
// import LayerLegend from './layer-legend';

const LayerSelf = styled(AccordionFold)`
  position: relative;
  border-radius: 0;
`;

const LayerHeader = styled.header`
  display: grid;
  grid-auto-columns: 1fr min-content;
  grid-gap: ${glsp(0.5)};
  padding: ${glsp(0.5, themeVal('layout.gap.xsmall'))};
  align-items: center;

  ${media.mediumUp`
    padding: ${glsp(0.5, themeVal('layout.gap.medium'))};
  `}
`;

const LayerHeadline = styled.div`
  grid-row: 1;
  min-width: 0px;
`;

const LayerTitle = styled(Heading)`
  ${truncated()}
  font-size: 0.875rem;
  line-height: 1.25rem;
  margin: 0;

  sub {
    bottom: 0;
  }
`;

const LayerToolbar = styled.div`
  grid-row: 1;
  display: grid;
  grid-gap: ${glsp(0.25)};
  margin: ${glsp(-0.5, 0)};

  > * {
    grid-row: 1;
  }
`;

const LayerBodyInner = styled(Prose)`
  position: relative;
  z-index: 8;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${glsp()};
  box-shadow: inset 0 1px 0 0 ${themeVal('color.baseAlphaB')},
    inset 0 -1px 0 0 ${themeVal('color.baseAlphaB')};
  background: ${themeVal('color.baseAlphaA')};
  font-size: 0.875rem;
  line-height: 1.25rem;
  backdrop-filter: saturate(48%);
  padding: ${glsp(1, themeVal('layout.gap.xsmall'))};
  mask-image: linear-gradient(
    to right,
    transparent 0,
    black ${glsp(themeVal('layout.gap.xsmall'))}
  );

  ${media.mediumUp`
    padding: ${glsp(1, themeVal('layout.gap.medium'))};
    mask-image: linear-gradient(
    to right,
    transparent 0,
    black ${glsp(themeVal('layout.gap.medium'))}
  );
  `}

  /* stylelint-disable-next-line no-descending-specificity */
  > * {
    margin-bottom: ${glsp(0.75)};
  }
`;

const LayerDetailsList = styled.dl`
  display: grid;
  grid-template-columns: minmax(min-content, max-content) 1fr;
  grid-gap: ${glsp(0.25, 1)};

  dt {
    ${headingAlt()}
    font-size: 0.75rem;
    line-height: inherit;
  }

  dd {
    font-weight: ${themeVal('type.base.bold')};
  }
`;

function PanelLayer(props) {
  const {
    label,
    active,
    disabled = false,
    info,
    source,
    onToggleClick,
    isExpanded,
    setExpanded
  } = props;

  return (
    <LayerSelf
      forwardedAs='article'
      isFoldExpanded={isExpanded}
      setFoldExpanded={setExpanded}
      renderHeader={({ isFoldExpanded, setFoldExpanded }) => (
        <LayerHeader>
          <LayerHeadline>
            <LayerTitle title={label}>{label}</LayerTitle>
          </LayerHeadline>
          <LayerToolbar>
            <Button
              variation={isFoldExpanded ? 'primary-plain' : 'base-plain'}
              size='small'
              useIcon='circle-information'
              title='Show/hide layer info'
              hideText
              disabled={!info && !source}
              onClick={() => setFoldExpanded(!isFoldExpanded)}
            >
              <span>Info</span>
            </Button>
            <Button
              variation={active ? 'primary-plain' : 'base-plain'}
              size='small'
              useIcon={active ? 'eye' : 'eye-disabled'}
              disabled={disabled}
              title='Enable/disable layer'
              hideText
              onClick={onToggleClick}
            >
              Enable layer
            </Button>
          </LayerToolbar>
          {/* <LayerLegend
            dataOrder={dataOrder}
            legend={legend}
            knobPos={knobPos}
            onLegendKnobChange={onLegendKnobChange}
            id={id}
          /> */}
        </LayerHeader>
      )}
      renderBody={() => (
        <LayerBodyInner>
          {info}
          {source && (
            <LayerDetailsList>
              <dt>Source</dt>
              <dd>
                <a href={source.url} target='_blank' rel='noreferrer'>
                  {source.name}
                </a>
              </dd>
            </LayerDetailsList>
          )}
        </LayerBodyInner>
      )}
    />
  );
}

PanelLayer.propTypes = {
  label: T.string,
  active: T.bool,
  disabled: T.bool,
  info: T.node,
  source: T.object,
  onToggleClick: T.func,
  isExpanded: T.bool,
  setExpanded: T.func
};

export default PanelLayer;

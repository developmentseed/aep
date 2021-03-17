import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';
// import ReactTooltip from 'react-tooltip';
import { glsp, media, themeVal, truncated } from '@devseed-ui/theme-provider';
import { AccordionFold } from '@devseed-ui/accordion';
import { Button } from '@devseed-ui/button';

import Prose from '../../styles/typography/prose';
// import LayerLegend from './layer-legend';

const LayerSelf = styled(AccordionFold)`
  position: relative;
  box-shadow: 0 1px 0 0 ${themeVal('color.baseAlphaB')};
`;

const LayerHeader = styled.header`
  display: grid;
  grid-auto-columns: 1fr min-content;
  grid-gap: ${glsp(0.5)};
  padding: ${glsp(0.5, themeVal('layout.gap.xsmall'))};

  ${media.mediumUp`
    padding: ${glsp(0.5, themeVal('layout.gap.medium'))};
  `}
`;

const LayerHeadline = styled.div`
  grid-row: 1;
  min-width: 0px;
`;

const LayerTitle = styled.h1`
  ${truncated()}
  font-size: 1rem;
  line-height: 1.25rem;
  margin: 0;

  sub {
    bottom: 0;
  }
`;

const LayerToolbar = styled.div`
  grid-row: 1;
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;

  > * {
    margin-top: -0.125rem;
  }

  > *:not(:first-child) {
    margin-left: ${glsp(0.25)};
  }
`;

const LayerBodyInner = styled(Prose)`
  position: relative;
  z-index: 8;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${glsp()};
  box-shadow: inset 0 1px 0 0 ${themeVal('color.baseAlphaB')};
  background: rgba(255, 255, 255, 0.02);
  font-size: 0.875rem;
  line-height: 1.25rem;
  backdrop-filter: saturate(48%);
  padding: ${glsp(1, themeVal('layout.gap.xsmall'))};

  ${media.mediumUp`
    padding: ${glsp(1, themeVal('layout.gap.medium'))};
  `}

  /* stylelint-disable-next-line no-descending-specificity */
  > * {
    margin-bottom: ${glsp(0.75)};
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
              variation='base-plain'
              size='small'
              useIcon='circle-information'
              title='Show/hide layer info'
              hideText
              disabled={!info && !source}
              active={isFoldExpanded}
              onClick={() => setFoldExpanded(!isFoldExpanded)}
            >
              <span>Info</span>
            </Button>
            <Button
              variation='base-plain'
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
            <dl>
              <dt>Source</dt>
              <dd>
                <a href={source.url} target='_blank' rel='noreferrer'>
                  {source.name}
                </a>
              </dd>
            </dl>
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

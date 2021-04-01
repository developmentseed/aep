import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import { Accordion } from '@devseed-ui/accordion';
import { glsp } from '@devseed-ui/theme-provider';
import ShadowScrollbar from '@devseed-ui/shadow-scrollbar';

import {
  PanelGroup,
  PanelGroupHeader,
  PanelGroupTitle
} from '../../styles/panel';
import PanelLayer from './panel-layer';

export const PanelGroupBodyScroll = styled(ShadowScrollbar)`
  flex: 1;
  padding-bottom: ${glsp(1)};
`;

function PanelLayersGroup(props) {
  const { title, onAction, layers = [] } = props;

  return (
    <PanelGroup>
      <PanelGroupHeader>
        <PanelGroupTitle>{title}</PanelGroupTitle>
      </PanelGroupHeader>
      <PanelGroupBodyScroll>
        <Accordion>
          {({ checkExpanded, setExpanded }) => (
            <ol>
              {layers.map((l, idx) => (
                <li key={l.id}>
                  <PanelLayer
                    id={l.id}
                    label={l.name}
                    disabled={l.disabled}
                    active={l.visible}
                    info={l.info}
                    source={l.source}
                    // legend={l.legend}
                    isExpanded={checkExpanded(idx)}
                    setExpanded={(v) => setExpanded(idx, v)}
                    onToggleClick={() => onAction('layer.toggle', l)}
                  />
                </li>
              ))}
            </ol>
          )}
        </Accordion>
      </PanelGroupBodyScroll>
    </PanelGroup>
  );
}

PanelLayersGroup.propTypes = {
  onAction: T.func,
  title: T.string,
  layers: T.array
};

export default PanelLayersGroup;

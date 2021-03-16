import React from 'react';
import T from 'prop-types';
import { Accordion } from '@devseed-ui/accordion';

import {
  PanelGroup,
  PanelGroupHeader,
  PanelGroupTitle,
  PanelGroupBody
} from '../../styles/panel';
import PanelLayer from './panel-layer';

function PanelLayersGroup(props) {
  const { title, onAction, layers = [] } = props;

  return (
    <PanelGroup>
      <PanelGroupHeader>
        <PanelGroupTitle>{title}</PanelGroupTitle>
      </PanelGroupHeader>
      <PanelGroupBody>
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
      </PanelGroupBody>
    </PanelGroup>
  );
}

PanelLayersGroup.propTypes = {
  onAction: T.func,
  title: T.string,
  layers: T.array
};

export default PanelLayersGroup;

import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import { glsp, themeVal } from '@devseed-ui/theme-provider';
import { headingAlt } from '@devseed-ui/typography';
import ShadowScrollbar from '@devseed-ui/shadow-scrollbar';

import MBPopover from '../mb-popover';
import { computeFinalPropValue } from '../../utils/inline-filter-processor';

const WideMBPopover = styled(MBPopover)`
  width: 18rem;
`;

const ShadowScrollbarPopover = styled(ShadowScrollbar)`
  flex: 1;
`;

const PopoverBody = styled.div`
  background: transparent;
  padding-bottom: ${glsp(themeVal('layout.gap.xsmall'))};
`;

const PopoverBodyInner = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${glsp(0.75)};
  padding: ${glsp(
    0.75,
    themeVal('layout.gap.xsmall'),
    0,
    themeVal('layout.gap.xsmall')
  )};
  font-size: 0.875rem;
  line-height: 1.25rem;
`;

const PopoverDetailsList = styled.dl`
  display: grid;
  grid-template-columns: minmax(min-content, max-content) 1fr;
  grid-gap: ${glsp(0.125, 1)};

  dt {
    ${headingAlt()}
    font-size: 0.75rem;
    line-height: inherit;
  }

  dd {
    font-weight: ${themeVal('type.base.bold')};
  }
`;

export default function Popover(props) {
  const { data, mbMap, lngLat, onClose } = props;

  const content = data.properties ? (
    <PopoverDetailsList>
      {Object.keys(data.properties).map((k) => (
        <React.Fragment key={k}>
          <dt>{k}</dt>
          <dd>{data.properties[k]}</dd>
        </React.Fragment>
      ))}
    </PopoverDetailsList>
  ) : null;

  return (
    <WideMBPopover
      mbMap={mbMap}
      lngLat={lngLat}
      onClose={onClose}
      title={data.title}
      content={content}
      renderBody={() => (
        <PopoverBody>
          <ShadowScrollbarPopover
            scrollbarsProps={{ autoHeight: true, autoHeightMax: 200 }}
          >
            <PopoverBodyInner>
              {data.properties ? (
                <PopoverDetailsList>
                  {data.properties.map(({ id, label, value }) => {
                    return (
                      <React.Fragment key={id}>
                        <dt>{label}</dt>
                        <dd>{value}</dd>
                      </React.Fragment>
                    );
                  })}
                </PopoverDetailsList>
              ) : null}
            </PopoverBodyInner>
          </ShadowScrollbarPopover>
        </PopoverBody>
      )}
    />
  );
}

Popover.propTypes = {
  data: T.object,
  mbMap: T.object,
  lngLat: T.array,
  onClose: T.func
};

/**
 * Prepares the list of properties to display on the popover taking into account
 * the display data settings defined in the panel layer.
 *
 * @param {object} panelLayer The panel layer definition
 * @param {object} feature The map feature as returned by mapbox
 * @returns array
 */
export function computePopoverProperties(panelLayer, feature) {
  const { displayData } = panelLayer;

  // If there's no data config, return all feature values.
  if (!displayData?.length) {
    return Object.keys(feature.properties).map((k) => {
      const v = feature.properties[k];
      return {
        id: k,
        label: k,
        value: v
          ? typeof v === 'string'
            ? v.trim() || 'n/a'
            : v || 'n/a'
          : 'n/a'
      };
    });
  }

  return displayData
    .map((d, idx) => {
      // To compute the label and the corresponding value we look at the keys of
      // each displayData object.
      // If there is a `label` property we assume that is it. If there is a
      // `labelProp` that means that we need to get the value from the feature
      // properties and compute it's value.
      // The same is valid for the `value` but the keys are `value` and
      // `valueProp`respectively.

      // Compute the label value.
      let label;
      // If there is a static label it has priority.
      if (d.label) {
        label = d.label;
        // Compute dynamic if it exists.
      } else if (d.labelProp) {
        label = computeFinalPropValue(d.labelProp, feature.properties);
      } else {
        // eslint-disable-next-line
        console.error(
          `Label not found for layer [${panelLayer.id}] - displayData index ${idx}`
        );
        return null;
      }

      // Compute the value value.
      let value;
      // If there is a static value it has priority.
      if (d.value) {
        value = d.value;
        // Compute dynamic if it exists.
      } else if (d.valueProp) {
        value = computeFinalPropValue(d.valueProp, feature.properties);
      } else {
        // eslint-disable-next-line
        console.error(
          `Value not found for layer [${panelLayer.id}] - displayData index ${idx}`
        );
        return null;
      }

      return { id: idx, label, value };
    })
    .filter(Boolean);
}

import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import { glsp, themeVal } from '@devseed-ui/theme-provider';
import { headingAlt } from '@devseed-ui/typography';
import ShadowScrollbar from '@devseed-ui/shadow-scrollbar';

import MBPopover from '../mb-popover';

const WideMBPopover = styled(MBPopover)`
  width: 20rem;
`;

const ShadowScrollbarPopover = styled(ShadowScrollbar)`
  flex: 1;
`;

const PopoverBody = styled.div`
  background: transparent;
`;

const PopoverBodyInner = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${glsp(0.75)};
  padding: ${glsp(
    0.75,
    themeVal('layout.gap.xsmall'),
    0.75,
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
                  {Object.keys(data.properties).map((k) => {
                    const v = data.properties[k];
                    return (
                      <React.Fragment key={k}>
                        <dt>{k}</dt>
                        <dd>
                          {v
                            ? typeof v === 'string'
                              ? v.trim() || 'n/a'
                              : v || 'n/a'
                            : 'n/a'}
                        </dd>
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

import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import { Button } from '@devseed-ui/button';
import Dropdown, {
  DropTitle,
  DropMenu,
  DropMenuItem
} from '@devseed-ui/dropdown';
import { themeVal, glsp } from '@devseed-ui/theme-provider';
import collecticon from '@devseed-ui/collecticons';

import { Link } from '../styles/clean/link';

// TODO: Remove once ui library is updated.
const DropMenuItemLink = styled(DropMenuItem)`
  &.active {
    color: ${themeVal('color.primary')};

    &::after {
      ${collecticon('tick--small')}
      position: absolute;
      z-index: 1;
      top: ${glsp(1 / 4)};
      right: ${glsp(1 / 2)};
      font-size: 1rem;
      line-height: 1.5rem;
      width: 1.5rem;
      text-align: center;
    }
  }
`;

function BurgerOptions(props) {
  const { items } = props;

  return (
    <Dropdown
      alignment='right'
      direction='down'
      triggerElement={(props) => (
        <Button
          variation='achromic-plain'
          title='Toggle menu options'
          hideText
          useIcon='hamburger-menu'
          {...props}
        >
          Browse
        </Button>
      )}
    >
      <DropTitle>Browse</DropTitle>
      <DropMenu role='menu' selectable>
        {items.map((l) => (
          <li key={l.url}>
            <DropMenuItemLink
              as={Link}
              activeClassName='active'
              partiallyActive={l.partiallyActive}
              to={l.url}
              title={l.title}
              data-dropdown='click.close'
            >
              {l.label}
            </DropMenuItemLink>
          </li>
        ))}
      </DropMenu>
    </Dropdown>
  );
}

BurgerOptions.propTypes = {
  items: T.array
};

export default BurgerOptions;

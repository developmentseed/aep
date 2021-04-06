import React from 'react';
import T from 'prop-types';
import { Button } from '@devseed-ui/button';
import Dropdown, {
  DropTitle,
  DropMenu,
  DropMenuItem
} from '@devseed-ui/dropdown';

import { Link } from '../styles/clean/link';

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
      <DropMenu role='menu'>
        {items.map((l) => (
          <li key={l.url}>
            <DropMenuItem
              as={Link}
              activeClassName='active'
              partiallyActive={l.partiallyActive}
              to={l.url}
              title={l.title}
              data-dropdown='click.close'
            >
              {l.label}
            </DropMenuItem>
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

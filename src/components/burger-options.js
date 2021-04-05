import React from 'react';

import { Button } from '@devseed-ui/button';
import Dropdown, {
  DropTitle,
  DropMenu,
  DropMenuItem
} from '@devseed-ui/dropdown';

function BurgerOptions() {
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
        <li>
          <DropMenuItem href='#' title='View Item A'>
            Item A
          </DropMenuItem>
        </li>
        <li>
          <DropMenuItem href='#' title='View Item B'>
            Item B
          </DropMenuItem>
        </li>
        <li>
          <DropMenuItem href='#' title='View Item C'>
            Item C
          </DropMenuItem>
        </li>
        <li>
          <DropMenuItem href='#' title='View Item D'>
            Item D
          </DropMenuItem>
        </li>
        <li>
          <DropMenuItem href='#' title='View Item E'>
            Item E
          </DropMenuItem>
        </li>
      </DropMenu>
    </Dropdown>
  );
}

export default BurgerOptions;

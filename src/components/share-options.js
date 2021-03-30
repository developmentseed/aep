import React, { useEffect, useRef, useState } from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import Clipboard from 'clipboard';

import { Button } from '@devseed-ui/button';
import Dropdown, {
  DropTitle,
  DropMenu,
  DropInset,
  DropMenuItem
} from '@devseed-ui/dropdown';
import { Form, FormInput } from '@devseed-ui/form';

const FormInputGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;

  ${FormInput} {
    min-width: 0;
  }

  > :first-child:not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  > :last-child:not(:first-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

function ShareOptions() {
  // Get url from window since it is easier.
  // Gatsby ensures the location refresh.
  const url = typeof window !== 'undefined' ? window.location.toString() : '';

  return (
    <Dropdown
      alignment='right'
      direction='down'
      triggerElement={(props) => (
        <Button
          variation='achromic-plain'
          title='Toggle share options'
          hideText
          useIcon='share'
          {...props}
        >
          Share
        </Button>
      )}
    >
      <DropTitle>Share</DropTitle>
      <DropMenu role='menu' iconified>
        <li>
          <Button
            forwardedAs={DropMenuItem}
            useIcon='brand-facebook'
            href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
            title='Share on Facebook'
            target='_blank'
          >
            Facebook
          </Button>
        </li>
        <li>
          <Button
            forwardedAs={DropMenuItem}
            useIcon='brand-twitter'
            href={`https://twitter.com/intent/tweet?url=${url}`}
            title='Share on Twitter'
            target='_blank'
          >
            Twitter
          </Button>
        </li>
      </DropMenu>
      <DropInset>
        <CopyField value={url} />
      </DropInset>
    </Dropdown>
  );
}

export default ShareOptions;

// This needs to be a separate class because of the mount and unmount methods.
// The dropdown unmounts when closed and the refs would be lost otherwise.
function CopyField(props) {
  const { value } = props;

  const [showCopiedMsg, setShowCopiedMsg] = useState(false);
  const triggerElement = useRef(null);

  useEffect(() => {
    let copiedMsgTimeout = null;
    const clipboard = new Clipboard(triggerElement.current, {
      text: () => value
    });

    clipboard.on('success', () => {
      setShowCopiedMsg(true);
      copiedMsgTimeout = setTimeout(() => {
        setShowCopiedMsg(false);
      }, 2000);
    });

    return () => {
      clipboard.destroy();
      if (copiedMsgTimeout) clearTimeout(copiedMsgTimeout);
    };
  }, [value]);

  const val = showCopiedMsg ? 'Copied!' : value;

  return (
    <Form action='#'>
      <FormInputGroup>
        <FormInput
          id='site-url'
          name='site-url'
          type='text'
          readOnly
          value={val}
        />
        <Button
          variation='primary-raised-dark'
          hideText
          useIcon='clipboard'
          title='Copy to clipboard'
          ref={triggerElement}
        >
          Copy to clipboard
        </Button>
      </FormInputGroup>
    </Form>
  );
}

CopyField.propTypes = {
  value: T.string
};

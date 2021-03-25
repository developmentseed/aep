import React from 'react';

import Layout from '../../components/layout';
import {
  Inpage,
  InpageHeader,
  InpageTitle,
  InpageHeadline,
  InpageBody
} from '../../styles/inpage';

import { ContentBlock } from '../../styles/content-block';
import Prose from '../../styles/typography/prose';

function Support() {
  return (
    <Layout title='Support'>
      <Inpage>
        <InpageHeader>
          <InpageHeadline>
            <InpageTitle>Project Support</InpageTitle>
          </InpageHeadline>
        </InpageHeader>
        <InpageBody>
          <ContentBlock>
            <Prose>
              <h2>Supporting countries</h2>
              <p>
                More information about the type of support GEPAR provides to
                partner countries.
              </p>
            </Prose>
          </ContentBlock>
        </InpageBody>
      </Inpage>
    </Layout>
  );
}

export default Support;

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

function Toolkit() {
  return (
    <Layout title='Toolkit'>
      <Inpage>
        <InpageHeader>
          <InpageHeadline>
            <InpageTitle>Agricultural Toolkit</InpageTitle>
          </InpageHeadline>
        </InpageHeader>
        <InpageBody>
          <ContentBlock>
            <Prose>
              <h2>Agricultural Toolkit</h2>
              <p>More information about the agricultural toolkit.</p>
            </Prose>
          </ContentBlock>
        </InpageBody>
      </Inpage>
    </Layout>
  );
}

export default Toolkit;

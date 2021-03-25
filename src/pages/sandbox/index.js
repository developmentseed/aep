import React from 'react';

import Layout from '../../components/layout';
import {
  Inpage,
  InpageHeader,
  InpageHeadline,
  InpageTitle,
  InpageSubtitle,
  InpageBody
} from '../../styles/inpage';
import { ContentBlock } from '../../styles/content-block';

function Sandbox() {
  return (
    <Layout title='Sandbox'>
      <Inpage>
        <InpageHeader>
          <InpageHeadline>
            <InpageSubtitle>Sandbox</InpageSubtitle>
            <InpageTitle>Lorem ipsum dolor</InpageTitle>
          </InpageHeadline>
        </InpageHeader>
        <InpageBody>
          <ContentBlock>The sandbox.</ContentBlock>
        </InpageBody>
      </Inpage>
    </Layout>
  );
}

export default Sandbox;

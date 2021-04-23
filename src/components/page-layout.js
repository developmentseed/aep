import React from 'react';
import T from 'prop-types';

import Layout from './layout';
import {
  Inpage,
  InpageHeader,
  InpageTitle,
  InpageHeadline,
  InpageBody
} from '../styles/inpage';
import { ContentBlock } from '../styles/content-block';

function PageLayout(props) {
  const { metaTitle, title, children } = props;
  return (
    <Layout title={metaTitle || title}>
      <Inpage>
        <InpageHeader>
          <InpageHeadline>
            <InpageTitle>{title}</InpageTitle>
          </InpageHeadline>
        </InpageHeader>
        <InpageBody>
          <ContentBlock>{children}</ContentBlock>
        </InpageBody>
      </Inpage>
    </Layout>
  );
}

export default PageLayout;

PageLayout.propTypes = {
  title: T.string,
  metaTitle: T.string,
  children: T.node
};

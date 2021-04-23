import React from 'react';
import T from 'prop-types';
import { graphql } from 'gatsby';

import PageLayout from '../../components/page-layout';
import Prose from '../../styles/typography/prose';

function Support({ data }) {
  const post = data.markdownRemark;
  return (
    <PageLayout title='Project Support' metaTitle='Support'>
      <Prose dangerouslySetInnerHTML={{ __html: post.html }} />
    </PageLayout>
  );
}

export default Support;

Support.propTypes = {
  data: T.object
};

export const query = graphql`
  query {
    markdownRemark(
      fields: { collection: { eq: "page" }, slug: { eq: "support" } }
    ) {
      html
    }
  }
`;

import React from 'react';
import { Link } from 'gatsby';

import Layout from '../../components/layout';
import {
  Inpage,
  InpageHeader,
  InpageHeadline,
  InpageTitle,
  InpageBody
} from '../../styles/inpage';
import Prose from '../../styles/typography/prose';
import { ContentBlock } from '../../styles/content-block';

function UhOh() {
  return (
    <Layout title='Page not found'>
      <Inpage>
        <InpageHeader>
          <InpageHeadline>
            <InpageTitle>Page not found</InpageTitle>
          </InpageHeadline>
        </InpageHeader>
        <InpageBody>
          <ContentBlock>
            <Prose>
              <h2>Oh!</h2>
              <p>
                We were not able to find the page you are looking for. It may
                have been archived or removed.
              </p>
              <p>
                You might find an older snapshot of this page at the{' '}
                <a
                  href='http://archive.org/web/'
                  title='Find on Internet Archive'
                >
                  Internet Archive
                </a>
                .<br /> If you think this page should be here let us know via{' '}
                <a href='mailto:' title='Send us an email'>
                  email
                </a>
                .
              </p>
              <p>
                <Link to='/' title='Visit the homepage'>
                  Visit the homepage
                </Link>
              </p>
            </Prose>
          </ContentBlock>
        </InpageBody>
      </Inpage>
    </Layout>
  );
}

export default UhOh;

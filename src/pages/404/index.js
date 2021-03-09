import React from 'react';
import { Link } from 'gatsby';

import Layout from '../../components/layout';
import {
  Inpage,
  InpageHeader,
  InpageHeaderInner,
  InpageHeadline,
  InpageTitle,
  InpageBody,
  InpageBodyInner
} from '../../styles/inpage';
import Prose from '../../styles/typography/prose';

function UhOh() {
  return (
    <Layout title='Not found'>
      <Inpage>
        <InpageHeader>
          <InpageHeaderInner>
            <InpageHeadline>
              <InpageTitle>Page not found</InpageTitle>
            </InpageHeadline>
          </InpageHeaderInner>
        </InpageHeader>
        <InpageBody>
          <InpageBodyInner>
            <Prose>
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
          </InpageBodyInner>
        </InpageBody>
      </Inpage>
    </Layout>
  );
}

export default UhOh;

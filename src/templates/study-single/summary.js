import React from 'react';
import T from 'prop-types';

import { ContentBlock, Aside } from '../../styles/content-block';
import Prose from '../../styles/typography/prose';
import DetailsList from '../../styles/typography/details-list';

function StudySingleSummary(props) {
  const {
    study: {
      title,
      country,
      study: { consultant, period, scope, summary },
      platform,
      layers
    }
  } = props;

  return (
    <ContentBlock layout='asided'>
      <Prose>
        <h2>Overview</h2>
        <DetailsList>
          <dt>Title</dt>
          <dd>{title}</dd>
          {country && (
            <>
              <dt>Country</dt>
              <dd>{country}</dd>
            </>
          )}
          {period && (
            <>
              <dt>Period</dt>
              <dd>{period}</dd>
            </>
          )}
          <dt>Data layers #</dt>
          <dd>{layers?.length || 0}</dd>
          {consultant && (
            <>
              <dt>Consultant</dt>
              <dd>{consultant}</dd>
            </>
          )}
          {platform?.title && (
            <>
              <dt>Platform</dt>
              <dd>
                {platform.url ? (
                  <a
                    href={platform.url}
                    title='Visit platform'
                    target='_blank'
                    rel='noreferrer'
                  >
                    {platform.title}
                  </a>
                ) : (
                  platform.title
                )}
              </dd>
            </>
          )}
        </DetailsList>
        <h2>Scope</h2>
        <p>{scope}</p>
        <h2>Description</h2>
        <p>{summary}</p>
      </Prose>
      <Aside>
        <Prose>
          <h2>Insights</h2>
          <p>Lorem ipsum dolor sit amet.</p>
          <img
            src='https://via.placeholder.com/1440/CCCCCC'
            width='1440'
            height='1440'
            alt='A placeholder image'
          />
          <p>Lorem ipsum dolor sit amet.</p>
          <img
            src='https://via.placeholder.com/1440/CCCCCC'
            width='1440'
            height='1440'
            alt='A placeholder image'
          />
        </Prose>
      </Aside>
    </ContentBlock>
  );
}

StudySingleSummary.propTypes = {
  study: T.shape({
    title: T.string,
    country: T.string,
    study: T.shape({
      consultant: T.string,
      period: T.oneOfType([T.string, T.number]),
      scope: T.string,
      summary: T.string
    }),
    platform: T.shape({
      title: T.string,
      url: T.string
    }),
    layers: T.array
  })
};

export default StudySingleSummary;

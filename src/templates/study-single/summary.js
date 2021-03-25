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
      study: { consultant, period },
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
                  <a href={platform.url} title='Visit platform'>
                    {platform.title}
                  </a>
                ) : (
                  platform.title
                )}
              </dd>
            </>
          )}
        </DetailsList>
        <h2>Description</h2>
        <p>
          In sed nisi orci. Vestibulum eget aliquet magna. Nulla massa leo,
          pretium id magna iaculis, euismod vulputate odio. Pellentesque quis
          suscipit ante, ut mattis dui. Proin iaculis pharetra facilisis.
          Phasellus et posuere erat, ac fermentum metus. Praesent mollis erat
          vitae imperdiet tristique. Vestibulum blandit fringilla turpis, ac
          congue ligula feugiat posuere. Ut at velit commodo metus mollis
          maximus. Maecenas quis euismod tellus, sit amet placerat sapien. Morbi
          imperdiet justo at imperdiet venenatis.
        </p>
        <img
          src='https://via.placeholder.com/1440/CCCCCC'
          width='1440'
          height='1440'
          alt='A placeholder image'
        />
        <p>
          Nunc viverra vehicula nulla non euismod. Pellentesque ornare fermentum
          quam vel aliquet. Vestibulum ante ipsum primis in faucibus orci luctus
          et ultrices posuere cubilia curae; Fusce vitae bibendum quam, a
          vestibulum erat. Vivamus pulvinar turpis vitae elit commodo, sed
          blandit lacus lobortis. Pellentesque et consequat turpis. Aliquam non
          arcu eu nulla luctus ultricies et in ligula. Nulla porttitor nulla id
          arcu malesuada, id ultricies sapien vulputate. Sed tempus varius sem,
          commodo faucibus ipsum suscipit sed. Ut sagittis lacus libero, sed
          sodales magna interdum ac.
        </p>
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
      period: T.oneOfType([T.string, T.number])
    }),
    platform: T.shape({
      title: T.string,
      url: T.string
    }),
    layers: T.array
  })
};

export default StudySingleSummary;

import React from 'react';
// import T from 'prop-types';

import { ContentBlock, Aside } from '../../styles/content-block';
import Prose from '../../styles/typography/prose';
import DetailsList from '../../styles/typography/details-list';

function StudySingleSummary() {
  return (
    <ContentBlock layout='asided'>
      <Prose>
        <h2>Overview</h2>
        <DetailsList>
          <dt>Title</dt>
          <dd>Lorem ipsum dolor sit amet</dd>
          <dt>Country</dt>
          <dd>Kenya</dd>
          <dt>Date</dt>
          <dd>
            <time dateTime='2021-02-14'>February 2, 2021</time>
          </dd>
          <dt>Data layers #</dt>
          <dd>24</dd>
          <dt>Consultant</dt>
          <dd>Pellentesque quis</dd>
          <dt>Platform</dt>
          <dd>
            <a href='#' title='Visit platform'>
              Vestibulum eget
            </a>
          </dd>
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

StudySingleSummary.propTypes = {};

export default StudySingleSummary;

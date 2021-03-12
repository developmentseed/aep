import React from 'react';
// import T from 'prop-types';

import { ContentBlock, Aside } from '../../styles/content-block';
import Prose from '../../styles/typography/prose';

function StudySingleSummary() {
  return (
    <ContentBlock layout='asided'>
      <Prose>
        <h2>Summary</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          sapien justo, dignissim a mi eu, faucibus faucibus lectus. Nunc nisl
          neque, dignissim non velit id, sagittis fermentum nulla. Morbi
          vehicula, ante et varius luctus, purus lacus commodo metus, vel ornare
          elit dolor a lorem. Proin vel nunc non enim interdum sagittis a ut
          mauris. Vivamus ut hendrerit sapien. Integer convallis semper ornare.
          Nam non pellentesque justo.
        </p>
        <img
          src='https://via.placeholder.com/1440/CCCCCC'
          width='1440'
          height='1440'
          alt='A placeholder image'
        />
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
          <h2>Graphs</h2>
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

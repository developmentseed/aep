import React from 'react';
import PropTypes from 'prop-types';

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet='utf-8' />
        <meta httpEquiv='x-ua-compatible' content='ie=edge' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, shrink-to-fit=no'
        />
        <style type='text/css'>
          {`
            #welcome-banner {
              display: flex;
              align-items: center;
              text-align: center;
              justify-content: center;
              text-align: center;
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              z-index: 100;
              background: #fff;
              margin: 0;
              padding: 1rem;
              font-family: sans-serif;
              font-size: 1rem;
      
              transition: all 320ms ease-in-out;
            }

            #welcome-banner p {
              opacity: 0.64;
            }

            #welcome-banner.dismissed {
              opacity: 0;
              visibility: hidden;
            }
          `}
        </style>
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div id='welcome-banner'>
          <div>
            {/* To avoid an abrupt transition when the app loads, this banner is
              transitioned out. */}
            <p>Loading...</p>
          </div>
        </div>
        <div
          key='body'
          id='___gatsby'
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  );
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array
};

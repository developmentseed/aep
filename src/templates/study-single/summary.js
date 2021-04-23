import React, { useMemo } from 'react';
import T from 'prop-types';
import styled, { useTheme } from 'styled-components';
import { ResponsivePie } from '@nivo/pie';

import { themeVal, visuallyHidden } from '@devseed-ui/theme-provider';
import { headingAlt } from '@devseed-ui/typography';

import { ContentBlock, Aside } from '../../styles/content-block';
import Prose from '../../styles/typography/prose';
import DetailsList from '../../styles/typography/details-list';

const DonutChartWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 20rem;
  height: 14rem;

  svg {
    * {
      font-family: inherit !important;
    }

    & > g > g:nth-child(2) text {
      font-weight: ${themeVal('type.base.bold')};
      fill: ${themeVal('type.base.color')} !important;
      text-shadow: -1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white,
        1px 1px 0 white;
    }
  }
`;

const NumberChartSelf = styled.p`
  display: grid;
`;

const NumberChartLabel = styled.em`
  grid-row: 2;
  ${headingAlt()}
  font-style: normal;

  span {
    ${visuallyHidden()}
  }
`;

const NumberChartValue = styled.strong`
  font-size: 3rem;
  line-height: 1;
  font-weight: ${themeVal('type.base.bold')};
`;

const pieChartConfig = {
  id: (d) => d.name,
  enableRadialLabels: false,
  margin: { top: 16, right: 120, bottom: 16, left: 16 },
  padAngle: 2,
  cornerRadius: 0,
  // borderWidth: 0,
  // borderColor: {
  //   from: 'color',
  //   modifiers: [['darker', '0.2']]
  // },
  innerRadius: 0.7,
  sliceLabelsSkipAngle: 10,
  legends: [
    {
      anchor: 'right',
      direction: 'column',
      justify: false,
      translateX: 120,
      translateY: 0,
      itemsSpacing: 0,
      itemCount: 3,
      itemWidth: 100,
      itemHeight: 24,
      itemTextColor: '#999',
      itemDirection: 'left-to-right',
      itemOpacity: 1,
      symbolSize: 18,
      symbolShape: 'circle'
    }
  ]
};

function StudySingleSummary(props) {
  const {
    study: {
      title,
      country,
      study: { consultant, period, content },
      platform,
      layers,
      charts
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
      </Prose>
      {content && (
        <Prose
          dangerouslySetInnerHTML={{ __html: content.childMarkdownRemark.html }}
        />
      )}
      <Aside>
        <Prose>
          <h2>Insights</h2>
          {Array.isArray(charts) && charts.map(renderChartType)}
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
      content: T.object
    }),
    platform: T.shape({
      title: T.string,
      url: T.string
    }),
    layers: T.array,
    charts: T.array
  })
};

export default StudySingleSummary;

function renderChartType(chart) {
  switch (chart.type) {
    case 'donut':
      return <DonutChart key={chart.name} {...chart} />;
    case 'number':
      return <NumberChart key={chart.name} {...chart} />;
    default:
      return <p key={chart.name}>Unknown chart type: {chart.type}</p>;
  }
}

const DonutTotal = ({ dataWithArc, centerX, centerY }) => {
  const theme = useTheme();
  const total = dataWithArc.reduce((acc, datum) => acc + datum.value, 0);

  return (
    <text
      x={centerX}
      y={centerY}
      textAnchor='middle'
      dominantBaseline='central'
      fontWeight={theme.type.base.bold}
      fill={theme.type.base.color}
    >
      {total}
    </text>
  );
};

DonutTotal.propTypes = {
  dataWithArc: T.array,
  centerX: T.number,
  centerY: T.number
};

function DonutChart(props) {
  const { name, data } = props;

  const dataWithLabel = useMemo(
    () =>
      data.map((d) => {
        const label = d.name.length > 12 ? `${d.name.slice(0, 12)}...` : d.name;
        return { ...d, label };
      }),
    [data]
  );

  return (
    <React.Fragment>
      <h4>{name}</h4>
      <DonutChartWrapper>
        <ResponsivePie
          {...pieChartConfig}
          data={dataWithLabel}
          layers={['slices', 'sliceLabels', 'legends', DonutTotal]}
        />
      </DonutChartWrapper>
    </React.Fragment>
  );
}

DonutChart.propTypes = {
  name: T.string,
  data: T.array
};

function NumberChart(props) {
  const {
    name,
    datum: { value, unit }
  } = props;

  return (
    <NumberChartSelf>
      <NumberChartLabel>
        {name}
        <span>:</span>
      </NumberChartLabel>
      <NumberChartValue>
        {value} {unit}
      </NumberChartValue>
    </NumberChartSelf>
  );
}

NumberChart.propTypes = {
  name: T.string,
  datum: T.shape({
    value: T.number,
    unit: T.string
  })
};

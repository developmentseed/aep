const contentTypes = ['study'];

const siteUrl = process.env.SITE_URL || 'http://localhost:9000';

module.exports = {
  flags: {
    LAZY_IMAGES: true,
    PARALLEL_SOURCING: true,
    PRESERVE_WEBPACK_CACHE: true
  },
  siteMetadata: {
    title: `Africa Electrification Platform`,
    author: {
      name: `Development Seed`
    },
    description: `Africa Electrification Platform - geospatial analysis for an energy secure future.`,
    siteUrl,
    social: {
      twitter: ''
    },
    mapConfig: {
      basemap: 'mapbox://styles/derilinx/ck3yqjovg4dpn1crwajrc9ajr',
      mbToken:
        'pk.eyJ1IjoiZGVyaWxpbngiLCJhIjoiY2szeTlzbWo2MDV6eDNlcDMxM3dzZXBieiJ9.zPf1iiFilYYwyx6ETNj_8w',
      topLayer: 'admin-2-boundaries-bg'
    }
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    ...contentTypes.reduce(
      (acc, type) => [
        ...acc,
        // A content type is comprised of 2 directories: posts and images.
        {
          resolve: `gatsby-source-filesystem`,
          options: {
            path: `${__dirname}/content/${type}/posts`,
            name: type
          }
        },
        {
          resolve: `gatsby-source-filesystem`,
          options: {
            path: `${__dirname}/content/${type}/media`,
            name: `${type}-media`
          }
        }
      ],
      []
    ),
    {
      resolve: 'gatsby-transformer-yaml-full',
      options: {
        plugins: [
          'gatsby-yaml-full-markdown' // Enable !markdown tags
        ]
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: ''
    //   }
    // }
  ]
};

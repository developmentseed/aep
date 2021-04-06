const fs = require('fs-extra');
const path = require('path');

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions;

  const typeDefs = [
    `
      type LayerLegend {
        type: String
        min: String
        max: String
        stops: [String]
        color: String
        icon: String
        dashed: Boolean
      }

      type PanelLayerSource {
        name: String
        url: String
      }

      type PanelLayer {
        id: String
        name: String
        visible: Boolean
        category: String
        mbLayer: String
        info: String
        source: PanelLayerSource
        legendData: LayerLegend
      }

      type Platform {
        title: String
        url: String
      }

      type StudyInfo {
        consultant: String
        period: String
        scope: String
        summary: String
      }
    `,
    schema.buildObjectType({
      name: 'PostsYaml',
      fields: {
        title: 'String',
        bbox: 'JSON',
        zoomExtent: 'JSON',
        country: 'String',
        platform: 'Platform',
        study: 'StudyInfo',
        layers: '[PanelLayer]',
        mapConfig: {
          type: 'JSON',
          resolve: async (source, args, context) => {
            if (!source.mapConfig) return null;

            // Find the parent File which we'll use to get the directory.
            const parentFileNode = context.nodeModel.findRootNodeAncestor(
              source,
              (node) => node.internal && node.internal.type === `File`
            );
            // Resolve the full path to the map config.
            const mapConfigPath = path.resolve(
              parentFileNode.dir,
              source.mapConfig
            );

            // Check if the file is inside the current directory. This prevents
            // access to other system paths.
            const relative = path.relative(__dirname, mapConfigPath);
            const isSafe =
              relative &&
              !relative.startsWith('..') &&
              !path.isAbsolute(relative);

            if (!isSafe) {
              return null;
            }

            try {
              return fs.readJSON(mapConfigPath);
            } catch (error) {
              /* eslint-disable-next-line no-console */
              console.log('Error reading map config', error);
              return null;
            }
          }
        }
      },
      interfaces: ['Node']
    })
  ];

  createTypes(typeDefs);
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(
    `
      {
        allPostsYaml {
          nodes {
            id
            fields {
              slug
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    throw result.errors;
  }

  const allEntries = result.data.allPostsYaml.nodes;

  const singleTemplate = path.resolve(`./src/templates/study-single/index.js`);
  // Create page for single content.
  allEntries.forEach((node) => {
    const {
      fields: { slug },
      id
    } = node;
    createPage({
      path: `studies/${slug}`,
      component: singleTemplate,
      context: {
        id
      }
    });
  });
};

exports.onCreateNode = async ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'PostsYaml') {
    const parentNode = getNode(node.parent);
    const collection = parentNode.sourceInstanceName;

    if (collection === 'study') {
      const fileName = getNode(node.parent).name;

      createNodeField({
        node,
        name: 'collection',
        value: collection
      });

      createNodeField({
        node,
        name: 'slug',
        value: fileName
      });
    }
  }
};

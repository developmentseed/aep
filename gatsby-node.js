const path = require(`path`);

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

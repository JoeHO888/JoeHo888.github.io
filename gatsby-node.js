const path = require('path');


// graphql function doesn't throw an error so we have to check to check for the result.errors to throw manually
const wrapper = promise =>
    promise.then(result => {
        if (result.errors) {
            throw result.errors
        }
        return result
    });

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;

    const result = await wrapper(
        graphql(`
        {
            blogPosts: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/(blog-posts)/"}}, sort: {fields: frontmatter___date, order: DESC}) {
            nodes {
              id
              frontmatter {
                slug
              }
            }
          }
          projects: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/(projects)/"}}, sort: {fields: frontmatter___date, order: DESC}) {
            nodes {
              id
              frontmatter {
                slug
              }
            }
          }
        }
    `)
    )

    const projectsList = result.data.projects.nodes;
    const postsList = result.data.blogPosts.nodes;

    const articleTemplate = require.resolve('./src/templates/article.jsx');

    postsList.forEach(post => {
        // The uid you assigned in Prismic is the slug!
        createPage({
            type: 'Blog',
            path: `${post.frontmatter.slug}`,
            component: articleTemplate,
            context: {
                // Pass the unique ID (uid) through context so the template can filter by it
                id: post.id,
            },
        })
    })

    projectsList.forEach(project => {
      // The uid you assigned in Prismic is the slug!
      createPage({
          type: 'Project',
          path: `${project.frontmatter.slug}`,
          component: articleTemplate,
          context: {
              // Pass the unique ID (uid) through context so the template can filter by it
              id: project.id,
          },
      })
  })
}
import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import styled from "@emotion/styled";
import Layout from "components/Layout";
import Card from "components/Card";

const BlogTitle = styled("h1")`
    margin-bottom: 1em;
`

const Blog = ({ posts, meta }) => (
    <>
        <Helmet
            title={meta.title}
            meta={[
                {
                    name: `description`,
                    content: meta.description,
                },
                {
                    property: `og:title`,
                    content: meta.title,
                },
                {
                    property: `og:image`,
                    content: meta.image,
                },
                {
                    property: `og:description`,
                    content: meta.description,
                },
                {
                    property: `og:type`,
                    content: `website`,
                },
                {
                    name: `twitter:card`,
                    content: `summary_large_image`,
                },
                {
                    name: `twitter:title`,
                    content: meta.title,
                },
                {
                    name: `twitter:description`,
                    content: meta.description,
                },
                {
                    name: `twitter:creator`,
                    content: meta.twitterAccount
                },
                {
                    name: `twitter:image`,
                    content: meta.image
                },
            ].concat(meta)}
        />
        <Layout>
            <BlogTitle>
                Blog Posts
            </BlogTitle>
            {posts.map((post, i) => (
                <Card
                    key={i}
                    date={post.frontmatter.date}
                    slug={post.frontmatter.slug}
                    title={post.frontmatter.title}
                    description={post.frontmatter.description}
                    category={post.frontmatter.category}
                    imageLink={post.frontmatter.featuredImage.childImageSharp.fluid.src}
                />
            ))}
        </Layout>
    </>
);

export default ({ data }) => {
    const posts = data.blogPosts.nodes;
    const meta = {
        "title": "Blog Posts | Joe Ho Blog",
        "description": "Blog Posts on various topics",
        "author": "Joe Ho",
        "twitterAccount": "@JoeHo31326982"
    };

    return (
        <Blog posts={posts} meta={meta} />
    )
}

Blog.propTypes = {
    posts: PropTypes.array.isRequired,
    meta: PropTypes.object.isRequired,
};

export const query = graphql`
{
  blogPosts: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/(blog-posts)/"  }}, sort: {fields: frontmatter___date, order: DESC}) {
    nodes {
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        description
        featuredImage {
                    childImageSharp {
                        fluid(maxWidth: 800) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
      }
    }
  }
}
`
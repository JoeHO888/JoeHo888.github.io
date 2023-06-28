import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import styled from "@emotion/styled";
import Layout from "components/Layout";
import Card from "components/Card";

const TagTitle = styled("h1")`
    margin-bottom: 1em;
`


const Tag = ({ posts, meta, tag }) => (
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
            <TagTitle>
                Tag: {tag}
            </TagTitle>

            <div className="container">
                <section className="post-feed">
                    {posts.map((post, i) => (
                        <Card
                            key={i}
                            date={post.frontmatter.date}
                            slug={post.frontmatter.slug}
                            title={post.frontmatter.title}
                            description={post.frontmatter.description}
                            category={post.frontmatter.category}
                            imageLink={post.frontmatter.featuredImage.childImageSharp.fluid.src}
                            tags={post.frontmatter.tags}
                        />
                    ))}
                </section>
            </div>

        </Layout>
    </>
);

export default ({ pageContext, data }) => {
    const posts = data.blogPosts.nodes;
    const tag = pageContext["tag"]
    const meta = {
        "title": "Blog Posts | Joe Ho Blog",
        "description": `${tag} related Articles`,
        "author": "Joe Ho",
        "twitterAccount": "@JoeHo31326982"
    };
    return (
        <Tag posts={posts} meta={meta} tag={tag} />
    )
}

Tag.propTypes = {
    posts: PropTypes.array.isRequired,
    meta: PropTypes.object.isRequired,
    tag: PropTypes.string.isRequired,
};

export const query = graphql`
    query TagQuery($tag: String) {
        blogPosts: allMarkdownRemark(filter: {frontmatter: {tags: {eq: $tag}}}) {
            nodes {
                frontmatter {
                    date(formatString: "MMMM DD, YYYY")
                    slug
                    title
                    description
                    tags
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
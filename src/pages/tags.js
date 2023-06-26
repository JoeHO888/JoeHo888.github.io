import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import styled from "@emotion/styled";
import Layout from "components/Layout";
import { Link } from "gatsby";

const TagPageTitle = styled("h1")`
    margin-bottom: 1em;
`

const Tags = ({ tagCountmap, meta }) => (
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
            <TagPageTitle>
                Tags
            </TagPageTitle>


            <div>

                {Object.keys(tagCountmap).map((keyName, i) => (
                    <li key={i} className="post-card-tag">
                        <Link to={"/tags/" + keyName.toLowerCase().split(" ").join("-")}>🏷 {keyName}: {tagCountmap[keyName]} articles</Link>
                    </li>
                ))}
            </div>


        </Layout>
    </>
);

const createTagsCountMap = (posts) => {
    var map = {};
    for (let i = 0; i < posts.length; i++) {
        var tags = posts[i].frontmatter.tags
        if (tags) {
            for (let j = 0; j < tags.length; j++) {
                if (map[tags[j]]) {
                    map[tags[j]] = map[tags[j]] + 1
                }
                else {
                    map[tags[j]] = 1
                }
            }
        }
    }
    return map
}

export default ({ data }) => {
    const posts = data.blogPostsTags.nodes;
    const tagCountmap = createTagsCountMap(posts);
    const meta = {
        "title": "Blog Posts | Joe Ho Blog",
        "description": "Blog Posts on various topics",
        "author": "Joe Ho",
        "twitterAccount": "@JoeHo31326982"
    };

    return (
        <Tags tagCountmap={tagCountmap} meta={meta} />
    )
}

Tags.propTypes = {
    tagCountmap: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
};

export const query = graphql`
{
  blogPostsTags: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/(blog-posts)/"  }}, sort: {fields: frontmatter___date, order: DESC}) {
    nodes {
      frontmatter {
        tags
      }
    }
  }
}
`
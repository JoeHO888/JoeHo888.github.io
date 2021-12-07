import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import styled from "@emotion/styled";
import Layout from "components/Layout";
import Card from "components/Card";

const ProjectTitle = styled("h1")`
    margin-bottom: 1em;
`

const Work = ({ projects, meta }) => (
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
            <ProjectTitle>
                Projects
            </ProjectTitle>
            <>
                {projects.map((project, i) => (
                    <Card
                        key={i}
                        date={project.frontmatter.date}
                        slug={project.frontmatter.slug}
                        title={project.frontmatter.title}
                        description={project.frontmatter.description}
                        category={project.frontmatter.category}
                        imageLink={project.frontmatter.featuredImage.childImageSharp.fluid.src}
                    />
                ))}
            </>
        </Layout>
    </>
);

export default ({ data }) => {
    const projects = data.projects.nodes;
    const meta = {
        "title": "Projects | Joe Ho Blog",
        "description": "Projects on various topics",
        "author": "Joe Ho",
        "twitterAccount": "@JoeHo31326982"
    };

    return (
        <Work projects={projects} meta={meta} />
    )
}

Work.propTypes = {
    projects: PropTypes.array.isRequired,
};

export const query = graphql`
{
  projects: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/(projects)/"  }}, sort: {fields: frontmatter___date, order: DESC}) {
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
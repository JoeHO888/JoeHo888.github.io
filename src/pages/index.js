import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
/* import { RichText } from "prismic-reactjs"; */
import { graphql, Link } from "gatsby";
import styled from "@emotion/styled";
import colors from "styles/colors";
import dimensions from "styles/dimensions";
import Button from "components/_ui/Button";
/* import About from "components/About"; */
import Layout from "components/Layout";
import Card from "components/Card";

const Hero = styled("div")`
    padding-top: 2.5em;
    padding-bottom: 3em;
    margin-bottom: 6em;
    max-width: 830px;

    @media(max-width:${dimensions.maxwidthMobile}px) {
       margin-bottom: 3em;
    }

    h1 {
        margin-bottom: 1em;

        a {
            text-decoration: none;
            transition: all 100ms ease-in-out;

            &:nth-of-type(1) { color: ${colors.blue500}; }
            &:nth-of-type(2) { color: ${colors.orange500}; }
            &:nth-of-type(3) { color: ${colors.purple500}; }
            &:nth-of-type(4) { color: ${colors.green500}; }
            &:nth-of-type(5) { color: ${colors.teal500}; }

            &:hover {
                cursor: pointer;
                transition: all 100ms ease-in-out;

                &:nth-of-type(1) { color: ${colors.blue600};    background-color: ${colors.blue200};}
                &:nth-of-type(2) { color: ${colors.orange600};  background-color: ${colors.orange200};}
                &:nth-of-type(3) { color: ${colors.purple600};  background-color: ${colors.purple200};}
                &:nth-of-type(4) { color: ${colors.green600};   background-color: ${colors.green200};}
                &:nth-of-type(5) { color: ${colors.teal600};    background-color: ${colors.teal200};}

            }
        }
    }
`

const Section = styled("div")`
    margin-bottom: 2em;
    display: flex;
    flex-direction: column;

    @media(max-width:${dimensions.maxwidthTablet}px) {
        margin-bottom: 4em;
    }

    &:last-of-type {
        margin-bottom: 0;
    }
`

const Action = styled(Link)`
    font-weight: 600;
    text-decoration: none;
    color: currentColor;
    transition: all 150ms ease-in-out;
    margin-left: auto;

    @media(max-width:${dimensions.maxwidthTablet}px) {
       margin: 0 auto;
    }

    span {
        margin-left: 1em;
        transform: translateX(-8px);
        display: inline-block;
        transition: transform 400ms ease-in-out;
    }

    &:hover {
        color: ${colors.blue500};
        transition: all 150ms ease-in-out;

        span {
            transform: translateX(0px);
            opacity: 1;
            transition: transform 150ms ease-in-out;
        }
    }
`

const RenderBody = ({ highlightPosts, highlightProjects, meta }) => (
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

        <Hero>
            <div>
                <h1>
                    Hello, I'm <span style={{ color: "#c1272e" }}>Joe </span>.
                    Primarily, I work on <span style={{ color: "#5393fe" }}> Azure</span> and <span style={{ color: "#6cbb47" }}> Cyber Security</span>.
                    Sometimes, I write Technology related <a target="_blank" href="/blog/" style={{ color: "#B57BFF", textDecoration: "none" }}>Blog Posts</a> or
                    do interesting <a target="_blank" href="/projects/" style={{ color: "#4947bb", textDecoration: "none" }}>projects</a>.
                </h1>
            </div>
            <>
                <Button>
                    <a href="#about-me" style={{ color: "#ffffff", textDecoration: "none" }}>More</a>
                </Button>
            </>


        </Hero>

        <Section>
            <>
                <h2>Latest Projects</h2>
                {highlightProjects.map((project, i) => (
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
                <Action to={"/projects/"}>
                    More projects <span>&#8594;</span>
                </Action>
            </>

        </Section>
        <Section>
            <>
                <h2>Latest Blog Posts</h2>
                {highlightPosts.map((post, i) => (
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
                <Action to={"/blog/"}>
                    More blog posts <span>&#8594;</span>
                </Action>
            </>
        </Section>

        <Section>
            <>
                <h1 id="about-me">
                    About Me
                </h1>
                <h2>
                    Background
                </h2>
                <p>
                    I'm an infrastructure specialist, I primarily work on modern workspace and cyber security.
                </p>

                <h2>Certification & Achievement</h2>
                <p>I’m a Competition Master in <a href="https://www.kaggle.com/joe1995">Kaggle</a></p>
                <p>I hold below Microsoft Certiciates</p>
                <ol>
                    <li><a href="https://www.credly.com/badges/ba95f712-dea8-4523-a405-37faf2ef1544">Microsoft Certified: Azure Data Engineer Associate</a></li>
                    <li><a href="https://www.credly.com/badges/2c2968cb-e1d8-4919-af7c-779f2ce1d649">Microsoft Certified: Azure Administrator Associate</a></li>
                    <li><a href="https://www.credly.com/badges/7658062c-f2b9-4544-9235-2376ceb607ee">Microsoft Certified: Azure Fundamentals</a></li>
                </ol>

                <h2>Entrepreneurship</h2>
                <p>I export other areas sometimes</p>
                <ol>
                    <li><a href="https://www.instagram.com/japan_photo_everyday/">Japan Photo Everyday</a>, an Instagram account to share beautiful photos in Japan & recommend resort in Japan</li>
                    <li><a href="http://paymentcatch.com/">Payment Catch</a>, a software to let merchants collect online recurring payment</li>
                    <li><a href="https://apps.shopify.com/blulish-insights">Blulish Reports</a>, Shopify Analytics Tool On Sales, Products and Orders</li>
                </ol>
                <h2>
                    Contact
                </h2>
                <p>Email: <a href="mailto:joe.hochotai@gmail.com">joe.hochotai@gmail.com</a></p>
            </>
        </Section>

        {/*         <Section>
            {RichText.render(home.about_title)}
            <About
                bio={home.about_bio}
                socialLinks={home.about_links}
            />
        </Section> */}
    </>
);

export default ({ data }) => {
    //Required check for no data being returned
    const highlightPosts = data.blogPosts.nodes

    const highlightProjects = data.projects.nodes
    const meta = {
        "title": "Home | Joe Ho Blog",
        "description": "Joe Ho Blog On Data Analytics, Data Engineering",
        "author": "Joe Ho",
        "twitterAccount": "@JoeHo31326982"
    };

    return (
        <Layout>
            <RenderBody highlightPosts={highlightPosts} highlightProjects={highlightProjects} meta={meta} />
        </Layout>
    )
}

export const query = graphql`
{
    blogPosts: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/(blog-posts)/"}}, sort: {fields: frontmatter___date, order: DESC}, limit: 1) {
    nodes {
      html
      id
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
  projects: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/(projects)/"}}, sort: {fields: frontmatter___date, order: DESC}, limit:1) {
    nodes {
      html
      id
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

RenderBody.propTypes = {
    highlightPosts: PropTypes.array.isRequired,
    highlightProjects: PropTypes.array.isRequired,
    meta: PropTypes.object.isRequired,
};
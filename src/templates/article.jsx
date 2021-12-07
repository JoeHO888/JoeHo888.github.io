import React from 'react';
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { graphql } from 'gatsby';
import styled from "@emotion/styled";
import colors from "styles/colors";
import Layout from "components/Layout";
import Img from "gatsby-image"
/* import Prism from "prismjs" */
import 'styles/style.scss';

const ArticleHeroContainer = styled("div")`
/*     max-height: 500px; */
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin-bottom: 3em;

    img {
        width: 100%;
    }
`

const ArticleTitle = styled("div")`
    margin: 0 auto;
    text-align: center;

    h1 {
        margin-top: 0;
    }
`

const ArticleBody = styled("div")`
    margin: 0 auto;

    .block-img {
        margin-top: 3.5em;
        margin-bottom: 0.5em;

        img {
            width: 100%;
        }
    }
`

const ArticleMetas = styled("div")`
    text-align: right;
    margin: 0 auto;
    align-items: right;
    margin-bottom: 2em;
    justify-content: space-between;
    font-size: 0.85em;
    color: ${colors.grey600};
`

const ArticleDate = styled("div")`
    margin: 0;
`

const Article = ({ article }) => {
    /*     useEffect(() => {
            // call the highlightAll() function to style our code blocks
            Prism.highlightAll()
        }) */
    return (
        <>
            <Helmet
                title={`${article.frontmatter.title} | Joe Ho Blog`}
                meta={[
                    {
                        name: `description`,
                        content: article.frontmatter.description,
                    },
                    {
                        property: `og:title`,
                        content: `${article.frontmatter.title} | Joe Ho Blog`,
                    },
                    {
                        property: `og:image`,
                        content: `${article.frontmatter.featuredImage.childImageSharp.fluid.src}`,
                    },
                    {
                        property: `og:description`,
                        content: article.frontmatter.description,
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
                        name: `twitter:creator`,
                        content: "@JoeHo31326982",
                    },
                    {
                        name: `twitter:title`,
                        content: `${article.frontmatter.title} | Joe Ho Blog`,
                    },
                    {
                        name: `twitter:description`,
                        content: article.frontmatter.description,
                    },
                    {
                        name: `twitter:image`,
                        content: `${article.frontmatter.featuredImage.childImageSharp.fluid.src}`,
                    },
                ]}
            />
            <Layout>
                <ArticleTitle>
                    <h1>{article.frontmatter.title}</h1>
                </ArticleTitle>
                <ArticleMetas>
                    <ArticleDate>
                        {article.frontmatter.date}
                    </ArticleDate>
                </ArticleMetas>
                {article.frontmatter.featuredImage.childImageSharp.fluid && (
                    <ArticleHeroContainer>
                        <Img fluid={article.frontmatter.featuredImage.childImageSharp.fluid} alt={article.frontmatter.title} />
                    </ArticleHeroContainer>
                )}
                <ArticleBody>
                    <div
                        dangerouslySetInnerHTML={{ __html: article.html }}
                    />
                </ArticleBody>
            </Layout>
        </>
    )
}

export default ({ data }) => {
    const articleContent = data.article;
    return (
        <Article article={articleContent} />
    )
}

Article.propTypes = {
    article: PropTypes.object.isRequired,
};

export const query = graphql`
    query ArticleQuery($id: String) {
        article: markdownRemark(id: {eq: $id}) {
            html
            frontmatter {
                date(formatString: "MMMM DD, YYYY")
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
`
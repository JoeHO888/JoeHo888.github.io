import React from "react";
import { Link } from "gatsby";
import styled from "@emotion/styled";
import colors from "styles/colors";
import PropTypes from "prop-types";

const Metas = styled("div")`
    display: flex;
    align-items: center;
    margin-top: 1.5em;
    justify-content: space-between;
    font-size: 0.85em;
    color: ${colors.grey600};
`

const Date = styled("div")`
    margin: 0;
`

const Card = ({ date, slug, title, description, imageLink }) => (
    <Link to={slug} className="post-card">
        <header className="post-card-header">
            {imageLink && (
                <div
                    className="post-card-image-container"
                    style={{
                        backgroundImage: `url(${imageLink})`,
                    }}
                >
                </div>
            )}
            <h2 className="post-card-title">{title}</h2>
        </header>
        <section className="post-card-excerpt">{description}</section>
        <Metas>
            <Date>
                {date}
            </Date>
        </Metas>
    </Link>
)

export default Card;

Card.propTypes = {
    date: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageLink: PropTypes.string.isRequired,
}
import React, { Fragment as F } from "react";
import { Header, Button, Icon } from "semantic-ui-react";
import PropTypes from "prop-types";

const Hero = ({ mobile }) => {
    return (
        <F>
            <Header
                as="h1"
                content="Cafe au Chain"
                inverted
                style={{
                    fontSize: mobile ? "2em" : "4em",
                    fontWeight: "normal",
                    marginBottom: 0
                }}
            />
            <Header
                as="h2"
                content="Proof of Perk"
                inverted
                style={{
                    fontSize: mobile ? "1.7em" : "3.5em",
                    fontWeight: "normal",
                    marginBottom: 0
                }}
            />
            <Header
                as="h3"
                content="Start your journey!"
                inverted
                style={{
                    fontSize: mobile ? "1.5em" : "1.7em",
                    fontWeight: "normal",
                    marginTop: mobile ? "0.5em" : "1.5em"
                }}
            />
            <p>
                Proof of Perk provides a set of blockchain-backed roaster tools to help bring transparency to the
                specitiality coffee supply chain.
            </p>
            <Button positive size="huge">
                Get Started
                <Icon name="right arrow" />
            </Button>
        </F>
    );
};
const { bool } = PropTypes;
Hero.propTypes = {
    mobile: bool
};
export default Hero;

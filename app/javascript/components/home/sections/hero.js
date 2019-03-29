import React from "react";
import { Header, Button, Icon } from "semantic-ui-react";

const Hero = () => {
    return (
        <div className="home-hero-container">
            <Header
                as="h1"
                content="Cafe au Chain"
                inverted
                className="home-hero-main"
            />
            <Header
                as="h2"
                content="Proof of Perk"
                inverted
                className="home-hero-sub"
            />
            <Header
                as="h3"
                content="Start your journey!"
                inverted
                className="home-hero-tertiary"
            />
            <p className="home-hero-text">
                Proof of Perk provides a set of blockchain-backed roaster tools to help bring transparency to the
                specitiality coffee supply chain.
            </p>
            <Button positive size="huge" as="a" href="/register">
                Get Started
                <Icon name="right arrow" />
            </Button>
        </div>
    );
};

export default Hero;

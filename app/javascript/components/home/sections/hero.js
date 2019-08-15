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
                as="h3"
                content="Start your journey!"
                inverted
                className="home-hero-tertiary"
            />
            <p className="home-hero-text">
                Cafe au Chain provides tools for roasters that integrates your roast queue, production management, and wholesale ordering
                so you can see your roastery's health all in one place.
            </p>
            <Button positive size="huge" as="a" href="/register">
                Get Started
                <Icon name="right arrow" />
            </Button>
        </div>
    );
};

export default Hero;

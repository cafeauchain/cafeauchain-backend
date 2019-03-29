import React from "react";
import { Segment } from "semantic-ui-react";

import Hero from "./sections/hero";
import General from "./sections/general";
import About from "./sections/about";
import Features from "./sections/features";

import Fees from "../shared/feeCalc/index";

import "./styles.scss";
// eslint-disable-next-line
import bg from "images/coffee-imgs/coffee-img-8.jpg";

const HomepageLayout = () => (
    <React.Fragment>
        <Segment
            inverted
            textAlign="center"
            style={{ backgroundImage: `url(${bg})` }}
            className="home-hero"
            vertical
        >
            <Hero />
        </Segment>

        <Segment vertical as="section">
            <General />
        </Segment>
        <Segment vertical as="section">
            <Fees />
        </Segment>
        <Segment vertical as="section">
            <About />
        </Segment>
        <Segment vertical as="section">
            <Features />
        </Segment>
    </React.Fragment>
    
);

export default HomepageLayout;

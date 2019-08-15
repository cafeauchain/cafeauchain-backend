import React from "react";
import { Header, Image } from "semantic-ui-react";
/* eslint-disable */
import Flex from "shared/flex";
import img from "images/coffee-imgs/coffee-img-20.jpg";
/* eslint-enable */

const About = () => {
    return (
        <div className="home-section-container">
            <Flex spacing="40" wrap centercross>
                <div flex="50">
                    <Header as="h3" className="home-section-header" textAlign="center">
                        Spend time on your business
                    </Header>
                    <p className="home-section-text text-centered">
                        With Cafe au Chain, you can grow your business with the confidence
                        that your team and processes can handle it.
                    </p>
                </div>
                <div flex="50" className="home-img-container">
                    <Image src={img} rounded bordered />
                </div>
            </Flex>
        </div>

    );
};

export default About;

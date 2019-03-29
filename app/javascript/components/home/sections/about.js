import React from "react";
import { Header, Image } from "semantic-ui-react";
/* eslint-disable */
import Flex from "shared/flex";
import img from "images/coffee-imgs/coffee-img-31.jpg";
/* eslint-enable */

const About = () => {
    return (
        <div className="home-section-container">
            <Flex spacing="40" wrap centercross>
                <div flex="50">
                    <Header as="h3" className="home-section-header" textAlign="center">
                        Show Where Your Coffee Comes From
                    </Header>
                    <p className="home-section-text text-centered">
                        You spend time developing relationships with coffee producers.
                        Let your customers know more about them.
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

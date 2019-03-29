import React from "react";
import { Header, Image, Button } from "semantic-ui-react";
/* eslint-disable */
import img from "images/coffee-imgs/coffee-img-23.jpg";
import Flex from "shared/flex";
/* eslint-enable */

const General = () => {
    return (
        <div className="home-section-container">
            <Flex spacing="50" wrap centercross>
                <div flex="50">
                    <Header as="h3" className="home-section-header">
                        Tools for the coffee industry.
                        <br />
                        Built for sustainability
                    </Header>
                    <p className="home-section-text">
                        You care about sustainability. So do we.
                    </p>
                    <p className="home-section-text">
                        We’re building tools to help you track economic and
                        environmental sustainability through your supply chain.
                    </p>
                    <Header as="h3" className="home-section-header">
                        Manage your business, manage your data
                    </Header>
                    <p className="home-section-text">
                        No one knows your business better than you. Get to know it better.
                    </p>
                    <p className="home-section-text">
                        With the Cafe au Chain platform, see your business data in
                        the context you need to make better decisions, support your partners, and improve your product.
                    </p>
                </div>
                <div flex="50">
                    <Image bordered rounded src={img} />
                </div>
                <div flex="100" className="text-centered">
                    <br />
                    <Button size="huge" primary>Check Out Our Tools</Button>
                </div>
            </Flex>
        </div>
        
    );
};

export default General;

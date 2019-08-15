import React from "react";
import { Header, Image } from "semantic-ui-react";
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
                        Tools for coffee roasters.
                        <br />
                        At your fingertips.
                    </Header>
                    <p className="home-section-text">
                        Track roasting, production queues, and wholesale orders
                        all in one place.
                    </p>
                    <p className="home-section-text">
                        Reduce the complexities in managing your data by keeping track of it on one platform.
                        No hidden fees, no extra charges, only pay for what you use.
                    </p>
                    <Header as="h3" className="home-section-header">
                        Manage your business, manage your data
                    </Header>
                    <p className="home-section-text">
                        No one knows your business better than you. Get to know it even better.
                    </p>
                    <p className="home-section-text">
                        With the Cafe au Chain platform, see your business data in
                        the context you need to make better decisions, support your partners, and improve your product.
                    </p>
                </div>
                <div flex="50" className="home-img-container">
                    <Image bordered rounded src={img} />
                </div>
                {/* <div flex="100" className="text-centered">
                    <br />
                    <Button size="huge" primary as="a" href="/register">Check Out Our Tools</Button>
                </div> */}
            </Flex>
        </div>

    );
};

export default General;

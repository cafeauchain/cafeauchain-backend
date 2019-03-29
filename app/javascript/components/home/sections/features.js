import React from "react";
import { Header, Button, Divider } from "semantic-ui-react";

const Features = () => {
    return (
        <div className="home-section-container">
            <Header as="h3" className="home-section-header">
                Do Customers Care About Your Coffee&apos;s Sustainability?
            </Header>
            <p className="home-section-text">
                All participants in the coffee supply chain care about sustainability - 
                it&apos;s vital for their livelihood. But do your customers actually care?
                What drives their decisions to buy from you?
            </p>
            <Button as="a" size="large">
                Read More
            </Button>

            <Divider as="h4" className="header" horizontal style={{ margin: "3em 0em", textTransform: "uppercase" }}>
                <a href="/">Case Studies</a>
            </Divider>

            <Header as="h3" className="home-section-header">
                Coffee Harvesting and the Role of an Aging Farmer Population
            </Header>
            <p className="home-section-text">
                With coffee farmers getting older and shrinking wages, the median age of coffee farmers is increasing 
                to where there will potentially be a shortage of workers in the next few decades.
            </p>
            <Button as="a" size="large">
                Learn More
            </Button>
        </div>
    );
};

export default Features;

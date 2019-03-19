import React from "react";
import { Segment, Header, Step, Divider, Button } from "semantic-ui-react";

/* eslint-disable */
import CreateProduct from "wholesale/actions/createProduct";
import steps from "roaster_onboarding/wholesaleSteps";
import Flex from "shared/flex";
/* eslint-enable */

class CreateProducts extends React.Component {
    state = {};
    render() {
        return (
            <React.Fragment>
                <Step.Group fluid items={steps("products")} />
                <Segment>
                    <Header as="h2" content="Create Products" />
                    <CreateProduct />
                    <br />
                    <Divider />

                    <Flex spacing="20" spacebetween>
                        <div>
                            <Button content="Taxes" icon="left arrow" labelPosition="left" as="a" href="taxes" />
                        </div>
                        <div>
                            <Button
                                content="Dashboard"
                                icon="right arrow"
                                labelPosition="right"
                                primary
                                as="a"
                                href="/manage/dashboard"
                            />
                        </div>
                    </Flex>
                </Segment>
            </React.Fragment>
        );
    }
}

export default CreateProducts;

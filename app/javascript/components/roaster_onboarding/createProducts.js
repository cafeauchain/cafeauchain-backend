import React from "react";
import PropTypes from "prop-types";
import { Segment, Header, Step } from "semantic-ui-react";

/* eslint-disable */
import CreateProduct from "wholesale/actions/createProduct";

import steps from "roaster_onboarding/wholesaleSteps";
import OnboardFooter from "roaster_onboarding/footer";

import Flex from "shared/flex";

import withContext from "contexts/withContext";
/* eslint-enable */

class CreateProducts extends React.Component {
    state = {};
    render() {
        const { userId, products = [] } = this.props;
        const leftBtn = { text: "Taxes", href: "taxes" };
        const rightBtn = { text: "Dashboard", href: "onboard_completed", disabled: !products.length };
        return (
            <React.Fragment>
                <Step.Group fluid items={steps("products")} />
                <Segment>
                    <Header as="h2" content="Create Products" />
                    <CreateProduct />
                    <br />
                    <OnboardFooter left={leftBtn} right={rightBtn} userId={userId} />
                </Segment>
            </React.Fragment>
        );
    }
}
const { oneOfType, number, string, array } = PropTypes;
CreateProducts.propTypes = {
    userId: oneOfType([number, string]),
    products: array
};

export default withContext(CreateProducts);

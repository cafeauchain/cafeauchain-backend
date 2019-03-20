import React from "react";
import PropTypes from "prop-types";
import { Segment, Header, Step, Container } from "semantic-ui-react";

/* eslint-disable */
import CreateProduct from "wholesale/actions/createProduct";
import CreateDefaultSizes from "wholesale/actions/createDefaultSizes";
import CreateDefaultOptions from "wholesale/actions/createDefaultOptions";
import Products from "wholesale/productInventory";

import steps from "roaster_onboarding/wholesaleSteps";
import OnboardFooter from "roaster_onboarding/footer";

import Flex from "shared/flex";

import { fetcher, roasterUrl } from "utilities/apiUtils";
import withContext from "contexts/withContext";
/* eslint-enable */

class CreateProducts extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { userId, updateContext } = this.props;
        const url = roasterUrl(userId) + "/default_options";
        fetch(url)
            .then(data => data.json())
            .then(data => {
                if (data.length) {
                    const items = data.reduce(
                        (obj, item) => ({ ...obj, [item.title.toLowerCase()]: item.options }),
                        {}
                    );
                    updateContext({ defaults: items });
                }
            });
    }
    render() {
        const { userId, products = [], defaults = {} } = this.props;
        const size = defaults && defaults.size ? defaults.size : [];
        const options = defaults && defaults.options ? defaults.options : [];
        const leftBtn = { text: "Shipping", href: "shipping" };
        const rightBtn = { text: "Dashboard", href: "onboard_completed", disabled: !products.length };
        return (
            <React.Fragment>
                <Step.Group fluid items={steps("products")} />
                <Segment>
                    {!size.length && (
                        <Container text>
                            <CreateDefaultSizes />
                        </Container>
                    )}
                    {size.length > 0 && !options.length && (
                        <Container text>
                            <CreateDefaultOptions />
                        </Container>
                    )}
                    {size.length > 0 && options.length > 0 && (
                        <React.Fragment>
                            <Header as="h2" content="Create Products" />
                            <CreateProduct />
                            <Products />
                            <br />
                            <OnboardFooter left={leftBtn} right={rightBtn} userId={userId} />
                        </React.Fragment>
                    )}
                </Segment>
            </React.Fragment>
        );
    }
}
const { oneOfType, number, string, array, func, object } = PropTypes;
CreateProducts.propTypes = {
    userId: oneOfType([number, string]),
    products: array,
    updateContext: func,
    defaults: object
};

export default withContext(CreateProducts);

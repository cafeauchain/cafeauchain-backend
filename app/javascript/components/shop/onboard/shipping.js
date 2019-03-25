import React from "react";
import PropTypes from "prop-types";
import { Step, Segment, Container, Header, Button } from "semantic-ui-react";

/* eslint-disable */
import steps from "shop/onboard/steps";
import OnboardFooter from "shop/onboard/footer";

import ErrorHandler from "shared/errorHandler";
import { requester, url as API_URL } from "utilities/apiUtils";
import withContext from "contexts/withContext";
/* eslint-enable */

class OnboardShipping extends React.Component {
    state = {
        active: "",
        btnLoading: "",
        errors: []
    };
    setDefault = async (e, item) => {
        const { target } = e;
        e.preventDefault();
        target.blur();
        const { profile: { id: profileId } } = this.props;
        const shipping_id = item["data-id"];
        const friendly = item["data-friendly"];
        const url = API_URL + "/customers/" + profileId + "/set_shipping_default";
        await this.setState({ btnLoading: friendly });
        const response = await requester({ url, body: { shipping_id }, method: 'PUT' });
        this.afterSubmit(response, friendly);
    }

    afterSubmit = (response, friendly) => {
        setTimeout(async() => {
            await this.setState({ btnLoading: "" });
            if( response instanceof Error ){
                this.setState({ errors: response.response.data });
            } else {
                this.setState({ active: friendly });
            }
        }, 400);
    }
    render() {
        const { shipping_methods } = this.props;
        const { active, btnLoading, errors } = this.state;
        const left = { href: 'payment', text: 'Payment Methods'};
        const right = { href: 'onboard_completed', text: 'Complete Registration', disabled: !active };
        return (
            <React.Fragment>
                <Step.Group fluid items={steps("shipping")} />
                
                <Segment>
                    <Container text>
                        <Header as="h2" content="Default Shipping Method" dividing />
                        <ErrorHandler errors={errors} />
                        <p>
                            Choose your default shipping method. 
                            You will be able to change this for each order 
                            if you want but this will serve as the default option.
                        </p>
                        {shipping_methods.map( method => (
                            <Button 
                                key={method.id}
                                content={method.friendly_name}
                                onClick={this.setDefault}
                                primary={method.friendly_name === active}
                                loading={method.friendly_name === btnLoading}
                                data-id={method.id}
                                data-friendly={method.friendly_name}
                            />
                        ))}
                    </Container>
                    <OnboardFooter left={left} right={right} />
                </Segment>

            </React.Fragment>
        );
    }
}
OnboardShipping.propTypes = {
    shipping_methods: PropTypes.array,
    profile: PropTypes.object
};

export default withContext(OnboardShipping);
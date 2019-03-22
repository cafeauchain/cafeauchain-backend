import React from "react";
import PropTypes from 'prop-types';
import { Form, Button, Segment, Label } from "semantic-ui-react";

/* eslint-disable */
import AddressForm from "shared/addresses"
import Flex from "shared/flex";
import Input from "shared/input";
import { requester, url as API_URL } from "utilities/apiUtils";
/* eslint-enable */

class Address extends React.Component {
    constructor(props ){
        super(props);
        const { address } = props;
        this.state = {
            details: address
        };
    }
    handleInputChange = (event, { value, name, checked }) => {
        let { details } = this.state;
        details = { ...details };
        if (name === "") return;
        const val = value || checked;
        details[name] = val;
        this.setState({ details });
    };
    handleSubmit = async e => {
        const { details } = this.state;
        const { profileId } = this.props;
        const url = API_URL + "/customers/" + profileId + "/update_address";
        const response = await requester({ url, body: {...details} });
        console.log( response );
        this.afterSubmit(response, url);
    }

    afterSubmit = async (response, url) => {
        const {
            updateContext
        } = this.props;
        if (response instanceof Error) {
            // this.setState({ errors: response.response.data, btnLoading: false });
        } else {
            if (response.redirect) {
                window.location.href = await response.redirect_url;
            } else {
                updateContext({ profile: response.customer.data });
            }
        }
    }
    handleDelete = async e => {
        console.log( "Delete");
    }
    render(){
        const { details } = this.state;
        const { address } = this.props;
        const isPrimary = address.primary_location;
        return (
            <Segment>
                {isPrimary && <Label corner="right" icon="star" color="green" />}
                <Form>
                    <Input 
                        label="Name"
                        name="location_label"
                        value={details.location_label}
                        onChange={this.handleInputChange}
                    />
                    <AddressForm details={details} onChange={this.handleInputChange} />
                    <Flex spacing="20" spacebetween>
                        <div flex="fill">
                            <Input 
                                inputType="checkbox"
                                label="Set as Primary"
                                name="primary_location"
                                defaultChecked={isPrimary}
                                disabled={isPrimary}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div>
                            <Button 
                                content="Delete"
                                onClick={this.handleDelete}
                                color="red"
                                inverted
                                disabled={isPrimary}
                            />
                            <Button 
                                content="Update"
                                onClick={this.handleSubmit}
                                primary
                                disabled={details === address}
                            />
                        </div>
                        
                    </Flex>
                </Form>
            </Segment>
        ); 
    }
}
const { object, func, oneOfType, number, string } = PropTypes;
Address.propTypes = {
    address: object,
    updateContext: func,
    profileId: oneOfType([ number, string ])
};

export default Address;
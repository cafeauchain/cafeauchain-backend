import React, { Component } from "react";
import PropTypes from "prop-types";
import { Segment, Header, Container, Button } from 'semantic-ui-react';
import shortid from "shortid";

/* eslint-disable */
import Address from "shop/customer/address";
import withContext from "contexts/withContext";
/* eslint-enable */

const defaultAddress = () => ({
    id: shortid.generate(),
    street_1: "",
    street_2: "",
    city: "",
    state: "",
    postal_code: ""
});

class Addresses extends Component {
    constructor(props){
        super(props);
        this.state = {
            added: []
        };
    }

    addAddress = e => {
        const { added } = this.state;
        this.setState({ added: [...added, defaultAddress()]}); 
    }
    
    render(){
        const { profile, updateContext } = this.props;
        const { attributes: { addresses } } = profile;
        const { added } = this.state;
        return (
            <Segment>
                <Header as="h2" content="Addresses" dividing />
                <Container text>
                    <p>Add multiple addresses and set a primary address.</p>
                    {addresses.map(address => (
                        <Address
                            key={address.id}
                            address={address}
                            profileId={profile.id}
                            updateContext={updateContext}
                        />
                    ))}
                    {added.map(address => (
                        <Address
                            key={address.id}
                            address={address}
                            profileId={profile.id}
                            updateContext={updateContext}
                        />
                    ))}
                    <Button content="Add Address" color="blue" onClick={this.addAddress} />
                </Container>
                
            </Segment>
        );
    }
}
const { object, func } = PropTypes;
Addresses.propTypes = {
    profile: object,
    updateContext: func
};

export default withContext(Addresses);
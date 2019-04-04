import React, { Component } from "react";
import PropTypes from "prop-types";
import { Header, Button } from 'semantic-ui-react';

/* eslint-disable */
import Address from "shop/customer/address";
import withContext from "contexts/withContext";
/* eslint-enable */

const defaultAddress = {
    location_label: "",
    street_1: "",
    street_2: "",
    city: "",
    state: "",
    postal_code: ""
};

class Addresses extends Component {
    constructor(props){
        super(props);
        this.state = {
            adding: false
        };
    }

    addAddress = () => {
        this.setState({ adding: true }); 
    }
    resetStatus = () => {
        this.setState({ adding: false });
    }
    
    render(){
        const { profile, updateContext } = this.props;
        const { attributes: { addresses } } = profile;
        const { adding } = this.state;
        return (
            <React.Fragment>
                <Header as="h2" content="Addresses" dividing />
                <div className="text-wrapper">
                    <p>Add multiple addresses and set a primary address.</p>
                    {addresses.map(address => (
                        <Address
                            key={address.id}
                            address={address}
                            profileId={profile.id}
                            updateContext={updateContext}
                            resetStatus={this.resetStatus}
                        />
                    ))}
                    {adding && (
                        <Address
                            address={defaultAddress}
                            profileId={profile.id}
                            updateContext={updateContext}
                            resetStatus={this.resetStatus}
                        />
                    )}
                    {!adding && <Button content="Add Address" color="blue" onClick={this.addAddress} />}
                </div>
            </React.Fragment>
        );
    }
}
const { object, func } = PropTypes;
Addresses.propTypes = {
    profile: object,
    updateContext: func
};

export default withContext(Addresses);
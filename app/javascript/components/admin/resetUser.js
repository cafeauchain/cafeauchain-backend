import React from 'react';
import { Button, Header, Segment, Divider } from "semantic-ui-react";
import PropTypes from "prop-types";

/* eslint-disable */
import Input from "shared/input";

import { url as API_URL,  requester } from "utilities/apiUtils";
/* eslint-enable */

class ResetUser extends React.Component {
    constructor(props){
        super(props);
        const details = {};
        for( let item of props.inventory_items){
            details[item.id] = item.quantity;
        }
        this.state = {
            details
        }; 
    }

    handleInputChange = (event, { value, name, checked }) => {
        let { details } = this.state;
        details = { ...details };
        if (name === "") return;
        const val = value || checked;
        details[name] = val || "";
        this.setState({ details });
    };

    handleQuantityUpdate = async e => {
        e.preventDefault();
        const { userId } = this.props;
        const { details } = this.state;
        const url = `${API_URL}/admin/roasters/${userId}/update_inventory_item_quantities`;
        const body = { details };
        const response = await requester({ url, body, method: 'PUT' });
    }

    handleReset = async e => {
        e.preventDefault();
        const { userId } = this.props;
        const url = `${API_URL}/admin/roasters/${userId}/reset_profile`;
        const response = await requester({ url, method: "PUT" });
    }
    render(){
        const { lots, batches, transactions, inventory_items, orders } = this.props;
        const { details } = this.state;
        return (
            <Segment>
                <Header as="h1" content="Reset the User" />
                <div>
                    <span>Lots: </span>
                    { lots.length }
                </div>
                <div>
                    <span>Batches: </span>
                    {batches.length}
                </div>
                <div>
                    <span>Transactions: </span>
                    {transactions.length}
                </div>
                <div>
                    <span>Inventory Items: </span>
                    {inventory_items.length}
                </div>
                <div>
                    <span>Orders: </span>
                    {orders.length}
                </div>
                <Button negative onClick={this.handleReset} content="Reset User" />
                <Divider />
                {inventory_items.map(item => {
                    return (
                        <div key={item.id}>
                            <Input 
                                label={item.name}
                                value={details[item.id]}
                                name={item.id}
                                onChange={this.handleInputChange}
                            />
                        </div>
                    );
                })}
                <Button primary onClick={this.handleQuantityUpdate} content="Update Inventory Item Quantities" />
            </Segment>
            
        );
    }
}

const { array, oneOfType, number, string } = PropTypes;
ResetUser.propTypes = {
    lots: array,
    batches: array,
    transactions: array,
    inventory_items: array,
    orders: array,
    userId: oneOfType([number, string])
};

export default ResetUser;

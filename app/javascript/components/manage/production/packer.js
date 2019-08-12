import React from "react";
import PropTypes from "prop-types";
import { Dimmer, Loader } from 'semantic-ui-react';

/* eslint-disable */
import Input from "shared/input";
import { url as API_URL, requester } from "utilities/apiUtils";
/* eslint-enable */

class Packer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isChecked: props.content,
            loading: false 
        };
    }
    handleInputChange = (e, {value, checked}) => {
        const val = value || checked;
        this.setState({ isChecked: val, loading: true }, this.handleUpdate); 
    }
    handleUpdate = async () => {
        const { isChecked } = this.state;
        const { item: { id } } = this.props;
        const url = API_URL + "/order_items";
        const body = { order_item_id: id, packed: isChecked };
        const response = await requester({ url, body, method: 'PUT' });
        this.afterSubmit( response );
    }
    afterSubmit = response => {
        setTimeout(async () => {
            this.setState({ loading: false });
            if (response instanceof Error) {
                alert("Something went wrong. Try again later or contact support@cafeauchain.com");
            }
        }, 400);
    }
    render(){
        const { isChecked, loading } = this.state;
        return (
            <React.Fragment>
                <Dimmer inverted active={loading}>
                    <Loader size="small" />
                </Dimmer>
                
                <Input
                    onChange={this.handleInputChange}
                    inputType="checkbox"
                    name="packed"
                    label=""
                    defaultChecked={isChecked}
                />
            </React.Fragment>        
        );
    }
}
const { bool, object } = PropTypes;
Packer.propTypes = {
    content: bool,
    item: object
};

export default Packer;
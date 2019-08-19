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
            loading: false
        };
    }
    handleInputChange = (e, {value, checked}) => {
        const val = value || checked;
        this.handleUpdate( val );
    }
    handleUpdate = async val => {
        this.setState({ loading: true });
        const { item: { id } } = this.props;
        const url = API_URL + "/order_items";
        const body = { order_item_id: id, packed: val };
        const response = await requester({ url, body, method: 'PUT' });
        this.afterSubmit( response );
    }
    afterSubmit = response => {
        setTimeout(async () => {
            this.setState({ loading: false });
            if (response instanceof Error) {
                alert("Something went wrong. Try again later or contact support@cafeauchain.com");
            } else {
                const { updateContext, id } = this.props;
                if( updateContext ){
                    const url = API_URL + "/orders/" + id;
                    const res = await requester({ url, method: 'GET' });
                    updateContext({ order: res.data });
                }
            }
        }, 400);
    }
    render(){
        const { loading } = this.state;
        const { content: isChecked } = this.props;
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
                    checked={isChecked}
                    disabled={isChecked}
                />
            </React.Fragment>        
        );
    }
}
const { bool, object, func, oneOfType, number, string } = PropTypes;
Packer.propTypes = {
    content: bool,
    item: object,
    updateContext: func,
    id: oneOfType([number, string])
};

export default Packer;
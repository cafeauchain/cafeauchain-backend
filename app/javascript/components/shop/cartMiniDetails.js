import React from "react";
import PropTypes from "prop-types";
import { Divider, Button } from "semantic-ui-react";

/* eslint-disable */
import Flex from "shared/flex";
import Input from "shared/input";
import { Money, Weights } from "shared/textFormatters";
import ErrorHandler from "shared/errorHandler"

import { humanize } from "utilities";

import { url as API_URL, requester } from "utilities/apiUtils";

import withContext from "contexts/withContext";
/* eslint-enable */

class MiniDetails extends React.Component {
    constructor(props){
        super(props);
        const { item } = props;
        this.state = {
            isEditable: false,
            quantity: item.quantity,
            removeLoading: false,
            saveLoading: false,
            errors: []
        };
    }
    handleInputChange = (e, { value }) => this.setState({ quantity: value || "" });

    toggleEditable = () => this.setState(prevState => ({ isEditable: !prevState.isEditable }));

    handleSubmit = async e => {
        const { target } = e;
        const { quantity } = this.state;
        const { item: propItem, updateContext } = this.props;
        e.preventDefault();
        target.blur;
        await this.setState({ saveLoading: true });
        await updateContext({ cartLoading: true});
        let url = API_URL + "/carts/" + propItem.variant_id;
        const body = { quantity };
        if( quantity === propItem.quantity ){
            return setTimeout(() => this.setState({ saveLoading: false }), 600);
        }
        let response = await requester({ url, method: "PUT", body }); 
        this.afterSubmit(response);
    }
    handleDelete = async e => {
        const { target } = e;
        const { item: propItem, updateContext } = this.props;
        e.preventDefault();
        target.blur;
        await this.setState({ removeLoading: true });
        await updateContext({ cartLoading: true });
        let url = API_URL + "/carts/" + propItem.id;
        let response = await requester({ url, method: "DELETE" });
        this.afterSubmit(response);
    }
    afterSubmit = async response => {
        const { getData, customer, updateContext } = this.props;
        setTimeout( async() => {
            if (response instanceof Error) {
                await updateContext({ cartLoading: false });
                this.setState({ errors: response.response.data });
            } else {
                if (response.redirect) {
                    window.location.href = await response.redirect_url;
                } else {
                    await getData("cart", "?customer_profile_id=" + customer.id);
                    await updateContext({ cartLoading: false });
                    this.setState({ isEditable: false, saveLoading: false, removeLoading: false });
                }
            }
        }, 600);
        
    }

    render(){
        const { item } = this.props;
        const { isEditable, quantity, saveLoading, removeLoading, errors } = this.state;
        const option = humanize(item.production_options[0]);
        const itemTotal = item.price * item.quantity;
        return (
            <div>
                <ErrorHandler errors={errors} />
                <Flex spacebetween spacing="10">
                    <div>
                        {item.name}
                        <br />
                        {`(${option})`}
                        <br />
                    </div>
                    <Money type="positive">{itemTotal}</Money>
                </Flex>
                <div>
                    <span>Price Each: </span>
                    <Money type="positive">{item.price}</Money>
                </div>
                <div>
                    <span>Bag Size: </span>
                    <Weights>{item.size}</Weights>
                </div>
                <div>
                    <span>Number of Bags: </span>
                    {isEditable && (
                        <Input 
                            onChange={this.handleInputChange}
                            name="quantity"
                            label=""
                            value={quantity}
                            type="number"
                        />
                    )}
                    {!isEditable && item.quantity}
                </div>
                <Flex spacebetween spacing="10">
                    <div>
                        <Button 
                            content={isEditable ? "Cancel" : "Remove"}
                            size="mini"
                            negative
                            basic
                            onClick={isEditable ? this.toggleEditable : this.handleDelete}
                            loading={removeLoading}
                        />
                    </div>
                    <div>
                        <Button 
                            content={isEditable ? "Save" : "Edit"}
                            size="mini"
                            positive
                            onClick={isEditable ? this.handleSubmit : this.toggleEditable}
                            loading={saveLoading}
                        />
                    </div>
                </Flex>
                
                <Divider />
            </div>
        );
    }
}

const { object, func } = PropTypes;
MiniDetails.propTypes = {
    item: object,
    customer: object,
    getData: func,
    updateContext: func
};

export default withContext(MiniDetails);
import React, { Fragment as F } from "react";
import PropTypes from "prop-types";
import { Item } from "semantic-ui-react";

/* eslint-disable */
/* eslint-enable */

class OrderAddress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { roaster, customer } = this.props;
        const roasterLogo = roaster.logo_image_url;
        const customerLogo = customer.logo_url;
        const { primary_address: raddress } = roaster;
        const { primary_address: caddress } = customer;
        return (
            <Item.Group unstackable>
                <Item>
                    <Item.Image size="tiny" src={roasterLogo} />
                    <Item.Content verticalAlign="top">
                        <Item.Header as="a">{roaster.name}</Item.Header>
                        <Item.Description>
                            <p>
                                {raddress.street_1}
                                <br />
                                {raddress.street_2 && (
                                    <F>
                                        {raddress.street_2}
                                        <br />
                                    </F>
                                )}
                                {`${raddress.city}, ${raddress.state} ${raddress.postal_code}`}
                            </p>
                        </Item.Description>
                    </Item.Content>
                </Item>
                <Item>
                    <Item.Content>
                        <Item.Meta content="Bill To:" />
                    </Item.Content>
                </Item>
                <Item>
                    <Item.Image size="tiny" src={customerLogo} />
                    <Item.Content verticalAlign="top">
                        <Item.Header as="a">{customer.company_name}</Item.Header>
                        <Item.Description>
                            <p>
                                {caddress.street_1}
                                <br />
                                {caddress.street_2 && (
                                    <F>
                                        {caddress.street_2}
                                        <br />
                                    </F>
                                )}
                                {`${caddress.city}, ${caddress.state} ${caddress.postal_code}`}
                            </p>
                        </Item.Description>
                    </Item.Content>
                </Item>
            </Item.Group>
        );
    }
}
OrderAddress.propTypes = {
    roaster: PropTypes.object,
    customer: PropTypes.object
};

export default OrderAddress;

import React from "react";
import PropTypes from "prop-types";
import { Segment, Header, Icon } from "semantic-ui-react";

/* eslint-disable */
import { callMeDanger } from "utilities";

import styles from "stylesheets/variables";
/* eslint-enable */

class EmptyCart extends React.PureComponent {

    render() {
        const { roaster_name } = this.props;
        const paraStyles = { maxWidth: 400, marginLeft: "auto", marginRight: "auto", fontSize: 18 };
        const cartIcon = { color: styles.darkgray };
        const exclamIcon = { top: '38%', left: '58%', color: styles.lightgray };
        return (
            <Segment>
                <Header as="h2" content={"Cart: " + roaster_name} dividing />
                <Segment secondary textAlign="center" padded="very">
                    <Header as="h2" content="Oh No!" />
                    <p style={paraStyles}>
                        {callMeDanger(`It looks like your cart is empty. You can check out our 
                            inventory <a href="/">here</a> and start creating your order.`)}
                    </p>
                    <a href="/">
                        <Icon.Group>
                            <Icon name="cart" size="massive" style={cartIcon} />

                            <Icon
                                size="big"
                                name="exclamation"
                                inverted
                                style={exclamIcon}
                            />
                        </Icon.Group>
                    </a>
                </Segment>
            </Segment>
        );
    }
}

EmptyCart.propTypes = {
    roaster_name: PropTypes.string
};

export default EmptyCart;

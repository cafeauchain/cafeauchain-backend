import React from "react";
import PropTypes from "prop-types";
import { Icon } from "semantic-ui-react";

/* eslint-disable */
/* eslint-enable */

class MiniCardView extends React.PureComponent {
    render(){
        const {
            card: { brand, last4, exp_month, exp_year},
        } = this.props;
        const exp = exp_month + "/" + exp_year;
        const brandLower = brand ? brand.toLowerCase() : "";
        const brandUpper = brand ? brand.toUpperCase() : "";
        return (
            <React.Fragment>
                <Icon name={"cc " + brandLower} size="large" />
                {`${brandUpper} ${last4}`}
                <br />
                {exp}
            </React.Fragment>
        );
    }
    
}

const { func, object } = PropTypes;
MiniCardView.propTypes = {
    card: object,
};

export default MiniCardView;

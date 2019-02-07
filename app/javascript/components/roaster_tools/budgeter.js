import React, { Component, Fragment as F } from "react";
import PropTypes from "prop-types";
import { Header } from "semantic-ui-react";

/* eslint-disable */
import { Money, AsNumber } from "shared/textFormatters";

import roasterCostCalc from "utilities/roasterCostCalc";
import API_URL from "utilities/apiUtils/url";
/* eslint-enable */

class Budgeter extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        const { id } = this.props;
        this.getData(id);
    }
    getData = async id => {
        let response = await fetch(`${API_URL}/roasters/${id}/lots`);
        const { data } = await response.json();
        const total = data.reduce((total, amount) => total + amount.attributes.total_amount_roasted, 0);
        this.setState({ total });
    };
    getRemaining = value => {
        value = Number(value);
        if (value < 500) {
            return 500 - value;
        }
        return Math.ceil(value / 100) * 100 - value;
    };

    render() {
        let { total } = this.state;
        let showContent = total !== undefined;
        return (
            <F>
                <Header as="h2" content="Activity" />
                {showContent && (
                    <div>
                        <F>To date, youve roasted </F>
                        <AsNumber type="positive">{total}</AsNumber>
                        <F> pounds of green coffee. Your current bill is </F>
                        <Money type="negative">{roasterCostCalc(total)}</Money>
                        <F>. You can roast another </F>
                        <AsNumber type="positive">{this.getRemaining(total)}</AsNumber>
                        <F> pounds before you will be charged another $2.</F>
                    </div>
                )}
            </F>
        );
    }
}

const { oneOfType, string, number } = PropTypes;
Budgeter.propTypes = {
    id: oneOfType([number, string])
};

export default Budgeter;

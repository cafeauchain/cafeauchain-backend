import React, { Component, Fragment as F } from "react";
import PropTypes from "prop-types";
import { Header } from "semantic-ui-react";

/* eslint-disable */
import { Money, AsNumber } from "shared/textFormatters";

import roasterCostCalc from "utilities/roasterCostCalc";
import API_URL from "utilities/apiUtils/url";

import User from "contexts/user";
/* eslint-enable */

const Wrapper = props => <User>{user => <Budgeter {...props} lots={user.lots} />}</User>;

class Budgeter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lots: []
        };
    }

    componentDidMount() {
        this.handleLotUpdate();
    }

    componentDidUpdate() {
        this.handleLotUpdate();
    }

    handleLotUpdate = () => {
        const { lots } = this.props;
        const { lots: statelots } = this.state;
        if (lots.length && statelots.length !== lots.length) {
            this.setState({ lots }, this.getData(lots));
        }
    };

    getData = lots => {
        const total = lots.reduce((total, amount) => total + amount.attributes.total_amount_roasted, 0);
        this.setState({ total });
    };

    getRemaining = value => {
        value = Number(value);
        return value < 500 ? 500 - value : Math.ceil(value / 100) * 100 - value;
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

const { array } = PropTypes;
Budgeter.propTypes = {
    lots: array
};

export default Wrapper;

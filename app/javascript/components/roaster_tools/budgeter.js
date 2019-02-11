import React, { Component, Fragment as F } from "react";
import PropTypes from "prop-types";
import { Header, Dimmer, Loader } from "semantic-ui-react";

/* eslint-disable */
import { Money, AsNumber } from "shared/textFormatters";

import roasterCostCalc from "utilities/roasterCostCalc";

import Lots from "contexts/lots";
/* eslint-enable */

const Wrapper = props => <Lots>{lots => <Budgeter {...props} lots={lots.data} loading={lots.loading} />}</Lots>;

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
        if (lots.length && statelots !== lots) {
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
        const { loading } = this.props;
        let showContent = total !== undefined;
        return (
            <F>
                <Header as="h2" content="Activity" />
                {showContent && (
                    <div style={{ position: "relative" }}>
                        <Dimmer active={loading} inverted>
                            <Loader active={loading} size="large" />
                        </Dimmer>
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

const { array, bool } = PropTypes;
Budgeter.propTypes = {
    lots: array,
    loading: bool
};

export default Wrapper;

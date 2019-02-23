import React, { Component, Fragment as F } from "react";
import PropTypes from "prop-types";
import { Header, Dimmer, Loader, Progress } from "semantic-ui-react";
import moment from "moment";

/* eslint-disable */
import { Money, AsNumber } from "shared/textFormatters";

import roasterCostCalc from "utilities/roasterCostCalc";

import Context from "contexts/main";
/* eslint-enable */

const Wrapper = props => <Context>{ctx => <Budgeter {...props} data={ctx.activity} loading={ctx.loading} />}</Context>;

class Budgeter extends Component {
    getRemaining = value => {
        value = Number(value);
        return value < 500 ? 500 - value : Math.ceil(value / 100) * 100 - value;
    };

    getLimit = value => {
        value = Number(value);
        return value < 500 ? 500 : 100;
    };

    getColor = pct => {
        let color = "green";
        if (pct > 75) {
            color = "yellow";
        }
        if (pct > 90) {
            color = "red";
        }
        return color;
    };

    // TODO We can probably remove this once we get stripe set up correctly
    getAmountDue = (value, period_start, subscription_start) => {
        let total = roasterCostCalc(value);
        if (moment(period_start).isSame(moment(subscription_start), "day")) {
            return value <= 500 ? 0 : total - 19.99;
        }
        return total;
    };

    render() {
        const { data, loading } = this.props;
        const { attributes } = data;
        let total,
            amountRemaining,
            period_start,
            period_start_display,
            period_end,
            period_end_display,
            days_remaining,
            days_elapsed,
            dayProgress,
            dayColor,
            roastProgress,
            roastColor,
            subscription_start,
            amount_due;
        const today = moment().startOf("day");
        if (attributes) {
            total = attributes.amount_roasted_in_cycle;
            amountRemaining = this.getRemaining(total);
            period_start = moment(attributes.period_start).startOf("day");
            period_start_display = period_start.format("MMMM D");
            period_end = moment(attributes.period_end).endOf("day");
            period_end_display = period_end.format("MMMM D");
            days_remaining = period_end.diff(today, "days");
            days_elapsed = today.diff(period_start, "days");
            dayProgress = (days_elapsed / 30) * 100;
            dayColor = this.getColor(dayProgress);
            roastProgress = ((this.getLimit(total) - this.getRemaining(total)) / this.getLimit(total)) * 100;
            roastColor = this.getColor(roastProgress);
            subscription_start = attributes.subscription_start;
            amount_due = this.getAmountDue(total, period_start, subscription_start);
        }
        return (
            <F>
                <Header as="h2" content="Billing Activity" />
                <div style={{ position: "relative" }}>
                    <Dimmer active={loading} inverted>
                        <Loader active={loading} size="large" />
                    </Dimmer>
                    <F>
                        <Progress percent={dayProgress} color={dayColor}>
                            {days_remaining}
                            <F> Days Remaining</F>
                        </Progress>
                        <Progress percent={roastProgress} color={roastColor}>
                            {amountRemaining}
                            <F> lbs before next charge</F>
                        </Progress>
                        <Header as="h3">
                            <F>Billing: </F>
                            <Money type="negative">{amount_due}</Money>
                            <F> due on </F>
                            {period_end_display}
                        </Header>
                        <div>
                            {/* eslint-disable-next-line */}
                            <span>To date, you've roasted </span>
                            <AsNumber type="positive">{total}</AsNumber>
                            <F> pounds of green coffee. Your current bill is </F>
                            <Money type="negative">{amount_due}</Money>
                            <F>. You can roast </F>
                            <AsNumber type="positive">{amountRemaining}</AsNumber>
                            <F> more pounds before you will be charged another $2. Your period started on </F>
                            {period_start_display}
                            <F> and will end on </F>
                            {period_end_display}
                            <F>. There are </F>
                            {days_remaining}
                            <F> days left in this billing cycle.</F>
                        </div>
                    </F>
                </div>
            </F>
        );
    }
}

const { object, bool } = PropTypes;
Budgeter.propTypes = {
    data: object,
    loading: bool
};

export default Wrapper;

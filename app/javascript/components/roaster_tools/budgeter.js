import React, { Component, Fragment as F } from "react";
import PropTypes from "prop-types";
import { Header, Dimmer, Loader, Progress } from "semantic-ui-react";
import moment from "moment";

/* eslint-disable */
import { Money, AsNumber } from "shared/textFormatters";

import roasterCostCalc from "utilities/roasterCostCalc";

import Activity from "contexts/activity";
/* eslint-enable */

const Wrapper = props => (
    <Activity>{activity => <Budgeter {...props} data={activity.data} loading={activity.loading} />}</Activity>
);

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
        let showContent = false;
        const { attributes } = data;
        let total,
            period_start,
            period_end,
            days_remaining,
            days_elapsed,
            dayProgress,
            roastProgress,
            subscription_start,
            amount_due;
        const today = moment().startOf("day");
        if (attributes) {
            showContent = true;
            total = attributes.amount_roasted_in_cycle;
            period_start = moment(attributes.period_start).startOf("day");
            period_end = moment(attributes.period_end).startOf("day");
            days_remaining = period_end.diff(today, "days");
            days_elapsed = today.diff(period_start, "days");
            dayProgress = (days_elapsed / 30) * 100;
            roastProgress = ((this.getLimit(total) - this.getRemaining(total)) / this.getLimit(total)) * 100;
            subscription_start = attributes.subscription_start;
            amount_due = this.getAmountDue(total, period_start, subscription_start);
        }
        return (
            <F>
                <Header as="h2" content="Billing Activity" />
                {showContent && (
                    <div style={{ position: "relative" }}>
                        <Dimmer active={loading} inverted>
                            <Loader active={loading} size="large" />
                        </Dimmer>
                        <Progress percent={dayProgress} color={this.getColor(dayProgress)}>
                            {days_remaining}
                            <F> Days Remaining</F>
                        </Progress>
                        <Progress percent={roastProgress} color={this.getColor(roastProgress)}>
                            {this.getRemaining(total)}
                            <F> lbs before next charge</F>
                        </Progress>
                        <Header as="h3">
                            <F>Billing: </F>
                            <Money type="negative">{amount_due}</Money>
                            <F> due on </F>
                            {period_end.format("MMMM D")}
                        </Header>
                        <div>
                            {/* eslint-disable-next-line */}
                            <span>To date, you've roasted </span>
                            <AsNumber type="positive">{total}</AsNumber>
                            <F> pounds of green coffee. Your current bill is </F>
                            <Money type="negative">{amount_due}</Money>
                            <F>. You can roast </F>
                            <AsNumber type="positive">{this.getRemaining(total)}</AsNumber>
                            <F> more pounds before you will be charged another $2. Your period started on </F>
                            {period_start.format("MMMM D")}
                            <F> and will end on </F>
                            {period_end.format("MMMM D")}
                            <F>. There are </F>
                            {days_remaining}
                            <F> days left in this billing cycle.</F>
                        </div>
                    </div>
                )}
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

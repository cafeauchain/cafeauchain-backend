import React, { Component, Fragment as F } from "react";
import PropTypes from "prop-types";
import { Header, Dimmer, Loader, Progress } from "semantic-ui-react";
import moment from "moment";

/* eslint-disable */
import { Money, AsNumber } from "shared/textFormatters";

import withContext from "contexts/withContext";
/* eslint-enable */

class Budgeter extends Component {
    componentDidMount() {
        const { activity, getData } = this.props;
        if (activity === undefined) getData("activity");
    }
    getRemaining = value => {
        value = Number(value);
        return value < 500 ? 500 - value : Math.ceil(value / 500) * 500 - value;
    };

    getColor = pct => pct > 90 ? "red" : (pct > 75 ? "yellow" : "green");

    render() {
        const { loading, activity: data } = this.props;

        if (data === undefined) {
            return (
                <Dimmer inverted active>
                    <Loader size="large" />
                </Dimmer>
            );
        }

        const { attributes: {
            amount_roasted_in_cycle: total,
            period_start: attr_period_start,
            period_end: attr_period_end,
            next_amount_due
        } } = data;

        const today = moment().startOf("day");
        const amountRemaining = this.getRemaining(total);
        const period_start = moment(attr_period_start).startOf("day");
        const period_start_display = period_start.format("MMMM D");
        const period_end = moment(attr_period_end).endOf("day");
        const period_end_display = period_end.format("MMMM D");
        const days_remaining = period_end.diff(today, "days");
        const days_elapsed = today.diff(period_start, "days");
        const days_in_period = period_end.diff(period_start, "days");
        const dayProgress = (days_elapsed / days_in_period) * 100;
        const dayColor = this.getColor(dayProgress);
        const roastProgress = ((500 - amountRemaining) / 500) * 100;
        const roastColor = this.getColor(roastProgress);
        const amount_due = next_amount_due / 100;
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
                            <Money type="negative">{amount_due}</Money>
                            <F> due </F>
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
                            <F> more pounds before triggering a $10 usage fee. Your period started on </F>
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

const { object, bool, func } = PropTypes;
Budgeter.propTypes = {
    activity: object,
    loading: bool,
    getData: func
};

export default withContext(Budgeter);

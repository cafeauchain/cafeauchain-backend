import React, { Component, Fragment as F } from "react";
import PropTypes from "prop-types";
import { Header, Button } from "semantic-ui-react";
import moment from "moment";

/* eslint-disable */
import tableDefs from "defs/tables/roastLog";

import Table from "shared/table";
import { Money, AsNumber } from "shared/textFormatters";
import Flex from "shared/flex";

import { getTimePeriod, abbreviator } from "utilities";
// import API_URL from "utilities/apiUtils/url";
// import requester from "utilities/apiUtils/requester";

import { url as API_URL, requester, roasterUrl, fetcher } from "utilities/apiUtils";

import User from "contexts/user";
import LotsByPeriod from "contexts/lotsByPeriod";
/* eslint-enable */

const Wrapper = props => (
    <LotsByPeriod>
        {lots => (
            <RoastLog
                {...props}
                lots={lots.data}
                loading={lots.loading}
                userId={lots.userId}
                updateContext={lots.updateContext}
            />
        )}
    </LotsByPeriod>
);

class RoastLog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            lots: [],
            month: moment().format("YYYY-MM"),
            period: "day"
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
        const { month, lots: statelots, period } = this.state;
        const dateRange = this.getDateRange(month, period);
        if (lots.length && statelots !== lots) {
            this.setState({ lots }, this.getData(lots, dateRange));
        }
    };

    getDateRange = (month, period) => {
        let start = moment(month).startOf("month");
        let end = moment(month).endOf("month");
        if (period === "week") {
            start = start.startOf("week");
            end = end.startOf("week");
        }
        return getTimePeriod(start, end, period);
    };
    getData = (lots, dateRange) => {
        const { month } = this.state;
        this.setState({ month }, this.transformData(lots, dateRange));
    };

    transformData = (data, dateRange) => {
        // This is the transformer to create dates and add data to each row
        const days = dateRange.map(day => {
            const amounts = data.reduce((obj, item) => {
                const match = item.attributes.batches[moment(day).format("YYYY-MM-DD")];
                const amount = match ? match.roasted_on_date : 0;
                return { ...obj, ["lot_" + item.id]: amount };
                // const match = item.amounts.find(datematch => moment(datematch.date).isSame(day, "day"));
                // const amount = match ? match.amount_roasted : 0;
                // return { ...obj, ["lot_" + item.lot.id]: amount };
            }, {});
            return {
                date: day.format("MMM DD"),
                ...amounts,
                id: day.format("MMM DD")
            };
        });
        this.setState({ data: days });
    };
    // updateData = (event, dir) => {
    //     const { target } = event;
    //     event.preventDefault();
    //     target.blur();
    //     const { month: statemonth, lots, period } = this.state;
    //     let increment = 1;
    //     if (dir === "previous") {
    //         increment = -1;
    //     }
    //     if (dir === "next") {
    //         increment = 1;
    //     }
    //     const month = moment(statemonth).add(increment, "month");
    //     const dateRange = this.getDateRange(month, period);
    //     this.getData(lots, dateRange);
    // };

    modifyTableDefs = lots => {
        let { fields, ...rest } = tableDefs;
        const exclude = RegExp(/^\([0-9]{4}\)$/);
        let newFields = lots.map(lot => {
            const { crop_name: title } = lot.attributes;
            const label = title ? abbreviator(title, exclude, true) : lot.id;
            return { name: "lot_" + lot.id, label, formatter: AsNumber, title };
        });
        fields = [...fields, ...newFields];
        return { ...rest, fields };
    };

    // eslint-disable-next-line
    checkMonth = (month, dir) => {
        // TODO When there is real data, decide on a way to disable Previous when there would be no data
        return moment(month).isBefore(moment(), "month");
    };

    updatePeriod = async (e, { period }) => {
        const { userId, updateContext } = this.props;
        const url = roasterUrl(userId) + "/lots_by_date?period=" + period;
        const data = await fetcher(url);
        await this.setState({ period: period });
        updateContext({ data });
    };

    render() {
        const { loading } = this.props;
        const { data, lots, month, period } = this.state;
        const modified = this.modifyTableDefs(lots);
        return (
            <F>
                <Header as="h2" content={"Roast log: " + moment(month).format("MMMM YYYY")} />
                <Button.Group style={{ marginBottom: 20 }}>
                    <Button onClick={this.updatePeriod} period="day" content="Day" active={period === "day"} />
                    <Button onClick={this.updatePeriod} period="week" content="Week" active={period === "week"} />
                    <Button onClick={this.updatePeriod} period="month" content="Month" active={period === "month"} />
                </Button.Group>
                <Table tableDefs={modified} data={data} loading={loading} />
                <Flex spacebetween style={{ marginTop: 20 }}>
                    <Button primary onClick={e => this.updateData(e, "previous")} content="Previous Month" />
                    <Button
                        primary
                        onClick={e => this.updateData(e, "next")}
                        disabled={!this.checkMonth(month)}
                        content="Next Month"
                    />
                </Flex>
            </F>
        );
    }
}

const { array, bool, oneOfType, string, number, func } = PropTypes;
RoastLog.propTypes = {
    lots: array,
    loading: bool,
    userId: oneOfType([string, number]),
    updateContext: func
};

export default Wrapper;

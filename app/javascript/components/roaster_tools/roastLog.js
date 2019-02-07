import React, { Component, Fragment as F } from "react";
import PropTypes from "prop-types";
import { Header, Button } from "semantic-ui-react";
import moment from "moment";

/* eslint-disable */
import getRandomData from "roaster_tools/data/tempTrxByDay";

import tableDefs from "tableDefinitions/roastLog";

import Table from "shared/table";
import { Money, AsNumber } from "shared/textFormatters";
import Flex from "shared/flex";

import getTimePeriod from "utilities/getTimePeriod";
import abbreviator from "utilities/abbreviator";
import requester from "utilities/apiUtils/requester";
import API_URL from "utilities/apiUtils/url";
/* eslint-enable */

// TODO Most of this can probably be deleted when there is real data

class RoastLog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            lots: [],
            month: moment().format("YYYY-MM")
        };
    }
    componentDidMount() {
        const { id } = this.props;
        const { month } = this.state;
        const dateRange = this.getDateRange(month);
        this.getData(id, dateRange);
    }
    getDateRange = month => {
        const start = moment(month).startOf("month");
        const end = moment(month).endOf("month");
        return getTimePeriod(start, end, "day");
    };
    getData = async (id, dateRange) => {
        let response = await fetch(`/api/v1/roasters/${id}/lots`);
        const { data } = await response.json();
        const month = moment(dateRange[0]).format("YYYY-MM-DD");

        // // This is the faked data
        // const randomNumber = (min, max) => Math.floor(Math.random() * (max - min)) + min;
        // const randomDate = (start, end) =>
        //     new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        //
        // const transformed = data.map(lot => {
        //     const array = Array.from(Array(randomNumber(1, 28))).map(() => {
        //         let amount_roasted = randomNumber(0, 50);
        //         return {
        //             date: moment(
        //                 randomDate(new Date(moment(month).startOf("month")), new Date(moment(month).endOf("month")))
        //             ),
        //             amount_roasted
        //         };
        //     });
        //     return { lot, amounts: array };
        // });
        // End Fake Data
        this.setState({ lots: data, month }, this.transformData(data, dateRange));
    };

    transformData = (data, dateRange) => {
        // This is the transformer to create loops and add data to each row
        const days = dateRange.map(day => {
            const amounts = data.reduce((obj, item) => {
                const match = item.attributes.batches[moment(day).format("YYYY-MM-DD")];
                const amount = match ? match.reduce((total, batch) => total + batch.starting_amount, 0) : 0;
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
    updateData = (event, dir) => {
        const { target } = event;
        event.preventDefault();
        target.blur();
        const { id } = this.props;
        const { month: statemonth } = this.state;
        let increment = 1;
        if (dir === "previous") {
            increment = -1;
        }
        if (dir === "next") {
            increment = 1;
        }
        const month = moment(statemonth).add(increment, "month");
        const dateRange = this.getDateRange(month);
        this.getData(id, dateRange);
    };

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

    render() {
        const { data, lots, month } = this.state;
        const modified = this.modifyTableDefs(lots);
        return (
            <F>
                <Header as="h2" content={"Roast log: " + moment(month).format("MMMM YYYY")} />
                <Table tableDefs={modified} data={data} />
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

const { oneOfType, string, number } = PropTypes;
RoastLog.propTypes = {
    id: oneOfType([number, string])
};

export default RoastLog;

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
            month: "2019-02"
        };
    }
    componentDidMount() {
        const { id } = this.props;
        const { month } = this.state;
        const dateRange = this.getDateRange(month);
        this.getData(id, dateRange);
    }
    getDateRange = month => {
        return {
            start: moment(month).startOf("month"),
            end: moment(month).endOf("month"),
            unit: "day"
        };
    };
    getData = async (id, dateRange) => {
        let response = await fetch(`/api/v1/roasters/${id}/lots`);
        const { data } = await response.json();
        const randomData = getRandomData({
            ...dateRange,
            lots: data.map(lot => lot.id)
        });
        let transformed = randomData.map(date => {
            let amounts = date.amounts.reduce((acc, item) => ({ ...acc, [item.lot_id]: item.amount_roasted }), {});
            return { date: date.date, ...amounts, id: date.date };
        });

        this.setState({ data: transformed, lots: data, month: moment(dateRange.start).format("YYYY-MM") });
    };
    updateData = (event, dir) => {
        event.preventDefault();
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
            return { name: lot.id, label, formatter: AsNumber, title };
        });
        fields = [...fields, ...newFields];
        return { ...rest, fields };
    };

    render() {
        const { data, lots, month } = this.state;
        const modified = this.modifyTableDefs(lots);
        return (
            <F>
                <Header as="h2" content={"Roast log: " + moment(month).format("MMMM YYYY")} />
                <Table tableDefs={modified} data={data} />
                <Flex spacebetween style={{ marginTop: 20 }}>
                    <Button onClick={e => this.updateData(e, "previous")} content="Previous Month" />
                    <Button onClick={e => this.updateData(e, "next")} content="Next Month" />
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

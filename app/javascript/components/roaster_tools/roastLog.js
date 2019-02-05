import React, { Component, Fragment as F } from "react";
import PropTypes from "prop-types";
import { Header, Segment } from "semantic-ui-react";

/* eslint-disable */
import getRandomData from "roaster_tools/data/tempTrxByDay";

import tableDefs from "tableDefinitions/roastLog";

import Table from "shared/table";
import { Money, AsNumber } from "shared/textFormatters";

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
            lots: []
        };
    }
    componentDidMount() {
        const { id } = this.props;
        this.getData(id);
    }
    getData = async id => {
        let response = await fetch(`/api/v1/roasters/${id}/lots`);
        const { data } = await response.json();
        const randomData = getRandomData({
            start: "2019-02-01",
            end: "2019-02-28",
            unit: "day",
            lots: data.map(lot => lot.id)
        });
        let transformed = randomData.map(date => {
            let amounts = date.amounts.reduce((acc, item) => ({ ...acc, [item.lot_id]: item.amount_roasted }), {});
            return { date: date.date, ...amounts, id: date.date };
        });

        this.setState({ data: transformed, lots: data });
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
        const { data, lots } = this.state;
        const modified = this.modifyTableDefs(lots);
        return (
            <F>
                <Header as="h2" content="Roast log" />
                <Table tableDefs={modified} data={data} />
            </F>
        );
    }
}

const { oneOfType, string, number } = PropTypes;
RoastLog.propTypes = {
    id: oneOfType([number, string])
};

export default RoastLog;

import React, { Component, Fragment as F } from "react";
import PropTypes from "prop-types";
import { Header } from "semantic-ui-react";

/* eslint-disable */
import Table from "shared/table";
import { AsNumber } from "shared/textFormatters";

import API_URL from "utilities/apiUtils/url";
/* eslint-enable */

class RoastLog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            lots: []
        };
    }
    componentDidMount() {
        const { id } = this.props;
        this.getLots(id);
        this.getData(id);
    }
    getLots = async id => {
        const response = await fetch(`${API_URL}/roasters/${id}/lots`);
        const { data } = await response.json();
        this.setState({ lots: data });
    };
    getData = async id => {
        let response = await fetch(`${API_URL}/roasters/${id}/batches`);
        const data = await response.json();
        this.setState({ data });
    };

    buildLog = (data, lots) => {
        const tables = Object.keys(data).map(date => {
            const tableDefs = {
                title: date,
                fields: [
                    { name: "lot_name", label: "Lot" },
                    { name: "starting_amount", label: "Green Coffee", formatter: AsNumber },
                    { name: "ending_amount", label: "Roasted Coffee", formatter: AsNumber }
                ],
                props: {
                    celled: true,
                    striped: true,
                    selectable: true,
                    singleLine: true
                }
            };
            const tableData = data[date].map(item => {
                const lot = lots.find(lot => Number(item.lot_id) === Number(lot.id));
                const { attributes } = lot;
                const lot_name = attributes ? attributes.crop_name : item.id;
                return { ...item, lot_name };
            });
            return <Table key={date} tableDefs={tableDefs} data={tableData} />;
        });
        return tables;
    };

    render() {
        const { data, lots } = this.state;
        return (
            <F>
                <Header as="h2" content="Daily Roast log" />
                {data && lots.length > 0 && this.buildLog(data, lots).reverse()}
            </F>
        );
    }
}

const { oneOfType, string, number } = PropTypes;
RoastLog.propTypes = {
    id: oneOfType([number, string])
};

export default RoastLog;

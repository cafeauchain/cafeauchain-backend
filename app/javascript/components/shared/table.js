import React, { Component } from "react";
import PropTypes from "prop-types";
// TODO Remove semantic-ui-react-button-pagination
// import Pagination from "semantic-ui-react-button-pagination";
import { Pagination, Table } from "semantic-ui-react";

import capitalize from "../utilities/capitalize";
import namespacer from "../utilities/fieldNamespacer";

// Temporary
// TODO remove this
import tableLayout from "../admin/producers/tableDefs";

class FormattedTable extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    buildTableCells = item => {
        return tableLayout.fields.map(field => {
            let { namespace, name, ...rest } = field;
            let value = item[name];
            if (namespace) {
                if (typeof namespace === "string") {
                    value = item[namespace][name];
                } else {
                    value = namespacer(namespace, item)[name];
                }
            }
            return (
                <Table.Cell {...rest} key={field.name}>
                    {value}
                </Table.Cell>
            );
        });
    };

    render() {
        const { producers, pagination, onPageChange, onClick } = this.props;
        return (
            <Table {...tableLayout.props}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan={tableLayout.fields.length}>{tableLayout.title}</Table.HeaderCell>
                    </Table.Row>
                    <Table.Row>
                        {tableLayout.fields.map(field => (
                            <Table.HeaderCell key={field.name}>{capitalize(field.name)}</Table.HeaderCell>
                        ))}
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {producers.map(producer => (
                        <Table.Row key={producer.id} onClick={e => onClick(e, producer)}>
                            {this.buildTableCells(producer)}
                        </Table.Row>
                    ))}
                </Table.Body>

                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan={tableLayout.fields.length} textAlign="right">
                            <Pagination
                                defaultActivePage={pagination.pagenumber}
                                totalPages={pagination.totalpages}
                                onPageChange={onPageChange}
                            />
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        );
    }
}
const { array, func, object } = PropTypes;
FormattedTable.propTypes = {
    producers: array,
    onPageChange: func,
    onClick: func,
    pagination: object
};

export default FormattedTable;

import React, { Component } from "react";
import PropTypes from "prop-types";
// TODO Remove semantic-ui-react-button-pagination
// import Pagination from "semantic-ui-react-button-pagination";
import { Pagination, Table } from "semantic-ui-react";

import capitalize from "../utilities/capitalize";
import namespacer from "../utilities/fieldNamespacer";

class FormattedTable extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    buildTableCells = item => {
        const { tableDefs } = this.props;
        return tableDefs.fields.map(field => {
            const { namespace, name, formatter: Formatter, ...rest } = field;
            let value = item[name];
            if (namespace) {
                if (typeof namespace === "string") {
                    value = item[namespace][name];
                } else {
                    value = namespacer(namespace, item)[name];
                }
            }

            if (Formatter) value = <Formatter content={value} />;

            return (
                <Table.Cell {...rest} key={name}>
                    {value}
                </Table.Cell>
            );
        });
    };

    render() {
        const { tableDefs, data, pagination, onPageChange, onClick } = this.props;
        return (
            <Table {...tableDefs.props}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan={tableDefs.fields.length}>{tableDefs.title}</Table.HeaderCell>
                    </Table.Row>
                    <Table.Row>
                        {tableDefs.fields.map(field => (
                            <Table.HeaderCell key={field.name}>{capitalize(field.name)}</Table.HeaderCell>
                        ))}
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {data.map(item => (
                        <Table.Row key={item.id} onClick={e => onClick(e, item)}>
                            {this.buildTableCells(item)}
                        </Table.Row>
                    ))}
                </Table.Body>
                {pagination && (
                    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan={tableDefs.fields.length} textAlign="right">
                                <Pagination
                                    defaultActivePage={pagination.pagenumber}
                                    totalPages={pagination.totalpages}
                                    onPageChange={onPageChange}
                                />
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                )}
            </Table>
        );
    }
}
const { array, func, object } = PropTypes;
FormattedTable.propTypes = {
    data: array.isRequired,
    onPageChange: func,
    onClick: func,
    pagination: object,
    tableDefs: object.isRequired
};

export default FormattedTable;

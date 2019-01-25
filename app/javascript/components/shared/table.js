import React, { Component } from "react";
import PropTypes from "prop-types";
// TODO Remove semantic-ui-react-button-pagination
// import Pagination from "semantic-ui-react-button-pagination";
import { Pagination, Table } from "semantic-ui-react";

class FormattedTable extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { producers, pagination, onPageChange } = this.props;
        return (
            <Table celled striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan="3">Producers</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {producers.map(producer => {
                        return (
                            <Table.Row key={producer.id}>
                                <Table.Cell collapsing>{producer.attributes.name}</Table.Cell>
                                <Table.Cell>{producer.attributes.location}</Table.Cell>
                            </Table.Row>
                        );
                    })}
                </Table.Body>

                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan="3">
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
    pagination: object
};
export default FormattedTable;

import React, { Component } from "react";
import PropTypes from "prop-types";
// TODO Remove semantic-ui-react-button-pagination
// import Pagination from "semantic-ui-react-button-pagination";
import { Pagination, Table, Ref, Loader, Dimmer, Container } from "semantic-ui-react";

/* eslint-disable */
import humanize from "utilities/humanize";
import namespacer from "utilities/fieldNamespacer";
import sortBy from "utilities/sortBy";
import debounce from "utilities/debounce";
/* eslint-enable */

class FormattedTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            column: null,
            data: props.data,
            direction: null,
            scrollable: true
        };
        this.tableRef = React.createRef();
        this.containerRef = React.createRef();
        this._handleWindowResize = debounce(this._handleWindowResize, 250);
    }

    componentDidMount() {
        this._isMounted = true;
        window.addEventListener("resize", this._handleWindowResize);
        this._handleWindowResize();
    }
    componentDidUpdate(props) {
        const { data: newData } = this.props;
        const { data: oldData } = props;
        if (newData !== oldData) {
            // eslint-disable-next-line
            this.setState({ data: newData }, this._handleWindowResize());
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
        window.removeEventListener("resize", this._handleWindowResize);
    }

    _handleWindowResize = () => {
        // TODO Revist to hide overflow on initial load and/or add in loader until there is data
        // Also add in ability to hide scroll while resizing
        // Also add in abiltiy to make column(s) and header row(s) sticky
        let { data, scrollable: oldScroll } = this.state;
        let scrollable = oldScroll;

        if (this.containerRef.current && data.length) {
            let containerWidth = this.containerRef.current.getBoundingClientRect().width;
            let table = this.containerRef.current.getElementsByTagName("table")[0];
            let tableWidth = table.getBoundingClientRect().width;
            scrollable = containerWidth < tableWidth;
        }
        if (scrollable !== oldScroll) {
            this.setState({ scrollable });
        }
    };

    handleSort = clickedColumn => () => {
        const { column, data, direction } = this.state;
        if (column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                data: sortBy({ collection: data, id: clickedColumn }),
                direction: "ascending"
            });

            return;
        }

        this.setState({
            data: data.reverse(),
            direction: direction === "ascending" ? "descending" : "ascending"
        });
    };

    buildTableCells = item => {
        const { tableDefs } = this.props;
        return tableDefs.fields.map(field => {
            const { namespace, name, formatter: Formatter, ...rest } = field;
            let value = item[name];
            if (namespace) {
                if (typeof namespace === "string" && namespace.indexOf("/") === -1) {
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
        const { tableDefs, pagination, onPageChange, onClick, loading } = this.props;
        const { data, column, direction, scrollable } = this.state;
        const { props: tableProps } = tableDefs;

        return (
            <Ref innerRef={this.containerRef}>
                <Container>
                    <Dimmer active={loading} inverted>
                        <Loader active={loading} size="large" style={{ top: 0, marginTop: 60 }} />
                    </Dimmer>
                    <div style={{ overflowX: scrollable ? "scroll" : "hidden" }}>
                        <Table {...tableProps}>
                            <Table.Header>
                                {tableDefs.title && (
                                    <Table.Row>
                                        <Table.HeaderCell colSpan={tableDefs.fields.length}>
                                            {tableDefs.title}
                                        </Table.HeaderCell>
                                    </Table.Row>
                                )}

                                <Table.Row>
                                    {tableDefs.fields.map(field => (
                                        <Table.HeaderCell
                                            sorted={column === field.name ? direction : null}
                                            onClick={tableProps.sortable ? this.handleSort(field.name) : null}
                                            key={field.name}
                                            title={field.title}
                                        >
                                            {humanize(field.label ? field.label : field.name)}
                                        </Table.HeaderCell>
                                    ))}
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {data.map(item => (
                                    <Table.Row key={item.id} onClick={e => onClick(e, item)}>
                                        {this.buildTableCells(item)}
                                    </Table.Row>
                                ))}
                                {!data.length && (
                                    <Table.Row>
                                        <Table.Cell colSpan={tableDefs.fields.length} content="No data available" />
                                    </Table.Row>
                                )}
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
                    </div>
                </Container>
            </Ref>
        );
    }
}
const { array, func, object, bool } = PropTypes;
FormattedTable.propTypes = {
    data: array.isRequired,
    onPageChange: func,
    onClick: func,
    pagination: object,
    tableDefs: object.isRequired,
    loading: bool
};

export default FormattedTable;

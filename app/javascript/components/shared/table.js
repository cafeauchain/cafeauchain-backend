import React, { Component } from "react";
import PropTypes from "prop-types";
// TODO Remove semantic-ui-react-button-pagination
// import Pagination from "semantic-ui-react-button-pagination";
import { Table, Ref, Loader, Dimmer } from "semantic-ui-react";

/* eslint-disable */
import Pagination from "shared/pagination";
import { humanize, namespacer, sortBy, debounce, params as paramatize, paramString } from "utilities";
/* eslint-enable */

class FormattedTable extends Component {
    constructor(props) {
        super(props);
        const string = window.location.search;
        const params = paramatize(string);
        const sorted = params.order_by ? params.order_by.split(" ") : [null, null];

        this.state = {
            column: sorted[0],
            data: props.data,
            direction: sorted[1],
            scrollable: true
        };
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
        const { pagination, onPageChange } = this.props;
        const { column, data, direction } = this.state;
        const {
            tableDefs: { fields }
        } = this.props;
        const item = fields.find(field => field.name === clickedColumn);

        const newDirection = direction === "asc" ? "desc" : "asc";

        if (pagination) {
            onPageChange({ startLoader: true });
            let string = window.location.search;
            let params = paramatize(string);
            const dir = column !== clickedColumn ? "asc" : newDirection;
            params.order_by = clickedColumn + " " + dir;
            params.page = 1;
            const newParamString = paramString(params);
            window.history.pushState(null, null, newParamString);
            onPageChange({ paramString: newParamString });
            if( column === clickedColumn ){
                this.setState({
                    direction: newDirection
                });
                return;
            }
        }

        if (column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                data: sortBy({ collection: data, id: clickedColumn, namespace: item.namespace }),
                direction: "asc"
            });
            return;
        }

        this.setState({
            data: data.reverse(),
            direction: newDirection
        });
    };

    buildTableCells = item => {
        const { tableDefs, inputExtras } = this.props;
        return tableDefs.fields.map(field => {
            const { namespace, name, formatter: Formatter, link, ...rest } = field;
            let value = namespace ? namespacer(namespace, item)[name] : item[name];
            const itemDetails = { id: item.id, type: item.type, name };
            let extras = {};
            if (inputExtras) {
                extras = { ...inputExtras, name, placeholder: humanize(name), value: value || "", isNew: item.isNew };
            }
            if (Formatter) value = <Formatter content={value} item={itemDetails} {...extras} />;
            if (link) value = <a href={link + item.id}>{value}</a>;
            return (
                <Table.Cell {...rest} key={rest.key || name}>
                    {value}
                </Table.Cell>
            );
        });
    };

    render() {
        const { tableDefs, pagination, onPageChange, onClick, loading } = this.props;
        const { data, column, direction, scrollable } = this.state;
        let { props: tableProps } = tableDefs;
        tableProps = { unstackable: true, singleLine: true, striped: true, selectable: true, ...tableProps };

        const tableDirection = direction === "asc" ? "ascending" : direction === "desc" ? "descending" : null;

        return (
            <Ref innerRef={this.containerRef}>
                <div>
                    <Dimmer active={loading} inverted>
                        <Loader active={loading} size="large" inline="centered" />
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
                                            sorted={column === field.name ? tableDirection : null}
                                            onClick={tableProps.sortable ? this.handleSort(field.name) : null}
                                            key={field.key || field.name}
                                            title={field.title}
                                            textAlign={field.textAlign}
                                        >
                                            {humanize(field.label ? field.label : field.name)}
                                        </Table.HeaderCell>
                                    ))}
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {data.map(item => (
                                    <Table.Row
                                        key={item.id}
                                        onClick={onClick ? e => onClick(e, item) : null}
                                        className={onClick ? "row-clickable" : null}
                                        verticalAlign={tableDefs.props.verticalAlign}
                                    >
                                        {this.buildTableCells(item)}
                                    </Table.Row>
                                ))}
                                {!data.length && (
                                    <Table.Row>
                                        <Table.Cell colSpan={tableDefs.fields.length} content="No data available" />
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table>
                    </div>
                    {pagination && pagination.totalpages && (
                        <React.Fragment>
                            <br />
                            <Pagination 
                                pagination={pagination}
                                onPageChange={onPageChange}
                            />
                        </React.Fragment> 
                    )}
                </div>
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
    loading: bool,
    inputExtras: object,
    paginationParams: object
};

export default FormattedTable;

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Pagination, Icon } from "semantic-ui-react";

/* eslint-disable */
import Input from "shared/input";
import Flex from "shared/flex";

import { params as paramatize, paramString, callMeDanger } from "utilities";
/* eslint-enable */

const pages = [10,25,50,100];

class Pager extends PureComponent {
    updatePage = async ({ activePage, value }) => {
        const { onPageChange } = this.props;
        let string = window.location.search;
        let params = paramatize(string);
        if (activePage) {
            params.page = activePage;
        }
        if (value) {
            params.limit = value;
            params.page = 1;
        }
        const newParamString = paramString(params);
        window.history.pushState(null, null, newParamString);
        onPageChange({ paramString: newParamString });
    };

    handleClick = (e, { activePage, value }) => {
        e.preventDefault();
        const { target } = e;
        target.blur();
        const { onPageChange } = this.props;
        onPageChange({ startLoader: true });
        this.updatePage({ activePage, value });
    };
    optionsBuilder = arr => arr.map( val => ({ value: val, key: val, text: val }));
    render(){
        const { pagination: { pagenumber, totalpages, pagesize, totalcount } } = this.props;
        let end = pagenumber * pagesize;
        const start = end - pagesize + 1;
        if( end > totalcount ){
            end = totalcount;
        }
        if( totalcount === 0 ) {
            return null;
        }
        return (
            <Flex spacebetween wrap centercross>
                <div flex="25">
                    <Input
                        upward
                        inputType="select"
                        options={this.optionsBuilder(pages)}
                        label="Items per page"
                        onChange={this.handleClick}
                        value={pages.includes(pagesize) ? pagesize : 10}
                    />
                </div>
                <div flex="75" style={{ textAlign: "right" }}>
                    {callMeDanger(`Viewing ${ start }-${ end } of ${ totalcount }<br />`)}
                    { totalpages !== 1 && (
                        <Pagination
                            defaultActivePage={pagenumber}
                            totalPages={totalpages}
                            onPageChange={this.handleClick}
                            ellipsisItem={null}
                            firstItem={pagenumber < 4 ? null : 
                                { content: <Icon name='angle double left' />, icon: true }
                            }
                            lastItem={totalpages - pagenumber < 4 ? null :
                                { content: <Icon name='angle double right' />, icon: true }
                            }
                            prevItem={
                                pagenumber == 1 ? null : { content: <Icon name='angle left' />, icon: true }
                            }
                            nextItem={
                                totalpages != pagenumber ? {
                                    content: <Icon name='angle right' />, icon: true
                                } : null
                            }
                        />
                    )}
                </div>
            </Flex>
        );
    }
}
const { object, func } = PropTypes;
Pager.propTypes = {
    pagination: object,
    onPageChange: func
};

export default Pager;
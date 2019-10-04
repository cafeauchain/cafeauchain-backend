import React, { useState } from "react";
import PropTypes from "prop-types";
import { Segment, Button } from "semantic-ui-react";

/* eslint-disable */
import Flex from "shared/flex";
import Input from "shared/input";

import { params as paramatize, paramString, underscorer, humanize } from "utilities";

import withContext from "contexts/withContext";
/* eslint-enable */

const buildOptions = arr => arr.map(item => ({ key: underscorer(item), value: underscorer(item), text: item }));

const Filters = ({ getData, shouldPage = false, type, selects, action = null }) => {

    let string = window.location.search;
    let params = paramatize(string);

    const init = selects.reduce((acc, item) => {
        acc[item.value] = params[item.value] || "";
        return acc;
    }, {});

    const [details, updateDetails] = useState( init );

    const updateStatus = (e, { value, name }) => {
        params[name] = value;
        if( shouldPage ) params.page = 1;
        const newParamString = paramString(params);

        let innerdetails = { ...details };
        if (innerdetails[name] != value) {
            innerdetails[name] = value;
            updateDetails(innerdetails);

            window.history.pushState(null, null, newParamString);
            getData(type, newParamString);
        }
    };

    const clearFilters = e => {
        e.preventDefault();
        const { target } = e;
        target.blur();

        let innerdetails = { ...details };
        for (const prop in innerdetails) {
            innerdetails[prop] = "";
            delete params[prop];
        }

        updateDetails(innerdetails);

        let { location: { href } } = window;

        let newParamString = paramString(params);
        let url = newParamString; 
        if( newParamString == ""){
            url = href.split("?")[0];
        }

        window.history.pushState(null, null, url);
        getData(type, newParamString);
    };

    return (
        <Segment>
            <Flex wrap spacing="10">
                {selects.map(item => {
                    return (
                        <div flex={item.flex || "25"} key={item.value} style={item.style}>
                            <Input
                                inputType="select"
                                onChange={updateStatus}
                                name={item.value}
                                label={item.name}
                                options={buildOptions(item.options)}
                                value={details[item.value] || ""}
                                search
                            />
                        </div>
                    );
                })}
            </Flex>
            <br />
            <Flex flexend>
                <div flex="auto" style={{ marginTop: "auto" }}>
                    <Button content="Reset Filters" onClick={clearFilters} size="small" />
                </div>
                {action}
            </Flex>
            <div style={{ marginBottom: 10 }} />
        </Segment>
    );
};
const { func, bool, string, array, node } = PropTypes;
Filters.propTypes = {
    getData: func,
    shouldPage: bool,
    type: string,
    selects: array,
    action: node
};

export default withContext(Filters);
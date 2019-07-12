import React, { Fragment } from "react";
import PropTypes from "prop-types";

const Titler = ({title, value, linebreak}) => {
    if( !value ) return null;
    return (
        <Fragment>
            {`${title}: ${value}`}
            {linebreak && <br />}
        </Fragment>
    );

};

const { string, bool } = PropTypes;
Titler.propTypes = {
    title: string,
    value: string,
    linebreak: bool
};

export default Titler;
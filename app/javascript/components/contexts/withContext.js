import React from "react";

/* eslint-disable */
import Context from "contexts/main";
/* eslint-enable */

function withContext(WrappedComponent) {
    const WithContext = props => <Context>{ctx => <WrappedComponent {...props} {...ctx} />}</Context>;
    return WithContext;
}

export default withContext;

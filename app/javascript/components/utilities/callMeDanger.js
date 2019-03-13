import React from "react";

// eslint-disable-next-line
const callMeDanger = (template, el = "span") =>
    React.createElement(el, { dangerouslySetInnerHTML: { __html: template } });

export default callMeDanger;

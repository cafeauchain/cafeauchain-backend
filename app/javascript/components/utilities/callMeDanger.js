import React from "react";

// eslint-disable-next-line
const CallMeDanger = (template, el = "span") =>
    React.createElement(el, { dangerouslySetInnerHTML: { __html: template } });

export default CallMeDanger;

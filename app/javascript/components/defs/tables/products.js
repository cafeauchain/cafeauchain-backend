import React from "react";
import PropTypes from "prop-types";
import { Image } from "semantic-ui-react";
import * as Showdown from "showdown";
/* eslint-disable */
import { Money, AsNumber, Truncate, ArrayToString } from "shared/textFormatters";
import { humanize, callMeDanger } from "utilities";
/* eslint-enable */

const Images = ({ content, ...rest }) => {
    return content.map(url => <Image size="mini" src={url} key={url} {...rest} inline />);
};

const ArrayHandler = ({ content = [] }) => {
    const modified = content.map(item => humanize(item));
    return modified.join(", ");
};

const LongText = props => {
    const converter = new Showdown.Converter();
    const { content } = props;
    return <div style={{ maxWidth: 400, minWidth: 400 }}>{callMeDanger(converter.makeHtml(content))}</div>;
};
const { string } = PropTypes;
LongText.propTypes = {
    content: string
};

const tableDefinition = {
    fields: [
        { name: "title", namespace: "attributes", style: { minWidth: 200 } },
        {
            name: "product_options",
            namespace: "attributes",
            formatter: ArrayHandler,
            label: "Product Options",
            style: { minWidth: 200 }
        },
        {
            name: "description",
            namespace: "attributes",
            formatter: LongText,
            style: { minWidth: 400 }
        },
        {
            name: "composition",
            namespace: "attributes",
            formatter: props =>
                ArrayToString({ ...props, keys: ["name", "pct"], output: array => array.join(": ") + "%" }),
            style: { minWidth: 200 }
        },
        {
            name: "product_image_urls",
            namespace: "attributes",
            formatter: Images,
            label: "Images",
            style: { minWidth: 200 }
        }
    ],
    props: {
        celled: true,
        striped: true,
        selectable: true,
        style: { minWidth: 1200 },
        verticalAlign: "top"
    }
};

export default tableDefinition;

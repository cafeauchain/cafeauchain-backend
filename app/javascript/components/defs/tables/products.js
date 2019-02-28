import React from "react";
import { Image } from "semantic-ui-react";
/* eslint-disable */
import { Money, AsNumber, Truncate, ArrayToString, LongText } from "shared/textFormatters";
/* eslint-enable */

const Images = ({ content, ...rest }) => {
    return content.map(url => <Image size="mini" src={url} key={url} {...rest} inline />);
};

const tableDefinition = {
    fields: [
        { name: "title", namespace: "attributes" },
        {
            name: "description",
            namespace: "attributes",
            formatter: props => Truncate({ ...props, style: { maxWidth: 400 } }),
            width: 6
        },
        {
            name: "composition",
            namespace: "attributes",
            formatter: props =>
                ArrayToString({ ...props, keys: ["name", "pct"], output: array => array.join(": ") + "%" })
        },
        {
            name: "product_image_urls",
            namespace: "attributes",
            formatter: Images,
            label: "Images"
        }
    ],
    props: {
        celled: true,
        striped: true,
        selectable: true,
        singleLine: true
    }
};

export default tableDefinition;

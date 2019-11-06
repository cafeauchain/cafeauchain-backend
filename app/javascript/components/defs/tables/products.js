import React from "react";
import { Image } from "semantic-ui-react";

/* eslint-disable */
import { Money, ArrayToString, Weights } from "shared/textFormatters";
import { humanize } from "utilities";

import Flex from "shared/flex";
/* eslint-enable */

const Images = ({ content, ...rest }) => {
    return content.map(url => (
        <Image size="tiny" src={url.url} key={url.url} {...rest} inline rounded style={{ margin: 4 }} />
    ));
};

const ArrayHandler = ({ content = [] }) => {
    const modified = content.map(item => humanize(item));
    return modified.join(", ");
};

const VariantHandler = props => {
    const { content } = props;
    const strings = content.map(item => {
        const hard_good = item.type === "hard_goods";
        return (
            <div key={item.id}>
                <Flex spacing="10" spacebetween>
                    <span>
                        {!hard_good && <Weights>{item.size}</Weights>}
                        {hard_good && item.size}
                    </span>
                    <Money type="positive">{item.price_in_dollars}</Money>
                </Flex>
            </div>
        );
    });
    return strings;
};

// eslint-disable-next-line react/prop-types
const Status = ({content}) => {
    let value = content ? humanize(content) : "";
    let className = content === "live" ? "positive-text" : "negative-text";
    return <span className={className}>{value}</span>;
};

const tableDefinition = {
    fields: [
        { name: "title", namespace: "attributes", style: { minWidth: 200 } },
        {
            name: "variants",
            namespace: "attributes",
            formatter: VariantHandler,
            label: "Sizes",
            style: { minWidth: 120 }
        },
        {
            name: "product_options",
            namespace: "attributes",
            formatter: ArrayHandler,
            label: "Product Options",
            style: { minWidth: 200 }
        },
        { name: "status", namespace: "attributes", formatter: Status },
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
            style: { minWidth: 200, whiteSpace: "nowrap" }
        }
    ],
    props: {
        celled: true,
        singleLine: false,
        style: { minWidth: 800 },
        verticalAlign: "top"
    }
};

export default tableDefinition;

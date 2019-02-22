/* eslint-disable */
import { Money, AsNumber } from "shared/textFormatters";
/* eslint-enable */

const tableDefinition = {
    fields: [{ name: "title", namespace: "attributes" }, { name: "description", namespace: "attributes" }],
    props: {
        celled: true,
        striped: true,
        selectable: true,
        singleLine: true
    }
};

export default tableDefinition;

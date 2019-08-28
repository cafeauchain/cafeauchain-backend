import { PureComponent } from "react";
import PropTypes from "prop-types";
import moment from "moment";
/* eslint-disable */
import { AsNumber } from "shared/textFormatters";
/* eslint-enable */

class FormattedDate extends PureComponent {
    render() {
        const { content } = this.props;
        return moment(content).format("MMM D");
    }
}
const { object, number, string, oneOfType } = PropTypes;
FormattedDate.propTypes = {
    content: oneOfType([object, number, string])
};

const tableDefinition = {
    fields: [
        { name: "inventory_item_name", namespace: "attributes", label: "Roast Profile" },
        { name: "lot_name", namespace: "attributes" },
        { 
            name: "starting_amount", 
            namespace: "attributes", 
            formatter: AsNumber, 
            label: "Green (lbs)", 
            textAlign: "right"
        },
        { name: "roast_count", namespace: "attributes", label: "# of Roasts", formatter: AsNumber, textAlign: "right" },
        { name: "roast_date", namespace: "attributes", formatter: FormattedDate }
    ],
    props: {
        celled: true
    }
};

export default tableDefinition;

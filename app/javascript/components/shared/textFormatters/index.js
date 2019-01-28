import Money from "./money";
import Truncate from "./truncate";

// To pass props to the formatter, the field def should looks something like this:
//        { name: "id", width: 2, formatter: props => Money({ ...props, type: "negative" }) }

export { Money, Truncate };

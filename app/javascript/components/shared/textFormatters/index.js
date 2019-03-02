import ArrayToString from "./arrays";
import Money from "./money";
import Truncate from "./truncate";
import AsNumber from "./number";
import Time from "./time";
import AsImage from "./image";
import Weights from "./weights";
import LongText from "./longText";
// To pass props to the formatter, the field def should looks something like this:
//        { name: "id", width: 2, formatter: props => Money({ ...props, type: "negative" }) }

export { Money, Truncate, AsNumber, Time, AsImage, Weights, ArrayToString, LongText };

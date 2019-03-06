import React, { Component } from "react";
import PropTypes from "prop-types";

class Flex extends Component {
    transformBoolsToStrings = rest =>
        Object.keys(rest).reduce(
            (obj, key) => {
                if (rest[key] === true) {
                    obj.bools = [...obj.bools, "flex-parent__" + key.toLowerCase()];
                } else if (rest[key] !== false) {
                    obj.props = [...obj.props, { [key]: rest[key] }];
                }
                return obj;
            },
            { bools: [], props: [] }
        );
    flexChildren = (children, spacing) => {
        return React.Children.map(children, child => {
            const { className: kidClasses = "", flex, ...rest } = child.props;
            let flexString = "";
            if (flex) flexString = " flex-child__" + flex;
            if (spacing) rest.style = { ...rest.style, padding: "2px " + spacing + "px" };
            let newKid = React.cloneElement(child, { ...rest, className: kidClasses + flexString });
            return newKid;
        });
    };
    buildFlexClasses = (className = "", bools) => {
        let classes = "flex-parent";
        if (bools.length) classes = bools.join(" ");
        classes += " " + className;
        return classes;
    };
    render() {
        const { className, children, as = "div", spacing, ...rest } = this.props;
        const filterProps = this.transformBoolsToStrings(rest);
        const classes = this.buildFlexClasses(className, filterProps.bools);
        if (spacing) filterProps.props.style = { ...filterProps.props.style, margin: `0 -${spacing}px` };
        const modified = this.flexChildren(children, spacing);
        return React.createElement(as, { ...filterProps.props, className: classes }, [modified]);
    }
}

const { string, node, bool, object, oneOfType, number } = PropTypes;
Flex.propTypes = {
    className: string,
    children: node,
    as: string,
    style: object,
    column: bool,
    wrap: bool,
    centerboth: bool,
    centermain: bool,
    centercross: bool,
    spacebetween: bool,
    spacearound: bool,
    flexend: bool,
    spacing: oneOfType([string, number])
};

export default Flex;

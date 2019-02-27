import React, { Component } from "react";
import PropTypes from "prop-types";

class Flex extends Component {
    transformBoolsToStrings = () => {
        const { ...rest } = this.props;
        return Object.keys(rest).reduce((arr, key) => {
            if (rest[key] === true) {
                arr = [...arr, "flex-parent__" + key.toLowerCase()];
            }
            return arr;
        }, []);
    };
    flexChildren = (children, spacing) => {
        return React.Children.map(children, child => {
            const { className: kidClasses = "", flex, ...rest } = child.props;
            let flexString = "";
            if (flex) flexString = " flex-child__" + flex;
            if (spacing) rest.style = { ...rest.style, padding: spacing + "px" };
            let newKid = React.cloneElement(child, { ...rest, className: kidClasses + flexString });
            return newKid;
        });
    };
    buildFlexClasses = (className = "") => {
        let classes = "flex-parent";
        let extras = this.transformBoolsToStrings();
        if (extras.length) classes = extras.join(" ");
        classes += " " + className;
        return classes;
    };
    render() {
        const { className, children, as = "div", spacing, ...rest } = this.props;
        let classes = this.buildFlexClasses(className);
        if (spacing) rest.style = { ...rest.style, margin: `0 -${spacing}px` };
        let modified = this.flexChildren(children, spacing);
        return React.createElement(as, { ...rest, className: classes }, [modified]);
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

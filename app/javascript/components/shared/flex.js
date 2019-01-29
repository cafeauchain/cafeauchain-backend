import React, { Component } from "react";
import PropTypes from "prop-types";

class Flex extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {};
    }
    transformBoolsToStrings = () => {
        const { ...rest } = this.props;
        return Object.keys(rest).reduce((arr, key) => {
            if (rest[key] === true) {
                arr = [...arr, "flex-parent__" + key.toLowerCase()];
            }
            return arr;
        }, []);
    };
    flexChildren = children => {
        return React.Children.map(children, child => {
            const { className: kidClasses, flex, ...rest } = child.props;
            let flexString = "";
            if (flex) {
                flexString = " flex-child__" + flex;
            }
            let newKid = React.cloneElement(child, { ...rest, className: kidClasses + flexString });
            return newKid;
        });
    };
    buildFlexClasses = className => {
        let classes = "flex-parent";
        let extras = this.transformBoolsToStrings();
        if (extras.length) {
            classes = extras.join(" ");
        }
        classes += " " + className;
        return classes;
    };
    render() {
        const { className, children, as = "div" } = this.props;
        let classes = this.buildFlexClasses(className);
        let modified = this.flexChildren(children);
        return React.createElement(as, { className: classes }, [modified]);
    }
}

const { string, node, bool } = PropTypes;
Flex.propTypes = {
    className: string,
    children: node,
    as: string,
    column: bool,
    wrap: bool,
    centerboth: bool,
    centermain: bool,
    centercross: bool,
    spacebetween: bool,
    spacearound: bool,
    flexend: bool
};

export default Flex;

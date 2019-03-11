import React from "react";
import PropTypes from "prop-types";

class DynamicLoader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            module: null
        };
    }

    async componentDidMount() {
        const { resolve } = this.props;
        const { default: module } = await resolve();
        this.setState({ module });
    }

    render() {
        const { module } = this.state;
        const { resolve, ...rest } = this.props;

        if (!module) return null;
        if (module) return React.createElement(module, { ...rest });
    }
}

DynamicLoader.propTypes = {
    resolve: PropTypes.func
};

export default DynamicLoader;

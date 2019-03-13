// TODO Walking away from this for now. Will revisit
// In order to get this working correctly, I need to be able to prevent initial component requests

// This is how I want to handle dashboards
// export default withInitialRequests(Wrapper, {
//     requests: ["transactions", "batches", { name: "activity" }, "inventory", "lots", "log", "producers"]
// });

import React from "react";

/* eslint-disable */
import Context from "contexts/main";
/* eslint-enable */

function withInitialRequests(WrappedComponent, hocProps) {
    class WithInitialRequests extends React.Component {
        componentDidMount() {
            const { requests } = hocProps;
            const { updateContext, getData: getCtxData } = this.context;
            const ssrProps = Object.keys(this.props);
            const datasets = hocProps.requests.reduce((obj, request) => {
                if (typeof request === "string") {
                    return { ...obj, [request]: [] };
                }
                return { ...obj, [request.name]: {} };
            }, {});

            updateContext({ ...datasets });

            requests.forEach(request => {
                const name = request.name || request;
                if (!ssrProps.includes(name)) {
                    getCtxData(name);
                }
            });
        }

        render() {
            const { updateContext, getData: getCtxData } = this.context;
            return (
                <WrappedComponent
                    {...this.props}
                    {...this.state}
                    updateContext={updateContext}
                    getCtxData={getCtxData}
                />
            );
        }
    }
    WithInitialRequests.contextType = Context;

    return WithInitialRequests;
}

export default withInitialRequests;

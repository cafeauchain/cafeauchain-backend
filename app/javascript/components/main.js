import React from "react";
import PropTypes from "prop-types";

/* eslint-disable */
import HeaderNav from "navigation/header";
import AdminNav from "navigation/adminNav";
import Context from "contexts/main";
import Provider from "contexts/index";
import NavPortal from "navPortal";
import DynamicLoader from "loader";
/* eslint-enable */

const Main = ({ component, ...rest }) => (
    <Provider roaster={rest.roaster} requests={[]}>
        <DynamicLoader resolve={() => import("./" + component)} {...rest} />
        <Context>
            {ctx => (
                <React.Fragment>
                    {rest.roaster && !rest.static && (
                        <NavPortal mountNode="main-nav">
                            <AdminNav roaster={rest.roaster} {...ctx} />
                        </NavPortal>
                    )}
                    <NavPortal mountNode="header-nav">
                        <HeaderNav {...ctx} />
                    </NavPortal>
                </React.Fragment>
            )}
        </Context>
    </Provider>
);

Main.propTypes = {
    component: PropTypes.string
};

export default Main;

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
    <React.Fragment>
        {!rest.roaster && (
            <React.Fragment>
                <DynamicLoader resolve={() => import("./" + component)} {...rest} />
                <NavPortal mountNode="header-nav">
                    <HeaderNav />
                </NavPortal>
            </React.Fragment>
        )}
        {rest.roaster && (
            <Provider roaster={rest.roaster} requests={[]} data={{ ...rest }}>
                <DynamicLoader resolve={() => import("./" + component)} {...rest} />
                <Context>
                    {ctx => (
                        <React.Fragment>
                            {!ctx.static && !ctx.cart && (
                                <NavPortal mountNode="main-nav">
                                    <AdminNav {...ctx} />
                                </NavPortal>
                            )}
                            <NavPortal mountNode="header-nav">
                                <HeaderNav {...ctx} />
                            </NavPortal>
                        </React.Fragment>
                    )}
                </Context>
            </Provider>
        )}
    </React.Fragment>
);

Main.propTypes = {
    component: PropTypes.string
};

export default Main;

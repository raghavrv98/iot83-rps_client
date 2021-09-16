/**
 *
 * SideNav
 *
 */

import React from "react";
import { Link } from 'react-router-dom';
import { FormattedMessage } from "react-intl";
import LocaleToogle from '../../containers/LocaleToggle/Loadable'
import { logoutHandler } from '../../utils/commonUtils'
import messages from "./messages";
import commonMessages from '../../messages';


/* eslint-disable react/prefer-stateless-function */
class SideNav extends React.Component {

    state = {
        imageUrl: '../../assets/images/nVent-icon.png',
        navItems: [],
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.navItems && nextProps.navItems !== this.props.navItems) {
            let activePage = {};
            nextProps.navItems.map((val, index) => {
                activePage[val.navName] = []
                if (index === 0) {
                    activePage[val.navName].push("/");
                }
                val.subMenus.length > 0 ?
                    val.subMenus.map(valSub => { activePage[val.navName].push("/" + valSub.url); }) :
                    activePage[val.navName].push("/" + val.url)
            })
            this.setState({
                navItems: nextProps.navItems,
                activePage,
            })
        }
    }

    render() {
        return (
            <header className="appHeader">
                <nav className="navbar navbar-expand-lg">
                    <a className="navbar-brand">
                        <img
                            src={`${window.API_URL}api/public/static/logo/pmmp.jpeg`}
                            onError={(e) => { e.target.onerror = null; e.target.src = require('../../assets/images/nVent-icon.png') }}
                        />
                    </a>
                    <button className="navbar-toggler text-light" type="button" data-toggle="collapse" data-target="#navBarMob" aria-controls="navBarMob" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fas fa-bars"></i>
                    </button>
                    <div className="collapse navbar-collapse navbar-mob animated fadeInDown" id="navBarMob">
                        <ul className="navbar-nav">
                            {this.state.navItems.map(nav => (
                                nav.subMenus.length > 0 ?
                                    <li key={nav.navName} className={`nav-item dropdown nav-subItem ${this.state.activePage[nav.navName].includes(window.location.pathname) ? "active" : ""}`}>
                                        <a className="nav-link">
                                            {nav.navName}
                                            <i className="fal fa-angle-down" />
                                        </a>
                                        <ul className="dropdown-menu animated fadeInDown">
                                            {nav.subMenus.map(navSub => (<li className="dropdown-item" key={navSub.url}>
                                                <Link to={"/" + navSub.url} target={navSub.newTab ? "_blank" : ""}>
                                                    {navSub.navName}
                                                </Link>
                                            </li>))}
                                        </ul>
                                    </li>
                                    :
                                    <li key={nav.url} className={`nav-item ${this.state.activePage[nav.navName].includes(window.location.pathname) ? "active" : ""}`}>
                                        <Link to={"/" + nav.url} className="nav-link" target={nav.newTab ? "_blank" : ""}>
                                            {nav.navName}
                                        </Link>
                                    </li>
                            ))}
                        </ul>
                    </div>
                </nav>
                {this.props.verified === "true" ?
                    <ul className="appInfo">
                        <li className="userInfo userInfo-lg">
                            <p><FormattedMessage {...messages.welcome} children={(message => message)} /><strong>{this.props.username ? this.props.username : "Admin"}</strong></p>
                            <h6>( {this.props.role} )</h6>
                        </li>
                        <li>
                            {/* <LocaleToogle /> */}
                            <div className="LanguageSelected">
                                <span>EN</span>
                            </div>
                        </li>
                        <li className="options">
                            <div className="dropdown">
                                <button className="btn dropdown-toggle" data-toggle="dropdown">
                                    <i className="fal fa-cogs text-white"></i>
                                </button>
                                <div className="dropdown-menu animated rotateInUpRight">
                                    <div className="dropdown-item userInfo userInfo-md">
                                        <p><FormattedMessage {...messages.welcome} children={(message => message)} /> <strong>{this.props.username ? this.props.username : "Admin"}</strong></p>
                                        <h6>( {this.props.role} )</h6>
                                    </div>
                                    <div className="dropdown-item" id="changePassword" onClick={() => { this.props.history.push('/changePassword') }}><FormattedMessage {...messages.changePassword} children={(message => message)} /></div>
                                    <div className="dropdown-item" id="settings" onClick={() => { this.props.history.push('/settings') }}><FormattedMessage {...commonMessages.settings} children={(message => message)} /></div>
                                    {this.props.tenant ? (<div className="dropdown-item" id="workingSkeletonDemo" onClick={() => { this.props.history.push('/managePasswordRequest') }}><FormattedMessage {...messages.managePasswordRequest} children={(message => message)} /></div>) : null}
                                    <div className="dropdown-item" onClick={() => logoutHandler()}><FormattedMessage {...messages.logout} children={(message => message)} /></div>
                                </div>
                            </div>
                        </li>
                    </ul> :
                    <ul className="appInfo">
                        <li className="userInfo pd-r-20">
                            <p><FormattedMessage {...messages.welcome} children={(message => message)} /> <strong>{this.props.username ? this.props.username : "Admin"}</strong></p>
                            <h6>( {this.props.role} )</h6>
                        </li>
                    </ul>
                }
            </header>
        );
    }
}

SideNav.propTypes = {};

export default SideNav;

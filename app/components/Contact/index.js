/**
 *
 * Contact
 *
 */

import React from "react";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from "react-intl";
import messages from "./messages";
import commonMessages from "../../messages";
import './assets/css/contact.css';


/* eslint-disable react/prefer-stateless-function */
class Contact extends React.Component {
  render() {
    return (
      <div>

<div className="outerContainer">
        <div className="header">
            <div className="bgLayout">
                <div className="text-center headerText">
                    <h4 className=" display-4">
                        <span><FormattedMessage {...messages.howCanWeHelp} children={(message => message)} /></span>
                    </h4>
                </div>
            </div>
        </div>

        <div className="container">
            <div className="contactInstruction">
                <ul className="row">
                    <li className="col">
                        <p><b>North America</b></p>
                        <p>Tel+1.800.545.6258</p>
                        <p>Fax+1.800.527.5703</p>
                        <p>Thermal.techsupport@nVent.com</p>
                    </li>
                    <li className="col">
                        <p><b>Asia Paciﬁc</b></p>
                        <p>Tel+86.21.2412.1688</p>
                        <p>Fax+86.21.5426.3167</p>
                        <p>PTM_CS_CN@nVent.com</p>
                    </li>
                </ul>
                <ul className="row">
                    <li className="col">
                        <p><b>Europe, Middle East, Africa</b></p>
                        <p>Tel+32.16.213.502</p>
                        <p>Fax+32.16.213.604</p>
                        <p>PTME-TechSupport@nVent.com</p>
                    </li>
                    <li className="col">
                        <p><b>Latin America</b></p>
                        <p>Tel+1.800.545.6258</p>
                        <p>Fax+1.800.527.5703</p>
                        <p>Thermal.techsupport@nVent.com</p>
                    </li>
                </ul>
            </div>
        </div>
        
        <div className="detailBlock contentBox">
            <div className="flex container">
                <div className="fx-b25 pd-r-40">
                    <p>Our powerful portfolio of brands:</p>
                    <p><span className="brand">CADDY</span>  <span className="brand">ERICO</span>  <span className="brand">HOFFMAN</span>  <span className="brand">RAYCHEM</span>  <span className="brand">SCHROFF</span> <span className="brand">TRACER</span> </p>
                </div>
            </div>
        </div>

        <div className="footer">
            <div className="container flex justify-content-between">
                <p>&copy; 2019 Software V - ---</p>
                <ul>
                    <li><a href="#"><FormattedMessage {...commonMessages.about} children={(message => message)} /></a></li>
                    <li><a href="#"><FormattedMessage {...commonMessages.contact} children={(message => message)} /></a></li>
                    <li><a href="#"><FormattedMessage {...commonMessages.license} children={(message => message)} /></a></li>
                </ul>
            </div>
        </div>

    </div>

      </div>
    );
  }
}

Contact.propTypes = {};

export default Contact;

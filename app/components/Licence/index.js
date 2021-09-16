/**
 *
 * Licence
 *
 */

import React from "react";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from "react-intl";
import messages from "./messages";
import commonMessages from "../../messages";
import './assets/css/licence.css';

/* eslint-disable react/prefer-stateless-function */
class Licence extends React.Component {
    render() {
        return (
            <div>
                <div className="outerBlock">
                    <div className="container">
                        <h2 className="softwareHeader">List of Open Source Software: </h2>
                        <p>RPS contains the open source software as listed below (this list may be updated from time to time) :</p>
                            <ol>
                            <li>Eclipse 2.0: <a href="https://www.eclipse.org/legal/epl-2.0/">https://www.eclipse.org/legal/epl-2.0/</a></li>
                            <li>Eclipse 1.0: <a href="https://www.eclipse.org/legal/epl-v10.html">https://www.eclipse.org/legal/epl-v10.html</a></li>
                            <li>GPL 2.0 : <a href="https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html">https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html</a></li>
                            <li>LGPL 2.1 : <a href="https://www.gnu.org/licenses/old-licenses/lgpl-2.1.en.html">https://www.gnu.org/licenses/old-licenses/lgpl-2.1.en.html</a></li>
                            <li>Mozzila 1.1 : <a href="https://www.mozilla.org/en-US/MPL/1.1/">https://www.mozilla.org/en-US/MPL/1.1/</a></li>
                            <li>Apache 2.0: <a href="https://www.apache.org/licenses/LICENSE-2.0">https://www.apache.org/licenses/LICENSE-2.0</a></li>
                            <li>BSD 3: <a href="https://opensource.org/licenses/BSD-3-Clause">"https://opensource.org/licenses/BSD-3-Clause"</a></li>
                            <li>MIT: <a href="https://opensource.org/licenses/MIT">https://opensource.org/licenses/MIT</a></li>
                            <li>Bouncy Castle: <a href="https://www.bouncycastle.org/license.html">https://www.bouncycastle.org/license.html</a></li>
                            <li>BSD 2: <a href="https://opensource.org/licenses/BSD-2-Clause">https://opensource.org/licenses/BSD-2-Clause</a></li>
                            <li>CCO: <a href="https://creativecommons.org/publicdomain/zero/1.0/">https://creativecommons.org/publicdomain/zero/1.0/</a></li>
                            <li>JSON: <a href="https://www.json.org/license.html">https://www.json.org/license.html</a></li>

                        </ol>
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

Licence.propTypes = {};

export default Licence;

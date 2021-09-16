/**
 *
 * HelpPage
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { FormattedMessage } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'

import injectSaga from 'utils/injectSaga'
import injectReducer from 'utils/injectReducer'
import makeSelectHelpPage from './selectors'
import reducer from './reducer'
import saga from './saga'
import messages from './messages'
import $ from 'jquery'

export class HelpPage extends React.Component {
  componentDidMount () {
    $(document).ready(function () {
      $('.scroll').click(function () {
        $('html').animate({
          scrollTop: eval($('#' + $(this).attr('target')).offset().top - 180)
        }, 800)
      })
    })
  }

  render () {
    return (
        <div className="appContent">
        <Helmet>
          <title>HelpPage</title>
          <meta name="description" content="Description of HelpPage" />
        </Helmet>
        <div className="pageBreadcrumb">
          <div className="flex-item fx-b70">
            <h5>
              <FormattedMessage {...messages.helpTitle} children={(message => message)} />
            </h5>
          </div>
          <div className="flex-item fx-b30" />
        </div>

        <div className="flex">
          {/* nav tabs start  */}
          <div className="fx-b25 pd-r-20">
            <ul className="nav nav-tabs custom-tab" role="tablist">
              <li className="nav-item">
                <a className="active" data-toggle="tab" href="#algorithmDescriptionTab">
                  <div className="help-card">
                    <h6>
                      <span><i className="fas fa-laptop"></i></span>
                      <FormattedMessage {...messages.algorithmDescription} children={(message => message)} />
                    </h6>
                    <p><FormattedMessage {...messages.algorithmDescriptionParagraph} children={(message => message)} /></p>
                  </div>
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#howToConfigureTab">
                  <div className="help-card">
                    <h6>
                      <span><i className="fas fa-cog"></i></span>
                      <FormattedMessage {...messages.organizationOfYourPipelineAssets} children={(message => message)} />
                    </h6>
                    <p><FormattedMessage {...messages.organizationTopParagraph} children={(message => message)} /></p>
                      <ul>
                        <li>
                          <FormattedMessage {...messages.byPlant} children={(message => message)} />
                        </li>
                        <li>
                          <FormattedMessage {...messages.byPipeline} children={(message => message)} />
                        </li>
                        <li>
                          <FormattedMessage {...messages.byHeaterCircuit} children={(message => message)} />
                        </li>
                        <li>
                          <FormattedMessage {...messages.byOperatorShift} children={(message => message)} />
                        </li>
                      </ul>
                    <p><FormattedMessage {...messages.organizationBottomParagraph} children={(message => message)} /></p>
                  </div>
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#generalConfigurationTab">
                  <div className="help-card">
                    <h6>
                      <span><i className="fas fa-user-cog"></i></span>
                      <FormattedMessage {...messages.generalParameterConfiguration} children={(message => message)} />
                    </h6>
                    <p><FormattedMessage {...messages.parameterConfigurationTopParagraph} children={(message => message)} /></p>
                    <ul>
                      <li>
                        <FormattedMessage {...messages.englishSiUnits} children={(message => message)} />
                      </li>
                      <li>
                        <FormattedMessage {...messages.temperatureCelsiusFahrenheit} children={(message => message)} />
                      </li>
                      <li>
                        <FormattedMessage {...messages.timeMilitaryClock} children={(message => message)} />
                      </li>
                      <li>
                        <FormattedMessage {...messages.userLogonGroups} children={(message => message)} />
                      </li>
                       <li>
                        <FormattedMessage {...messages.individualUserPermissionSettings} children={(message => message)} />
                      </li>
                      <li>
                        <FormattedMessage {...messages.languageEnglishIsDefault} children={(message => message)} />
                      </li>
                      <li>
                        <FormattedMessage {...messages.alarmSettings} children={(message => message)} />
                      </li>
                      <li>
                        <FormattedMessage {...messages.alarmAggregationRules} children={(message => message)} />
                      </li>
                      <li>
                        <FormattedMessage {...messages.overallHealthAlarm} children={(message => message)} />
                      </li>
                      <li>
                        <FormattedMessage {...messages.freezePointAndTimeToFreezeThreshold} children={(message => message)} />
                      </li>
                    </ul>
                    <p><FormattedMessage {...messages.parameterConfigurationBottomParagraph} children={(message => message)} /></p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
          {/* nav tab ends  */}

          {/* tab panes start  */}
          <div className="fx-b75">
            <div className="tab-content">
              <div className="tab-pane active" id="algorithmDescriptionTab">
                <div className="help-page">
                  <div className="stickyHeader">
                    <h6 className="sectionTitle">
                      <a target="pipeLinehealth">
                        <i className="fas fa-laptop"></i>
                      </a>
                      <FormattedMessage {...messages.algorithmDescription} children={(message => message)} />
                    </h6>
                  </div>

                  <div className="flex">
                    <div className="fx-b20 pd-r-10">
                      <div className="indexSection">
                        <ul className="content-list">
                          <li>
                            <a target="alarmAggregation" className="nav-link custom-link scroll">
                              <i className="fas fa-link"></i>
                              <FormattedMessage {...messages.alarmAggregation} children={(message => message)} />
                            </a>
                          </li>
                          <li className="listStyleNone">
                            <a target="pipeLinehealth" className="nav-link custom-link scroll">
                              <i className="fas fa-link"></i>
                              <FormattedMessage {...messages.overallPipelineHealth} children={(message => message)} />
                            </a>
                          </li>
                          <li className="listStyleNone">
                            <a target="progressionOfPipelineState" className="nav-link custom-link scroll">
                              <i className="fas fa-link"></i>
                              <FormattedMessage {...messages.progressionOfPipelineState} children={(message => message)} />
                            </a>
                            <ul className="sub-content-list">
                              <li>
                                <a target="hotspot" className="nav-link content-item scroll">
                                  <i className="fas fa-link"></i>
                                  <FormattedMessage {...messages.hotSpot} children={(message => message)} />
                                </a>
                              </li>
                              <li>
                                <a target="coldspot" className="nav-link content-item scroll">
                                  <i className="fas fa-link"></i>
                                  <FormattedMessage {...messages.coldSpot} children={(message => message)} />
                                </a>
                              </li>
                              <li>
                                <a target="timetofreeze" className="nav-link content-item scroll">
                                  <i className="fas fa-link"></i>
                                  <FormattedMessage {...messages.timeToFreeze} children={(message => message)} />
                                </a>
                              </li>
                              <li>
                                <a target="freezingimminent" className="nav-link content-item scroll">
                                  <i className="fas fa-link"></i>
                                  <FormattedMessage {...messages.freezingImminent} children={(message => message)} />
                                </a>
                              </li>
                              <li>
                                <a target="freezingdetected" className="nav-link content-item scroll">
                                  <i className="fas fa-link"></i>
                                  <FormattedMessage {...messages.freezingDetected} children={(message => message)} />
                                </a>
                              </li>
                              <li>
                                <a target="frozen" className="nav-link content-item scroll">
                                  <i className="fas fa-link"></i>
                                  <FormattedMessage {...messages.frozen} children={(message => message)} />
                                </a>
                              </li>
                              <li>
                                <a target="plug" className="nav-link content-item scroll">
                                  <i className="fas fa-link"></i>
                                  <FormattedMessage {...messages.plug} children={(message => message)} />
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <FormattedMessage {...messages.insulationHeater} children={(message => message)} />
                            <ul className="sub-content-list">
                              <li>
                                <a target="heattransfer" className="nav-link content-item scroll">
                                  <i className="fas fa-link"></i>
                                  <FormattedMessage {...messages.heatTransferCoefficient} children={(message => message)} />
                                </a>
                              </li>
                              <li>
                                <a target="thermalmass" className="nav-link content-item scroll">
                                  <i className="fas fa-link"></i>
                                  <FormattedMessage {...messages.thermalMass} children={(message => message)} />
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <FormattedMessage {...messages.heaterHealth} children={(message => message)} />
                            <ul className="sub-content-list">
                              <li>
                                <a target="impedance" className="nav-link content-item scroll">
                                  <i className="fas fa-link"></i>
                                  <FormattedMessage {...messages.impedance} children={(message => message)} />
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <FormattedMessage {...messages.allOtherAlarms} children={(message => message)} />
                            <ul className="sub-content-list">
                              <li>
                                <a target="rupture" className="nav-link content-item scroll">
                                  <i className="fas fa-link"></i>
                                  <FormattedMessage {...messages.rupture} children={(message => message)} />
                                </a>
                              </li>
                              <li>
                                <a target="meltuniformity" className="nav-link content-item scroll">
                                  <i className="fas fa-link"></i>
                                  <FormattedMessage {...messages.meltUniformity} children={(message => message)} />
                                </a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="fx-b80 pd-l-20">
                      <div className="section-content">
                        <div id="alarmAggregation">
                          <h6>
                            <span><i className="fas fa-caret-right"></i></span>
                            <FormattedMessage {...messages.alarmAggregation} children={(message => message)} />
                          </h6>
                          <div className="sectionContent">
                            <p>When pipe adjacent to an existing alarm also enters the same alarm condition, its alarm is merged with
                              the existing alarm, in order to reduce the total number of alarms that may be generated in certain conditions.
                              </p>
                          </div>
                        </div>

                        <div id="pipeLinehealth">
                          <h6>
                            <span><i className="fas fa-caret-right"></i></span>
                            <FormattedMessage {...messages.overallPipelineHealth} children={(message => message)} />
                          </h6>
                          <div className="sectionContent">
                            <p><strong>DESCRIPTION</strong> The Pipeline Risk Gauge is a composite indication of the current overall risk of the
pipeline. This gauge takes into account all of the alarms present along the pipeline, applying weighting
factors for each different type of alarm, the number of alarms of each type, and the magnitude of the
alarm condition for each alarm.</p>
                            <p>The Risk Gauge algorithm uses a point system to determine overall risk. The points are then
mapped onto risk scale from low to high, where high risk means the pipeline has substantial issues that
are affecting its functionality or safety.</p>
                            <p>The ranges in the Risk Gauge are:</p>
                            <ul>
                                  <li>LOW (green) – Your pipeline is mostly healthy</li>
                                  <li>MEDIUM (yellow) - Your pipeline needs attention</li>
                                  <li>HIGH (red) – Your pipeline is at some risk</li>
                                </ul>
                            <p>The scale is configurable by someone with the Commissioner role to adjust weightings per
                              your operating philosophy. See the example below.</p>
                            <table className="table customHTMLTable helpTable">
                              <thead>
                                <tr>
                                  <th width="20%" rowSpan="2">Scenario</th>
                                  <th width="20%" rowSpan="2">Locations</th>
                                  <th width="24%" rowSpan="2">Measured/Calculated value</th>
                                  <th width="36%" colSpan="3">Risk Gauge</th>
                                </tr>
                                <tr>
                                  <th width="12%">Low</th>
                                  <th width="12%">Medium</th>
                                  <th width="12%">High</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>hotspot</td>
                                  <td>5</td>
                                  <td>165C</td>
                                  <td colSpan="3">
                                    <ul className="riskBar">
                                      <li className="bar"></li>
                                      <li className="bar"></li>
                                      <li className="bar"></li>
                                      <li className="current l-20"></li>
                                    </ul>
                                  </td>
                                </tr>
                                <tr>
                                  <td>coldspot</td>
                                  <td>10</td>
                                  <td>118C</td>
                                  <td colSpan="3">
                                    <ul className="riskBar">
                                      <li className="bar"></li>
                                      <li className="bar"></li>
                                      <li className="bar"></li>
                                      <li className="current l-5"></li>
                                    </ul>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Insulation Health</td>
                                  <td>3</td>
                                  <td>0.6W/(m*C)</td>
                                  <td colSpan="3">
                                    <ul className="riskBar">
                                      <li className="bar"></li>
                                      <li className="bar"></li>
                                      <li className="bar"></li>
                                      <li className="current l-5"></li>
                                    </ul>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Freeze Detection</td>
                                  <td>1</td>
                                  <td></td>
                                  <td colSpan="3">
                                    <ul className="riskBar">
                                      <li className="bar"></li>
                                      <li className="bar"></li>
                                      <li className="bar"></li>
                                      <li className="current l-5"></li>
                                    </ul>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Plug Detection</td>
                                  <td>2</td>
                                  <td></td>
                                  <td colSpan="3">
                                    <ul className="riskBar">
                                      <li className="bar"></li>
                                      <li className="bar"></li>
                                      <li className="bar"></li>
                                      <li className="current l-40"></li>
                                    </ul>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Melt uniformity</td>
                                  <td></td>
                                  <td>5C</td>
                                  <td colSpan="3">
                                    <ul className="riskBar">
                                      <li className="bar"></li>
                                      <li className="bar"></li>
                                      <li className="bar"></li>
                                      <li className="current l-30"></li>
                                    </ul>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Time to Freeze</td>
                                  <td>10</td>
                                  <td>7h</td>
                                  <td colSpan="3">
                                    <ul className="riskBar">
                                      <li className="bar"></li>
                                      <li className="bar"></li>
                                      <li className="bar"></li>
                                      <li className="current l-50"></li>
                                    </ul>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Heater Health</td>
                                  <td>1500</td>
                                  <td>90%</td>
                                  <td colSpan="3">
                                    <ul className="riskBar">
                                      <li className="bar"></li>
                                      <li className="bar"></li>
                                      <li className="bar"></li>
                                      <li className="current l-50"></li>
                                    </ul>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Fiber Health</td>
                                  <td>50</td>
                                  <td>1%</td>
                                  <td colSpan="3">
                                    <ul className="riskBar">
                                      <li className="bar"></li>
                                      <li className="bar"></li>
                                      <li className="bar"></li>
                                      <li className="current l-5"></li>
                                    </ul>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Anchor Health</td>
                                  <td>1</td>
                                  <td></td>
                                  <td colSpan="3">
                                    <ul className="riskBar">
                                      <li className="bar"></li>
                                      <li className="bar"></li>
                                      <li className="bar"></li>
                                      <li className="current l-50"></li>
                                    </ul>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Rupture detection</td>
                                  <td>1</td>
                                  <td></td>
                                  <td colSpan="3">
                                    <ul className="riskBar">
                                      <li className="bar"></li>
                                      <li className="bar"></li>
                                      <li className="bar"></li>
                                      <li className="current l-95"></li>
                                    </ul>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div id="progressionOfPipelineState">
                          <h6>
                            <span><i className="fas fa-caret-right"></i></span>
                            <FormattedMessage {...messages.progressionOfPipelineState} children={(message => message)} />
                          </h6>
                          <div className="sectionContent">
                            <p>
                              Over time, the state of the pipeline will change in response to flow, ambient conditions, heater performance and thermal insulation health. As the state changes, various alarm conditions may occur. Raychem Pipeline Supervisor provides detection of the following conditions:
                            </p>
                          </div>
                          <div className="sub-section-content">

                            <div id="hotspot">
                              <h6>
                                <span><i className="fas fa-dot-circle"></i></span>
                                <FormattedMessage {...messages.hotSpot} children={(message => message)} />
                              </h6>
                              <div className="sectionContent">
                                <p>
                                  <strong>DESCRIPTION</strong>Raychem Pipeline Supervisor continuously monitors the temperature measured by the
                                  DTS system for every meter, checking for temperatures that are outside of the alarm threshold limits
                                  that have been set for the pipeline. When the temperature at any location rises above the [Hot HH LL
                                  Limit] threshold, a “hotspot” alarm is triggered.
                                </p>

                                <p>
                                  Alarms are indicated on the Pipeline Detail View as Warning icon<img className="helpAlarmTypeIcon" src={require('../../assets/images/warningRaised.png')} />. Cold spot alarms are
                                  subject to [<a className="link scroll" target="alarmAggregation" >Alarm Aggregation</a>], and as such an alarm indicator may not be shown for each meter of pipe
                                  in alarm.
                                </p>
                                <p><strong>POSSIBLE CAUSES</strong>Hot spots may occur for a variety of reasons. Some of the most common causes are:</p>
                                <ul>
                                  <li>Loss of STS temperature control</li>
                                  <li>Failure of High Temperature controller</li>
                                  <li>Sand drift over pipeline</li>
                                  <li>Vertical “chimney effect” – e.g., pipe bridge</li>
                                  <li>Flow of hot product</li>
                                  <li>Alarm temperature setting too close to maintain</li>
                                  <li>Temperature</li>
                                  <li>Overheating of empty pipe during heat-up or re-melt</li>
                                </ul>
                                <p>
                                  <strong>TOUBLESHOOTING TIPS</strong>When a hot spot alarm is detected, it is recommended that the condition be
                                  more closely monitored to see if it is a temporary situation, or if active intervention on the pipeline is
                                  required. Some specific items to check include:</p>
                                <ul>
                                  <li>Visually inspect trouble area</li>
                                  <li>Check and verify heating controls – RTD vs. DTS</li>
                                  <li>Verify heater power output</li>
                                  <li>Manually override heating system, if warranted</li>
                                  <li>Restart pumps to move hot liquid to another area</li>
                                </ul>
                              </div>
                            </div>

                            <div id="coldspot">
                              <h6>
                                <span><i className="fas fa-dot-circle"></i></span>
                                <FormattedMessage {...messages.coldSpot} children={(message => message)} />
                              </h6>
                              <div className="sectionContent">
                                <p><strong>DESCRIPTION</strong> Raychem Pipeline Supervisor continuously monitors the temperature measured by the
DTS system for every meter, checking for temperatures that are outside of the alarm threshold limits
that have been set for the pipeline. When the temperature at any location falls below the [Cold LL Limit]
threshold, a “coldspot” alarm is triggered. </p>
                                <p>
                                  Alarms are indicated on the Pipeline Detail View as Warning icon <img className="helpAlarmTypeIcon" src={require('../../assets/images/warningRaised.png')} />. Cold spot alarms are
  subject to [<a className="link scroll" target="alarmAggregation" >Alarm Aggregation</a>], and as such an alarm indicator may not be shown for each meter of pipe
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  in alarm.
                                </p>
                                <p><strong>POSSIBLE CAUSES</strong>Cold spots may occur for a variety of reasons. Some of the most common causes are:</p>
                                <ul>
                                  <li>Low ambient temperature</li>
                                  <li>Flooding of culvert</li>
                                  <li>Missing/damaged/wet insulation</li>
                                  <li>Excessive heat sink – e.g., pipe anchor; metal to metal contact</li>
                                  <li>Excessive heat loss at localized section</li>
                                  <li>Low flow condition</li>
                                  <li>Flow of cold product</li>
                                  <li>Heating system not sized properly</li>
                                  <li>Loss or damage of heating system</li>
                                  <li>Alarm temperature setting too close to maintain</li>
                                  <li>Snow covering of insulated pipe</li>
                                </ul>
                                <p><strong>TOUBLESHOOTING TIPS</strong> When a cold spot alarm is detected, it is recommended that the condition be
more closely monitored to see if it is a temporary situation, or if active intervention on the pipeline is
required. Some specific items to check include:</p>
                                <ul>
                                  <li>Visually inspect trouble area</li>
                                  <li>Check and verify heating controls – RTD vs. DTS</li>
                                  <li>Verify heater power output</li>
                                  <li>Consider adding insulation to localized area</li>
                                  <li>Manually override heating system, if warranted</li>
                                  <li>Restart pumps to move cold liquid to another area</li>
                                </ul>
                              </div>
                            </div>

                            <div id="timetofreeze">
                              <h6>
                                <span><i className="fas fa-dot-circle"></i></span>
                                <FormattedMessage {...messages.timeToFreeze} children={(message => message)} />
                              </h6>
                              <div className="sectionContent">
                                <p><strong>DESCRIPTION</strong>Raychem Pipeline Supervisor continuously monitors the dynamic behavior of the pipeline
using the temperature measured by the DTS system for every meter, and other available measurements.
Whenever the temperature of a section of the pipeline is dropping, Raychem Pipeline Supervisor
assesses the cooling rate and determines the time remaining before the pipe would reach the freeze
point of the fluid. When the calculated time to freeze at any location falls below the [Time To Freeze LL
Limit] threshold, a “TimeToFreeze” alarm is triggered.</p>
                                <p>Alarms are indicated on the Pipeline Detail View as Alarm icon <img className="helpAlarmTypeIcon" src={require('../../assets/images/alarmRaised.png')} />. Time To Freeze
alarms are subject to [<a className="link scroll" target="alarmAggregation" >Alarm Aggregation</a>], and as such an alarm indicator may not be shown for each
meter of pipe in alarm.</p>
                                <p><strong>POSSIBLE CAUSES</strong> Time to freeze alarms may occur for a variety of reasons. Some of the most common
causes are:</p>
                                <ul>
                                  <li>See [<a className="link scroll" target="coldspot">Cold spot alarm</a>]</li>
                                  <li>Loss of power to pumps</li>
                                </ul>
                                <p><strong>TOUBLESHOOTING TIPS</strong> When a Time To Freeze alarm is detected, it is recommended that the
condition be more closely monitored to see if it is a temporary situation, or if active intervention on the
pipeline is required. Some specific items to check include</p>
                                <ul>
                                  <li>See [<a className="link scroll" target="coldspot">Cold spot alarm</a>]</li>
                                  <li>Address issue with proactive plan</li>
                                </ul>
                              </div>
                            </div>

                            <div id="freezingimminent">
                              <h6>
                                <span><i className="fas fa-dot-circle"></i></span>
                                <FormattedMessage {...messages.freezingImminent} children={(message => message)} />
                              </h6>
                              <div className="sectionContent">
                                <p><strong>DESCRIPTION</strong> Raychem Pipeline Supervisor continuously monitors the dynamic behavior of the pipeline
using the temperature measured by the DTS system for every meter, and other available measurements.
Whenever the temperature of a section of the pipeline that has been determined to contain fluid falls
below the [<a className="link linkDisable" target="" >Upper Freeze Band Limit </a>], a “Freezing Imminent” alarm is triggered. This alarm means that
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        the fluid in the pipe may begin freezing soon. Depending on the fluid, pipe design and environmental
conditions, it may still take several hours for the fluid to completely freeze</p>
                                <p>
                                  Alarms are indicated on the Pipeline Detail View as Emergency icon <img className="helpAlarmTypeIcon" src={require('../../assets/images/emergencyRaised.png')} />. Freezing Imminent
alarms are subject to [<a className="link scroll" target="alarmAggregation" >Alarm Aggregation</a>], and as such an alarm indicator may not be shown for each
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          meter of pipe in alarm
                                </p>
                                <p><strong>POSSIBLE CAUSES</strong> The common root causes of Freezing Imminent alarms include</p>
                                <ul>
                                  <li>See [<a className="link scroll" target="coldspot">Cold spot alarm</a>]</li>
                                  <li>Extended NO FLOW period</li>
                                  <li>Loss of power to pumps</li>
                                </ul>
                                <p><strong>TOUBLESHOOTING TIPS</strong> When a Freezing Imminent alarm is detected, it is recommended that urgent
action is taken to prevent freezing (unless it is intended to freeze the pipeline). Some specific actions to
take include</p>
                                <ul>
                                  <li>See [<a className="link scroll" target="coldspot">Cold spot alarm</a>]</li>
                                  <li>Address issue with proactive plan</li>
                                </ul>
                              </div>
                            </div>

                            <div id="freezingdetected">
                              <h6>
                                <span><i className="fas fa-dot-circle"></i></span>
                                <FormattedMessage {...messages.freezingDetected} children={(message => message)} />
                              </h6>
                              <div className="sectionContent">
                                <p><strong>DESCRIPTION</strong>
                                  Raychem Pipeline Supervisor continuously monitors the dynamic behavior of the pipeline
                                  using the temperature measured by the DTS system for every meter, and other available measurements.
                                  Whenever  a  section  of  the  pipeline  that  has  been  in  the  [<a className="link scroll" target="freezingimminent">Freezing  Imminent</a>]  state  exhibits  a  phase
                                  transition transient behavior (cooling rate becomes near 0), a “Freezing Detected” alarm is triggered. This
                                  alarm means that the fluid in the pipe has reached the freeze point temperature and has begun to freeze.
                                  Depending on the fluid, pipe design and environmental conditions, it may still take several hours for the
                                  fluid to completely freeze.</p>
                                <p>Alarms  are  indicated  on  the  Pipeline  Detail  View  as  Alarm  icon <img className="helpAlarmTypeIcon" src={require('../../assets/images/alarmRaised.png')} /> .  Freezing  Detected
alarms  are  subject  to  [<a className="link scroll" target="alarmAggregation" >Alarm Aggregation</a>],  and  as  such  an  alarm  indicator  may  not  be  shown  for  each
meter of pipe in alarm</p>
                                <p><strong>POSSIBLE CAUSES</strong> The common root causes of Freezing Detected alarms include:</p>
                                <ul>
                                  <li>See [<a className="link scroll" target="coldspot">Cold spot alarm</a>]</li>
                                  <li>Extended NO FLOW period</li>
                                  <li>Loss of power to pumps</li>
                                </ul>
                                <p>
                                  <strong>TOUBLESHOOTING  TIPS</strong>
                                  When  a  Freezing  Detected  alarm  is  detected,  it  is  recommended  that  urgent
                                 action is taken to prevent freezing (unless it is intended to freeze the pipeline). Some specific actions to
                                  take include</p>
                                <ul>
                                  <li>Lock out pumps</li>
                                  <li>Visually inspect trouble area</li>
                                  <li>Consider adding insulation to localized area</li>
                                  <li>Check and verify heating controls – RTD vs. DTS</li>
                                  <li>Verify heater power output</li>
                                  <li>Utilize re-melt procedure to melt frozen section</li>
                                  <li>Ensure that the heating system is turned on and able to operate normally</li>
                                </ul>
                              </div>
                            </div>

                            <div id="frozen">
                              <h6>
                                <span><i className="fas fa-dot-circle"></i></span>
                                <FormattedMessage {...messages.frozen} children={(message => message)} />
                              </h6>
                              <div className="sectionContent">
                                <p>
                                  <strong>DESCRIPTION</strong> Raychem Pipeline Supervisor continuously monitors the dynamic behavior of the pipeline
                                  using the temperature measured by the DTS system for every meter, and other available measurements.
                                  Whenever a section of the pipeline that has been in the [<a className="link scroll" target="freezingdetected">Freezing Detected</a>]
                                  state exhibits an increased cooling rate indicative of a completed phase transition, or the temperature falls below the [<a className="link linkDisable" target="">Lower
                                  Freeze Band Limit</a>] a “Frozen” alarm is triggered. This alarm means that the fluid in the pipe has reached
                                  the freeze point temperature and has in fact frozen.
                                  </p>
                                <p>Alarms are indicated on the Pipeline Detail View as Emergency icon <img className="helpAlarmTypeIcon" src={require('../../assets/images/emergencyRaised.png')} />. Frozen alarms are
                                  subject to [<a className="link scroll" target="alarmAggregation">Alarm Aggregation</a>], and as such an alarm indicator may not be shown for each meter of pipe
                                  in alarm.</p>
                                <p><strong>POSSIBLE CAUSES</strong>The common root causes of Freezing Detected alarms include:</p>
                                <ul>
                                  <li>See [<a className="link scroll" target="coldspot" >Cold spot alarm</a>]</li>
                                  <li>Loss of power to pumps</li>
                                </ul>
                                <p><strong>TOUBLESHOOTING</strong>TIPS When a Frozen alarm is detected, recommended actions to take include</p>
                                <ul>
                                  <li>Lock out pumps</li>
                                  <li>Visually inspect trouble area</li>
                                  <li>Check and verify heating controls – RTD vs. DTS</li>
                                  <li>Verify heater power output</li>
                                  <li>Consider adding insulation to localized area</li>
                                  <li>Utilize re-melt procedure to melt frozen section</li>
                                </ul>
                              </div>
                            </div>

                            <div id="plug">
                              <h6>
                                <span><i className="fas fa-dot-circle"></i></span>
                                <FormattedMessage {...messages.plug} children={(message => message)} />
                              </h6>
                              <div className="sectionContent">
                                <p>
                                  <strong>DESCRIPTION</strong> Raychem Pipeline Supervisor continuously monitors the dynamic behavior of the pipeline
using the temperature measured by the DTS system for every meter, and other available measurements.
We use the dynamic behavior to determine the [<a className="link linkDisable" target="">fill level of the pipeline</a>] Whenever a section of the
pipeline that is deemed to be full has become [<a className="link scroll" target="frozen">Frozen</a>], a “Plug” alarm is triggered. This alarm means
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          that the fluid in the pipe has reached the freeze point temperature, has frozen and is plugging the
pipeline</p>
                                <p>Alarms are indicated on the Pipeline Detail View as Emergency icon <img className="helpAlarmTypeIcon" src={require('../../assets/images/emergencyRaised.png')} />. Plug alarms are
subject to [<a className="link scroll" target="alarmAggregation" >Alarm Aggregation</a>], and as such an alarm indicator may not be shown for each meter of pipe
in alarm</p>
                                <p><strong>POSSIBLE CAUSES</strong> The common root causes of Freezing Detected alarms include:</p>
                                <ul>
                                  <li>See [<a className="link scroll" target="coldspot">Cold spot alarm</a>]</li>
                                  <li>Loss of power to pumps</li>
                                </ul>
                                <p><strong>TOUBLESHOOTING TIPS</strong>When a Plug alarm is detected, recommended actions to take include:</p>
                                <ul>
                                  <li>Lock out pumps</li>
                                  <li>Visually inspect trouble area</li>
                                  <li>Check and verify heating controls – RTD vs. DTS</li>
                                  <li>Verify heater power output</li>
                                  <li>Consider adding insulation to localized area</li>
                                  <li>Utilize re-melt procedure to melt frozen section</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
          {/* tab panes ends  */}

        </div>
      </div>
    )
  }
}

HelpPage.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({
  helpPage: makeSelectHelpPage()
})

function mapDispatchToProps (dispatch) {
  return {
    dispatch
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

const withReducer = injectReducer({ key: 'helpPage', reducer })
const withSaga = injectSaga({ key: 'helpPage', saga })

export default compose(
  withReducer,
  withSaga,
  withConnect
)(HelpPage)

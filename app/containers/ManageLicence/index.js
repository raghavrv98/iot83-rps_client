/**
 *
 * ManageLicence
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { FormattedMessage } from "react-intl";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import { getPlansList, getPlansListError, submitRequestSuccess, submitRequestFailure, licenseKeySuccess, licenseKeyFailure } from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import messages from "./messages";
import commonMessages from '../../messages';
import { getPlans, submitLicensePlan, installLicenseKey } from './actions';
import SkeletonLoader from '../../components/SkeletonLoader';
import MessageModal from "../../components/MessageModal/Loadable";
import InstallLicence from "../../components/InstallLicence/Loadable";
import { saveAs } from 'file-saver';
import Carousel from "../../components/Carousel";
import { cloneDeep } from 'lodash';


/* eslint-disable react/prefer-stateless-function */
export class ManageLicence extends React.Component {
  state = {
    isInstallLicenceOpen: false,
    isLoading: true,
    deviceIdCopy: "",
    algolist: [],
    isOpen: false,
    licenseUpdated: false,
    payload: {}
  }

  componentDidMount() {
    this.props.getPlans()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.plansList && nextProps.plansList !== this.props.plansList) {
      this.setState({
        payload: nextProps.plansList,
        isLoading: false,
        algolist: nextProps.plansList.algoInfo
      })
    }

    if (nextProps.submitRequestSuccess && nextProps.submitRequestSuccess !== this.props.submitRequestSuccess) {
      this.setState({
        isLoading: false,
        isOpen: true,
        message: <FormattedMessage {...messages.plansUpdated} children={(message => message)} />,
        type: "success",
        modalSuccess: "success",
        licenseUpdated: true
      });
    }

    if (nextProps.licenseKeySuccess && nextProps.licenseKeySuccess !== this.props.licenseKeySuccess) {
      let message = "License Key Installed Successfully"
      this.setState({
        isLoading: false,
        isOpen: true,
        message,
        type: "success",
        license: true,
        isInstallLicenceOpen: false,
      });
    }

    ['plansListError', 'submitRequestFailure', 'licenseKeyFailure'].map(val => {
      this.errorSetStateHandler(nextProps[val], this.props[val]);
    })
  }

  errorSetStateHandler(nextError, currentError) {
    if (nextError && nextError !== currentError) {
      this.setState({
        isLoading: false,
        isOpen: true,
        message: nextError,
        type: "error",
      });
    }
  }

  copyTest = licenseId => {
    let tempElement = document.createElement("textarea");
    tempElement.value = licenseId;
    document.body.appendChild(tempElement);
    tempElement.select();
    document.execCommand("copy");
    document.body.removeChild(tempElement);
    this.setState({
      deviceIdCopy: 'Copied!'
    })
  };

  submitLicensePlanHandler = event => {
    event.preventDefault()
    let payload = cloneDeep(this.state.payload)
    this.setState({
      isLoading: true
    }, () => this.props.submitLicensePlan(payload))
  }

  selectAttributeHandler = (event, index) => {
    let payload = cloneDeep(this.state.payload)
    payload.packages[index]["assets"]["algorithms"][event.target.id].value = !payload.packages[index]["assets"]["algorithms"][event.target.id].value
    this.setState({
      payload,
    })
  }

  modalCloseHandler = () => {
    this.setState({
      isOpen: false,
      message: "",
      type: "",
      isInstallLicenceOpen: false
    });
    if (this.state.license || this.state.licenseUpdated) {
      this.setState({
        isLoading: true
      }, () => this.props.getPlans())
    }
  };

  installHandler = licenseKey => {
    this.setState({
      isLoading: true,
      isInstallLicenceOpen: false
    }, () => this.props.installLicenseKey(licenseKey))
  }

  downloadConfig = () => {
    let payload = cloneDeep(this.state.payload)
    var fileName = 'licenceConfig.json';
    // Create a blob of the data
    var fileToSave = new Blob([JSON.stringify(payload.packages)], {
      type: 'application/json',
      name: fileName
    });
    // Save the file
    saveAs(fileToSave, fileName);
  }

  importConfigHandler = (event) => {
    let file = event.target.files[0]
    var fileread = new FileReader();
    let payload = cloneDeep(this.state.payload)
    fileread.onload = (e) => {
      var content = e.target.result;
      payload.packages = JSON.parse(content);
      this.setState({
        isLoading: true
      }, () => this.props.submitLicensePlan(payload))
    };
    fileread.readAsText(file);
  }

  managePlan = (status, index) => {
    let payload = cloneDeep(this.state.payload)
    let algolist = cloneDeep(this.state.algolist)
    let cardAlgorithms = algolist.map(val => {
      return {
        "name": val.name,
        "value": false
      }
    })
    if (status === "add") {
      payload.packages.push({
        "assets": {
          "algorithms": cardAlgorithms,
        },
        "validFor": -1,
        "price": 0,
        "name": "",
        "currency": "$",
        "type": "PAID"
      })
    }
    else {
      payload.packages.splice(index, 1)
    }
    this.setState({
      payload
    })

  }

  nameChangeHandler = event => {
    let payload = cloneDeep(this.state.payload)
    payload.packages[event.target.id].name = event.target.value
    this.setState({
      payload
    })
  }

  createCarouselItems(data) {
    return data.map((plan, index) => <div className={this.props.match.params.activePlan === plan.name && this.props.match.params.activePlan ? "licencePlanCard active" : "licencePlanCard"} key={index}>
      {localStorage.getItem('tenant') === "cloudstore" && this.state.payload.packages.length > 1 ? <div className="button-group">
        <button
          type="button"
          onClick={() => this.managePlan("delete", index)}
          className="btn-transparent mr-0 text-danger"
        >
          <i className="far fa-trash-alt" />
        </button>
      </div> : null
      }
      <i className="far fa-badge-check activeMark" />
      <input type="text" disabled={localStorage.getItem('tenant') !== "cloudstore"} className="form-control licencePlanCardTitle" id={index} onChange={this.nameChangeHandler} value={plan.name} />
      <div className="pipelineStructure"></div>
      <div className="licenceItems">
        {plan.assets.algorithms.map((algo, algoIndex) =>
          <label key={algoIndex} className="customCheckbox">
            <input
              type="checkbox"
              onChange={(event) => this.selectAttributeHandler(event, index)}
              id={algoIndex}
              name={algo.name}
              checked={algo.value}
              disabled={localStorage.getItem('tenant') !== "cloudstore"}
            />
            <span className="checkmark" />
            <span className="checkboxText">
              {algo.name}
            </span>
          </label>
        )}
      </div>
      {/* <div className="licencePlanPrice">
        <div className="price">
          <input type="text" className="form-control  priceValue" value={plan.currency + (plan.price / plan.validFor).toFixed(2)} disabled={this.state.isPlanEdit} />
          <input type="text" className="form-control  priceTitle" value="Monthly" disabled />
        </div>
        <div className="price">
          <input type="text" className="form-control  priceValue" value={plan.currency + (plan.price * 12 / plan.validFor).toFixed(2)} disabled={this.state.isPlanEdit} />
          <input type="text" className="form-control  priceTitle" value="Yearly" disabled/>
        </div>
      </div> 
      */}
    </div>)
  }

  render() {
    return (
      <div className="appContent">
        <Helmet>
          <title>ManagePlans</title>
          <meta name="description" content="Description of ManagePlans" />
        </Helmet>

        <div className="pageBreadcrumb">
          <div className="fx-b70">
            {localStorage.getItem('tenant') === "cloudstore" ?
              <p><FormattedMessage {...commonMessages.manageLicense} children={(message => message)} /></p>
              :
              <p className="pd-l-30">
                <span className="cursor-pointer" onClick={() => { this.props.history.push({ pathname: '/settings', state: { activeTab: 'license' } }); }} >
                  <button className="btn btn-transparent">
                    <i className="far fa-long-arrow-left"></i>
                  </button>
                  <FormattedMessage {...commonMessages.settings} children={(message => message)} />
                </span>
              </p>
            }
            <h5>
              {localStorage.getItem('tenant') === "cloudstore" ?
                "License Configuration"
                :
                "License Plans"
              }
            </h5>
          </div>
          <div className="fx-b30 text-right" />
        </div>

        {this.state.isLoading ? <SkeletonLoader skeleton="skeletonLicencePlan" mode="fullView"/> : <React.Fragment>
          <header className="licencePageHeader">
            <div className="fx-b75">
              <div className="licenceInstruction">
                <img src={`${window.API_URL}api/public/static/logo/pmmp.jpeg`}
                  onError={(e) => { e.target.onerror = null; e.target.src = require('../../assets/images/nVent-icon.png') }} />
                <h6>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h6>
                <ul>
                  <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                  <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                  <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                </ul>
              </div>
            </div>
            <div className="fx-b25">
              <div className="licenceContact">
                <h6><FormattedMessage {...commonMessages.contactUs} children={(message => message)} />
                <i className="fas fa-id-badge" />
                </h6>
                <ul>
                  <li>
                    <i className="far fa-phone" />
                    +1-763-421-2240
                    </li>
                  <li>
                    <i className="fas fa-envelope" />
                    admin@pmmp.com
                  </li>
                  <li>
                    <i className="far fa-map-marker-alt" />
                    Anoka, MN
                  </li>
                </ul>
              </div>
            </div>
          </header>

          <section className="flex">
            <div className="fx-b20 pd-r-10">
              <div className="licencePlanBasicsOuter">
                <h3><i className="far fa-cog"></i> <FormattedMessage {...messages.algorithmsAttributes} children={(message => message)} /> </h3>
                <ol className="licencePlanBasics">
                  {this.state.algolist.map((val, index) =>
                    <li key={index}>
                      <h6>{val.name}</h6>
                      <ul className="algoAttributeList">
                        {val.attributes.map((algoAttr, algoAttrIndex) =>
                          <li key={algoAttrIndex}>{algoAttr.displayName}</li>
                        )}
                      </ul>
                    </li>
                  )}
                </ol>
              </div>
            </div>

            <div className="fx-b80 pd-l-10">
              {localStorage.getItem('tenant') !== "cloudstore" &&
                <div className="deviceID">
                  <h4>
                    <strong><FormattedMessage {...commonMessages.deviceId} children={(message => message)} /> :</strong>{this.state.payload.deviceId}
                    <button type="button" onClick={() => this.copyTest(this.state.payload.deviceId)} className="btn-transparent text-info"
                    data-tooltip
                    data-tooltip-text= "Copy"
                    >
                      <i className="far fa-copy"></i>
                    </button>
                    <span className="textCopied">{this.state.deviceIdCopy}</span>
                  </h4>
                </div>
              }
              <div className="licenceSectionTitle">
                <h2><FormattedMessage {...messages.ourPlans} children={(message => message)} /></h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <div className="customBorderBox">
                  <span className="customBorder borderLeft"></span>
                  <span className="customBorder borderRight"></span>
                </div>
              </div>

              <form onSubmit={this.submitLicensePlanHandler}>
                <Carousel
                  data={this.createCarouselItems(this.state.payload.packages)}
                  showContent={4}
                  nextButton={<button type="button" className="btn btn-transparent text-danger"><i className="fa fa-arrow-circle-right f-24" /></button>}
                  previousButton={<button type="button" className="btn btn-transparent text-danger"><i className="fa fa-arrow-circle-left f-24" /></button>}
                />

                <div className="btn-fixed-group">
                  {/* {localStorage.getItem('tenant') !== "cloudstore" &&
                    <button type="button" onClick={() => this.setState({ isInstallLicenceOpen: true })} className="btn btn-fixed">
                      <i className="fas fa-arrow-alt-up" />
                      <span className="btn-fixed-text">
                        Upgrade Licence
                    </span>
                    </button>} */}

                  {localStorage.getItem('tenant') === "cloudstore" &&
                    <React.Fragment>
                      <button type="button" className="btn btn-fixed" onClick={this.downloadConfig}>
                        <i className="far fa-share-square" />
                        <span className="btn-fixed-text">
                          <FormattedMessage {...commonMessages.exportAsJson} children={(message => message)} />
                        </span>
                      </button>

                      <button type="button" className="btn btn-fixed">
                        <i className="far fa-file-import" />
                        <span className="btn-fixed-text">
                          <FormattedMessage {...commonMessages.import} children={(message => message)} />
                          <input type="file" accept="application/JSON" onChange={this.importConfigHandler} />
                        </span>
                      </button>

                      <button type="button" className="btn btn-fixed" onClick={() => this.managePlan("add")}>
                        <i className="far fa-plus" />
                        <span className="btn-fixed-text">
                          <FormattedMessage {...messages.newPlan} children={(message => message)} />
                        </span>
                      </button>

                      <button className="btn btn-fixed">
                        <i className="fas fa-check" />
                        <span className="btn-fixed-text">
                          <FormattedMessage {...commonMessages.update} children={(message => message)} />
                        </span>
                      </button>
                    </React.Fragment>
                  }
                </div>

              </form>
            </div>
          </section>
        </React.Fragment>}

        {
          this.state.isInstallLicenceOpen ?
            <InstallLicence
              companyName={localStorage.getItem('tenant')}
              tenant={localStorage.getItem('tenant')}
              licenseName={this.props.match.params.activePlan}
              installHandlerComponent={this.installHandler}
              onClose={this.modalCloseHandler} /> :
            null
        }

        {
          this.state.isOpen ? (
            <MessageModal
              type={this.state.type}
              message={this.state.message}
              onClose={this.modalCloseHandler}
            />
          ) : null
        }
      </div >
    );
  }
}

ManageLicence.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  plansList: getPlansList(),
  plansListError: getPlansListError(),
  submitRequestSuccess: submitRequestSuccess(),
  submitRequestFailure: submitRequestFailure(),
  licenseKeySuccess: licenseKeySuccess(),
  licenseKeyFailure: licenseKeyFailure()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getPlans: () => dispatch(getPlans()),
    submitLicensePlan: (payload) => dispatch(submitLicensePlan(payload)),
    installLicenseKey: (licenseKey) => dispatch(installLicenseKey(licenseKey))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "manageLicence", reducer });
const withSaga = injectSaga({ key: "manageLicence", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(ManageLicence);

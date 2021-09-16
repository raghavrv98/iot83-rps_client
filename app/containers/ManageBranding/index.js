/**
 *
 * ManageBranding
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { FormattedMessage } from "react-intl";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { uploadLogo, uploadTheme, resetUploadState } from "./actions";
import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import { getUploadSuccess, getUploadFailure, uploadThemeSuccess, uploadThemeFailure } from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import messages from "./messages";
import commonMessages from "../../messages";
import Dropzone from "react-dropzone";
import MessageModal from "../../components/MessageModal/Loadable";
import SkeletonLoader from "../../components/SkeletonLoader";
import ModalLoader from "../../components/ModalLoader";
/* eslint-disable react/prefer-stateless-function */
export class ManageBranding extends React.Component {
  state = {
    uploadedFile: {},
    uploadfileError: "",
    isOpen: false,
    uploadedTheme: {},
    uploadedThemeError: "",
    pipelineComponent: [
      {
        name: "Anchor",
        url: "anchor.png",
        value: null
      },
      {
        name: "Drain",
        url: "drain.png",
        value: null
      },
      {
        name: "DTS",
        url: "instrument.png",
        value: null
      },
      {
        name: "Flange",
        url: "flange.png",
        value: null
      },
      {
        name: "Pullbox",
        url: "pullbox.png",
        value: null
      },
      {
        name: "Support",
        url: "support.png",
        value: null
      },
      {
        name: "Valve",
        url: "valve.png",
        value: null
      },
      {
        name: "Vent",
        url: "vent.png",
        value: null
      },

      {
        name: "Weld",
        url: "weld.png",
        value: null
      },
      {
        name: "RTD",
        url: "scadasensor.png",
        value: null
      },
      {
        name: "Bend",
        url: "bend.png",
        value: null
      },
      {
        name: "Elbow",
        url: "elbow.png",
        value: null
      },
      {
        name: "FO Splice",
        url: "fosplice.png",
        value: null
      },
      {
        name: "Splice",
        url: "splice.png",
        value: null
      },
      {
        name: "Landmark",
        url: "landmark.png",
        value: null
      },
      {
        name: "Alarm",
        url: "alarm.png",
        value: null
      },
      {
        name: "Warning",
        url: "warning.png",
        value: null
      },
      {
        name: "Emergency",
        url: "emergency.png",
        value: null
      },
      {
        name: "Raised Alarm",
        url: "raisedalarm.png",
        value: null
      },
      {
        name: "Raised Warning",
        url: "raisedwarning.png",
        value: null
      },
      {
        name: "Raised Emergency",
        url: "raisedemergency.png",
        value: null
      },
      {
        name: "Acknowledged Alarm",
        url: "acknowledgedalarm.png",
        value: null
      },
      {
        name: "Acknowledged Warning",
        url: "acknowledgedwarning.png",
        value: null
      },
      {
        name: "Acknowledged Emergency",
        url: "acknowledgedemergency.png",
        value: null
      },
      {
        name: "Addressed Alarm",
        url: "addressedalarm.png",
        value: null
      },
      {
        name: "Addressed Warning",
        url: "addressedwarning.png",
        value: null
      },
      {
        name: "Addressed Emergency",
        url: "addressedemergency.png",
        value: null
      }
    ]
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.uploadSuccess &&
      nextProps.uploadSuccess !== this.props.uploadSuccess
    ) {
      let pipelineComponent = this.state.pipelineComponent
      pipelineComponent.map((icon) => icon.iconLoader = false);
      this.setState({
        groupList: nextProps.uploadSuccess,
        isLoading: false,
        isOpen: true,
        pipelineComponent,
        type: "success",
        iconLoader: "close",
        message: nextProps.uploadSuccess
      });
    }
    if (
      nextProps.uploadFailure &&
      nextProps.uploadFailure !== this.props.uploadFailure
    ) {
      let pipelineComponent = this.state.pipelineComponent
      pipelineComponent.map((icon) => icon.iconLoader = false);
      this.setState({
        isLoading: false,
        isOpen: true,
        iconLoader: false,
        pipelineComponent,
        iconLoader: "close",
        message: nextProps.uploadFailure,
        type: "error"
      });
    }
    if (
      nextProps.uploadThemeSuccess &&
      nextProps.uploadThemeSuccess !== this.props.uploadThemeSuccess
    ) {
      this.setState({
        groupList: nextProps.uploadThemeSuccess,
        isLoadingTheme: false,
        isOpen: true,
        type: "success",
        message: nextProps.uploadThemeSuccess
      });
    }
    if (
      nextProps.uploadThemeFailure &&
      nextProps.uploadThemeFailure !== this.props.uploadThemeFailure
    ) {
      this.setState({
        isLoadingTheme: false,
        isOpen: true,
        message: nextProps.uploadThemeFailure,
        type: "error"
      });
    }
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles[0]) {
      this.setState({ uploadedFile: {}, uploadfileError: "Invalid file type ( Accepted file types .png,.jpeg,.gif ) ." });
    }
    else {
      this.setState({ uploadedFile: acceptedFiles[0], url: "api/v1/platform/static/logo?naming=random", uploadfileError: "" });
    }
  }

  onDropTheme = (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles[0]) {
      this.setState({ uploadedTheme: {}, uploadedThemeError: "Invalid file type ( Accepted file type .css ) ." });
    } else {
      this.setState({ uploadedTheme: acceptedFiles[0], uploadedThemeError: "" });
    }
  }

  getPreviewUrl(file) {
    return new Promise((resolve) => {
      let reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  }
  
  onChangeIcon(event) {
    event.preventDefault();
    if (event.target.files[0]) {
      let componentIcons = this.state.pipelineComponent
      Promise.all(componentIcons.map(async (icon) => {
        if (icon.name === event.target.id) {
          icon.file = event.target.files[0];
          icon.value = event.target.files[0].name;
          await this.getPreviewUrl(event.target.files[0]).then(resolve => {
            icon.previewFile = resolve
          })
        }
        return icon
      })).then(result => this.setState({ pipelineComponent: result }));
    }
    else { }
  }

  uploadLogo = () => {
    this.setState({
      isLoading: true,
    }, () => this.props.resetUploadState(), this.props.uploadLogo(this.state.uploadedFile, this.state.url))
  };

  uploadTheme = event => {
    let id = event.target.id
    this.setState({
      isLoadingTheme: true,
    }, () => this.props.uploadTheme(this.state.uploadedTheme, id))
  };

  modalCloseHandler = () => {
    if (this.state.type === "success" && this.state.copmponentChangeRequest) {
      this.setState({
        isOpen: false,
        copmponentChangeRequest: false
      })
    }
    else if (this.state.type === "success") {
      this.setState({
        isOpen: false
      }, () => window.location.reload())
    }
    else {
      this.setState({
        isOpen: false,
        uploadedFile: {},
        uploadedTheme: {}
      });
    }
  };

  removeIcon = (index) => {
    let pipelineComponent = this.state.pipelineComponent
    pipelineComponent[index].file = ""
    pipelineComponent[index].previewFile = ""
    pipelineComponent[index].value = null
    this.setState({
      pipelineComponent
    })
  }

  render() {
    return (
      <div className="appContent">
        <Helmet>
          <title>ManageBranding</title>
          <meta name="description" content="Description of ManageBranding" />
        </Helmet>

        <div className="pageBreadcrumb">
          <div className="flex-item fx-b70">
            <p><FormattedMessage {...messages.title} children={(message => message)} /></p>
            <h5><FormattedMessage {...messages.title} children={(message => message)} /></h5>
          </div>
          <div className="flex-item fx-b30 text-right align-items-center" />
        </div>

        <ul className="nav nav-tabs customNavTab" role="tablist">
          <li className="nav-item fx-b33 pd-r-4">
            <a className="nav-link active" data-toggle="tab" href="#manageLogo">
              <FormattedMessage {...messages.manageLogo} children={(message => message)} />
            </a>
          </li>
          <li className="nav-item fx-b33 pd-r-2 pd-l-2">
            <a className="nav-link" data-toggle="tab" href="#manageTheme" >
              <FormattedMessage {...messages.manageTheme} children={(message => message)} />
            </a>
          </li>
          <li className="nav-item fx-b33 pd-l-4">
            <a className="nav-link" data-toggle="tab" href="#manageComponent">
              <FormattedMessage {...messages.managePipelineComponentIcon} children={(message => message)} />
            </a>
          </li>
        </ul>

        <div className="tab-content tab-customContent">
          <div className="tab-pane active" id="manageLogo">
            {!this.state.isLoading ?
              <React.Fragment>
                <div className="contentForm shadowNone">
                  <h5 className="formHeader"><FormattedMessage {...messages.manageLogo} children={(message => message)} /></h5>
                  <div className="dropZoneOuterBox">
                    <Dropzone
                      className="dropZoneBox"
                      disablePreview={false}
                      multiple={false}
                      accept="image/*"
                      onDrop={this.onDrop}
                    >
                      <div className="dropZoneBoxContent">
                        <img src={require("../../assets/images/file.png")} />
                        <p>
                          {this.state.uploadedFile.name ? (
                            this.state.uploadedFile.name
                          ) : (
                              <FormattedMessage {...commonMessages.dropzonemsg} />
                            )}
                        </p>
                      </div>
                    </Dropzone>
                    {this.state.uploadedFile.preview ? (
                      <div className="dropZoneBoxPreview">
                        <img src={this.state.uploadedFile.preview} />
                      </div>
                    ) : (
                        <div className="dropZoneBoxPreview">
                          <img
                            src={`${window.API_URL}api/public/static/logo/pmmp.jpeg`}
                            onError={(e) => { e.target.onerror = null; e.target.src = require('../../assets/images/nVent-icon.png') }}
                          />
                        </div>
                      )}
                    {this.state.uploadfileError ? <p className="errorMSG">{this.state.uploadfileError}</p> : null}
                  </div>
                  {this.state.uploadedFile.preview ? (
                    <div className="text-right pr-5">
                      <button
                        onClick={this.uploadLogo}
                        id="saveAgent"
                        className="btn btn-danger mt-3"
                      >
                        <i className="far fa-upload" />
                        <FormattedMessage {...messages.button} children={(message => message)} />
                      </button>
                    </div>
                  ) : null}
                </div>
              </React.Fragment> : <SkeletonLoader skeleton="skeletonManageBranding" mode="fullView" />}

          </div>
          <div className="tab-pane fade" id="manageTheme">
            {!this.state.isLoadingTheme ?
              <React.Fragment>
                <div className="contentForm shadowNone">
                  <h5 className="formHeader"><FormattedMessage {...messages.manageTheme} children={(message => message)} />
                    <div>
                      <button
                        type="button"
                        onClick={this.uploadTheme}
                        id="resetToDefault"
                        className="btn btn-transparent bg-lightRed text-danger f-12 mr-r-40" >
                        <FormattedMessage {...messages.resetToDefault} children={(message => message)} />
                        <i className="far fa-undo f-12 mr-l-8" />
                      </button>
                    </div>
                  </h5>
                  <div className="dropZoneOuterBox">
                    <Dropzone
                      className="dropZoneBox"
                      disablePreview={false}
                      multiple={false}
                      accept=".css"
                      onDrop={this.onDropTheme}
                    >
                      <div className="dropZoneBoxContent">
                        <img src={require("../../assets/images/file.png")} />
                        <p>
                          {this.state.uploadedTheme.name ? (
                            this.state.uploadedTheme.name
                          ) : (
                              <FormattedMessage {...commonMessages.dropzonemsg} children={(message => message)} />
                            )}
                        </p>
                      </div>
                    </Dropzone>
                    <div className="dropZoneBoxPreview">
                      <div className="preViewContent">
                        <p><FormattedMessage {...messages.theme} children={(message => message)} /></p>
                        <a className="btn btn-transparent text-cyan" href={window.API_URL + "api/public/static/css/theme.css"} download>
                          <i className="far fa-download" />
                        </a>
                      </div>
                    </div>
                    {this.state.uploadedThemeError ? <p className="errorMSG">{this.state.uploadedThemeError}</p> : null}
                  </div>
                  {this.state.uploadedTheme.preview ? (
                    <div className="text-right pr-5 mt-3">
                      <button
                        type="button"
                        onClick={this.uploadTheme}
                        id="saveTheme"
                        className="btn btn-danger"
                      >
                        <i className="far fa-upload" />
                        <FormattedMessage {...messages.button} children={(message => message)} />
                      </button>
                    </div>
                  ) : null}
                </div>
              </React.Fragment> : <SkeletonLoader skeleton="skeletonManageBranding" mode="fullView" />}
          </div>

          <div className="tab-pane fade" id="manageComponent">
            <React.Fragment>
              <div className="contentForm shadowNone">
                <h5 className="formHeader"><FormattedMessage {...messages.managePipelineComponentIcon} children={(message => message)} /></h5>
                <ul className="pipelineComponentIcon flex mr-t-20">
                  {this.state.pipelineComponent.map((component, index) => {
                    return <li className="fx-b20" key={index}>
                      <div className="ComponentIconCard">
                        {component.previewFile ? (
                          <div className="actionButton">
                            <button
                              onClick={() => {
                                let pipelineComponent = this.state.pipelineComponent;
                                let sendingFile = this.state.pipelineComponent[index].file
                                let fileUrl = "api/v1/platform/static/components?naming=" + pipelineComponent[index].url
                                pipelineComponent[index].iconLoader = true
                                pipelineComponent[index].value = null;
                                delete pipelineComponent[index].file
                                delete pipelineComponent[index].previewFile
                                this.setState({
                                  pipelineComponent,
                                  copmponentChangeRequest: true
                                })
                                this.props.resetUploadState()
                                this.props.uploadLogo(sendingFile, fileUrl)
                              }}
                              id="icon"
                              name={component.name}
                              className="btn btn-transparent"
                              data-tooltip
													  	data-tooltip-text= "Upload Icon"
                            >
                              <i className="fas fa-upload text-success f-13" />
                            </button>
                            <button onClick={(event) => this.removeIcon(index)} className="btn btn-transparent"><i className="far fa-times text-danger f-13"></i></button>
                          </div>
                        ) : null}
                        <div className="cardIcon">
                          {component.iconLoader ? <ModalLoader /> :
                                <div className="cardImg">
                                <img src={ component.previewFile ? component.previewFile :  window.API_URL + "api/public/static/components/" + component.url }/> 
                                <input ref={"icon"+index} title="" type="file" id={component.name} key={component.value} onChange={(event) => this.onChangeIcon(event)} accept="image/png, image/jpeg ,image/gif" 
                                />
                                <button type="button" className="browseButton bg-lightBlue"
                                data-tooltip
                                data-tooltip-text= "Change Icon"
                                onClick={() => {this.refs[`icon${index}`].click();}}
                                >
                                <i className="far fa-camera-alt"></i>
                                </button> 
                              </div>
                          }
                        </div>
                        <div className="cardContent">
                          <h4>{component.name}</h4>
                          <p><strong><FormattedMessage {...messages.iconName} children={(message => message)} /> :</strong> {component.url}</p>
                        </div>
                      </div>
                    </li>
                  })}
                </ul>
              </div>
            </React.Fragment>
          </div>
        </div>
        {this.state.isOpen ? (
          <MessageModal
            type={this.state.type}
            message={this.state.message}
            onClose={this.modalCloseHandler}
          />
        ) : null}
      </div >
    );
  }
}

ManageBranding.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  uploadSuccess: getUploadSuccess(),
  uploadFailure: getUploadFailure(),
  uploadThemeSuccess: uploadThemeSuccess(),
  uploadThemeFailure: uploadThemeFailure()
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    uploadLogo: (filePayload, url) => dispatch(uploadLogo(filePayload, url)),
    uploadTheme: (themePayload, themeId) => dispatch(uploadTheme(themePayload, themeId)),
    resetUploadState: () => dispatch(resetUploadState())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "manageBranding", reducer });
const withSaga = injectSaga({ key: "manageBranding", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(ManageBranding);

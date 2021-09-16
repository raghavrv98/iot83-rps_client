/**
 *
 * AddorEditPipeLineLandmark
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
import { fetchLandmarkDetails, createLandmarkHandler, uploadLandmarkImage } from "./actions";
import {
  getLandmarkDetailsSuccess,
  getLandmarkDetailsFailure,
  createLandmarkDetailsSuccess,
  createLandmarkDetailsFailure,
  uploadLandmarkImageSuccess,
  uploadLandmarkImageFailure

} from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import messages from "./messages";
import commonMessages from "../../messages";
import SkeletonLoader from "../../components/SkeletonLoader";
import Dropzone from "react-dropzone";
import MessageModal from "../../components/MessageModal/Loadable";



/* eslint-disable react/prefer-stateless-function */
export class AddorEditPipeLineLandmark extends React.Component {

  state = {
    uploadedImage: "",
    isLoading: false,
    payload: {
      name: "",
      chain: "",
      x: null,
      y: null,
      landmarkImage: "",
    },
  };

  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.fetchLandmarkDetails(this.props.match.params.plantId, this.props.match.params.pipelineId, this.props.match.params.id);
      this.setState({
        isLoading: true
      })
    }
  }

  componentWillReceiveProps(nextprops) {
    if (
      nextprops.getLandmarkDetailsSuccess &&
      nextprops.getLandmarkDetailsSuccess !== this.props.getLandmarkDetailsSuccess
    ) {
      this.setState({
        payload: nextprops.getLandmarkDetailsSuccess,
        isLoading: false
      });
    }
    if (
      nextprops.getLandmarkDetailsFailure &&
      nextprops.getLandmarkDetailsFailure !== this.props.getLandmarkDetailsFailure
    ) {
      this.setState({
        isLoading: false,
        isOpen: true,
        message: nextprops.getLandmarkDetailsFailure,
        type: "error"
      });
    }
    if (
      nextprops.createLandmarkDetailsSuccess &&
      nextprops.createLandmarkDetailsSuccess !== this.props.createLandmarkDetailsSuccess
    ) {
      this.setState({
        payload: nextprops.createLandmarkDetailsSuccess,
        isLoading: false,
        isOpen: true,
        message: this.props.match.params.id ?
          <FormattedMessage {...messages.landmarkUpdate} /> :
          <FormattedMessage {...messages.landmarkAdded} />,
        type: "success",
        modalSuccess: "success",
      });
    }
    if (
      nextprops.createLandmarkDetailsFailure &&
      nextprops.createLandmarkDetailsFailure !== this.props.createLandmarkDetailsFailure
    ) {
      this.setState({
        isLoading: false,
        isOpen: true,
        message: nextprops.createLandmarkDetailsFailure,
        type: "error"
      });
    }

    if (
      nextprops.uploadLandmarkImageSuccess &&
      nextprops.uploadLandmarkImageSuccess !== this.props.uploadLandmarkImageSuccess
    ) {
      let payload = JSON.parse(JSON.stringify(this.state.payload));
      payload.landmarkImage = nextprops.uploadLandmarkImageSuccess.name
      this.setState({
        payload,
      }, () => this.props.createLandmarkHandler(this.state.payload, this.props.match.params.plantId, this.props.match.params.pipelineId, this.props.match.params.id)
      )
    }
    if (
      nextprops.uploadLandmarkImageFailure &&
      nextprops.uploadLandmarkImageFailure !== this.props.uploadLandmarkImageFailure
    ) {
      let payload = JSON.parse(JSON.stringify(this.state.payload));
      payload.landmarkImage = null;
      this.setState({
        payload,
        uploadedImage: "",
        isImageLoaded: false,
        isOpen: true,
        message: nextProps.uploadLandmarkImageFailure,
        type: "error"
      });
    }
  }


  nameChangeHandler = event => {
    let payload = JSON.parse(JSON.stringify(this.state.payload));
    if ((event.target.id == "x" || event.target.id == "y" || event.target.id == "chain") && event.target.value) {
      payload[event.target.id] = parseInt(event.target.value);
    }
    else {
      payload[event.target.id] = event.target.value;
    }
    payload["x"] = payload["x"] === "" ? null : payload["x"]  
    payload["y"] = payload["y"] === "" ? null : payload["y"]  
    this.setState({
      payload
    });
  };

  onDrop = acceptedFiles => {
    let payload = JSON.parse(JSON.stringify(this.state.payload))
    payload.landmarkImage = null;
    this.setState({
      payload,
      uploadedImage: acceptedFiles[0],
    });
  }

  modalCloseHandler = () => {
    this.setState({
      isOpen: false,
      message: "",
      type: ""
    });
    if (this.state.modalSuccess === "success") {
      this.props.history.push(`/managePipelineLandmark/${this.props.match.params.plantId}/${this.props.match.params.pipelineId}`);
    }
  }

  submitHandler = event => {
    event.preventDefault();
    let payload = JSON.parse(JSON.stringify(this.state.payload));
    this.setState({
      isLoading: true,
      payload,
    }, () => {
      if (this.state.uploadedImage)
        this.props.uploadLandmarkImage(this.state.uploadedImage)
      else
        this.props.createLandmarkHandler(this.state.payload, this.props.match.params.plantId, this.props.match.params.pipelineId, this.props.match.params.id)
    })
  };

  render() {
    return (
      <div className="appContent">
        <Helmet>
          <title>AddorEditPipeLineLandmark</title>
          <meta name="description" content="Description of AddorEditPipeLineLandmark" />
        </Helmet>

        <div className="pageBreadcrumb">
          <div className="flex-item fx-b70">
            <p className="pd-l-30">
              <span className="cursor-pointer" onClick={() => { this.props.history.push(`/managePipeLineLandmark/${this.props.match.params.plantId}/${this.props.match.params.pipelineId}`); }}>
                <button className="btn btn-transparent">
                  <i className="far fa-long-arrow-left" />

                </button>
                <FormattedMessage {...messages.manageLandmark} children={(message => message)} />
              </span>
            </p>
            <h5>
              {this.props.match.params.id ? (
                <FormattedMessage
                  {...messages.editLandmark}
                  children={message => message}
                />
              ) : (
                  <FormattedMessage
                    {...messages.createLandmark}
                    children={message => message}
                  />
                )}
            </h5>
          </div>
          <div className="flex-item fx-b30 text-right align-items-center" />
        </div>

        {this.state.isLoading ?
          <SkeletonLoader skeleton="skeletonNestedFormUpload" mode="fullView"/>
          :
          <React.Fragment>
            <form className="contentForm" onSubmit={this.submitHandler} >
              <h5 className="formHeader">
                {this.props.match.params.id ?
                  <FormattedMessage
                    {...messages.editLandmark}
                    children={message => message}
                  />
                  :
                  <FormattedMessage
                    {...messages.createLandmark}
                    children={message => message}
                  />
                }
              </h5>
              <div className="form-group">
                <label className="form-label">
                  <FormattedMessage {...messages.name} children={message => message}/>
                  <sup className="mr-r-7">
                    <i className="fas fa-asterisk" />
                  </sup>
                  :
        </label>
                <input
                  value={this.state.payload.name}
                  onChange={this.nameChangeHandler}
                  type="text"
                  className="form-control"
                  id="name"
                  required
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label className="form-label">
                  <FormattedMessage {...messages.chain} children={message => message}/>
                  <sup className="mr-r-7">
                    <i className="fas fa-asterisk" />
                  </sup>
                  :
        </label>
                <div className="input-group">
                  <input
                    value={this.state.payload.chain}
                    onChange={this.nameChangeHandler}
                    type="number"
                    className="form-control"
                    id="chain"
                    required
                  />
                  <div className="input-group-append">
                    <span className="input-group-text"><FormattedMessage {...commonMessages.m} children={(message => message)}/></span>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">
                  <FormattedMessage {...messages.x} /> :
        </label>
                <div className="input-group">
                  <input
                    value={this.state.payload.x === null ? "" : this.state.payload.x}
                    onChange={this.nameChangeHandler}
                    type="number"
                    className="form-control"
                    id="x"
                  />
                  <div className="input-group-append">
                    <span className="input-group-text"><FormattedMessage {...commonMessages.m} children={(message => message)}/></span>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">
                  <FormattedMessage {...messages.y} children={message => message}/> :
                </label>
                <div className="input-group">
                  <input
                    value={this.state.payload.y === null ? "" : this.state.payload.y}
                    onChange={this.nameChangeHandler}
                    type="number"
                    className="form-control"
                    id="y"
                  />
                  <div className="input-group-append">
                    <span className="input-group-text"><FormattedMessage {...commonMessages.m} children={(message => message)}/></span>
                  </div>
                </div>
              </div>
              <div className="flex">
                <div className="fx-b20" />
                <div className="fx-b80">
                  <div className="dropZoneOuterBox mr-0 w-100">
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
                          {this.state.payload.landmarkImage ?
                            this.state.payload.landmarkImage.split('/')[2] :
                            this.state.uploadedImage ? (
                              this.state.uploadedImage.name
                            ) :
                              (
                                <FormattedMessage {...commonMessages.dropzonemsg} children={message => message}/>
                              )
                          }
                        </p>
                      </div>
                    </Dropzone>
                    {this.state.payload.landmarkImage ?
                      <div className="dropZoneBoxPreview">
                        <img src={`${window.API_URL}api/public/static${this.state.payload.landmarkImage}`} />
                      </div> :
                      this.state.uploadedImage ?
                        <div className="dropZoneBoxPreview">
                          <img src={this.state.uploadedImage.preview} />
                        </div>
                        :
                        <div className="dropZoneBoxNoPreview">
                          <img src={require("../../assets/images/no_preview.png")} />
                          <p>
                            <FormattedMessage {...commonMessages.imgpreview} children={message => message}/>
                          </p>
                        </div>
                    }
                  </div>
                </div>
              </div>
              <div className="form-group justify-content-end mt-3">
                <button id="saveLandmark" className="btn btn-danger">
                  <i className="far fa-check-circle" />
                  {this.props.match.params.id ? (
                    <FormattedMessage
                      {...commonMessages.update}
                      children={message => message}
                    />
                  ) : (
                      <FormattedMessage
                        {...commonMessages.save}
                        children={message => message}
                      />
                    )}
                </button>
              </div>
            </form>
          </React.Fragment>
        }
        {this.state.isOpen && (
          <MessageModal
            type={this.state.type}
            message={this.state.message}
            onClose={this.modalCloseHandler}
          />
        )}
      </div>

    );
  }
}

AddorEditPipeLineLandmark.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  getLandmarkDetailsSuccess: getLandmarkDetailsSuccess(),
  getLandmarkDetailsFailure: getLandmarkDetailsFailure(),
  createLandmarkDetailsSuccess: createLandmarkDetailsSuccess(),
  createLandmarkDetailsFailure: createLandmarkDetailsFailure(),
  uploadLandmarkImageSuccess: uploadLandmarkImageSuccess(),
  uploadLandmarkImageFailure: uploadLandmarkImageFailure()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchLandmarkDetails: (plantId, pipelineId, id) => dispatch(fetchLandmarkDetails(plantId, pipelineId, id)),
    createLandmarkHandler: (payload, plantId, pipelineId, id) => dispatch(createLandmarkHandler(payload, plantId, pipelineId, id)),
    uploadLandmarkImage: (image) => dispatch(uploadLandmarkImage(image))

  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({
  key: "addorEditPipeLineLandmark",
  reducer
});
const withSaga = injectSaga({ key: "addorEditPipeLineLandmark", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(AddorEditPipeLineLandmark);

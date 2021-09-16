/**
 *
 * AddOrEditPlant
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import {
  createPlantSuccess,
  createPlantFailure,
  getDetailsSuccess,
  getDetailsFailure,
  plantImageUplaod,
  plantImageUplaodFailure,
} from "./selectors";
import MessageModal from "../../components/MessageModal/Loadable";
import { createPlantHandler, fetchPlantDetails, uploadPlantImage } from "./actions";
import reducer from "./reducer";
import saga from "./saga";
import { FormattedMessage } from "react-intl";
import messages from "./messages";
import commonMessages from "../../messages";
import SkeletonLoader from "../../components/SkeletonLoader";
import Dropzone from "react-dropzone";
import 'react-phone-number-input/style.css'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'

import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

import moment from 'moment';

const format = 'HH:mm';

/* eslint-disable react/prefer-stateless-function */
export class AddOrEditPlant extends React.Component {
  state = {
    uploadedImage: "",
    mobilePhoneError: "",
    payload: {
      name: "",
      ownerName: "",
      ownerEmail: "",
      ownerPhone: "",
      plantImage: null,
      shifts: [{
        crewName: "",
        name: "",
        startTime: "00:00",
        endTime: "00:00"
      }],
    },
    phone: ""
  };

  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.fetchPlantDetails(this.props.match.params.id);
      this.setState({
        isLoading: true
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.createPlantSuccess &&
      nextProps.createPlantSuccess !== this.props.createPlantSuccess
    ) {
      this.setState({
        isLoading: false,
        isOpen: true,
        message: this.props.match.params.id ? (
          <FormattedMessage
            {...messages.plantUpdateMessage}
            children={message => message}
          />
        ) : (
            <FormattedMessage
              {...messages.plantCreateMessage}
              children={message => message}
            />
          ),
        type: "success",
        modalSuccess: "success"
      });
    }
    if (
      nextProps.createPlantFailure &&
      nextProps.createPlantFailure !== this.props.createPlantFailure
    ) {
      this.setState({
        isLoading: false,
        isOpen: true,
        message: nextProps.createPlantFailure,
        type: "error"
      });
    }
    if (
      nextProps.getDetailsSuccess &&
      nextProps.getDetailsSuccess !== this.props.getDetailsSuccess
    ) {
      this.setState({
        payload: nextProps.getDetailsSuccess,
        phone: nextProps.getDetailsSuccess.ownerPhone,
        isLoading: false
      });
    }
    if (
      nextProps.getDetailsFailure &&
      nextProps.getDetailsFailure !== this.props.getDetailsFailure
    ) {
      this.setState({
        isLoading: false,
        isOpen: true,
        message: nextProps.getDetailsFailure,
        type: "error"
      });
    }
    if (
      nextProps.plantImageUplaod &&
      nextProps.plantImageUplaod !== this.props.plantImageUplaod
    ) {
      let payload = JSON.parse(JSON.stringify(this.state.payload));
      payload.plantImage = nextProps.plantImageUplaod.name
      this.setState({
        payload,
      }, () => this.props.createPlantHandler(this.state.payload, this.props.match.params.id))
    }
    if (
      nextProps.plantImageUplaodFailure &&
      nextProps.plantImageUplaodFailure !== this.props.plantImageUplaodFailure
    ) {
      let payload = JSON.parse(JSON.stringify(this.state.payload))
      payload.plantImage = null;
      this.setState({
        payload,
        uploadedImage: "",
        isImageLoaded: false,
        isOpen: true,
        message: nextProps.plantImageUplaodFailure,
        type: "error"
      });
    }
  }

  onChangeTime(value, name, id) {
    let payload = JSON.parse(JSON.stringify(this.state.payload))
    payload.shifts[id][name] = value && value.format(format)
    this.setState({
      payload
    });
  }


  nameChangeHandler = event => {
    let payload = JSON.parse(JSON.stringify(this.state.payload))
    payload[event.target.id] = event.target.value;
    this.setState({
      payload
    });
  };

  shiftChangeHandler = event => {
    let id = event.target.id
    let name = event.target.name
    let payload = JSON.parse(JSON.stringify(this.state.payload))
    payload.shifts[id][name] = event.target.value
    this.setState({
      payload
    });
  }

  onDrop = acceptedFiles => {
    let payload = JSON.parse(JSON.stringify(this.state.payload))
    payload.plantImage = null;
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
      this.props.history.push("/managePlant");
    }
  };

  submitHandler = event => {
    event.preventDefault();
    let payload = JSON.parse(JSON.stringify(this.state.payload));
    payload.ownerPhone = this.state.phone;
    if (!this.state.mobilePhoneError) {
      this.setState({
        isLoading: true,
        payload,
      }, () => {
        if (this.state.uploadedImage)
          this.props.uploadPlantImage(this.state.uploadedImage)
        else
          this.props.createPlantHandler(payload, this.props.match.params.id)
      })
    }
  };

  addNewShift = (status, index) => {
    let payload = JSON.parse(JSON.stringify(this.state.payload))
    if (status === "add") {
      payload.shifts.push({
        crewName: "",
        name: "",
        startTime: "00:00",
        endTime: "00:00"
      })
    }
    else {
      payload.shifts.splice(index, 1)
    }
    this.setState({
      payload
    })
  }

  render() {
    return (
      <div className="appContent">
        <Helmet>
          <title>AddOrEditPlant</title>
          <meta name="description" content="Description of AddOrEditPlant" />
        </Helmet>

        <div className="pageBreadcrumb">
          <div className="flex-item fx-b70">
            <p className="pd-l-30">
              <span className="cursor-pointer" onClick={() => { this.props.history.push("/managePlant"); }}>
                <button className="btn btn-transparent">
                  <i className="far fa-long-arrow-left" />
                </button>
                <FormattedMessage {...commonMessages.managePlant} children={(message => message)} />
              </span>
            </p>
            <h5>
              {this.props.match.params.id ? (
                <FormattedMessage {...messages.editPlant} children={message => message} />
              ) : (
                  <FormattedMessage
                    {...messages.createPlant}
                    children={message => message}
                  />
                )}
            </h5>
          </div>
          <div className="flex-item fx-b30 text-right align-items-center" />
        </div>

        {this.state.isLoading ? <SkeletonLoader skeleton="skeletonNestedFormUpload" mode="fullView"/> :
          <form
            className="contentForm"
            onSubmit={this.submitHandler}
          >
            <h5 className="formHeader">
              {this.props.match.params.id ? (
                <FormattedMessage
                  {...messages.updatePlant}
                  children={message => message}
                />
              ) : (
                  <FormattedMessage
                    {...messages.createPlant}
                    children={message => message}
                  />
                )}
            </h5>
            <div className="form-group">
              <label className="form-label">
                <FormattedMessage {...commonMessages.name} children={message => message}/> :
                  <sup>
                  <i className="fas fa-asterisk" />
                </sup>
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
                <FormattedMessage {...commonMessages.ownerName} children={(message => message)} /> :
                  <sup>
                  <i className="fas fa-asterisk" />
                </sup>
              </label>
              <input
                value={this.state.payload.ownerName}
                onChange={this.nameChangeHandler}
                type="text"
                className="form-control"
                id="ownerName"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                <FormattedMessage {...commonMessages.ownerEmail} children={(message => message)} /> :
                  <sup>
                  <i className="fas fa-asterisk" />
                </sup>
              </label>
              <input
                value={this.state.payload.ownerEmail}
                onChange={this.nameChangeHandler}
                type="email"
                className="form-control"
                id="ownerEmail"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                <FormattedMessage {...messages.formOwnerPhone} children={(message => message)} /> :
                  <sup>
                  <i className="fas fa-asterisk" />
                </sup>
              </label>
              <PhoneInput
                className="form-control pd-5"
                value={this.state.phone}
                error={this.state.mobilePhoneError}
                required={true}
                onChange={phone => {
                  let mobilePhoneError = "Please input valid phone number"
                  if (isValidPhoneNumber(phone)) {
                    mobilePhoneError = ""
                  }
                  this.setState({ phone, mobilePhoneError })
                }}
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                <FormattedMessage {...messages.plantImage} children={(message => message)} />
                :
              </label>
              <div className="fx-b80">
                <div className="dropZoneOuterBox mr-0 w-100">
                  <Dropzone
                    className="dropZoneBox"
                    disablePreview={false}
                    multiple={false}
                    accept="image/*"
                    onDrop={this.onDrop.bind(this)}
                  >
                    <div className="dropZoneBoxContent">
                      <img src={require("../../assets/images/file.png")} />
                      <p>
                        {this.state.payload.plantImage ?
                          this.state.payload.plantImage.split('/')[2] :
                          this.state.uploadedImage ? (
                            this.state.uploadedImage.name
                          ) : (
                              <FormattedMessage {...commonMessages.dropzonemsg} children={(message => message)} />
                            )}
                      </p>
                    </div>
                  </Dropzone>
                  {this.state.payload.plantImage ?
                    <div className="dropZoneBoxPreview">
                      <img src={`${window.API_URL}api/public/static${this.state.payload.plantImage}`} />
                    </div> :
                    this.state.uploadedImage ?
                      <div className="dropZoneBoxPreview">
                        <img src={this.state.uploadedImage.preview} />
                      </div>
                      :
                      <div className="dropZoneBoxNoPreview">
                        <img src={require("../../assets/images/no_preview.png")} />
                        <p>
                          <FormattedMessage {...commonMessages.imgpreview} children={(message => message)} />
                        </p>
                      </div>
                  }
                </div>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">
                <FormattedMessage {...commonMessages.plantShift} children={(message => message)} />
                <sup className="mr-r-7">
                  <i className="fas fa-asterisk" />
                </sup>
                :
              </label>
              <div className="fx-b80">
                {this.state.payload.shifts && this.state.payload.shifts.map((val, index) => {
                  return <div key={index} className="card newCustomCard">
                    <div className="card-header">
                      <div className="flex align-items-center">
                        <div className="fx-b70">
                          <h4 className="cardTitle">
                            <FormattedMessage {...commonMessages.plantShift} children={(message => message)} />
                          </h4>
                        </div>
                        <div className="fx-b30 text-right">
                          {this.state.payload.shifts.length > 1 &&
                            <button
                              type="button"
                              onClick={() => this.addNewShift("delete", index)}
                              className="btn-transparent text-danger"
                            >
                              <i className="far fa-trash-alt" />
                            </button>
                          }
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="flex">
                        <div className="fx-b50">
                          <div className="form-group">
                            <label className="form-label fx-b30">
                              <FormattedMessage {...commonMessages.shiftName} children={(message => message)} />
                              <sup className="mr-r-7">
                                <i className="fas fa-asterisk" />
                              </sup>
                              :
                              </label>
                            <input
                              value={val.name}
                              onChange={this.shiftChangeHandler}
                              id={index}
                              type="text"
                              name="name"
                              className="form-control fx-b70"
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label fx-b30">
                              <FormattedMessage {...commonMessages.startTime} children={(message => message)} />
                              <sup className="mr-r-7">
                                <i className="fas fa-asterisk" />
                              </sup>
                              :
                              </label>

                            <div className="customTimePickerBox fx-b70">
                              <TimePicker
                                showSecond={false}
                                value={moment(val.startTime, 'hh:mm')}
                                onChange={(value) => this.onChangeTime(value, "startTime", index)}
                                format={format}
                                use12Hours={false}
                                allowEmpty={false}
                              />
                            </div>

                          </div>
                        </div>
                        <div className="fx-b50">
                          <div className="form-group">
                            <label className="form-label fx-b30">
                              <FormattedMessage {...commonMessages.crewName} children={(message => message)} />
                              <sup className="mr-r-7">
                                <i className="fas fa-asterisk" />
                              </sup>
                              :
                              </label>
                            <input
                              value={val.crewName}
                              onChange={this.shiftChangeHandler}
                              name="crewName"
                              type="text"
                              id={index}
                              className="form-control fx-b70"
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label fx-b30">
                              <FormattedMessage {...commonMessages.endTime} children={(message => message)} />
                              <sup className="mr-r-7">
                                <i className="fas fa-asterisk" />
                              </sup>
                              :
                              </label>
                            <div className="customTimePickerBox fx-b70">
                              <TimePicker
                                showSecond={false}
                                value={moment(val.endTime, 'hh:mm')}
                                onChange={(value) => this.onChangeTime(value, "endTime", index)}
                                format={format}
                                use12Hours={false}
                                allowEmpty={false}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                })
                }
              </div>
              <div className="fx-b100 text-right mt-3">
                <button
                  type="button"
                  className="btn btn-create"
                  onClick={() => this.addNewShift("add")}
                >
                  <i className="far fa-plus" />
                </button>
              </div>
            </div>
            <div className="form-group justify-content-end mt-3">
              <button id="savePlant" className="btn btn-danger">
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

AddOrEditPlant.propTypes = {
  dispatch: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  createPlantSuccess: createPlantSuccess(),
  createPlantFailure: createPlantFailure(),
  getDetailsSuccess: getDetailsSuccess(),
  getDetailsFailure: getDetailsFailure(),
  plantImageUplaod: plantImageUplaod(),
  plantImageUplaodFailure: plantImageUplaodFailure(),
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    createPlantHandler: (payload, id) => dispatch(createPlantHandler(payload, id)),
    fetchPlantDetails: id => dispatch(fetchPlantDetails(id)),
    uploadPlantImage: (image) => dispatch(uploadPlantImage(image)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "addOrEditPlant", reducer });
const withSaga = injectSaga({ key: "addOrEditPlant", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(AddOrEditPlant);

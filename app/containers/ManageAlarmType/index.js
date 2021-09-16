/**
 *
 * ManageAlarmType
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { FormattedMessage } from "react-intl";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { getAlarmType, addAlarmType, getAlarmCategory } from './actions'
import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import {
  addAlarmsTypeSuccess,
  addAlarmsTypeFailure,
  getAlarmsTypeSuccess,
  getAlarmsTypeFailure,
  getAlarmsCategorySuccess,
  getAlarmsCategoryFailure
} from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import messages from "./messages";
import commonMessages from "../../messages";
import SkeletonLoader from "../../components/SkeletonLoader";
import MessageModal from "../../components/MessageModal/Loadable";
import NoDataFound from "../../components/NoDataFound";

/* eslint-disable react/prefer-stateless-function */
export class ManageAlarmType extends React.Component {

  state = {
    isLoading: true,
    category: "",
    isCategorySelected: false,
    isValueSelected: false,
    isAlready: false,
    payload: {
      types: []
    }
  };

  componentWillMount() {
    this.props.getAlarmType()
    this.props.getAlarmCategory()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.getAlarmsTypeSuccess && nextProps.getAlarmsTypeSuccess !== this.props.getAlarmsTypeSuccess) {
      this.setState({
        payload: nextProps.getAlarmsTypeSuccess,
        isLoading: false,
      })
    }
    if (nextProps.getAlarmsCategorySuccess && nextProps.getAlarmsCategorySuccess !== this.props.getAlarmsCategorySuccess) {
      this.setState({
        alarmCategory: nextProps.getAlarmsCategorySuccess,
        isLoading: false,
      })
    }
    if (nextProps.addAlarmsTypeSuccess && nextProps.addAlarmsTypeSuccess !== this.props.addAlarmsTypeSuccess) {
      this.setState({
        isLoading: false,
        isOpen: true,
        message: <FormattedMessage {...messages.submitSuccess} children={(message => message)} />,
        type: "success",
      });
    }

    ['getAlarmsTypeFailure', 'getAlarmsCategoryFailure', 'addAlarmsTypeFailure'].map(val => {
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

  handelSave = event => {
    event.preventDefault();
    let payload = JSON.parse(JSON.stringify(this.state.payload))
    this.setState({
      isLoading: true,
      isCategorySelected: false,
      isValueSelected: false,
      isAlready: false,
    }, () => { this.props.addAlarmType(payload) })
  }

  modalCloseHandler = () => {
    this.setState({
      isOpen: false,
      message: "",
      type: "",
      isCategorySelected: false,
      isValueSelected: false,
      isAlready: false,
    }, () => { this.props.getAlarmType() });
  };

  handleRemoveTag = index => {
    let payload = JSON.parse(JSON.stringify(this.state.payload))
    payload.types.splice(index, 1);
    this.setState({ payload, isAlready: false, isCategorySelected: false, isValueSelected: false })
  }

  handleKeyUp = event => {
    event.preventDefault();
    if (!this.state.category) {
      this.setState({ isCategorySelected: true, isAlready: false })
    }
    else if (!this.refs.alarmType.value) {
      this.setState({ isValueSelected: true, isAlready: false })
    }
    else if (this.state.category && this.refs.alarmType.value) {
      let payload = JSON.parse(JSON.stringify(this.state.payload));
      let newTag = this.refs.alarmType.value.trim();
      if (payload.types.length == 0) {
        payload.types.push({
          type: newTag,
          category: this.state.category
        })
        this.setState({
          category: ""
        })
      }
      else {
        if (payload.types.some(temp => temp.type == newTag.toLowerCase() && temp.category == this.state.category)) {
          this.setState({ isAlready: true })
        }
        else {
          payload.types.push({
            type: newTag,
            category: this.state.category
          })
          this.setState({
            category: "",
            isAlready: false
          })
        }
      }
      this.refs.alarmType.value = ""
      this.setState({ payload, category: "", isValueSelected: false });
    }
  }

  onChangeHandler = event => {
    let category = event.target.id
    this.setState({
      category,
      isCategorySelected: false,
      isValueSelected: false,
      isAlready: false
    })
  }

  render() {
    return (
      <div className="appContent">
        <Helmet>
          <title>ManageAlarmType</title>
          <meta name="description" content="Description of ManageAlarmType" />
        </Helmet>

        <div className="pageBreadcrumb">
          <div className="flex-item fx-b70">
            <p><FormattedMessage {...commonMessages.manageAlarms} children={(message => message)} /></p>
            <h5>
              <FormattedMessage {...messages.allAvailableAlarmType} children={(message => message)} />
              {this.state.isLoading ? null : <span className="customCountBadge">
                {this.state.payload.types.length}
              </span>}
            </h5>
          </div>
          <div className="flex-item fx-b30" />
        </div>
    
          <div className="contentForm addAlarm">
            <div className="card">
              <div className="card-header">
                <form className="flex" onSubmit={this.handleKeyUp}>
                  <div className="fx-b50">
                    <div className="createAlarm">
                      <p className="categoryErrorMessage">{this.state.isCategorySelected ? "Please select Category" : null}</p>
                      <p className="categoryErrorMessage">{this.state.isValueSelected ? "Enter alarm type" : null}</p>
                      <p className="categoryErrorMessage">{this.state.isAlready ? "Alarm type already exist" : null}</p>
                      <div className="dropdown selectAlarmCategory">
                        <button type="button" className="btn dropdown-toggle" data-toggle="dropdown">
                          {this.state.category == "" ?
                            <React.Fragment><span className="typeIcon"><img src={require('../../assets/images/question.png')} /></span><FormattedMessage {...messages.selectCategory} children={(message => message)} /></React.Fragment>
                            : <React.Fragment><span className="typeIcon"><img src={`${window.API_URL}api/public/static/components/${this.state.category.toLowerCase()}.png`}
                            /></span> {this.state.category} </React.Fragment>}
                        </button>
                        <ul className="dropdown-menu">
                          {this.state.alarmCategory && this.state.alarmCategory.map((val, index) => {
                            return <li key={index} className="dropdown-item ">
                              <label className="customRadioButton">
                                <input name="category" checked={this.state.category == val} id={val} onChange={this.onChangeHandler} type="radio" />
                                <span className="radiomark" />
                                <span className="radioText">
                                  <span className="radioImg">
                                    <img src={`${window.API_URL}api/public/static/components/${val.toLowerCase()}.png`} />
                                  </span>
                                  {val}
                                </span>
                              </label>
                            </li>
                          })}
                        </ul>
                      </div>
                      <div className="form-group">
                        <input className="form-control" placeholder="Enter Alarm Name" ref="alarmType" />
                      </div>
                      <button type="submit" className="btn btn-transparent">
                        <i className="fa fa-check" aria-hidden="true"></i>
                      </button>
                    </div>
                  </div>
                  <div className="fx-b50"></div>
                </form>
              </div>
              {this.state.isLoading ? <SkeletonLoader skeleton="skeletonAlarmType" /> :
              <div className="card-body">
              {this.state.payload.types.length > 0 ?
                <ul className="alarmTypeList">
                  {this.state.payload.types && this.state.payload.types.map((val, index) => {
                    return <li className="alarmType" key={index}>
                      <span className="alarmIcon">
                        <img src={`${window.API_URL}api/public/static/components/${val.category.toLowerCase()}.png`} className="alarmImage" />
                      </span>
                      {val.type}
                      <button type="button" className="btn btn-transparent" onClick={() => this.handleRemoveTag(index)}><i className="fas fa-times"></i></button>
                    </li>
                  })}
                </ul>
                :
                <NoDataFound noDataCommonMsg={false} skeleton="skeletonAlarmType" dataName="alarm type" dataImg="notification" />
              }
              </div>
              }
            </div>
            <div className="form-group justify-content-end mt-3">
              <button id="saveAlarmType" type="button" className="btn btn-danger" onClick={this.handelSave}>
                <i className="far fa-check-circle" />
                <FormattedMessage {...commonMessages.save} children={(message => message)} />
              </button>
            </div>
          </div>
        {this.state.isOpen ? (
          <MessageModal
            type={this.state.type}
            message={this.state.message}
            onClose={this.modalCloseHandler}
          />
        ) : null
        }
      </div>
    );
  }
}

ManageAlarmType.propTypes = {
  dispatch: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  getAlarmsTypeSuccess: getAlarmsTypeSuccess(),
  getAlarmsTypeFailure: getAlarmsTypeFailure(),
  addAlarmsTypeSuccess: addAlarmsTypeSuccess(),
  addAlarmsTypeFailure: addAlarmsTypeFailure(),
  getAlarmsCategorySuccess: getAlarmsCategorySuccess(),
  getAlarmsCategoryFailure: getAlarmsCategoryFailure()
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getAlarmType: () => dispatch(getAlarmType()),
    getAlarmCategory: () => dispatch(getAlarmCategory()),
    addAlarmType: (types) => dispatch(addAlarmType(types))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "manageAlarmType", reducer });
const withSaga = injectSaga({ key: "manageAlarmType", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(ManageAlarmType);

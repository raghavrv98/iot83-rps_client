/**
 *
 * ManagePasswordRequest
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { FormattedMessage } from "react-intl";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { passwordRequestList } from "./actions";
import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import { getPasswordListSuccess, getPasswordListFailure } from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import messages from "./messages";
import commonMessages from "../../messages";
import SkeletonLoader from "../../components/SkeletonLoader";
import MessageModal from "../../components/MessageModal/Loadable";
import { showInitials } from "../../utils/commonUtils";
import NoDataFound from "../../components/NoDataFound";
import moment from 'moment';

export class ManagePasswordRequest extends React.Component {
  state = {
    managePasswordList: [],
    isLoading: true,
    payload: {
      userId: ""
    },
    id: "",
  };
  componentDidMount() {
    this.props.passwordRequestList(this.state.id, this.state.payload);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.getPasswordListSuccess &&
      nextProps.getPasswordListSuccess !== this.props.getPasswordListSuccess
    ) {
      if (nextProps.getPasswordListSuccess.data) {
        this.setState({
          isLoading: false,
          managePasswordList: nextProps.getPasswordListSuccess.data
        });
      } else {
        this.setState({
          isLoading: false,
          message: nextProps.getPasswordListSuccess,
          isOpen: true,
          type: "success"
        });
      }
    }

    if (
      nextProps.getPasswordListFailure &&
      nextProps.getPasswordListFailure !== this.props.getPasswordListFailure
    ) {
      this.setState({
        isLoading: false,
        isOpen: true,
        message: nextProps.getPasswordListFailure,
        type: "error"
      });
    }
  }

  handelAproval = (id, userId) => {
    this.setState(
      {
        payload: {
          userId: userId
        },
        id: id
      },
      () => this.props.passwordRequestList(this.state.id, this.state.payload)
    );
  };
  modalCloseHandler = () => {
    this.setState(
      {
        isOpen: false,
        message: "",
        type: "",
        id: "",
        payload: {},
        isLoading: true
      },
      () => this.props.passwordRequestList(this.state.id, this.state.payload)
    );
  };

  showHideAgentIdHandler(id) {
    let managePasswordList = JSON.parse(
      JSON.stringify(this.state.managePasswordList)
    );
    managePasswordList.map(pwd => {
      if (pwd.id === id) {
        pwd.show = !pwd.show;
      }
    });
    this.setState({ managePasswordList });
  }

  remaningTime = (startTime, ttl) => {
    let remaningTime;
    let currentDate = new Date().getTime();
    let date = new Date(startTime);
    date = date.setMinutes(date.getMinutes() + ttl);
    let timeDiff = date - currentDate;
    if (timeDiff > 0) {
      let msec = timeDiff;
      let dd = Math.floor(msec / (1000 * 60 * 60 * 24));
      msec -= dd * 1000 * 60 * 60 * 24;
      let hh = Math.floor(msec / (1000 * 60 * 60));
      msec -= hh * 1000 * 60 * 60;
      let mm = Math.floor(msec / 1000 / 60);
      msec -= mm * 1000 * 60;
      let ss = Math.floor(msec / 1000);
      if (ss) {
        remaningTime = `${ss}s`;
        if (mm) {
          remaningTime = `${mm}m${remaningTime}`;
          if (hh) {
            remaningTime = `${hh}h${remaningTime}`;
            if (dd) {
              remaningTime = `${dd}d${remaningTime}`;
            }
          }
        }
      }
      return remaningTime;
    } else {
      return <div className="text-danger" >Expired </div>;
    }
  };

  copyTest = (temporaryPassword, requestId) => {
    let tempElement = document.createElement("textarea");
    tempElement.value = temporaryPassword;
    document.body.appendChild(tempElement);
    tempElement.select();
    document.execCommand("copy");
    document.body.removeChild(tempElement);
    this.setState({
      requestId
    })
  };

  reloadHandler = () => {
    this.props.passwordRequestList(this.state.id, this.state.payload); 
  }

  render() {
    return (
      <div className="appContent">
        <Helmet>
          <title>ManagePasswordRequest</title>
          <meta
            name="description"
            content="Description of ManagePasswordRequest"
          />
        </Helmet>

        <div className="pageBreadcrumb">
          <div className="flex-item fx-b70">
            <p><FormattedMessage {...messages.managePasswordRequest} children={(message => message)} /></p>
            <h5><FormattedMessage {...messages.allAvailableRequest} children={(message => message)} /></h5>
          </div>
        </div>
        {this.state.isLoading ? <SkeletonLoader skeleton="skeletonListCount" mode="fullView"/> :
          <React.Fragment>
            {this.state.managePasswordList.length > 0 ?
              <ul className="appListView">
                {this.state.managePasswordList.map((managePasswordList, index) => (
                  <li key={managePasswordList.id}>
                    <div className="listIcon">
                      <div className="contentIcon">
                        <i className="far fa-user-lock"></i>
                        <sub>
                          <h6>{showInitials(managePasswordList.userName)}</h6>
                        </sub>
                      </div>
                    </div>
                    <div className="listContent">
                      <h6><FormattedMessage {...commonMessages.name} children={(message => message)} /></h6>
                      <p>{managePasswordList.userName}</p>
                    </div>
                    <div className="listContent">
                      <h6><FormattedMessage {...commonMessages.email} children={(message => message)} /></h6>
                      <p>{managePasswordList.email}</p>
                    </div>
                    <div className="listContent">
                      <h6><FormattedMessage {...messages.startTime} children={(message => message)} /></h6>
                      <p>{managePasswordList.createdAt ? moment(managePasswordList.createdAt).format("DD MMM YYYY HH:mm:ss") : "----"}</p>
                    </div>
                    <div className="listContent">
                      <h6><FormattedMessage {...messages.remaningTime} children={(message => message)} /></h6>
                      <p>
                        {managePasswordList.startTime
                          ? this.remaningTime(
                            managePasswordList.startTime,
                            managePasswordList.ttl
                          )
                          : "----"}
                      </p>
                    </div>
                    <div className="listContent">
                      <h6><FormattedMessage {...messages.temporaryPassword} children={(message => message)} /></h6>
                      <p>
                        {managePasswordList.password ?
                          managePasswordList.show ? managePasswordList.password : "******" : <>----</>}
                        {this.state.managePasswordList[index]["password"] === null ? null :
                          <span className="button-group mr-l-10">
                            <button
                              className="btn-transparent text-primary"
                              onClick={() =>
                                this.showHideAgentIdHandler(managePasswordList.id)
                              }
                              data-tooltip
                              data-tooltip-text= {managePasswordList.show ? "Hide" : "Show"}
                            >
                              <i className={managePasswordList.show ? "far fa-eye-slash" : "far fa-eye"} />
                            </button>
                            <button type="button" onClick={() => this.copyTest(managePasswordList.password, index)} className="btn-transparent text-info" 
                            data-tooltip
                            data-tooltip-text= "Copy"
                            >
                              <i className="far fa-copy" />
                            </button>
                            <span className="textCopied">{index === this.state.requestId ? "Copied" : null}</span>
                          </span>
                        }
                      </p>
                    </div>
                    <div className="listContent">
                      <h6><FormattedMessage {...commonMessages.action} children={(message => message)} /></h6>
                      {managePasswordList.password ?
                        <button
                          type="button"
                          className="btn-list"
                          data-tip
                          data-test="approve"
                        >
                          <i className="far fa-user-check" />
                          <FormattedMessage {...messages.approved} children={(message => message)} />
                        </button>
                        :
                        <button
                          type="button"
                          className="btn-list"
                          data-test="approved"
                          onClick={() =>
                            this.handelAproval(
                              managePasswordList.id,
                              managePasswordList.userId
                            )
                          }
                        >
                          <i className="far fa-unlock-alt" />
                          <FormattedMessage {...messages.approve} children={(message => message)} />
                        </button>
                      }
                    </div>
                  </li>))}
              </ul>
              :
              <NoDataFound skeleton="skeletonListCount" mode="fullView" dataName="password request" dataImg="password" button="reload" reloadHandler={() => {this.props.passwordRequestList(this.state.id, this.state.payload)}} />
            }
          </React.Fragment>}
        {this.state.isOpen ?
          <MessageModal
            type={this.state.type}
            message={this.state.message}
            onClose={this.modalCloseHandler}
          />
          : null}
      </div>
    );
  }
}

ManagePasswordRequest.propTypes = {
  dispatch: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  getPasswordListSuccess: getPasswordListSuccess(),
  getPasswordListFailure: getPasswordListFailure()
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    passwordRequestList: (id, payload) =>
      dispatch(passwordRequestList(id, payload))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "managePasswordRequest", reducer });
const withSaga = injectSaga({ key: "managePasswordRequest", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(ManagePasswordRequest);

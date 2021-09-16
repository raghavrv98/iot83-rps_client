/**
 *
 * ManageRoleNavigation
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { FormattedMessage } from "react-intl";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import MessageModal from "../../components/MessageModal/Loadable";

import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import {
  fetchMenus, fetchMenusError,
  fetchAllMenus, fetchAllMenusError,
  saveMenuSuccess, saveMenuError
} from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import { getMenus, getAllMenus, saveMenu } from "./actions";
import messages from "./messages";
import commonMessages from '../../messages';
import ReactTooltip from 'react-tooltip';
import SkeletonLoader from "../../components/SkeletonLoader";

/* eslint-disable react/prefer-stateless-function */
export class ManageRoleNavigation extends React.Component {

  state = {
    isOpen: false,
    allMenus: [],
    roleMenus: [],
    isLoading: true,
  }

  componentWillMount() {
    this.props.getMenus(this.props.match.params.roleId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fetchMenus && nextProps.fetchMenus !== this.props.fetchMenus) {
      this.setState({
        roleMenus: nextProps.fetchMenus.menuId
      })
      this.props.getAllMenus();
    }
    if (nextProps.fetchAllMenus && nextProps.fetchAllMenus !== this.props.fetchAllMenus) {
      this.setState({
        isLoading: false,
        allMenus: nextProps.fetchAllMenus ? nextProps.fetchAllMenus : [],
      })
    }
    if (nextProps.saveMenuSuccess && nextProps.saveMenuSuccess !== this.props.saveMenuSuccess) {
      this.setState({
        isLoading: false,
        isOpen: true,
        message: <FormattedMessage {...messages.saveMenuSuccessMessage} children={(message => message)} />,
        type: "success",
        modalFor: "submitSuccess"
      })
    }
    ['fetchMenusError', 'fetchAllMenusError'].map(val => {
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

  stateChangeHandler = event => {
    let roleMenus = JSON.parse(JSON.stringify(this.state.roleMenus));
    let allMenus = JSON.parse(JSON.stringify(this.state.allMenus));
    if (event.target.checked) {
      roleMenus.push(event.target.value)
      if (allMenus.find(val => val.id === event.target.value && val.subMenus.length > 0)) {
        let sumMen = allMenus.find(findItem => findItem.id === event.target.value).subMenus
        if (sumMen.length > 0) {
          sumMen.map(item => {
            roleMenus.push(item.id)
          })
        }
      } else if (allMenus.filter(val => val.subMenus.some(valSub => valSub.id === event.target.value)).length > 0) {
        let gotItem = allMenus.find(val => val.subMenus.some(valSub => valSub.id === event.target.value))
        if (!roleMenus.includes(gotItem.id)) {
          roleMenus.push(gotItem.id)
        }
      }
    } else {
      roleMenus.splice(roleMenus.indexOf(event.target.value), 1);
      if (allMenus.some(val => val.id === event.target.value)) {
        let sumMen = allMenus.find(findItem => findItem.id === event.target.value).subMenus
        if (sumMen.length > 0) {
          sumMen.map(item => {
            if (roleMenus.includes(item.id)) {
              roleMenus.splice(roleMenus.indexOf(item.id), 1)
            }
          })
        }
      } else if (allMenus.filter(val => val.subMenus.some(valSub => valSub.id === event.target.value)).length > 0) {
        let gotItem = allMenus.find(val => val.subMenus.some(valSub => valSub.id === event.target.value))
        if (!gotItem.subMenus.some(val => roleMenus.includes(val.id))) {
          roleMenus.splice(roleMenus.indexOf(gotItem.id), 1)
        }
      }
    }
    this.setState({
      roleMenus,
    })
  }

  modalCloseHandler = () => {
    this.setState({
      isOpen: false,
      message: "",
      type: ""
    })
    if (this.state.modalFor === "submitSuccess") {
      this.props.history.push(`/manageRoles`);
    }
  }

  render() {
    return (
      <div className="appContent">
        <Helmet>
          <title>ManageRoleNavigation</title>
          <meta
            name="description"
            content="Description of ManageRoleNavigation"
          />
        </Helmet>
        <div className="pageBreadcrumb">
          <div className="flex-item fx-b70">
            <p className="pd-l-30">
              <span className="cursor-pointer" onClick={() => { this.props.history.push(`/manageRoles`); }}>
                <button className="btn btn-transparent">
                  <i className="far fa-long-arrow-left"></i>
                </button><FormattedMessage {...commonMessages.manageRoles} children={(message => message)} />
              </span>
            </p>
            <h5><FormattedMessage {...messages.manageRoleNavigation} children={(message => message)} />
            </h5>
          </div>
          <div className="flex-item fx-b30 text-right align-items-center">

          </div>
        </div>

        {this.state.isLoading ? <SkeletonLoader skeleton="skeletonManageNavigation" mode="fullView"/> :
          this.state.allMenus.length > 0 && <React.Fragment>
            <ul className="manageRollNavigation">
              {this.state.allMenus.map(menu => {
                return <li key={menu.id}>
                  <label className="customCheckbox">
                    <input
                      checked={this.state.roleMenus.includes(menu.id)}
                      onChange={this.stateChangeHandler}
                      id={`menu_${menu.id}`}
                      value={menu.id}
                      type="checkbox"
                    />
                    <span className="checkmark" />
                  </label>
                  <p className={menu.subMenus.length > 0 ? "cursor-pointer collapsed" : ""} data-toggle="collapse" data-target={'#collapse' + menu.id}>{menu.navName}{menu.subMenus.length > 0 && <i className="fas fa-chevron-down"></i>}</p>
                  {menu.subMenus.length > 0 && <ul id={'collapse' + menu.id} className="collapse">
                    {menu.subMenus.map(value => {
                      return <li key={value.id}>
                        <label className="customCheckbox">
                          <input
                            checked={this.state.roleMenus.includes(value.id)}
                            id={`subMenus_${value.id}`}
                            onChange={this.stateChangeHandler}
                            value={value.id}
                            type="checkbox"
                          />
                          <span className="checkmark" />
                        </label>
                        <p>{value.navName}</p>
                      </li>
                    })}
                  </ul>}
                </li>
              })}
            </ul>
            <div className="text-right mt-3 ">
              <button id="saveRoleNavigation" type="button" onClick={() => this.setState({ isLoading: true }, () => this.props.saveMenu(this.state.roleMenus, this.props.match.params.roleId))} className="btn btn-danger">
                <i className="far fa-check-circle" />
                <FormattedMessage {...commonMessages.save} children={(message => message)} />
              </button>
            </div>
          </React.Fragment>}

        {this.state.isOpen ? <MessageModal type={this.state.type} message={this.state.message} onClose={this.modalCloseHandler} /> : null}
      </div>
    );
  }
}

ManageRoleNavigation.propTypes = {
  dispatch: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  fetchMenus: fetchMenus(),
  fetchMenusError: fetchMenusError(),
  fetchAllMenus: fetchAllMenus(),
  fetchAllMenusError: fetchAllMenusError(),
  saveMenuSuccess: saveMenuSuccess(),
  saveMenuError: saveMenuError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getMenus: (id) => dispatch(getMenus(id)),
    getAllMenus: () => dispatch(getAllMenus()),
    saveMenu: (payload, id) => dispatch(saveMenu(payload, id))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "manageRoleNavigation", reducer });
const withSaga = injectSaga({ key: "manageRoleNavigation", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(ManageRoleNavigation);

/**
 *
 * AddOrEditRole
 *
 */

import React from "react";
import { Helmet } from "react-helmet";
import { compose } from "redux";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { onSubmitHandler, getRoleDetails, getPermissions, getEntitlements } from './actions';
import {
    getSubmitSuccess, getSubmitError,
    getRoleDetailsError, getRoleDetailsSuccess,
    getPermissionsDetails, getPermissionsFailure,
    getEntitlementsFailure, getEntitlementsSuccess,
} from './selectors';
import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import reducer from "./reducer";
import saga from "./saga";
import MessageModal from "../../components/MessageModal/Loadable";
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import commonMessage from '../../messages';
import SkeletonLoader from "../../components/SkeletonLoader";

/* eslint-disable react/prefer-stateless-function */
export class AddOrEditRole extends React.Component {
    state = {
        isLoading: true,
        isOpen: false,
        permissions: false,
        entitlements: [],
        permission: {},
        allPermission: [],
        payload: {
            description: "",
            name: "",
            roleEntitlement: [{
                permissions: [
                    "ALL"
                ],
                resource: "PROFILE",
                minimumPermissions: ""
            }]
        },
    }

    componentDidMount() {
        this.props.getPermissions();
    }

    componentWillReceiveProps(nextprops) {
        if (nextprops.submitSuccess && nextprops.submitSuccess !== this.props.submitSuccess) {
            this.setState({
                isLoading: false,
                isOpen: true,
                message: this.props.match.params.id ? <FormattedMessage {...messages.updateMessageHandler} /> : <FormattedMessage {...messages.submitSuccessMessage} />,
                type: "success",
                modalSuccess: "success"
            });
        }

        if (nextprops.roleDetails && nextprops.roleDetails !== this.props.roleDetails) {
            let entitlements = JSON.parse(JSON.stringify(this.state.entitlements))
            if (nextprops.roleDetails.roleEntitlementDTOList.filter(val => val.resource !== "PROFILE").length > 0) {
                if (nextprops.roleDetails.roleEntitlementDTOList.some(item => item.resource === "ALL")) {
                    entitlements.map(val => {
                        val.permissions = ["READ", "CREATE", "UPDATE", "DELETE", "ALL"]
                        val.minPermissions = []
                    })
                    nextprops.roleDetails.roleEntitlementDTOList.map(val => {
                        entitlements.map(item => {
                            item.minPermissions = val.minimumPermissions[0] == "ALL" ? ["READ", "CREATE", "UPDATE", "DELETE", "ALL"] : val.minimumPermissions || [];
                        })
                    })
                    this.setState({
                        entitlements,
                        permissions: true,
                        allPermission: [{ resource: "ALL", permissions: ["ALL"] }],
                    })
                } else {
                    nextprops.roleDetails.roleEntitlementDTOList.map(val => {
                        if (val.resource !== "PROFILE") {
                            entitlements.filter(item =>
                                item.resource === val.resource
                            )[0].permissions = val.permissions[0] == "ALL" ? ["READ", "CREATE", "UPDATE", "DELETE", "ALL"] : val.permissions;

                            entitlements.filter(item =>
                                item.resource === val.resource
                            )[0].minPermissions = val.minimumPermissions[0] == "ALL" ? ["READ", "CREATE", "UPDATE", "DELETE", "ALL"] : val.minimumPermissions || [];
                        }
                    })

                    nextprops.roleDetails.roleEntitlement = nextprops.roleDetails.roleEntitlementDTOList
                    this.setState({
                        permissions: true,
                        entitlements,
                    })
                }
            }

            this.setState({
                isLoading: false,
                payload: nextprops.roleDetails,
            })
        }

        if (nextprops.getPermissionsDetails && nextprops.getPermissionsDetails !== this.props.getPermissionsDetails) {
            let permission = {}
            nextprops.getPermissionsDetails.map((val, index) => {
                let obj = []
                for (let i = 0; i <= index; i++) {
                    obj.push(nextprops.getPermissionsDetails[i])
                }
                permission[val] = obj;
            })
            this.setState({
                permission,
            }, () => this.props.getEntitlements())
        }

        if (nextprops.getEntitlementsSuccess && nextprops.getEntitlementsSuccess !== this.props.getEntitlementsSuccess) {
            let entitlements = [];
            nextprops.getEntitlementsSuccess.map(val => {
                if (!["ALL", "PROFILE"].includes(val)) {
                    let obj = {
                        resource: val, permissions: []
                    }
                    entitlements.push(obj);
                }
            })
            this.setState({
                entitlements,
                isLoading: this.props.match.params.id
            }, () => { this.props.match.params.id && this.props.getRoleDetails(this.props.match.params.id) })
        }
        ['submitError', 'roleDetailsError', 'getPermissionsFailure', 'getEntitlementsFailure'].map(val => {
            this.errorSetStateHandler(nextprops[val], this.props[val]);
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

    inputChangeHandler = event => {
        let payload = JSON.parse(JSON.stringify(this.state.payload));
        payload[event.target.id] = event.target.value;
        this.setState({
            payload
        })
    }

    onSubmitHandler = () => {
        let payload = JSON.parse(JSON.stringify(this.state.payload))
        if (this.state.payload.roleEntitlementDTOList) {
            delete this.state.payload.roleEntitlementDTOList
        }
        let roleEntitlement = [];
        let entitlements = JSON.parse(JSON.stringify(this.state.entitlements));
        let allPermission = JSON.parse(JSON.stringify(this.state.allPermission));
        if (this.state.permissions) {
            if (allPermission.length > 0) {
                payload.roleEntitlement = allPermission;
            } else {
                entitlements.map(val => {
                    if (val.permissions.length > 0) {
                        if (val.permissions.length === 5) {
                            val.permissions = ["ALL"]
                            roleEntitlement.push(val)
                        }
                        else
                            roleEntitlement.push(val)
                    }
                })
                payload.roleEntitlement = roleEntitlement;
            }
        }
        this.setState({ isLoading: true }, () => this.props.onSubmitHandler(payload, this.props.match.params.id))
    }

    modalCloseHandler = () => {
        this.setState({
            isOpen: false,
            message: "",
            type: ""
        });
        if (this.state.modalSuccess === "success") {
            this.props.history.push('/manageRoles')
        }
    }

    stateChangeHandler = event => {
        let allPermission = JSON.parse(JSON.stringify(this.state.allPermission));
        let entitlements = JSON.parse(JSON.stringify(this.state.entitlements));
        if (!event.target.checked) {
            allPermission = [];
            entitlements.map(val => val.permissions = []);
        }
        this.setState({
            permissions: event.target.checked,
            allPermission,
            entitlements,
        })
    }

    nameChangeHandler = (event, index) => {
        let entitlements = JSON.parse(JSON.stringify(this.state.entitlements));
        let per = JSON.parse(JSON.stringify(this.state.permission))
        if (event.target.checked)
            entitlements[index].permissions = per[event.target.value]
        else
            entitlements[index].permissions.splice(entitlements[index].permissions.indexOf(event.target.value), entitlements[index].permissions.length)
        this.setState({
            entitlements,
            allPermission: [],
        })
    }

    allPermission = event => {
        let entitlements = JSON.parse(JSON.stringify(this.state.entitlements));
        let per = JSON.parse(JSON.stringify(this.state.permission))
        if (event.target.checked) {
            entitlements.map(val => {
                val.permissions = per.ALL || [];
            });
        } else {
            entitlements.map(val => {
                val.permissions = val.minPermissions || [];
            });
        }
        this.setState({
            entitlements,
            allPermission: event.target.checked ? [{ resource: 'ALL', permissions: ["ALL"] }] : [],
        })
    }

    render() {
        return (
            <div className="appContent">
                <Helmet>
                    <title>AddOrEditRole</title>
                    <meta name="description" content="Description of AddOrEditRole" />
                </Helmet>

                <div className="pageBreadcrumb">
                    <div className="flex-item fx-b70">
                        <p className="pd-l-30">
                            <span className="cursor-pointer" onClick={() => { this.props.history.push('/manageRoles'); }} >
                                <button className="btn btn-transparent">
                                    <i className="far fa-long-arrow-left"></i>
                                </button>
                                <FormattedMessage {...messages.title} children={message => message} />
                            </span>
                        </p>
                        <h5>
                            {this.props.match.params.id ? <FormattedMessage {...messages.headingEdit} children={message => message} /> :
                                <FormattedMessage {...messages.titleCreateRole} children={message => message} />}
                        </h5>
                    </div>
                    <div className="flex-item fx-b30 text-right align-items-center"></div>
                </div>

                {this.state.isLoading ?
                    <SkeletonLoader skeleton="skeletonFormTableView" mode="fullView"/> :
                    <React.Fragment>
                        <form className="contentForm" onSubmit={(event) => this.onSubmitHandler(event)} >
                            <h5 className="formHeader">{this.props.match.params.id ? <FormattedMessage {...messages.headingEdit} children={message => message} /> : <FormattedMessage {...messages.headingAdd} children={message => message} />}</h5>
                            <div className="form-group">
                                <label className="form-label"><FormattedMessage {...messages.formName} children={message => message} /> :<sup><i className="fas fa-asterisk" /></sup></label>
                                <input type="text"
                                    className="form-control"
                                    id="name"
                                    disabled={this.state.payload.name == "ACCOUNT_ADMIN" || this.state.payload.name == "END_USER" || this.state.payload.name == "GROUP_ADMIN" || this.state.payload.name == "SYSTEM_ADMIN"}
                                    value={this.state.payload.name}
                                    onChange={this.inputChangeHandler}
                                    autoFocus
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label"><FormattedMessage {...messages.formDescription} children={message => message} /> :</label>
                                <textarea rows="4" className="form-control" id="description" value={this.state.payload.description} onChange={this.inputChangeHandler}></textarea>
                            </div>
                            <div className="form-group">
                                <label className="form-label pt-0"><FormattedMessage {...commonMessage.assignPermissions} children={message => message} /> : </label>
                                <div className="fx-b80">
                                    <div className="flex">
                                        <div className="fx-b100">
                                            <label className="customCheckbox">
                                                <input
                                                    disabled={["ACCOUNT_ADMIN", "SYSTEM_ADMIN"].includes(this.state.payload.name)}
                                                    checked={this.state.permissions}
                                                    onChange={this.stateChangeHandler}
                                                    id="permissions"
                                                    value="Read"
                                                    type="checkbox"
                                                />
                                                <span className="checkmark" />
                                                <span className="checkboxText note mr-b-0">
                                                    ( <span className="noteText"><FormattedMessage {...commonMessage.note} children={message => message} /> : </span>
                                                    <FormattedMessage {...messages.errorMsgOne} children={message => message} />
                                                    <FormattedMessage {...messages.defaultPermission} children={message => (<b>{message}</b>)} />
                                                    <FormattedMessage {...messages.common} children={message => message} /> )
                                        </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {this.state.permissions && <div className="contentForm shadowNone">
                                <h5 className="formHeader"><FormattedMessage {...commonMessage.assignPermissions} children={message => message} />
                                    <div className="headerItemRight">
                                        <div className="switchButtonLabel">
                                            <label className="switchLabelText"><FormattedMessage {...commonMessage.allPermissions} children={message => message} /> :</label>
                                            <label className={["ACCOUNT_ADMIN", "SYSTEM_ADMIN"].includes(this.state.payload.name) ? "disabled switchLabel" : "switchLabel"}>
                                                <input type="checkbox" disabled={["ACCOUNT_ADMIN", "SYSTEM_ADMIN"].includes(this.state.payload.name)} onChange={this.allPermission} id="ALL" checked={this.state.allPermission.length > 0} />
                                                <span className="switchMark"></span>
                                            </label>
                                        </div>
                                    </div>
                                </h5>
                                <table className="table customHTMLTable permissionTable">
                                    <thead>
                                        <tr>
                                            <th width="25%"><FormattedMessage {...commonMessage.entitlements} children={message => message} /></th>
                                            <th width="15%"><FormattedMessage {...commonMessage.read} children={message => message} /></th>
                                            <th width="15%"><FormattedMessage {...commonMessage.write} children={message => message} /></th>
                                            <th width="15%"><FormattedMessage {...commonMessage.update} children={message => message} /></th>
                                            <th width="15%"><FormattedMessage {...commonMessage.delete} children={message => message} /></th>
                                            <th width="15%"><FormattedMessage {...commonMessage.all} children={message => message} /></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.entitlements.map((val, index) => (
                                            <tr key={val.resource + index}>
                                                <td>{val.resource}</td>
                                                <td>
                                                    <label className="customCheckbox">
                                                        <input
                                                            onChange={(event) => this.nameChangeHandler(event, index)}
                                                            value="READ"
                                                            checked={val.permissions.includes("READ")}
                                                            disabled={["ACCOUNT_ADMIN", "SYSTEM_ADMIN"].includes(this.state.payload.name) ? true : (val.minPermissions || []).includes("READ") ? true : false}
                                                            type="checkbox"
                                                        />
                                                        <span className="checkmark" />
                                                    </label>
                                                </td>
                                                <td>
                                                    <label className="customCheckbox">
                                                        <input
                                                            type="checkbox"
                                                            onChange={(event) => this.nameChangeHandler(event, index)}
                                                            value="CREATE"
                                                            checked={val.permissions.includes("CREATE")}
                                                            disabled={["ACCOUNT_ADMIN", "SYSTEM_ADMIN"].includes(this.state.payload.name) ? true : (val.minPermissions || []).includes("CREATE") ? true : false}
                                                        />
                                                        <span className="checkmark" />
                                                    </label>
                                                </td>
                                                <td>
                                                    <label className="customCheckbox">
                                                        <input
                                                            type="checkbox"
                                                            onChange={(event) => this.nameChangeHandler(event, index)}
                                                            value="UPDATE"
                                                            disabled={["ACCOUNT_ADMIN", "SYSTEM_ADMIN"].includes(this.state.payload.name) ? true : (val.minPermissions || []).includes("UPDATE") ? true : false}
                                                            checked={val.permissions.includes("UPDATE")}
                                                        />
                                                        <span className="checkmark" />
                                                    </label>
                                                </td>
                                                <td>
                                                    <label className="customCheckbox">
                                                        <input
                                                            type="checkbox"
                                                            onChange={(event) => this.nameChangeHandler(event, index)}
                                                            value="DELETE"
                                                            disabled={["ACCOUNT_ADMIN", "SYSTEM_ADMIN"].includes(this.state.payload.name) ? true : (val.minPermissions || []).includes("DELETE") ? true : false}
                                                            checked={val.permissions.includes("DELETE")}
                                                        />
                                                        <span className="checkmark" />
                                                    </label>
                                                </td>
                                                <td>
                                                    <label className="customCheckbox">
                                                        <input
                                                            type="checkbox"
                                                            onChange={(event) => this.nameChangeHandler(event, index)}
                                                            value="ALL"
                                                            disabled={["ACCOUNT_ADMIN", "SYSTEM_ADMIN"].includes(this.state.payload.name) ? true : (val.minPermissions || []).includes("ALL") ? true : false}
                                                            checked={val.permissions.includes("ALL")}
                                                        />
                                                        <span className="checkmark" />
                                                    </label>
                                                </td>
                                            </tr>))}
                                    </tbody>
                                </table>
                                <div className="form-group justify-content-end mt-3">
                                    <button className="btn btn-danger">
                                        <i className="far fa-check-circle"></i>
                                        {this.props.match.params.id ? <FormattedMessage {...commonMessage.update} children={message => message} /> :
                                            <FormattedMessage {...commonMessage.save} children={message => message} />
                                        }
                                    </button>
                                </div>
                            </div>}

                            {!this.state.permissions && <div className="form-group justify-content-end">
                                <button id="SaveRole" className="btn btn-danger mt-3">
                                    <i className="far fa-check-circle"></i>
                                    {this.props.match.params.id ? <FormattedMessage {...commonMessage.update} children={message => message} /> :
                                        <FormattedMessage {...commonMessage.save} children={message => message} />
                                    }
                                </button>
                            </div>}
                        </form>
                    </React.Fragment>
                }
                {this.state.isOpen ? <MessageModal type={this.state.type} message={this.state.message} onClose={this.modalCloseHandler} /> : null}
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    submitSuccess: getSubmitSuccess(),
    submitError: getSubmitError(),
    roleDetails: getRoleDetailsSuccess(),
    roleDetailsError: getRoleDetailsError(),
    getPermissionsDetails: getPermissionsDetails(),
    getPermissionsFailure: getPermissionsFailure(),
    getEntitlementsFailure: getEntitlementsFailure(),
    getEntitlementsSuccess: getEntitlementsSuccess(),
});

export function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        onSubmitHandler: (payload, id) => dispatch(onSubmitHandler(payload, id)),
        getRoleDetails: (id) => dispatch(getRoleDetails(id)),
        getPermissions: () => dispatch(getPermissions()),
        getEntitlements: () => dispatch(getEntitlements()),
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
);

const withReducer = injectReducer({ key: "addOrEditRole", reducer });
const withSaga = injectSaga({ key: "addOrEditRole", saga });

export default compose(
    withReducer,
    withSaga,
    withConnect
)(AddOrEditRole);

/**
 *
 * ManageRoles
 *
 */

import React from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import commonMessage from '../../messages';
import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import { getList, getListError, getDeleteSuccess, getDeleteFailure } from "./selectors";
import { getRolesList, deleteHandler } from './actions'
import reducer from "./reducer";
import saga from "./saga";
import ReactTable from 'react-table'
import MessageModal from '../../components/MessageModal/Loadable';
import NoDataFound from "../../components/NoDataFound";
import SkeletonLoader from "../../components/SkeletonLoader";

/* eslint-disable react/prefer-stateless-function */
export class ManageRoles extends React.Component {
    state = {
        roleList: [],
        isFetching: true,
        isOpen: false
    }

    componentDidMount() {
        this.props.getRolesList();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.list && nextProps.list !== this.props.list) {
            this.setState({
                roleList: nextProps.list,
                isFetching: false
            })
        }

        if (nextProps.deleteSuccess && nextProps.deleteSuccess !== this.props.deleteSuccess) {
            let roleList = this.state.roleList.filter((temp) => (
                temp.id != nextProps.deleteSuccess
            ))
            this.setState({
                isFetching: false,
                roleList,
                isOpen: true,
                message: <FormattedMessage {...messages.roleDeleteSuccessMessage} children={(message => message)} />,
                type: "success"
            })
        }

        ['listError', 'deleteFailure'].map(val => {
            this.errorSetStateHandler(nextProps[val], this.props[val]);
        })
    }

    errorSetStateHandler(nextError, currentError) {
        if (nextError && nextError !== currentError) {
            this.setState({
                isFetching: false,
                isOpen: true,
                message: nextError,
                type: "error",
            });
        }
    }

    deleteHandler(id) {
        this.setState({
            isFetching: true,
            isOpen: false,
            message: "",
            type: ""
        }, () => {
            this.props.deleteHandler(id)
        })
    }

    modalCloseHandler = () => {
        this.setState({
            isFetching: false,
            isOpen: false,
            message: "",
            type: ""
        });
    }

    confirmModalHandler(id) {
        this.setState({
            isFetching: true,
            isOpen: true,
            message: <FormattedMessage {...messages.confirmDeleteMessage} children={(message => message)} />,
            type: "confirm",
            deleteRoleId: id
        });
    }

    render() {
        return (
            <div className="appContent">
                <Helmet>
                    <title>ManageRoles</title>
                    <meta name="description" content="Description of ManageRoles" />
                </Helmet>

                <div className="pageBreadcrumb">
                    <div className="flex-item fx-b70">
                        <p><FormattedMessage {...commonMessage.iam} children={(message => message)} /></p>
                        <h5><FormattedMessage {...messages.title} children={(message => message)} />
                            {this.state.isFetching ? null : <span className="customCountBadge">{this.state.roleList.length}</span>}
                        </h5>
                    </div>
                    <div className="flex-item fx-b30 text-right align-items-center">
                        {this.state.roleList.length > 0 ?
                        <button type="button" className="btn btn-create" onClick={() => { this.props.history.push('/addOrEditRole') }}>
                            <i className="far fa-plus"></i>
                        </button>
                        : 
                        null
                        }
                    </div>
                </div>
                {this.state.isFetching ? <SkeletonLoader skeleton="skeletonReactTable" mode="fullView"/> :
                this.state.roleList.length > 0 ? 
                <div className="customReactTableBox">
                    <ReactTable
                        columns={[
                            {
                                Header: <FormattedMessage {...messages.colName} children={(message => message)} />,
                                accessor: 'name',
                                filterable: false
                            },
                            {
                                Header: <FormattedMessage {...commonMessage.type} children={(message => message)} />,
                                accessor: 'type',
                                filterable: false
                            },
                            {
                                Header: <FormattedMessage {...commonMessage.description} children={(message => message)} />,
                                accessor: 'description',
                                filterable: false
                            },
                            {
                                Header: <FormattedMessage {...commonMessage.actions} children={(message => message)} />,
                                filterable: false,
                                Cell: row => (
                                    <div className="button-group">
                                        <button type="button" className="btn-transparent"
                                            onClick={() => { this.props.history.push(`/manageRolePermission/${row.original.id}`); }}
                                            data-tooltip
                                            data-tooltip-text= "Manage Permissions"
                                        >
                                            <i className="far fa-user-cog text-success" />
                                        </button>
                                        <button type="button" className="btn-transparent"
                                            onClick={() => this.props.history.push(`/manageRoleNavigation/${row.original.id}`)}
                                            data-tooltip
                                            data-tooltip-text= "Manage Role Navigation"
                                        >
                                            <i className="far fa-clipboard-list text-info" />
                                        </button>
                                        <button type="button" className="btn-transparent"
                                            onClick={() => { this.props.history.push(`/addOrEditRole/${row.original.id}`); }} 
                                            data-tooltip
                                            data-tooltip-text= "Edit"
                                        >
                                            <i className="far fa-pen text-primary" />
                                        </button>
                                        <button type="button" className="btn-transparent text-danger" disabled={row.original.createdBy === "SYSTEM"}
                                            onClick={() => this.confirmModalHandler(row.original.id)} 
                                            data-tooltip
                                            data-tooltip-text= "Delete"
                                        >
                                            <i className="far fa-trash-alt"></i>
                                        </button>
                                    </div>
                                ),
                                sortable: false,
                            },
                        ]}
                        noDataText={this.state.isFetching ? "" : <NoDataFound mode="middleView" dataName="role" dataImg="role"/>}
                        data={this.state.roleList}
                        loading={this.state.isFetching}
                        loadingText={<FormattedMessage {...commonMessage.loading} children={(message => message)} />}
                        defaultPageSize={10}
                        className="customReactTable"
                        PreviousComponent={(props) => <button type="button"{...props}><i className="fas fa-angle-left"></i></button>}
                        NextComponent={(props) => <button type="button" {...props}><i className="fas fa-angle-right"></i></button>}
                    />
                </div>
                : 
                <NoDataFound skeleton="skeletonReactTable" mode="fullView" dataName="role" dataImg="role" button="add" createHandler={() => {this.props.history.push('/addOrEditRole')}}/>
                }
                {this.state.isOpen ? <MessageModal type={this.state.type} message={this.state.message} onConfirm={() => this.deleteHandler(this.state.deleteRoleId)} onClose={this.modalCloseHandler} /> : null}
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    list: getList(),
    listError: getListError(),
    deleteSuccess: getDeleteSuccess(),
    deleteFailure: getDeleteFailure()
});

export function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        getRolesList: () => dispatch(getRolesList()),
        deleteHandler: (id) => dispatch(deleteHandler(id))
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
);

const withReducer = injectReducer({ key: "manageRoles", reducer });
const withSaga = injectSaga({ key: "manageRoles", saga });

export default compose(
    withReducer,
    withSaga,
    withConnect
)(ManageRoles);

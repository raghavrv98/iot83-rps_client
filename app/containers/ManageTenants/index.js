/**
 *
 * ManageTenants
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
import { getTenantsList, getTenantsListError, getDeleteError, getDeleteSuccess } from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import ReactTable from 'react-table';
import { getTenants, deleteHandler } from './actions'
import MessageModal from '../../components/MessageModal/Loadable'
import { FormattedMessage } from 'react-intl';
import commonMessages from '../../messages';
import message from './messages';
import NoDataFound from "../../components/NoDataFound";
import SkeletonLoader from "../../components/SkeletonLoader";
import moment from 'moment';

/* eslint-disable react/prefer-stateless-function */
export class ManageTenants extends React.Component {
    state = {
        isFetching: true,
        tenantsList: [],
    }

    componentDidMount() {
        if (localStorage.token) {
            this.props.getTenants();
        } else {
            this.props.history.push('/login');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.tenantsList && nextProps.tenantsList !== this.props.tenantsList) {
            this.setState({
                tenantsList: nextProps.tenantsList,
                isFetching: false,
            })
        }

        if (nextProps.deleteSuccess && nextProps.deleteSuccess !== this.props.deleteSuccess) {
            let tenantsList = this.state.tenantsList.filter((temp) => (
                temp.id != nextProps.deleteSuccess
            ))
            this.setState({
                tenantsList,
                isFetching: false,
                isOpen: true,
                message: <FormattedMessage {...message.tenantDeleteSuccessMessage} children={(message => message)} />,
                type: "success"
            })
        }

        ['tenantsListError', 'deleteError'].map(val => {
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
            isOpen: true,
            message: <FormattedMessage {...message.confirmDeleteMessage} children={(message => message)} />,
            type: "confirm",
            deleteTenantId: id
        });
    }

    render() {
        return (
            <div className="appContent">
                <Helmet>
                    <title>ManageTenants</title>
                    <meta name="description" content="Description of ManageTenants" />
                </Helmet>

                <div className="pageBreadcrumb">
                    <div className="flex-item fx-b70">
                        <p><FormattedMessage {...commonMessages.manageTenants} children={(message => message)} /></p>
                        <h5><FormattedMessage {...message.title} children={(message => message)} />
                            {this.state.isFetching ? null :
                                <span className="customCountBadge">
                                    {this.state.tenantsList.length}
                                </span>
                            }
                        </h5>
                    </div>
                    <div className="flex-item fx-b30 text-right align-items-center">
                    {this.state.tenantsList.length > 0 ?
                        <button type="button" className="btn btn-create" onClick={() => { this.props.history.push('/addOrEditTenant') }}>
                            <i className="far fa-plus"></i>
                        </button>
                        :
                        null
                    }
                    </div>
                </div>

                {this.state.isFetching ? <SkeletonLoader skeleton="skeletonReactTable" mode="fullView"/> : 
                this.state.tenantsList.length > 0 ?
                <div className="customReactTableBox">
                    <ReactTable
                        columns={[
                            {
                                Header: <FormattedMessage {...commonMessages.companyName} children={(message => message)} />,
                                accessor: 'companyName',
                                filterable: false
                            },
                            {
                                Header: <FormattedMessage {...commonMessages.tenantName} children={(message => message)} />,
                                accessor: 'tenantName',
                                filterable: false
                            },
                            {
                                Header: <FormattedMessage {...commonMessages.email} children={(message => message)} />,
                                accessor: 'email',
                                filterable: false
                            },
                            {
                                Header: <FormattedMessage {...commonMessages.description} children={(message => message)} />,
                                accessor: 'description',
                                filterable: false
                            },
                            {
                                Header: <FormattedMessage {...commonMessages.createdAt} children={(message => message)} />,
                                filterable: false,
                                id: "createdAt",
                                accessor: d => {
                                    return moment(d.createdAt).format("DD MMM YYYY HH:mm:ss");
                                }
                            },
                            {
                                Header: <FormattedMessage {...commonMessages.actions} children={(message => message)} />,
                                accessor: 'action',
                                filterable: false,
                                sortable: false,
                                Cell: row => (
                                    <div className="button-group">
                                        <button type="button"
                                            className="btn-transparent text-primary"
                                            onClick={() => { this.props.history.push(`/addOrEditTenant/${row.original.id}`) }}
                                            data-tooltip
                                            data-tooltip-text= "Edit"
                                        >
                                            <i className="far fa-pen" />
                                        </button>
                                        <button type="button" id={row.original.tenantName}
                                            className="btn-transparent"
                                            onClick={() => this.confirmModalHandler(row.original.id)}
                                            data-tooltip
                                            data-tooltip-text= "Delete"
                                        >
                                            <i className="far fa-trash-alt text-danger" />
                                        </button>
                                    </div>
                                ),
                            },
                        ]}
                        noDataText={this.state.isFetching ? "" : <NoDataFound mode="middleView" dataName="tenant" dataImg="tenant"/>}
                        data={this.state.tenantsList}
                        loading={this.state.isFetching}
                        loadingText={<FormattedMessage {...commonMessages.loading} children={(message => message)} />}
                        defaultPageSize={10}
                        className="customReactTable"
                        PreviousComponent={(props) => <button type="button"{...props}><i className="fas fa-angle-left"></i></button>}
                        NextComponent={(props) => <button type="button" {...props}><i className="fas fa-angle-right"></i></button>}
                    />
                </div>
                :
                <NoDataFound skeleton="skeletonReactTable" mode="fullView" dataName="tenant" dataImg="tenant" button="add" createHandler={() => {this.props.history.push('/addOrEditTenant')}}/>
                }
                {this.state.isOpen ? <MessageModal type={this.state.type} message={this.state.message} onConfirm={() => this.deleteHandler(this.state.deleteTenantId)} onClose={this.modalCloseHandler} /> : null}
            </div>
        );
    }
}

ManageTenants.propTypes = {
    dispatch: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
    tenantsList: getTenantsList(),
    tenantsListError: getTenantsListError(),
    deleteSuccess: getDeleteSuccess(),
    deleteError: getDeleteError()
});

export function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        getTenants: () => dispatch(getTenants()),
        deleteHandler: (id) => dispatch(deleteHandler(id))
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
);

const withReducer = injectReducer({ key: "manageTenants", reducer });
const withSaga = injectSaga({ key: "manageTenants", saga });

export default compose(
    withReducer,
    withSaga,
    withConnect
)(ManageTenants);

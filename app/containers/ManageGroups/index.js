/**
 *
 * ManageGroups
 *
 */

import React from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { getGroupList, deleteHandler } from './actions'
import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import { getList, getListError, getDeleteSuccess, getDeleteFailure } from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import ReactTable from 'react-table'
import MessageModal from '../../components/MessageModal/Loadable';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import commonMessages from '../../messages'
import NoDataFound from "../../components/NoDataFound";
import SkeletonLoader from "../../components/SkeletonLoader";

/* eslint-disable react/prefer-stateless-function */
export class ManageGroups extends React.Component {
    state = {
        groupList: [],
        isFetching: true,
        isOpen: false
    }

    componentDidMount() {
        this.props.getGroupList();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.list && nextProps.list !== this.props.list) {
            this.setState({
                groupList: nextProps.list,
                isFetching: false
            })
        }
        if (nextProps.deleteSuccess && nextProps.deleteSuccess !== this.props.deleteSuccess) {
            let groupList = this.state.groupList.filter((temp) => (
                temp.id != nextProps.deleteSuccess
            ))
            this.setState({
                isFetching: false,
                groupList,
                isOpen: true,
                message: <FormattedMessage {...messages.groupDeleteSuccess} children={(message => message)} />,
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
        }, () => this.props.deleteHandler(id))
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
            message: <FormattedMessage {...messages.confirmDelateMessage} children={(message => message)} />,
            type: "confirm",
            deleteGroupId: id
        });
    }

    render() {
        return (
            <div className="appContent">
                <Helmet>
                    <title>ManageGroups</title>
                    <meta name="description" content="Description of ManageGroups" />
                </Helmet>

                <div className="pageBreadcrumb">
                    <div className="flex-item fx-b70">
                        <p><FormattedMessage {...commonMessages.iam} children={(message => message)} /></p>
                        <h5><FormattedMessage {...messages.title} children={(message => message)} />
                            {this.state.isFetching ? null :
                                <span className="customCountBadge">
                                    {this.state.groupList.length}
                                </span>
                            }
                        </h5>
                    </div>
                    <div className="flex-item fx-b30 text-right align-items-center">
                        {this.state.groupList.length > 0 ?
                            <button type="button" className="btn btn-create" onClick={() => { this.props.history.push('/addOrEditGroup') }}>
                                <i className="far fa-plus"></i>
                            </button>
                            :
                            null
                        }
                    </div>
                </div>

                {this.state.isFetching ? <SkeletonLoader skeleton="skeletonReactTable" mode="fullView" /> :
                    this.state.groupList.length > 0 ?
                        <div className="customReactTableBox">
                            <ReactTable
                                columns={[
                                    {
                                        Header: <FormattedMessage {...messages.colName} children={(message => message)} />,
                                        accessor: 'name',
                                        filterable: false
                                    },
                                    {
                                        Header: <FormattedMessage {...commonMessages.description} children={(message => message)} />,
                                        accessor: 'description',
                                        filterable: false
                                    },
                                    {
                                        Header: <FormattedMessage {...commonMessages.actions} children={(message => message)} />, filterable: false, Cell: row => (
                                            <div className="button-group">
                                                <button type="button" className="btn-transparent"
                                                    onClick={() => { this.props.history.push(`/addOrEditGroup/${row.original.id}`); }}
                                                    data-tooltip
                                                    data-tooltip-text="Edit"
                                                >
                                                    <i className="far fa-pen text-primary"></i>
                                                </button>
                                                <button type="button" disabled={row.original.createdBy === "SYSTEM"} className="btn-transparent" onClick={() => this.confirmModalHandler(row.original.id)}
                                                    data-tooltip
                                                    data-tooltip-text="Delete"
                                                >
                                                    <i className="far fa-trash-alt text-danger"></i>
                                                </button>
                                            </div>
                                        ),
                                        sortable: false,
                                    },
                                ]}
                                noDataText={this.state.isFetching ? "" : <NoDataFound mode="middleView" dataName="group" dataImg="group" />}
                                data={this.state.groupList}
                                loading={this.state.isFetching}
                                loadingText={<FormattedMessage {...commonMessages.loading} children={(message => message)} />}
                                defaultPageSize={10}
                                className="customReactTable"
                                PreviousComponent={(props) => <button type="button"{...props}><i className="fas fa-angle-left"></i></button>}
                                NextComponent={(props) => <button type="button" {...props}><i className="fas fa-angle-right"></i></button>}
                            />
                        </div>
                        :
                        <NoDataFound skeleton="skeletonReactTable" mode="fullView" dataName="group" dataImg="group" button="add" createHandler={() => { this.props.history.push('/addOrEditGroup') }} />
                }
                {this.state.isOpen ?
                    <MessageModal
                        type={this.state.type}
                        message={this.state.message}
                        onConfirm={() => this.deleteHandler(this.state.deleteGroupId)}
                        onClose={this.modalCloseHandler}
                    /> : null}
            </div>
        );
    }
}

export const mapStateToProps = createStructuredSelector({
    list: getList(),
    listError: getListError(),
    deleteSuccess: getDeleteSuccess(),
    deleteFailure: getDeleteFailure()
});

export function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        getGroupList: () => dispatch(getGroupList()),
        deleteHandler: (id) => dispatch(deleteHandler(id))
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
);

const withReducer = injectReducer({ key: "manageGroups", reducer });
const withSaga = injectSaga({ key: "manageGroups", saga });

export default compose(
    withReducer,
    withSaga,
    withConnect
)(ManageGroups);

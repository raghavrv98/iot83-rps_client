/**
 *
 * ManageUsers
 *
 */

import React from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import {
  getList,
  getListError,
  getDeleteSuccess,
  getDeleteFailure
} from "./selectors";
import { getUserList, deleteHandler } from "./actions";
import { FormattedMessage } from "react-intl";
import messages from "./messages";
import commonMessage from "../../messages";
import reducer from "./reducer";
import saga from "./saga";
import ReactTable from "react-table";
import MessageModal from "../../components/MessageModal/Loadable";
import NoDataFound from "../../components/NoDataFound";
import SkeletonLoader from "../../components/SkeletonLoader";

/* eslint-disable react/prefer-stateless-function */
export class ManageUsers extends React.Component {
  state = {
    userList: {},
    isFetching: true,
    isOpen: false,
    pageSize: 10,
    currentPage: 0,
    isTableLoading: true
  };

  componentDidMount() {
    this.props.getUserList({ max: 10, offset: 0 });

    this.setState({
      isInitialCall: false
    })
  }

  fetchData = (state) => {
    let payload = {
      max: state.pageSize,
      offset: state.page * state.pageSize
    };

    if (state.sorted[0]) {
      payload.sortBy = state.sorted[0].id;
      payload.order = state.sorted[0].desc ? "DESC" : "ASC";
    }

    if (state.filtered.length > 0) {
      state.filtered.map(filterObject => {
        if (filterObject.value.length > 0) {
          payload[filterObject.id] = filterObject.value;
        } else {
          return;
        }
      });
    }

    this.state.isInitialCall ? this.setState({ isFetching: true }, () => this.props.getUserList(payload)) : this.setState({ isFetching: false })
    this.setState({
      isInitialCall: true,
      pageSize: state.pageSize,
      pages: state.pages,
      currentPage: state.page
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.list && nextProps.list !== this.props.list) {
      this.setState({
        userList: nextProps.list,
        isFetching: false,
        isTableLoading: false,
      });
    }

    if (
      nextProps.deleteSuccess &&
      nextProps.deleteSuccess !== this.props.deleteSuccess
    ) {
      let userList = JSON.parse(JSON.stringify(this.state.userList));
      userList.objects = userList.objects.filter(
        temp => temp.id != nextProps.deleteSuccess
      );
      this.setState({
        isFetching: false,
        userList,
        isOpen: true,
        message: <FormattedMessage {...messages.userDeleteSuccessMessage} children={(message => message)} />,
        type: "success"
      });
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
    this.setState(
      {
        isFetching: true,
        isOpen: false,
        message: "",
        type: ""
      },
      () => {
        this.props.deleteHandler(id);
      }
    );
  };

  modalCloseHandler = () => {
    this.setState({
      isFetching: false,
      isOpen: false,
      message: "",
      type: ""
    });
  };

  confirmModalHandler(id) {
    this.setState({
      isOpen: true,
      message: <FormattedMessage {...messages.confirmDeleteMessage} children={(message => message)} />,
      type: "confirm",
      deleteUserId: id
    });
  }

  render() {
    const columns = [
      {
        Header: <FormattedMessage {...commonMessage.name} children={(message => message)} />,
        accessor: "name",
        filterable: true,
        sortable: true
      },
      {
        Header: <FormattedMessage {...commonMessage.email} children={(message => message)} />,
        accessor: "email",
        filterable: true,
        sortable: true
      },
      {
        Header: <FormattedMessage {...commonMessage.roleName} children={(message => message)} />,
        accessor: "userRole",
        filterable: false,
        sortable: false,
        Cell: row => {
          let data = "";
          row.original.userRole.map(item => {
            data += item.role.name + " ";
          });
          return <div>{data}</div>;
        }
      },
      {
        Header: <FormattedMessage {...messages.colGroup} children={(message => message)} />,
        accessor: "compartment",
        sortable: false,
        filterable: false,
        Cell: row => {
          let data = "";
          row.original.compartment.map(item => {
            data += item.name + " ";
          });
          return <div>{data}</div>;
        }
      },
      {
        Header: <FormattedMessage {...commonMessage.type} children={(message => message)} />,
        accessor: "internalUser",
        filterable: false,
        Cell: row => (
          <span>{row.original.internalUser ? "INTERNAL" : "EXTERNAL"}</span>
        )
      },
      {
        Header: <FormattedMessage {...commonMessage.actions} children={(message => message)} />,
        filterable: false,
        Cell: row => (
          <div className="button-group">
            <button
              type="button"
              className="btn-transparent text-primary"
              disabled={!row.original.internalUser}
              onClick={() => {
                this.props.history.push(`/addOrEditUser/${row.original.id}`);
              }}
              data-tooltip
              data-tooltip-text= "Edit"
            >
              <i className="far fa-pen text-primary" />
            </button>
            <button
              type="button"
              disabled={row.original.createdBy === "SYSTEM"}
              className="btn-transparent text-danger"
              onClick={() => this.confirmModalHandler(row.original.id)}
              data-tooltip
              data-tooltip-text= "Delete"
            >
              <i className="far fa-trash-alt" />
            </button>
          </div>
        )
      }
    ];
    return (
      <div className="appContent">
        <Helmet>
          <title>ManageUsers</title>
          <meta name="description" content="Description of ManageUsers" />
        </Helmet>
        <div className="pageBreadcrumb">
          <div className="flex-item fx-b70">
            <p>
              <FormattedMessage {...commonMessage.iam} children={(message => message)} />
            </p>
            <h5>
              <FormattedMessage {...messages.title} children={(message => message)} />
              {this.state.isFetching ? null :
                <span className="customCountBadge">
                  {this.state.userList.totalCount}
                </span>
              }
            </h5>
          </div>
          <div className="flex-item fx-b30 text-right align-items-center">
            {this.state.userList.totalCount > 0 ?
              <button
                type="button"
                className="btn btn-create"
                onClick={() => {
                  this.props.history.push("/addOrEditUser");
                }}
              >
                <i className="far fa-plus" />
              </button>
              : null
            }
          </div>
        </div>

        {this.state.isTableLoading ? <SkeletonLoader skeleton="skeletonReactTable" mode="fullView"/> :
          this.state.userList.totalCount > 0 ?
            <div className="customReactTableBox">
              <ReactTable
                manual
                columns={columns}
                noDataText={this.state.isFetching ? "" : <NoDataFound mode="middleView" dataName="user" dataImg="user" />}
                data={this.state.userList.objects}
                loading={this.state.isFetching}
                pageSize={this.state.pageSize}
                pages={Math.ceil(this.state.userList.totalCount / this.state.pageSize)}
                loadingText={<FormattedMessage {...commonMessage.loading} children={(message => message)} />}
                className="customReactTable"
                PreviousComponent={(props) => <button type="button"{...props}><i className="fas fa-angle-left"></i></button>}
                NextComponent={(props) => <button type="button" {...props}><i className="fas fa-angle-right"></i></button>}
                onFetchData={(state, instance) => this.fetchData(state, instance)}
              />
            </div>
            :
            <NoDataFound skeleton="skeletonReactTable" mode="fullView" dataName="user" dataImg="user" button="add" createHandler={() => { this.props.history.push("/addOrEditUser") }} />
        }

        {this.state.isOpen ?
          <MessageModal
            type={this.state.type}
            message={this.state.message}
            onConfirm={() => this.deleteHandler(this.state.deleteUserId)}
            onClose={this.modalCloseHandler}
          />
          : null}
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
    getUserList: payload => dispatch(getUserList(payload)),
    deleteHandler: id => dispatch(deleteHandler(id))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "manageUsers", reducer });
const withSaga = injectSaga({ key: "manageUsers", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(ManageUsers);

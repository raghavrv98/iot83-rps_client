/**
 *
 * PipeLineDetail
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { FormattedMessage } from "react-intl";
import messages from "./messages";
import commonMessages from '../../messages';
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import {
    pipelinesDetails, pipelinesDetailsError,
    saveConfirm, saveConfirmError,
    deleteDetails, deleteDetailsFailure,
} from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import Dropzone from 'react-dropzone';
import { getPipelineDetails, savePipelineDetails, deleteFileHandler } from './actions';
import MessageModal from '../../components/MessageModal/Loadable';
import ReactTable from "react-table";
import { Parser } from 'json2csv';
import NoDataFound from "../../components/NoDataFound";
import SkeletonLoader from "../../components/SkeletonLoader";
import { filterCaseInsensitive } from '../../utils/commonUtils';

/* eslint-disable react/prefer-stateless-function */

const defaultValues = []

export class PipeLineDetail extends React.Component {

    state = {
        pipelineDetails: [],
        uploadedFile: "",
        pipelineName: "",
        plantName: "",
        isFetching: true,
        isOpen: false,
        upload: false,
        domain: [],
        values: defaultValues.slice(),
        update: defaultValues.slice(),
        size: 10,
        page: 0,
        data: '',
        isTableLoading: true,
        sampleCsvData: [
            {
                "File": "",
                "Item": "",
                "Distance": "m",
                "Angle": "deg",
                "Tag": "",
                "Segment": null,
                "X": "m",
                "Y": "m",
                "Z": "m",
                "In": "m",
                "En": "m",
                "Chain": "m",
                "DtsOffPipe": "m",
            },
            {
                "File": "1006-0004-SL-1",
                "Item": "ANCHOR",
                "Distance": 1.014,
                "Angle": 0,
                "Tag": "12HA1-0001-210",
                "Segment": 0,
                "X": 775796.885,
                "Y": 2647935.604,
                "Z": 35.043,
                "In": 0,
                "En": 5.886,
                "Chain": 0,
                "DtsOffPipe": "-2393",
            },
            {
                "File": "1006-0004-SL-1",
                "Item": "ELBOW",
                "Distance": 5.886,
                "Angle": 45.15,
                "Tag": "",
                "Segment": 0,
                "X": 775803.55,
                "Y": 2647938.124,
                "Z": 35.163,
                "In": 0,
                "En": 5.886,
                "Chain": 5.886,
                "DtsOffPipe": "-2393.34",
            }
        ],
        isScadaSensorCsvReqired: false,
        incorrectfileErrorMsg: false
    }

    componentWillMount() {
        this.props.getPipelineDetails(this.props.match.params.id, this.props.match.params.pipelineId, { offset: 0, limit: 10 })
        this.setState({
            isInitialCall: false
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.pipelinesDetails && nextProps.pipelinesDetails !== this.props.pipelinesDetails) {
            this.setState({
                pipelineDetails: Object.keys(nextProps.pipelinesDetails).length > 0 ? nextProps.pipelinesDetails.components : [],
                pipelineName: nextProps.pipelinesDetails.pipelineName,
                plantName: nextProps.pipelinesDetails.plantName,
                isFetching: false,
                isTableLoading: false,
                totalCounts: nextProps.pipelinesDetails.totalCounts,
                filteredComponentCount: nextProps.pipelinesDetails.filteredComponentCount

            }, () => this.pipelineDetailsToScale())
        }
        if (nextProps.saveConfirm && nextProps.saveConfirm !== this.props.saveConfirm) {
            this.setState({
                isFetching: false,
                isTableLoading: false,
                isOpen: true,
                message: nextProps.saveConfirm,
                type: "success",
                isSaveDetails: true
            }, () => this.props.getPipelineDetails(this.props.match.params.id, this.props.match.params.pipelineId, { offset: 0, limit: 10 }))
        }
        if (nextProps.deleteDetails && nextProps.deleteDetails !== this.props.deleteDetails) {
            this.setState({
                isFetching: false,
                isTableLoading: false,
                isOpen: true,
                message: <FormattedMessage {...messages.datailsDeleted} children={(message => message)} />,
                type: "success",
                resetSuccess: true
            }, () => this.props.getPipelineDetails(this.props.match.params.id, this.props.match.params.pipelineId, { offset: 0, limit: 10 }))
        }

        ['pipelinesDetailsError', 'saveConfirmError', 'deleteDetailsFailure'].map(val => {
            this.errorSetStateHandler(nextProps[val], this.props[val]);
        })
    }

    errorSetStateHandler(nextError, currentError) {
        if (nextError && nextError !== currentError) {
            this.setState({
                isFetching: false,
                isTableLoading: false,
                isOpen: true,
                message: nextError,
                type: "error",
            });
        }
    }

    onDrop = acceptedFiles => {
        if (acceptedFiles.length > 0) {
            this.setState({
                uploadedFile: acceptedFiles[0],
                isScadaSensorCsvReqired: false,
                incorrectfileErrorMsg: false
            })
        }
        else {
            this.setState({
                uploadedFile: undefined,
                isScadaSensorCsvReqired: false,
                incorrectfileErrorMsg: true
            })
        }
    }

    modalCloseHandler = () => {
        this.setState({
            isOpen: false,
            message: "",
            type: "",
            uploadedFile: "",
            isFetching: false,
        })
    }

    deleteHandler = () => {
        this.setState({
            isOpen: true,
            message: <FormattedMessage {...commonMessages.deleteConfirmMessage} children={(message => message)} />,
            type: "confirm"
        })
    }

    fileUpladModelCloseHandler = () => {
        this.setState({
            uploadedFile: "",
            upload: false,
        })
    }

    updateDetails = () => {
        this.setState({
            upload: true,
            uploadedFile: ""
        })
    }

    onUpdate = update => {
        this.setState({ update })
    }

    onChange = values => {
        this.setState({ values })
    }

    pipelineDetailsToScale = () => {
        let pipelineDetails = JSON.parse(JSON.stringify(this.state.pipelineDetails));
        let rangeSet = pipelineDetails.length / 2, value = 0, domain = [0];
        domain.push(pipelineDetails.length)
        while (value < pipelineDetails.length) {
            value += rangeSet
            defaultValues.push(value)
        }
        this.setState({
            domain,
            values: defaultValues.slice(),
            update: defaultValues.slice(),
        })
    }

    downloadCsv = data => {
        let finalJson = [];
        if (!data) {
            let pipelineDetails = [...this.state.pipelineDetails]
            let jsonSequence = [
                "File",
                "Item",
                "Distance",
                "Angle",
                "Tag",
                "Segment",
                "X",
                "Y",
                "Z",
                "In",
                "En",
                "Chain",
                "DtsOffPipe",
            ]
            let obj = {}
            jsonSequence.map(keys => {
                obj[keys] = pipelineDetails[0][keys] && pipelineDetails[0][keys].unit ? pipelineDetails[0][keys].unit : null
            })
            finalJson.push(obj);
            pipelineDetails.map(val => {
                let obj = {}
                jsonSequence.map(key => {
                    if (val[key]) {
                        if (Array.isArray(val[key].value)) {
                            let finalValue = "[";
                            val[key].value.map((value, index) => {
                                finalValue = finalValue + `${value}${val[key].value[index + 1] !== undefined ? "," : ""}`
                            })
                            finalValue = finalValue + "]"
                            obj[key] = finalValue
                        } else {
                            obj[key] = val[key].value
                        }
                    }
                })
                finalJson.push(obj);
            })
        }
        const parser = new Parser();
        const csvData = parser.parse(data ? data : finalJson);
        var data = "text/csv;charset=utf-8," + encodeURIComponent(csvData);
        var a = document.createElement('a');
        a.href = 'data:' + data;
        a.download = finalJson.length > 0 ? "pipelineDetails.csv" : "pipelineSample.csv";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    fetchUsers = (state, instance) => {
        const filter = state.filtered;
        const sorted = state.sorted;
        const offset =
            typeof instance.state.page === 'undefined' || instance.state.page === 0
                ? 0
                : instance.state.page * instance.state.pageSize;
        let payload = {
            offset,
            limit: instance.state.pageSize,
        };
        if (this.state.page != instance.state.page || this.state.size != instance.state.pageSize || filter.length >= 0 || sorted.length > 0) {
            if (filter.length > 0) {
                filter.map(items => payload[items.id] = items.value);
            }
            if (sorted.length > 0) {
                payload.sortBy = sorted[0].id;
                payload.order = sorted[0].desc ? 'DESC' : 'ASC';
            }
        }
        this.state.isInitialCall && !this.state.isSaveDetails ? this.props.getPipelineDetails(this.props.match.params.id, this.props.match.params.pipelineId, payload) : null
        this.setState({
            page: instance.state.page,
            size: instance.state.pageSize,
            payload,
            isFetching: this.state.isInitialCall,
            isInitialCall: true,
            isSaveDetails: false
        });
    };

    onSubmitHandler = event => {
        event.preventDefault();
        if (!this.state.uploadedFile) {
            this.setState({
                isScadaSensorCsvReqired: true,
                incorrectfileErrorMsg: false
            })
        }
        else {
            this.setState({
                isFetching: true,
                isTableLoading: true,
                upload: false,
                isScadaSensorCsvReqired: false,
                incorrectfileErrorMsg: false
            }, () => {
                let info = {
                    data: this.state.uploadedFile,
                    plantId: this.props.match.params.id,
                    pipelineId: this.props.match.params.pipelineId,
                }
                this.props.savePipelineDetails(info)
            })
        }
    }

    render() {
        const {
            state: { values, update },
        } = this
        return (
            <div className="appContent">
                <Helmet>
                    <title>PipeLineDetail</title>
                    <meta name="description" content="Description of PipeLineDetail" />
                </Helmet>

                <div className="pageBreadcrumb">
                    <div className="flex-item fx-b70">
                        <p className="pd-l-30">
                            <span className="cursor-pointer" onClick={() => { this.props.history.push('/pipeLineList/' + this.props.match.params.id); }}>
                                <button className="btn btn-transparent">
                                    <i className="far fa-long-arrow-left"></i>
                                </button>
                                <FormattedMessage {...commonMessages.managePipeline} children={(message => message)} />
                            </span>
                        </p>
                        <h5>
                            <FormattedMessage {...messages.componentCount} children={(message => message)} /> <span className="customCountBadge">{this.state.totalCounts}</span>
                            <span className="mx-3">|</span>
                            <FormattedMessage {...commonMessages.plantName} children={(message => message)} /> - <span className="text-theme">{this.state.plantName}</span>
                            <span className="mx-3">|</span>
                            <FormattedMessage {...commonMessages.pipelineName} children={(message => message)} /> - <span className="text-theme">{this.state.pipelineName}</span>
                        </h5>
                    </div>

                    <div className="flex-item fx-b30 text-right align-items-center">
                        {this.state.totalCounts > 0 ?
                            <button
                                type="button"
                                className="btn btn-create mr-r-10"
                                onClick={() => this.updateDetails()}
                            >
                                <i className="far fa-plus" />
                            </button>
                            : null
                        }
                    </div>
                </div>

                {this.state.isTableLoading ? <SkeletonLoader skeleton="skeletonReactTable" mode="fullView" /> :
                    this.state.totalCounts > 0 ?
                        <div className="customReactTableBox">

                            <ReactTable
                                data={this.state.pipelineDetails}
                                noDataText={this.state.isFetching ? '' : <NoDataFound mode="middleView" dataName="component" dataImg="pipelineDetail" />}
                                loading={this.state.isFetching}
                                defaultPageSize={this.state.size}
                                pages={Math.ceil(this.state.filteredComponentCount / this.state.size)}
                                className="customReactTable"
                                PreviousComponent={(props) => <button type="button"{...props}><i className="fas fa-angle-left"></i></button>}
                                NextComponent={(props) => <button type="button" {...props}><i className="fas fa-angle-right"></i></button>}
                                defaultFilterMethod={filterCaseInsensitive}
                                manual
                                columns={[
                                    {
                                        Header: <FormattedMessage {...messages.file} children={(message => message)} />,
                                        filterable: true,
                                        accessor: "File",
                                        Cell: row => (
                                            <span>{row.original.File && row.original.File.value}</span>
                                        )
                                    },
                                    {
                                        Header: <FormattedMessage {...messages.item} children={(message => message)} />,
                                        accessor: "Item",
                                        filterable: true,
                                        Cell: row => (
                                            <span>{row.original.Item && row.original.Item.value}</span>
                                        )
                                    },
                                    {
                                        Header: <FormattedMessage {...messages.distance} children={(message => message)} />,
                                        accessor: "Distance",
                                        filterable: true,
                                        Cell: row => (
                                            <span>{row.original.Distance && row.original.Distance.value + " " + row.original.Distance.unit}</span>
                                        )
                                    },
                                    {
                                        Header: <FormattedMessage {...messages.angle} children={(message => message)} />,
                                        accessor: "Angle",
                                        filterable: true,
                                        Cell: row => (
                                            <span>{row.original.Angle && row.original.Angle.value + " " + row.original.Angle.unit}</span>
                                        )
                                    },
                                    {
                                        Header: <FormattedMessage {...messages.tag} children={(message => message)} />,
                                        accessor: "Tag",
                                        filterable: true,
                                        Cell: row => (
                                            <span>{row.original.Tag && row.original.Tag.value}</span>
                                        )
                                    },
                                    {
                                        Header: <FormattedMessage {...messages.segment} children={(message => message)} />,
                                        accessor: "Segment",
                                        filterable: true,
                                        Cell: row => (
                                            <span>{row.original.Segment && row.original.Segment.value}</span>
                                        )
                                    },
                                    {
                                        Header: <FormattedMessage {...messages.coordinate} children={(message => message)} />,
                                        filterable: false,
                                        sortable: false,
                                        Cell: row => (
                                            <span>{row.original.X && row.original.X.value + " " + row.original.X.unit + ", " + row.original.Y.value + " " + row.original.Y.unit + ", " + row.original.Z.value + " " + row.original.Y.unit}</span>
                                        )
                                    },
                                    {
                                        Header: <FormattedMessage {...messages.in} children={(message => message)} />,
                                        accessor: "In",
                                        filterable: true,
                                        Cell: row => (
                                            <span>{row.original.In && row.original.In.value + " " + row.original.In.unit}</span>
                                        )
                                    },
                                    {
                                        Header: <FormattedMessage {...messages.en} children={(message => message)} />,
                                        accessor: "En",
                                        filterable: true,
                                        Cell: row => (
                                            <span>{row.original.En && row.original.En.value + " " + row.original.En.unit}</span>
                                        )
                                    },
                                    {
                                        Header: <FormattedMessage {...messages.chain} children={(message => message)} />,
                                        accessor: "Chain",
                                        filterable: true,
                                        Cell: row => (
                                            <span>{row.original.Chain && row.original.Chain.value + " " + row.original.Chain.unit}</span>
                                        )
                                    },
                                    {
                                        Header: <FormattedMessage {...messages.DtsOffPipe} children={(message => message)} />,
                                        accessor: "DtsOffPipe",
                                        Cell: row => (
                                            <span>{row.original.DtsOffPipe && row.original.DtsOffPipe.value + " " + row.original.DtsOffPipe.unit}</span>
                                        )
                                    },
                                ]}
                                onFetchData={this.fetchUsers}
                            />
                        </div>
                        :
                        <div>
                            <NoDataFound skeleton="skeletonReactTable" mode="fullView" dataName="component" dataImg="pipelineDetail" button="add" createHandler={() => { this.updateDetails() }} />
                        </div>
                }
                {this.state.pipelineDetails.length > 0 &&
                    <div className="btn-fixed-group">
                        <button type="button" className="btn btn-fixed" onClick={() => this.downloadCsv()}>
                            <i className="far fa-file-export"></i>
                            <span className="btn-fixed-text">
                                <FormattedMessage {...commonMessages.export} children={(message => message)} />
                            </span>
                        </button>

                        <button type="button" className="btn btn-fixed" onClick={() => this.deleteHandler()} >
                            <i className="far fa-undo"></i>
                            <span className="btn-fixed-text">
                                <FormattedMessage {...messages.reSetAllDetails} children={(message => message)} />
                            </span>
                        </button>
                    </div>
                }


                {this.state.upload &&
                    <div className="modal show d-block" id="addFile">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title">
                                        <FormattedMessage {...messages.addPipelineDetail} children={(message => message)} />
                                        <button type="button" className="close" onClick={() => this.setState({ upload: false })}>&times;</button>
                                    </h4>
                                </div>
                                <div className="modal-body">
                                    <form className="contentForm shadowNone" onSubmit={this.onSubmitHandler}>
                                        <div className="form-group">
                                            <label className="form-label"><FormattedMessage {...messages.pipelineName} children={(message => message)} /><sup><i className="fas fa-asterisk" /></sup> :</label>
                                            <input type="text" defaultValue={this.state.pipelineName} className="form-control" id="name" required disabled autoFocus />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label"><FormattedMessage {...commonMessages.uploadCSV} children={(message => message)} /><sup><i className="fas fa-asterisk" /></sup> :</label>
                                            <div className="fx-b80">
                                                <div className="dropZoneOuterBox pd-r-0 mr-0 w-100">
                                                    <Dropzone
                                                        accept=".csv"
                                                        className="dropZoneBox"
                                                        disablePreview={false}
                                                        multiple={false}
                                                        onDrop={this.onDrop.bind(this)}
                                                    >
                                                        <div className="dropZoneBoxContent">
                                                            <img src={require('../../assets/images/file.png')} />
                                                            <p> {this.state.uploadedFile ?
                                                                this.state.uploadedFile.name :
                                                                <FormattedMessage {...commonMessages.dropzonemsg} children={(message => message)} />}
                                                            </p>
                                                        </div>
                                                    </Dropzone>
                                                    {this.state.isScadaSensorCsvReqired && <p className="modBusErrorMsg">
                                                        <FormattedMessage {...messages.scadaSensorErrorMsg} children={(message => message)} />
                                                    </p>}
                                                    {this.state.incorrectfileErrorMsg && <p className="modBusErrorMsg">
                                                        <FormattedMessage {...messages.incorrectfileErrorMsg} children={(message => message)} />
                                                    </p>}
                                                </div>
                                                <button
                                                    type="button"
                                                    className="btn-transparent text-cyan mr-t-8"
                                                    onClick={() => this.downloadCsv(this.state.sampleCsvData)}
                                                >
                                                    <FormattedMessage {...commonMessages.downloadSample} children={(message => message)} />
                                                    <i className="far fa-download mr-l-8" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="form-group justify-content-end mt-3">
                                            <button className="btn btn-danger">
                                                <i className="far fa-check-circle"></i> <FormattedMessage {...commonMessages.save} children={(message => message)} />
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                {this.state.isOpen ?
                    <MessageModal
                        type={this.state.type}
                        message={this.state.message}
                        onConfirm={() => this.setState({
                            isOpen: false,
                            isFetching: true,
                        }, () => this.props.deleteFileHandler(this.props.match.params.id, this.props.match.params.pipelineId))}
                        onClose={this.modalCloseHandler} /> : null}
            </div>
        );
    }
}

PipeLineDetail.propTypes = {
    dispatch: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
    pipelinesDetails: pipelinesDetails(),
    pipelinesDetailsError: pipelinesDetailsError(),
    saveConfirm: saveConfirm(),
    saveConfirmError: saveConfirmError(),
    deleteDetails: deleteDetails(),
    deleteDetailsFailure: deleteDetailsFailure()
});

export function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        getPipelineDetails: (plantId, pipelineId, payload) => dispatch(getPipelineDetails(plantId, pipelineId, payload)),
        savePipelineDetails: (fileDetails) => dispatch(savePipelineDetails(fileDetails)),
        deleteFileHandler: (plantId, pipelienId) => dispatch(deleteFileHandler(plantId, pipelienId)),
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
);

const withReducer = injectReducer({ key: "pipeLineDetail", reducer });
const withSaga = injectSaga({ key: "pipeLineDetail", saga });

export default compose(
    withReducer,
    withSaga,
    withConnect
)(PipeLineDetail);

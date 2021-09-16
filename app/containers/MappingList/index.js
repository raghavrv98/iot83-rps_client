/**
 *
 * MappingList
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { FormattedMessage } from "react-intl";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import {
  mappingListSuccess, mapingListFailure,
  agentDetailsSuccess, agentDetailsFailure,
  deleteMappingSuccess, deleteMappingFailure,
  saveMappingFailure, saveMappingSuccess,
  getPlantListSuccess, getPlantListFailure,
  getPipelineListSuccess, getPipelineListFailure,
} from "./selectors";
import { fetchMappingsList, getAgentDetails, deleteConfirm, saveMapping, managePlantList, managePipelineList } from "./actions";
import MessageModal from '../../components/MessageModal/Loadable'
import SkeletonLoader from '../../components/SkeletonLoader';
import reducer from "./reducer";
import saga from "./saga";
import messages from "./messages";
import commonMessages from '../../messages';
import NoDataFound from "../../components/NoDataFound";
import { cloneDeep } from 'lodash';
import $ from 'jquery';
import { saveAs } from 'file-saver';

import AceEditor from "react-ace";
import 'brace/mode/python';
import 'brace/mode/json';
import 'brace/theme/monokai';
import 'brace/ext/searchbox'
import 'brace/ext/language_tools'

import { Prompt } from 'react-router';

/* eslint-disable react/prefer-stateless-function */
export class MappingList extends React.Component {
  state = {
    payload: {
      mappings: []
    },
    isFetching: true,
    agentName: "",
    agentType: "",
    agentId: "",
    deviceTag: "",
    showWarningMessage: false,
    plantList: [],
    pipelineList: [],
    isClearEnable: {},
    editorError: false
  }

  componentWillMount() {
    this.props.getAgentDetails(this.props.match.params.id);
    this.props.managePlantList();
    this.props.managePipelineList()
    this.props.fetchMappingsList(this.props.match.params.id)
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.getPlantListSuccess && nextProps.getPlantListSuccess !== this.props.getPlantListSuccess) {
      this.setState({
        plantList: nextProps.getPlantListSuccess.result,
      })
    }

    if (nextProps.getPipelineListSuccess && nextProps.getPipelineListSuccess !== this.props.getPipelineListSuccess) {
      this.setState({
        pipelineList: nextProps.getPipelineListSuccess.result,
      })
    }

    if (nextProps.mappingListSuccess && nextProps.mappingListSuccess !== this.props.mappingListSuccess) {
      let payload = nextProps.mappingListSuccess

      this.setState({
        payload,
        isFetching: false,
        isClearEnable: nextProps.mappingListSuccess
      }, () => {
        let hierarchyJson = Object.keys(payload).length > 0 ? this.ntraverse(payload.mappings[0], payload.mappings) : {}
        this.setState({
          hierarchyJson
        })
      })
    }
    if (nextProps.agentDetailsSuccess && nextProps.agentDetailsSuccess !== this.props.agentDetailsSuccess) {
      this.setState({
        agentName: nextProps.agentDetailsSuccess.rps.name,
        agentType: nextProps.agentDetailsSuccess.rps.type,
        agentID: nextProps.agentDetailsSuccess.rps.agentId,
        deviceTag: nextProps.agentDetailsSuccess.rps.deviceTag
      })
    }
    if (nextProps.deleteMappingSuccess && nextProps.deleteMappingSuccess !== this.props.deleteMappingSuccess) {
      let payload = cloneDeep(this.state.payload)
      payload.mappings = payload.mappings.filter(val => val.id != nextProps.deleteMappingSuccess)
      this.setState({
        payload,
        isFetching: false,
        isOpen: true,
        message: <FormattedMessage {...messages.deleteMappingSuccess} children={(message => message)} />,
        type: "success"
      }, () => this.props.fetchMappingsList(this.props.match.params.id))
    }
    if (nextProps.saveMappingSuccess && nextProps.saveMappingSuccess !== this.props.saveMappingSuccess) {
      this.setState({
        isFetching: false,
        isOpen: true,
        message: <FormattedMessage {...messages.successMappings} children={(message => message)} />,
        type: "success"
      }, () => this.props.fetchMappingsList(this.props.match.params.id));
    }

    ['mapingListFailure', 'agentDetailsFailure', 'deleteMappingFailure', 'saveMappingFailure', 'getPlantListFailure', 'getPipelineListFailure'].map(val => {
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

  handleConfirmDelete = () => {
    this.setState({
      isOpen: true,
      message: <FormattedMessage {...commonMessages.deleteConfirmMessage} children={(message => message)} />,
      type: "confirm",
    });
  };

  modalCloseHandler = () => {
    this.setState({
      isOpen: false,
      message: "",
      type: ""
    })
  }

  nameChangeHandler = event => {
    let duplicateObject = cloneDeep(this.state.duplicateObject)
    duplicateObject[event.target.id] = event.target.value
    this.setState({
      duplicateObject,
      showWarningMessage: true
    })
  }

  saveChanges = event => {
    event.preventDefault()
    let payload = cloneDeep(this.state.payload)
    let duplicateObject = cloneDeep(this.state.duplicateObject)
    let realObject = cloneDeep(this.state.realObject)

    payload.mappings.map((parent) => {
      if (parent.name === realObject.name) {
        parent.name = duplicateObject.name
      }
      parent.connections && parent.connections.map((child) => {
        if (child.name === realObject.name) {
          child.name = duplicateObject.name
        }
      })
    })

    let hierarchyJson = Object.keys(payload).length > 0 ? this.ntraverse(payload.mappings[0], payload.mappings) : {}

    this.setState({
      payload,
      hierarchyJson
    }, () => { !this.state.editorError && this.toggleDetails("close") })

  }

  saveMapping = () => {
    let payload = cloneDeep(this.state.payload)
    this.setState({
      isFetching: true,
      showWarningMessage: false
    }, () => { this.props.saveMapping(payload, this.props.match.params.id) })
  }

  downloadConfig = () => {
    let payload = cloneDeep(this.state.payload)
    var fileName = 'MappingConfig.json';
    // Create a blob of the data
    var fileToSave = new Blob([JSON.stringify(payload)], {
      type: 'application/json',
      name: fileName
    });
    // Save the file
    saveAs(fileToSave, fileName);
  }

  importConfigHandler = (event) => {
    let payload = cloneDeep(this.state.payload)
    let file = event.target.files[0]
    var fileread = new FileReader();
    fileread.onload = (e) => {
      try {
        var content = e.target.result;
        payload = JSON.parse(content);
      } catch (e) {
        this.setState({
          isOpen: true,
          message: "Error in Json Input",
          type: "error"
        })
      }
      let hierarchyJson = Object.keys(payload).length > 0 ? this.ntraverse(payload.mappings[0], payload.mappings) : {}

      this.setState({
        payload,
        hierarchyJson,
        showWarningMessage: true
      })
    };
    fileread.readAsText(file);
  }

  deleteConfirmMapping = () => {
    let payload = cloneDeep(this.state.payload)
    this.setState({
      isFetching: true,
      isOpen: false,
      message: ""
    }, () => this.props.deleteConfirm(this.props.match.params.id, payload._id))
  }

  editorChangeHandler = (code) => {

    let payload = cloneDeep(this.state.payload)
    let duplicateObject = cloneDeep(this.state.duplicateObject)
    let realObject = cloneDeep(this.state.realObject)

    duplicateObject.code = code

    if (code === "") {
      this.setState({
        duplicateObject,
        editorError: true
      })
    }
    else {

      payload.mappings = payload.mappings.map(val => {
        if (val.name === realObject.name) {
          val.code = code
        }
        return val
      })

      this.setState({
        payload,
        duplicateObject,
        showWarningMessage: true,
        editorError: false
      })
    }
  }

  ntraverse = (parent, mappingList) => {
    if (parent.connections) {
      parent.connections = parent.connections.map((referenceObject) => {
        let newParent = mappingList.find(realObject => realObject.name === referenceObject.name) || {}
        return this.ntraverse(newParent, mappingList)
      })
    }
    return parent
  }

  getHierarchyHtml = (hierarchyJson) => {
    if (Object.keys(hierarchyJson).length > 0) {
      let html
      html = <ul className="treeView">
        <li>
          <div className="nested" onClick={() => this.toggleDetails(hierarchyJson.name)}>
            <h6 className="bg-lightBlue"><span><i className="far fa-project-diagram"></i></span>{hierarchyJson.name}</h6>
          </div>
          {hierarchyJson.connections.map(parentNode => parentNode.connections && parentNode.connections.length > 0 ? this.getChildrenHtml(parentNode) : <div className="nested endNode">
            <h6>{parentNode.name}</h6>
          </div>
          )}
        </li>
      </ul>
      return html;
    }
  }

  getChildrenHtml = (node) => {
    let childHtml
    let tag = <div className="nested" onClick={() => this.toggleDetails(node.name)}>
      <h6 className={node.type == "action" ? "bg-lightBlue" : "bg-lightOrange"}><span><i className={node.type == "action" ? "far fa-project-diagram" : "far fa-question-circle f-16"}></i></span>{node.name}</h6>
    </div>
    if (node.type === "action") {
      childHtml = <React.Fragment>
        {tag}
        {node.connections.map(parentNode => this.getChildrenHtml(parentNode))}
      </React.Fragment >
    } else {
      childHtml = <div>
        {tag}
        {node.connections && node.connections.length ?
          <ul className="treeView">
            {node.connections.map((parentNode, index) => <li key={index}>
              {this.getChildrenHtml(parentNode)}
            </li>
            )}
          </ul>
          :
          <div className="nested endNode">
            <h6>{node.name}</h6>
          </div>
        }
      </div>
    }
    return childHtml;
  }


  sliderExpandHandler = () => {
    let isExpand = this.state.isExpand
    this.setState({
      isExpand: !isExpand
    })
  }

  toggleDetails(name) {
    if (name === "close") {
      this.setState({
        isSliderOpen: false,
        isExpand: false,
        editorError: false
      }, () => {
        $(".pipelineDetailPage").removeClass('slideInRight');
        $(".pipelineDetailPage").addClass('slideInLeft').css({ right: '1px' });
      }
      )
    }
    else {
      let payload = cloneDeep(this.state.payload)
      let duplicateObject = payload.mappings.find(duplicateObject => duplicateObject.name === name)
      let realObject = cloneDeep(duplicateObject)

      this.setState({
        isSliderOpen: true,
        realObject,
        isExpand: false,
        editorError: false,
        duplicateObject
      }, () => {
        $(".pipelineDetailPage").removeClass('slideInLeft');
        $(".pipelineDetailPage").css({ right: '1px' }).addClass('slideInRight');
      }
      )
    }
  }

  render() {
    window.onbeforeunload = this.state.showWarningMessage && function () {
      return "Data will be lost if you leave the page, are you sure?";
    };
    return (
      <div className="appContent">
        <Helmet>
          <title> Mapping List </title>
          <meta name="description" content="Description of MappingList" />
        </Helmet>

        <div className="pageBreadcrumb">
          <div className="flex-item fx-b80">
            <p className="pd-l-30">
              <span className="cursor-pointer" onClick={() => { this.props.history.push('/manageAgents'); }}>
                <button className="btn btn-transparent" >
                  <i className="far fa-long-arrow-left"></i>
                </button>
                <FormattedMessage {...messages.title} children={(message => message)} />
              </span>
            </p>
            <h5>
              <FormattedMessage {...messages.totalMappings} children={(message => message)} />
              {this.state.isFetching ? null :
                <span className="customCountBadge">{this.state.payload.mappings && this.state.payload.mappings.length}</span>
              }
              <span className="mx-3">|</span>
              <FormattedMessage {...commonMessages.agentName} children={(message => message)} /> - <span className="text-theme">{this.state.agentName}</span>
              <span className="mx-3">|</span>
              <FormattedMessage {...commonMessages.agentType} children={(message => message)} /> - <span className="text-theme">{this.state.agentType}</span>
              <span className="mx-3">|</span>
              <FormattedMessage {...messages.deviceTag} children={(message => message)} /> - <span className="text-theme">{this.state.deviceTag}</span>
              <span className="mx-3">|</span>
              <FormattedMessage {...commonMessages.plantName} children={(message => message)} /> - <span className="text-theme">{this.state.plantList.length > 0 && this.state.payload.plantId && this.state.plantList.find(val => val._id === this.state.payload.plantId) && this.state.plantList.find(val => val._id === this.state.payload.plantId).name}</span>
              <span className="mx-3">|</span>
              <FormattedMessage {...commonMessages.pipelineName} children={(message => message)} /> - <span className="text-theme">{this.state.pipelineList.length > 0 && this.state.payload.pipelineId && this.state.pipelineList.find(val => val._id === this.state.payload.pipelineId) && this.state.pipelineList.find(val => val._id === this.state.payload.pipelineId).name}</span>
            </h5>
          </div>
        </div>
        {this.state.isFetching ?
          <SkeletonLoader skeleton="skeletonFlowChart" mode="fullView" /> :
          this.state.payload.mappings && this.state.payload.mappings.length > 0 ?
            this.state.hierarchyJson && this.getHierarchyHtml(this.state.hierarchyJson)
            :
            <NoDataFound skeleton="skeletonFlowChart" mode="fullView" dataName="mappings" dataImg="chart" button="import" importConfigHandler={(event) => this.importConfigHandler(event)} />
        }

        {this.state.isFetching || Object.keys(this.state.payload).length == 0 ? null :
          <div className="btn-fixed-group">
            <button disabled={Object.keys(this.state.isClearEnable).length == 0} type="button" className="btn btn-fixed" onClick={this.downloadConfig}>
              <i className="far fa-share-square" />
              <span className="btn-fixed-text">
                <FormattedMessage {...commonMessages.exportAsJson} children={(message => message)} />
              </span>
            </button>

            <button type="button" className="btn btn-fixed">
              <i className="far fa-file-import" />
              <span className="btn-fixed-text">
                <FormattedMessage {...commonMessages.import} children={(message => message)} />
                <input type="file" accept="application/JSON" onChange={this.importConfigHandler} />
              </span>
            </button>

            <button disabled={Object.keys(this.state.isClearEnable).length == 0} type="button" className="btn btn-fixed" onClick={this.handleConfirmDelete}>
              <i className="far fa-times" />
              <span className="btn-fixed-text">
                <FormattedMessage {...messages.clear} children={(message => message)} />
              </span>
            </button>

            <button type="button" onClick={this.saveMapping} className="btn btn-danger mr-t-20">
              <i className="far fa-check-circle" />
              <span className="btn-fixed-text">
                <FormattedMessage {...commonMessages.save} children={message => message} />
              </span>
            </button>
          </div>
        }

        {this.state.isSliderOpen &&
          <div className={this.state.isExpand ? "sliderBlur" : ""}>
            <div className={this.state.isExpand ? "pipelineDetailPage mappingDetail animated expandBox" : "pipelineDetailPage mappingDetail animated"}>
              <form onSubmit={this.saveChanges}>
                <div className="detailPageContent">
                  <h5>{this.state.realObject.name === "" ? "Name" : this.state.realObject.name}</h5>
                  <div className="form-group">
                    <label className="form-label"><FormattedMessage {...commonMessages.name} children={message => message} /> :</label>
                    <input type="text" className="form-control" id="name" onChange={this.nameChangeHandler} value={this.state.duplicateObject.name} required />
                  </div>

                  {this.state.duplicateObject.type == "action" ? null :
                    <React.Fragment>
                      <div className="form-group">
                        <label className="form-label"><FormattedMessage {...messages.code} children={message => message} /> :</label>

                        <AceEditor
                          name="code_editor"
                          placeholder="Type code here..."
                          mode="python"
                          theme="monokai"
                          value={this.state.duplicateObject.code}
                          height="300px"
                          width="100%"
                          fontSize={14}
                          showGutter={true}
                          showPrintMargin={false}
                          enableBasicAutocompletion={true}
                          enableLiveAutocompletion={true}
                          highlightActiveLine={true}
                          enableSnippets={false}
                          tabSize={4}
                          onChange={(code) => { this.editorChangeHandler(code) }}
                        />
                        {this.state.editorError ? (
                          <span className="inputErrorMsg">
                            <FormattedMessage {...messages.editorError} children={(message => message)} />
                          </span>
                        ) : null}
                      </div>

                      <div className="flex justify-content-end">
                        <button type="button" className="btn btn-transparent btn-expand" onClick={this.sliderExpandHandler}>
                          <i className={this.state.isExpand ? "far fa-compress" : "far fa-expand"}></i>
                        </button>
                      </div>
                    </React.Fragment>
                  }

                </div>
                <div className="flex justify-content-end my-3">
                  <button className="btn btn-danger">
                    <i className="far fa-check-circle" />
                    <FormattedMessage {...commonMessages.save} children={message => message} />
                  </button>
                  <button className="btn btn-secondary mr-l-10" onClick={() => this.toggleDetails("close")}>
                    <i className="far fa-times" />
                    <FormattedMessage {...commonMessages.cancelButton} children={(message => message)} />
                  </button>
                </div>

                {this.state.duplicateObject.type == "action" ? null :
                  <div className="mappingInstructions">
                    <h6>
                      Note :
                  </h6>
                    <ol>
                      <li>There must be one method with the name <b>main().</b></li>
                      <li>The <b>main()</b> method must contain <b>one parameter</b> of type dictionary and it will have one key with the name <b>output</b> <b>(</b> Dictionary containing response from the previous algorithm <b>)</b>.</li>
                      <li>The <b>main()</b> method must return a None or String containing the name of the <b>next algorithm</b>.</li>
                    </ol>
                  </div>
                }
              </form>
            </div>
          </div>
        }

        {this.state.isOpen &&
          <MessageModal
            type={this.state.type}
            message={this.state.message}
            onClose={this.modalCloseHandler}
            onConfirm={() => this.deleteConfirmMapping()}
          />}

        <Prompt when={this.state.showWarningMessage} message='Leave site? Changes you made may not be saved.' />
      </div>
    );
  }
}

MappingList.propTypes = {
  dispatch: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  getPlantListSuccess: getPlantListSuccess(),
  getPlantListFailure: getPlantListFailure(),
  getPipelineListSuccess: getPipelineListSuccess(),
  getPipelineListFailure: getPipelineListFailure(),
  mappingListSuccess: mappingListSuccess(),
  mapingListFailure: mapingListFailure(),
  agentDetailsSuccess: agentDetailsSuccess(),
  agentDetailsFailure: agentDetailsFailure(),
  deleteMappingSuccess: deleteMappingSuccess(),
  deleteMappingFailure: deleteMappingFailure(),
  saveMappingFailure: saveMappingFailure(),
  saveMappingSuccess: saveMappingSuccess(),
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchMappingsList: (id) => dispatch(fetchMappingsList(id)),
    getAgentDetails: (id) => dispatch(getAgentDetails(id)),
    deleteConfirm: (id, mappingId) => dispatch(deleteConfirm(id, mappingId)),
    saveMapping: (payload, id) => dispatch(saveMapping(payload, id)),
    managePlantList: () => dispatch(managePlantList()),
    managePipelineList: () => dispatch(managePipelineList()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "mappingList", reducer });
const withSaga = injectSaga({ key: "mappingList", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(MappingList);

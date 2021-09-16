/**
 *
 * PipelineHealth
 *
 */

import React from "react";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from "react-intl";
import messages from "./messages";
import NoDataFound from '../NoDataFound';
import SkeletonLoader from '../SkeletonLoader';
import { reduceToK } from '../../utils/commonUtils';



function PipelineHealth(props) {
  return (
    <div className="card-body pipelineNavBody">
      {props.fetchingPipelines ?
          <SkeletonLoader skeleton="skeletonPipelineHealth" />
         : 
         props.pipelineList.length > 0 ? <ul className="pipelineViewList">
          {props.pipelineList.map((pipeline, index) => <li key={index}
            id="selectedPipeline"
            onClick={ props.isPipelineDisabled ? undefined : props.onPipelineClick("selectedPipeline", pipeline)}
          >
            <div
              className={`pipelineStructure ${props.isPipelineDisabled ? pipeline.selected ? "active" : " disabled" : pipeline.selected ? " active " : ""}`}>
              <h6 style={{ backgroundColor: pipeline.healthcolor }}>{pipeline.label}</h6>
              {pipeline.totalAlarm > 0 &&
                <div className="pipelineNavAlarm">
                  <p>{reduceToK(pipeline.totalAlarm)}</p>
                </div>}
            </div>
          </li>)}
        </ul> :
          <NoDataFound noDataCommonMsg={false} mode={props.noDataMode} skeleton="skeletonPipelineHealth" dataName="pipeline" dataImg="pipelineDetail" />
      }
    </div>
  );
}

PipelineHealth.propTypes = {};

export default PipelineHealth;

import React from "react";
import PropTypes from 'prop-types';
import * as skeleton from '../../utils/skeleton';
import { FormattedMessage } from "react-intl";
import messages from "./messages";

function NoDataFound(props) {
  return (
    <div className={props.mode === "fullView" ? "noDataOuter noDataFullOuter" : props.mode === "middleView" ? "noDataOuter noDataMidOuter" : "noDataOuter"}>
      { props.skeleton && skeleton[props.skeleton]}
      <div className={props.mode === "fullView" ? "noDataFullView" : props.mode === "middleView" ? "noDataMidView" : "noDataSmallView"}>
        <div className="noDataImage">
          <img src={`${window.API_URL}api/public/static/assets/${props.dataImg}.png`} />
        </div>
        {props.noDataCommonMsg ? <h3><FormattedMessage {...messages.noData} children={(message => message)} /></h3> : null}
        <h4>There is no {props.dataName} to display.</h4>
        {props.button === "add" ?
          <button type="button" onClick={() => { props.createHandler() }} className="btn btn-create">
            <i className="far fa-plus"></i>
          </button>
          :
          props.button === "reload"
            ?
            <button type="button" onClick={() => { props.reloadHandler() }} className="btn btn-create">
              <i className="far fa-redo-alt"></i>
            </button>
            :
            props.button === "import" ?
              <button type="button" className="btn btn-create">
                <i className="far fa-file-import" />
                <input type="file" accept="application/JSON" onChange={(event) => { props.importConfigHandler(event) }} />
              </button>
              :
              null
        }
      </div>
    </div>
  );
}

NoDataFound.propTypes = {
  noDataCommonMsg: PropTypes.bool
};

NoDataFound.defaultProps = {
  noDataCommonMsg: true
}

export default NoDataFound;

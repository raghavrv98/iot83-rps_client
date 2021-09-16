import React from "react";
import ReactTable from "react-table";

export const skeletonReactTable = <div className="customReactTableBox">
    <ReactTable
        columns={[...Array(7).keys()].map(temp => ({
            Header: "",
            accessor: "name"
        }))}
        noDataText=""
        defaultPageSize={10}
        className="customReactTable"
        PreviousComponent={(props) => <button type="button"{...props}><i className="fas fa-angle-left"></i></button>}
        NextComponent={(props) => <button type="button" {...props}><i className="fas fa-angle-right"></i></button>}
    />
</div>

export const skeletonListCount =
    <ul className="listView">
        {[...Array(10).keys()].map((temp, i) =>
            <li key={i}>
                <div className="listLogo">
                    <div className="skeletonContent"></div>
                </div>
                <div className="listDetail">
                    <h6 className="skeletonContent"></h6>
                    <p className="skeletonContent"></p>
                </div>
                <div className="listDetail">
                    <h6 className="skeletonContent"></h6>
                    <p className="skeletonContent"></p>
                </div>
                <div className="listDetail">
                    <h6 className="skeletonContent"></h6>
                    <p className="skeletonContent"></p>
                </div>
                <div className="listDetail">
                    <h6 className="skeletonContent"></h6>
                    <p className="skeletonContent"></p>
                </div>
                <div className="listDetail">
                    <h6 className="skeletonContent"></h6>
                    <p className="skeletonContent"></p>
                </div>
            </li>
        )}
    </ul>

export const skeletonListFullView =
    <div>
        <div className="alarmAlertsView">
            {[...Array(5).keys()].map((temp, i) =>
                <div key={i} className="fx-b20 pd-r-15 pd-l-15">
                    <div className="filterView">
                        <div></div>
                    </div>
                </div>
            )}
        </div>
        <ul className="listView">
            {[...Array(7).keys()].map((temp, i) =>
                <li key={i}>
                    <div className="listLogo">
                        <div className="skeletonContent"></div>
                    </div>
                    <div className="listDetail">
                        <h6 className="skeletonContent"></h6>
                        <p className="skeletonContent"></p>
                    </div>
                    <div className="listDetail">
                        <h6 className="skeletonContent"></h6>
                        <p className="skeletonContent"></p>
                    </div>
                    <div className="listDetail">
                        <h6 className="skeletonContent"></h6>
                        <p className="skeletonContent"></p>
                    </div>
                    <div className="listDetail">
                        <h6 className="skeletonContent"></h6>
                        <p className="skeletonContent"></p>
                    </div>
                    <div className="listDetail">
                        <h6 className="skeletonContent"></h6>
                        <p className="skeletonContent"></p>
                    </div>
                </li>
            )}
        </ul>
    </div>

export const cardSkeleton =
    <ul className="cardView" >
        {[...Array(8).keys()].map((temp, i) =>
            <li key={i}>
                <div className="card">
                    <div className="card-header">
                        <div className="customCardHeader">
                            <div className="flex align-items-center">
                                <div className="fx-b60">
                                    <h4 className="skeletonContent"></h4>
                                </div>
                                <div className="fx-b40">
                                    <div className="buttonContent text-right">
                                        <button className="skeletonButton"></button>
                                        <button className="skeletonButton"></button>
                                        <button className="skeletonButton"></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="btnLayout"></div>
                    </div>
                    <div className="card-body">
                        <div className="flex mr-b-10">
                            <h6 className="skeletonContent"></h6>
                            <p className="skeletonContent"></p>
                        </div>
                        <div className="flex mr-b-10">
                            <h6 className="skeletonContent"></h6>
                            <p className="skeletonContent"></p>
                        </div>
                        <div className="flex mr-b-10">
                            <h6 className="skeletonContent"></h6>
                            <p className="skeletonContent"></p>
                        </div>
                        <div className="flex align-items-center mr-b-10">
                            <h6 className="skeletonContent"></h6>
                            <ul className="skeletonShift">
                                <li></li>
                                <li></li>
                                <li></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </li>
        )}
    </ul>

export const skeletonFullViewCount =
    <div>
        <div className="alarmAlertsView">
            {[...Array(5).keys()].map((temp, i) =>
                <div key={i} className="fx-b20 pd-r-15 pd-l-15">
                    <div className="filterView">
                        <div></div>
                    </div>
                </div>
            )}
        </div>
        <ul className="listView alarmView">
            {[...Array(7).keys()].map((temp, i) =>
                <li key={i}>
                    <div className="listLogo">
                        <div className="skeletonContent"></div>
                    </div>
                    <p className="skeletonContent mr-0">
                        <span className="skeletonContent"></span>
                        <span className="skeletonContent"></span>
                        <span className="skeletonContent"></span>
                        <span className="skeletonContent"></span>
                    </p>
                    <p className="skeletonContent alarmDetailSkeleton"></p>
                    <div className="btnList">
                        <button className="skeletonButton"></button>
                        <button className="skeletonButton"></button>
                        <button className="skeletonButton"></button>
                    </div>
                </li>
            )}
        </ul>
    </div>

export const skeletonAlarmListCount =
    <ul className="listView alarmView">
        {[...Array(7).keys()].map((temp, i) =>
            <li key={i}>
                <div className="listLogo">
                    <div className="skeletonContent"></div>
                </div>
                <p className="mr-0">
                    <span className="skeletonContent"></span>
                    <span className="skeletonContent"></span>
                    <span className="skeletonContent"></span>
                    <span className="skeletonContent"></span>
                </p>
                <p className="skeletonContent alarmDetailSkeleton"></p>
                <div className="btnList">
                    <button className="skeletonButton"></button>
                    <button className="skeletonButton"></button>
                    <button className="skeletonButton"></button>
                </div>
            </li>
        )}
    </ul>

export const skeletonContentipeline =
    <div className="pipelineStructure"></div>

export const skeletonFullView =
    <div>
        <ul className="listView pipeList">
            {[...Array(2).keys()].map((temp,i) =>
                <li key={i} className="mr-b-20">
                    <div className="pipeInfo"></div>
                    <div className="pipelineStructure"></div>
                    <button className="skeletonButton"></button>
                </li>
            )}
        </ul>
        <div className="customReactTableBox">
            <ReactTable
                columns={[...Array(5).keys()].map(temp => ({
                    Header: "",
                    accessor: "name"
                }))}
                noDataText=""
                defaultPageSize={10}
                className="customReactTable"
                PreviousComponent={(props) => <button type="button"{...props}><i className="fas fa-angle-left"></i></button>}
                NextComponent={(props) => <button type="button" {...props}><i className="fas fa-angle-right"></i></button>}
            />
        </div>
    </div>

export const skeletonFlowChart =
    <div className="position-relative">
    <ul className="skeletonTreeView">
    <li>
        <div className="treeContent"><h6 className="skeletonContent"></h6></div>
    </li>
    <li>
        <div className="treeContent"><h6 className="skeletonContent"></h6></div>
        <div className="flex flex-column">
        <div className="DecisionContent">
        <div className="treeContent">
            <h6 className="skeletonContent"></h6>
        </div>
        <ul className="skeletonTreeView mr-t-15">
            <li><div className="treeContent"><h6 className="skeletonContent"></h6></div></li>
            <li><div className="treeContent"><h6 className="skeletonContent"></h6></div></li>
            <li><div className="treeContent"><h6 className="skeletonContent"></h6></div></li>
        </ul>
        </div>
        </div>
    </li>
    <li>
        <div className="treeContent"><h6 className="skeletonContent"></h6></div>
        <div className="flex flex-column">
        <div className="DecisionContent">
        <div className="treeContent">
            <h6 className="skeletonContent"></h6>
        </div>
        <ul className="skeletonTreeView mr-t-15">
            <li><div className="treeContent"><h6 className="skeletonContent"></h6></div></li>
            <li><div className="treeContent"><h6 className="skeletonContent"></h6></div></li>
            <li><div className="treeContent"><h6 className="skeletonContent"></h6></div></li>
        </ul>
        </div>
        </div>
    </li>
    <li>
        <div className="treeContent"><h6 className="skeletonContent"></h6></div>
        <div className="treeContent"><h6 className="skeletonContent"></h6></div>
    </li>
    <li>
        <div className="treeContent"><h6 className="skeletonContent"></h6></div> 
        <div className="treeContent"><h6 className="skeletonContent"></h6></div>
    </li>
    <li>
        <div className="treeContent"><h6 className="skeletonContent"></h6></div> 
    </li>
    </ul>
    <div className="nodeEditBox">
        <div className="nodeHeading">
            <h6 className="skeletonContent"></h6>
        </div>
        <div className="rowView flex-column">
            <div className="formLabel">
                <h5 className="skeletonContent"></h5>
            </div>
            <div className="formInput">
                <div></div>
            </div>
        </div>
        <div className="flex justify-content-end mr-t-10">
            <button className="skeletonButton mr-r-10"></button>
            <button className="skeletonButton"></button>
        </div>
    </div>
    </div>

export const skeletonHtmlTable =
    <table className="table customHTMLTable">
        <thead>
            <tr>
                {[...Array(5).keys()].map((temp, i) =>
                    <th key={i} width="20%">
                        <span className="skeletonContent"></span>
                    </th>
                )}
            </tr>
        </thead>
        <tbody>
            {[...Array(20).keys()].map((temp, i) =>
                <tr key={i}>
                    <td><span className="skeletonContent"></span></td>
                    <td><span className="skeletonContent"></span></td>
                    <td><span className="skeletonContent"></span></td>
                    <td><span className="skeletonContent"></span></td>
                    <td><span className="skeletonContent"></span></td>
                </tr>
            )}
        </tbody>
    </table>

export const skeletonAlarmType =
    <ul className="typeSkeleton">
        {[...Array(10).keys()].map((temp, i) =>
            <li key={i} className="itemSkeleton">
                <span className="skeletonContent"></span>
                <div></div>
                <button className="skeletonButton"></button>
            </li>
        )}
    </ul>

export const skeletonContentipelineHealth =
    <ul className="skeletonPipelineHealth">
        {[...Array(10).keys()].map((temp, i) =>
            <li key={i}>
                <div className="pipelineStructure"></div>
            </li>
        )}
    </ul>

export const skeletonDashFullView =
    <div className="flex">
        <div className="div-lg mr-b-sm mr-b-lg">
            <div className="card dashSkeleton">
                <div className="card-header detailView">
                    <span className="skeletonContent"></span>
                </div>
                <div className="card-body">
                    <div className="schematicChart">
                        <div className="pipelineStructure">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="div-sm mr-b-lg">
            <div className="skeletonPipelineFilter dashboardSkeleton">
                <div className="card">
                    <div className="card-header detailView">
                        <span className="skeletonContent"></span>
                    </div>
                    <div className="card-body">
                        <ul className="skeletonPipelineHealth">
                            {[...Array(4).keys()].map((temp, i) =>
                                <li key={i}>
                                    <div className="pipelineStructure"></div>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div className="div-lg mr-b-sm">
            <div className="card dashSkeleton">
                <div className="card-header detailView">
                    <div className="BtntoggleSkeleton">
                        <button className="skeletonButton"></button>
                    </div>
                    <span className="skeletonContent"></span>
                    <p className="skeletonContent"></p>
                    <div className="attributeSkeleton" />
                </div>
                <div className="card-body chartSkeleton">
                    <div className="lineChart">
                        <div className="chartOuter borderNone">
                            <div className="yLabels">
                                {[...Array(5).keys()].map((temp, i) =>
                                    <span className="skeletonContent" key={i}></span>
                                )}
                            </div>
                            <div className="chartInner"></div>
                            <div className="xLabels">
                                {[...Array(7).keys()].map((temp, i) =>
                                    <span className="skeletonContent" key={i}></span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="div-sm">
            <div className="card dashSkeleton">
                <div className="card-header detailView paramterHeading">
                    <span className="skeletonContent"></span>
                    <button className="skeletonButton"></button>
                </div>
                <div className="card-body parameterSkeleton">
                    <ul>
                        {[...Array(4).keys()].map((temp, i) =>
                            <li key={i}>
                                <h6 className="skeletonContent"></h6>
                                <p className="skeletonContent"></p>
                            </li>
                        )}
                    </ul>
                    <div className="statusSkeleton">
                        <p className="skeletonContent"></p>
                        <div></div>
                    </div>
                    <div className="graphSkeleton">
                        <div className="chartOuter borderNone">
                            <div className="yLabels">
                                {[...Array(5).keys()].map((temp, i) =>
                                    <span className="skeletonContent" key={i}></span>
                                )}
                            </div>
                            <div className="chartInner"></div>
                            <div className="xLabels">
                                {[...Array(7).keys()].map((temp, i) =>
                                    <span className="skeletonContent" key={i}></span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

export const skeletonDetailedView =
    <div className="chartOuter">
        <div className="yLabels">
            {[...Array(7).keys()].map((temp, i) =>
                <span className="skeletonContent" key={i}></span>
            )}
        </div>
        <div className="chartInner"></div>
        <div className="xLabels">
            {[...Array(7).keys()].map((temp, i) =>
                <span className="skeletonContent" key={i}></span>
            )}
        </div>
    </div>

export const skeletonParameterView =
    <div className="chartOuter">
        <div className="yLabels">
            {[...Array(5).keys()].map((temp, i) =>
                <span className="skeletonContent" key={i}></span>
            )}
        </div>
        <div className="chartInner"></div>
        <div className="xLabels">
            {[...Array(7).keys()].map((temp, i) =>
                <span className="skeletonContent" key={i}></span>
            )}
        </div>
    </div>

export const skeletonAnalystDashFullView =
    <div className="skeletonDash">
        <div className="skeletonChartBox">
            <div className="skeletonFilterBox">
                <div>
                    <label></label>
                    <div></div>
                    <button className="skeletonButton"></button>
                </div>
            </div>
            <div className="card mr-b-20 skeletonCard">
                <div className="card-header flex justify-content-between">
                    <span className="skeletonContent"></span>
                    <span className="skeletonContent"></span>
                </div>
                <div className="card-body">
                    <div className="chartOuter borderNone">
                        <div className="yLabels">
                            {[...Array(5).keys()].map((temp, i) =>
                                <span className="skeletonContent" key={i}></span>
                            )}
                        </div>
                        <div className="chartInner"></div>
                        <div className="xLabels">
                            {[...Array(7).keys()].map((temp, i) =>
                                <span className="skeletonContent" key={i}></span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="card skeletonCard">
                <div className="card-header flex justify-content-between">
                    <span className="skeletonContent"></span>
                    <span className="skeletonContent"></span>
                </div>
                <div className="card-body">
                    <div className="chartOuter borderNone">
                        <div className="yLabels">
                            {[...Array(5).keys()].map((temp, i) =>
                                <span className="skeletonContent" key={i}></span>
                            )}
                        </div>
                        <div className="chartInner"></div>
                        <div className="xLabels">
                            {[...Array(7).keys()].map((temp, i) =>
                                <span className="skeletonContent" key={i}></span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="skeletonPipelineFilter">
            <div className="card filterLoader">
                <div className="card-header">
                    <span className="skeletonContent"></span>
                </div>
                <div className="card-body">
                    <ul className="skeletonPipelineHealth">
                        {[...Array(10).keys()].map((temp, i) =>
                            <li key={i}>
                                <div className="pipelineStructure"></div>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    </div>

export const skeletonHistoryCharts =
    <div>
        <div className="skeletonChartBox">
            <div className="skeletonFilterBox">
                <div>
                    <label></label>
                    <div></div>
                    <button className="skeletonButton"></button>
                </div>
            </div>
            <div className="card mr-b-20 skeletonCard">
                <div className="card-header flex justify-content-between">
                    <span className="skeletonContent"></span>
                    <span className="skeletonContent"></span>
                </div>
                <div className="card-body">
                    <div className="chartOuter borderNone">
                        <div className="yLabels">
                            {[...Array(5).keys()].map((temp, i) =>
                                <span className="skeletonContent" key={i}></span>
                            )}
                        </div>
                        <div className="chartInner"></div>
                        <div className="xLabels">
                            {[...Array(7).keys()].map((temp, i) =>
                                <span className="skeletonContent" key={i}></span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="card skeletonCard">
                <div className="card-header flex justify-content-between">
                    <span className="skeletonContent"></span>
                    <span className="skeletonContent"></span>
                </div>
                <div className="card-body">
                    <div className="chartOuter borderNone">
                        <div className="yLabels">
                            {[...Array(5).keys()].map((temp, i) =>
                                <span className="skeletonContent" key={i}></span>
                            )}
                        </div>
                        <div className="chartInner"></div>
                        <div className="xLabels">
                            {[...Array(7).keys()].map((temp, i) =>
                                <span className="skeletonContent" key={i}></span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

export const skeletonAnalystCharts =
    <div className="chartOuter borderNone">
        <div className="yLabels">
            {[...Array(5).keys()].map((temp, i) =>
                <span className="skeletonContent" key={i}></span>
            )}
        </div>
        <div className="chartInner"></div>
        <div className="xLabels">
            {[...Array(7).keys()].map((temp, i) =>
                <span className="skeletonContent" key={i}></span>
            )}
        </div>
    </div>

export const skeletonNestedFormUpload =
    <div className="formView">
        <h5><span className="skeletonContent"></span></h5>
        {[...Array(3).keys()].map((temp, i) =>
            <div key={i} className="rowView">
                <div className="formLabel">
                    <h5 className="skeletonContent"></h5>
                </div>
                <div className="formInput">
                    <div></div>
                </div>
            </div>
        )}
        <div className="rowView">
            <div className="formLabel">
                <h5 className="skeletonContent"></h5>
            </div>
            <div className="fx-b80">
                <div className="uploadFileBox">
                    <div className="fileBox">
                        <div className="fileContent">
                            <div></div>
                            <p className="skeletonContent"></p>
                        </div>
                    </div>
                    <div className="previewBox">
                        <div className="fileContent">
                            <div></div>
                            <p className="skeletonContent"></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="rowView justify-content-end mt-3">
            <button className="skeletonButton"></button>
        </div>
    </div>

export const skeletonSettings =
    <div className="settingsView">
        <ul className="settingsTab">
            {[...Array(5).keys()].map((temp, i) =>
                <li key={i}>
                    <div>
                        <span className="skeletonContent"></span>
                    </div>
                </li>
            )}
        </ul>
        <div className="settingsContent">
            <div className="formView shadowNone">
                <h5><span className="skeletonContent"></span></h5>
                <div className="btn-update">
                    <button className="skeletonButton"></button>
                </div>
            </div>
        </div>
    </div>

export const skeletonPermissions =
    <div className="formView">
        <h5><span className="skeletonContent"></span></h5>
        <table className="table customHTMLTable tableLoader">
            <thead>
                <tr>
                    {[...Array(5).keys()].map((temp, i) =>
                        <th key={i} width="20%">
                            <span className="skeletonContent"></span>
                        </th>
                    )}
                </tr>
            </thead>
            <tbody>
                {[...Array(20).keys()].map((temp, i) =>
                    <tr key={i}>
                        <td><span className="skeletonContent"></span></td>
                        <td><span className="skeletonContent"></span></td>
                        <td><span className="skeletonContent"></span></td>
                        <td><span className="skeletonContent"></span></td>
                        <td><span className="skeletonContent"></span></td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>

export const skeletonFormTableView =
    <div className="formView">
        <h5><span className="skeletonContent"></span></h5>
        {[...Array(3).keys()].map((temp, i) =>
            <div key={i} className="rowView">
                <div className="formLabel">
                    <h5 className="skeletonContent"></h5>
                </div>
                <div className="formInput">
                    <div></div>
                </div>
            </div>
        )}
        <div className="formView shadowNone">
            <table className="table customHTMLTable tableLoader">
                <thead>
                    <tr>
                        {[...Array(5).keys()].map((temp, i) =>
                            <th key={i} width="20%">
                                <span className="skeletonContent"></span>
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {[...Array(20).keys()].map((temp, i) =>
                        <tr key={i}>
                            <td><span className="skeletonContent"></span></td>
                            <td><span className="skeletonContent"></span></td>
                            <td><span className="skeletonContent"></span></td>
                            <td><span className="skeletonContent"></span></td>
                            <td><span className="skeletonContent"></span></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>

export const skeletonManageNavigation =
    <div>
        <ul className="roleNavigation">
            {[...Array(8).keys()].map((temp, i) =>
                <li key={i}>
                    <label></label>
                    <p className="skeletonContent"></p>
                </li>
            )}
        </ul>
        <div className="rowView justify-content-end mt-3">
            <button className="skeletonButton"></button>
        </div>
    </div>

export const skeletonManageBranding =
    <div className="formView">
        <h5><span className="skeletonContent"></span></h5>
        <div className="uploadFileBox">
            <div className="fileBox">
                <div className="fileContent">
                    <div></div>
                    <p className="skeletonContent"></p>
                </div>
            </div>
            <div className="previewBox">
                <div className="fileContent">
                    <div></div>
                    <p className="skeletonContent"></p>
                </div>
            </div>
        </div>
    </div>

export const skeletonAccountSettings =
    <div className="formView">
        <h5><span className="skeletonContent"></span></h5>
        <ul className="listView listLoader">
            <li>
                <div className="listLogo">
                    <div className="skeletonContent"></div>
                </div>
                {[...Array(5).keys()].map((temp, i) =>
                    <div key={i} className="listDetail">
                        <h6 className="skeletonContent"></h6>
                        <p className="skeletonContent"></p>
                    </div>
                )}
            </li>
        </ul>
    </div>

export const skeletonSettingsUnit =
    <div className="formView">
        <div className="flex">
            {[...Array(9).keys()].map((temp, i) =>
                <div key={i} className="fx-b25 pd-r-10 mr-b-20">
                    <div className="card unitCards">
                        <div className="card-header">
                            <span className="skeletonContent"></span>
                        </div>
                        <div className="card-body">
                            <div className="flex">
                                <div className="fx-b33">
                                    <div className="unitBody">
                                        <span className="skeletonContent"></span>
                                        <h6 className="skeletonContent"></h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
        <div className="rowView justify-content-end mt-3">
            <button className="skeletonButton"></button>
        </div>
    </div>

export const skeletonPipelineConfig =
    <div className="formView shadowNone">
        {[...Array(4).keys()].map((temp, i) =>
            <div key={i} className="card configCards">
                <div className="card-header">
                    <span className="skeletonContent"></span>
                    <button className="skeletonButton"></button>
                </div>
            </div>
        )}
    </div>

export const skeletonSettingLicence =
    <div className="formView formLoader">
        <div className="flex align-items-center">
            <div className="fx-b70">
                <div className="skeletonLicence">
                    <div className="idSkeleton">
                        <h4 className="skeletonContent"></h4>
                    </div>
                    <div className="skeletonPlan">
                        <h5 className="skeletonContent"></h5>
                        <ul>
                            {[...Array(10).keys()].map((temp, i) =>
                                <li key={i}>
                                    <span className="skeletonContent"></span>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="fx-b30">
                <div className="skeletonLicenceCard">
                    <h4 className="skeletonContent"></h4>
                    <span className="skeletonContent"></span>
                    <h6 className="skeletonContent"></h6>
                </div>
            </div>
        </div>
    </div>

export const skeletonLicencePlan =
    <div className="licenceLoader">
        <header className="skeletonHeader">
            <div className="fx-b75">
                <div className="skeletonInstructions">
                    <span className="skeletonContent"></span>
                    <h6 className="skeletonContent"></h6>
                    <ul>
                        {[...Array(3).keys()].map((temp, i) =>
                            <li key={i}></li>
                        )}
                    </ul>
                </div>
            </div>
            <div className="fx-b25">
                <div className="skeletonContact">
                    <h6 className="skeletonContent"></h6>
                    <ul>
                        {[...Array(3).keys()].map((temp, i) =>
                            <li key={i}></li>
                        )}
                    </ul>
                </div>
            </div>
        </header>
        <section className="flex">
            <div className="fx-b20">
                <div className="skeletonAttribute">
                    <h3>
                        <span className="skeletonContent"></span>
                    </h3>
                    <ul>
                        {[...Array(4).keys()].map((temp, i) =>
                            <li key={i}>
                                <h5></h5>
                                <h6 className="skeletonContent"></h6>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
            <div className="fx-b80">
                <div className="skeletonTitle">
                    <h3><span className="skeletonContent"></span></h3>
                    <p className="skeletonContent"><span className="skeletonContent"></span></p>
                </div>
                <ul className="skeletonPlanCard">
                    <li className="fx-b25">
                        <div className="planCardBody">
                            <h6><span className="skeletonContent"></span></h6>
                            <span className="skeletonContent"></span>
                            <ul>
                                {[...Array(7).keys()].map((temp, i) =>
                                    <li key={i}>
                                        <span className="skeletonContent"></span>
                                        <h6 className="skeletonContent"></h6>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    </div>

export const skeletonChart =
    <div className="chartOuter">
        <div className="yLabels">
            {[...Array(5).keys()].map((temp, i) =>
                <span className="skeletonContent" key={i}></span>
            )}
        </div>
        <div className="chartInner"></div>
        <div className="xLabels">
            {[...Array(7).keys()].map((temp, i) =>
                <span className="skeletonContent" key={i}></span>
            )}
        </div>
    </div>

export const parameterModalSkeleton =
    <div>
        <div className="alarmAlertsView shadowNone">
                <div className="fx-b80 pd-r-15">
                    <div className="filterView">
                        <h6 className="skeletonContent"></h6>
                        <div></div>
                    </div>
                </div>
                <div className="fx-b20 pd-l-15">
                    <div className="filterView">
                        <h6 className="skeletonContent"></h6>
                        <div></div>
                    </div>
                </div>
        </div>
        <div className="chartOuter">
            <div className="yLabels">
                {[...Array(5).keys()].map((temp, i) =>
                    <span className="skeletonContent" key={i}></span>
                )}
            </div>
            <div className="chartInner"></div>
            <div className="xLabels">
                {[...Array(7).keys()].map((temp, i) =>
                    <span className="skeletonContent" key={i}></span>
                )}
            </div>
        </div>
    </div>           
    
export const alarmDetailModalSkeleton = 
    <div>
        <div className="breadCrumbSkeleton">
            <p className="skeletonContent"></p>
        </div>
        <div className="ancestorSkeleton">
            <h6 className="skeletonContent"></h6>
            <div className="flex">
                {[...Array(3).keys()].map((temp, i) =>
                    <p className="skeletonContent" key={i}></p>
                )}
            </div>
        </div>
        <div className="historySkeleton">
            <h6 className="skeletonContent"></h6>
        </div>
        <div className="chartOuter">
            <div className="yLabels">
                {[...Array(5).keys()].map((temp, i) =>
                    <span className="skeletonContent" key={i}></span>
                )}
            </div>
            <div className="chartInner"></div>
            <div className="xLabels">
                {[...Array(7).keys()].map((temp, i) =>
                    <span className="skeletonContent" key={i}></span>
                )}
            </div>
        </div>
    </div>

export const compareConfigurationSkeleton =
    <div className="configSkeleton">
        {[...Array(7).keys()].map((temp, i) =>
            <div key={i}>
                <p className="skeletonContent"></p>
                <h6 className="skeletonContent"></h6>
            </div>
        )}
    </div>
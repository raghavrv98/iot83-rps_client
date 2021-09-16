/**
 *
 * ManageNavigation
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
import { gotMenuSuccess, gotMenuError, menuSaveSuccess, menuSaveFailure } from "./selectors";
import MessageModal from "../../components/MessageModal/Loadable";
import reducer from "./reducer";
import saga from "./saga";
import { getMenu, navlistSaveHandler } from './actions';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import commoMessages from '../../messages';
import SkeletonLoader from "../../components/SkeletonLoader";
import NoDataFound from "../../components/NoDataFound";
import RGL, { WidthProvider } from "react-grid-layout";
const GridLayout = WidthProvider(RGL);

/* eslint-disable react/prefer-stateless-function */
export class ManageNavigation extends React.Component {
    state = {
        menuItems: [],
        layout: [],
        updatePosition: [],
        originalList: [],
        innerGridLayout: [],
        isFetching: true,
    };

    componentDidMount() {
        this.props.getMenu();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.menuSuccess && nextProps.menuSuccess !== this.props.menuSuccess) {
            this.setState({
                navList: nextProps.menuSuccess
            }, () => this.getNavMenu(nextProps.menuSuccess))
        }

        if (nextProps.menuSaveSuccess && nextProps.menuSaveSuccess !== this.props.menuSaveSuccess) {
            this.setState({
                isFetching: false,
                isOpen: true,
                message: <FormattedMessage {...messages.menuSave} children={(message => message)} />,
                type: "success",
            })
        }

        ['listError', 'menuSaveFailure'].map(val => {
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

    handleUpdateNavigationAttributes() {
        let menuData = JSON.parse(JSON.stringify(this.state.menuItems));
        let finalResult = [];
        let toCompare = 1; let toAssign = 1;
        menuData = menuData.map((items) => {
            let datafind = menuData.filter(data => data.position == toCompare)[0];
            toCompare++;
            finalResult.push({
                id: datafind.id,
                navName: datafind.navName,
                fontAwesomeIconClass: datafind.fontAwesomeIconClass,
                newTab: datafind.newTab,
                position: toAssign++,
            })
            if (datafind.subMenus.length > 0) {
                let subToAssign = toAssign; let subtoCompare = 1
                let subdataFinder = datafind.subMenus;
                subdataFinder.map((submen) => {
                    let subdatafind = subdataFinder.filter(data => data.position == subtoCompare)[0];
                    subtoCompare++;
                    finalResult.push({
                        id: subdatafind.id,
                        navName: subdatafind.navName,
                        fontAwesomeIconClass: subdatafind.fontAwesomeIconClass,
                        newTab: subdatafind.newTab,
                        position: subToAssign++,
                    })
                })
                toAssign = subToAssign;
            }
        })
        this.setState({
            isFetching: true,
        }, () => this.props.navlistSaveHandler(finalResult))
    }

    handleNavNewTabChange = (id) => (event) => {
        let tempMenuList = JSON.parse(JSON.stringify(this.state.menuItems))
        tempMenuList = tempMenuList.map((menu, index) => {
            if (menu.id == id) {
                menu.newTab = event.target.checked
            }
            if (menu.subMenus.length > 0) {
                menu.subMenus.map((subitem) => {
                    if (subitem.id == id) {
                        subitem.newTab = event.target.checked
                    }
                })
            }
            return (menu);
        })
        this.setState({ menuItems: tempMenuList });
    }

    changenameHandler = (id) => (event) => {
        let tempMenuList = JSON.parse(JSON.stringify(this.state.menuItems))
        tempMenuList = tempMenuList.map((list) => {
            if (list.id == id) {
                list.navName = event.target.value
            }
            if (list.subMenus.length > 0) {
                list.subMenus.map((subItem) => {
                    if (subItem.id == id) {
                        subItem.navName = event.target.value
                    }
                })
            }
            return (list);
        })
        this.setState({ menuItems: tempMenuList })
    }

    fontIconChangeHandler = (id) => (event) => {
        let tempMenuList = JSON.parse(JSON.stringify(this.state.menuItems))
        tempMenuList = tempMenuList.map((list) => {
            if (list.id == id) {
                list.fontAwesomeIconClass = event.target.value
            }
            if (list.subMenus.length > 0) {
                list.subMenus.map((subItem) => {
                    if (subItem.id == id) {
                        subItem.fontAwesomeIconClass = event.target.value
                    }
                })
            }
            return (list);
        })
        this.setState({ menuItems: tempMenuList })
    }

    childListDisplay = (menuId) => {
        let menus = JSON.parse(JSON.stringify(this.state.menuItems))
        menus = menus.map((temp) => {
            if (temp.id == menuId) {
                temp.childVisibility = !temp.childVisibility
                if (temp.childVisibility) {
                    let layout = JSON.parse(JSON.stringify(this.state.layout));
                    layout = layout.map((layout) => {
                        if (layout.i == temp.id) {
                            layout.h = (2 * temp.subMenus.length) + 4;
                            layout.isDraggable = false;
                        }
                        return (layout);
                    })
                    this.setState({ layout: layout })
                }
                else {
                    let layout = JSON.parse(JSON.stringify(this.state.layout));
                    layout = layout.map((layout) => {
                        if (layout.i == temp.id) {
                            layout.h = 2;
                            layout.isDraggable = true;
                        }
                        return (layout);
                    })
                    this.setState({ layout: layout })
                }
            }
            return temp;
        })
        this.setState({ menuItems: menus });
    }

    childlayoutHandler = (layout) => {
        let childLayout = JSON.parse(JSON.stringify(this.state.innerGridLayout));
        let menuData = JSON.parse(JSON.stringify(this.state.menuItems));
        childLayout = childLayout.map((child, index) => {
            layout.map((layout) => {
                if (child.i == layout.i) {
                    child.y = layout.y;
                    child.position = (layout.y) / 2;
                }
            })
            return (child);
        })
        menuData = menuData.map((item) => {
            if (item.subMenus.length > 0) {
                if (item.subMenus[0].id == layout[1].i) {
                    item.subMenus.map((subitem, index) => {
                        subitem.position = (layout[index + 1].y) / 2
                    })
                }
            }
            return (item);
        })
        this.setState({ menuItems: menuData, innerGridLayout: childLayout })
    }

    layoutChangeHandler = (layout) => {
        let menuData = JSON.parse(JSON.stringify(this.state.menuItems));
        let menulayout = JSON.parse(JSON.stringify(this.state.layout));
        let sortY = [];
        menulayout = menulayout.map((layoutitem, index) => {
            layoutitem.y = layout[index].y
            return (layoutitem)
        })
        menuData = menuData.map((items, index) => {
            items.position = (menulayout[index + 1].y) / 2;
            return (items)
        })
        menuData.map((item) => {
            sortY.push(item.position);
        })
        for (let i = 0; i < sortY.length; i++) {
            for (let j = i + 1; j < sortY.length; j++) {
                if (sortY[i] > sortY[j]) {
                    let temp = sortY[i];
                    sortY[i] = sortY[j];
                    sortY[j] = temp;
                }
            }
        }
        menuData = menuData.map((items, index) => {
            for (let i = 0; i < sortY.length; i++) {
                if (items.position == sortY[i]) {
                    items.position = i + 1;
                }
            }
            return (items)
        })
        this.setState({
            menuItems: menuData,
            layout: menulayout
        })
    }

    getNavMenu = (navList) => {
        let layout; let innerGridLayout = []
        let menuItems = [];
        let posit = 1;
        navList.map((navObj) => {
            navObj.type = "Parent";
            navObj.childVisibility = false;
            navObj.position = posit++;
            if (navObj.subMenus.length > 0) {
                let pos = 1;
                navObj.subMenus.map((items) => {
                    items.position = pos++;
                })
            }
            menuItems.push(navObj);
        })
        menuItems.map((menuItem) => {
            if (menuItem.subMenus.length > 0) {
                menuItem.subMenus.map((submen, index) => {
                    innerGridLayout.push({
                        i: submen.id,
                        x: 0,
                        y: 2 + (index * 2),
                        w: 12,
                        h: 2,
                        static: false,
                        position: submen.position,
                        isResizable: false,
                    })
                })
                innerGridLayout.unshift({ i: `sub${menuItem.id}`, x: 0, y: 0, w: 12, h: 2, static: true, isResizable: false })
            }
        })
        layout = menuItems.map(function (menu, index) {
            if (menu.subMenus.length > 0) {
                return ({
                    i: menu.id,
                    x: 0,
                    y: 2 + (index * 2),
                    w: 12,
                    h: 2,
                    static: false,
                    subMenuLength: menu.subMenus.length,
                    position: menu.position,
                    isResizable: false,
                })
            }
            else {
                return ({
                    i: menu.id,
                    x: 0,
                    y: 2 + (index * 2),
                    w: 12,
                    h: 2,
                    static: false,
                    position: menu.position,
                    isResizable: false,
                })
            }
        })
        layout.unshift({ i: '1', x: 0, y: 0, w: 12, h: 2, static: true, isResizable: false })
        this.setState({
            menuItems,
            layout,
            innerGridLayout: innerGridLayout,
            isFetching: false
        })
    }

    modalCloseHandler = () => {
        this.setState({
            isOpen: false,
            message: "",
            type: ""
        });
    }

    render() {
        let temp = null;
        if (!this.state.isFetching && this.state.menuItems.length) {
            temp = this.state.menuItems.map((menu) => {
                if (menu.subMenus.length > 0) {
                    let tempdiv = menu.subMenus.map((submenuItem) => {
                        return (
                            <div id={submenuItem.id} className="navGridBody flex" key={submenuItem.id}>
                                <div className="fx-b20 navGridBox form-group">
                                    <p className="text-info"><FormattedMessage {...messages.child} children={(message => message)} /></p>
                                </div>
                                <div className="fx-b30 navGridBox form-group">
                                    <input type="text" className="form-control" value={submenuItem.navName ? submenuItem.navName : ""} onChange={this.changenameHandler(submenuItem.id)} />
                                </div>
                                <div className="fx-b30 navGridBox form-group">
                                    <input type="text" className="form-control" value={submenuItem.url ? submenuItem.url : ""} disabled />
                                </div>
                                <div className="fx-b10 navGridBox form-group">
                                    <label className="customCheckbox">
                                        <input
                                            type="checkbox"
                                            checked={submenuItem.newTab}
                                            onChange={this.handleNavNewTabChange(submenuItem.id)}
                                        />
                                        <span className="checkmark" />
                                    </label>
                                </div>
                                <div className="fx-b10 navGridBox form-group">
                                    <div className="form-control text-center">
                                        <i className="fa fa-arrows childDragHandle" style={{ cursor: 'all-scroll' }}></i>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                    tempdiv.unshift(
                        <div id={`sub${menu.id}`} key={`sub${menu.id}`}>
                            <table className="table customHTMLTable">
                                <thead>
                                    <tr>
                                        <th width="20%"><FormattedMessage {...messages.tabletype} children={(message => message)} /></th>
                                        <th width="30%"><FormattedMessage {...commoMessages.name} children={(message => message)} /></th>
                                        <th width="30%"><FormattedMessage {...commoMessages.url} children={(message => message)} /></th>
                                        <th width="10%"><FormattedMessage {...commoMessages.newTab} children={(message => message)} /></th>
                                        <th width="10%"><FormattedMessage {...messages.tableDrag} children={(message => message)} /></th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    )
                    return (
                        <div id={"id" + menu.id} key={menu.id}>
                            <div className="navGridBody flex">
                                <div className="fx-b20 navGridBox form-group">
                                    <p className="text-primary mr-t-5 cursor-pointer" onClick={() => { this.childListDisplay(menu.id) }}>{menu.type}
                                        <i className={menu.childVisibility ? "far fa-angle-up ml-2" : "far fa-angle-down ml-2"}></i>
                                    </p>
                                </div>
                                <div className="fx-b30 navGridBox form-group">
                                    <input type="text" className="form-control" value={menu.navName} onChange={this.changenameHandler(menu.id)} />
                                </div>
                                <div className="fx-b30 navGridBox form-group">
                                    <input type="text" className="form-control" value={menu.url ? menu.url : ""} disabled />
                                </div>
                                <div className="fx-b10 navGridBox form-group text-center">
                                    <label className="customCheckbox">
                                        <input
                                            type="checkbox"
                                            value=""
                                            checked={menu.newTab}
                                            onChange={this.handleNavNewTabChange(menu.id)} />
                                        <span className="checkmark" />
                                    </label>
                                </div>
                                <div className="fx-b10 navGridBox form-group text-center">
                                    <p className="text-dark">
                                        <i className="far fa-arrows fa-lg parentDragHandle" style={{ cursor: 'all-scroll' }}></i>
                                    </p>
                                </div>
                            </div>
                            <GridLayout
                                className={menu.childVisibility ? "d-block navChildGrid childGridLayout_" + menu.id : "d-none childGridLayout_" + menu.id}
                                layout={this.state.innerGridLayout}
                                rowHeight={19}
                                draggableHandle=".childDragHandle"
                                onLayoutChange={this.childlayoutHandler}
                            >
                                {tempdiv}
                            </GridLayout>
                        </div>
                    )

                } else {
                    return (
                        <div id={"id" + menu.id} className="navGridBody flex" key={menu.id} onMouseDown={e => e.stopPropagation()}>
                            <div className="fx-b20 navGridBox form-group">
                                <p className="text-primary mr-t-5">{menu.type}</p>
                            </div>
                            <div className="fx-b30 navGridBox form-group">
                                <input type="text" className="form-control" value={menu.navName ? menu.navName : ""} onChange={this.changenameHandler(menu.id)} />
                            </div>
                            <div className="fx-b30 navGridBox form-group">
                                <input type="text" className="form-control" value={menu.url ? menu.url : ""} disabled />
                            </div>
                            <div className="fx-b10 navGridBox form-group text-center">
                                <label className="customCheckbox">
                                    <input
                                        type="checkbox"
                                        checked={menu.newTab}
                                        value=""
                                        onChange={this.handleNavNewTabChange(menu.id)}
                                    />
                                    <span className="checkmark" />
                                </label>
                            </div>
                            <div className="navGridBox fx-b10 text-center">
                                <p className="text-dark">
                                    <i className="far fa-arrows fa-lg parentDragHandle" style={{ cursor: 'all-scroll' }}></i>
                                </p>
                            </div>
                        </div>
                    )
                }
            }
            )
            temp.unshift(
                <div id={1} key="1">
                    <table className="table customHTMLTable text-center">
                        <thead>
                            <tr>
                                <th width="20%" className="text-left"><FormattedMessage {...messages.tabletype} children={(message => message)} /></th>
                                <th width="30%"><FormattedMessage {...commoMessages.name} children={(message => message)} /></th>
                                <th width="30%"><FormattedMessage {...commoMessages.url} children={(message => message)} /></th>
                                <th width="10%" className="text-center"><FormattedMessage {...commoMessages.newTab} children={(message => message)} /></th>
                                <th width="10%" className="text-center"><FormattedMessage {...messages.tableDrag} children={(message => message)} /></th>
                            </tr>
                        </thead>
                    </table>
                </div>
            )
        }
        return (
            <div className="appContent">
                <Helmet>
                    <title>ManageNavigation</title>
                    <meta name="description" content="Description of ManageNavigation" />
                </Helmet>

                <div className="pageBreadcrumb">
                    <div className="flex-item fx-b70">
                        <p><FormattedMessage {...messages.titleManageNav} children={(message => message)} /></p>
                        <h5><FormattedMessage {...messages.title} children={(message => message)} /></h5>
                    </div>
                    <div className="flex-item fx-b30 text-right align-items-center"></div>
                </div>
                {this.state.isFetching && this.state.menuItems.length > 0 ?
                    <SkeletonLoader /> :
                    <React.Fragment>
                        {this.state.isFetching ? null :
                            this.state.navList.length > 0 ?
                                <React.Fragment>
                                    <GridLayout
                                        id="outerGrid"
                                        rowHeight={20}
                                        draggableHandle=".parentDragHandle"
                                        layout={this.state.layout}
                                        onLayoutChange={this.layoutChangeHandler}
                                    >
                                        {temp}
                                    </GridLayout>
                                    <div className="form-group text-right mt-3">
                                        <button type="button" className="btn btn-danger" onClick={() => this.handleUpdateNavigationAttributes()}>
                                            <i className="far fa-check-circle"></i><FormattedMessage {...commoMessages.save} children={(message => message)} />
                                        </button>
                                    </div>
                                </React.Fragment>
                                :
                                <NoDataFound skeleton="skeletonHtmlTable" mode="fullView" dataName="navigation" dataImg="navigate" />
                        }
                    </React.Fragment>
                }
                {this.state.isOpen ? <MessageModal type={this.state.type} message={this.state.message} onClose={this.modalCloseHandler} /> : null}
            </div>
        );
    }
}

ManageNavigation.propTypes = {
    dispatch: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
    menuSuccess: gotMenuSuccess(),
    menuError: gotMenuError(),
    menuSaveSuccess: menuSaveSuccess(),
    menuSaveFailure: menuSaveFailure(),
});

export function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        getMenu: () => dispatch(getMenu()),
        navlistSaveHandler: (payload) => dispatch(navlistSaveHandler(payload)),
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
);

const withReducer = injectReducer({ key: "manageNavigation", reducer });
const withSaga = injectSaga({ key: "manageNavigation", saga });

export default compose(
    withReducer,
    withSaga,
    withConnect
)(ManageNavigation);

/**
 *
 * Settings
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
	getGeneratedKey, getGeneratedKeyError,
	getSecretKeyList, getSecretKeyError,
	getSecretStatusSuccess, getSecretStatusError,
	getAccountDetailsSuccess, getAccountDetailsError,
	secretKeyDeleteSuccess, secretKeyDeleteFailure,
	pipelineConfigSuccess, pipelineConfigError,
	submitConfigSuccess, submitConfigFailure,
	getLicenceSuccess, getLicenceFailure,
	getTabsSuccess, getTabsFailure,
	licenseKeySuccess, licenseKeyFailure
} from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import {
	generateKeyhandler,
	getSecretKeys,
	secretActiveDeactiveHandler,
	getAccountDetails,
	deleteSecretKey,
	getPipelineConfig,
	onSubmitConfigHandler,
	getLicenceInfo,
	getSettingTab,
	installLicenseKey
} from "./actions";
import MessageModal from "../../components/MessageModal/Loadable";
import messages from './messages';
import commonMessages from '../../messages';
import { FormattedMessage } from "react-intl";
import Loader from "../../components/Loader";
import SkeletonLoader from "../../components/SkeletonLoader";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { showInitials, capitalizeFirstLetter } from "../../utils/commonUtils";
import Range from 'rc-slider/lib/Range';
import { SketchPicker } from "react-color";
import InstallLicence from "../../components/InstallLicence/Loadable";
import { cloneDeep } from 'lodash';
import moment from 'moment';

/* eslint-disable react/prefer-stateless-function */
export class Settings extends React.Component {
	state = {
		isInstallLicenceOpen: false,
		isFetching: true,
		isOpen: false,
		isLoaderVisible: true,
		secretKeys: [],
		isAddKeyView: false,
		generatedKey: "",
		copySuccess: "",
		accountDetails: "",
		latestUpdate: [
			"API Version Upgraded",
			"Minor Bug Fixes",
			"Gateway APIs enhanced to V2",
			"Multi-tenancy code refactored",
			"DTS/DTS Agent new props added"
		],
		viewLimit: 3,
		legendDetails: {},
		unitDetails: {},
		healthScoreDetails: {},
		colorDetails: {},
		colorBackground: "rgba(125, 81, 81,1)",
		colorRange: [],
		markerAtValue: "",
		alarmConfigDetails: {},
		background: "#7d5151",
		licenceDetail: {},
		licenceDetailFetching: false,
		deviceIdCopy: "",
		tabs: []
	}
	componentWillMount() {
		this.props.getSettingTab();
		this.props.getSecretKeys();
		this.props.getAccountDetails();
		if (localStorage.getItem("tenant") !== "cloudstore") {
			this.setState({
				licenceDetailFetching: true
			})
			this.props.getLicenceInfo();
			this.props.getPipelineConfig('unit,healthScore,gradient,latch,legend,DTSTemp');
		}
	}

	onChangeLegendHandler = (event) => {
		let legendDetails = JSON.parse(JSON.stringify(this.state.legendDetails))
		let id = event.target.id;
		let checkedValue = event.target.checked
		let legendIndex = this.state.legendDetails.data.findIndex(val => val.category === event.target.name);
		let legendDetailsData = legendDetails.data[legendIndex].data
		let dataIndex = legendDetailsData.findIndex(val => val.item === id);
		legendDetailsData[dataIndex].check = checkedValue
		this.setState({
			legendDetails
		})
	}

	onChangeUnitHandler = (event) => {
		let unitDetails = JSON.parse(JSON.stringify(this.state.unitDetails))
		let value = event.target.value;
		let unitIndex = this.state.unitDetails.data.findIndex(val => val.name === event.target.name);
		unitDetails.data[unitIndex].default = value
		this.setState({
			unitDetails
		})
	}

	onDTSMeasurementHandler = (event) => {
		let DTSTemp = JSON.parse(JSON.stringify(this.state.DTSTemp))
		let value = event.target.value;
		DTSTemp.data[0][event.target.id] = value && parseFloat(value)
		this.setState({
			DTSTemp
		})
	}

	nameChangeHandler = (event, index) => {
		let healthScoreDetails = JSON.parse(JSON.stringify(this.state.healthScoreDetails));
		let healthScoreIndex = this.state.healthScoreDetails.data.findIndex(val => val.name === event.target.name);
		if (event.target.id == ("basePoint" + index)) {
			healthScoreDetails.data[healthScoreIndex].basePoint = event.target.value && parseFloat(event.target.value)
		}
		else {
			healthScoreDetails.data[healthScoreIndex].magnitude.value = event.target.value && parseFloat(event.target.value)
		}
		this.setState({
			healthScoreDetails
		});
	};

	onSubmitUnitLegendHandler = (event) => {
		event.preventDefault();
		let id = event.target.id
		if (id === "unitDetails") {
			let unitDetails = JSON.parse(JSON.stringify(this.state.unitDetails))
			this.setState({ isFetching: true, typeId: id }, () => this.props.onSubmitConfigHandler(unitDetails))
		}
		else if (id === "legendDetails") {
			let legendDetails = JSON.parse(JSON.stringify(this.state.legendDetails))
			this.setState({ isFetching: true, typeId: id }, () => this.props.onSubmitConfigHandler(legendDetails))
		}
		else if (id === "healthScore") {
			let healthScoreDetails = JSON.parse(JSON.stringify(this.state.healthScoreDetails))
			this.setState({ isFetching: true, typeId: id }, () => this.props.onSubmitConfigHandler(healthScoreDetails))
		}
		else if (id === "colorDetails") {
			let colorDetails = JSON.parse(JSON.stringify(this.state.colorDetails))
			let data = colorDetails.data.map(val => {
				return {
					colors: val.colors,
					displayName: val.displayName,
					ranges: val.newRanges,
					name: val.name,
					reverseGradient: val.reverseGradient
				}
			})
			colorDetails.data = data
			this.setState({ isFetching: true, typeId: id }, () => this.props.onSubmitConfigHandler(colorDetails))
		}
		else if (id === "alarmConfig") {
			let alarmConfigDetails = JSON.parse(JSON.stringify(this.state.alarmConfigDetails))
			this.setState({ isFetching: true, typeId: id }, () => this.props.onSubmitConfigHandler(alarmConfigDetails))
		}
		else if (id === "DTSTemp") {
			let DTSTemp = JSON.parse(JSON.stringify(this.state.DTSTemp))
			this.setState({ isFetching: true, typeId: id }, () => this.props.onSubmitConfigHandler(DTSTemp))
		}
	}

	generateKeyhandler(event) {
		event.preventDefault();
		let payload = {
			name: this.state.name
		}
		this.setState({ isFetching: true, keyName: this.state.name })
		this.props.generateKeyhandler(payload);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.generatedKey && nextProps.generatedKey !== this.props.generatedKey) {
			this.setState({
				isFetching: false,
				generatedKey: nextProps.generatedKey.secretKey,
				modalForSuccess: true
			});
		}

		if (nextProps.secretKeys && nextProps.secretKeys !== this.props.secretKeys) {
			this.setState({
				isFetching: false,
				secretKeys: nextProps.secretKeys
			})
		}

		if (nextProps.secretStatus && nextProps.secretStatus !== this.props.secretStatus) {
			let message = this.state.secretKeyStatus ? <FormattedMessage {...messages.secretKeyMessageActive} children={(message => message)} /> : <FormattedMessage {...messages.secretKeyMessageInactive} children={(message => message)} />
			this.setState({
				isFetching: false,
				isOpen: true,
				message,
				type: "success",
				modalForSuccess: true
			});
		}

		if (nextProps.licenseKeySuccess && nextProps.licenseKeySuccess !== this.props.licenseKeySuccess) {
			let message = "License Key Installed Successfully"
			this.setState({
				isFetching: false,
				isOpen: true,
				message,
				type: "success",
				license: true,
				isInstallLicenceOpen: false,
			});
		}

		if (nextProps.accountDetail && nextProps.accountDetail !== this.props.accountDetail) {
			this.setState({
				accountDetails: nextProps.accountDetail,
				isFetching: false
			});
		}

		if (nextProps.pipelineConfigSuccess && nextProps.pipelineConfigSuccess !== this.props.pipelineConfigSuccess) {
			let colorDetails = nextProps.pipelineConfigSuccess.find(config => config.type == "gradient")
			colorDetails.data.map(val => {
				val.gradient = this.getGradient(val.colors, val.ranges[0], val.ranges[val.ranges.length - 1], val.name, val.reverseGradient)
				val.handles = []
				val.colors.map(range => val.handles.push(range.min, range.max))
				val.handles = ([...new Set(val.handles)].sort((a, b) => a - b)).slice(1, -1);
				val.ranges = val.ranges.sort((a, b) => a - b)
				val.maxValue = val.ranges[val.ranges.length - 1]
				val.minValue = val.ranges[0]
				val.maxAlert = false
				val.minAlert = false
				val.maxAlertNull = false
				val.minAlertNull = false
				val.maxAlertHandle = false
				val.minAlertHandle = false
				val.rangesMarkers = [{ staticValues: val.ranges }, { dynamicValues: val.ranges }]
				val.newRanges = val.ranges
				val.minPrevValue = val.ranges[0]
				val.maxPrevValue = val.ranges[val.ranges.length - 1]
				return val
			})
			this.setState({
				unitDetails: nextProps.pipelineConfigSuccess.find(config => config.type == "unit"),
				healthScoreDetails: nextProps.pipelineConfigSuccess.find(config => config.type == "healthScore"),
				alarmConfigDetails: nextProps.pipelineConfigSuccess.find(config => config.type == "latch"),
				legendDetails: nextProps.pipelineConfigSuccess.find(config => config.type == "legend"),
				colorDetails,
				DTSTemp: nextProps.pipelineConfigSuccess.find(config => config.type == "DTSTemp")
			});
		}

		if (nextProps.secretKeyDeleteSuccess && nextProps.secretKeyDeleteSuccess !== this.props.secretKeyDeleteSuccess) {
			let secretKeys = [...this.state.secretKeys];
			secretKeys = secretKeys.filter(val => val.id !== nextProps.secretKeyDeleteSuccess)
			this.setState({
				isFetching: false,
				isOpen: true,
				message: "Secret Key Deleted Successfully",
				type: "success",
				secretKeys
			});
		}

		if (nextProps.submitConfigurationSucess && nextProps.submitConfigurationSucess !== this.props.submitConfigurationSucess) {
			this.setState({
				isFetching: false,
				isOpen: true,
				message: "DTS Updated Successfully",
				type: "success",
			}, () => this.props.getConfigurationDetails());
		}

		if (nextProps.submitConfigSuccess && nextProps.submitConfigSuccess !== this.props.submitConfigSuccess) {
			this.setState({
				isFetching: false,
				isOpen: true,
				message: this.state.typeId == "unitDetails" ? "Units Updated Successfully" : this.state.typeId == "legendDetails" ? "Legends Updated Successfully" : this.state.typeId == "healthScore" ? "Health Score Updated Successfully" : this.state.typeId == "colorDetails" ? "Color Details Updated Successfully" : this.state.typeId == "alarmConfig" ? "Alarm Details Updated Successfully" : "DTS Measurement Updated Successfully",
				type: "success",
			}, () => { this.props.getPipelineConfig('unit,healthScore,gradient,latch,legend,DTSTemp'); });
		}

		if (nextProps.licenceSuccess && nextProps.licenceSuccess !== this.props.licenceSuccess) {
			this.setState({
				licenceDetail: nextProps.licenceSuccess,
				licenceDetailFetching: false,
			})
		}

		if (nextProps.submitTriggerDetails && nextProps.submitTriggerDetails !== this.props.submitTriggerDetails) {
			this.setState({
				isFetching: false,
				isOpen: true,
				message: "Configure Trigger Successfully",
				type: "success",
			});
		}

		if (nextProps.tabs && nextProps.tabs !== this.props.tabs) {
			var { location, history } = this.props;
			let activeTab = location.state && location.state.activeTab ? location.state && location.state.activeTab : nextProps.tabs[0].name
			history.replace()
			this.setState({
				tabs: nextProps.tabs,
				isFetching: false,
				activeTab
			});
		}

		['generatedKeyError', 'secretKeysError', 'secretStatusError', 'accountDetailError', 'pipelineConfigError', 'secretKeyDeleteFailure', 'submitConfigurationFailure', 'submitConfigFailure', 'submitTriggerDetailsFailure', 'tabsError', 'licenseKeyFailure'].map(val => {
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

	secretKeyStatusHandler(event) {
		this.setState({
			secretKeyStatus: event.target.checked
		})
		this.props.secretActiveDeactiveHandler(event.target.id, event.target.checked)
	}

	modalCloseHandler = () => {
		this.setState({
			secretKeyId: "",
			isOpen: false,
			message: "",
			type: "",
			generatedKey: "",
			copySuccess: "",
			keyName: "",
			isFetching: false,
			isInstallLicenceOpen: false
		});
		if (this.state.modalForSuccess) {
			this.setState({
				isAddKeyView: false,
				modalForSuccess: false,
			}, () => this.props.getSecretKeys())
		}
		if (this.state.license) {
			this.setState({
				licenceDetailFetching: true
			}, () => this.props.getLicenceInfo())
		}
	}

	copyToClipboard = (event) => {
		this.textArea.select();
		document.execCommand('copy');
		event.target.focus();
		this.setState({ copySuccess: 'Copied!' });
	};

	executeCopy = (text) => {
		var input = document.createElement('textarea');
		document.body.appendChild(input);
		input.value = text;
		input.focus();
		input.select();
		document.execCommand('Copy');
		input.remove();
		this.setState({
			deviceIdCopy: 'Copied!'
		})
	}

	deleteHandler(id) {
		this.setState({
			isFetching: true,
			isOpen: false,
			message: "",
			type: ""
		}, () => {
			this.props.deleteSecretKey(id)
		}
		)
	}

	loaderHandler() {
		this.setState({ isLoaderVisible: true })
		let _self = this;
		setTimeout(function () { _self.setState({ isLoaderVisible: false }) }, 5000);
	}

	getImageTag(legend) {
		let availableURls = ['anchor', 'drain', 'instrument', 'flange', 'pullbox', 'support', 'valve', 'vent', 'weld', 'scadasensor', 'bend', 'elbow', 'fosplice', 'splice', 'landmark', 'alarmbell', 'alarm', 'warning', 'emergency', 'raisedalarm', 'raisedwarning', 'raisedemergency', 'acknowledgedalarm', 'acknowledgedwarning', 'acknowledgedemergency', 'addressedalarm', 'addressedwarning', 'addressedemergency']
		if (availableURls.includes(legend.toLowerCase().trim().replace(" ", ""))) {
			return <img src={window.API_URL + "api/public/static/components/" + legend.toLowerCase().trim().replace(" ", "") + ".png"} />;
		}
		else {
			return <img src={require('../../assets/images/question.png')} />;
		}
	}


	marksRange(newRanges) {
		let marks = {}
		newRanges.map(val => marks[val] = val)
		return marks
	}

	markerValueChangeHandler = (event) => {
		let markerAtValue = ''
		markerAtValue = event.target.value && parseFloat(event.target.value)
		this.setState({
			markerAtValue
		})
	}


	onBlurMaxValueChange = () => {
		let colorDetails = JSON.parse(JSON.stringify(this.state.colorDetails))
		let changedObject = colorDetails.data.find(val => val.name === event.target.name)
		changedObject.minAlertNull = false
		changedObject.maxAlertNull = false
		changedObject.maxAlert = false
		changedObject.minAlert = false
		changedObject.minAlertHandle = false
		changedObject.maxAlertHandle = false
		changedObject.maxValue = parseFloat(document.getElementById(event.target.id).value)

		if (changedObject.maxValue <= changedObject.minValue) {
			changedObject.maxAlert = true
			changedObject.maxValue = changedObject.maxPrevValue

		}
		else if (document.getElementById(event.target.id).value == "") {
			changedObject.maxAlertNull = true
			changedObject.maxValue = changedObject.maxPrevValue
		}
		else if (changedObject.maxValue <= changedObject.handles[changedObject.handles.length - 1]) {
			changedObject.maxAlertHandle = true
			changedObject.maxValue = changedObject.maxPrevValue
		}
		else {

			changedObject.rangesMarkers[0].staticValues[changedObject.rangesMarkers[0].staticValues.length - 1] = parseFloat(changedObject.maxValue)

			changedObject.colors[changedObject.colors.length - 1].max = parseFloat(changedObject.maxValue)
			changedObject.maxPrevValue = parseFloat(changedObject.maxValue)
		}

		changedObject.handles = []
		changedObject.colors.map(range => changedObject.handles.push(range.min, range.max))
		changedObject.handles = ([...new Set(changedObject.handles)].sort((a, b) => a - b)).slice(1, -1);


		changedObject.rangesMarkers[1].dynamicValues = []
		changedObject.colors.map(range => changedObject.rangesMarkers[1].dynamicValues.push(range.min, range.max))

		changedObject.newRanges = changedObject.rangesMarkers[0].staticValues.concat(changedObject.rangesMarkers[1].dynamicValues)
		changedObject.newRanges = [...new Set(changedObject.newRanges)].sort((a, b) => a - b);
		changedObject.newRanges = changedObject.newRanges.filter(val => val <= changedObject.maxValue)
		changedObject.rangesMarkers[0].staticValues = changedObject.newRanges.filter(val => val <= changedObject.maxValue)

		changedObject.gradient = this.getGradient(changedObject.colors, changedObject.newRanges[0], changedObject.newRanges[changedObject.newRanges.length - 1], changedObject.name, changedObject.reverseGradient)

		this.setState({
			colorDetails
		})
	}

	onBlurMinValueChange = () => {
		let colorDetails = JSON.parse(JSON.stringify(this.state.colorDetails))
		let changedObject = colorDetails.data.find(val => val.name === event.target.name)

		changedObject.minAlertNull = false
		changedObject.maxAlertNull = false
		changedObject.maxAlert = false
		changedObject.minAlert = false
		changedObject.minAlertHandle = false
		changedObject.maxAlertHandle = false
		changedObject.minValue = parseFloat(document.getElementById(event.target.id).value)

		if (changedObject.minValue >= changedObject.maxValue) {
			changedObject.minAlert = true
			changedObject.minValue = changedObject.minPrevValue
		}
		else if (document.getElementById(event.target.id).value == "") {
			changedObject.minAlertNull = true
			changedObject.minValue = changedObject.minPrevValue
		}
		else if (changedObject.minValue >= changedObject.handles[0]) {
			changedObject.minAlertHandle = true
			changedObject.minValue = changedObject.minPrevValue
		}
		else {

			changedObject.rangesMarkers[0].staticValues[0] = parseFloat(changedObject.minValue)

			changedObject.colors[0].min = parseFloat(changedObject.minValue)
			changedObject.minPrevValue = parseFloat(changedObject.minValue)
		}

		changedObject.handles = []
		changedObject.colors.map(range => changedObject.handles.push(range.min, range.max))
		changedObject.handles = ([...new Set(changedObject.handles)].sort((a, b) => a - b)).slice(1, -1);


		changedObject.rangesMarkers[1].dynamicValues = []
		changedObject.colors.map(range => changedObject.rangesMarkers[1].dynamicValues.push(range.min, range.max))

		changedObject.newRanges = changedObject.rangesMarkers[0].staticValues.concat(changedObject.rangesMarkers[1].dynamicValues)
		changedObject.newRanges = [...new Set(changedObject.newRanges)].sort((a, b) => a - b);
		changedObject.newRanges = changedObject.newRanges.filter(val => val >= changedObject.minValue)
		changedObject.rangesMarkers[0].staticValues = changedObject.newRanges.filter(val => val >= changedObject.minValue)

		changedObject.gradient = this.getGradient(changedObject.colors, changedObject.newRanges[0], changedObject.newRanges[changedObject.newRanges.length - 1], changedObject.name, changedObject.reverseGradient)


		this.setState({
			colorDetails
		})
	}

	rangeMaxChangeHandler = () => {
		let colorDetails = JSON.parse(JSON.stringify(this.state.colorDetails))
		let changedObject = colorDetails.data.find(val => val.name === event.target.name)

		changedObject.maxValue = event.target.value && parseFloat(event.target.value)

		this.setState({
			colorDetails
		})
	}

	rangeMinChangeHandler = () => {
		let colorDetails = JSON.parse(JSON.stringify(this.state.colorDetails))
		let changedObject = colorDetails.data.find(val => val.name === event.target.name)

		changedObject.minValue = event.target.value && parseFloat(event.target.value)

		this.setState({
			colorDetails
		})
	}


	markerAtSubmitHandler = (event, name) => {
		event.preventDefault()
		let colorDetails = JSON.parse(JSON.stringify(this.state.colorDetails))
		let changedObject = colorDetails.data.find(val => val.name === name)
		let markerAtValue = this.state.markerAtValue

		changedObject.rangesMarkers[0].staticValues.push(markerAtValue)

		changedObject.newRanges = changedObject.rangesMarkers[0].staticValues.concat(changedObject.rangesMarkers[1].dynamicValues)
		changedObject.newRanges = [...new Set(changedObject.newRanges)].sort((a, b) => a - b);

		this.setState({
			colorDetails, markerAtValue: ""
		})

	}

	markerAtValueRemoveHandler = (event, name, index) => {
		event.preventDefault()
		let colorDetails = JSON.parse(JSON.stringify(this.state.colorDetails))
		let changedObject = colorDetails.data.find(val => val.name === name)

		changedObject.rangesMarkers[0].staticValues.splice(changedObject.rangesMarkers[0].staticValues.indexOf(changedObject.newRanges[index]), 1)
		changedObject.newRanges.splice(index, 1)

		this.setState({
			colorDetails,
		})
	}

	colorBackgroundRemoveHandler = (event, name, index) => {
		event.preventDefault()
		let colorDetails = JSON.parse(JSON.stringify(this.state.colorDetails))
		let changedObject = colorDetails.data.find(val => val.name === name)

		if (index == changedObject.colors.length - 1) {
			if (index - 1 >= 0) {
				changedObject.colors[index - 1].max = changedObject.colors[index].max
				changedObject.colors.splice(index, 1)
			}
			else {
				changedObject.colors.splice(index, 1)
			}
		}
		else if (index == 0) {
			changedObject.colors[index + 1].min = changedObject.colors[index].min
			changedObject.colors.splice(index, 1)
		}
		else {
			changedObject.colors[index - 1].max = changedObject.colors[index + 1].min
			changedObject.colors.splice(index, 1)
		}

		changedObject.handles = []
		changedObject.colors.map(range => changedObject.handles.push(range.min, range.max))
		changedObject.handles = ([...new Set(changedObject.handles)].sort((a, b) => a - b)).slice(1, -1);

		changedObject.rangesMarkers[1].dynamicValues = []
		changedObject.colors.map(range => changedObject.rangesMarkers[1].dynamicValues.push(range.min, range.max))

		changedObject.newRanges = changedObject.rangesMarkers[0].staticValues.concat(changedObject.rangesMarkers[1].dynamicValues)
		changedObject.newRanges = [...new Set(changedObject.newRanges)].sort((a, b) => a - b);

		changedObject.gradient = this.getGradient(changedObject.colors, changedObject.newRanges[0], changedObject.newRanges[changedObject.newRanges.length - 1], changedObject.name, changedObject.reverseGradient)

		this.setState({
			colorDetails,
		})
	}

	colorChangeHandler = (color) => {
		let colorBackground = "rgba(" + color.rgb.r + ", " + color.rgb.g + ", " + color.rgb.b + ", {})"
		this.setState({ colorBackground, background: color.hex });
	};


	colorBackgroundSubmitHandler = (event, name) => {
		event.preventDefault()
		let colorDetails = JSON.parse(JSON.stringify(this.state.colorDetails))
		let changedObject = colorDetails.data.find(val => val.name === name)
		let colorBackground = this.state.colorBackground

		let lastColorMax = changedObject.colors[changedObject.colors.length - 1].max
		changedObject.colors[changedObject.colors.length - 1].max = changedObject.colors[changedObject.colors.length - 1].min + (changedObject.colors[changedObject.colors.length - 1].max - changedObject.colors[changedObject.colors.length - 1].min) / 2
		if (!changedObject.colors.some(val => val.color == colorBackground)) {
			changedObject.colors.push({ color: colorBackground, max: lastColorMax, min: changedObject.colors[changedObject.colors.length - 1].max })

			changedObject.handles = []
			changedObject.colors.map(range => changedObject.handles.push(range.min, range.max))
			changedObject.handles = ([...new Set(changedObject.handles)].sort((a, b) => a - b)).slice(1, -1);

			changedObject.rangesMarkers[1].dynamicValues = []
			changedObject.colors.map(range => changedObject.rangesMarkers[1].dynamicValues.push(range.min, range.max))

			changedObject.newRanges = changedObject.rangesMarkers[0].staticValues.concat(changedObject.rangesMarkers[1].dynamicValues)
			changedObject.newRanges = [...new Set(changedObject.newRanges)].sort((a, b) => a - b);

			changedObject.gradient = this.getGradient(changedObject.colors, changedObject.newRanges[0], changedObject.newRanges[changedObject.newRanges.length - 1], changedObject.name, changedObject.reverseGradient)

			this.setState({
				colorDetails
			})
		}

	}

	getGradient = (colors, min, max, name, reverseGradient) => {
		let gradient = reverseGradient ? "linear-gradient(to left," : "linear-gradient(to right,"
		let gradientLength = Math.abs(max - min)
		colors.map((val, index) => {
			let colorsLength = ((Math.abs(val.max - val.min) * 100) / gradientLength)
			let colorStart = (Math.abs(val.min - min) / gradientLength) * 100
			let colorStop = (Math.abs(val.max - min) / gradientLength) * 100


			if (colors.length > 1) {
				gradient = gradient + val.color.replace('{}', 1) + (index == 0 ? colorStart : colorsLength > 5 ? colorStart + 5 : colorStart + (colorsLength / 2)) + "% " + (index == (colors.length - 1) ? colorStop : colorsLength > 5 ? colorStop - 5 : colorStop - (colorsLength / 2)) + "%" + (colorStop == 100 ? ')' : ',');
			}
			else {
				gradient = gradient + val.color.replace('{}', 0.2) + ',' + val.color.replace('{}', 1) + ")";
			}
		})
		return gradient
	}

	onSliderChange = (value, name) => {
		let colorDetails = JSON.parse(JSON.stringify(this.state.colorDetails))
		let changedObject = colorDetails.data.find(val => val.name === name)
		for (let i = 0; i < changedObject.handles.length; i++) {
			// if (value[changedObject.handles.length - 1] < changedObject.newRanges[changedObject.newRanges.length - 1]) {
			changedObject.colors[i].max = value[i]
			changedObject.colors[i + 1].min = value[i]
			changedObject.handles = value
			// }
		}

		changedObject.rangesMarkers[1].dynamicValues = []
		changedObject.colors.map(range => changedObject.rangesMarkers[1].dynamicValues.push(range.min, range.max))

		changedObject.newRanges = changedObject.rangesMarkers[0].staticValues.concat(changedObject.rangesMarkers[1].dynamicValues)
		changedObject.newRanges = [...new Set(changedObject.newRanges)].sort((a, b) => a - b);

		changedObject.gradient = this.getGradient(changedObject.colors, changedObject.newRanges[0], changedObject.newRanges[changedObject.newRanges.length - 1], changedObject.name, changedObject.reverseGradient)

		this.setState({
			colorDetails
		});
	}

	alarmDetailschangeHandler = (event) => {
		let alarmConfigDetails = JSON.parse(JSON.stringify(this.state.alarmConfigDetails))
		alarmConfigDetails.data.find(val => val.name === event.target.name).value = event.target.checked
		this.setState({
			alarmConfigDetails
		})
	}
	getRestDays(timstamp) {
		var date_now = Date.now();
		var date_future = timstamp;
		var delta = Math.abs(date_future - date_now) / 1000;

		// calculate (and subtract) whole days
		return Math.floor(delta / 86400);
	}

	installHandler = licenseKey => {
		this.setState({
			isFetching: true,
			isInstallLicenceOpen: false
		}, () => this.props.installLicenseKey(licenseKey))
	}

	reverseGradientHandler = (event, index) => {
		let colorDetails = cloneDeep(this.state.colorDetails)
		colorDetails.data[index].reverseGradient = event.target.checked
		colorDetails.data[index].gradient = this.getGradient(colorDetails.data[index].colors, colorDetails.data[index].ranges[0], colorDetails.data[index].ranges[colorDetails.data[index].ranges.length - 1], colorDetails.data[index].name, colorDetails.data[index].reverseGradient);
		this.setState({
			colorDetails
		})
	}

	render() {
		return (
			<div className="appContent">
				<Helmet>
					<title>Settings</title>
					<meta name="description" content="Description of Settings" />
				</Helmet>

				<div className="pageBreadcrumb">
					<div className="flex-item fx-b70">
						<p><FormattedMessage {...commonMessages.settings} children={(message => message)} /></p>
						<h5><FormattedMessage {...messages.titleAcSetting} children={(message => message)} /></h5>
					</div>
					<div className="flex-item fx-b30 text-right align-items-center">
					</div>
				</div>

				{this.state.isFetching ?
					<SkeletonLoader skeleton="skeletonSettings" mode="fullView" /> :
					<React.Fragment>
						<ul className="nav nav-tabs customNavTab" role="tablist">
							{this.state.tabs.map((tab, index) => <li key={index} className="nav-item pd-r-4">
								<a className={index == this.state.tabs.findIndex(i => i.name === this.state.activeTab) ? "nav-link active" : "nav-link"} onClick={() => { this.setState({ activeTab: tab.name }) }}>
									{tab.displayName}
								</a>
							</li>)}
						</ul>

						<div className="tab-content tab-customContent">
							{this.state.tabs.some(tab => tab.name == "software") && <div className={this.state.activeTab === "software" ? "tab-pane active" : "tab-pane"}>
								<div className="contentForm shadowNone">
									<h5 className="formHeader"><span className="text-content mr-r-10"><FormattedMessage {...messages.softwareVersion} children={(message => message)} /></span> V - 10.11.5</h5>
									<div className="text-center">
										<button id="updateSoftButton" onClick={() => this.loaderHandler()} className="btn btn-danger" data-toggle="modal" data-target="#updateSoft"><i className="far fa-cloud-download-alt"></i><FormattedMessage {...messages.checkForUpdate} children={(message => message)} /></button>
									</div>
								</div>
							</div>}

							{this.state.tabs.some(tab => tab.name == "accountSettings") && <div className={this.state.activeTab === "accountSettings" ? "tab-pane active" : "tab-pane"}>
								<div className="contentForm shadowNone mr-b-20">
									<h5 className="formHeader"><FormattedMessage {...messages.tableAccountDetails} children={(message => message)} /></h5>
									<div className="account-card">
										<div className="fx-b30">
											<div className="account-header">
												<div className="account-icon">
													<div className="user-icon">
														<i className="far fa-user"></i>
													</div>
												</div>
												<h6>{this.state.accountDetails.roleName}</h6>
												<p>{this.state.accountDetails.ownerName}</p>
											</div>
										</div>
										<div className="fx-b70">
											<div className="account-body">
												<div className="account-content">
													<h6>
														<i className="far fa-building"></i>
														<FormattedMessage {...commonMessages.companyName} children={(message => message)} />
													</h6>
													<p>{this.state.accountDetails.companyName}</p>
												</div>
												<div className="account-content">
													<h6>
														<i className="fas fa-home"></i>
														<FormattedMessage {...commonMessages.tenant} children={(message => message)} />
													</h6>
													<p>{this.state.accountDetails.tenantName}</p>
												</div>
												<div className="account-content">
													<h6>
														<i className="far fa-edit"></i>
														<FormattedMessage {...commonMessages.createdAt} children={(message => message)} />
													</h6>
													<p>{moment(this.state.accountDetails.createdAt).format("DD MMM YYYY HH:mm:ss")}</p>
												</div>
												<div className="account-content">
													<h6>
														<i className="far fa-database"></i>
														<FormattedMessage {...messages.dbSchema} children={(message => message)} />
													</h6>
													<p>{this.state.accountDetails.dbSchema}</p>
												</div>
												<div className="account-content">
													<h6>
														<i className="far fa-envelope"></i>
														<FormattedMessage {...commonMessages.email} children={(message => message)} />
													</h6>
													<p> {this.state.accountDetails.email}</p>
												</div>
												<div className="account-content">
													<h6>
														<i className="fas fa-mobile-alt"></i>
														<FormattedMessage {...commonMessages.contact} children={(message => message)} />
													</h6>
													<p>{this.state.accountDetails.mobile}</p>
												</div>
												<div className="account-content fx-b100">

													<h6>
														<i className="far fa-file-alt"></i>
														<FormattedMessage {...commonMessages.description} children={(message => message)} />
													</h6>
													<p>{this.state.accountDetails.description === "" || this.state.accountDetails.description === null ? "NA" : this.state.accountDetails.description}</p>
												</div>
											</div>
										</div>
									</div>
								</div>
								{this.state.isFetching ?
									<SkeletonLoader skeleton="skeletonAccountSettings" /> :
									<div className="contentForm shadowNone bg-transparent mr-b-20">
										<h5 className="formHeader"><FormattedMessage {...messages.cardHeading} children={(message => message)} />
											{this.state.secretKeys.length > 0 && !this.state.isAddKeyView ?
												<button type="button" className="btn btn-create float-right" onClick={() => this.setState({ isAddKeyView: true, name: "" })}>
													<i className="far fa-plus"></i>
												</button> : null
											}
										</h5>
										{this.state.isAddKeyView ?
											<div className="contentForm shadowNone">
												<form id="keyGenForm" onSubmit={(event) => this.generateKeyhandler(event)}>
													<div className="form-group">
														<label className="form-label"><FormattedMessage {...messages.keyName} /> :<sup><i className="fas fa-asterisk" /></sup></label>
														<input value={this.state.name} onChange={(event) => this.setState({ name: event.target.value })} type="text" className="form-control" required autoFocus />
													</div>
													<div className="form-group justify-content-end">
														<button type="submit" className="btn btn-danger mt-3">
															<i className="far fa-plus-circle"></i><FormattedMessage {...messages.buttonKeyGenerate} children={(message => message)} />
														</button>
														<button onClick={() => this.setState({ isAddKeyView: false, generatedKey: "" })} type="button" className="btn btn-secondary mt-3 ml-2">
															<i className="far fa-times"></i><FormattedMessage {...commonMessages.cancelButton} children={(message => message)} />
														</button>
													</div>
												</form>
											</div>
											: this.state.secretKeys.length === 0 ?
												<div className="text-center m-5">
													<h5 className="text-muted mb-3"><FormattedMessage {...messages.noKeys} /></h5>
													<button type="button" className="btn btn-create" onClick={() => this.setState({ isAddKeyView: true })}><i className="far fa-plus"></i></button>
												</div> :
												<ul className="appListView mr-t-50">
													{this.state.secretKeys.map(secretKey =>
														<li key={secretKey.id}>
															<div className="listIcon">
																<div className="contentIcon">
																	<i className="far fa-lock-open-alt"></i>
																	<sub>
																		<h6>{showInitials(secretKey.name)}</h6>
																	</sub>
																</div>
															</div>
															<div className="listContent">
																<h6><FormattedMessage {...messages.keyName} children={(message => message)} /></h6>
																<p>{secretKey.name}</p>
															</div>
															<div className="listContent">
																<h6><FormattedMessage {...commonMessages.createdAt} children={(message => message)} /></h6>
																<p>{moment(secretKey.createdAt).format("DD MMM YYYY HH:mm:ss")}</p>
															</div>
															<div className="listContent">
																<h6><FormattedMessage {...commonMessages.updatedAt} children={(message => message)} /></h6>
																<p>{moment(secretKey.updatedAt).format("DD MMM YYYY HH:mm:ss")}</p>
															</div>
															<div className="listContent">
																<h6><FormattedMessage {...messages.activeInactive} children={(message => message)} /></h6>
																<label className="switchLabel">
																	<input
																		type="checkbox"
																		id={secretKey.id}
																		checked={secretKey.status}
																		onChange={(event) => this.secretKeyStatusHandler(event)}
																	/>
																	<span className="switchMark"></span>
																</label>
															</div>
															<div className="listContent">
																<h6><FormattedMessage {...commonMessages.actions} children={(message => message)} /></h6>
																<div className="button-group">
																	<button
																		type="button"
																		className="btn-list"
																		onClick={() => this.setState({ generatedKey: secretKey.secretKey, keyName: secretKey.name })}
																	>
																		<i className="far fa-eye" />
																		<FormattedMessage {...commonMessages.show} children={(message => message)} />
																	</button>
																	<button
																		type="button"
																		className="btn-list"
																		onClick={() => this.setState({
																			isOpen: true,
																			type: "confirm",
																			message: <FormattedMessage {...messages.confirmDeleteMessage} children={(message => message)} />,
																			secretKeyId: secretKey.id
																		})}
																		disabled={secretKey.name === "DEFAULT"}

																	>
																		<i className="far fa-trash-alt" />
																		<FormattedMessage {...commonMessages.delete} children={(message => message)} />
																	</button>
																</div>
															</div>
														</li>
													)}
												</ul>
										}
									</div>
								}
							</div>}
							{this.state.tabs.some(tab => tab.name == "license") && <div className={this.state.activeTab === "license" ? "tab-pane active" : "tab-pane"} id="license">
								{this.state.licenceDetailFetching ? <SkeletonLoader skeleton="skeletonSettingLicence" /> :
									<div className="contentForm shadowNone">
										<div className="flex align-items-center">
											<div className="fx-b70 pd-r-20">
												<div className="userLicenceContent">
													<div className="deviceID">
														<h4>
															<strong><FormattedMessage {...commonMessages.deviceId} children={(message => message)} /> :</strong>{this.state.licenceDetail.deviceId}
															<button onClick={() => this.executeCopy(this.state.licenceDetail.deviceId)} className="btn-transparent text-info"
																data-tooltip
																data-tooltip-text="Copy"
															>
																<i className="far fa-copy"></i>
															</button>
															<span className="textCopied">{this.state.deviceIdCopy}</span>
														</h4>
													</div>
													<div className="contentLicence">
														<h5>
															<span><i className="fa fa-certificate"></i></span>
															What's included in {this.state.licenceDetail.license.activePlan} Plan?</h5>
														<ul>
															{this.state.licenceDetail.license.assets.algorithms.map((algo, algoIndex) => <li key={algoIndex} className={algo.value ? "" : "notIncluded"}>{algo.name}</li>)}
														</ul>
													</div>

												</div>
											</div>
											<div className="fx-b30 pd-l-20">
												<div className="userLicenceCard">
													<div className="licenceTitle">
														<h4>
															<span><i className="far fa-badge-check mr-r-8"></i></span>
															{this.state.licenceDetail.license.activePlan}
														</h4>
														<h5>{this.state.licenceDetail.license.currency + (this.state.licenceDetail.license.price / this.state.licenceDetail.license.validFor).toFixed(2)} 
															<span>/<FormattedMessage {...commonMessages.m} children={(message => message)} /></span>
														</h5>
													</div>
													<div className="pipelineStructure licencePlatinumPipeline"></div>
													<div className="expireStatus">
														<h6><FormattedMessage {...messages.expireMessage} children={(message => message)} /></h6>
														<div className="expireIcon">
															<img src={require('../../assets/images/expire.png')}/>
														</div>
														<span className="expireCount">{this.state.licenceDetail.license.validThru == "-1" ? "Unlimited" : this.getRestDays(this.state.licenceDetail.license.validThru)} Days</span>
													</div>
												</div>
											</div>
											<div className="fx-b100 text-center mr-t-30">
												<button className="btn btn-danger" onClick={() => this.setState({ isInstallLicenceOpen: true })}>
													<i className="far fa-arrow-alt-circle-up" />
													<FormattedMessage {...messages.upgradeLicence} children={(message => message)} />
												</button>
											</div>
										</div>
									</div>
								}
							</div>}

							{this.state.tabs.some(tab => tab.name == "units") && <div className={this.state.activeTab === "units" ? "tab-pane active" : "tab-pane"}>
								{this.state.isFetching ? <SkeletonLoader skeleton="skeletonSettingsUnit" /> :
									<form className="contentForm shadowNone" id="unitDetails" onSubmit={this.onSubmitUnitLegendHandler}>
										<div className="flex">
											{this.state.unitDetails.data && this.state.unitDetails.data.map((val, index) => {
												return <div key={index} className="fx-b25 pd-10">
													<div className="card">
														<div className="card-header">{val.displayName}</div>
														<div className="card-body">
															<div className="flex">
																{val.availableUnits.map((value, index) => {
																	return <div key={index} className="fx-b33">
																		<label className="customRadioButton">
																			<input
																				required
																				type="radio"
																				value={value}
																				id={val.name + index}
																				name={val.name}
																				checked={val.default == value}
																				onChange={this.onChangeUnitHandler}
																			/>
																			<span className="radiomark" />
																			<span className="radioText">{value}</span>
																		</label>
																	</div>
																})
																}
															</div>
														</div>
													</div>
												</div>
											})
											}
										</div>
										<div className="text-right mt-3">
											<button className="btn btn-danger">
												<i className="far fa-check-circle" />
												<FormattedMessage {...commonMessages.save} children={(message => message)} />
											</button>
										</div>
									</form>}
							</div>}

							{this.state.tabs.some(tab => tab.name == "pipelineConfiguration") && <div className={this.state.activeTab === "pipelineConfiguration" ? "tab-pane active" : "tab-pane"}>
								{this.state.isFetching ? <SkeletonLoader skeleton="skeletonPipelineConfig" /> :
									<div className="contentForm shadowNone">
										<div id="pipelineConfigAccordion">
											<div className="card mr-b-20">
												<div className="card-header" data-toggle="collapse" data-target="#pipelineColor">
													<FormattedMessage {...messages.pipelineColor} children={(message => message)} />
													<button className="btn btn-transparent btn-collapse">
														<i className="fas fa-angle-up"></i>
													</button>
												</div>
												<div id="pipelineColor" className="collapse show" data-parent="#pipelineConfigAccordion">
													<div className="card-body">
														<form id="colorDetails" onSubmit={this.onSubmitUnitLegendHandler}>
															<div className="flex">
																{this.state.colorDetails.data && this.state.colorDetails.data.map((val, index) => {
																	let colorRange = []
																	val.colors.map(range => colorRange.push(range.min, range.max))
																	colorRange = [...new Set(colorRange)].sort((a, b) => a - b);

																	return <div key={index} className="fx-b50">
																		<div className="card mr-b-20">
																			<div className="card-header">
																				<div className="flex align-items-center">
																					<div className="fx-b30">{val.displayName}</div>
																					<div className="fx-b70 text-right pd-b-10">
																						<span className="configError">
																							{val.maxAlert ? "Max value greater then min" : null}
																							{val.minAlert ? "Min value smaller then max" : null}
																							{val.minAlertNull ? "Min Value can't be null" : null}
																							{val.maxAlertNull ? "Max Value can't be null" : null}
																							{val.maxAlertHandle ? "Max value should not be equal and less than last color min value" : null}
																							{val.minAlertHandle ? "Min value should not be equal and greater than first color max value" : null}
																						</span>

																						<div className="reverseGradient mr-r-20">
																							<button type="button" className="btn-addConfig">
																								{val.reverseGradient ? <i className="far fa-hourglass-start reverseTransition"></i> : <i className="far fa-hourglass-start"></i>}
																								<sub>
																									<label className="customCheckbox">
																										<input
																											type="checkbox"
																											checked={val.reverseGradient}
																											onChange={() => this.reverseGradientHandler(event, index)}
																											disabled={val.colors.length > 1}
																										/>
																										<span className="checkmark" />
																									</label>
																								</sub>
																							</button>
																						</div>
																						<div className="dropdown addConfig mr-r-20">
																							<button className="btn-addConfig" data-toggle="dropdown">
																								<i className="far fa-eye-dropper" />
																								<sub>
																									<i className="fas fa-plus" />
																								</sub>
																							</button>
																							<div className="dropdown-menu">
																								<div className="colorPickerBox">
																									<div className="colorPicker">
																										<SketchPicker presetColors={[]} color={this.state.background} onChangeComplete={this.colorChangeHandler} />
																									</div>
																									<div className="text-right">
																										<button
																											onClick={() => this.colorBackgroundSubmitHandler(event, val.name)}
																											className="btn btn-transparent bg-success text-light"
																										>
																											<i className="fas fa-check"></i>
																										</button>
																									</div>
																								</div>
																							</div>
																						</div>

																						<div className="dropdown addConfig">
																							<button className="btn-addConfig" data-toggle="dropdown">
																								<i className="fas fa-map-marker-alt" />
																								<sub>
																									<i className="fas fa-plus"></i>
																								</sub>
																							</button>
																							<div className="dropdown-menu">
																								<div className="pd-10">
																									<div className="form-group align-items-center">
																										<label className="form-label fx-b100 text-center pd-r-0">
																											<FormattedMessage {...messages.setMinRange} children={(message => message)} />
																										</label>
																										<input type="number"
																											className="form-control fx-b100 text-center"
																											name={val.name}
																											id={val.name + "min" + index}
																											value={val.minValue}
																											onChange={() => this.rangeMinChangeHandler(event, index)}
																											onBlur={this.onBlurMinValueChange}
																											required
																										/>
																									</div>
																									<div className="form-group align-items-center">
																										<label className="form-label fx-b100 text-center pd-r-0">
																											<FormattedMessage {...messages.setMaxRange} children={(message => message)} />
																										</label>
																										<input type="number"
																											className="form-control fx-b100 text-center"
																											name={val.name}
																											id={val.name + "max" + index}
																											value={val.maxValue}
																											onChange={() => this.rangeMaxChangeHandler(event, index)}
																											onBlur={this.onBlurMaxValueChange}
																											required
																										/>
																									</div>
																									<div className="form-group">
																										<label className="form-label text-center pd-r-0 fx-b100">
																											<FormattedMessage {...messages.addMarkerAt} children={(message => message)} />
																										</label>
																										<input type="number"
																											className="form-control fx-b100 text-center"
																											name={val.name}
																											value={this.state.markerAtValue}
																											onChange={() => this.markerValueChangeHandler(event, index)}
																										/>
																									</div>
																									<div className="text-right mr-t-20">
																										<button
																											onClick={() => this.markerAtSubmitHandler(event, val.name)}
																											disabled={parseFloat(this.state.markerAtValue) < val.newRanges[0] || parseFloat(this.state.markerAtValue) > val.newRanges[val.newRanges.length - 1] || this.state.markerAtValue === "" || isNaN(this.state.markerAtValue)}
																											className="btn btn-transparent bg-success text-light">
																											<i className="fas fa-check"></i>
																										</button>
																									</div>
																								</div>
																							</div>
																						</div>
																					</div>
																				</div>
																			</div>

																			<div className="card-body">
																				<div className="flex">
																					<div className="fx-b50">
																						<div className="setConfig">
																							<span className="configIcon">
																								<i className="far fa-eye-dropper" />
																							</span>
																							<div className="pipelineConfigBox">
																								<ul className="pipelineConfig">
																									{val.colors.map((value, index) => {
																										return <li key={index} >
																											<span className="colorTile" style={{ backgroundColor: value.color.replace('{}', 1) }} />
																											{val.colors.length > 1 ?
																												<button onClick={() => this.colorBackgroundRemoveHandler(event, val.name, index)} className="btn-remove">
																													<i className="fas fa-times"></i>
																												</button>
																												:
																												null
																											}
																										</li>
																									})
																									}
																								</ul>
																							</div>
																						</div>
																					</div>

																					<div className="fx-b50">
																						<div className="setConfig">
																							<span className="configIcon">
																								<i className="fas fa-map-marker-alt" />
																							</span>
																							<div className="pipelineConfigBox">
																								<ul className="pipelineConfig">
																									{val.newRanges.map((value, index) => {
																										return <li key={index}>
																											<span className="markerValue">
																												{value}
																											</span>
																											{colorRange.includes(parseFloat(value)) ?
																												null :
																												<button onClick={() => this.markerAtValueRemoveHandler(event, val.name, index)} className="btn-remove">
																													<i className="fas fa-times"></i>
																												</button>
																											}
																										</li>
																									})
																									}
																								</ul>
																							</div>
																						</div>
																					</div>
																				</div>


																				<div className="customRangeBox">
																					<Range
																						min={val.newRanges[0]}
																						allowCross={false}
																						value={val.handles}
																						max={val.newRanges[val.newRanges.length - 1]}
																						railStyle={{ background: val.gradient }}
																						marks={this.marksRange(val.newRanges)}
																						onChange={(value) => this.onSliderChange(value, val.name)}
																						pushable={1}
																						className="customRange"
																					/>
																				</div>
																			</div>
																		</div>
																	</div>
																})
																}
															</div>
															<div className="text-right mt-3">
																<button className="btn btn-danger">
																	<i className="far fa-check-circle" />
																	<FormattedMessage {...commonMessages.save} children={(message => message)} />
																</button>
															</div>
														</form>
													</div>
												</div>
											</div>
											<div className="card mr-b-20">
												<div className="card-header collapsed" data-toggle="collapse" data-target="#pipelineLegends">
													<FormattedMessage {...messages.pipelineLegends} children={(message => message)} />
													<button className="btn btn-transparent btn-collapse">
														<i className="fas fa-angle-up"></i>
													</button>
												</div>
												<div id="pipelineLegends" className="collapse" data-parent="#pipelineConfigAccordion">
													<div className="card-body">
														<form id="legendDetails" onSubmit={this.onSubmitUnitLegendHandler}>
															{/* <h5 className="formHeader mr-b-50"><FormattedMessage {...messages.pipelineLegends} children={(message => message)} /></h5> */}
															<div className="flex pipelineLegendsCard">
																{this.state.legendDetails.data && this.state.legendDetails.data.map((val, index) => {
																	return <div key={index} className="fx-b50">
																		<div className="card mr-b-20">
																			<div className="card-header">
																				{val.category}
																			</div>
																			<div className="card-body">
																				<div className="flex">
																					{val.data.map((value, index) => {
																						return <div key={index} className="fx-b33">
																							<label className="customCheckbox">
																								<input type="checkbox" id={value.item} name={val.category} checked={value.check} value="" onChange={this.onChangeLegendHandler} />
																								<span className="checkmark" />
																								<span className="checkboxText">
																									<span className="checkboxImg">
																										{this.getImageTag(value.item)}
																									</span> {capitalizeFirstLetter(value.displayName)}
																								</span>
																							</label>
																						</div>
																					})
																					}
																				</div>
																			</div>
																		</div>
																	</div>
																})
																}
															</div>
															<div className="text-right mt-3">
																<button className="btn btn-danger">
																	<i className="far fa-check-circle" />
																	<FormattedMessage {...commonMessages.save} children={(message => message)} />
																</button>
															</div>
														</form>
													</div>
												</div>
											</div>

											<div className="card mr-b-20">
												<div className="card-header collapsed" data-toggle="collapse" data-target="#alarmConfigs">
													<FormattedMessage {...messages.alarmConfig} children={(message => message)} />
													<button className="btn btn-transparent btn-collapse">
														<i className="fas fa-angle-up"></i>
													</button>
												</div>
												<div id="alarmConfigs" className="collapse" data-parent="#pipelineConfigAccordion">
													<div className="card-body">
														<form id="alarmConfig" onSubmit={this.onSubmitUnitLegendHandler}>
															<div className="card mr-b-20">
																<div className="card-header">
																	<FormattedMessage {...messages.alarmLatching} children={(message => message)} />
																</div>
																<div className="card-body">
																	<div className="flex">
																		{this.state.alarmConfigDetails.data && this.state.alarmConfigDetails.data.map((val, index) =>
																			<div key={index} className="fx-b20">
																				<label className="customCheckbox">
																					<input onChange={this.alarmDetailschangeHandler} name={val.name} checked={val.value} type="checkbox" />
																					<span className="checkmark" />
																					<span className="checkboxText">
																						{val.displayName}
																					</span>
																				</label>
																			</div>
																		)
																		}
																	</div>
																</div>
															</div>

															<div className="text-right mt-3">
																<button className="btn btn-danger">
																	<i className="far fa-check-circle" />
																	<FormattedMessage {...commonMessages.save} children={(message => message)} />
																</button>
															</div>
														</form>
													</div>
												</div>
											</div>


											<div className="card mr-b-20">
												<div className="card-header collapsed" data-toggle="collapse" data-target="#pipelineDTSConfig">
													<FormattedMessage {...messages.DTSMeasurement} children={(message => message)} />
													<button className="btn btn-transparent btn-collapse">
														<i className="fas fa-angle-up"></i>
													</button>
												</div>
												<div id="pipelineDTSConfig" className="collapse" data-parent="#pipelineConfigAccordion">
													<div className="card-body">
														<form id="DTSTemp" onSubmit={this.onSubmitUnitLegendHandler}>
															<div className="card">
																<div className="card-header">
																	<FormattedMessage {...messages.temperature} children={(message => message)} />
																</div>
																<div className="card-body pd-40">
																	<div className="flex">
																		<div className="fx-b50 pd-r-8">
																			<div className="form-group">
																				<label className="form-label">
																					<FormattedMessage {...messages.min} children={(message => message)} /> :
																			</label>
																				<div className="input-group">
																					<input
																						type="number"
																						className="form-control"
																						name="DTSTemp"
																						id="min"
																						onChange={this.onDTSMeasurementHandler}
																						value={this.state.DTSTemp && this.state.DTSTemp.data[0].min}
																						required />
																					<div className="input-group-append">
																						<span className="input-group-text">{this.state.DTSTemp && this.state.DTSTemp.data[0].unit}</span>
																					</div>
																				</div>
																			</div>
																		</div>
																		<div className="fx-b50 pd-l-8">
																			<div className="form-group">
																				<label className="form-label">
																					<FormattedMessage {...messages.max} children={(message => message)} /> :
																			</label>
																				<div className="input-group">
																					<input
																						type="number"
																						className="form-control"
																						name="DTSTemp"
																						id="max"
																						value={this.state.DTSTemp && this.state.DTSTemp.data[0].max}
																						onChange={this.onDTSMeasurementHandler}
																						required />
																					<div className="input-group-append">
																						<span className="input-group-text">{this.state.DTSTemp && this.state.DTSTemp.data[0].unit}</span>
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>


															<div className="text-right mt-5">
																<button className="btn btn-danger">
																	<i className="far fa-check-circle" />
																	<FormattedMessage {...commonMessages.save} children={(message => message)} />
																</button>
															</div>
														</form>
													</div>
												</div>
											</div>

											<div className="card">
												<div className="card-header collapsed" data-toggle="collapse" data-target="#pipelineHealth">
													<FormattedMessage {...messages.pipelineHealth} children={(message => message)} />
													<button className="btn btn-transparent btn-collapse">
														<i className="fas fa-angle-up"></i>
													</button>
												</div>
												<div id="pipelineHealth" className="collapse" data-parent="#pipelineConfigAccordion">
													<div className="card-body">
														<form id="healthScore" onSubmit={this.onSubmitUnitLegendHandler}>
															{/* <h5 className="formHeader mr-b-50"><FormattedMessage {...messages.pipelineHealth} children={(message => message)} /></h5> */}
															<div className="flex pipelineHealthList">
																{this.state.healthScoreDetails.data && this.state.healthScoreDetails.data.map((val, index) => {
																	return <div key={index} className="fx-b33 pd-15">
																		<div className="card">
																			<div className="card-header">
																				{val.displayName}
																			</div>
																			<div className="card-body">
																				<div className="form-group">
																					<label className="form-label">
																						<FormattedMessage {...messages.basepoint} children={(message => message)} /> :
																			</label>
																					<input
																						type="number"
																						className="form-control"
																						value={val.basePoint}
																						name={val.name}
																						id={"basePoint" + index}
																						onChange={() => this.nameChangeHandler(event, index)}
																						required
																					/>
																				</div>
																				<div className="form-group">
																					<label className="form-label">
																						<FormattedMessage {...messages.magnitude} children={(message => message)} />  :
								</label>
																					<div className="input-group">
																						<input
																							type="number"
																							className="form-control"
																							value={val.magnitude.value}
																							name={val.name}
																							id={"magnitude" + index}
																							onChange={() => this.nameChangeHandler(event, index)}
																							required />
																						<div className="input-group-append">
																							<span className="input-group-text">{val.magnitude.unit}</span>
																						</div>
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																})
																}
															</div>
															<div className="text-right mt-5">
																<button className="btn btn-danger">
																	<i className="far fa-check-circle" />
																	<FormattedMessage {...commonMessages.save} children={(message => message)} />
																</button>
															</div>
														</form>
													</div>
												</div>
											</div>
										</div>
									</div>
								}
							</div>}
						</div>

						<div className="modal" id="updateSoft">
							<div className="modal-dialog">
								<div className="modal-content">
									<div className="modal-header">
										<h4 className="modal-title"><FormattedMessage {...messages.softwareUpdate} children={(message => message)} /> <button type="button" className="close" data-dismiss="modal"> &times;</button></h4>
									</div>
									<div className="modal-body">
										<div className="updateSoftcontent">
											{this.state.isLoaderVisible ? <div className="updateSpinner">
												<h6 className="contentHeader mr-b-1">
													<span className="text-secondary"><FormattedMessage {...messages.checkingForUpdates} children={(message => message)} /></span>
												</h6>
												<i className="far fa-spinner-third fa-spin fa-2x text-theme"></i>
											</div> : <React.Fragment><h6 className="contentHeader mr-b-1">
												<span className="text-success"><FormattedMessage {...messages.updatesAreAvailable} children={(message => message)} /></span>
											</h6>
													<h6 className="contentHeader"><span><FormattedMessage {...messages.latestVersion} children={(message => message)} /></span> <span className="text-danger"> 10.12.0</span></h6>
													<ul className="softUpdateList mr-b-5">
														{this.state.latestUpdate.filter((value, index) => index < this.state.viewLimit).map((val, index) => {
															return (
																<li key={val + index}>{val}</li>
															)
														})}
													</ul>
													<button
														className="btn btn-link pd-l-40"
														onClick={() => this.setState({
															viewLimit: this.state.viewLimit === 3 ? this.state.latestUpdate.length : 3
														})}>
														{this.state.viewLimit === 3 ? "View More..." : "View Less"}
													</button>
													<div className="flex justify-content-end">
														<button className="btn btn-danger"><i className="far fa-cloud-download-alt"></i><FormattedMessage {...messages.updateNow} children={(message => message)} /></button>
													</div></React.Fragment>}
										</div>
									</div>
								</div>
							</div>
						</div>
						{this.state.isInstallLicenceOpen ? <InstallLicence companyName={this.state.accountDetails.companyName} tenant={this.state.accountDetails.tenantName} licenseName={this.state.licenceDetail.license.activePlan} installHandlerComponent={this.installHandler} onClose={this.modalCloseHandler} /> : null}
						{this.state.isOpen ? <MessageModal type={this.state.type} onConfirm={() => this.deleteHandler(this.state.secretKeyId)} message={this.state.message} onClose={this.modalCloseHandler} /> : null}

						{this.state.generatedKey ? <div className="modal fade show d-block" role="dialog" id="keyModal" data-backdrop="false">
							<div className="modal-dialog modal-lg modal-dialog-centered">
								<div className="modal-content">
									<div className="modal-header">
										<h4 className="modal-title">
											<FormattedMessage {...messages.secretKey} children={(message => message)} />
											<button type="button" className="close" data-dismiss="modal" onClick={this.modalCloseHandler}>&times;</button>
										</h4>
									</div>
									<div className="modal-body">
										{this.state.modalForSuccess ? <div className="alert alert-success text-center">
											<p className="text-success m-0"><FormattedMessage {...messages.secretKeyMessageSuccess} children={(message => message)} /></p>
										</div> : null}
										<div className="form-group">
											<label className="form-label w-100"><FormattedMessage {...messages.key} children={(message => message)} /> : {this.state.keyName}
												<span className="float-right">
													<span className="text-info">{this.state.copySuccess}</span>
													<button onClick={this.copyToClipboard} className="btn btn-transparent text-info ml-2"
														data-tooltip
														data-tooltip-text="Copy"
													>
														<i className="far fa-copy"></i>
													</button>
												</span>
											</label>
											<textarea rows="12" ref={(textarea) => this.textArea = textarea} defaultValue={this.state.generatedKey} readOnly className="form-control"></textarea>
										</div>
									</div>
									<div className="modal-footer">
										<button type="button" className="btn btn-danger" onClick={this.modalCloseHandler} data-dismiss="modal">
											<i className="far fa-check" />
											<FormattedMessage {...messages.okay} children={(message => message)} />
										</button>
									</div>
								</div>
							</div>
						</div> : null
						}
					</React.Fragment>
				}
			</div >
		);
	}
}

const mapStateToProps = createStructuredSelector({
	generatedKey: getGeneratedKey(),
	generatedKeyError: getGeneratedKeyError(),
	secretKeys: getSecretKeyList(),
	secretKeysError: getSecretKeyError(),
	secretStatus: getSecretStatusSuccess(),
	secretStatusError: getSecretStatusError(),
	accountDetail: getAccountDetailsSuccess(),
	accountDetailError: getAccountDetailsError(),
	secretKeyDeleteSuccess: secretKeyDeleteSuccess(),
	secretKeyDeleteFailure: secretKeyDeleteFailure(),
	submitConfigSuccess: submitConfigSuccess(),
	submitConfigFailure: submitConfigFailure(),
	pipelineConfigSuccess: pipelineConfigSuccess(),
	pipelineConfigError: pipelineConfigError(),
	licenceSuccess: getLicenceSuccess(),
	licenceFailure: getLicenceFailure(),
	tabs: getTabsSuccess(),
	tabsError: getTabsFailure(),
	licenseKeySuccess: licenseKeySuccess(),
	licenseKeyFailure: licenseKeyFailure()
});

export function mapDispatchToProps(dispatch) {
	return {
		dispatch,
		generateKeyhandler: (payload) => dispatch(generateKeyhandler(payload)),
		getSecretKeys: () => dispatch(getSecretKeys()),
		secretActiveDeactiveHandler: (id, status) => dispatch(secretActiveDeactiveHandler(id, status)),
		getAccountDetails: () => dispatch(getAccountDetails()),
		deleteSecretKey: (id) => dispatch(deleteSecretKey(id)),
		getPipelineConfig: (type) => dispatch(getPipelineConfig(type)),
		onSubmitConfigHandler: (payload) => dispatch(onSubmitConfigHandler(payload)),
		getLicenceInfo: () => dispatch(getLicenceInfo()),
		getSettingTab: () => dispatch(getSettingTab()),
		installLicenseKey: (licenseKey) => dispatch(installLicenseKey(licenseKey))
	};
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
);

const withReducer = injectReducer({ key: "settings", reducer });
const withSaga = injectSaga({ key: "settings", saga });

export default compose(
	withReducer,
	withSaga,
	withConnect
)(Settings);

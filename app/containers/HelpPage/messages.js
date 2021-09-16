/*
 * HelpPage Messages
 *
 * This contains all the text for the HelpPage container.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.containers.HelpPage'

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the HelpPage container!'
  },
  helpTitle: {
    id: `${scope}.helpTitle`,
    defaultMessage: 'Help'
  },
  algorithmDescription: {
    id: `${scope}.algorithmDescription`,
    defaultMessage: 'Algorithm Description'
  },
  algorithmDescriptionParagraph: {
    id: `${scope}.algorithmDescriptionParagraph`,
    defaultMessage: 'There are a number of complex mathematical algorithms that work in the background to provide ' +
        'the functionality in the GUI. These algorithms are part of the Intellectual Property code in this software, ' +
        'and are not to be altered, unless permission is granted from nVent.'
  },
  descriptionOnHowToConfigure: {
    id: `${scope}.descriptionOnHowToConfigure`,
    defaultMessage: 'Description On How To Configure'
  },
  generalParameterConfiguration: {
    id: `${scope}.generalParameterConfiguration`,
    defaultMessage: 'General Parameter Configuration'
  },
  parameterConfigurationTopParagraph: {
    id: `${scope}.parameterConfigurationTopParagraph`,
    defaultMessage: 'The values used in algorithm calculations and shown in the GUI are set by nVent during initial ' +
        'software customization. These include things like:'
  },
  parameterConfigurationBottomParagraph: {
    id: `${scope}.parameterConfigurationBottomParagraph`,
    defaultMessage:
        'If the original Asset Organization changes, or if additional pipelines are to be added, please contact nVent.'
  },
  organizationOfYourPipelineAssets: {
    id: `${scope}.'organizationOfYourPipelineAssets`,
    defaultMessage: 'Organization of Your Pipeline Asset(s)'
  },
  organizationTopParagraph: {
    id: `${scope}.'organizationTopParagraph`,
    defaultMessage:
        'As part of the software customization for your Facility, nVent has organized your asset(s) as follows:'
  },
  organizationBottomParagraph: {
    id: `${scope}.'organizationTopParagraph`,
    defaultMessage:
        'If the original Asset Organization changes, or if additional pipelines are to be added, please contact nVent.'
  },
  overallPipelineHealth: {
    id: `${scope}.overallPipelineHealth`,
    defaultMessage: 'Overall Pipeline Health Organization'
  },
  progressionOfPipelineState: {
    id: `${scope}.progressionOfPipelineState`,
    defaultMessage: 'Progression Of Pipeline State'
  },
  hotSpot: {
    id: `${scope}.hotSpot`,
    defaultMessage: 'Hot Spot'
  },
  coldSpot: {
    id: `${scope}.coldSpot`,
    defaultMessage: 'Cold Spot'
  },
  timeToFreeze: {
    id: `${scope}.timeToFreeze`,
    defaultMessage: 'Time To Freeze'
  },
  freezingImminent: {
    id: `${scope}.freezingImminent`,
    defaultMessage: 'Freezing Imminent'
  },
  freezingDetected: {
    id: `${scope}.freezingDetected`,
    defaultMessage: 'Freezing Detected'
  },
  frozen: {
    id: `${scope}.frozen`,
    defaultMessage: 'Frozen'
  },
  plug: {
    id: `${scope}.plug`,
    defaultMessage: 'Plug'
  },
  insulationHeater: {
    id: `${scope}.insulationHeater`,
    defaultMessage: 'Insulation Heater'
  },
  heatTransferCoefficient: {
    id: `${scope}.heatTransferCoefficient`,
    defaultMessage: 'Heat Transfer Coefficient'
  },
  thermalMass: {
    id: `${scope}.thermalMass`,
    defaultMessage: 'Thermal Mass'
  },
  heaterHealth: {
    id: `${scope}.heaterHealth`,
    defaultMessage: 'Heater Health'
  },
  impedance: {
    id: `${scope}.impedance`,
    defaultMessage: 'Impedance'
  },
  allOtherAlarms: {
    id: `${scope}.allOtherAlarms`,
    defaultMessage: 'All Other Alarms Eventually'
  },
  rupture: {
    id: `${scope}.rupture`,
    defaultMessage: 'Rupture'
  },
  meltUniformity: {
    id: `${scope}.meltUniformity`,
    defaultMessage: 'Melt Uniformity'
  },
  plants: {
    id: `${scope}.plants`,
    defaultMessage: 'Plants'
  },
  pipeline: {
    id: `${scope}.pipeline`,
    defaultMessage: 'PipeLine'
  },
  stsCircuit: {
    id: `${scope}.stsCircuit`,
    defaultMessage: 'STS Circuit'
  },
  agents: {
    id: `${scope}.agents`,
    defaultMessage: 'Agents (AP Sensing + DCS Agent)'
  },
  byPlant: {
    id: `${scope}.byPlant`,
    defaultMessage: 'By Plant'
  },
  byPipeline: {
    id: `${scope}.byPipeline`,
    defaultMessage: 'By Pipeline'
  },
  byHeaterCircuit: {
    id: `${scope}.byHeaterCircuit`,
    defaultMessage: 'By Heater Circuit (when applicable)'
  },
  byOperatorShift: {
    id: `${scope}.byOperatorShift`,
    defaultMessage: 'By Operator Shift'
  },
  englishSiUnits: {
    id: `${scope}.englishSiUnits`,
    defaultMessage: 'English / SI Units'
  },
  temperatureCelsiusFahrenheit: {
    id: `${scope}.temperatureCelsiusFahrenheit`,
    defaultMessage: 'Temperature – Celsius / Fahrenheit'
  },
  timeMilitaryClock: {
    id: `${scope}.timeMilitaryClock`,
    defaultMessage: 'Time – Military Time / Clock a.m./p.m.'
  },
  userLogonGroups: {
    id: `${scope}.userLogonGroups`,
    defaultMessage: 'User Logon Group(s)'
  },
  individualUserPermissionSettings: {
    id: `${scope}.IndividualUserPermissionSettings`,
    defaultMessage: 'Individual User Permission Settings'
  },
  languageEnglishIsDefault: {
    id: `${scope}.languageEnglishIsDefault`,
    defaultMessage: 'Language (English is default)'
  },
  alarmSettings: {
    id: `${scope}.alarmSettings`,
    defaultMessage: 'Alarm Settings'
  },
  alarmAggregationRules: {
    id: `${scope}.Alarm alarmAggregationRules`,
    defaultMessage: 'Alarm Aggregation Rules'
  },
  overallHealthAlarm: {
    id: `${scope}.Alarm overallHealthAlarm`,
    defaultMessage: 'Overall Health Alarm – Factor Selection / Weighting'
  },
  freezePointAndTimeToFreezeThreshold: {
    id: `${scope}.Alarm freezePointAndTimeToFreezeThreshold`,
    defaultMessage: 'Freeze Point and Time-to-Freeze Threshold'
  },
  iam: {
    id: `${scope}.iam`,
    defaultMessage: 'IAM'
  },
  individualUserSettings: {
    id: `${scope}.individualUserSettings`,
    defaultMessage: 'Individual User Settings'
  },
  tenantConfigurations: {
    id: `${scope}.tenantConfigurations`,
    defaultMessage: 'Tenant Configurations (Units, Secret etc)'
  },
  alarmAggregation: {
    id: `${scope}.alarmAggregation`,
    defaultMessage: 'Alarm Aggregation'
  },
  pipelineHealthGauge: {
    id: `${scope}.pipelineHealthGauge`,
    defaultMessage: 'Pipeline Health Gauge'
  }
})

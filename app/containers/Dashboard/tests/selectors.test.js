import { fromJS } from 'immutable';
import { selectDashboardDomain, getTimeFreezeDataSuccess, 
  getTimeFreezeDataFailure, getSegmentDataSuccess, 
  getSegmentDataFailure,
  getChartDetailsSuccess, getChartDetailsFailure,
  plantList,plantListFailure,
  pipelineList,pipelineListFailure,
  attributesList, attributesListFailure
} from '../selectors';
const dashboardMockState = fromJS({
  dashboard: {
    timeFreezeDataSuccess: {
      accessToken: "asdfghjklcvbnm",
      verified: true
    },
    timeFreezeDataFailure: "username or password is incorrect.",
    chartDetailsSuccess: {
      accessToken: "asdfghjklcvbnm",
      verified: true
    },
    chartDetailsFailure: "username or password is incorrect.",
    segmentDataSuccess: {
      accessToken: "asdfghjklcvbnm",
      verified: true
    },
    segmentDataError: "username or password is incorrect.",
    plantList: {
      accessToken: "asdfghjklcvbnm",
      verified: true
    },
    plantListFailure: "username or password is incorrect.",
    pipelineList: {
      accessToken: "asdfghjklcvbnm",
      verified: true
    },
    pipelineListFailure: "username or password is incorrect.",
    attributesList: {
      accessToken: "asdfghjklcvbnm",
      verified: true
    },
    attributesListFailure: "username or password is incorrect.",
  }
})

describe('selectDashboardDomain', () => {
  it('should select the global state', () => {
    const globalState = fromJS({});
    const mockedState = fromJS({
      error: "this is error message",
    });
    expect(selectDashboardDomain(mockedState)).toEqual(globalState);
  });

  it('should return getTimeFreezeDataSuccess state ', () => {
    const loginSuccessState = getTimeFreezeDataSuccess();
    const expectedResponseState = fromJS({
      accessToken: "asdfghjklcvbnm",
      verified: true
    })
    expect(loginSuccessState(dashboardMockState)).toEqual(expectedResponseState);
  });

  it('should return getTimeFreezeDataFailure state ', () => {
    const loginErrorState = getTimeFreezeDataFailure();
    const expectedErrorState = "username or password is incorrect."
    expect(loginErrorState(dashboardMockState)).toEqual(expectedErrorState);
  });

  it('should return getSegmentDataSuccess state ', () => {
    const loginSuccessState = getSegmentDataSuccess();
    const expectedResponseState = fromJS({
      accessToken: "asdfghjklcvbnm",
      verified: true
    })
    expect(loginSuccessState(dashboardMockState)).toEqual(expectedResponseState);
  });

  it('should return getSegmentDataFailure state ', () => {
    const loginErrorState = getSegmentDataFailure();
    const expectedErrorState = "username or password is incorrect."
    expect(loginErrorState(dashboardMockState)).toEqual(expectedErrorState);
  });

  it('should return getChartDetailsSuccess state ', () => {
    const loginSuccessState = getChartDetailsSuccess();
    const expectedResponseState = fromJS({
      accessToken: "asdfghjklcvbnm",
      verified: true
    })
    expect(loginSuccessState(dashboardMockState)).toEqual(expectedResponseState);
  });

  it('should return getChartDetailsFailure state ', () => {
    const loginErrorState = getChartDetailsFailure();
    const expectedErrorState = "username or password is incorrect."
    expect(loginErrorState(dashboardMockState)).toEqual(expectedErrorState);
  });

  it('should return plantList state ', () => {
    const loginSuccessState = plantList();
    const expectedResponseState = fromJS({
      accessToken: "asdfghjklcvbnm",
      verified: true
    })
    expect(loginSuccessState(dashboardMockState)).toEqual(expectedResponseState);
  });

  it('should return plantListFailure state ', () => {
    const loginErrorState = plantListFailure();
    const expectedErrorState = "username or password is incorrect."
    expect(loginErrorState(dashboardMockState)).toEqual(expectedErrorState);
  });

  it('should return pipelineList state ', () => {
    const loginSuccessState = pipelineList();
    const expectedResponseState = fromJS({
      accessToken: "asdfghjklcvbnm",
      verified: true
    })
    expect(loginSuccessState(dashboardMockState)).toEqual(expectedResponseState);
  });

  it('should return pipelineListFailure state ', () => {
    const loginErrorState = pipelineListFailure();
    const expectedErrorState = "username or password is incorrect."
    expect(loginErrorState(dashboardMockState)).toEqual(expectedErrorState);
  });

  it('should return attributesList state ', () => {
    const loginSuccessState = attributesList();
    const expectedResponseState = fromJS({
      accessToken: "asdfghjklcvbnm",
      verified: true
    })
    expect(loginSuccessState(dashboardMockState)).toEqual(expectedResponseState);
  });

  it('should return attributesListFailure state ', () => {
    const loginErrorState = attributesListFailure();
    const expectedErrorState = "username or password is incorrect."
    expect(loginErrorState(dashboardMockState)).toEqual(expectedErrorState);
  });
});

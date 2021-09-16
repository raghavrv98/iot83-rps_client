import { fromJS } from 'immutable';
import {
    getDatabase,getDatabaseFailure,
    getTenant,getTenantFailure,
    activityStatus,activityStatusFailure,
    createBackupListSucess,createBackupListFailure
  } from '../selectors'

  const mockedState = fromJS({
    databaseAndBackUps: {
        getDatabase: true,
        getDatabaseFailure: false,
        getTenant: true,
        getTenantFailure: false,
        getActivityStatus: true,
        getActivityStatusFailure: false,
        createBackupDataSucess: true,
        createBackupDataFailure: false,
    }
  })

describe('selectDatabaseAndBackUpsDomain', () => {
    it('Expect to have unit tests specified', () => {
    expect(true).toEqual(true);
    });

    it('should return getDatabase state ', () => {
        const functioncalls = getDatabase();
        expect(functioncalls(mockedState)).toEqual(true);
    });

    it('should return getDatabaseFailure state ', () => {
        const functioncalls = getDatabaseFailure();
        expect(functioncalls(mockedState)).toEqual(false);
    });

    it('should return getTenant state ', () => {
        const functioncalls = getTenant();
        expect(functioncalls(mockedState)).toEqual(true);
    });

    it('should return getTenantFailure state ', () => {
        const functioncalls = getTenantFailure();
        expect(functioncalls(mockedState)).toEqual(false);
    });

    it('should return getActivityStatus state ', () => {
        const functioncalls = activityStatus();
        expect(functioncalls(mockedState)).toEqual(true);
    });

    it('should return getActivityStatusFailure state ', () => {
        const functioncalls = activityStatusFailure();
        expect(functioncalls(mockedState)).toEqual(false);
    });

    it('should return createBackupDataSucess state ', () => {
        const functioncalls = createBackupListSucess();
        expect(functioncalls(mockedState)).toEqual(true);
    });

    it('should return createBackupDataFailure state ', () => {
        const functioncalls = createBackupListFailure();
        expect(functioncalls(mockedState)).toEqual(false);
    });
});
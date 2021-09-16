import { defaultAction, getDataBaseList, createBackupPayload, getTenantList, getActivityStatus } from '../actions';
import { DEFAULT_ACTION,
      GET_DATABASE_LIST,
      CREATE_BACKUP_LIST,
      GET_TENANT_LIST,
      GET_ACTIVITY_STATUS 
} from '../constants';

describe('DatabaseAndBackUps actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: DEFAULT_ACTION,
      };
      expect(defaultAction()).toEqual(expected);
    });
  });

  describe('Get Database List', () => {
    it('has a type of GET_DATABASE_LIST', () => {
      const expected = {
        type: GET_DATABASE_LIST,
      };
      expect(getDataBaseList()).toEqual(expected);
    });
  });

  describe('Create Backup Payload', () => {
    it('has a type of GET_DATABASE_LIST', () => {
      const expected = {
        type: CREATE_BACKUP_LIST,
        backupPayload: "demo"
      };
      expect(createBackupPayload("demo")).toEqual(expected);
    });
  });

  describe('Get Tenant List', () => {
    it('has a type of GET_TENANT_LIST', () => {
      const expected = {
        type: GET_TENANT_LIST
      };
      expect(getTenantList()).toEqual(expected);
    });
  });

  describe('Get Activity Status', () => {
    it('has a type of GET_ACTIVITY_STATUS', () => {
      const expected = {
        type: GET_ACTIVITY_STATUS,
        id: "demo"
      };
      expect(getActivityStatus("demo")).toEqual(expected);
    });
  });
});

import { ApiClientMethod } from '../ApiHttpClient';
import { stringify as stringifyParams } from 'qs';

const ApiEndpointPaths = {
    EMPLOYEE_TEAM_DIVISION_ASSIGNMENTS: 'employee/teamdivisionassignments',
    EMPLOYEE_TEAM_DIVISION_HEAD: 'employee/teamdivisionhead',
    EMPLOYEE_TEAM_DIVISION_ASSIGNMENTS_TEAM: 'employee/teamdivisionassignmentsteam',
    EMPLOYEE_TEAM_DIVISION_SUBORDINATES: 'employee/teamdivisionsubordinates',
    EMPLOYEE_INFO: 'employee/info',
    EMPLOYEE_LIST: 'employee/list',
    EMPLOYEE_FIND: 'employee/find',
    EMPLOYEE_CONDITION: 'employee/condition',
    EMPLOYEE_TEAM_DIVISION_HEAD_HEAD: 'employee/teamdivisionheadhead',
    EMPLOYEE_TEAM_LEGAL_ENTITY_ASSIGNMENTS: 'employee/teamlegalentityassignments',
    EMPLOYEE_TEAM_DIVISION_ROLES_TEAM: 'employee/teamdivisionrolesteam',
    EMPLOYEE_DELETE_TEAM_DIVISION_SUCCESSOR: 'employee/deleteteamdivisionsuccessor',
    // eslint-disable-next-line id-length
    EMPLOYEE_TEAM_DIVISION_LEGAL_ENTITY_ASSIGNMENTS: 'employee/teamdivisionassignmentslegalentity',

    DIVISION_PATH: 'division/path', // Положение в организационной структуре
    DIVISION_INFO: 'division/info', // Получение информации о подразделении
    DIVISION_LIST: 'division/list', // Получение информации о списке подразделений
    DIVISION_POSITION: 'division/position', // Получение информации о должностях и их назначениях в подразделении

    ROLE_LIST: 'role/list',
    ROLE_ASSIGNMENTS_LIST: 'role/legalentityassignments',
    ROLE_SET_EMPLOYEE: 'role/setemployeerole',
    ROLE_CLEAR_EMPLOYEE: 'role/clearemployeerole',

    DIVISION_TEAM_ROLE: 'divisionteamrole',
    DIVISION_TEAM_ROLE_GET_BY_ID: 'divisionteamrole/:id',
    DIVISION_TEAM_ROLE_SET_BY_ID: 'divisionteamrole/:id',

    DIVISION_TEAM_ASSIGNMENT_ROTATION_COMMIT: 'employee/teamdivisionassignmentrotationcommit',
    DIVISION_TEAM_ASSIGNMENT_ROTATION_WITHDRAW: 'employee/teamdivisionassignmentrotationwithdraw',
    DIVISION_TEAM_ASSIGNMENT_ROTATION_CREATE: 'employee/addteamdivisionassignmentrotation',
    DIVISION_TEAM_ASSIGNMENT_ROTATION_UPDATE_COMMENT: 'employee/teamdivisionassignmentrotationcomment'
};

export const ServiceAction = {
    EMPLOYEE_DIVISION_TEAM_SUCCESSOR_ADD: {
        url: 'employee/addteamdivisionsuccessor',
        options: {
            method: ApiClientMethod.POST,
            headers: {
                'content-type': 'application/json'
            }
        }
    },
    EMPLOYEE_DIVISION_TEAM_SUCCESSOR_READINESS_SET: {
        url: 'employee/setteamdivisionsuccessorreadiness',
        options: {
            method: ApiClientMethod.POST,
            headers: {
                'content-type': 'application/json'
            }
        }
    },
    EMPLOYEE_DIVISION_TEAM_SUCCESSOR_DATE_HR_UPDATE: {
        url: 'employee/divisionteamsuccessorupdatehr',
        options: {
            method: ApiClientMethod.PUT,
            headers: {
                'content-type': 'application/json'
            },
            paramsSerializer: (params) =>
                Object.entries(params).reduce((result, param) => {
                    if (!param[1]) {
                        return result;
                    }

                    return `${result}&${param[0]}=${encodeURI(param[1])}`;
                }, '')
        }
    },
    ASSIGNMENT_READINESS_GET: {
        url: 'library/assignmentreadiness'
    },
    DIVISION_TEAM_ROLE_SET_BY_ID: {
        url: 'divisionteamrole/:id',
        options: {
            method: ApiClientMethod.PUT,
            headers: {
                'content-type': 'application/json'
            }
        }
    },
    DIVISION_TEAM_ROLE_FIND: {
        url: 'divisionteamrole/find',
        options: {
            method: ApiClientMethod.POST,
            paramsSerializer: (params) => stringifyParams(params, { arrayFormat: 'comma', encode: false })
        }
    },
    COMPETENCE_ASSIGMENT_ACCORDANCE_GET: {
        url: 'competence/assignmentaccordance'
    }
};

export { ApiEndpointPaths };

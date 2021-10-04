import { success } from '@goodt-common/utils';
import { BaseDto, buildDtoSafeResult } from '@goodt-common/infra';

import { BaseApiService, ApiClientMethod, ApiServiceError } from '@goodt-common/api';

import { ApiEndpointPaths as Paths } from './config';
import {
    DivisionTeamAssignmentDto,
    DivisionTeamRoleContainerDto,
    EmployeeConditionInfoDto,
    EmployeeExtendedInfoDto,
    LegalEntityTeamAssignmentDto,
    DivisionInfoDto,
    DivisionPositionDto,
    DivisionShortInfoDto,
    RoleInfoDto,
    DivisionTeamRoleRawDto,
    DivisionTeamRoleDto
} from './dto';

import { withEmployeeContext, withEmployeeIdContext } from './EmployeeContext';
import { withDivisionContext, withDivisionIdContext } from './DivisionContext';
import { withTeamContext, withTeamIdContext } from './TeamContext';

/**
 *
 * @param {import('@goodt-common/infra/BaseDto').BaseDto.constructor} DtoConstructor
 * @param {SafeResult} safeResult
 * @return {SafeResult<BaseDto|BaseDto[], Error>}
 */
const processRequestResult = (DtoConstructor, safeResult) => {
    const { isError, result: dtoJsonResult } = safeResult;

    if (isError) {
        return safeResult;
    }

    return buildDtoSafeResult(DtoConstructor, dtoJsonResult);
};

/**
 *
 */
class OrgStructureApiService extends BaseApiService {
    /**
     *
     * @param {?number} [employeeId]
     * @return {Promise<SafeResult<EmployeeExtendedInfoDto, Error>>}
     */
    async getEmployeeById(employeeId) {
        const safeResult = await this.request({
            url: Paths.EMPLOYEE_INFO,
            params: {
                id: employeeId
            }
        });

        return processRequestResult(EmployeeExtendedInfoDto, safeResult);
    }

    /**
     *
     * @param {number[]} employeeIds
     * @return {Promise<SafeResult<EmployeeExtendedInfoDto[], Error>>}
     */
    async getEmployeesByIds(employeeIds) {
        const safeResult = await this.request({
            url: Paths.EMPLOYEE_LIST,
            params: {
                employees: employeeIds
            }
        });

        return processRequestResult(EmployeeExtendedInfoDto, safeResult);
    }

    /**
     *
     * @param {number[]} [employeeIds]
     * @param {number} [divisionId]
     * @param {string} [searchToken]
     * @return {Promise<SafeResult<EmployeeExtendedInfoDto[], Error>>}
     */
    async getEmployeesByFilter({ employeeIds, divisionId, searchToken } = {}) {
        const safeResult = await this.request({
            url: Paths.EMPLOYEE_FIND,
            params: {
                ...(employeeIds && { id: employeeIds }),
                ...(divisionId && { division: divisionId }),
                ...(searchToken && { search: searchToken })
            }
        });

        return processRequestResult(EmployeeExtendedInfoDto, safeResult);
    }

    /**
     *
     * @param {number} employeeId
     * @return {Promise<SafeResult<EmployeeConditionInfoDto, Error>>}
     */
    async getEmployeeConditionById(employeeId) {
        const safeResult = await this.request({
            url: Paths.EMPLOYEE_CONDITION,
            params: {
                id: employeeId
            }
        });

        return processRequestResult(EmployeeConditionInfoDto, safeResult);
    }

    /**
     *
     * @param {?number} employeeId
     * @param {?number} divisionTeamId
     *
     * @return {Promise<SafeResult<DivisionTeamAssignmentDto[], Error>>}
     */
    async getEmployeeDivisionTeamAssignments({ employeeId, divisionTeamId } = {}) {
        const safeResult = await this.request({
            url: Paths.EMPLOYEE_TEAM_DIVISION_ASSIGNMENTS,
            params: {
                ...(employeeId && { employee: employeeId }),
                ...(divisionTeamId && { team: divisionTeamId })
            }
        });

        return processRequestResult(DivisionTeamAssignmentDto, safeResult);
    }

    /**
     * @param {?number} ids
     * @return {Promise<SafeResult<DivisionTeamAssignmentDto[], Error>>}
     */
    async getDivisionTeamAssignmentsByIds(ids) {
        const safeResult = await this.request({
            url: Paths.EMPLOYEE_TEAM_DIVISION_ASSIGNMENTS,
            params: {
                id: ids
            }
        });

        return processRequestResult(DivisionTeamAssignmentDto, safeResult);
    }

    /**
     *
     * @param {number} employeeId
     * @param {number} divisionTeamId
     * @return {Promise<SafeResult<DivisionTeamAssignmentDto[], Error>>}
     */
    async getSubordinatesDivisionsTeamAssignments({ employeeId, divisionTeamId }) {
        const safeResult = await this.request({
            url: Paths.EMPLOYEE_TEAM_DIVISION_SUBORDINATES,
            params: {
                id: employeeId,
                team: divisionTeamId
            }
        });

        return processRequestResult(DivisionTeamAssignmentDto, safeResult);
    }

    /**
     *
     * @param {number} employeeId
     * @param {number} divisionTeamId
     * @return {Promise<SafeResult<DivisionTeamAssignmentDto, Error>>}
     */
    async getTeamHeadDivisionsTeamAssignment({ employeeId, divisionTeamId }) {
        const safeResult = await this.request({
            url: Paths.EMPLOYEE_TEAM_DIVISION_HEAD,
            params: {
                id: employeeId,
                team: divisionTeamId
            }
        });

        return processRequestResult(DivisionTeamAssignmentDto, safeResult);
    }

    /**
     *
     * @param {number} divisionTeamId
     * @return {Promise<SafeResult<DivisionTeamRoleContainerDto[], Error>>}
     */
    async getDivisionTeamRoleInfosByDivisionTeamId(divisionTeamId) {
        const safeResult = await this.request({
            url: Paths.EMPLOYEE_TEAM_DIVISION_ROLES_TEAM,
            params: {
                team: divisionTeamId
            }
        });

        return processRequestResult(DivisionTeamRoleContainerDto, safeResult);
    }

    /**
     * @param {number} id
     * @return {Promise<SafeResult<boolean, Error>>}
     */
    async deleteDivisionTeamSuccessorById(id) {
        const safeResult = await this.request({
            url: Paths.EMPLOYEE_DELETE_TEAM_DIVISION_SUCCESSOR,
            options: {
                method: ApiClientMethod.POST,
                params: {
                    division_team_successor_id: id
                }
            }
        });

        const { isError } = safeResult;
        if (isError) {
            return safeResult;
        }

        return success(true);
    }

    /**
     *
     * @param {number} divisionTeamId
     * @return {Promise<SafeResult<DivisionTeamAssignmentDto[], Error>>}
     */
    async getTeamDivisionTeamAssignmentsByTeamId(divisionTeamId) {
        const safeResult = await this.request({
            url: Paths.EMPLOYEE_TEAM_DIVISION_ASSIGNMENTS_TEAM,
            params: {
                team: divisionTeamId
            }
        });

        return processRequestResult(DivisionTeamAssignmentDto, safeResult);
    }

    /**
     *
     * @param {number} employeeId
     * @param {number} divisionTeamId
     * @return {Promise<SafeResult<DivisionTeamAssignmentDto, Error>>}
     */
    async getHeadOfTeamHeadDivisionTeamAssignment({ employeeId, divisionTeamId }) {
        const safeResult = await this.request({
            url: Paths.EMPLOYEE_TEAM_DIVISION_HEAD_HEAD,
            params: {
                employee: employeeId,
                team: divisionTeamId
            }
        });

        return processRequestResult(DivisionTeamAssignmentDto, safeResult);
    }

    /**
     * @link https://goodt-dev.goodt.me:8480/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/employee/getLegalEntityTeamAssignments
     *
     * @param {number} employeeId
     * @param {number} legalEntityTeamId
     * @return {Promise<SafeResult<LegalEntityTeamAssignmentDto[], Error>>}
     */
    async getEmployeesLegalEntityTeamAssignments({ employeeId, legalEntityTeamId }) {
        const safeResult = await this.request({
            url: Paths.EMPLOYEE_TEAM_LEGAL_ENTITY_ASSIGNMENTS,
            params: {
                ...(employeeId && { employee: employeeId }),
                ...(legalEntityTeamId && { team: legalEntityTeamId })
            }
        });

        return processRequestResult(LegalEntityTeamAssignmentDto, safeResult);
    }

    /**
     * @link https://goodt-dev.goodt.me:8480/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/employee/getLegalEntityTeamAssignments
     *
     * @param {number} assignmentId
     * @return {Promise<SafeResult<LegalEntityTeamAssignmentDto[], Error>>}
     */
    async getLegalEntityTeamAssignmentsById(assignmentId) {
        const safeResult = await this.request({
            url: Paths.EMPLOYEE_TEAM_LEGAL_ENTITY_ASSIGNMENTS,
            params: {
                id: assignmentId
            }
        });

        return processRequestResult(LegalEntityTeamAssignmentDto, safeResult);
    }

    /**
     * @link https://goodt-dev.goodt.me:8480/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/employee/getTeamDivisionAssignmentsByLegalEntity
     * @todo check if return type is array or single value
     * @param {number} legalEntityId
     * @return {Promise<SafeResult<DivisionTeamAssignmentDto[], Error>>}
     */
    async getDivisionTeamAssignmentsByLegalEntityId(legalEntityId) {
        const safeResult = await this.request({
            url: Paths.EMPLOYEE_TEAM_DIVISION_LEGAL_ENTITY_ASSIGNMENTS,
            params: {
                legal_entity: legalEntityId
            }
        });

        return processRequestResult(DivisionTeamAssignmentDto, safeResult);
    }

    /**
     * @link https://goodt-dev.goodt.me:8480/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/division/getPath
     * @param {number} divisionId
     * @return {Promise<SafeResult<DivisionShortInfoDto[], Error>>}
     */
    async getDivisionPathById(divisionId) {
        const safeResult = await this.request({
            url: Paths.DIVISION_PATH,
            params: {
                id: divisionId
            }
        });

        return processRequestResult(DivisionShortInfoDto, safeResult);
    }

    /**
     * @link https://goodt-dev.goodt.me:8480/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/division/getInfo_1
     * @param {number} divisionId
     * @return {Promise<SafeResult<DivisionInfoDto, Error>>}
     */
    async getDivisionInfoById(divisionId) {
        const safeResult = await this.request({
            url: Paths.DIVISION_INFO,
            params: {
                id: divisionId
            }
        });

        return processRequestResult(DivisionInfoDto, safeResult);
    }

    /**
     * @link https://goodt-dev.goodt.me:8480/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/division/listInfo
     * @param {number} divisionId?
     * @param {number} legalEntityId?
     * @return {Promise<SafeResult<DivisionInfoDto[], Error>>}
     */
    async getDivisionInfosByParent({ divisionId, legalEntityId }) {
        const safeResult = await this.request({
            url: Paths.DIVISION_LIST,
            params: {
                ...(divisionId && { parent: divisionId }),
                ...(legalEntityId && { legalentity: legalEntityId })
            }
        });

        return processRequestResult(DivisionInfoDto, safeResult);
    }

    /**
     * @link https://goodt-dev.goodt.me:8480/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/division/GetDivisionPositions
     * @param {number} divisionId
     * @return {Promise<SafeResult<DivisionPositionDto[], Error>>}
     */
    async getDivisionPositionsByDivisionId(divisionId) {
        const safeResult = await this.request({
            url: Paths.DIVISION_POSITION,
            params: {
                division: divisionId
            }
        });

        return processRequestResult(DivisionPositionDto, safeResult);
    }

    /**
     * @return {Promise<SafeResult<RoleInfoDto[], Error>>}
     */
    async getRolesAll() {
        const safeResult = await this.request({
            url: Paths.ROLE_LIST
        });

        return processRequestResult(RoleInfoDto, safeResult);
    }

    /**
     * @param {number} roleId
     * @param {number} legalEntityId
     * @return {Promise<SafeResult<LegalEntityTeamAssignmentDto[], Error>>}
     */
    async getRoleLegalEntityTeamAssignments({ roleId, legalEntityId }) {
        const safeResult = await this.request({
            url: Paths.ROLE_ASSIGNMENTS_LIST,
            params: {
                role_id: roleId,
                legal_entity_id: legalEntityId
            }
        });

        return processRequestResult(LegalEntityTeamAssignmentDto, safeResult);
    }

    /**
     *
     * @param {number} employeeId
     * @param {number} roleId
     * @param {number} legalEntityId
     * @return {Promise<SafeResult<Boolean, Error>>}
     */
    async createOrUpdateEmployeeRole({ employeeId, roleId, legalEntityId }) {
        const safeResult = await this.request({
            url: Paths.ROLE_SET_EMPLOYEE,
            params: {
                employee_id: employeeId,
                ...(roleId && { role_id: roleId }),
                ...(legalEntityId && { legal_entity_id: legalEntityId })
            },
            options: {
                method: ApiClientMethod.POST
            }
        });

        const { isSuccess } = safeResult;
        if (isSuccess) {
            return success(true);
        }

        return safeResult;
    }

    /**
     * @return {Promise<SafeResult<Boolean, Error>>}
     */
    async deleteEmployeeRole({ employeeId, roleId, legalEntityId }) {
        const safeResult = await this.request({
            url: Paths.ROLE_LIST,
            params: {
                employee_id: employeeId,
                role_id: roleId,
                legal_entity_id: legalEntityId
            },
            options: {
                method: ApiClientMethod.POST
            }
        });

        const { isSuccess } = safeResult;
        if (isSuccess) {
            return success(true);
        }

        return safeResult;
    }

    /**
     * @link https://goodt-dev.goodt.me:8480/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/division_team_role
     * @return {Promise<SafeResult<DivisionTeamRoleRawDto[], Error | null>>}
     */
    async getDivisionTeamRoles() {
        const safeResult = await this.request({
            url: Paths.DIVISION_TEAM_ROLE
        });

        return processRequestResult(DivisionTeamRoleRawDto, safeResult);
    }

    /**
     * @link https://goodt-dev.goodt.me:8480/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/division_team_role
     * @return {Promise<SafeResult<DivisionTeamRoleRawDto, Error>>}
     */
    async getDivisionTeamRoleById(id) {
        if (id == null) {
            throw new ApiServiceError(`'OrgStructureApiService.getDivisionTeamRoleById' method invalid arguments`, {
                code: ApiServiceError.Code.INTERNAL
            });
        }
        const safeResult = await this.request({
            url: Paths.GET_DIVISION_TEAM_ROLE_BY_ID.replace(':id', id)
        });

        return processRequestResult(DivisionTeamRoleRawDto, safeResult);
    }

    /**
     * @link https://goodt-dev.goodt.me:8480/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/division_team_role/update
     * @return {Promise<SafeResult<DivisionTeamRoleRawDto, Error>>}
     */
    async updateDivisionTeamRoleById(id, divisionTeamRoleDto) {
        if (id == null || divisionTeamRoleDto == null) {
            throw new ApiServiceError(`'OrgStructureApiService.updateDivisionTeamRoleById' method invalid arguments`, {
                code: ApiServiceError.Code.INTERNAL,
                reason: { id, divisionTeamRoleDto }
            });
        }

        const safeResult = await this.request({
            url: Paths.SET_DIVISION_TEAM_ROLE_BY_ID.replace(':id', id),
            params: divisionTeamRoleDto,
            options: {
                method: ApiClientMethod.PUT
            }
        });

        return processRequestResult(DivisionTeamRoleRawDto, safeResult);
    }

    /**
     * @param {Record<string, number|string|undefined>} divisionTeamRoleDto
     * @link https://goodt-dev.goodt.me:8480/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/division_team_role/create
     * @return {Promise<SafeResult<DivisionTeamRoleDto, Error>>}
     */
    async createDivisionTeamRole(divisionTeamRoleDto) {
        const safeResult = await this.request({
            url: Paths.DIVISION_TEAM_ROLE,
            params: divisionTeamRoleDto,
            options: {
                method: ApiClientMethod.POST
            }
        });

        return processRequestResult(DivisionTeamRoleDto, safeResult);
    }

    /**
     * Employee context
     */
    get employee() {
        const employeeContext = withEmployeeContext(this);
        return {
            /**
             * @param {number|number[]} id
             */
            withId: withEmployeeIdContext(employeeContext),
            ...employeeContext
        };
    }

    /**
     * Division context
     */
    get division() {
        const divisionContext = withDivisionContext(this);
        return {
            withId: withDivisionIdContext(divisionContext),
            ...divisionContext
        };
    }

    /**
     * Team context
     */
    get divisionTeam() {
        const teamContext = withTeamContext(this);
        return {
            withId: withTeamIdContext(teamContext),
            ...teamContext
        };
    }
}

/**
 *
 */
export { OrgStructureApiService };

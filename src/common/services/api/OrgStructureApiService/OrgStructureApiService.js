import { success } from '@goodt-common/utils';
import { applyConstructorOrFactory, BaseDto, buildDtoSafeResult } from '@goodt-common/infra';

import { BaseApiService, ApiClientMethod, ApiServiceError, buildRequest } from '@goodt-common/api';

import { ApiEndpointPaths as Paths, ServiceAction } from './config';
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
    DivisionTeamRoleDto,
    DivisionTeamAssignmentRotationDto,
    DivisionTeamSuccessorDto,
    AssignmentReadinessDto,
    DivisionTeamSuccessorReadinessDto
} from './dto';

import { withEmployeeContext, withEmployeeIdContext } from './EmployeeContext';
import { withDivisionContext, withDivisionIdContext } from './DivisionContext';
import { withTeamContext, withTeamIdContext } from './TeamContext';

/**
 * @typeof {import('@goodt-common/infra/BaseDto').BaseDto} BaseDto
 */
/**
 *
 * @param {function(...args?: any[]): any} [DtoConstructorOrFactory=BaseDto]
 * @param {SafeResult} safeResult
 * @return {SafeResult<BaseDto|BaseDto[]|any, Error>}
 */
const processRequestResult = (safeResult, DtoConstructorOrFactory = BaseDto) => {
    const { isError, result: dtoJsonResult } = safeResult;

    if (isError) {
        return safeResult;
    }
    if (BaseDto.isPrototypeOf(DtoConstructorOrFactory)) {
        return buildDtoSafeResult(DtoConstructorOrFactory, dtoJsonResult);
    }
    if (typeof DtoConstructorOrFactory !== 'function') {
        return success(dtoJsonResult);
    }
    return success(applyConstructorOrFactory(DtoConstructorOrFactory, dtoJsonResult));
};

/**
 *
 */
class OrgStructureApiService extends BaseApiService {
    /**
     *
     * @param {import('@goodt-common/api').IApiServiceRequest | import('@goodt-common/api').IApiServiceRequestOptions} apiServiceRequest
     * @param {function(...args?: any[]): any} [DtoConstructor=BaseDto]
     * @return {SafeResult<BaseDto|BaseDto[]|any, Error>}
     */
    async request(apiServiceRequest, DtoConstructor) {
        if ('action' in apiServiceRequest) {
            apiServiceRequest = buildRequest(apiServiceRequest);
        }
        return processRequestResult(await super.request(apiServiceRequest), DtoConstructor);
    }

    /**
     *
     * @param {?number} [employeeId]
     * @return {Promise<SafeResult<EmployeeExtendedInfoDto, Error>>}
     */
    async getEmployeeById(employeeId) {
        // prettier-ignore
        return this.request({
            url: Paths.EMPLOYEE_INFO,
            params: {
                id: employeeId
            }
        }, EmployeeExtendedInfoDto);
    }

    /**
     *
     * @param {number[]} employeeIds
     * @return {Promise<SafeResult<EmployeeExtendedInfoDto[], Error>>}
     */
    async getEmployeesByIds(employeeIds) {
        return this.request(
            {
                url: Paths.EMPLOYEE_LIST,
                params: {
                    employees: employeeIds
                }
            },
            EmployeeExtendedInfoDto
        );
    }

    /**
     *
     * @param {number[]} [employeeIds]
     * @param {number} [divisionId]
     * @param {string} [searchToken]
     * @return {Promise<SafeResult<EmployeeExtendedInfoDto[], Error>>}
     */
    async getEmployeesByFilter({ employeeIds, divisionId, searchToken } = {}) {
        // prettier-ignore
        return this.request({
            url: Paths.EMPLOYEE_FIND,
            params: {
                ...(employeeIds && { id: employeeIds }),
                ...(divisionId && { division: divisionId }),
                ...(searchToken && { search: searchToken })
            }
        }, EmployeeExtendedInfoDto);
    }

    /**
     *
     * @param {number} employeeId
     * @return {Promise<SafeResult<EmployeeConditionInfoDto, Error>>}
     */
    async getEmployeeConditionById(employeeId) {
        // prettier-ignore
        return this.request({
            url: Paths.EMPLOYEE_CONDITION,
            params: {
                id: employeeId
            }
        }, EmployeeConditionInfoDto);
    }

    /**
     *
     * @param {?number} employeeId
     * @param {?number} divisionTeamId
     *
     * @return {Promise<SafeResult<DivisionTeamAssignmentDto[], Error>>}
     */
    async getEmployeeDivisionTeamAssignments({ employeeId, divisionTeamId } = {}) {
        // prettier-ignore
        return this.request({
            url: Paths.EMPLOYEE_TEAM_DIVISION_ASSIGNMENTS,
            params: {
                ...(employeeId && { employee: employeeId }),
                ...(divisionTeamId && { team: divisionTeamId })
            }
        }, DivisionTeamAssignmentDto);
    }

    /**
     * @param {?number} ids
     * @return {Promise<SafeResult<DivisionTeamAssignmentDto[], Error>>}
     */
    async getDivisionTeamAssignmentsByIds(ids) {
        // prettier-ignore
        return this.request({
            url: Paths.EMPLOYEE_TEAM_DIVISION_ASSIGNMENTS,
            params: {
                id: ids
            }
        }, DivisionTeamAssignmentDto);
    }

    /**
     *
     * @param {number} employeeId
     * @param {number} divisionTeamId
     * @return {Promise<SafeResult<DivisionTeamAssignmentDto[], Error>>}
     */
    async getSubordinatesDivisionsTeamAssignments({ employeeId, divisionTeamId }) {
        // prettier-ignore
        return this.request({
            url: Paths.EMPLOYEE_TEAM_DIVISION_SUBORDINATES,
            params: {
                id: employeeId,
                team: divisionTeamId
            }
        }, DivisionTeamAssignmentDto);
    }

    /**
     *
     * @param {number} employeeId
     * @param {number} divisionTeamId
     * @return {Promise<SafeResult<DivisionTeamAssignmentDto, Error>>}
     */
    async getTeamHeadDivisionsTeamAssignment({ employeeId, divisionTeamId }) {
        // prettier-ignore
        return this.request({
            url: Paths.EMPLOYEE_TEAM_DIVISION_HEAD,
            params: {
                id: employeeId,
                team: divisionTeamId
            }
        }, DivisionTeamAssignmentDto);
    }

    /**
     *
     * @param {number} divisionTeamId
     * @return {Promise<SafeResult<DivisionTeamRoleContainerDto[], Error>>}
     */
    async getDivisionTeamRoleInfosByDivisionTeamId(divisionTeamId) {
        // prettier-ignore
        return this.request({
            url: Paths.EMPLOYEE_TEAM_DIVISION_ROLES_TEAM,
            params: {
                team: divisionTeamId
            }
        }, DivisionTeamRoleContainerDto);
    }

    /**
     * @param {number} id
     * @return {Promise<SafeResult<boolean, Error>>}
     */
    async deleteDivisionTeamSuccessorById(id) {
        // prettier-ignore
        return this.request({
            url: Paths.EMPLOYEE_DELETE_TEAM_DIVISION_SUCCESSOR,
            options: {
                method: ApiClientMethod.POST,
                params: {
                    division_team_successor_id: id
                }
            }
        }, Boolean);
    }

    /**
     * Добавление преемника
     *
     * @link https://goodt-dev.goodt.me:8480/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/employee/createDivisionTeamSuccessorEntity
     * @param {number} employeeId
     * @param {number} divisionTeamRoleId
     * @return {Promise<SafeResult<DivisionTeamSuccessorDto, Error>>}
     */
    createDivisionTeamSuccessor(employeeId, divisionTeamRoleId) {
        // prettier-ignore
        return this.request({
            action: ServiceAction.EMPLOYEE_DIVISION_TEAM_SUCCESSOR_ADD,
            queryParams: { employee_id: employeeId, division_team_role_id: divisionTeamRoleId }
        }, DivisionTeamSuccessorDto);
    }

    /**
     * Добавление готовности заданного преемника к заданной ротации
     *
     * @link https://goodt-dev.goodt.me:8480/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/employee/createDivisionTeamSuccessorReadinessEntity
     * @param {number} divisionTeamSuccessorId
     * @param {number} assignmentReadinessId
     * @return {Promise<SafeResult<DivisionTeamSuccessorReadinessDto, Error>>}
     */
    createDivisionTeamSuccessorReadiness(divisionTeamSuccessorId, assignmentReadinessId) {
        // prettier-ignore
        return this.request({
            action: ServiceAction.EMPLOYEE_DIVISION_TEAM_SUCCESSOR_READINESS_SET,
            queryParams: {
                division_team_successor_id: divisionTeamSuccessorId,
                assignment_readiness_id: assignmentReadinessId
            }
        }, DivisionTeamSuccessorReadinessDto);
    }

    /**
     * Добавление или обнуление записи подтверждения преемника hr-ом
     *
     * @link https://goodt-dev.goodt.me:8480/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/employee/divisionTeamSuccessorUpdateHr
     * @param {number} divisionTeamSuccessorId
     * @param {string} dateCommitHr
     * @return {Promise<SafeResult<boolean, Error>>}
     */
    updateDivisionTeamSuccessorDateHr(divisionTeamSuccessorId, dateCommitHr) {
        // prettier-ignore
        return this.request({
            action: ServiceAction.EMPLOYEE_DIVISION_TEAM_SUCCESSOR_DATE_HR_UPDATE,
            queryParams: {
                division_team_successor_id: divisionTeamSuccessorId,
                date_commit_hr: dateCommitHr
            }
        }, Boolean);
    }

    /**
     * Получение всех готовностей к назначениям
     *
     * @link https://goodt-dev.goodt.me:8480/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/library/getAllAssignmentReadiness
     * @return {Promise<SafeResult<AssignmentReadinessDto[], Error>>}
     */
    getAssignmentReadinesses() {
        // prettier-ignore
        return this.request({
            action: ServiceAction.ASSIGNMENT_READINESS_GET
        }, AssignmentReadinessDto);
    }

    /**
     * @link https://goodt-dev.goodt.me:8480/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/division_team_role/update
     * @param {number} divisionTeamRoleId
     * @param {number} divisionTeamId
     * @param {number} importanceId
     * @return {Promise<SafeResult<DivisionTeamRoleRawDto, Error>>}
     */
    updateDivisionTeamRoleById(divisionTeamRoleId, { divisionTeamId, importanceId }) {
        // prettier-ignore
        return this.request({
             action: ServiceAction.DIVISION_TEAM_ROLE_SET_BY_ID,
             pathParams: { id: divisionTeamRoleId },
             params: {
                 division_team_id: divisionTeamId,
                 importance: importanceId
             }
         }, DivisionTeamRoleRawDto);
    }

    /**
     * @link https://goodt-dev.goodt.me:8480/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/division_team_role/findPost
     * Получение информации о ролях, соответствующих заданным фильтрам.
     *
     * @param {number[]} divisionTeamIds
     * @return {Promise<SafeResult<DivisionTeamRoleContainerDto[], Error>>}
     */
    getDivisionTeamRolesByFilter({ divisionTeamIds }) {
        // prettier-ignore
        return this.request({
            action: ServiceAction.DIVISION_TEAM_ROLE_FIND,
            queryParams: {
                division_team_id: divisionTeamIds
            }
        }, DivisionTeamRoleContainerDto);
    }

    /**
     * @link https://goodt-dev.goodt.me:8480/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/division_team_role/findPost     * @param {number} divisionTeamId
     * @return {Promise<SafeResult<DivisionTeamAssignmentDto[], Error>>}
     */
    async getTeamDivisionTeamAssignmentsByTeamId(divisionTeamId) {
        // prettier-ignore
        return this.request({
            url: Paths.EMPLOYEE_TEAM_DIVISION_ASSIGNMENTS_TEAM,
            params: {
                team: divisionTeamId
            }
        }, DivisionTeamAssignmentDto);
    }

    /**
     *
     * @param {number} employeeId
     * @param {number} divisionTeamId
     * @return {Promise<SafeResult<DivisionTeamAssignmentDto, Error>>}
     */
    async getHeadOfTeamHeadDivisionTeamAssignment({ employeeId, divisionTeamId }) {
        // prettier-ignore
        return this.request({
            url: Paths.EMPLOYEE_TEAM_DIVISION_HEAD_HEAD,
            params: {
                employee: employeeId,
                team: divisionTeamId
            }
        }, DivisionTeamAssignmentDto);
    }

    /**
     * @link https://goodt-dev.goodt.me:8480/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/employee/getLegalEntityTeamAssignments
     *
     * @param {number} employeeId
     * @param {number} legalEntityTeamId
     * @return {Promise<SafeResult<LegalEntityTeamAssignmentDto[], Error>>}
     */
    async getEmployeesLegalEntityTeamAssignments({ employeeId, legalEntityTeamId }) {
        // prettier-ignore
        return this.request({
            url: Paths.EMPLOYEE_TEAM_LEGAL_ENTITY_ASSIGNMENTS,
            params: {
                ...(employeeId && { employee: employeeId }),
                ...(legalEntityTeamId && { team: legalEntityTeamId })
            }
        }, LegalEntityTeamAssignmentDto);
    }

    /**
     * @link https://goodt-dev.goodt.me:8480/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/employee/getLegalEntityTeamAssignments
     *
     * @param {number} assignmentId
     * @return {Promise<SafeResult<LegalEntityTeamAssignmentDto[], Error>>}
     */
    async getLegalEntityTeamAssignmentsById(assignmentId) {
        // prettier-ignore
        return this.request({
            url: Paths.EMPLOYEE_TEAM_LEGAL_ENTITY_ASSIGNMENTS,
            params: {
                id: assignmentId
            }
        }, LegalEntityTeamAssignmentDto);
    }

    /**
     * @link https://goodt-dev.goodt.me:8480/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/employee/getTeamDivisionAssignmentsByLegalEntity
     * @todo check if return type is array or single value
     * @param {number} legalEntityId
     * @return {Promise<SafeResult<DivisionTeamAssignmentDto[], Error>>}
     */
    async getDivisionTeamAssignmentsByLegalEntityId(legalEntityId) {
        // prettier-ignore
        return this.request({
            url: Paths.EMPLOYEE_TEAM_DIVISION_LEGAL_ENTITY_ASSIGNMENTS,
            params: {
                legal_entity: legalEntityId
            }
        }, DivisionTeamAssignmentDto);
    }

    /**
     * @link https://goodt-dev.goodt.me:8480/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/division/getPath
     * @param {number} divisionId
     * @return {Promise<SafeResult<DivisionShortInfoDto[], Error>>}
     */
    async getDivisionPathById(divisionId) {
        // prettier-ignore
        return this.request({
            url: Paths.DIVISION_PATH,
            params: {
                id: divisionId
            }
        }, DivisionShortInfoDto);
    }

    /**
     * @link https://goodt-dev.goodt.me:8480/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/division/getInfo_1
     * @param {number} divisionId
     * @return {Promise<SafeResult<DivisionInfoDto, Error>>}
     */
    async getDivisionInfoById(divisionId) {
        // prettier-ignore
        return this.request({
            url: Paths.DIVISION_INFO,
            params: {
                id: divisionId
            }
        }, DivisionInfoDto);
    }

    /**
     * @link https://goodt-dev.goodt.me:8480/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/division/listInfo
     * @param {number} divisionId?
     * @param {number} legalEntityId?
     * @return {Promise<SafeResult<DivisionInfoDto[], Error>>}
     */
    async getDivisionInfosByParent({ divisionId, legalEntityId }) {
        // prettier-ignore
        return this.request({
            url: Paths.DIVISION_LIST,
            params: {
                ...(divisionId && { parent: divisionId }),
                ...(legalEntityId && { legalentity: legalEntityId })
            }
        }, DivisionInfoDto);
    }

    /**
     * @link https://goodt-dev.goodt.me:8480/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/division/GetDivisionPositions
     * @param {number} divisionId
     * @return {Promise<SafeResult<DivisionPositionDto[], Error>>}
     */
    async getDivisionPositionsByDivisionId(divisionId) {
        // prettier-ignore
        return this.request({
            url: Paths.DIVISION_POSITION,
            params: {
                division: divisionId
            }
        }, DivisionPositionDto);
    }

    /**
     * @return {Promise<SafeResult<RoleInfoDto[], Error>>}
     */
    async getRolesAll() {
        // prettier-ignore
        return this.request({
            url: Paths.ROLE_LIST
        }, RoleInfoDto);
    }

    /**
     * @param {number} roleId
     * @param {number} legalEntityId
     * @return {Promise<SafeResult<LegalEntityTeamAssignmentDto[], Error>>}
     */
    async getRoleLegalEntityTeamAssignments({ roleId, legalEntityId }) {
        // prettier-ignore
        return this.request({
            url: Paths.ROLE_ASSIGNMENTS_LIST,
            params: {
                role_id: roleId,
                legal_entity_id: legalEntityId
            }
        }, LegalEntityTeamAssignmentDto);
    }

    /**
     *
     * @param {number} employeeId
     * @param {number} roleId
     * @param {number} legalEntityId
     * @return {Promise<SafeResult<Boolean, Error>>}
     */
    async createOrUpdateEmployeeRole({ employeeId, roleId, legalEntityId }) {
        // prettier-ignore
        return this.request({
            url: Paths.ROLE_SET_EMPLOYEE,
            params: {
                employee_id: employeeId,
                ...(roleId && { role_id: roleId }),
                ...(legalEntityId && { legal_entity_id: legalEntityId })
            },
            options: {
                method: ApiClientMethod.POST
            }
        }, Boolean);
    }

    /**
     * @return {Promise<SafeResult<Boolean, Error>>}
     */
    async deleteEmployeeRole({ employeeId, roleId, legalEntityId }) {
        // prettier-ignore
        return this.request({
            url: Paths.ROLE_LIST,
            params: {
                employee_id: employeeId,
                role_id: roleId,
                legal_entity_id: legalEntityId
            },
            options: {
                method: ApiClientMethod.POST
            }
        }, Boolean);
    }

    /**
     * @link https://goodt-dev.goodt.me:8480/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/division_team_role
     * @return {Promise<SafeResult<DivisionTeamRoleRawDto[], Error | null>>}
     */
    async getDivisionTeamRoles() {
        // prettier-ignore
        return this.request({
            url: Paths.DIVISION_TEAM_ROLE
        }, DivisionTeamRoleRawDto);
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
        // prettier-ignore
        return this.request({
            url: Paths.DIVISION_TEAM_ROLE_GET_BY_ID.replace(':id', id)
        }, DivisionTeamRoleRawDto);
    }

    /**
     * @param {Record<string, number|string|undefined>} divisionTeamRoleDto
     * @link https://goodt-dev.goodt.me:8480/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/division_team_role/create
     * @return {Promise<SafeResult<DivisionTeamRoleDto, Error>>}
     */
    async createDivisionTeamRole(divisionTeamRoleDto) {
        // prettier-ignore
        return this.request({
            url: Paths.DIVISION_TEAM_ROLE,
            params: divisionTeamRoleDto,
            options: {
                method: ApiClientMethod.POST
            }
        }, DivisionTeamRoleDto);
    }

    /**
     * employee/teamdivisionassignmentrotationcommit
     * @param {number|string} id DivisionTeamAssignmentRotation id
     * @link https://goodt-dev.goodt.me:8480/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/division_team_role/create
     * @return {Promise<SafeResult<true, Error>>}
     */
    async commitDivisionTeamAssignmentRotation(id) {
        // prettier-ignore
        return this.request({
            url: Paths.DIVISION_TEAM_ASSIGNMENT_ROTATION_COMMIT,
            options: {
                method: ApiClientMethod.POST,
                params: { id }
            }
        }, Boolean);
    }

    /**
     * employee//teamdivisionassignmentrotationwithdraw
     * @param {number|string} id DivisionTeamAssignmentRotation id
     * @link https://goodt-dev.goodt.me:8480/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/division_team_role/create
     * @return {Promise<SafeResult<true, Error>>}
     */
    async withdrawDivisionTeamAssignmentRotation(id) {
        // prettier-ignore
        return this.request({
            url: Paths.DIVISION_TEAM_ASSIGNMENT_ROTATION_WITHDRAW,
            options: {
                method: ApiClientMethod.POST,
                params: { id }
            }
        }, Boolean);
    }

    /**
     * employee/teamdivisionassignmentrotationcomment
     * @param {number|string} divisionTeamAssignmentId DivisionTeamAssignment id
     * @param {number|string} assignmentRotationId AssignmentRotation id
     * @return {Promise<SafeResult<DivisionTeamAssignmentRotationDto[], Error>>}
     */
    async createDivisionTeamAssignmentRotation(divisionTeamAssignmentId, assignmentRotationId) {
        // prettier-ignore
        return this.request({
            url: Paths.DIVISION_TEAM_ASSIGNMENT_ROTATION_CREATE,
            options: {
                method: ApiClientMethod.POST,
                params: {
                    division_team_assignment_id: divisionTeamAssignmentId,
                    assignment_rotation_id: assignmentRotationId
                }
            }
        }, DivisionTeamAssignmentRotationDto);
    }

    /**
     * employee/teamdivisionassignmentrotationcomment
     * @param {number|string} divisionTeamAssignmentRotationId DivisionTeamAssignmentRotation id
     * @param {string} employeeComment
     * @param {string} hrComment
     * @return {Promise<SafeResult<true, Error>>}
     */
    async updateDivisionTeamAssignmentRotationComment(
        divisionTeamAssignmentRotationId,
        { hrComment, employeeComment }
    ) {
        return this.request(
            {
                url: Paths.DIVISION_TEAM_ASSIGNMENT_ROTATION_UPDATE_COMMENT,
                options: {
                    method: ApiClientMethod.PUT,
                    params: {
                        id: divisionTeamAssignmentRotationId,
                        ...(hrComment && { comment_hr: hrComment }),
                        ...(employeeComment && { comment_employee: employeeComment })
                    }
                }
            },
            Boolean
        );
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

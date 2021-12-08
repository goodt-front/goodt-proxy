import { BaseApiService, ApiServiceError } from '@goodt-common/services/api';

import { IApiServiceMixinInstance, IApiServiceMixinOptions } from '@goodt-common/mixins';
import { SafeResult } from '@goodt-common/utils';

import {
    DivisionTeamAssignmentDto,
    DivisionPositionDto,
    LegalEntityTeamAssignmentDto,
    LegalEntityAssignmentInfoDto,
    RoleInfoDto,
    EmployeeExtendedInfoDto,
    EmployeeConditionInfoDto,
    DivisionInfoDto,
    DivisionShortInfoDto,
    DivisionTeamRoleContainerDto,
    DivisionTeamRoleRawDto,
    DivisionTeamRoleDto
} from './dto';
import { IEmployeeContext } from './EmployeeContext';
import { IDivisionContext } from './DivisionContext';
import { ITeamContext } from './TeamContext';
import { ApiClientMethod } from 'goodt-wcore/src/common/services/api';

export interface IOrgStructureApiServiceMixinOptions extends IApiServiceMixinOptions {}

export interface IOrgStructureApiServiceMixinInstance extends IApiServiceMixinInstance<TOrgStructureApiService> {}

/**
 *
 */
export class OrgStructureApiService extends BaseApiService {
    /**
     *
     * @param {?number} [employeeId]
     * @return {Promise<SafeResult<EmployeeExtendedInfoDto, Error>>}
     */
    getEmployeeById(employeeId?: number): Promise<SafeResult<EmployeeExtendedInfoDto, ApiServiceError>>;

    /**
     *
     * @param {number[]} employeeIds
     * @return {Promise<SafeResult<EmployeeExtendedInfoDto[], Error>>}
     */
    getEmployeesByIds(employeeIds: number[]): Promise<SafeResult<DivisionTeamAssignmentDto[], ApiServiceError>>;

    /**
     *
     * @param {number[]} [employeeIds]
     * @param {number} [divisionId]
     * @param {string} [searchToken]
     * @return {Promise<SafeResult<EmployeeExtendedInfoDto[], Error>>}
     */
    getEmployeesByFilter({
        employeeIds,
        divisionId,
        searchToken
    }: {
        employeeIds?: number[];
        divisionId?: number;
        searchToken?: string;
    }): Promise<SafeResult<EmployeeExtendedInfoDto[], ApiServiceError>>;

    /**
     *
     * @param {?number} ids
     * @param {?number} employeeId
     * @param {?number} divisionTeamId
     *
     * @return {Promise<SafeResult<DivisionTeamAssignmentDto[], Error>>}
     */
    getEmployeeDivisionTeamAssignments({
        employeeId,
        divisionTeamId
    }: {
        employeeId?: number;
        divisionTeamId?: number;
    }): Promise<SafeResult<DivisionTeamAssignmentDto[], ApiServiceError>>;

    /**
     *
     * @param {?number} assignmentIds
     *
     * @return {Promise<SafeResult<DivisionTeamAssignmentDto[], Error>>}
     */
    getDivisionTeamAssignmentsByIds(
        assignmentIds: number[]
    ): Promise<SafeResult<DivisionTeamAssignmentDto[], ApiServiceError>>;

    /**
     *
     * @param {number} [employeeId]
     * @param {number} [divisionTeamId]
     * @return {Promise<SafeResult<DivisionTeamAssignmentDto[], Error>>}
     */
    getSubordinatesDivisionsTeamAssignments({
        employeeId,
        divisionTeamId
    }: {
        employeeId?: number;
        divisionTeamId?: number;
    }): Promise<SafeResult<DivisionTeamAssignmentDto[], ApiServiceError>>;

    /**
     *
     * @param {number} employeeId
     * @param {number} divisionTeamId
     * @return {Promise<SafeResult<DivisionTeamAssignmentDto, Error>>}
     */
    getTeamHeadDivisionsTeamAssignment({
        employeeId,
        divisionTeamId
    }: {
        employeeId?: number;
        divisionTeamId?: number;
    }): Promise<SafeResult<DivisionTeamAssignmentDto, ApiServiceError>>;

    /**
     *
     * @param {number} divisionTeamId
     * @return {Promise<SafeResult<DivisionTeamAssignmentDto[], Error>>}
     */
    getTeamDivisionTeamAssignmentsByTeamId(
        divisionTeamId: number
    ): Promise<SafeResult<DivisionTeamAssignmentDto[], ApiServiceError>>;

    /**
     *
     * @param {number} employeeId
     * @return {Promise<SafeResult<EmployeeConditionInfoDto, Error>>}
     */
    getEmployeeConditionById(employeeId: number): Promise<SafeResult<EmployeeConditionInfoDto, ApiServiceError>>;

    /**
     *
     * @param {number} employeeId
     * @param {number} teamId
     * @return {Promise<SafeResult<DivisionTeamAssignmentDto, Error>>}
     */
    getHeadOfTeamHeadDivisionTeamAssignment({
        employeeId,
        divisionTeamId
    }: {
        employeeId?: number;
        divisionTeamId?: number;
    }): Promise<SafeResult<DivisionTeamAssignmentDto, ApiServiceError>>;

    /**
     * @link https://goodt-dev.goodt.me:8480/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/employee/getLegalEntityTeamAssignments
     *
     * @param {number} assignmentId
     * @param {number} employeeId
     * @param {number} legalEntityTeamId
     * @return {Promise<SafeResult<LegalEntityTeamAssignmentDto[], Error>>}
     */
    getEmployeesLegalEntityTeamAssignments({
        assignmentId,
        employeeId,
        legalEntityTeamId
    }: {
        assignmentId?: number;
        employeeId?: number;
        legalEntityTeamId?: number;
    }): Promise<SafeResult<LegalEntityTeamAssignmentDto[], ApiServiceError>>;

    /**
     * @link https://goodt-dev.goodt.me:8480/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/employee/getTeamDivisionAssignmentsByLegalEntity
     * @todo check if return type is array or single value
     * @param {number} legalEntityTeamAssignmentId
     * @return {Promise<SafeResult<LegalEntityTeamAssignmentDto[], Error>>}
     */
    getLegalEntityTeamAssignmentsById(
        legalEntityTeamAssignmentId: number
    ): Promise<SafeResult<LegalEntityTeamAssignmentDto[], ApiServiceError>>;

    /**
     * @link https://goodt-dev.goodt.me:8480/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/employee/getTeamDivisionAssignmentsByLegalEntity
     * @todo check if return type is array or single value
     * @param {number} legalEntityId
     * @return {Promise<SafeResult<DivisionTeamAssignmentDto[], Error>>}
     */
    getDivisionTeamAssignmentsByLegalEntityId(
        legalEntityId: number
    ): Promise<SafeResult<DivisionTeamAssignmentDto[], ApiServiceError>>;

    /**
     * @link https://goodt-dev.goodt.me:8480/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/division/getPath
     * @param {number} divisionId
     * @return {Promise<SafeResult<DivisionShortInfoDto[], Error>>}
     */
    getDivisionPathById(divisionId: number): Promise<SafeResult<DivisionShortInfoDto[], ApiServiceError>>;

    /**
     * @link https://goodt-dev.goodt.me:8480/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/division/getInfo_1
     * @param {number} divisionId
     * @return {Promise<SafeResult<DivisionInfoDto, Error>>}
     */
    getDivisionInfoById(divisionId: number): Promise<SafeResult<DivisionInfoDto, ApiServiceError>>;

    /**
     * @link https://goodt-dev.goodt.me:8480/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/division/listInfo
     * @param {number} divisionId?
     * @param {number} legalEntityId?
     * @return {Promise<SafeResult<DivisionInfoDto[], Error>>}
     */
    getDivisionInfosByParent({
        divisionId,
        legalEntityId
    }: {
        divisionId: number;
        legalEntityId: number;
    }): Promise<SafeResult<DivisionInfoDto[], ApiServiceError>>;

    /**
     * @link https://goodt-dev.goodt.me:8480/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/division/GetDivisionPositions
     * @param {number} divisionId
     * @return {Promise<SafeResult<DivisionPositionDto[], Error>>}
     */
    getDivisionPositionsByDivisionId(divisionId: number): Promise<SafeResult<DivisionPositionDto[], ApiServiceError>>;

    /**
     * @return {Promise<SafeResult<RoleInfoDto[], Error>>}
     */
    getRolesAll(): Promise<SafeResult<RoleInfoDto[], ApiServiceError>>;

    /**
     * @return {Promise<SafeResult<LegalEntityTeamAssignmentDto[], Error>>}
     */
    getRoleLegalEntityTeamAssignments({
        roleId,
        legalEntityId
    }: {
        roleId: number;
        legalEntityId: number;
    }): Promise<SafeResult<LegalEntityAssignmentInfoDto[], ApiServiceError>>;

    /**
     *
     * @param {number} id
     * @return {Promise<SafeResult<boolean, Error>>}
     */
    async deleteDivisionTeamSuccessorById(id: number): Promise<SafeResult<boolean, Error>>;

    /**
     *
     * @param {number} divisionTeamId
     * @return {Promise<SafeResult<DivisionTeamRoleContainerDto[], Error>>}
     */
    async getDivisionTeamRoleInfosByDivisionTeamId(
        divisionTeamId: number
    ): Promise<SafeResult<DivisionTeamRoleContainerDto[], Error>>;

    /**
     * @link https://goodt-dev.goodt.me:8480/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/division_team_role
     * @return {Promise<SafeResult<DivisionTeamRoleRawDto[], Error>>}
     */
    async getDivisionTeamRoles(): Promise<SafeResult<DivisionTeamRoleRawDto[], Error>>;

    /**
     * @link https://goodt-dev.goodt.me:8480/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/division_team_role
     * @return {Promise<SafeResult<DivisionTeamRoleRawDto, Error>>}
     */
    async getDivisionTeamRoleById(id: number): Promise<SafeResult<DivisionTeamRoleRawDto, Error>>;

    /**
     * @link https://goodt-dev.goodt.me:8480/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/division_team_role/update
     * @return {Promise<SafeResult<DivisionTeamRoleRawDto, Error>>}
     */
    async updateDivisionTeamRoleById(
        id: number,
        divisionTeamRoleDto: Record<string, number | string | undefined | null>
    ): Promise<SafeResult<DivisionTeamRoleRawDto, Error>>;

    /**
     * @param {Record<string, number|string|undefined>} divisionTeamRoleDto
     * @link https://goodt-dev.goodt.me:8480/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/division_team_role/create
     * @return {Promise<SafeResult<DivisionTeamRoleDto, Error>>}
     */
    async createDivisionTeamRole(
        divisionTeamRoleDto: Record<string, number | string | undefined | null>
    ): Promise<SafeResult<DivisionTeamRoleDto, Error>>;

    /**
     * @return {Promise<SafeResult<Boolean, Error>>}
     */
    createOrUpdateEmployeeRole({
        employeeId,
        roleId,
        legalEntityId
    }: {
        employeeId: string;
        roleId: string;
        legalEntityId: string;
    }): Promise<SafeResult<boolean, ApiServiceError>>;

    /**
     * @return {Promise<SafeResult<Boolean, Error>>}
     */
    deleteEmployeeRole({
        employeeId,
        roleId,
        legalEntityId
    }: {
        employeeId: string;
        roleId: string;
        legalEntityId: string;
    }): Promise<SafeResult<boolean, ApiServiceError>>;

    /**
     *
     */
    employee: IEmployeeContext;

    /**
     *
     */
    division: IDivisionContext;

    /**
     *
     */
    divisionTeam: ITeamContext;
}

import { OrgStructureApiService } from './OrgStructureApiService';

export interface IEmployeeContext {
    /**
     *
     */
    getById(
        ...args: Parameters<OrgStructureApiService['getEmployeeById']>
    ): ReturnType<OrgStructureApiService['getEmployeeById']>;
    /**
     *
     */
    getConditionById(
        ...args: Parameters<OrgStructureApiService['getEmployeeConditionById']>
    ): ReturnType<OrgStructureApiService['getEmployeeConditionById']>;
    /**
     *
     */
    getTeamAssignments(
        ...args: Parameters<OrgStructureApiService['getEmployeeAssignments']>
    ): ReturnType<OrgStructureApiService['getEmployeeAssignments']>;
    /**
     */
    getListByFilter(
        ...args: Parameters<OrgStructureApiService['getEmployeesByFilter']>
    ): ReturnType<OrgStructureApiService['getEmployeesByFilter']>;
    /**
     */
    getListByIds(
        ...args: Parameters<OrgStructureApiService['getEmployeesByIds']>
    ): ReturnType<OrgStructureApiService['getEmployeesByIds']>;
    /**
     *
     */
    createOrUpdateRole(
        ...args: Parameters<OrgStructureApiService['createOrUpdateEmployeeRole']>
    ): ReturnType<OrgStructureApiService['createOrUpdateEmployeeRole']>;
    /**
     */
    deleteRole(
        ...args: Parameters<OrgStructureApiService['deleteEmployeeRole']>
    ): ReturnType<OrgStructureApiService['deleteEmployeeRole']>;
    /**
     *
     */
    withId(id: number | number[]): IEmployeeIdContext;
}

export interface IEmployeeIdContext {
    /**
     */
    get(): ReturnType<IEmployeeContext['getById']>;
    /**
     *
     */
    getCondition(): ReturnType<IEmployeeContext['getConditionById']>;
    /**
     *
     */
    getList(): ReturnType<IEmployeeContext['getListByIds']>;
    /**
     *
     */
    getByFilter({
        divisionId,
        searchToken
    }: {
        divisionId: number;
        searchToken: number;
    }): ReturnType<IEmployeeContext['getListByFilter']>;
    /**
     */
    getTeamAssignmentsByTeamId(teamId: number): ReturnType<IEmployeeContext['getTeamAssignments']>;
    /**
     *
     */
    createOrUpdateRole(arg0: {
        roleId: number;
        legalEntityId: number;
    }): ReturnType<IEmployeeContext['createOrUpdateRole']>;
    /**
     *
     */
    deleteRole(arg0: {
        roleId: number;
        legalEntityId: number;
    }): ReturnType<IEmployeeContext['deleteRole']>;
}

/**
 * Wrap OrgStructureApiService instance with employee context
 *
 * @param {OrgStructureApiService} api
 * @return {IEmployeeContext}
 */
export function withEmployeeContext(api: OrgStructureApiService): IEmployeeContext;

/**
 * Wrap employee context with employee id context
 *
 * @param {IEmployeeIdContext} context
 * @return {function(id: number|number[]): IEmployeeContext}
 */
export function withEmployeeIdContext(
    context: IEmployeeContext
): (id: number | number[]) => IEmployeeIdContext;

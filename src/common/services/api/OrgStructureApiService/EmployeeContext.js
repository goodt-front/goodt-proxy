/**
 * @param {import('./OrgStructureApiService').OrgStructureApiService} api
 * @return {import('./EmployeeContext').IEmployeeContext}
 */
export const withEmployeeContext = (api) => ({
    getById: (employeeId) => api.getEmployeeById(employeeId),
    getListByIds: (employeeIds) => api.getEmployeesByIds(employeeIds),
    getListByFilter: ({ employeeIds, divisionId, searchToken }) =>
        api.getEmployeesByFilter({
            employeeIds,
            divisionId,
            searchToken
        }),
    getTeamAssignments: ({ employeeId, teamId }) =>
        api.getEmployeeAssignments({
            employeeId,
            teamId
        }),
    getConditionById: (employeeId) => api.getEmployeeConditionById(employeeId),
    createOrUpdateRole: ({ employeeId, roleId, legalEntityId }) =>
        api.createOrUpdateEmployeeRole({
            employeeId,
            roleId,
            legalEntityId
        }),
    deleteRole: ({ employeeId, roleId, legalEntityId }) => api.deleteEmployeeRole({ employeeId, roleId, legalEntityId })
});

/**
 *
 * @param {import('./EmployeeContext').IEmployeeContext} api
 * @return {function(employeeId: number|number[]): import('./EmployeeContext').IEmployeeIdContext}
 */
export const withEmployeeIdContext = (api) => (employeeId) => ({
    get: () => api.getById(employeeId),
    getList: () => api.getListByIds(employeeId),
    getByFilter: ({ divisionId, searchToken }) =>
        api.getListByFilter({
            employeeIds: employeeId,
            divisionId,
            searchToken
        }),
    getTeamAssignmentsByTeamId: (teamId) =>
        api.getTeamAssignments({
            employeeId,
            teamId
        }),
    getCondition: () => api.getConditionById(employeeId),
    createOrUpdateRole: ({ roleId, legalEntityId }) =>
        api.createOrUpdateRole({
            employeeId,
            roleId,
            legalEntityId
        }),
    deleteRole: ({ roleId, legalEntityId }) => api.deleteRole({ employeeId, roleId, legalEntityId })
});

/**
 * @param {import('./OrgStructureApiService').OrgStructureApiService} api
 * @return {import('./TeamContext').ITeamContext}
 */
export const withTeamContext = (api) => ({
    getAssignments: (teamId) => api.getEmployeeAssignments({ teamId }),
    getAssignmentsById: (teamId) => api.getTeamEmployeesAssignmentsByTeamId(teamId),
    getSubordinatesAssignmentsById: (teamId) => api.getSubordinatesAssignments({ teamId }),
    getHeadAssignmentById: (teamId) => api.getTeamHeadAssignment({ teamId }),
    getHeadOfHeadAssignmentById: (teamId) => api.getHeadOfTeamHeadAssignment({ teamId }),
    getLegalEntityAssignmentsById: (teamId) => api.getLegalEntityTeamAssignments({ teamId })
});

/**
 * @param {import('./TeamContext').ITeamContext} teamContext
 * @return {function(teamId: number): import('./TeamContext').ITeamContext}
 */
export const withTeamIdContext = (teamContext) => (teamId) => ({
    getSubordinatesAssignments: () => teamContext.getSubordinatesAssignmentsById({ teamId }),
    getHeadAssignment: () => teamContext.getHeadAssignmentById({ teamId }),
    getAssignments: () => teamContext.getAssignmentsById(teamId),
    getAssignmentsList: () => teamContext.getAssignments({ teamId }),
    getHeadOfHeadAssignment: () => teamContext.getHeadOfHeadAssignmentById({ teamId }),
    getLegalEntityAssignments: () => teamContext.getLegalEntityAssignmentsById({ teamId })
});

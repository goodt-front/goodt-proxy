import { OrgStructureApiService } from './OrgStructureApiService';

export interface ITeamContext {
    getAssignments(teamId: number): ReturnType<OrgStructureApiService['getEmployeeAssignments']>;
    getSubordinatesAssignmentsById(
        teamId: number
    ): ReturnType<OrgStructureApiService['getSubordinatesAssignments']>;
    getHeadAssignmentById(
        teamId: number
    ): ReturnType<OrgStructureApiService['getTeamHeadAssignment']>;
    getAssignmentsById(
        teamId: number
    ): ReturnType<OrgStructureApiService['getTeamEmployeesAssignmentsByTeamId']>;
    getHeadOfHeadAssignmentById(
        teamId: number
    ): ReturnType<OrgStructureApiService['getHeadOfTeamHeadAssignment']>;
    getLegalEntityAssignmentsById(
        teamId: number
    ): ReturnType<OrgStructureApiService['getLegalEntityAssignments']>;
}

export interface ITeamIdContext {
    getSubordinatesAssignments(): ReturnType<ITeamContext['getSubordinatesAssignmentsById']>;
    getHeadAssignment(): ReturnType<ITeamContext['getHeadAssignmentById']>;
    getAssignments(): ReturnType<ITeamContext['getAssignmentsById']>;
    getAssignmentsList(): ReturnType<ITeamContext['getAssignments']>;
    getHeadOfHeadAssignments(): ReturnType<ITeamContext['getHeadOfHeadAssignmentById']>;
    getLegalEntityAssignments(): ReturnType<ITeamContext['getLegalEntityAssignmentsById']>;
}

export function withTeamContext(api: OrgStructureApiService): ITeamContext;

export function withTeamIdContext(teamContext: ITeamContext): (teamId: number) => ITeamIdContext;

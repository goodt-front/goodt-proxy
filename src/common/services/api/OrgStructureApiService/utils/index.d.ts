import { DivisionTeamRoleDto, DivisionTeamAssignmentDto } from '../dto';

export const DivisionTeamRole: {
    /**
     *
     * @param {?DivisionTeamRoleDto} role
     * @return {boolean}
     */
    isHead(role: DivisionTeamRoleDto | null): boolean;
};

export const DivisionTeamAssignment: {
    /**
     *
     * @param {?DivisionTeamAssignmentDto} assignment
     * @return {boolean}
     */
    isHead(assignment: DivisionTeamAssignmentDto | null): boolean;
};

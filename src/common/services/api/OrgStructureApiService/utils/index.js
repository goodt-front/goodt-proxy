import { SystemRoleId } from '../constants';

/**
 *
 * @type {{isHead(import('../dto').DivisionTeamRoleDto): boolean}}
 */
export const DivisionTeamRole = {
    /**
     *
     * @param {?import('../dto').DivisionTeamRoleDto} divisionTeamRole
     * @return {boolean}
     */
    isHead(divisionTeamRole) {
        return divisionTeamRole.role?.systemRole.id === SystemRoleId.HEAD;
    }
};

/**
 *
 * @type {{isHead(DivisionTeamAssignmentDto): boolean}}
 */
export const DivisionTeamAssignment = {
    /**
     *
     * @param {?DivisionTeamAssignmentDto} assignment
     * @return {boolean}
     */
    isHead(assignment) {
        return DivisionTeamRole.isHead(assignment?.division_team_role);
    }
};

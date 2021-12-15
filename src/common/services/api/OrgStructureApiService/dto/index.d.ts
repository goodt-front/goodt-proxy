// eslint-disable-next-line max-classes-per-file
import { BaseDto } from '@goodt-common/infra';

export class DivisionTeamAssignmentDto extends BaseDto {
    id: number;
    employee: EmployeeInfoDto;
    abbreviation: string;
    status: AssignmentStatusDto;
    full_name: string;
    short_name: string;
    division_team_assignment_rotations: BaseDto[];
    external_id: string;
    division_team_role: DivisionTeamRoleDto;
    division_team: DivisionTeamDto;
}

export class DivisionTeamDto extends BaseDto {}

export class EmployeeExtendedInfoDto extends BaseDto {}

export class EmployeeConditionInfoDto extends BaseDto {}
export class LegalEntityTeamAssignmentDto extends BaseDto {}

export class AssignmentStatusDto extends BaseDto {}
export class DivisionShortInfoDto extends BaseDto {}
export class DivisionInfoDto extends BaseDto {}
export class DivisionPositionDto extends BaseDto {}

export class RoleInfoDto extends BaseDto {}

export class SystemRoleDto extends BaseDto {
    id: number;
    name: string;
    is_assignable: 0 | 1;
}

export class RoleDto extends BaseDto {
    id: number;
    abbreviation: string;
    systemRole: SystemRoleDto;
    full_name: string;
    short_name: string;
}

export class DivisionTeamRoleContainerDto extends BaseDto {}
export class DivisionTeamRoleRawDto extends BaseDto {}
export class DivisionTeamRoleDto extends BaseDto {
    id: number;
    role: RoleDto;
    abbreviation: string;
    systemRole: SystemRoleDto;
    full_name: string;
    short_name: string;
    importance: BaseDto;
    division_team: DivisionTeamDto;
    external_id: string;
}

export class DivisionTeamAssignmentRotationDto extends BaseDto {}
export class DivisionTeamSuccessorDto extends BaseDto {}
export class AssignmentReadinessDto extends BaseDto {}
export class DivisionTeamSuccessorReadinessDto extends BaseDto {}

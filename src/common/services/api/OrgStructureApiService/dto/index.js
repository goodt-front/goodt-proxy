/* eslint-disable max-classes-per-file, lines-between-class-members, camelcase */
import { BaseDto } from '@goodt-common/infra';

export class DivisionTeamAssignmentDto extends BaseDto {}
export class EmployeeExtendedInfoDto extends BaseDto {}
export class EmployeeConditionInfoDto extends BaseDto {}
export class LegalEntityTeamAssignmentDto extends BaseDto {}

export class DivisionShortInfoDto extends BaseDto {}
export class DivisionInfoDto extends BaseDto {}
export class DivisionPositionDto extends BaseDto {}

export class RoleInfoDto extends BaseDto {}
export class DivisionTeamRoleContainerDto extends BaseDto {}
export class DivisionTeamRoleRawDto extends BaseDto {}
export class DivisionTeamRoleDto extends BaseDto {
    id;
    role;
    importance;
    division_team;
    external_id;
}

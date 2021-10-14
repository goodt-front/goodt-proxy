import { GraphqlServiceConsumer, gql } from '@goodt-common/graphql';
import { OrgStructureGraphqlServiceSymbol } from '@goodt-common/services/graphql';

/**
 *
 */
export class OrgStructureConsumer extends GraphqlServiceConsumer {
    getEmployeesByIds(ids) {
        return this.query(
            gql`
                query Employees($filter: EmployeeFilterInput!) {
                    employees(filter: $filter) {
                        list {
                            id
                            person {
                                id
                                name
                            }
                        }
                    }
                }
            `,
            { filter: { ids } }
        );
    }

    getDivisionTeamAssignments({ employeeId, divisionTeamId }) {
        return this.query(
            gql`
                query DivisionTeamAssignments($filter: DivisionTeamAssignmentFilterInput!) {
                    teamAssignments(filter: $filter) {
                        list {
                            employee {
                                id
                                person {
                                    photo
                                    id
                                    name
                                    surname
                                    patronymic
                                }
                                positionAssignments {
                                    list {
                                        id
                                        dateTo
                                        position {
                                            jobTitle {
                                                id
                                                shortName
                                            }
                                        }
                                    }
                                }
                            }
                            divisionTeamRole {
                                id
                                divisionTeam {
                                    id
                                    fullName
                                }
                                role {
                                    id
                                    fullName
                                    systemRole {
                                        id
                                    }
                                }
                            }
                        }
                    }
                }
            `,
            { filter: { employeeId, divisionTeamId } }
        );
    }

    async deleteEmployee({ id }) {
        return this.mutate(
            gql`
                mutation DeleteEmployee($id: ID!) {
                    deleteEmployee(id: $id) {
                        id
                    }
                }
            `,
            { id }
        );
    }

    async createEmployee(employee) {
        return this.mutate(
            gql`
                mutation CreateEmployee($employee: EmployeeCreateInput!) {
                    createEmployee(employee: $employee) {
                        id
                        employee {
                            id
                            person {
                                id
                                name
                            }
                        }
                    }
                }
            `,
            { employee }
        );
    }

    async deleteEmployeeById(id) {
        return this.mutate(
            gql`
                mutation DeleteEmployee($id: ID!) {
                    deleteEmployee(id: $id) {
                        id
                    }
                }
            `,
            { id }
        );
    }
}

/**
 *
 */
export const create = () => new OrgStructureConsumer(OrgStructureGraphqlServiceSymbol);

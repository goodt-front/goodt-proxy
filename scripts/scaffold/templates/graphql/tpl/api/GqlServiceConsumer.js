import { GraphqlServiceConsumer, gql } from '@goodt-common/graphql';
import { [[prefixCapital]]GraphqlServiceSymbol } from '@goodt-common/services/graphql';

/**
 *
 */
export class [[prefixCapital]]Consumer extends GraphqlServiceConsumer {
    /**
     * OrgStructureGraphql API example
     * @deprecated this should me replaced or removed
     *
     * @param {number} [employeeId]
     * @param {number} [divisionTeamId]
     *
     * @return {import('@goodt-common/graphql').OperationState}
     */
    getDivisionTeamAssignments({ employeeId, divisionTeamId }) {
        return this.query(
            gql`
                query DivisionTeamAssignments($filter: DivisionTeamAssignmentFilterInput!) {
                    teamAssignments(filter: $filter) {
                        list {
                            employee {
                                id
                                person {
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
            { filter: { employeeId, teamId: divisionTeamId } }
        );
    }

    /**
     * OrgStructureGraphql API example
     * @deprecated this should me replaced or removed
     *
     * @param {number} id
     * @return {import('@goodt-common/graphql').OperationState}
     */
    getEmployeeById(id) {
        return this.query(
            gql`
                query Employee($id: ID!) {
                    employee(id: $id) {
                        id
                        person {
                            id
                            name
                            surname
                        }
                    }
                }
            `,
            { id }
        );
    }


    /**
     * Fake API example
     * @deprecated this should me replaced or removed
     * @param {number} id
     * @param {Record<string, any>} entity
     *
     * @return {import('@goodt-common/graphql').OperationState}
     */
    updateMutationExample(id, entity) {
        return this.mutate(
            gql`
                mutation UpdateEntity($id: ID!, $entity: EntityInput!) {
                    updateEntity(id: $id, entity: $entity) {
                        id
                    }
                }
            `,
            { id, entity }
        );
    }
}

/**
 *
 */
export const create = () => new [[prefixCapital]]Consumer([[prefixCapital]]GraphqlServiceSymbol);

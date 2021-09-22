import {
    createOrgStructureGraphqlService,
    OrgStructureGraphqlServiceSymbol
} from './graphql/OrgStructureGraphqlService';

export const ServiceFactoryMappingList = [[OrgStructureGraphqlServiceSymbol, createOrgStructureGraphqlService]];

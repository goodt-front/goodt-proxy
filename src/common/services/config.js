import {
    createOrgStructureGraphqlService,
    OrgStructureGraphqlServiceSymbol
} from '@goodt-common/api/OrgStructureGraphqlService';

export const ServiceFactoryMappingList = [[OrgStructureGraphqlServiceSymbol, createOrgStructureGraphqlService]];

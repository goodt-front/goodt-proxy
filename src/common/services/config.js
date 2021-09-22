import { createOrgStructureGraphqlService, OrgStructureGraphqlServiceSymbol } from './api/OrgStructureGraphqlService';

export const ServiceFactoryMappingList = [[OrgStructureGraphqlServiceSymbol, createOrgStructureGraphqlService]];

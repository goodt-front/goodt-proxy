import { OrgStructureApiService } from './OrgStructureApiService';

export interface IDivisionContext {
    /**
     * @link https://goodt-dev.goodt.me:8480/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/division/getPath
     * @param {number} divisionId
     * @return {Promise<SafeResult<DivisionShortInfoDto[], Error>>}
     */
    getPathById(
        ...args: Parameters<OrgStructureApiService['getDivisionPathById']>
    ): ReturnType<OrgStructureApiService['getDivisionPathById']>;
    /**
     * @link https://goodt-dev.goodt.me:8480/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/division/getInfo_1
     * @param {number} divisionId
     * @return {Promise<SafeResult<DivisionInfoDto, Error>>}
     */
    getInfoById(
        ...args: Parameters<OrgStructureApiService['getDivisionInfoById']>
    ): ReturnType<OrgStructureApiService['getDivisionInfoById']>;
    /**
     * @link https://goodt-dev.goodt.me:8480/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/division/listInfo
     * @param {number} divisionId?
     * @param {number} legalEntityId?
     * @return {Promise<SafeResult<DivisionInfoDto[], Error>>}
     */
    getInfosListByParent(
        ...args: Parameters<OrgStructureApiService['getDivisionInfosByParent']>
    ): ReturnType<OrgStructureApiService['getDivisionInfosByParent']>;
    /**
     * @link https://goodt-dev.goodt.me:8480/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/division/GetDivisionPositions
     * @param {number} divisionId
     * @return {Promise<SafeResult<DivisionPositionDto[], Error>>}
     */
    getPositionsById(
        ...args: Parameters<OrgStructureApiService['getDivisionPositionsById']>
    ): ReturnType<OrgStructureApiService['getDivisionPositionsById']>;
}

export interface IDivisionIdContext {
    /**
     * @link https://goodt-dev.goodt.me:8480/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/division/getPath
     * @param {number} divisionId
     * @return {Promise<SafeResult<DivisionShortInfoDto[], Error>>}
     */
    getPath(): ReturnType<OrgStructureApiService['getDivisionPathById']>;

    /**
     * @link https://goodt-dev.goodt.me:8480/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/division/getInfo_1
     * @param {number} divisionId
     * @return {Promise<SafeResult<DivisionInfoDto, Error>>}
     */
    getInfo(): ReturnType<OrgStructureApiService['getDivisionInfoById']>;

    /**
     * @link https://goodt-dev.goodt.me:8480/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/division/listInfo
     * @param {number} divisionId?
     * @param {number} legalEntityId?
     * @return {Promise<SafeResult<DivisionInfoDto[], Error>>}
     */
    getChildrenInfos({
        legalEntityId
    }: {
        legalEntityId: number;
    }): ReturnType<OrgStructureApiService['getDivisionInfosByParent']>;

    /**
     * @link https://goodt-dev.goodt.me:8480/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/division/GetDivisionPositions
     * @param {number} divisionId
     * @return {Promise<SafeResult<DivisionPositionDto[], Error>>}
     */
    getPositions(): ReturnType<OrgStructureApiService['getDivisionPositionsById']>;
}

/**
 * @param {OrgStructureApiService} api
 * @return {IDivisionIdContext}
 */
export function withDivisionContext(api: OrgStructureApiService): IDivisionContext;

/**
 * @param {IDivisionContext} divisionContext
 * @return {function(divisionId: number): import('./DivisionContext').IDivisionIdContext}
 */
export function withDivisionIdContext(
    divisionContext: IDivisionContext
): (divisionId: number) => IDivisionIdContext;

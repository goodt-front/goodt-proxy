/**
 * @param {import('./OrgStructureApiService').OrgStructureApiService} api
 * @return {import('./DivisionContext').IDivisionContext}
 */
export const withDivisionContext = (api) => ({
    /**
     * @link https://goodt-dev.goodt.me:8480/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/division/getPath
     * @param {number} divisionId
     * @return {Promise<SafeResult<DivisionShortInfoDto[], Error>>}
     */
    getPathById: (divisionId) => api.getDivisionPathById(divisionId),
    /**
     * @link https://goodt-dev.goodt.me:8480/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/division/getInfo_1
     * @param {number} divisionId
     * @return {Promise<SafeResult<DivisionInfoDto, Error>>}
     */
    getInfoById: (divisionId) => api.getDivisionInfoById(divisionId),
    /**
     * @link https://goodt-dev.goodt.me:8480/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/division/listInfo
     * @param {number} divisionId?
     * @param {number} legalEntityId?
     * @return {Promise<SafeResult<DivisionInfoDto[], Error>>}
     */
    getInfosListByParent: ({ divisionId, legalEntityId }) =>
        api.getDivisionInfosByParent({ divisionId, legalEntityId }),
    /**
     * @link https://goodt-dev.goodt.me:8480/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/division/GetDivisionPositions
     * @param {number} divisionId
     * @return {Promise<SafeResult<DivisionPositionDto[], Error>>}
     */
    getPositionsById: (divisionId) => api.getDivisionPositionsById(divisionId)
});

/**
 * @param {import('./DivisionContext').IDivisionContext} divisionContext
 * @return {function(divisionId: number): import('./DivisionContext').IDivisionIdContext}
 */
export const withDivisionIdContext = (divisionContext) => (divisionId) => ({
    /**
     * @link https://goodt-dev.goodt.me:8480/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/division/getPath
     * @param {number} divisionId
     * @return {Promise<SafeResult<DivisionShortInfoDto[], Error>>}
     */
    getPath: () => divisionContext.getPathById(divisionId),

    /**
     * @link https://goodt-dev.goodt.me:8480/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/division/getInfo_1
     * @param {number} divisionId
     * @return {Promise<SafeResult<DivisionInfoDto, Error>>}
     */
    getInfo: () => divisionContext.getInfoById(divisionId),

    /**
     * @link https://goodt-dev.goodt.me:8480/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/division/listInfo
     * @param {number} divisionId?
     * @param {number} legalEntityId?
     * @return {Promise<SafeResult<DivisionInfoDto[], Error>>}
     */
    getChildrenInfos: ({ legalEntityId }) => divisionContext.getInfosListByParent({ divisionId, legalEntityId }),

    /**
     * @link https://goodt-dev.goodt.me:8480/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/division/GetDivisionPositions
     * @param {number} divisionId
     * @return {Promise<SafeResult<DivisionPositionDto[], Error>>}
     */
    getPositions: () => divisionContext.getPositionsById(divisionId)
});

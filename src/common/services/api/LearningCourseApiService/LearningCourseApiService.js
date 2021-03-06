/* eslint-disable camelcase */
import { BaseApiService, buildRequest } from '@goodt-common/services/api';
import { BaseDto, buildDtoSafeResult } from '@goodt-common/infra';
import { success } from '@goodt-common/utils';

import { ServiceAction } from './config';
/**
 * @todo Purge Collection* imports
 */
import {
    BudgetEntityDto,
    BudgetDataEntityDto,
    BudgetItemEntityDto,
    BudgetItemGroupEntityDto,
    BudgetSourceEntityDto,
    ClassroomEntityDto,
    ContentTypeEntityDto,
    DocumentTypeEntityDto,
    DurationEntityDto,
    LearningCourseEntityDto,
    LearningCourseBudgetItemEntityDto,
    LearningCourseCatalogEntityDto,
    LearningCourseDocumentTypeEntityDto,
    LearningCourseGroupEntityDto,
    LearningCourseCuratorEntityDto,
    LearningCourseGroupBindingDto,
    LearningCourseSimilarEntityDto,
    LearningCourseStudyDirectionEntityDto,
    LearningCourseTypeEntityDto,
    LearningFormEntityDto,
    LearningProgramDocumentTypeEntityDto,
    LearningProgramLearningCourseBindingDto,
    LearningProgramLearningCourseDependencyEntityDto,
    LearningProgramLearningCoursePartyEntityDto,
    LearningStudyGroupDto,
    LearningStudyGroupNumeratorEntityDto,
    LearningCourseMessageBindingDto,
    MessageEntityDto,
    StatusEntityDto,
    StudyExpertContractEntityDto,
    StudyDegreeEntityDto,
    StudyDegreeGroupEntityDto,
    StudyExpertEntityDto,
    StudyDirectionEntityDto,
    StudyExpertContractRateEntityDto,
    StudyExpertContractTypeEntityDto,
    StudyGrantEntityDto,
    StudyGrantAllocationEntityDto,
    StudyGrantAllocationStudyExpertEntityDto,
    StudyGrantAllocationStudyStudentEntityDto,
    StudyLocationEntityDto,
    StudyPerformanceTypeEntityDto,
    StudyProviderEntityDto,
    StudyProviderContractEntityDto,
    ContractSubjectEntityDto,
    StudyProviderTypeEntityDto,
    StudyStudentEntityDto,
    UserLearningCourseEntityDto,
    UserLearningCourseStepEntityDto,
    LearningCourseStepEntityDto,
    UserLearningCourseDocumentEntityDto,
    SuggestionEntityDto,
    PageLearningCourseEntityDto,
    InfoDtoDto,
    LearningCourseAnnouncementEntityDto,
    LearningCourseStudyExpertBindingDto,
    StudyStudentPerformanceEntityDto,
    StudyStudentEducationEntityDto,
    StudyProviderRegionEntityDto,
    StudyProviderRegionCityEntityDto,
    LearningProgramCatalogEntityDto,
    LearningCoursePartyEntityDto,
    LearningProgramEntityDto
} from './dtos';

/**
 *
 * @param {SafeResult} safeResult
 * @param {import('@goodt-common/infra/BaseDto').BaseDto.constructor} [DtoConstructor=true]
 * @return {SafeResult<BaseDto|BaseDto[], Error>}
 */
const processRequestResult = (safeResult, DtoConstructor = true) => {
    const { isError } = safeResult;
    if (isError) {
        return safeResult;
    }

    // eslint-disable-next-line no-prototype-builtins
    if (BaseDto.isPrototypeOf(DtoConstructor) === false) {
        return success(DtoConstructor);
    }

    const resolveDtoJson = (responseJson) => {
        const { id, content, links, ...restJson } = responseJson;
        if (id) {
            return { id, ...restJson };
        }

        if (content) {
            return content;
        }

        return responseJson;
    };

    const { result: dtoJsonResult } = safeResult;

    return buildDtoSafeResult(DtoConstructor, resolveDtoJson(dtoJsonResult));
};

/**
 *
 * @param {LearningCourseApiService} service
 * @param {Record<string, Function>} extensionsDescriptor
 * @return {*}
 */
function useExtensions(service, extensionsDescriptor) {
    // eslint-disable-next-line
    return Object.assign(service, extensionsDescriptor);
}

/**
 *
 * @param action
 * @param {BaseDto} DtoConstructor
 * @return {function(...[*]): *}
 */
export const createApiServiceMethod = (action, DtoConstructor) => {
    return function (...args) {
        const { paramsBuilder } = action;
        return this.request(
            {
                action,
                ...paramsBuilder(...args)
            },
            DtoConstructor
        );
    };
};

/**
 *
 */
export class LearningCourseApiService extends BaseApiService {
    /**
     *
     * @param options
     * @param extensionsDescriptor
     */
    constructor(options, extensionsDescriptor) {
        super(options);
        useExtensions(this, extensionsDescriptor);
    }

    /**
     *
     * @param apiServiceRequest
     * @param DtoConstructor
     * @return {Promise<SafeResult<BaseDto|BaseDto[], Error>>}
     */
    async request(apiServiceRequest, DtoConstructor) {
        return processRequestResult(await super.request(buildRequest(apiServiceRequest)), DtoConstructor);
    }
}

/**
 *
 * @param {import('@goodt-common/api/types').IApiServiceConstructorOptions} options
 * @param {Record<string, Function>} extensionsDescriptor
 * @return {LearningCourseApiService}
 */
export const create = (options, extensionsDescriptor) => new LearningCourseApiService(options, extensionsDescriptor);

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????????? ??????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D1%8F%D0%BC%D0%B8%20%D0%B1%D1%8E%D0%B4%D0%B6%D0%B5%D1%82%D0%B0%20(Budget)/getCollectionResource-budgetentity-get_1_1
 *
 * @return {Promise<SafeResult<BudgetEntityDto, Error>>}
 */
export function getBudgets() {
    return this.request(
        {
            action: ServiceAction.BUDGET_GET
        },
        BudgetEntityDto
    );
}

/**
 * @description ???????????????????? ????????????????: ???????????? ??????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D1%8F%D0%BC%D0%B8%20%D0%B1%D1%8E%D0%B4%D0%B6%D0%B5%D1%82%D0%B0%20(Budget)/postCollectionResource-budgetentity-post_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} name
 * @param {number} year
 * @param {string} confirm_date
 * @param {number} confirm_employee_id
 * @param {boolean} actual
 *
 * @return {Promise<SafeResult<BudgetEntityDto, Error>>}
 */
export function createBudget({ date_from, date_to, name, year, confirm_date, confirm_employee_id, actual }) {
    return this.request(
        {
            action: ServiceAction.BUDGET_CREATE,
            params: {
                date_from,
                date_to,
                name,
                year,
                confirm_date,
                confirm_employee_id,
                actual
            }
        },
        BudgetEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????????? ??????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D0%BC%D0%B8%20%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D0%B8%20%D0%B1%D1%8E%D0%B4%D0%B6%D0%B5%D1%82%D0%B0%20(BudgetData)/getCollectionResource-budgetdataentity-get_1_1
 *
 * @return {Promise<SafeResult<BudgetDataEntityDto[], Error>>}
 */
export function getBudgetData() {
    return this.request(
        {
            action: ServiceAction.BUDGET_DATA_GET
        },
        BudgetDataEntityDto
    );
}

/**
 * @description ???????????????????? ????????????????: ???????????? ??????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D0%BC%D0%B8%20%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D0%B8%20%D0%B1%D1%8E%D0%B4%D0%B6%D0%B5%D1%82%D0%B0%20(BudgetData)/postCollectionResource-budgetdataentity-post_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {number} legal_entity_id
 * @param {number} division_id
 * @param {number} month
 * @param {number} amount
 * @param {string} budget
 * @param {BudgetItemEntityDto} budget_item
 * @param {BudgetFileEntityDto} budget_file
 * @param {boolean} actual
 *
 * @return {Promise<SafeResult<BudgetDataEntityDto, Error>>}
 */
export function createBudgetData({
    date_from,
    date_to,
    legal_entity_id,
    division_id,
    month,
    amount,
    budget,
    budget_item,
    budget_file,
    actual
}) {
    return this.request(
        {
            action: ServiceAction.BUDGET_DATA_CREATE,
            params: {
                date_from,
                date_to,
                legal_entity_id,
                division_id,
                month,
                amount,
                budget,
                budget_item,
                budget_file,
                actual
            }
        },
        BudgetDataEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????????? ??????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D0%BC%D0%B8%20%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D0%B8%20%D0%B1%D1%8E%D0%B4%D0%B6%D0%B5%D1%82%D0%B0%20(BudgetData)/getItemResource-budgetdataentity-get_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<BudgetDataEntityDto, Error>>}
 */
export function getBudgetDataById(id) {
    return this.request(
        {
            action: ServiceAction.BUDGET_DATA_GET_BY_ID,
            pathParams: { id }
        },
        BudgetDataEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????? ??????????????: ???????????? ??????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D0%BC%D0%B8%20%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D0%B8%20%D0%B1%D1%8E%D0%B4%D0%B6%D0%B5%D1%82%D0%B0%20(BudgetData)/putItemResource-budgetdataentity-put_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {number} legal_entity_id
 * @param {number} division_id
 * @param {number} month
 * @param {number} amount
 * @param {string} budget
 * @param {BudgetItemEntityDto} budget_item
 * @param {BudgetFileEntityDto} budget_file
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<BudgetDataEntityDto, Error>>}
 */
export function replaceBudgetData(
    id,
    { date_from, date_to, legal_entity_id, division_id, month, amount, budget, budget_item, budget_file, actual }
) {
    return this.request(
        {
            action: ServiceAction.BUDGET_DATA_REPLACE_BY_ID,
            pathParams: { id },
            params: {
                date_from,
                date_to,
                legal_entity_id,
                division_id,
                month,
                amount,
                budget,
                budget_item,
                budget_file,
                actual
            }
        },
        BudgetDataEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ???????????? ??????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D0%BC%D0%B8%20%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D0%B8%20%D0%B1%D1%8E%D0%B4%D0%B6%D0%B5%D1%82%D0%B0%20(BudgetData)/deleteItemResource-budgetdataentity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function deleteBudgetData(id) {
    return this.request({
        action: ServiceAction.BUDGET_DATA_DELETE_BY_ID,
        pathParams: { id }
    });
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ???????????? ??????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D0%BC%D0%B8%20%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D0%B8%20%D0%B1%D1%8E%D0%B4%D0%B6%D0%B5%D1%82%D0%B0%20(BudgetData)/patchItemResource-budgetdataentity-patch_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {number} legal_entity_id
 * @param {number} division_id
 * @param {number} month
 * @param {number} amount
 * @param {string} budget
 * @param {BudgetItemEntityDto} budget_item
 * @param {BudgetFileEntityDto} budget_file
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<BudgetDataEntityDto, Error>>}
 */
export function updateBudgetData(
    id,
    { date_from, date_to, legal_entity_id, division_id, month, amount, budget, budget_item, budget_file, actual }
) {
    return this.request(
        {
            action: ServiceAction.BUDGET_DATA_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                date_from,
                date_to,
                legal_entity_id,
                division_id,
                month,
                amount,
                budget,
                budget_item,
                budget_file,
                actual
            }
        },
        BudgetDataEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????????? ??????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%81%D1%82%D0%B0%D1%82%D1%8C%D1%8F%D0%BC%D0%B8%20%D0%B1%D1%8E%D0%B4%D0%B6%D0%B5%D1%82%D0%B0%20(BudgetItem)/getCollectionResource-budgetitementity-get_1_1
 *
 * @return {Promise<SafeResult<BudgetItemEntityDto, Error>>}
 */
export function getBudgetItem() {
    return this.request(
        {
            action: ServiceAction.BUDGET_ITEM_GET
        },
        BudgetItemEntityDto
    );
}

/**
 * @description ???????????????????? ????????????????: ???????????? ??????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%81%D1%82%D0%B0%D1%82%D1%8C%D1%8F%D0%BC%D0%B8%20%D0%B1%D1%8E%D0%B4%D0%B6%D0%B5%D1%82%D0%B0%20(BudgetItem)/postCollectionResource-budgetitementity-post_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} name
 * @param {BudgetItemGroupEntityDto} budget_item_group
 * @param {boolean} actual
 *
 * @return {Promise<SafeResult<BudgetItemEntityDto, Error>>}
 */
export function createBudgetItem({ date_from, date_to, name, budget_item_group, actual }) {
    return this.request(
        {
            action: ServiceAction.BUDGET_ITEM_CREATE,
            params: {
                date_from,
                date_to,
                name,
                budget_item_group,
                actual
            }
        },
        BudgetItemEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????????? ???????????? ??????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B3%D1%80%D1%83%D0%BF%D0%BF%D0%B0%D0%BC%D0%B8%20%D1%81%D1%82%D0%B0%D1%82%D0%B5%D0%B9%20%D0%B1%D1%8E%D0%B4%D0%B6%D0%B5%D1%82%D0%B0%20(BudgetItemGroup)/getCollectionResource-budgetitemgroupentity-get_1_1
 *
 * @return {Promise<SafeResult<BudgetItemGroupEntityDto, Error>>}
 */
export function getBudgetItemGroup() {
    return this.request(
        {
            action: ServiceAction.BUDGET_ITEM_GROUP_GET
        },
        BudgetItemGroupEntityDto
    );
}

/**
 * @description ???????????????????? ????????????????: ???????????? ???????????? ??????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B3%D1%80%D1%83%D0%BF%D0%BF%D0%B0%D0%BC%D0%B8%20%D1%81%D1%82%D0%B0%D1%82%D0%B5%D0%B9%20%D0%B1%D1%8E%D0%B4%D0%B6%D0%B5%D1%82%D0%B0%20(BudgetItemGroup)/postCollectionResource-budgetitemgroupentity-post_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} name
 * @param {number} parent_id
 * @param {boolean} actual
 *
 * @return {Promise<SafeResult<BudgetItemGroupEntityDto, Error>>}
 */
export function createBudgetItemGroup({ date_from, date_to, name, parent_id, actual }) {
    return this.request(
        {
            action: ServiceAction.BUDGET_ITEM_GROUP_CREATE,
            params: {
                date_from,
                date_to,
                name,
                parent_id,
                actual
            }
        },
        BudgetItemGroupEntityDto
    );
}

// /**
//  * @description ?????????????????? ???????????????????? ?? ????????????????: ???????????? ???????????? ??????????????
//  * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B3%D1%80%D1%83%D0%BF%D0%BF%D0%B0%D0%BC%D0%B8%20%D1%81%D1%82%D0%B0%D1%82%D0%B5%D0%B9%20%D0%B1%D1%8E%D0%B4%D0%B6%D0%B5%D1%82%D0%B0%20(BudgetItemGroup)/getItemResource-budgetitemgroupentity-get_1
//  * @param {string} id
//  *
//  * @return {Promise<SafeResult<BudgetItemGroupEntityDto, Error>>}
//  */
// export function getBudgetItemGroup(id) {
//     return this.request(
//         {
//             action: ServiceAction.BUDGET_ITEM_GROUP_GET_BY_ID,
//             pathParams: { id }
//         },
//         BudgetItemGroupEntityDto
//     );
// }

/**
 * @description ?????????????????? ???????????????? ??????????????: ???????????? ???????????? ??????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B3%D1%80%D1%83%D0%BF%D0%BF%D0%B0%D0%BC%D0%B8%20%D1%81%D1%82%D0%B0%D1%82%D0%B5%D0%B9%20%D0%B1%D1%8E%D0%B4%D0%B6%D0%B5%D1%82%D0%B0%20(BudgetItemGroup)/putItemResource-budgetitemgroupentity-put_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} name
 * @param {number} parent_id
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<BudgetItemGroupEntityDto, Error>>}
 */
export function replaceBudgetItemGroup(id, { date_from, date_to, name, parent_id, actual }) {
    return this.request(
        {
            action: ServiceAction.BUDGET_ITEM_GROUP_REPLACE_BY_ID,
            pathParams: { id },
            params: {
                date_from,
                date_to,
                name,
                parent_id,
                actual
            }
        },
        BudgetItemGroupEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ???????????? ???????????? ??????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B3%D1%80%D1%83%D0%BF%D0%BF%D0%B0%D0%BC%D0%B8%20%D1%81%D1%82%D0%B0%D1%82%D0%B5%D0%B9%20%D0%B1%D1%8E%D0%B4%D0%B6%D0%B5%D1%82%D0%B0%20(BudgetItemGroup)/deleteItemResource-budgetitemgroupentity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function deleteBudgetItemGroup(id) {
    return this.request({
        action: ServiceAction.BUDGET_ITEM_GROUP_DELETE_BY_ID,
        pathParams: { id }
    });
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ???????????? ???????????? ??????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B3%D1%80%D1%83%D0%BF%D0%BF%D0%B0%D0%BC%D0%B8%20%D1%81%D1%82%D0%B0%D1%82%D0%B5%D0%B9%20%D0%B1%D1%8E%D0%B4%D0%B6%D0%B5%D1%82%D0%B0%20(BudgetItemGroup)/patchItemResource-budgetitemgroupentity-patch_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} name
 * @param {number} parent_id
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<BudgetItemGroupEntityDto, Error>>}
 */
export function updateBudgetItemGroup(id, { date_from, date_to, name, parent_id, actual }) {
    return this.request(
        {
            action: ServiceAction.BUDGET_ITEM_GROUP_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                date_from,
                date_to,
                name,
                parent_id,
                actual
            }
        },
        BudgetItemGroupEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????????? ??????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%81%D1%82%D0%B0%D1%82%D1%8C%D1%8F%D0%BC%D0%B8%20%D0%B1%D1%8E%D0%B4%D0%B6%D0%B5%D1%82%D0%B0%20(BudgetItem)/getItemResource-budgetitementity-get_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<BudgetItemEntityDto, Error>>}
 */
export function getBudgetItemById(id) {
    return this.request(
        {
            action: ServiceAction.BUDGET_ITEM_GET_BY_ID,
            pathParams: { id }
        },
        BudgetItemEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ???????????? ??????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%81%D1%82%D0%B0%D1%82%D1%8C%D1%8F%D0%BC%D0%B8%20%D0%B1%D1%8E%D0%B4%D0%B6%D0%B5%D1%82%D0%B0%20(BudgetItem)/deleteItemResource-budgetitementity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function deleteBudgetItem(id) {
    return this.request({
        action: ServiceAction.BUDGET_ITEM_DELETE_BY_ID,
        pathParams: { id }
    });
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ???????????? ??????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%81%D1%82%D0%B0%D1%82%D1%8C%D1%8F%D0%BC%D0%B8%20%D0%B1%D1%8E%D0%B4%D0%B6%D0%B5%D1%82%D0%B0%20(BudgetItem)/patchItemResource-budgetitementity-patch_1
 * @param {string} id
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} name
 * @param {BudgetItemGroupEntityDto} budget_item_group
 * @param {boolean} actual
 * @param {boolean} isReplace
 *
 * @return {Promise<SafeResult<BudgetItemEntityDto, Error>>}
 */
export function updateBudgetItem(id, { date_from, date_to, name, budget_item_group, actual }, isReplace = false) {
    return this.request(
        {
            action: isReplace ? ServiceAction.BUDGET_ITEM_REPLACE_BY_ID : ServiceAction.BUDGET_ITEM_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                date_from,
                date_to,
                name,
                budget_item_group,
                actual
            }
        },
        BudgetItemEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????????????? ????????????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B8%D1%81%D1%82%D0%BE%D1%87%D0%BD%D0%B8%D0%BA%D0%B0%D0%BC%D0%B8%20%D1%84%D0%B8%D0%BD%D0%B0%D0%BD%D1%81%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F%20(BudgetSource)/getCollectionResource-budgetsourceentity-get_1_1
 *
 * @return {Promise<SafeResult<BudgetSourceEntityDto[], Error>>}
 */
export function getBudgetSources() {
    return this.request(
        {
            action: ServiceAction.BUDGET_SOURCE_GET
        },
        BudgetSourceEntityDto
    );
}

/**
 * @description ???????????????????? ????????????????: ???????????????? ????????????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B8%D1%81%D1%82%D0%BE%D1%87%D0%BD%D0%B8%D0%BA%D0%B0%D0%BC%D0%B8%20%D1%84%D0%B8%D0%BD%D0%B0%D0%BD%D1%81%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F%20(BudgetSource)/postCollectionResource-budgetsourceentity-post_1
 * @param {string} name
 *
 * @return {Promise<SafeResult<BudgetSourceEntityDto, Error>>}
 */
export function createBudgetSource({ name }) {
    return this.request(
        {
            action: ServiceAction.BUDGET_SOURCE_CREATE,
            params: {
                name
            }
        },
        BudgetSourceEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????????????? ????????????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B8%D1%81%D1%82%D0%BE%D1%87%D0%BD%D0%B8%D0%BA%D0%B0%D0%BC%D0%B8%20%D1%84%D0%B8%D0%BD%D0%B0%D0%BD%D1%81%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F%20(BudgetSource)/getItemResource-budgetsourceentity-get_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<BudgetSourceEntityDto, Error>>}
 */
export function getBudgetSourceById(id) {
    return this.request(
        {
            action: ServiceAction.BUDGET_SOURCE_GET_BY_ID,
            pathParams: { id }
        },
        BudgetSourceEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ???????????????? ????????????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B8%D1%81%D1%82%D0%BE%D1%87%D0%BD%D0%B8%D0%BA%D0%B0%D0%BC%D0%B8%20%D1%84%D0%B8%D0%BD%D0%B0%D0%BD%D1%81%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F%20(BudgetSource)/deleteItemResource-budgetsourceentity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<true, Error>>}
 */
export function deleteBudgetSource(id) {
    return this.request({
        action: ServiceAction.BUDGET_SOURCE_DELETE_BY_ID,
        pathParams: { id }
    });
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ???????????????? ????????????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B8%D1%81%D1%82%D0%BE%D1%87%D0%BD%D0%B8%D0%BA%D0%B0%D0%BC%D0%B8%20%D1%84%D0%B8%D0%BD%D0%B0%D0%BD%D1%81%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F%20(BudgetSource)/patchItemResource-budgetsourceentity-patch_1
 * @param {string} name
 * @param {string} id
 * @param {boolean} isReplace
 *
 * @return {Promise<SafeResult<BudgetSourceEntityDto, Error>>}
 */
export function updateBudgetSource(id, { name }, isReplace = false) {
    return this.request(
        {
            action: isReplace ? ServiceAction.BUDGET_SOURCE_REPLACE_BY_ID : ServiceAction.BUDGET_SOURCE_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                id,
                name
            }
        },
        BudgetSourceEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????????? ??????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D1%8F%D0%BC%D0%B8%20%D0%B1%D1%8E%D0%B4%D0%B6%D0%B5%D1%82%D0%B0%20(Budget)/getItemResource-budgetentity-get_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<BudgetEntityDto, Error>>}
 */
export function getBudgetById(id) {
    return this.request(
        {
            action: ServiceAction.BUDGET_GET_BY_ID,
            pathParams: { id }
        },
        BudgetEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ???????????? ??????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D1%8F%D0%BC%D0%B8%20%D0%B1%D1%8E%D0%B4%D0%B6%D0%B5%D1%82%D0%B0%20(Budget)/deleteItemResource-budgetentity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function deleteBudget(id) {
    return this.request({
        action: ServiceAction.BUDGET_DELETE_BY_ID,
        pathParams: { id }
    });
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ???????????? ??????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D1%8F%D0%BC%D0%B8%20%D0%B1%D1%8E%D0%B4%D0%B6%D0%B5%D1%82%D0%B0%20(Budget)/patchItemResource-budgetentity-patch_1
 * @param {string} id
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} name
 * @param {number} year
 * @param {string} confirm_date
 * @param {number} confirm_employee_id
 * @param {boolean} actual
 * @param {boolean} [isReplace=false]
 *
 * @return {Promise<SafeResult<BudgetEntityDto, Error>>}
 */
export function updateBudget(
    id,
    { date_from, date_to, name, year, confirm_date, confirm_employee_id, actual },
    isReplace = false
) {
    return this.request(
        {
            action: isReplace ? ServiceAction.BUDGET_REPLACE_BY_ID : ServiceAction.BUDGET_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                id,
                date_from,
                date_to,
                name,
                year,
                confirm_date,
                confirm_employee_id,
                actual
            }
        },
        BudgetEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ??????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B0%D1%83%D0%B4%D0%B8%D1%82%D0%BE%D1%80%D0%B8%D1%8F%D0%BC%D0%B8%20(Classroom)/getCollectionResource-classroomentity-get_1_1
 *
 * @return {Promise<SafeResult<ClassroomEntityDto[], Error>>}
 */
export function getClassrooms() {
    return this.request(
        {
            action: ServiceAction.CLASSROOM_GET
        },
        ClassroomEntityDto
    );
}

/**
 * @description ???????????????????? ????????????????: ??????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B0%D1%83%D0%B4%D0%B8%D1%82%D0%BE%D1%80%D0%B8%D1%8F%D0%BC%D0%B8%20(Classroom)/postCollectionResource-classroomentity-post_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} name
 * @param {boolean} actual
 *
 * @return {Promise<SafeResult<ClassroomEntityDto, Error>>}
 */
export function createClassroom({ date_from, date_to, name, actual }) {
    return this.request(
        {
            action: ServiceAction.CLASSROOM_CREATE,
            params: {
                date_from,
                date_to,
                name,
                actual
            }
        },
        ClassroomEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ??????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B0%D1%83%D0%B4%D0%B8%D1%82%D0%BE%D1%80%D0%B8%D1%8F%D0%BC%D0%B8%20(Classroom)/getItemResource-classroomentity-get_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<ClassroomEntityDto, Error>>}
 */
export function getClassroomById(id) {
    return this.request(
        {
            action: ServiceAction.CLASSROOM_GET_BY_ID,
            pathParams: { id }
        },
        ClassroomEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ??????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B0%D1%83%D0%B4%D0%B8%D1%82%D0%BE%D1%80%D0%B8%D1%8F%D0%BC%D0%B8%20(Classroom)/deleteItemResource-classroomentity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function deleteClassroom(id) {
    return this.request({
        action: ServiceAction.CLASSROOM_DELETE_BY_ID,
        pathParams: { id }
    });
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ??????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B0%D1%83%D0%B4%D0%B8%D1%82%D0%BE%D1%80%D0%B8%D1%8F%D0%BC%D0%B8%20(Classroom)/patchItemResource-classroomentity-patch_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} name
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<ClassroomEntityDto, Error>>}
 */
export function updateClassroom(id, { date_from, date_to, name, actual }, isReplace = false) {
    return this.request(
        {
            action: isReplace ? ServiceAction.CLASSROOM_UPDATE_BY_ID : ServiceAction.CLASSROOM_REPLACE_BY_ID,
            pathParams: { id },
            params: {
                date_from,
                date_to,
                name,
                actual
            }
        },
        ClassroomEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ?????? ???????????????? ?? ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%82%D0%B8%D0%BF%D0%B0%D0%BC%D0%B8%20%D0%BA%D0%BE%D0%BD%D1%82%D0%B5%D0%BD%D1%82%D0%B0%20%D0%B2%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B8%20(ContentType)/getCollectionResource-contenttypeentity-get_1_1
 *
 * @return {Promise<SafeResult<ContentTypeEntityDto, Error>>}
 */
export function getContentTypes() {
    return this.request(
        {
            action: ServiceAction.CONTENT_TYPE_GET
        },
        ContentTypeEntityDto
    );
}

/**
 * @description ???????????????????? ????????????????: ?????? ???????????????? ?? ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%82%D0%B8%D0%BF%D0%B0%D0%BC%D0%B8%20%D0%BA%D0%BE%D0%BD%D1%82%D0%B5%D0%BD%D1%82%D0%B0%20%D0%B2%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B8%20(ContentType)/postCollectionResource-contenttypeentity-post_1
 * @param {string} name
 * @param {string} code
 *
 * @return {Promise<SafeResult<ContentTypeEntityDto, Error>>}
 */
export function createContentType({ name, code }) {
    return this.request(
        {
            action: ServiceAction.CONTENT_TYPE_CREATE,
            params: {
                name,
                code
            }
        },
        ContentTypeEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ?????? ???????????????? ?? ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%82%D0%B8%D0%BF%D0%B0%D0%BC%D0%B8%20%D0%BA%D0%BE%D0%BD%D1%82%D0%B5%D0%BD%D1%82%D0%B0%20%D0%B2%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B8%20(ContentType)/getItemResource-contenttypeentity-get_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<ContentTypeEntityDto, Error>>}
 */
export function getContentTypeById(id) {
    return this.request(
        {
            action: ServiceAction.CONTENT_TYPE_GET_BY_ID,
            pathParams: { id }
        },
        ContentTypeEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ?????? ???????????????? ?? ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%82%D0%B8%D0%BF%D0%B0%D0%BC%D0%B8%20%D0%BA%D0%BE%D0%BD%D1%82%D0%B5%D0%BD%D1%82%D0%B0%20%D0%B2%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B8%20(ContentType)/deleteItemResource-contenttypeentity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function deleteContentType(id) {
    return this.request({
        action: ServiceAction.CONTENT_TYPE_DELETE_BY_ID,
        pathParams: { id }
    });
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ?????? ???????????????? ?? ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%82%D0%B8%D0%BF%D0%B0%D0%BC%D0%B8%20%D0%BA%D0%BE%D0%BD%D1%82%D0%B5%D0%BD%D1%82%D0%B0%20%D0%B2%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B8%20(ContentType)/patchItemResource-contenttypeentity-patch_1
 * @param {string} name
 * @param {string} code
 * @param {string} id
 * @param {boolean} isReplace
 *
 * @return {Promise<SafeResult<ContentTypeEntityDto, Error>>}
 */
export function updateContentType(id, { name, code }, isReplace) {
    return this.request(
        {
            action: isReplace ? ServiceAction.CONTENT_TYPE_REPLACE_BY_ID : ServiceAction.CONTENT_TYPE_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                id,
                name,
                code
            }
        },
        ContentTypeEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ?????? ???????????????????????????? ???? ???????????????? (?????????????? ????????????????)
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B2%D0%B8%D0%B4%D0%B0%D0%BC%D0%B8%20%D0%B2%D0%B7%D0%B0%D0%B8%D0%BC%D0%BE%D0%B4%D0%B5%D0%B9%D1%81%D1%82%D0%B2%D0%B8%D1%8F%20%D0%BF%D0%BE%20%D0%B4%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D1%83%20(%D0%BF%D1%80%D0%B5%D0%B4%D0%BC%D0%B5%D1%82%20%D0%B4%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D0%B0)%20(ContractSubject)/getCollectionResource-contractsubjectentity-get_1_1
 *
 * @return {Promise<SafeResult<ContractSubjectEntityDto, Error>>}
 */
export function getContractSubjects() {
    return this.request(
        {
            action: ServiceAction.CONTRACT_SUBJECT_GET
        },
        ContractSubjectEntityDto
    );
}

/**
 * @description ???????????????????? ????????????????: ?????? ???????????????????????????? ???? ???????????????? (?????????????? ????????????????)
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B2%D0%B8%D0%B4%D0%B0%D0%BC%D0%B8%20%D0%B2%D0%B7%D0%B0%D0%B8%D0%BC%D0%BE%D0%B4%D0%B5%D0%B9%D1%81%D1%82%D0%B2%D0%B8%D1%8F%20%D0%BF%D0%BE%20%D0%B4%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D1%83%20(%D0%BF%D1%80%D0%B5%D0%B4%D0%BC%D0%B5%D1%82%20%D0%B4%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D0%B0)%20(ContractSubject)/postCollectionResource-contractsubjectentity-post_1
 * @param {string} name
 *
 * @return {Promise<SafeResult<ContractSubjectEntityDto, Error>>}
 */
export function createContractSubject({ name }) {
    return this.request(
        {
            action: ServiceAction.CONTRACT_SUBJECT_CREATE,
            params: {
                name
            }
        },
        ContractSubjectEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ?????? ???????????????????????????? ???? ???????????????? (?????????????? ????????????????)
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B2%D0%B8%D0%B4%D0%B0%D0%BC%D0%B8%20%D0%B2%D0%B7%D0%B0%D0%B8%D0%BC%D0%BE%D0%B4%D0%B5%D0%B9%D1%81%D1%82%D0%B2%D0%B8%D1%8F%20%D0%BF%D0%BE%20%D0%B4%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D1%83%20(%D0%BF%D1%80%D0%B5%D0%B4%D0%BC%D0%B5%D1%82%20%D0%B4%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D0%B0)%20(ContractSubject)/getItemResource-contractsubjectentity-get_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<ContractSubjectEntityDto, Error>>}
 */
export function getContractSubjectById(id) {
    return this.request(
        {
            action: ServiceAction.CONTRACT_SUBJECT_GET_BY_ID,
            pathParams: { id }
        },
        ContractSubjectEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ?????? ???????????????????????????? ???? ???????????????? (?????????????? ????????????????)
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B2%D0%B8%D0%B4%D0%B0%D0%BC%D0%B8%20%D0%B2%D0%B7%D0%B0%D0%B8%D0%BC%D0%BE%D0%B4%D0%B5%D0%B9%D1%81%D1%82%D0%B2%D0%B8%D1%8F%20%D0%BF%D0%BE%20%D0%B4%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D1%83%20(%D0%BF%D1%80%D0%B5%D0%B4%D0%BC%D0%B5%D1%82%20%D0%B4%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D0%B0)%20(ContractSubject)/deleteItemResource-contractsubjectentity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<true, Error>>}
 */
export function deleteContractSubject(id) {
    return this.request({
        action: ServiceAction.CONTRACT_SUBJECT_DELETE_BY_ID,
        pathParams: { id }
    });
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ?????? ???????????????????????????? ???? ???????????????? (?????????????? ????????????????)
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B2%D0%B8%D0%B4%D0%B0%D0%BC%D0%B8%20%D0%B2%D0%B7%D0%B0%D0%B8%D0%BC%D0%BE%D0%B4%D0%B5%D0%B9%D1%81%D1%82%D0%B2%D0%B8%D1%8F%20%D0%BF%D0%BE%20%D0%B4%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D1%83%20(%D0%BF%D1%80%D0%B5%D0%B4%D0%BC%D0%B5%D1%82%20%D0%B4%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D0%B0)%20(ContractSubject)/patchItemResource-contractsubjectentity-patch_1
 * @param {string} id
 * @param {string} name
 * @param {boolean} isReplace
 *
 * @return {Promise<SafeResult<ContractSubjectEntityDto, Error>>}
 */
export function updateContractSubject(id, { name }, isReplace = false) {
    return this.request(
        {
            action: isReplace
                ? ServiceAction.CONTRACT_SUBJECT_REPLACE_BY_ID
                : ServiceAction.CONTRACT_SUBJECT_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                id,
                name
            }
        },
        ContractSubjectEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ?????? ??????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%82%D0%B8%D0%BF%D0%B0%D0%BC%D0%B8%20%D0%B4%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D0%BE%D0%B2%20(DocumentType)/getCollectionResource-documenttypeentity-get_1_1
 *
 * @return {Promise<SafeResult<DocumentTypeEntityDto[], Error>>}
 */
export function getDocumentTypes() {
    return this.request(
        {
            action: ServiceAction.DOCUMENT_TYPE_GET
        },
        DocumentTypeEntityDto
    );
}

/**
 * @description ???????????????????? ????????????????: ?????? ??????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%82%D0%B8%D0%BF%D0%B0%D0%BC%D0%B8%20%D0%B4%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D0%BE%D0%B2%20(DocumentType)/postCollectionResource-documenttypeentity-post_1
 * @param {string} external_id
 * @param {string} short_name
 * @param {string} name
 * @param {string} description
 *
 * @return {Promise<SafeResult<DocumentTypeEntityDto, Error>>}
 */
export function createDocumentType({ external_id, short_name, name, description }) {
    return this.request(
        {
            action: ServiceAction.DOCUMENT_TYPE_CREATE,
            params: {
                external_id,
                short_name,
                name,
                description
            }
        },
        DocumentTypeEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ?????? ??????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%82%D0%B8%D0%BF%D0%B0%D0%BC%D0%B8%20%D0%B4%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D0%BE%D0%B2%20(DocumentType)/getItemResource-documenttypeentity-get_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<DocumentTypeEntityDto, Error>>}
 */
export function getDocumentTypeById(id) {
    return this.request(
        {
            action: ServiceAction.DOCUMENT_TYPE_GET_BY_ID,
            pathParams: { id }
        },
        DocumentTypeEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ?????? ??????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%82%D0%B8%D0%BF%D0%B0%D0%BC%D0%B8%20%D0%B4%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D0%BE%D0%B2%20(DocumentType)/deleteItemResource-documenttypeentity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<true, Error>>}
 */
export function deleteDocumentType(id) {
    return this.request({
        action: ServiceAction.DOCUMENT_TYPE_DELETE_BY_ID,
        pathParams: { id }
    });
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ?????? ??????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%82%D0%B8%D0%BF%D0%B0%D0%BC%D0%B8%20%D0%B4%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D0%BE%D0%B2%20(DocumentType)/patchItemResource-documenttypeentity-patch_1
 * @param {string} id
 * @param {string} external_id
 * @param {string} short_name
 * @param {string} name
 * @param {string} description
 * @param {boolean} isReplace
 *
 * @return {Promise<SafeResult<DocumentTypeEntityDto, Error>>}
 */
export function updateDocumentType(id, { external_id, short_name, name, description }, isReplace = false) {
    return this.request(
        {
            action: isReplace ? ServiceAction.DOCUMENT_TYPE_REPLACE_BY_ID : ServiceAction.DOCUMENT_TYPE_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                external_id,
                short_name,
                name,
                description
            }
        },
        DocumentTypeEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????? ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%81%D1%80%D0%BE%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%B4%D0%B5%D0%B9%D1%81%D1%82%D0%B2%D0%B8%D1%8F%20(Duration)/getCollectionResource-durationentity-get_1_1
 *
 * @return {Promise<SafeResult<DurationEntityDto, Error>>}
 */
export function getDurations() {
    return this.request(
        {
            action: ServiceAction.DURATION_GET
        },
        DurationEntityDto
    );
}

/**
 * @description ???????????????????? ????????????????: ???????? ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%81%D1%80%D0%BE%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%B4%D0%B5%D0%B9%D1%81%D1%82%D0%B2%D0%B8%D1%8F%20(Duration)/postCollectionResource-durationentity-post_1
 * @param {string} name
 * @param {number} years
 * @param {number} months
 * @param {number} days
 *
 * @return {Promise<SafeResult<DurationEntityDto, Error>>}
 */
export function createDuration({ name, years, months, days }) {
    return this.request(
        {
            action: ServiceAction.DURATION_CREATE,
            params: {
                name,
                years,
                months,
                days
            }
        },
        DurationEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????? ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%81%D1%80%D0%BE%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%B4%D0%B5%D0%B9%D1%81%D1%82%D0%B2%D0%B8%D1%8F%20(Duration)/getItemResource-durationentity-get_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<DurationEntityDto, Error>>}
 */
export function getDurationById(id) {
    return this.request(
        {
            action: ServiceAction.DURATION_GET_BY_ID,
            pathParams: { id }
        },
        DurationEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ???????? ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%81%D1%80%D0%BE%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%B4%D0%B5%D0%B9%D1%81%D1%82%D0%B2%D0%B8%D1%8F%20(Duration)/deleteItemResource-durationentity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<true, Error>>}
 */
export function deleteDuration(id) {
    return this.request({
        action: ServiceAction.DURATION_DELETE_BY_ID,
        pathParams: { id }
    });
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ???????? ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%81%D1%80%D0%BE%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%B4%D0%B5%D0%B9%D1%81%D1%82%D0%B2%D0%B8%D1%8F%20(Duration)/patchItemResource-durationentity-patch_1
 * @param {string} id
 * @param {string} name
 * @param {number} years
 * @param {number} months
 * @param {number} days
 * @param {boolean} isReplace
 *
 * @return {Promise<SafeResult<DurationEntityDto, Error>>}
 */
export function updateDuration(id, { name, years, months, days }, isReplace = false) {
    return this.request(
        {
            action: isReplace ? ServiceAction.DURATION_REPLACE_BY_ID : ServiceAction.DURATION_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                name,
                years,
                months,
                days
            }
        },
        DurationEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ?????????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B5%D0%BC%20(LearningCourse)/getCollectionResource-learningcourseentity-get_1_1
 *
 * @return {Promise<SafeResult<LearningCourseEntityDto[], Error>>}
 */
// prettier-ignore
export function getLearningCourses() {
    return this.request({
        action: ServiceAction.LEARNING_COURSE_GET
    }, LearningCourseEntityDto);
}

/**
 * @description ???????????????????? ????????????????: ?????????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B5%D0%BC%20(LearningCourse)/postCollectionResource-learningcourseentity-post_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} external_id
 * @param {string} code
 * @param {boolean} is_start_ready
 * @param {string} date_start
 * @param {string} date_end
 * @param {string} request_date_start
 * @param {string} request_date_end
 * @param {string} name
 * @param {string} short_name
 * @param {string} description
 * @param {string} cover_url
 * @param {number} duration_hours
 * @param {number} duration_days
 * @param {number} score_success
 * @param {number} price
 * @param {boolean} is_mandatory
 * @param {boolean} is_request_commit_head
 * @param {boolean} is_request_commit_hr
 * @param {number} student_count_min
 * @param {number} student_count_max
 * @param {StudyProviderEntityDto} study_provider
 * @param {StudyExpertEntityDto} study_expert
 * @param {StudyLocationEntityDto} study_location
 * @param {LearningCourseTypeEntityDto} learning_course_type
 * @param {string} catalog
 * @param {Array} learning_course_steps
 * @param {Array} learning_course_competences
 * @param {Array} learning_course_learning_course_groups
 * @param {Array} learning_course_message
 * @param {Array} learning_course_curators
 * @param {Array} learning_course_parties
 * @param {boolean} actual
 *
 * @return {Promise<SafeResult<LearningCourseEntityDto, Error>>}
 */
export function createLearningCourse({
    date_from,
    date_to,
    external_id,
    code,
    is_start_ready,
    date_start,
    date_end,
    request_date_start,
    request_date_end,
    name,
    short_name,
    description,
    cover_url,
    duration_hours,
    duration_days,
    score_success,
    price,
    is_mandatory,
    is_request_commit_head,
    is_request_commit_hr,
    student_count_min,
    student_count_max,
    study_provider,
    study_expert,
    study_location,
    learning_course_type,
    catalog,
    learning_course_steps,
    learning_course_competences,
    learning_course_learning_course_groups,
    learning_course_message,
    learning_course_curators,
    learning_course_parties,
    actual
}) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_CREATE,
            params: {
                date_from,
                date_to,
                external_id,
                code,
                is_start_ready,
                date_start,
                date_end,
                request_date_start,
                request_date_end,
                name,
                short_name,
                description,
                cover_url,
                duration_hours,
                duration_days,
                score_success,
                price,
                is_mandatory,
                is_request_commit_head,
                is_request_commit_hr,
                student_count_min,
                student_count_max,
                study_provider,
                study_expert,
                study_location,
                learning_course_type,
                catalog,
                learning_course_steps,
                learning_course_competences,
                learning_course_learning_course_groups,
                learning_course_message,
                learning_course_curators,
                learning_course_parties,
                actual
            }
        },
        LearningCourseEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ?????????? ???????????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B0%D0%BD%D0%BE%D0%BD%D1%81%D0%B0%D0%BC%D0%B8%20(LearningCourseAnnouncement)/getCollectionResource-learningcourseannouncemententity-get_1_1
 *
 * @return {Promise<SafeResult<LearningCourseAnnouncementEntityDto[], Error>>}
 */
export function getLearningCourseAnnouncements() {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_ANNOUNCEMENT_GET
        },
        LearningCourseAnnouncementEntityDto
    );
}

/**
 * @description ???????????????????? ????????????????: ?????????? ???????????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B0%D0%BD%D0%BE%D0%BD%D1%81%D0%B0%D0%BC%D0%B8%20(LearningCourseAnnouncement)/postCollectionResource-learningcourseannouncemententity-post_1
 * @param {string|Date} date_from
 * @param {string|number} learning_course
 * @param {string|Date} [date_to]
 * @param {string|Date} [date_start]
 * @param {string|Date} [date_end]
 * @param {string} [title]
 * @param {string} [description]
 * @param {string} [photo_url]
 * @param {boolean} [actual]
 *
 * @return {Promise<SafeResult<LearningCourseAnnouncementEntityDto, Error>>}
 */
export function createLearningCourseAnnouncement({
    date_from,
    date_to,
    date_start,
    date_end,
    title,
    description,
    photo_url,
    learning_course,
    actual
}) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_ANNOUNCEMENT_CREATE,
            params: {
                date_from,
                date_to,
                date_start,
                date_end,
                title,
                description,
                photo_url,
                learning_course,
                actual
            }
        },
        LearningCourseAnnouncementEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ?????????? ???????????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B0%D0%BD%D0%BE%D0%BD%D1%81%D0%B0%D0%BC%D0%B8%20(LearningCourseAnnouncement)/getItemResource-learningcourseannouncemententity-get_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningCourseAnnouncementEntityDto, Error>>}
 */
export function getLearningCourseAnnouncementById(id) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_ANNOUNCEMENT_GET_BY_ID,
            pathParams: { id }
        },
        LearningCourseAnnouncementEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ?????????? ???????????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B0%D0%BD%D0%BE%D0%BD%D1%81%D0%B0%D0%BC%D0%B8%20(LearningCourseAnnouncement)/deleteItemResource-learningcourseannouncemententity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<true, Error>>}
 */
export function deleteLearningCourseAnnouncement(id) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_ANNOUNCEMENT_DELETE_BY_ID,
            pathParams: { id }
        },
        true
    );
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ?????????? ???????????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B0%D0%BD%D0%BE%D0%BD%D1%81%D0%B0%D0%BC%D0%B8%20(LearningCourseAnnouncement)/patchItemResource-learningcourseannouncemententity-patch_1
 * @param {string?number} id
 * @param {string|number} learning_course
 * @param {string|Date} date_from
 * @param {string|Date} [date_to]
 * @param {string|Date} [date_start]
 * @param {string|Date} [date_end]
 * @param {string} [title]
 * @param {string} [description]
 * @param {string} [photo_url]
 * @param {boolean} [actual]
 * @param {boolean} [isReplace=false]
 *
 * @return {Promise<SafeResult<LearningCourseAnnouncementEntityDto, Error>>}
 */
export function updateLearningCourseAnnouncement(
    id,
    { date_from, date_to, date_start, date_end, title, description, photo_url, learning_course, actual },
    isReplace = false
) {
    return this.request(
        {
            action: isReplace
                ? ServiceAction.LEARNING_COURSE_ANNOUNCEMENT_REPLACE_BY_ID
                : ServiceAction.LEARNING_COURSE_ANNOUNCEMENT_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                date_from,
                date_to,
                date_start,
                date_end,
                title,
                description,
                photo_url,
                learning_course,
                actual
            }
        },
        LearningCourseAnnouncementEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????????? ??????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%BE%D0%B1%D1%83%D1%87%D0%B0%D1%8E%D1%89%D0%B8%D1%85%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20%D0%BA%20%D1%81%D1%82%D0%B0%D1%82%D1%8C%D1%8F%D0%BC%20%D0%B1%D1%8E%D0%B4%D0%B6%D0%B5%D1%82%D0%B0%20(LearningCourseBudgetItem)/getCollectionResource-learningcoursebudgetitementity-get_1_1
 *
 * @return {Promise<SafeResult<LearningCourseBudgetItemEntityDto[], Error>>}
 */
export function getLearningCourseBudgetItems() {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_BUDGET_ITEM_GET
        },
        LearningCourseBudgetItemEntityDto
    );
}

/**
 * @description ???????????????????? ????????????????: ???????????? ??????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%BE%D0%B1%D1%83%D1%87%D0%B0%D1%8E%D1%89%D0%B8%D1%85%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20%D0%BA%20%D1%81%D1%82%D0%B0%D1%82%D1%8C%D1%8F%D0%BC%20%D0%B1%D1%8E%D0%B4%D0%B6%D0%B5%D1%82%D0%B0%20(LearningCourseBudgetItem)/postCollectionResource-learningcoursebudgetitementity-post_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {boolean} is_per_user
 * @param {number} amount
 * @param {string} learning_course
 * @param {BudgetItemEntityDto} budget_item
 * @param {BudgetSourceEntityDto} budget_source
 * @param {boolean} actual
 *
 * @return {Promise<SafeResult<LearningCourseBudgetItemEntityDto, Error>>}
 */
export function createLearningCourseBudgetItem({
    date_from,
    date_to,
    is_per_user,
    amount,
    learning_course,
    budget_item,
    budget_source,
    actual
}) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_BUDGET_ITEM_CREATE,
            params: {
                date_from,
                date_to,
                is_per_user,
                amount,
                learning_course,
                budget_item,
                budget_source,
                actual
            }
        },
        LearningCourseBudgetItemEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????????? ??????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%BE%D0%B1%D1%83%D1%87%D0%B0%D1%8E%D1%89%D0%B8%D1%85%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20%D0%BA%20%D1%81%D1%82%D0%B0%D1%82%D1%8C%D1%8F%D0%BC%20%D0%B1%D1%8E%D0%B4%D0%B6%D0%B5%D1%82%D0%B0%20(LearningCourseBudgetItem)/getItemResource-learningcoursebudgetitementity-get_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningCourseBudgetItemEntityDto, Error>>}
 */
export function getLearningCourseBudgetItemById(id) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_BUDGET_ITEM_GET_BY_ID,
            pathParams: { id }
        },
        LearningCourseBudgetItemEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ???????????? ??????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%BE%D0%B1%D1%83%D1%87%D0%B0%D1%8E%D1%89%D0%B8%D1%85%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20%D0%BA%20%D1%81%D1%82%D0%B0%D1%82%D1%8C%D1%8F%D0%BC%20%D0%B1%D1%8E%D0%B4%D0%B6%D0%B5%D1%82%D0%B0%20(LearningCourseBudgetItem)/deleteItemResource-learningcoursebudgetitementity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<true, Error>>}
 */
export function deleteLearningCourseBudgetItem(id) {
    return this.request({
        action: ServiceAction.LEARNING_COURSE_BUDGET_ITEM_DELETE_BY_ID,
        pathParams: { id }
    });
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ???????????? ??????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%BE%D0%B1%D1%83%D1%87%D0%B0%D1%8E%D1%89%D0%B8%D1%85%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20%D0%BA%20%D1%81%D1%82%D0%B0%D1%82%D1%8C%D1%8F%D0%BC%20%D0%B1%D1%8E%D0%B4%D0%B6%D0%B5%D1%82%D0%B0%20(LearningCourseBudgetItem)/patchItemResource-learningcoursebudgetitementity-patch_1
 * @param {string} id
 * @param {string} date_from
 * @param {string} date_to
 * @param {boolean} is_per_user
 * @param {number} amount
 * @param {string} learning_course
 * @param {string} budget_item
 * @param {string} budget_source
 * @param {boolean} actual
 * @param {boolean} isReplace
 *
 * @return {Promise<SafeResult<LearningCourseBudgetItemEntityDto, Error>>}
 */
export function updateLearningCourseBudgetItem(
    id,
    { date_from, date_to, is_per_user, amount, learning_course, budget_item, budget_source, actual },
    isReplace = false
) {
    return this.request(
        {
            action: isReplace
                ? ServiceAction.LEARNING_COURSE_BUDGET_ITEM_REPLACE_BY_ID
                : ServiceAction.LEARNING_COURSE_BUDGET_ITEM_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                date_from,
                date_to,
                is_per_user,
                amount,
                learning_course,
                budget_item,
                budget_source,
                actual
            }
        },
        LearningCourseBudgetItemEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ?????????????? ????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BA%D0%B0%D1%82%D0%B0%D0%BB%D0%BE%D0%B3%D0%B0%D0%BC%D0%B8%20%D0%BA%D1%83%D1%80%D1%81%D0%BE%D0%B2%20(LearningCourseCatalog)/getCollectionResource-learningcoursecatalogentity-get_1_1
 *
 * @return {Promise<SafeResult<LearningCourseCatalogEntityDto[], Error>>}
 */
export function getLearningCourseCatalogs() {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_CATALOG_GET
        },
        LearningCourseCatalogEntityDto
    );
}

/**
 * @description ???????????????????? ????????????????: ?????????????? ????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BA%D0%B0%D1%82%D0%B0%D0%BB%D0%BE%D0%B3%D0%B0%D0%BC%D0%B8%20%D0%BA%D1%83%D1%80%D1%81%D0%BE%D0%B2%20(LearningCourseCatalog)/postCollectionResource-learningcoursecatalogentity-post_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {number} parent_id
 * @param {string} external_id
 * @param {string} name
 * @param {number} member_count
 * @param {boolean} actual
 *
 * @return {Promise<SafeResult<LearningCourseCatalogEntityDto, Error>>}
 */
export function createLearningCourseCatalog({
    date_from,
    date_to,
    parent_id,
    external_id,
    name,
    member_count,
    actual
}) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_CATALOG_CREATE,
            params: {
                date_from,
                date_to,
                parent_id,
                external_id,
                name,
                member_count,
                actual
            }
        },
        LearningCourseCatalogEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ?????????????? ????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BA%D0%B0%D1%82%D0%B0%D0%BB%D0%BE%D0%B3%D0%B0%D0%BC%D0%B8%20%D0%BA%D1%83%D1%80%D1%81%D0%BE%D0%B2%20(LearningCourseCatalog)/getItemResource-learningcoursecatalogentity-get_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningCourseCatalogEntityDto, Error>>}
 */
export function getLearningCourseCatalogById(id) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_CATALOG_GET_BY_ID,
            pathParams: { id }
        },
        LearningCourseCatalogEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ?????????????? ????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BA%D0%B0%D1%82%D0%B0%D0%BB%D0%BE%D0%B3%D0%B0%D0%BC%D0%B8%20%D0%BA%D1%83%D1%80%D1%81%D0%BE%D0%B2%20(LearningCourseCatalog)/deleteItemResource-learningcoursecatalogentity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<true, Error>>}
 */
export function deleteLearningCourseCatalog(id) {
    return this.request({
        action: ServiceAction.LEARNING_COURSE_CATALOG_DELETE_BY_ID,
        pathParams: { id }
    });
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ?????????????? ????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BA%D0%B0%D1%82%D0%B0%D0%BB%D0%BE%D0%B3%D0%B0%D0%BC%D0%B8%20%D0%BA%D1%83%D1%80%D1%81%D0%BE%D0%B2%20(LearningCourseCatalog)/patchItemResource-learningcoursecatalogentity-patch_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {number} parent_id
 * @param {string} external_id
 * @param {string} name
 * @param {number} member_count
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningCourseCatalogEntityDto, Error>>}
 */
export function updateLearningCourseCatalog(
    id,
    { date_from, date_to, parent_id, external_id, name, member_count, actual },
    isReplace = false
) {
    return this.request(
        {
            action: isReplace
                ? ServiceAction.LEARNING_COURSE_CATALOG_REPLACE_BY_ID
                : ServiceAction.LEARNING_COURSE_CATALOG_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                date_from,
                date_to,
                parent_id,
                external_id,
                name,
                member_count,
                actual
            }
        },
        LearningCourseCatalogEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ?????????????? ???????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BA%D1%83%D1%80%D0%B0%D1%82%D0%BE%D1%80%D0%B0%D0%BC%D0%B8%20%D0%BE%D0%B1%D1%83%D1%87%D0%B0%D1%8E%D1%89%D0%B8%D1%85%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(LearningCourseCurator)/getCollectionResource-learningcoursecuratorentity-get_1_1
 *
 * @return {Promise<SafeResult<LearningCourseCatalogEntityDto[], Error>>}
 */
export function getLearningCourseCurators() {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_CURATOR_GET
        },
        LearningCourseCatalogEntityDto
    );
}

/**
 * @description ???????????????????? ????????????????: ?????????????? ???????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BA%D1%83%D1%80%D0%B0%D1%82%D0%BE%D1%80%D0%B0%D0%BC%D0%B8%20%D0%BE%D0%B1%D1%83%D1%87%D0%B0%D1%8E%D1%89%D0%B8%D1%85%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(LearningCourseCurator)/postCollectionResource-learningcoursecuratorentity-post_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} learning_course
 * @param {number} employee_id
 * @param {boolean} actual
 *
 * @return {Promise<SafeResult<LearningCourseCuratorEntityDto, Error>>}
 */
export function createLearningCourseCurator({ date_from, date_to, learning_course, employee_id, actual }) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_CURATOR_CREATE,
            params: {
                date_from,
                date_to,
                learning_course,
                employee_id,
                actual
            }
        },
        LearningCourseCuratorEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ?????????????? ???????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BA%D1%83%D1%80%D0%B0%D1%82%D0%BE%D1%80%D0%B0%D0%BC%D0%B8%20%D0%BE%D0%B1%D1%83%D1%87%D0%B0%D1%8E%D1%89%D0%B8%D1%85%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(LearningCourseCurator)/getItemResource-learningcoursecuratorentity-get_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningCourseCuratorEntityDto, Error>>}
 */
export function getLearningCourseCurator(id) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_CURATOR_GET_BY_ID,
            pathParams: { id }
        },
        LearningCourseCuratorEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ?????????????? ???????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BA%D1%83%D1%80%D0%B0%D1%82%D0%BE%D1%80%D0%B0%D0%BC%D0%B8%20%D0%BE%D0%B1%D1%83%D1%87%D0%B0%D1%8E%D1%89%D0%B8%D1%85%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(LearningCourseCurator)/deleteItemResource-learningcoursecuratorentity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<true, Error>>}
 */
export function deleteLearningCourseCurator(id) {
    return this.request({
        action: ServiceAction.LEARNING_COURSE_CURATOR_DELETE_BY_ID,
        pathParams: { id }
    });
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ?????????????? ???????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BA%D1%83%D1%80%D0%B0%D1%82%D0%BE%D1%80%D0%B0%D0%BC%D0%B8%20%D0%BE%D0%B1%D1%83%D1%87%D0%B0%D1%8E%D1%89%D0%B8%D1%85%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(LearningCourseCurator)/patchItemResource-learningcoursecuratorentity-patch_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} learning_course
 * @param {number} employee_id
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningCourseCuratorEntityDto, Error>>}
 */
export function updateLearningCourseCurator(
    id,
    { date_from, date_to, learning_course, employee_id, actual },
    isReplace = false
) {
    return this.request(
        {
            action: isReplace
                ? ServiceAction.LEARNING_COURSE_CURATOR_REPLACE_BY_ID
                : ServiceAction.LEARNING_COURSE_CURATOR_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                date_from,
                date_to,
                learning_course,
                employee_id,
                actual
            }
        },
        LearningCourseCuratorEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????????????? ?????????? ???????????????????? ?? ????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%B2%D0%B8%D0%B4%D0%BE%D0%B2%20%D0%B4%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D0%BE%D0%B2%20%D0%BA%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D1%8F%D0%BC%20(LearningCourseDocumentType)/getCollectionResource-learningcoursedocumenttypeentity-get_1_1
 *
 * @return {Promise<SafeResult<LearningCourseDocumentTypeEntityDto[], Error>>}
 */
export function getLearningCourseDocumentTypes() {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_DOCUMENT_TYPE_GET
        },
        LearningCourseDocumentTypeEntityDto
    );
}

/**
 * @description ???????????????????? ????????????????: ???????????????? ?????????? ???????????????????? ?? ????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%B2%D0%B8%D0%B4%D0%BE%D0%B2%20%D0%B4%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D0%BE%D0%B2%20%D0%BA%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D1%8F%D0%BC%20(LearningCourseDocumentType)/postCollectionResource-learningcoursedocumenttypeentity-post_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} template_url
 * @param {string} duration
 * @param {string} learning_course
 * @param {DocumentTypeEntityDto} document_type
 * @param {boolean} actual
 *
 * @return {Promise<SafeResult<LearningCourseDocumentTypeEntityDto, Error>>}
 */
export function createLearningCourseDocumentType({
    date_from,
    date_to,
    template_url,
    duration,
    learning_course,
    document_type,
    actual
}) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_DOCUMENT_TYPE_CREATE,
            params: {
                date_from,
                date_to,
                template_url,
                duration,
                learning_course,
                document_type,
                actual
            }
        },
        LearningCourseDocumentTypeEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????????????? ?????????? ???????????????????? ?? ????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%B2%D0%B8%D0%B4%D0%BE%D0%B2%20%D0%B4%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D0%BE%D0%B2%20%D0%BA%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D1%8F%D0%BC%20(LearningCourseDocumentType)/getItemResource-learningcoursedocumenttypeentity-get_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningCourseDocumentTypeEntityDto, Error>>}
 */
export function getLearningCourseDocumentType(id) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_DOCUMENT_TYPE_GET_BY_ID,
            pathParams: { id }
        },
        LearningCourseDocumentTypeEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????? ??????????????: ???????????????? ?????????? ???????????????????? ?? ????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%B2%D0%B8%D0%B4%D0%BE%D0%B2%20%D0%B4%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D0%BE%D0%B2%20%D0%BA%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D1%8F%D0%BC%20(LearningCourseDocumentType)/putItemResource-learningcoursedocumenttypeentity-put_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} template_url
 * @param {string} duration
 * @param {string} learning_course
 * @param {DocumentTypeEntityDto} document_type
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningCourseDocumentTypeEntityDto, Error>>}
 */
export function replaceLearningCourseDocumentType(
    id,
    { date_from, date_to, template_url, duration, learning_course, document_type, actual }
) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_DOCUMENT_TYPE_REPLACE_BY_ID,
            pathParams: { id },
            params: {
                date_from,
                date_to,
                template_url,
                duration,
                learning_course,
                document_type,
                actual
            }
        },
        LearningCourseDocumentTypeEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ???????????????? ?????????? ???????????????????? ?? ????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%B2%D0%B8%D0%B4%D0%BE%D0%B2%20%D0%B4%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D0%BE%D0%B2%20%D0%BA%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D1%8F%D0%BC%20(LearningCourseDocumentType)/deleteItemResource-learningcoursedocumenttypeentity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<true, Error>>}
 */
export function deleteLearningCourseDocumentType(id) {
    return this.request({
        action: ServiceAction.LEARNING_COURSE_DOCUMENT_TYPE_DELETE_BY_ID,
        pathParams: { id }
    });
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ???????????????? ?????????? ???????????????????? ?? ????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%B2%D0%B8%D0%B4%D0%BE%D0%B2%20%D0%B4%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D0%BE%D0%B2%20%D0%BA%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D1%8F%D0%BC%20(LearningCourseDocumentType)/patchItemResource-learningcoursedocumenttypeentity-patch_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} template_url
 * @param {string} duration
 * @param {string} learning_course
 * @param {DocumentTypeEntityDto} document_type
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningCourseDocumentTypeEntityDto, Error>>}
 */
export function updateLearningCourseDocumentType(
    id,
    { date_from, date_to, template_url, duration, learning_course, document_type, actual }
) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_DOCUMENT_TYPE_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                date_from,
                date_to,
                template_url,
                duration,
                learning_course,
                document_type,
                actual
            }
        },
        LearningCourseDocumentTypeEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????????? ?????????????????????? ?????????????????????? (????????????????)
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B3%D1%80%D1%83%D0%BF%D0%BF%D0%B0%D0%BC%D0%B8%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D1%85%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(LearningCourseGroup)/getCollectionResource-learningcoursegroupentity-get_1_1
 *
 * @return {Promise<SafeResult<LearningCourseGroupEntityDto, Error>>}
 */
export function getLearningCourseGroups() {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_GROUP_GET
        },
        LearningCourseGroupEntityDto
    );
}

/**
 * @description ???????????????????? ????????????????: ???????????? ?????????????????????? ?????????????????????? (????????????????)
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B3%D1%80%D1%83%D0%BF%D0%BF%D0%B0%D0%BC%D0%B8%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D1%85%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(LearningCourseGroup)/postCollectionResource-learningcoursegroupentity-post_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} name
 * @param {string} description
 * @param {string} image_url
 * @param {string} date_start
 * @param {string} date_end
 * @param {boolean} actual
 *
 * @return {Promise<SafeResult<LearningCourseGroupEntityDto, Error>>}
 */
export function createLearningCourseGroup({
    date_from,
    date_to,
    name,
    description,
    image_url,
    date_start,
    date_end,
    actual
}) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_GROUP_CREATE,
            params: {
                date_from,
                date_to,
                name,
                description,
                image_url,
                date_start,
                date_end,
                actual
            }
        },
        LearningCourseGroupEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????????? ?????????????????????? ?????????????????????? (????????????????)
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B3%D1%80%D1%83%D0%BF%D0%BF%D0%B0%D0%BC%D0%B8%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D1%85%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(LearningCourseGroup)/getItemResource-learningcoursegroupentity-get_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningCourseGroupEntityDto, Error>>}
 */
export function getLearningCourseGroup(id) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_GROUP_GET_BY_ID,
            pathParams: { id }
        },
        LearningCourseGroupEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????? ??????????????: ???????????? ?????????????????????? ?????????????????????? (????????????????)
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B3%D1%80%D1%83%D0%BF%D0%BF%D0%B0%D0%BC%D0%B8%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D1%85%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(LearningCourseGroup)/putItemResource-learningcoursegroupentity-put_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} name
 * @param {string} description
 * @param {string} image_url
 * @param {string} date_start
 * @param {string} date_end
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningCourseGroupEntityDto, Error>>}
 */
export function replaceLearningCourseGroup(
    id,
    { date_from, date_to, name, description, image_url, date_start, date_end, actual }
) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_GROUP_REPLACE_BY_ID,
            pathParams: { id },
            params: {
                date_from,
                date_to,
                name,
                description,
                image_url,
                date_start,
                date_end,
                actual
            }
        },
        LearningCourseGroupEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ???????????? ?????????????????????? ?????????????????????? (????????????????)
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B3%D1%80%D1%83%D0%BF%D0%BF%D0%B0%D0%BC%D0%B8%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D1%85%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(LearningCourseGroup)/deleteItemResource-learningcoursegroupentity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<true, Error>>}
 */
export function deleteLearningCourseGroup(id) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_GROUP_DELETE_BY_ID,
            pathParams: { id }
        },
        true
    );
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ???????????? ?????????????????????? ?????????????????????? (????????????????)
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B3%D1%80%D1%83%D0%BF%D0%BF%D0%B0%D0%BC%D0%B8%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D1%85%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(LearningCourseGroup)/patchItemResource-learningcoursegroupentity-patch_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} name
 * @param {string} description
 * @param {string} image_url
 * @param {string} date_start
 * @param {string} date_end
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningCourseGroupEntityDto, Error>>}
 */
export function updateLearningCourseGroup(
    id,
    { date_from, date_to, name, description, image_url, date_start, date_end, actual }
) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_GROUP_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                date_from,
                date_to,
                name,
                description,
                image_url,
                date_start,
                date_end,
                actual
            }
        },
        LearningCourseGroupEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????????????? ???????????????? ?? ????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%BF%D0%BE%D0%B4%D0%B1%D0%BE%D1%80%D0%BE%D0%BA%20%D0%BA%20%D0%BA%D1%83%D1%80%D1%81%D0%B0%D0%BC%20(LearningCourseLearningCourseGroup)/getCollectionResource-learningcourselearningcoursegroupentity-get_1_1
 *
 * @return {Promise<SafeResult<LearningCourseGroupBindingDto[], Error>>}
 */
export function getLearningCourseGroupBindings() {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_LEARNING_COURSE_GROUP_GET
        },
        LearningCourseGroupBindingDto
    );
}

/**
 * @description ???????????????????? ????????????????: ???????????????? ???????????????? ?? ????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%BF%D0%BE%D0%B4%D0%B1%D0%BE%D1%80%D0%BE%D0%BA%20%D0%BA%20%D0%BA%D1%83%D1%80%D1%81%D0%B0%D0%BC%20(LearningCourseLearningCourseGroup)/postCollectionResource-learningcourselearningcoursegroupentity-post_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} learningCourse
 * @param {string} learningCourseGroup
 * @param {boolean} actual
 * @param {number} learning_course_group
 * @param {number} learning_course
 *
 * @return {Promise<SafeResult<LearningCourseGroupBindingDto, Error>>}
 */
export function createLearningCourseGroupBinding({
    date_from,
    date_to,
    learningCourse,
    learningCourseGroup,
    actual,
    learning_course_group,
    learning_course
}) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_LEARNING_COURSE_GROUP_CREATE,
            params: {
                date_from,
                date_to,
                learningCourse,
                learningCourseGroup,
                actual,
                learning_course_group,
                learning_course
            }
        },
        LearningCourseGroupBindingDto
    );
}

/**
 * @description undefined
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%BF%D0%BE%D0%B4%D0%B1%D0%BE%D1%80%D0%BE%D0%BA%20%D0%BA%20%D0%BA%D1%83%D1%80%D1%81%D0%B0%D0%BC%20(LearningCourseLearningCourseGroup)/executeSearch-learningcourselearningcoursegroupentity-get_1
 * @param {string[]} groupIds
 *
 * @return {Promise<SafeResult<LearningCourseGroupBindingDto[], Error>>}
 */
export function getLearningCourseGroupBindingsByGroupIds(groupIds) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_LEARNING_COURSE_GROUP_SEARCH_FIND_BY_GROUP_GET,
            params: { id: groupIds }
        },
        LearningCourseGroupBindingDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????????????? ???????????????? ?? ????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%BF%D0%BE%D0%B4%D0%B1%D0%BE%D1%80%D0%BE%D0%BA%20%D0%BA%20%D0%BA%D1%83%D1%80%D1%81%D0%B0%D0%BC%20(LearningCourseLearningCourseGroup)/getItemResource-learningcourselearningcoursegroupentity-get_1
 * @param {string|number} id
 *
 * @return {Promise<SafeResult<LearningCourseGroupBindingDto, Error>>}
 */
export function getLearningCourseGroupBindingById(id) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_LEARNING_COURSE_GROUP_GET_BY_ID,
            pathParams: { id }
        },
        LearningCourseGroupBindingDto
    );
}

/**
 * @description ?????????????????? ???????????????? ??????????????: ???????????????? ???????????????? ?? ????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%BF%D0%BE%D0%B4%D0%B1%D0%BE%D1%80%D0%BE%D0%BA%20%D0%BA%20%D0%BA%D1%83%D1%80%D1%81%D0%B0%D0%BC%20(LearningCourseLearningCourseGroup)/putItemResource-learningcourselearningcoursegroupentity-put_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} learningCourse
 * @param {string} learningCourseGroup
 * @param {boolean} actual
 * @param {number} learning_course_group
 * @param {number} learning_course
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningCourseGroupBindingDto, Error>>}
 */
export function replaceLearningCourseGroupBinding(
    id,
    { date_from, date_to, learningCourse, learningCourseGroup, actual, learning_course_group, learning_course }
) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_LEARNING_COURSE_GROUP_REPLACE_BY_ID,
            pathParams: { id },
            params: {
                date_from,
                date_to,
                learningCourse,
                learningCourseGroup,
                actual,
                learning_course_group,
                learning_course
            }
        },
        LearningCourseGroupBindingDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ???????????????? ???????????????? ?? ????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%BF%D0%BE%D0%B4%D0%B1%D0%BE%D1%80%D0%BE%D0%BA%20%D0%BA%20%D0%BA%D1%83%D1%80%D1%81%D0%B0%D0%BC%20(LearningCourseLearningCourseGroup)/deleteItemResource-learningcourselearningcoursegroupentity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function deleteLearningCourseGroupBinding(id) {
    return this.request({
        action: ServiceAction.LEARNING_COURSE_LEARNING_COURSE_GROUP_DELETE_BY_ID,
        pathParams: { id }
    });
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ???????????????? ???????????????? ?? ????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%BF%D0%BE%D0%B4%D0%B1%D0%BE%D1%80%D0%BE%D0%BA%20%D0%BA%20%D0%BA%D1%83%D1%80%D1%81%D0%B0%D0%BC%20(LearningCourseLearningCourseGroup)/patchItemResource-learningcourselearningcoursegroupentity-patch_1
 * @param {string} id
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} learningCourse
 * @param {string} learningCourseGroup
 * @param {boolean} actual
 * @param {number} learning_course_group
 * @param {number} learning_course
 *
 * @return {Promise<SafeResult<LearningCourseGroupBindingDto, Error>>}
 */
export function updateLearningCourseGroupBinding(
    id,
    { date_from, date_to, learningCourse, learningCourseGroup, actual, learning_course_group, learning_course }
) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_LEARNING_COURSE_GROUP_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                date_from,
                date_to,
                learningCourse,
                learningCourseGroup,
                actual,
                learning_course_group,
                learning_course
            }
        },
        LearningCourseGroupBindingDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????????????? ?????????????????? ?? ??????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%B0%D0%BC%D0%B8%20%D1%81%D0%BE%D0%BE%D0%B1%D1%89%D0%B5%D0%BD%D0%B8%D0%B9%20%D0%BA%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D1%8F%D0%BC%20(LearningCourseMessage)/getCollectionResource-learningcoursemessageentity-get_1_1
 *
 * @return {Promise<SafeResult<LearningCourseMessageBindingDto[], Error>>}
 */
export function getLearningCourseMessageBindingsAll() {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_MESSAGE_BINDINGS_GET
        },
        LearningCourseMessageBindingDto
    );
}

/**
 * @description ???????????????????? ????????????????: ???????????????? ?????????????????? ?? ??????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%B0%D0%BC%D0%B8%20%D1%81%D0%BE%D0%BE%D0%B1%D1%89%D0%B5%D0%BD%D0%B8%D0%B9%20%D0%BA%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D1%8F%D0%BC%20(LearningCourseMessage)/postCollectionResource-learningcoursemessageentity-post_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} learning_course
 * @param {string} message
 * @param {boolean} actual
 *
 * @return {Promise<SafeResult<LearningCourseMessageBindingDto, Error>>}
 */
export function createLearningCourseMessage({ date_from, date_to, learning_course, message, actual }) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_MESSAGE_CREATE,
            params: {
                date_from,
                date_to,
                learning_course,
                message,
                actual
            }
        },
        LearningCourseMessageBindingDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????????????? ?????????????????? ?? ??????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%B0%D0%BC%D0%B8%20%D1%81%D0%BE%D0%BE%D0%B1%D1%89%D0%B5%D0%BD%D0%B8%D0%B9%20%D0%BA%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D1%8F%D0%BC%20(LearningCourseMessage)/getItemResource-learningcoursemessageentity-get_1
 * @param {string} learningCourseId
 *
 * @return {Promise<SafeResult<LearningCourseMessageBindingDto[], Error>>}
 */
export function getLearningCourseMessageBindingsByLearningCourseId(learningCourseId) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_MESSAGE_BINDINGS_GET_BY_LEARNING_COURSE_ID,
            pathParams: { learningCourseId }
        },
        LearningCourseMessageBindingDto
    );
}

/**
 * @description ?????????????????? ???????????????? ??????????????: ???????????????? ?????????????????? ?? ??????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%B0%D0%BC%D0%B8%20%D1%81%D0%BE%D0%BE%D0%B1%D1%89%D0%B5%D0%BD%D0%B8%D0%B9%20%D0%BA%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D1%8F%D0%BC%20(LearningCourseMessage)/putItemResource-learningcoursemessageentity-put_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} learning_course
 * @param {string} message
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningCourseMessageBindingDto, Error>>}
 */
export function replaceLearningCourseMessage(id, { date_from, date_to, learning_course, message, actual }) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_MESSAGE_REPLACE_BY_ID,
            pathParams: { id },
            params: {
                date_from,
                date_to,
                learning_course,
                message,
                actual
            }
        },
        LearningCourseMessageBindingDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: c????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%B0%D0%BC%D0%B8%20%D1%81%D0%BE%D0%BE%D0%B1%D1%89%D0%B5%D0%BD%D0%B8%D0%B9%20%D0%BA%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D1%8F%D0%BC%20(LearningCourseMessage)/deleteItemResource-learningcoursemessageentity-delete_1
 * @param {string} learningCourseId
 *
 * @return {Promise<SafeResult<true, Error>>}
 */
export function deleteMessagesByLearningCourseId(learningCourseId) {
    return this.request({
        action: ServiceAction.LEARNING_COURSE_MESSAGE_DELETE_BY_LEARNING_COURSE_ID,
        pathParams: { learningCourseId }
    });
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ???????????????? ?????????????????? ?? ??????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%B0%D0%BC%D0%B8%20%D1%81%D0%BE%D0%BE%D0%B1%D1%89%D0%B5%D0%BD%D0%B8%D0%B9%20%D0%BA%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D1%8F%D0%BC%20(LearningCourseMessage)/patchItemResource-learningcoursemessageentity-patch_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} learning_course
 * @param {string} message
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningCourseMessageBindingDto, Error>>}
 */
export function updateLearningCourseMessage(id, { date_from, date_to, learning_course, message, actual }) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_MESSAGE_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                date_from,
                date_to,
                learning_course,
                message,
                actual
            }
        },
        LearningCourseMessageBindingDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%83%D1%87%D0%B0%D1%81%D1%82%D0%BD%D0%B8%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(LearningCourseParty)/getCollectionResource-learningcoursepartyentity-get_1_1
 *
 * @return {Promise<SafeResult<LearningCoursePartyEntityDto[], Error>>}
 */
export function getLearningCourseParties() {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_PARTY_GET
        },
        LearningCoursePartyEntityDto
    );
}

/**
 * @description ???????????????????? ????????????????: ???????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%83%D1%87%D0%B0%D1%81%D1%82%D0%BD%D0%B8%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(LearningCourseParty)/postCollectionResource-learningcoursepartyentity-post_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} name
 * @param {string} description
 * @param {number} code
 * @param {boolean} actual
 *
 * @return {Promise<SafeResult<LearningCoursePartyEntityDto, Error>>}
 */
export function createLearningCourseParty({ date_from, date_to, name, description, code, actual }) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_PARTY_CREATE,
            params: {
                date_from,
                date_to,
                name,
                description,
                code,
                actual
            }
        },
        LearningCoursePartyEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%83%D1%87%D0%B0%D1%81%D1%82%D0%BD%D0%B8%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(LearningCourseParty)/getItemResource-learningcoursepartyentity-get_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningCoursePartyEntityDto, Error>>}
 */
export function getLearningCoursePartyById(id) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_PARTY_GET_BY_ID,
            pathParams: { id }
        },
        LearningCoursePartyEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ???????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%83%D1%87%D0%B0%D1%81%D1%82%D0%BD%D0%B8%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(LearningCourseParty)/deleteItemResource-learningcoursepartyentity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function deleteLearningCoursePartyById(id) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_PARTY_DELETE_BY_ID,
            pathParams: { id }
        },
        true
    );
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ???????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%83%D1%87%D0%B0%D1%81%D1%82%D0%BD%D0%B8%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(LearningCourseParty)/patchItemResource-learningcoursepartyentity-patch_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} name
 * @param {string} description
 * @param {number} code
 * @param {boolean} actual
 * @param {string} id
 * @param {boolean} isReplace
 *
 * @return {Promise<SafeResult<LearningCoursePartyEntityDto, Error>>}
 */
export function updateLearningCourseParty(
    id,
    { date_from, date_to, name, description, code, actual },
    isReplace = false
) {
    return this.request(
        {
            action: isReplace
                ? ServiceAction.LEARNING_COURSE_PARTY_REPLACE_BY_ID
                : ServiceAction.LEARNING_COURSE_PARTY_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                date_from,
                date_to,
                name,
                description,
                code,
                actual
            }
        },
        LearningCoursePartyEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ?????????????? ?????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B0%D0%BD%D0%B0%D0%BB%D0%BE%D0%B3%D0%B0%D0%BC%D0%B8%20%D0%BE%D0%B1%D1%83%D1%87%D0%B0%D1%8E%D1%89%D0%B8%D1%85%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(LearningCourseSimilar)/getCollectionResource-learningcoursesimilarentity-get_1_1
 *
 * @return {Promise<SafeResult<LearningCourseSimilarEntityDto[], Error>>}
 */
export function getLearningCourseSimilars() {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_SIMILAR_GET
        },
        LearningCourseSimilarEntityDto
    );
}

/**
 * @description ???????????????????? ????????????????: ?????????????? ?????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B0%D0%BD%D0%B0%D0%BB%D0%BE%D0%B3%D0%B0%D0%BC%D0%B8%20%D0%BE%D0%B1%D1%83%D1%87%D0%B0%D1%8E%D1%89%D0%B8%D1%85%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(LearningCourseSimilar)/postCollectionResource-learningcoursesimilarentity-post_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} learning_course
 * @param {string} similar_learning_course
 * @param {boolean} actual
 *
 * @return {Promise<SafeResult<LearningCourseSimilarEntityDto, Error>>}
 */
export function createLearningCourseSimilar({ date_from, date_to, learning_course, similar_learning_course, actual }) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_SIMILAR_CREATE,
            params: {
                date_from,
                date_to,
                learning_course,
                similar_learning_course,
                actual
            }
        },
        LearningCourseSimilarEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ?????????????? ?????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B0%D0%BD%D0%B0%D0%BB%D0%BE%D0%B3%D0%B0%D0%BC%D0%B8%20%D0%BE%D0%B1%D1%83%D1%87%D0%B0%D1%8E%D1%89%D0%B8%D1%85%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(LearningCourseSimilar)/getItemResource-learningcoursesimilarentity-get_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningCourseSimilarEntityDto, Error>>}
 */
export function getLearningCourseSimilarById(id) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_SIMILAR_GET_BY_ID,
            pathParams: { id }
        },
        LearningCourseSimilarEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????? ??????????????: ?????????????? ?????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B0%D0%BD%D0%B0%D0%BB%D0%BE%D0%B3%D0%B0%D0%BC%D0%B8%20%D0%BE%D0%B1%D1%83%D1%87%D0%B0%D1%8E%D1%89%D0%B8%D1%85%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(LearningCourseSimilar)/putItemResource-learningcoursesimilarentity-put_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} learning_course
 * @param {string} similar_learning_course
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningCourseSimilarEntityDto, Error>>}
 */
export function replaceLearningCourseSimilar(
    id,
    { date_from, date_to, learning_course, similar_learning_course, actual }
) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_SIMILAR_REPLACE_BY_ID,
            pathParams: { id },
            params: {
                date_from,
                date_to,
                learning_course,
                similar_learning_course,
                actual
            }
        },
        LearningCourseSimilarEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ?????????????? ?????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B0%D0%BD%D0%B0%D0%BB%D0%BE%D0%B3%D0%B0%D0%BC%D0%B8%20%D0%BE%D0%B1%D1%83%D1%87%D0%B0%D1%8E%D1%89%D0%B8%D1%85%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(LearningCourseSimilar)/deleteItemResource-learningcoursesimilarentity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function deleteLearningCourseSimilar(id) {
    return this.request({
        action: ServiceAction.LEARNING_COURSE_SIMILAR_DELETE_BY_ID,
        pathParams: { id }
    });
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ?????????????? ?????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B0%D0%BD%D0%B0%D0%BB%D0%BE%D0%B3%D0%B0%D0%BC%D0%B8%20%D0%BE%D0%B1%D1%83%D1%87%D0%B0%D1%8E%D1%89%D0%B8%D1%85%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(LearningCourseSimilar)/patchItemResource-learningcoursesimilarentity-patch_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} learning_course
 * @param {string} similar_learning_course
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningCourseSimilarEntityDto, Error>>}
 */
export function updateLearningCourseSimilar(
    id,
    { date_from, date_to, learning_course, similar_learning_course, actual }
) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_SIMILAR_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                date_from,
                date_to,
                learning_course,
                similar_learning_course,
                actual
            }
        },
        LearningCourseSimilarEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????????? ???????????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BC%D0%BE%D0%B4%D1%83%D0%BB%D1%8F%D0%BC%D0%B8%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D1%85%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(LearningCourseStep)/getCollectionResource-learningcoursestepentity-get_1_1
 *
 * @return {Promise<SafeResult<LearningCourseStepEntityDto[], Error>>}
 */
export function getLearningCourseStepsAll() {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_STEP_GET
        },
        LearningCourseStepEntityDto
    );
}

/**
 * @description ???????????????????? ????????????????: ???????????? ???????????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BC%D0%BE%D0%B4%D1%83%D0%BB%D1%8F%D0%BC%D0%B8%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D1%85%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(LearningCourseStep)/postCollectionResource-learningcoursestepentity-post_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} external_id
 * @param {string} name
 * @param {string} date_start
 * @param {string} date_end
 * @param {string} description
 * @param {number} duration_days
 * @param {number} duration_hours
 * @param {number} score_max
 * @param {number} score_success
 * @param {number} parent_id
 * @param {boolean} is_folder
 * @param {boolean} is_mandatory
 * @param {string} content_url
 * @param {number} index
 * @param {boolean} actual
 * @param {ContentTypeEntityDto} content_type
 * @param {string} learning_course
 * @param {number} learning_course_id
 *
 * @return {Promise<SafeResult<LearningCourseStepEntityDto, Error>>}
 */
export function createLearningCourseStep({
    date_from,
    date_to,
    external_id,
    name,
    date_start,
    date_end,
    description,
    duration_days,
    duration_hours,
    score_max,
    score_success,
    parent_id,
    is_folder,
    is_mandatory,
    content_url,
    index,
    actual,
    content_type,
    learning_course,
    learning_course_id
}) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_STEP_CREATE,
            params: {
                date_from,
                date_to,
                external_id,
                name,
                date_start,
                date_end,
                description,
                duration_days,
                duration_hours,
                score_max,
                score_success,
                parent_id,
                is_folder,
                is_mandatory,
                content_url,
                index,
                actual,
                content_type,
                learning_course,
                learning_course_id
            }
        },
        LearningCourseStepEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????????? ???????????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BC%D0%BE%D0%B4%D1%83%D0%BB%D1%8F%D0%BC%D0%B8%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D1%85%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(LearningCourseStep)/getItemResource-learningcoursestepentity-get_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningCourseStepEntityDto, Error>>}
 */
export function getLearningCourseStepById(id) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_STEP_GET_BY_ID,
            pathParams: { id }
        },
        LearningCourseStepEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????? ??????????????: ???????????? ???????????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BC%D0%BE%D0%B4%D1%83%D0%BB%D1%8F%D0%BC%D0%B8%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D1%85%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(LearningCourseStep)/putItemResource-learningcoursestepentity-put_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} external_id
 * @param {string} name
 * @param {string} date_start
 * @param {string} date_end
 * @param {string} description
 * @param {number} duration_days
 * @param {number} duration_hours
 * @param {number} score_max
 * @param {number} score_success
 * @param {number} parent_id
 * @param {boolean} is_folder
 * @param {boolean} is_mandatory
 * @param {string} content_url
 * @param {number} index
 * @param {boolean} actual
 * @param {ContentTypeEntityDto} content_type
 * @param {string} learning_course
 * @param {number} learning_course_id
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningCourseStepEntityDto, Error>>}
 */
export function replaceLearningCourseStep(
    id,
    {
        date_from,
        date_to,
        external_id,
        name,
        date_start,
        date_end,
        description,
        duration_days,
        duration_hours,
        score_max,
        score_success,
        parent_id,
        is_folder,
        is_mandatory,
        content_url,
        index,
        actual,
        content_type,
        learning_course,
        learning_course_id
    }
) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_STEP_REPLACE_BY_ID,
            pathParams: { id },
            params: {
                date_from,
                date_to,
                external_id,
                name,
                date_start,
                date_end,
                description,
                duration_days,
                duration_hours,
                score_max,
                score_success,
                parent_id,
                is_folder,
                is_mandatory,
                content_url,
                index,
                actual,
                content_type,
                learning_course,
                learning_course_id
            }
        },
        LearningCourseStepEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ???????????? ???????????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BC%D0%BE%D0%B4%D1%83%D0%BB%D1%8F%D0%BC%D0%B8%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D1%85%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(LearningCourseStep)/deleteItemResource-learningcoursestepentity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function deleteLearningCourseStep(id) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_STEP_DELETE_BY_ID,
            pathParams: { id }
        },
        true
    );
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ???????????? ???????????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BC%D0%BE%D0%B4%D1%83%D0%BB%D1%8F%D0%BC%D0%B8%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D1%85%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(LearningCourseStep)/patchItemResource-learningcoursestepentity-patch_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} external_id
 * @param {string} name
 * @param {string} date_start
 * @param {string} date_end
 * @param {string} description
 * @param {number} duration_days
 * @param {number} duration_hours
 * @param {number} score_max
 * @param {number} score_success
 * @param {number} parent_id
 * @param {boolean} is_folder
 * @param {boolean} is_mandatory
 * @param {string} content_url
 * @param {number} index
 * @param {boolean} actual
 * @param {ContentTypeEntityDto} content_type
 * @param {string} learning_course
 * @param {number} learning_course_id
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningCourseStepEntityDto, Error>>}
 */
export function updateLearningCourseStep(
    id,
    {
        date_from,
        date_to,
        external_id,
        name,
        date_start,
        date_end,
        description,
        duration_days,
        duration_hours,
        score_max,
        score_success,
        parent_id,
        is_folder,
        is_mandatory,
        content_url,
        index,
        actual,
        content_type,
        learning_course,
        learning_course_id
    }
) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_STEP_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                date_from,
                date_to,
                external_id,
                name,
                date_start,
                date_end,
                description,
                duration_days,
                duration_hours,
                score_max,
                score_success,
                parent_id,
                is_folder,
                is_mandatory,
                content_url,
                index,
                actual,
                content_type,
                learning_course,
                learning_course_id
            }
        },
        LearningCourseStepEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????????????? ?????????????????????? ???????????????? ?? ????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%BD%D0%B0%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B9%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20%D0%BA%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D1%8F%D0%BC%20(LearningCourseStudyDirection)/getCollectionResource-learningcoursestudydirectionentity-get_1_1
 *
 * @return {Promise<SafeResult<LearningCourseStudyDirectionEntityDto[], Error>>}
 */
export function getLearningCourseStudyDirections() {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_STUDY_DIRECTION_GET
        },
        LearningCourseStudyDirectionEntityDto
    );
}

/**
 * @description ???????????????????? ????????????????: ???????????????? ?????????????????????? ???????????????? ?? ????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%BD%D0%B0%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B9%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20%D0%BA%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D1%8F%D0%BC%20(LearningCourseStudyDirection)/postCollectionResource-learningcoursestudydirectionentity-post_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} learning_course
 * @param {StudyDirectionEntityDto} study_direction
 * @param {boolean} actual
 *
 * @return {Promise<SafeResult<LearningCourseStudyDirectionEntityDto, Error>>}
 */
export function createLearningCourseStudyDirection({ date_from, date_to, learning_course, study_direction, actual }) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_STUDY_DIRECTION_CREATE,
            params: {
                date_from,
                date_to,
                learning_course,
                study_direction,
                actual
            }
        },
        LearningCourseStudyDirectionEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????????????? ?????????????????????? ???????????????? ?? ????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%BD%D0%B0%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B9%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20%D0%BA%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D1%8F%D0%BC%20(LearningCourseStudyDirection)/getItemResource-learningcoursestudydirectionentity-get_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningCourseStudyDirectionEntityDto, Error>>}
 */
export function getLearningCourseStudyDirectionById(id) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_STUDY_DIRECTION_GET_BY_ID,
            pathParams: { id }
        },
        LearningCourseStudyDirectionEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????? ??????????????: ???????????????? ?????????????????????? ???????????????? ?? ????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%BD%D0%B0%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B9%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20%D0%BA%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D1%8F%D0%BC%20(LearningCourseStudyDirection)/putItemResource-learningcoursestudydirectionentity-put_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} learning_course
 * @param {StudyDirectionEntityDto} study_direction
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningCourseStudyDirectionEntityDto, Error>>}
 */
export function replaceLearningCourseStudyDirection(
    id,
    { date_from, date_to, learning_course, study_direction, actual }
) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_STUDY_DIRECTION_REPLACE_BY_ID,
            pathParams: { id },
            params: {
                date_from,
                date_to,
                learning_course,
                study_direction,
                actual
            }
        },
        LearningCourseStudyDirectionEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ???????????????? ?????????????????????? ???????????????? ?? ????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%BD%D0%B0%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B9%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20%D0%BA%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D1%8F%D0%BC%20(LearningCourseStudyDirection)/deleteItemResource-learningcoursestudydirectionentity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function deleteLearningCourseStudyDirectionById(id) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_STUDY_DIRECTION_DELETE_BY_ID,
            pathParams: { id }
        },
        true
    );
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ???????????????? ?????????????????????? ???????????????? ?? ????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%BD%D0%B0%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B9%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20%D0%BA%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D1%8F%D0%BC%20(LearningCourseStudyDirection)/patchItemResource-learningcoursestudydirectionentity-patch_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} learning_course
 * @param {StudyDirectionEntityDto} study_direction
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningCourseStudyDirectionEntityDto, Error>>}
 */
export function updateLearningCourseStudyDirection(
    id,
    { date_from, date_to, learning_course, study_direction, actual }
) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_STUDY_DIRECTION_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                date_from,
                date_to,
                learning_course,
                study_direction,
                actual
            }
        },
        LearningCourseStudyDirectionEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????? ?????????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%82%D0%B8%D0%BF%D0%B0%D0%BC%D0%B8%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(LearningCourseType)/getCollectionResource-learningcoursetypeentity-get_1_1
 *
 * @return {Promise<SafeResult<LearningCourseTypeEntityDto, Error>>}
 */
export function getLearningCourseTypes() {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_TYPE_GET
        },
        LearningCourseTypeEntityDto
    );
}

/**
 * @description ???????????????????? ????????????????: ???????? ?????????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%82%D0%B8%D0%BF%D0%B0%D0%BC%D0%B8%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(LearningCourseType)/postCollectionResource-learningcoursetypeentity-post_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} name
 * @param {string} external_id
 * @param {string} description
 * @param {number} code
 * @param {boolean} actual
 *
 * @return {Promise<SafeResult<LearningCourseTypeEntityDto, Error>>}
 */
export function createLearningCourseType({ date_from, date_to, name, external_id, description, code, actual }) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_TYPE_CREATE,
            params: {
                id,
                date_from,
                date_to,
                name,
                external_id,
                description,
                code,
                actual
            }
        },
        LearningCourseTypeEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????? ?????????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%82%D0%B8%D0%BF%D0%B0%D0%BC%D0%B8%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(LearningCourseType)/getItemResource-learningcoursetypeentity-get_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningCourseTypeEntityDto, Error>>}
 */
export function getLearningCourseTypeById(id) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_TYPE_GET_BY_ID,
            pathParams: { id }
        },
        LearningCourseTypeEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????? ??????????????: ???????? ?????????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%82%D0%B8%D0%BF%D0%B0%D0%BC%D0%B8%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(LearningCourseType)/putItemResource-learningcoursetypeentity-put_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} name
 * @param {string} external_id
 * @param {string} description
 * @param {number} code
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningCourseTypeEntityDto, Error>>}
 */
export function replaceLearningCourseType(id, { date_from, date_to, name, external_id, description, code, actual }) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_TYPE_REPLACE_BY_ID,
            pathParams: { id },
            params: {
                id,
                date_from,
                date_to,
                name,
                external_id,
                description,
                code,
                actual
            }
        },
        LearningCourseTypeEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ???????? ?????????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%82%D0%B8%D0%BF%D0%B0%D0%BC%D0%B8%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(LearningCourseType)/deleteItemResource-learningcoursetypeentity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function deleteLearningCourseTypeById(id) {
    return this.request({
        action: ServiceAction.LEARNING_COURSE_TYPE_DELETE_BY_ID,
        pathParams: { id }
    });
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ???????? ?????????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%82%D0%B8%D0%BF%D0%B0%D0%BC%D0%B8%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(LearningCourseType)/patchItemResource-learningcoursetypeentity-patch_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} name
 * @param {string} external_id
 * @param {string} description
 * @param {number} code
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningCourseTypeEntityDto, Error>>}
 */
export function updateLearningCourseType(id, { date_from, date_to, name, external_id, description, code, actual }) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_TYPE_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                id,
                date_from,
                date_to,
                name,
                external_id,
                description,
                code,
                actual
            }
        },
        LearningCourseTypeEntityDto
    );
}

/**
 * @description undefined
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B5%D0%BC%20(LearningCourse)/executeSearch-learningcourseentity-get_1
 * @param {number} catalogId
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function getLearningCourseSearchFindByCatalog(catalogId) {
    return this.request({
        action: ServiceAction.LEARNING_COURSE_SEARCH_FIND_BY_CATALOG_GET,
        params: { catalog_id: catalogId }
    });
}

/**
 * @description undefined
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B5%D0%BC%20(LearningCourse)/executeSearch-learningcourseentity-get_1_1
 * @param {Array|string} ids
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function getLearningCourseSearchFindByIds(ids) {
    return this.request({
        action: ServiceAction.LEARNING_COURSE_SEARCH_FIND_BY_IDS_GET,
        params: { id: ids }
    });
}

/**
 * @description undefined
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B5%D0%BC%20(LearningCourse)/executeSearch-learningcourseentity-get_2_1
 * @param {number} id
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function getLearningCourseSearchFindSimilarById(id) {
    return this.request({
        action: ServiceAction.LEARNING_COURSE_SEARCH_FIND_SIMILAR_GET,
        params: { id }
    });
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ?????????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B5%D0%BC%20(LearningCourse)/getItemResource-learningcourseentity-get_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningCourseEntityDto, Error>>}
 */
export function getLearningCourseById(id) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_GET_BY_ID,
            pathParams: { id }
        },
        LearningCourseEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????? ??????????????: ?????????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B5%D0%BC%20(LearningCourse)/putItemResource-learningcourseentity-put_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} external_id
 * @param {string} code
 * @param {boolean} is_start_ready
 * @param {string} date_start
 * @param {string} date_end
 * @param {string} request_date_start
 * @param {string} request_date_end
 * @param {string} name
 * @param {string} short_name
 * @param {string} description
 * @param {string} cover_url
 * @param {number} duration_hours
 * @param {number} duration_days
 * @param {number} score_success
 * @param {number} price
 * @param {boolean} is_mandatory
 * @param {boolean} is_request_commit_head
 * @param {boolean} is_request_commit_hr
 * @param {number} student_count_min
 * @param {number} student_count_max
 * @param {StudyProviderEntityDto} study_provider
 * @param {StudyExpertEntityDto} study_expert
 * @param {StudyLocationEntityDto} study_location
 * @param {LearningCourseTypeEntityDto} learning_course_type
 * @param {string} catalog
 * @param {Array} learning_course_steps
 * @param {Array} learning_course_competences
 * @param {Array} learning_course_learning_course_groups
 * @param {Array} learning_course_message
 * @param {Array} learning_course_curators
 * @param {Array} learning_course_parties
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningCourseEntityDto, Error>>}
 */
export function replaceLearningCourse(
    id,
    {
        date_from,
        date_to,
        external_id,
        code,
        is_start_ready,
        date_start,
        date_end,
        request_date_start,
        request_date_end,
        name,
        short_name,
        description,
        cover_url,
        duration_hours,
        duration_days,
        score_success,
        price,
        is_mandatory,
        is_request_commit_head,
        is_request_commit_hr,
        student_count_min,
        student_count_max,
        study_provider,
        study_expert,
        study_location,
        learning_course_type,
        catalog,
        learning_course_steps,
        learning_course_competences,
        learning_course_learning_course_groups,
        learning_course_message,
        learning_course_curators,
        learning_course_parties,
        actual
    }
) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_REPLACE_BY_ID,
            pathParams: { id },
            params: {
                id,
                date_from,
                date_to,
                external_id,
                code,
                is_start_ready,
                date_start,
                date_end,
                request_date_start,
                request_date_end,
                name,
                short_name,
                description,
                cover_url,
                duration_hours,
                duration_days,
                score_success,
                price,
                is_mandatory,
                is_request_commit_head,
                is_request_commit_hr,
                student_count_min,
                student_count_max,
                study_provider,
                study_expert,
                study_location,
                learning_course_type,
                catalog,
                learning_course_steps,
                learning_course_competences,
                learning_course_learning_course_groups,
                learning_course_message,
                learning_course_curators,
                learning_course_parties,
                actual
            }
        },
        LearningCourseEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ?????????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B5%D0%BC%20(LearningCourse)/deleteItemResource-learningcourseentity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function deleteLearningCourse(id) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_DELETE_BY_ID,
            pathParams: { id }
        },
        true
    );
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ?????????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B5%D0%BC%20(LearningCourse)/patchItemResource-learningcourseentity-patch_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} external_id
 * @param {string} code
 * @param {boolean} is_start_ready
 * @param {string} date_start
 * @param {string} date_end
 * @param {string} request_date_start
 * @param {string} request_date_end
 * @param {string} name
 * @param {string} short_name
 * @param {string} description
 * @param {string} cover_url
 * @param {number} duration_hours
 * @param {number} duration_days
 * @param {number} score_success
 * @param {number} price
 * @param {boolean} is_mandatory
 * @param {boolean} is_request_commit_head
 * @param {boolean} is_request_commit_hr
 * @param {number} student_count_min
 * @param {number} student_count_max
 * @param {StudyProviderEntityDto} study_provider
 * @param {StudyExpertEntityDto} study_expert
 * @param {StudyLocationEntityDto} study_location
 * @param {LearningCourseTypeEntityDto} learning_course_type
 * @param {string} catalog
 * @param {Array} learning_course_steps
 * @param {Array} learning_course_competences
 * @param {Array} learning_course_learning_course_groups
 * @param {Array} learning_course_message
 * @param {Array} learning_course_curators
 * @param {Array} learning_course_parties
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningCourseEntityDto, Error>>}
 */
export function updateLearningCourse(
    id,
    {
        date_from,
        date_to,
        external_id,
        code,
        is_start_ready,
        date_start,
        date_end,
        request_date_start,
        request_date_end,
        name,
        short_name,
        description,
        cover_url,
        duration_hours,
        duration_days,
        score_success,
        price,
        is_mandatory,
        is_request_commit_head,
        is_request_commit_hr,
        student_count_min,
        student_count_max,
        study_provider,
        study_expert,
        study_location,
        learning_course_type,
        catalog,
        learning_course_steps,
        learning_course_competences,
        learning_course_learning_course_groups,
        learning_course_message,
        learning_course_curators,
        learning_course_parties,
        actual
    }
) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                id,
                date_from,
                date_to,
                external_id,
                code,
                is_start_ready,
                date_start,
                date_end,
                request_date_start,
                request_date_end,
                name,
                short_name,
                description,
                cover_url,
                duration_hours,
                duration_days,
                score_success,
                price,
                is_mandatory,
                is_request_commit_head,
                is_request_commit_hr,
                student_count_min,
                student_count_max,
                study_provider,
                study_expert,
                study_location,
                learning_course_type,
                catalog,
                learning_course_steps,
                learning_course_competences,
                learning_course_learning_course_groups,
                learning_course_message,
                learning_course_curators,
                learning_course_parties,
                actual
            }
        },
        LearningCourseEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ?????????????? ???????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B5%D0%BC%20(LearningCourse)/followPropertyReference-learningcourseentity-get_1_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningCourseCuratorEntityDto, Error>>}
 */
export function getLearningCourseLearningCourseCuratorById(id) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_CURATOR_GET_BY_ID,
            pathParams: { id }
        },
        LearningCourseCuratorEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????? ??????????????: ?????????????? ???????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B5%D0%BC%20(LearningCourse)/createPropertyReference-learningcourseentity-put_1
 * @param {Array} links
 * @param {Array} content
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningCourseCuratorEntityDto, Error>>}
 */
export function replaceLearningCourseLearningCourseCurator(id, { links, content }) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_LEARNING_COURSE_CURATOR_REPLACE_BY_ID,
            pathParams: { id },
            params: {
                links,
                content
            }
        },
        LearningCourseCuratorEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ?????????????? ???????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B5%D0%BC%20(LearningCourse)/deletePropertyReference-learningcourseentity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function deleteLearningCourseLearningCourseCuratorById(id) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_CURATOR_DELETE_BY_ID,
            pathParams: { id }
        },
        true
    );
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ?????????????? ???????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B5%D0%BC%20(LearningCourse)/createPropertyReference-learningcourseentity-patch_1
 * @param {Array} links
 * @param {Array} content
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningCourseCuratorEntityDto, Error>>}
 */
export function updateLearningCourseLearningCourseCurator(id, { links, content }) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_CURATOR_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                links,
                content
            }
        },
        LearningCourseCuratorEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ?????????????? ???????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B5%D0%BC%20(LearningCourse)/followPropertyReference-learningcourseentity-get_1
 * @param {string} id
 * @param {string} curatorId
 *
 * @return {Promise<SafeResult<LearningCourseCuratorEntityDto[], Error>>}
 */
export function getCuratorOfLearningCourse({ id, curatorId }) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_CURATOR_GET_BY_COURSE_AND_CURATOR,
            pathParams: { id, curatorId }
        },
        LearningCourseCuratorEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ?????????????? ???????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B5%D0%BC%20(LearningCourse)/deletePropertyReferenceId-learningcourseentity-delete_1
 * @param {string} learningCourseId
 * @param {string} curatorId
 *
 * @return {Promise<SafeResult<true, Error>>}
 */
export function deleteCuratorOfLearningCourse(learningCourseId, curatorId) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_CURATOR_ATTACHED_DELETE,
            pathParams: { learningCourseId, curatorId }
        },
        true
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????????????? ???????????????? ?? ????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B5%D0%BC%20(LearningCourse)/followPropertyReference-learningcourseentity-get_2_1_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningCourseGroupBindingDto, Error>>}
 */
export function getLearningCourseLearningCourseLearningCourseGroupById(id) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_LEARNING_COURSE_LEARNING_COURSE_GROUP_GET_BY_ID,
            pathParams: { id }
        },
        LearningCourseGroupBindingDto
    );
}

/**
 * @description ?????????????????? ???????????????? ??????????????: ???????????????? ???????????????? ?? ????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B5%D0%BC%20(LearningCourse)/createPropertyReference-learningcourseentity-put_1_1
 * @param {Array} links
 * @param {Array} content
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningCourseGroupBindingDto, Error>>}
 */
export function replaceLearningCourseLearningCourseLearningCourseGroup(id, { links, content }) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_LEARNING_COURSE_LEARNING_COURSE_GROUP_REPLACE_BY_ID,
            pathParams: { id },
            params: {
                links,
                content
            }
        },
        LearningCourseGroupBindingDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ???????????????? ???????????????? ?? ????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B5%D0%BC%20(LearningCourse)/deletePropertyReference-learningcourseentity-delete_1_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function deleteLearningCourseLearningCourseLearningCourseGroupById(id) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_LEARNING_COURSE_LEARNING_COURSE_GROUP_DELETE_BY_ID,
            pathParams: { id }
        },
        true
    );
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ???????????????? ???????????????? ?? ????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B5%D0%BC%20(LearningCourse)/createPropertyReference-learningcourseentity-patch_1_1
 * @param {Array} links
 * @param {Array} content
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningCourseGroupBindingDto, Error>>}
 */
export function updateLearningCourseLearningCourseLearningCourseGroup(id, { links, content }) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_LEARNING_COURSE_LEARNING_COURSE_GROUP_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                links,
                content
            }
        },
        LearningCourseGroupBindingDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????????????? ???????????????? ?? ????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B5%D0%BC%20(LearningCourse)/followPropertyReference-learningcourseentity-get_2_1
 * @param {string} learningCourseId
 * @param {string} groupId
 *
 * @return {Promise<SafeResult<LearningCourseGroupBindingDto[], Error>>}
 */
export function getLearningCourseGroupBindingsByKeys(learningCourseId, groupId) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_LEARNING_COURSE_LEARNING_COURSE_GROUP_GET,
            pathParams: { learningCourseId, groupId }
        },
        LearningCourseGroupBindingDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ???????????????? ???????????????? ?? ????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B5%D0%BC%20(LearningCourse)/deletePropertyReferenceId-learningcourseentity-delete_1_1
 * @param {string} learningCourseId
 * @param {string} groupId
 *
 * @return {Promise<SafeResult<true, Error>>}
 */
export function deleteLearningCourseGroupBindingsByKeys(learningCourseId, groupId) {
    return this.request({
        action: ServiceAction.LEARNING_COURSE_LEARNING_COURSE_LEARNING_COURSE_GROUP_DELETE,
        pathParams: { learningCourseId, groupId }
    });
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B5%D0%BC%20(LearningCourse)/followPropertyReference-learningcourseentity-get_3_1_1
 * @param {string} learningCourseId
 *
 * @return {Promise<SafeResult<LearningCoursePartyEntityDto, Error>>}
 */
export function getLearningCoursePartiesByLearningCourseId(learningCourseId) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_PARTY_GET_BY_LEARNING_COURSE_ID,
            pathParams: { learningCourseId }
        },
        LearningCoursePartyEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????? ??????????????: ???????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B5%D0%BC%20(LearningCourse)/createPropertyReference-learningcourseentity-put_2_1
 * @param {Array} links
 * @param {Array} content
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningCoursePartyEntityDto, Error>>}
 */
export function replaceLearningCourseLearningCourseParty(id, { links, content }) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_LEARNING_COURSE_PARTY_REPLACE_BY_ID,
            pathParams: { id },
            params: {
                links,
                content
            }
        },
        LearningCoursePartyEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ???????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B5%D0%BC%20(LearningCourse)/deletePropertyReference-learningcourseentity-delete_2_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function deleteLearningCourseLearningCoursePartyById(id) {
    return this.request({
        action: ServiceAction.LEARNING_COURSE_LEARNING_COURSE_PARTY_DELETE_BY_ID,
        pathParams: { id }
    });
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ???????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B5%D0%BC%20(LearningCourse)/createPropertyReference-learningcourseentity-patch_2_1
 * @param {Array} links
 * @param {Array} content
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningCoursePartyEntityDto, Error>>}
 */
export function updateLearningCourseLearningCourseParty(id, { links, content }) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_LEARNING_COURSE_PARTY_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                links,
                content
            }
        },
        LearningCoursePartyEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B5%D0%BC%20(LearningCourse)/followPropertyReference-learningcourseentity-get_3_1
 * @param {string|number} learningCourseId
 * @param {string|number} learningCoursePartyId
 *
 * @return {Promise<SafeResult<LearningCoursePartyEntityDto, Error>>}
 */
export function getLearningCourseLearningCourseParty(learningCourseId, learningCoursePartyId) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_LEARNING_COURSE_PARTY_GET,
            pathParams: { learningCourseId, learningCoursePartyId }
        },
        LearningCoursePartyEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ???????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B5%D0%BC%20(LearningCourse)/deletePropertyReferenceId-learningcourseentity-delete_2_1
 * @param {string|number} learningCourseId
 * @param {string|number} learningCoursePartyId
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function deleteLearningCourseLearningCourseParty(learningCourseId, learningCoursePartyId) {
    return this.request({
        action: ServiceAction.LEARNING_COURSE_LEARNING_COURSE_PARTY_DELETE,
        pathParams: { learningCourseId, learningCoursePartyId }
    });
}

/**
 * @description ?????????????????? ???????????????? ??????????????: ???????????? ???????????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B5%D0%BC%20(LearningCourse)/createPropertyReference-learningcourseentity-put_3_1
 * @param {string} learningCourseId
 * @param {Array} learningCourseSteps
 *
 * @return {Promise<SafeResult<LearningCourseStepEntityDto, Error>>}
 */
export function replaceLearningCourseStepByLearningCourseId(learningCourseId, learningCourseSteps) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_LEARNING_COURSE_STEP_REPLACE_BY_ID,
            pathParams: { learningCourseId },
            params: {
                content: learningCourseSteps
            }
        },
        LearningCourseStepEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ???????????? ???????????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B5%D0%BC%20(LearningCourse)/deletePropertyReference-learningcourseentity-delete_3_1
 * @param {string} learningCourseId
 *
 * @return {Promise<SafeResult<true, Error>>}
 */
export function deleteLearningCourseStepsByLearningCourseId(learningCourseId) {
    return this.request({
        action: ServiceAction.LEARNING_COURSE_STEP_DELETE_ALL_BY_LEARNING_COURSE_ID,
        pathParams: { learningCourseId }
    });
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ???????????? ???????????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B5%D0%BC%20(LearningCourse)/createPropertyReference-learningcourseentity-patch_3_1
 * @param {Array} learningCourseSteps
 * @param {string} learningCourseId
 *
 * @return {Promise<SafeResult<LearningCourseStepEntityDto[], Error>>}
 */
export function updateLearningCourseStepsByLearningCourseId(learningCourseId, learningCourseSteps) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_LEARNING_COURSE_STEP_UPDATE_BY_ID,
            pathParams: { learningCourseId },
            params: {
                content: learningCourseSteps
            }
        },
        LearningCourseStepEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????????? ???????????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B5%D0%BC%20(LearningCourse)/followPropertyReference-learningcourseentity-get_4_1
 * @param {string} learningCourseId
 *
 * @return {Promise<SafeResult<LearningCourseStepEntityDto[], Error>>}
 */
export function getLearningCourseStepsByLearningCourseId(learningCourseId) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_LEARNING_COURSE_STEP_GET,
            pathParams: { learningCourseId }
        },
        LearningCourseStepEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ???????????? ???????????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B5%D0%BC%20(LearningCourse)/deletePropertyReferenceId-learningcourseentity-delete_3_1
 * @param {string} learningCourseId
 * @param {string} learningCourseStepId
 *
 * @return {Promise<SafeResult<boolean, Error>>}
 */
export function deleteLearningCourseStepsByKeys(learningCourseId, learningCourseStepId) {
    return this.request({
        action: ServiceAction.LEARNING_COURSE_LEARNING_COURSE_STEP_DELETE,
        pathParams: { learningCourseId, learningCourseStepId }
    });
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????????????? ?????????????????? ?? ??????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B5%D0%BC%20(LearningCourse)/followPropertyReference-learningcourseentity-get_5_1_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningCourseMessageBindingDto, Error>>}
 */
export function getLearningCourseMessageBindingById(id) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_MESSAGE_BINDING_GET_BY_ID,
            pathParams: { id }
        },
        LearningCourseMessageBindingDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ??????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B5%D0%BC%20(LearningCourse)/deletePropertyReference-learningcourseentity-delete_4_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<boolean, Error>>}
 */
export function deleteLearningCourseMessageBindingById(id) {
    return this.request({
        action: ServiceAction.LEARNING_COURSE_MESSAGE_BINDING_DELETE_BY_ID,
        pathParams: { id }
    });
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ???????????????? ??????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B5%D0%BC%20(LearningCourse)/createPropertyReference-learningcourseentity-patch_4_1
 * @param {string} learningCourseId
 * @param {Array} messages
 * @param {boolean} [isReplace=false]
 *
 * @return {Promise<SafeResult<LearningCourseMessageBindingDto[], Error>>}
 */
export function updateLearningCourseMessagesBindingsByLeaningCourseId(learningCourseId, messages, isReplace = false) {
    return this.request(
        {
            action: isReplace
                ? ServiceAction.LEARNING_COURSE_MESSAGE_UPDATE_BY_ID
                : ServiceAction.LEARNING_COURSE_MESSAGE_REPLACE_BY_ID,
            pathParams: { learningCourseId },
            params: {
                content: messages
            }
        },
        LearningCourseMessageBindingDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????????????? ?????????????????? ???? ????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B5%D0%BC%20(LearningCourse)/followPropertyReference-learningcourseentity-get_5_1
 * @param {string} learningCourseId
 * @param {string} messageId
 *
 * @return {Promise<SafeResult<LearningCourseMessageBindingDto[], Error>>}
 */
export function getLearningCourseMessageBindingsByKeys(learningCourseId, messageId) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_MESSAGE_BINDINGS_GET_BY_KEYS,
            pathParams: { learningCourseId, messageId }
        },
        LearningCourseMessageBindingDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ??????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B5%D0%BC%20(LearningCourse)/deletePropertyReferenceId-learningcourseentity-delete_4_1
 * @param {string} learningCourseId
 * @param {string} messageId
 *
 * @return {Promise<SafeResult<boolean, Error>>}
 */
export function deleteLearningCourseMessageBindingsByKeys(learningCourseId, messageId) {
    return this.request({
        action: ServiceAction.LEARNING_COURSE_MESSAGE_BINDING_DELETE_BY_KEYS,
        pathParams: { learningCourseId, messageId }
    });
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ?????????? ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%84%D0%BE%D1%80%D0%BC%D0%B0%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20(LearningForm)/getCollectionResource-learningformentity-get_1_1
 *
 * @return {Promise<SafeResult<LearningFormEntityDto[], Error>>}
 */
export function getLearningForms() {
    return this.request(
        {
            action: ServiceAction.LEARNING_FORM_GET
        },
        LearningFormEntityDto
    );
}

/**
 * @description ???????????????????? ????????????????: ?????????? ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%84%D0%BE%D1%80%D0%BC%D0%B0%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20(LearningForm)/postCollectionResource-learningformentity-post_1
 * @param {string} name
 *
 * @return {Promise<SafeResult<LearningFormEntityDto, Error>>}
 */
export function createLearningForm({ name }) {
    return this.request(
        {
            action: ServiceAction.LEARNING_FORM_CREATE,
            params: {
                name
            }
        },
        LearningFormEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ?????????? ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%84%D0%BE%D1%80%D0%BC%D0%B0%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20(LearningForm)/getItemResource-learningformentity-get_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningFormEntityDto, Error>>}
 */
export function getLearningFormById(id) {
    return this.request(
        {
            action: ServiceAction.LEARNING_FORM_GET_BY_ID,
            pathParams: { id }
        },
        LearningFormEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????? ??????????????: ?????????? ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%84%D0%BE%D1%80%D0%BC%D0%B0%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20(LearningForm)/putItemResource-learningformentity-put_1
 * @param {string} name
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningFormEntityDto, Error>>}
 */
export function replaceLearningForm(id, { name }) {
    return this.request(
        {
            action: ServiceAction.LEARNING_FORM_REPLACE_BY_ID,
            pathParams: { id },
            params: {
                name
            }
        },
        LearningFormEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ?????????? ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%84%D0%BE%D1%80%D0%BC%D0%B0%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20(LearningForm)/deleteItemResource-learningformentity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function deleteLearningForm(id) {
    return this.request(
        {
            action: ServiceAction.LEARNING_FORM_DELETE_BY_ID,
            pathParams: { id }
        },
        true
    );
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ?????????? ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%84%D0%BE%D1%80%D0%BC%D0%B0%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20(LearningForm)/patchItemResource-learningformentity-patch_1
 * @param {string} name
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningFormEntityDto, Error>>}
 */
export function updateLearningForm(id, { name }) {
    return this.request(
        {
            action: ServiceAction.LEARNING_FORM_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                name
            }
        },
        LearningFormEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ?????????????????? ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B0%D0%BC%D0%B8%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20(LearningProgram)/getCollectionResource-learningprogramentity-get_1_1
 *
 * @return {Promise<SafeResult<LearningProgramEntityDto[], Error>>}
 */
export function getLearningPrograms() {
    return this.request(
        {
            action: ServiceAction.LEARNING_PROGRAM_GET
        },
        LearningProgramEntityDto
    );
}

/**
 * @description ???????????????????? ????????????????: ?????????????????? ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B0%D0%BC%D0%B8%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20(LearningProgram)/postCollectionResource-learningprogramentity-post_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} external_id
 * @param {string} name
 * @param {string} description
 * @param {boolean} is_supervisor_acceptance_required
 * @param {boolean} is_hr_acceptance_required
 * @param {string} status
 * @param {string} catalog
 * @param {boolean} actual
 *
 * @return {Promise<SafeResult<LearningProgramEntityDto, Error>>}
 */
export function createLearningProgram({
    date_from,
    date_to,
    external_id,
    name,
    description,
    is_supervisor_acceptance_required,
    is_hr_acceptance_required,
    status,
    catalog,
    actual
}) {
    return this.request(
        {
            action: ServiceAction.LEARNING_PROGRAM_CREATE,
            params: {
                date_from,
                date_to,
                external_id,
                name,
                description,
                is_supervisor_acceptance_required,
                is_hr_acceptance_required,
                status,
                catalog,
                actual
            }
        },
        LearningProgramEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ?????????????? ???????????????? ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BA%D0%B0%D1%82%D0%B0%D0%BB%D0%BE%D0%B3%D0%B0%D0%BC%D0%B8%20%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20(LearningProgramCatalog)/getCollectionResource-learningprogramcatalogentity-get_1_1
 *
 * @return {Promise<SafeResult<LearningProgramCatalogEntityDto[], Error>>}
 */
export function getLearningProgramCatalogs() {
    return this.request(
        {
            action: ServiceAction.LEARNING_PROGRAM_CATALOG_GET
        },
        LearningProgramCatalogEntityDto
    );
}

/**
 * @description ???????????????????? ????????????????: ?????????????? ???????????????? ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BA%D0%B0%D1%82%D0%B0%D0%BB%D0%BE%D0%B3%D0%B0%D0%BC%D0%B8%20%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20(LearningProgramCatalog)/postCollectionResource-learningprogramcatalogentity-post_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {number} parent_id
 * @param {string} external_id
 * @param {string} name
 * @param {number} member_count
 * @param {boolean} actual
 *
 * @return {Promise<SafeResult<LearningProgramCatalogEntityDto, Error>>}
 */
export function createLearningProgramCatalog({
    date_from,
    date_to,
    parent_id,
    external_id,
    name,
    member_count,
    actual
}) {
    return this.request(
        {
            action: ServiceAction.LEARNING_PROGRAM_CATALOG_CREATE,
            params: {
                date_from,
                date_to,
                parent_id,
                external_id,
                name,
                member_count,
                actual
            }
        },
        LearningProgramCatalogEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ?????????????? ???????????????? ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BA%D0%B0%D1%82%D0%B0%D0%BB%D0%BE%D0%B3%D0%B0%D0%BC%D0%B8%20%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20(LearningProgramCatalog)/getItemResource-learningprogramcatalogentity-get_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningProgramCatalogEntityDto, Error>>}
 */
export function getLearningProgramCatalogById(id) {
    return this.request(
        {
            action: ServiceAction.LEARNING_PROGRAM_CATALOG_GET_BY_ID,
            pathParams: { id }
        },
        LearningProgramCatalogEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????? ??????????????: ?????????????? ???????????????? ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BA%D0%B0%D1%82%D0%B0%D0%BB%D0%BE%D0%B3%D0%B0%D0%BC%D0%B8%20%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20(LearningProgramCatalog)/putItemResource-learningprogramcatalogentity-put_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {number} parent_id
 * @param {string} external_id
 * @param {string} name
 * @param {number} member_count
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningProgramCatalogEntityDto, Error>>}
 */
export function replaceLearningProgramCatalog(
    id,
    { date_from, date_to, parent_id, external_id, name, member_count, actual }
) {
    return this.request(
        {
            action: ServiceAction.LEARNING_PROGRAM_CATALOG_REPLACE_BY_ID,
            pathParams: { id },
            params: {
                date_from,
                date_to,
                parent_id,
                external_id,
                name,
                member_count,
                actual
            }
        },
        LearningProgramCatalogEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ?????????????? ???????????????? ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BA%D0%B0%D1%82%D0%B0%D0%BB%D0%BE%D0%B3%D0%B0%D0%BC%D0%B8%20%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20(LearningProgramCatalog)/deleteItemResource-learningprogramcatalogentity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function deleteLearningProgramCatalog(id) {
    return this.request(
        {
            action: ServiceAction.LEARNING_PROGRAM_CATALOG_DELETE_BY_ID,
            pathParams: { id }
        },
        true
    );
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ?????????????? ???????????????? ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BA%D0%B0%D1%82%D0%B0%D0%BB%D0%BE%D0%B3%D0%B0%D0%BC%D0%B8%20%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20(LearningProgramCatalog)/patchItemResource-learningprogramcatalogentity-patch_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {number} parent_id
 * @param {string} external_id
 * @param {string} name
 * @param {number} member_count
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningProgramCatalogEntityDto, Error>>}
 */
export function updateLearningProgramCatalog(
    id,
    { date_from, date_to, parent_id, external_id, name, member_count, actual }
) {
    return this.request(
        {
            action: ServiceAction.LEARNING_PROGRAM_CATALOG_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                date_from,
                date_to,
                parent_id,
                external_id,
                name,
                member_count,
                actual
            }
        },
        LearningProgramCatalogEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????????????? ?????????? ???????????????????? ?? ???????????????????? ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%B2%D0%B8%D0%B4%D0%BE%D0%B2%20%D0%B4%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D0%BE%D0%B2%20%D0%BA%20%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B0%D0%BC%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20(LearningProgramDocumentType)/getCollectionResource-learningprogramdocumenttypeentity-get_1_1
 *
 * @return {Promise<SafeResult<LearningProgramDocumentTypeEntityDto[], Error>>}
 */
export function getLearningProgramDocumentTypes() {
    return this.request(
        {
            action: ServiceAction.LEARNING_PROGRAM_DOCUMENT_TYPE_GET
        },
        LearningProgramDocumentTypeEntityDto
    );
}

/**
 * @description ???????????????????? ????????????????: ???????????????? ?????????? ???????????????????? ?? ???????????????????? ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%B2%D0%B8%D0%B4%D0%BE%D0%B2%20%D0%B4%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D0%BE%D0%B2%20%D0%BA%20%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B0%D0%BC%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20(LearningProgramDocumentType)/postCollectionResource-learningprogramdocumenttypeentity-post_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} template_url
 * @param {string} duration
 * @param {string} learning_program
 * @param {string} document_type
 * @param {boolean} actual
 *
 * @return {Promise<SafeResult<LearningProgramDocumentTypeEntityDto, Error>>}
 */
export function createLearningProgramDocumentType({
    date_from,
    date_to,
    template_url,
    duration,
    learning_program,
    document_type,
    actual
}) {
    return this.request(
        {
            action: ServiceAction.LEARNING_PROGRAM_DOCUMENT_TYPE_CREATE,
            params: {
                id,
                date_from,
                date_to,
                template_url,
                duration,
                learning_program,
                document_type,
                actual
            }
        },
        LearningProgramDocumentTypeEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????????????? ?????????? ???????????????????? ?? ???????????????????? ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%B2%D0%B8%D0%B4%D0%BE%D0%B2%20%D0%B4%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D0%BE%D0%B2%20%D0%BA%20%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B0%D0%BC%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20(LearningProgramDocumentType)/getItemResource-learningprogramdocumenttypeentity-get_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningProgramDocumentTypeEntityDto, Error>>}
 */
export function getLearningProgramDocumentTypeById(id) {
    return this.request(
        {
            action: ServiceAction.LEARNING_PROGRAM_DOCUMENT_TYPE_GET_BY_ID,
            pathParams: { id }
        },
        LearningProgramDocumentTypeEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????? ??????????????: ???????????????? ?????????? ???????????????????? ?? ???????????????????? ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%B2%D0%B8%D0%B4%D0%BE%D0%B2%20%D0%B4%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D0%BE%D0%B2%20%D0%BA%20%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B0%D0%BC%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20(LearningProgramDocumentType)/putItemResource-learningprogramdocumenttypeentity-put_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} template_url
 * @param {string} duration
 * @param {LearningProgramEntityDto} learning_program
 * @param {string} document_type
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningProgramDocumentTypeEntityDto, Error>>}
 */
export function replaceLearningProgramDocumentType(
    id,
    { date_from, date_to, template_url, duration, learning_program, document_type, actual }
) {
    return this.request(
        {
            action: ServiceAction.LEARNING_PROGRAM_DOCUMENT_TYPE_REPLACE_BY_ID,
            pathParams: { id },
            params: {
                id,
                date_from,
                date_to,
                template_url,
                duration,
                learning_program,
                document_type,
                actual
            }
        },
        LearningProgramDocumentTypeEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ???????????????? ?????????? ???????????????????? ?? ???????????????????? ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%B2%D0%B8%D0%B4%D0%BE%D0%B2%20%D0%B4%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D0%BE%D0%B2%20%D0%BA%20%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B0%D0%BC%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20(LearningProgramDocumentType)/deleteItemResource-learningprogramdocumenttypeentity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function deleteLearningProgramDocumentTypeById(id) {
    return this.request({
        action: ServiceAction.LEARNING_PROGRAM_DOCUMENT_TYPE_DELETE_BY_ID,
        pathParams: { id }
    });
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ???????????????? ?????????? ???????????????????? ?? ???????????????????? ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%B2%D0%B8%D0%B4%D0%BE%D0%B2%20%D0%B4%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D0%BE%D0%B2%20%D0%BA%20%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B0%D0%BC%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20(LearningProgramDocumentType)/patchItemResource-learningprogramdocumenttypeentity-patch_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} template_url
 * @param {string} duration
 * @param {LearningProgramEntityDto} learning_program
 * @param {string} document_type
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningProgramDocumentTypeEntityDto, Error>>}
 */
export function updateLearningProgramDocumentType(
    id,
    { date_from, date_to, template_url, duration, learning_program, document_type, actual }
) {
    return this.request(
        {
            action: ServiceAction.LEARNING_PROGRAM_DOCUMENT_TYPE_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                id,
                date_from,
                date_to,
                template_url,
                duration,
                learning_program,
                document_type,
                actual
            }
        },
        LearningProgramDocumentTypeEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????????????? ???????????? ?? ???????????????????? ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%BA%D1%83%D1%80%D1%81%D0%BE%D0%B2%20%D0%BA%20%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B0%D0%BC%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20(LearningProgramLearningCourse)/getCollectionResource-learningprogramlearningcourseentity-get_1_1
 * @param {Record<string, number>} [filter=null]
 * @return {Promise<SafeResult<LearningProgramLearningCourseBindingDto[], Error>>}
 */
export function getLearningProgramLearningCourseBindings(filter = null) {
    if (filter != null) {
        return getLearningProgramLearningCourseBindingsByFilter.call(this, filter);
    }
    // prettier-ignore
    return this.request(
        { action: ServiceAction.LEARNING_PROGRAM_LEARNING_COURSE_GET },
        LearningProgramLearningCourseBindingDto
    );
}

/**
 * @description ???????????????????? ????????????????: ???????????????? ???????????? ?? ???????????????????? ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%BA%D1%83%D1%80%D1%81%D0%BE%D0%B2%20%D0%BA%20%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B0%D0%BC%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20(LearningProgramLearningCourse)/postCollectionResource-learningprogramlearningcourseentity-post_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {number} created_by_employee_id
 * @param {number} deleted_by_employee_id
 * @param {LearningProgramEntityDto} learning_program
 * @param {string} learning_course
 * @param {boolean} actual
 *
 * @return {Promise<SafeResult<LearningProgramLearningCourseBindingDto, Error>>}
 */
export function createLearningProgramLearningCourseBinding({
    date_from,
    date_to,
    created_by_employee_id,
    deleted_by_employee_id,
    learning_program,
    learning_course,
    actual
}) {
    return this.request(
        {
            action: ServiceAction.LEARNING_PROGRAM_LEARNING_COURSE_CREATE,
            params: {
                id,
                date_from,
                date_to,
                created_by_employee_id,
                deleted_by_employee_id,
                learning_program,
                learning_course,
                actual
            }
        },
        LearningProgramLearningCourseBindingDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????????????? ???????????? ?? ???????????????????? ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B7%D0%B0%D0%B2%D0%B8%D1%81%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8F%D0%BC%D0%B8%20%D0%BC%D0%B5%D0%B6%D0%B4%D1%83%20%D0%BA%D1%83%D1%80%D1%81%D0%B0%D0%BC%D0%B8%20%D0%B2%20%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B0%D1%85%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20(LearningProgramLearningCourseDependency)/getCollectionResource-learningprogramlearningcoursedependencyentity-get_1_1
 *
 * @return {Promise<SafeResult<LearningProgramLearningCourseDependencyEntityDto, Error>>}
 */
export function getLearningProgramLearningCourseDependency() {
    return this.request(
        {
            action: ServiceAction.LEARNING_PROGRAM_LEARNING_COURSE_DEPENDENCY_GET
        },
        LearningProgramLearningCourseDependencyEntityDto
    );
}

/**
 * @description ???????????????????? ????????????????: ???????????????? ???????????? ?? ???????????????????? ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B7%D0%B0%D0%B2%D0%B8%D1%81%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8F%D0%BC%D0%B8%20%D0%BC%D0%B5%D0%B6%D0%B4%D1%83%20%D0%BA%D1%83%D1%80%D1%81%D0%B0%D0%BC%D0%B8%20%D0%B2%20%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B0%D1%85%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20(LearningProgramLearningCourseDependency)/postCollectionResource-learningprogramlearningcoursedependencyentity-post_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {LearningProgramLearningCourseEntityDto} learning_program_learning_course
 * @param {LearningProgramLearningCourseEntityDto} prev_learning_program_learning_course
 * @param {boolean} actual
 *
 * @return {Promise<SafeResult<LearningProgramLearningCourseDependencyEntityDto, Error>>}
 */
export function createLearningProgramLearningCourseDependency({
    date_from,
    date_to,
    learning_program_learning_course,
    prev_learning_program_learning_course,
    actual
}) {
    return this.request(
        {
            action: ServiceAction.LEARNING_PROGRAM_LEARNING_COURSE_DEPENDENCY_CREATE,
            params: {
                id,
                date_from,
                date_to,
                learning_program_learning_course,
                prev_learning_program_learning_course,
                actual
            }
        },
        LearningProgramLearningCourseDependencyEntityDto
    );
}

/**
 * @description undefined
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B7%D0%B0%D0%B2%D0%B8%D1%81%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8F%D0%BC%D0%B8%20%D0%BC%D0%B5%D0%B6%D0%B4%D1%83%20%D0%BA%D1%83%D1%80%D1%81%D0%B0%D0%BC%D0%B8%20%D0%B2%20%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B0%D1%85%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20(LearningProgramLearningCourseDependency)/executeSearch-learningprogramlearningcoursedependencyentity-get_1
 * @param {Array} id
 * @param {string} id
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function getLearningProgramLearningCourseDependencySearchFindByLearningProgramLearningCourseById(id) {
    return this.request({
        action: ServiceAction.LEARNING_PROGRAM_LEARNING_COURSE_DEPENDENCY_SEARCH_FIND_BY_LEARNING_PROGRAM_LEARNING_COURSE_GET,
        params: { id }
    });
}

/**
 * @description undefined
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B7%D0%B0%D0%B2%D0%B8%D1%81%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8F%D0%BC%D0%B8%20%D0%BC%D0%B5%D0%B6%D0%B4%D1%83%20%D0%BA%D1%83%D1%80%D1%81%D0%B0%D0%BC%D0%B8%20%D0%B2%20%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B0%D1%85%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20(LearningProgramLearningCourseDependency)/executeSearch-learningprogramlearningcoursedependencyentity-get_1_1
 * @param {string[]|string} id
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function getLearningProgramLearningCourseDependencySearchFindByPrevLearningProgramLearningCourseById(id) {
    return this.request({
        action: ServiceAction.LEARNING_PROGRAM_LEARNING_COURSE_DEPENDENCY_SEARCH_FIND_BY_PREV_LEARNING_PROGRAM_LEARNING_COURSE_GET,
        params: { id }
    });
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????????????? ???????????? ?? ???????????????????? ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B7%D0%B0%D0%B2%D0%B8%D1%81%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8F%D0%BC%D0%B8%20%D0%BC%D0%B5%D0%B6%D0%B4%D1%83%20%D0%BA%D1%83%D1%80%D1%81%D0%B0%D0%BC%D0%B8%20%D0%B2%20%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B0%D1%85%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20(LearningProgramLearningCourseDependency)/getItemResource-learningprogramlearningcoursedependencyentity-get_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningProgramLearningCourseDependencyEntityDto, Error>>}
 */
export function getLearningProgramLearningCourseDependencyById(id) {
    return this.request(
        {
            action: ServiceAction.LEARNING_PROGRAM_LEARNING_COURSE_DEPENDENCY_GET_BY_ID,
            pathParams: { id }
        },
        LearningProgramLearningCourseDependencyEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????? ??????????????: ???????????????? ???????????? ?? ???????????????????? ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B7%D0%B0%D0%B2%D0%B8%D1%81%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8F%D0%BC%D0%B8%20%D0%BC%D0%B5%D0%B6%D0%B4%D1%83%20%D0%BA%D1%83%D1%80%D1%81%D0%B0%D0%BC%D0%B8%20%D0%B2%20%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B0%D1%85%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20(LearningProgramLearningCourseDependency)/putItemResource-learningprogramlearningcoursedependencyentity-put_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {LearningProgramLearningCourseBindingDto} learning_program_learning_course
 * @param {LearningProgramLearningCourseBindingDto} prev_learning_program_learning_course
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningProgramLearningCourseDependencyEntityDto, Error>>}
 */
export function replaceLearningProgramLearningCourseDependency(
    id,
    { date_from, date_to, learning_program_learning_course, prev_learning_program_learning_course, actual }
) {
    return this.request(
        {
            action: ServiceAction.LEARNING_PROGRAM_LEARNING_COURSE_DEPENDENCY_REPLACE_BY_ID,
            pathParams: { id },
            params: {
                id,
                date_from,
                date_to,
                learning_program_learning_course,
                prev_learning_program_learning_course,
                actual
            }
        },
        LearningProgramLearningCourseDependencyEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ???????????????? ???????????? ?? ???????????????????? ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B7%D0%B0%D0%B2%D0%B8%D1%81%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8F%D0%BC%D0%B8%20%D0%BC%D0%B5%D0%B6%D0%B4%D1%83%20%D0%BA%D1%83%D1%80%D1%81%D0%B0%D0%BC%D0%B8%20%D0%B2%20%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B0%D1%85%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20(LearningProgramLearningCourseDependency)/deleteItemResource-learningprogramlearningcoursedependencyentity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function deleteLearningProgramLearningCourseDependencyById(id) {
    return this.request({
        action: ServiceAction.LEARNING_PROGRAM_LEARNING_COURSE_DEPENDENCY_DELETE_BY_ID,
        pathParams: { id }
    });
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ???????????????? ???????????? ?? ???????????????????? ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B7%D0%B0%D0%B2%D0%B8%D1%81%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8F%D0%BC%D0%B8%20%D0%BC%D0%B5%D0%B6%D0%B4%D1%83%20%D0%BA%D1%83%D1%80%D1%81%D0%B0%D0%BC%D0%B8%20%D0%B2%20%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B0%D1%85%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20(LearningProgramLearningCourseDependency)/patchItemResource-learningprogramlearningcoursedependencyentity-patch_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {LearningProgramLearningCourseBindingDto} learning_program_learning_course
 * @param {LearningProgramLearningCourseBindingDto} prev_learning_program_learning_course
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningProgramLearningCourseDependencyEntityDto, Error>>}
 */
export function updateLearningProgramLearningCourseDependency(
    id,
    { date_from, date_to, learning_program_learning_course, prev_learning_program_learning_course, actual }
) {
    return this.request(
        {
            action: ServiceAction.LEARNING_PROGRAM_LEARNING_COURSE_DEPENDENCY_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                id,
                date_from,
                date_to,
                learning_program_learning_course,
                prev_learning_program_learning_course,
                actual
            }
        },
        LearningProgramLearningCourseDependencyEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%B3%D1%80%D1%83%D0%BF%D0%BF%20%D0%BA%20%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B0%D0%BC%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20(LearningProgramLearningCourseParty)/getCollectionResource-learningprogramlearningcoursepartyentity-get_1_1
 *
 * @return {Promise<SafeResult<LearningProgramLearningCoursePartyEntityDto, Error>>}
 */
export function getLearningProgramLearningCourseParty() {
    return this.request(
        {
            action: ServiceAction.LEARNING_PROGRAM_LEARNING_COURSE_PARTY_GET
        },
        LearningProgramLearningCoursePartyEntityDto
    );
}

/**
 * @description ???????????????????? ????????????????: ???????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%B3%D1%80%D1%83%D0%BF%D0%BF%20%D0%BA%20%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B0%D0%BC%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20(LearningProgramLearningCourseParty)/postCollectionResource-learningprogramlearningcoursepartyentity-post_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {LearningProgramEntityDto} learning_program
 * @param {LearningCoursePartyEntityDto} learning_course_party
 * @param {boolean} actual
 *
 * @return {Promise<SafeResult<LearningProgramLearningCoursePartyEntityDto, Error>>}
 */
export function createLearningProgramLearningCourseParty({
    date_from,
    date_to,
    learning_program,
    learning_course_party,
    actual
}) {
    return this.request(
        {
            action: ServiceAction.LEARNING_PROGRAM_LEARNING_COURSE_PARTY_CREATE,
            params: {
                id,
                date_from,
                date_to,
                learning_program,
                learning_course_party,
                actual
            }
        },
        LearningProgramLearningCoursePartyEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%B3%D1%80%D1%83%D0%BF%D0%BF%20%D0%BA%20%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B0%D0%BC%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20(LearningProgramLearningCourseParty)/getItemResource-learningprogramlearningcoursepartyentity-get_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningProgramLearningCoursePartyEntityDto, Error>>}
 */
export function getLearningProgramLearningCoursePartyById(id) {
    return this.request(
        {
            action: ServiceAction.LEARNING_PROGRAM_LEARNING_COURSE_PARTY_GET_BY_ID,
            pathParams: { id }
        },
        LearningProgramLearningCoursePartyEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????? ??????????????: ???????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%B3%D1%80%D1%83%D0%BF%D0%BF%20%D0%BA%20%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B0%D0%BC%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20(LearningProgramLearningCourseParty)/putItemResource-learningprogramlearningcoursepartyentity-put_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {LearningProgramEntityDto} learning_program
 * @param {LearningCoursePartyEntityDto} learning_course_party
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningProgramLearningCoursePartyEntityDto, Error>>}
 */
export function replaceLearningProgramLearningCourseParty(
    id,
    { date_from, date_to, learning_program, learning_course_party, actual }
) {
    return this.request(
        {
            action: ServiceAction.LEARNING_PROGRAM_LEARNING_COURSE_PARTY_REPLACE_BY_ID,
            pathParams: { id },
            params: {
                id,
                date_from,
                date_to,
                learning_program,
                learning_course_party,
                actual
            }
        },
        LearningProgramLearningCoursePartyEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ???????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%B3%D1%80%D1%83%D0%BF%D0%BF%20%D0%BA%20%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B0%D0%BC%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20(LearningProgramLearningCourseParty)/deleteItemResource-learningprogramlearningcoursepartyentity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function deleteLearningProgramLearningCoursePartyById(id) {
    return this.request({
        action: ServiceAction.LEARNING_PROGRAM_LEARNING_COURSE_PARTY_DELETE_BY_ID,
        pathParams: { id }
    });
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ???????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%B3%D1%80%D1%83%D0%BF%D0%BF%20%D0%BA%20%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B0%D0%BC%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20(LearningProgramLearningCourseParty)/patchItemResource-learningprogramlearningcoursepartyentity-patch_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {LearningProgramEntityDto} learning_program
 * @param {LearningCoursePartyEntityDto} learning_course_party
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningProgramLearningCoursePartyEntityDto, Error>>}
 */
export function updateLearningProgramLearningCourseParty(
    id,
    { date_from, date_to, learning_program, learning_course_party, actual }
) {
    return this.request(
        {
            action: ServiceAction.LEARNING_PROGRAM_LEARNING_COURSE_PARTY_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                id,
                date_from,
                date_to,
                learning_program,
                learning_course_party,
                actual
            }
        },
        LearningProgramLearningCoursePartyEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ??????????????????: ???????????????? ???????????? ?? ???????????????????? ???????????????? ???? ?????????? ?????? ??????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%BA%D1%83%D1%80%D1%81%D0%BE%D0%B2%20%D0%BA%20%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B0%D0%BC%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20(LearningProgramLearningCourse)/executeSearch-learningprogramlearningcourseentity-get_1
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%BA%D1%83%D1%80%D1%81%D0%BE%D0%B2%20%D0%BA%20%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B0%D0%BC%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20(LearningProgramLearningCourse)/executeSearch-learningprogramlearningcourseentity-get_1_1
 * @param {number} learningCourseId
 * @param {number} learningProgramId
 *
 * @return {Promise<SafeResult<LearningProgramLearningCourseBindingDto[], Error>>}
 */
export function getLearningProgramLearningCourseBindingsByFilter({ learningCourseId, learningProgramId }) {
    const requestParams =
        learningCourseId != null
            ? {
                  action: ServiceAction.LEARNING_PROGRAM_LEARNING_COURSE_SEARCH_FIND_BY_LEARNING_COURSE_GET,
                  params: { learning_course_id: learningCourseId }
              }
            : {
                  action: ServiceAction.LEARNING_PROGRAM_LEARNING_COURSE_SEARCH_FIND_BY_LEARNING_PROGRAM_GET,
                  params: { learning_program_id: learningProgramId }
              };

    return this.request(requestParams, LearningProgramLearningCourseBindingDto);
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????????????? ???????????? ?? ???????????????????? ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%BA%D1%83%D1%80%D1%81%D0%BE%D0%B2%20%D0%BA%20%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B0%D0%BC%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20(LearningProgramLearningCourse)/getItemResource-learningprogramlearningcourseentity-get_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningProgramLearningCourseBindingDto, Error>>}
 */
export function getLearningProgramLearningCourseBindingById(id) {
    return this.request(
        {
            action: ServiceAction.LEARNING_PROGRAM_LEARNING_COURSE_GET_BY_ID,
            pathParams: { id }
        },
        LearningProgramLearningCourseBindingDto
    );
}

/**
 * @description ?????????????????? ???????????????? ??????????????: ???????????????? ???????????? ?? ???????????????????? ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%BA%D1%83%D1%80%D1%81%D0%BE%D0%B2%20%D0%BA%20%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B0%D0%BC%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20(LearningProgramLearningCourse)/putItemResource-learningprogramlearningcourseentity-put_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {number} created_by_employee_id
 * @param {number} deleted_by_employee_id
 * @param {LearningProgramEntityDto} learning_program
 * @param {string} learning_course
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningProgramLearningCourseBindingDto, Error>>}
 */
export function replaceLearningProgramLearningCourseBinding(
    id,
    { date_from, date_to, created_by_employee_id, deleted_by_employee_id, learning_program, learning_course, actual }
) {
    return this.request(
        {
            action: ServiceAction.LEARNING_PROGRAM_LEARNING_COURSE_REPLACE_BY_ID,
            pathParams: { id },
            params: {
                id,
                date_from,
                date_to,
                created_by_employee_id,
                deleted_by_employee_id,
                learning_program,
                learning_course,
                actual
            }
        },
        LearningProgramLearningCourseBindingDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ???????????????? ???????????? ?? ???????????????????? ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%BA%D1%83%D1%80%D1%81%D0%BE%D0%B2%20%D0%BA%20%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B0%D0%BC%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20(LearningProgramLearningCourse)/deleteItemResource-learningprogramlearningcourseentity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function deleteLearningProgramLearningCourseBinding(id) {
    return this.request({
        action: ServiceAction.LEARNING_PROGRAM_LEARNING_COURSE_DELETE_BY_ID,
        pathParams: { id }
    });
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ???????????????? ???????????? ?? ???????????????????? ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%BA%D1%83%D1%80%D1%81%D0%BE%D0%B2%20%D0%BA%20%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B0%D0%BC%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20(LearningProgramLearningCourse)/patchItemResource-learningprogramlearningcourseentity-patch_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {number} created_by_employee_id
 * @param {number} deleted_by_employee_id
 * @param {LearningProgramEntityDto} learning_program
 * @param {string} learning_course
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningProgramLearningCourseBindingDto, Error>>}
 */
export function updateLearningProgramLearningCourseBinding(
    id,
    { date_from, date_to, created_by_employee_id, deleted_by_employee_id, learning_program, learning_course, actual }
) {
    return this.request(
        {
            action: ServiceAction.LEARNING_PROGRAM_LEARNING_COURSE_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                id,
                date_from,
                date_to,
                created_by_employee_id,
                deleted_by_employee_id,
                learning_program,
                learning_course,
                actual
            }
        },
        LearningProgramLearningCourseBindingDto
    );
}

/**
 * @description undefined
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B0%D0%BC%D0%B8%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20(LearningProgram)/executeSearch-learningprogramentity-get_1
 * @param {number} catalogId
 * @param {string} catalogId
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function getLearningProgramsByCatalogId(catalogId) {
    return this.request({
        action: ServiceAction.LEARNING_PROGRAM_SEARCH_FIND_BY_CATALOG_GET,
        params: { catalog_id: catalogId }
    });
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ?????????????????? ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B0%D0%BC%D0%B8%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20(LearningProgram)/getItemResource-learningprogramentity-get_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningProgramEntityDto, Error>>}
 */
export function getLearningProgramById(id) {
    return this.request(
        {
            action: ServiceAction.LEARNING_PROGRAM_GET_BY_ID,
            pathParams: { id }
        },
        LearningProgramEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ?????????????????? ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B0%D0%BC%D0%B8%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20(LearningProgram)/deleteItemResource-learningprogramentity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function deleteLearningProgram(id) {
    return this.request({
        action: ServiceAction.LEARNING_PROGRAM_DELETE_BY_ID,
        pathParams: { id }
    });
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ?????????????????? ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B0%D0%BC%D0%B8%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20(LearningProgram)/patchItemResource-learningprogramentity-patch_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} external_id
 * @param {string} name
 * @param {string} description
 * @param {boolean} is_supervisor_acceptance_required
 * @param {boolean} is_hr_acceptance_required
 * @param {string} status
 * @param {string} catalog
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningProgramEntityDto, Error>>}
 */
export function updateLearningProgram(
    id,
    {
        date_from,
        date_to,
        external_id,
        name,
        description,
        is_supervisor_acceptance_required,
        is_hr_acceptance_required,
        status,
        catalog,
        actual
    },
    isReplace = false
) {
    return this.request(
        {
            action: isReplace
                ? ServiceAction.LEARNING_PROGRAM_UPDATE_BY_ID
                : ServiceAction.LEARNING_PROGRAM_REPLACE_BY_ID,
            pathParams: { id },
            params: {
                date_from,
                date_to,
                external_id,
                name,
                description,
                is_supervisor_acceptance_required,
                is_hr_acceptance_required,
                status,
                catalog,
                actual
            }
        },
        LearningProgramEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ?????????????? ????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%83%D1%87%D0%B5%D0%B1%D0%BD%D1%8B%D0%BC%D0%B8%20%D0%B3%D1%80%D1%83%D0%BF%D0%BF%D0%B0%D0%BC%D0%B8%20(LearningStudyGroup)/getCollectionResource-learningstudygroupentity-get_1_1
 *
 * @return {Promise<SafeResult<LearningStudyGroupDto[], Error>>}
 */
export function getLearningStudyGroups() {
    return this.request(
        {
            action: ServiceAction.LEARNING_STUDYGROUP_GET
        },
        LearningStudyGroupDto
    );
}

/**
 * @description ???????????????????? ????????????????: ?????????????? ????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%83%D1%87%D0%B5%D0%B1%D0%BD%D1%8B%D0%BC%D0%B8%20%D0%B3%D1%80%D1%83%D0%BF%D0%BF%D0%B0%D0%BC%D0%B8%20(LearningStudyGroup)/postCollectionResource-learningstudygroupentity-post_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} manual_number
 * @param {number} learning_studygroup_numerator_number
 * @param {LearningStudyGroupNumeratorEntityDto} learning_studygroup_numerator
 * @param {string} full_number
 * @param {boolean} actual
 *
 * @return {Promise<SafeResult<LearningStudyGroupDto, Error>>}
 */
export function createLearningStudyGroup({
    date_from,
    date_to,
    manual_number,
    learning_studygroup_numerator_number,
    learning_studygroup_numerator,
    full_number,
    actual
}) {
    return this.request(
        {
            action: ServiceAction.LEARNING_STUDYGROUP_CREATE,
            params: {
                date_from,
                date_to,
                manual_number,
                learning_studygroup_numerator_number,
                learning_studygroup_numerator,
                full_number,
                actual
            }
        },
        LearningStudyGroupDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ?????????????????? ?????????????? ??????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BD%D1%83%D0%BC%D0%B5%D1%80%D0%B0%D1%82%D0%BE%D1%80%D0%B0%D0%BC%D0%B8%20%D1%83%D1%87%D0%B5%D0%B1%D0%BD%D1%8B%D1%85%20%D0%B3%D1%80%D1%83%D0%BF%D0%BF%20(LearningStudyGroupNumerator)/getCollectionResource-learningstudygroupnumeratorentity-get_1_1
 *
 * @return {Promise<SafeResult<LearningStudyGroupNumeratorEntityDto, Error>>}
 */
export function getLearningStudyGroupNumerator() {
    return this.request(
        {
            action: ServiceAction.LEARNING_STUDYGROUP_NUMERATOR_GET
        },
        LearningStudyGroupNumeratorEntityDto
    );
}

/**
 * @description ???????????????????? ????????????????: ?????????????????? ?????????????? ??????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BD%D1%83%D0%BC%D0%B5%D1%80%D0%B0%D1%82%D0%BE%D1%80%D0%B0%D0%BC%D0%B8%20%D1%83%D1%87%D0%B5%D0%B1%D0%BD%D1%8B%D1%85%20%D0%B3%D1%80%D1%83%D0%BF%D0%BF%20(LearningStudyGroupNumerator)/postCollectionResource-learningstudygroupnumeratorentity-post_1
 * @param {string} name
 * @param {string} prefix
 * @param {number} current
 * @param {string} suffix
 * @param {string} full_number
 *
 * @return {Promise<SafeResult<LearningStudyGroupNumeratorEntityDto, Error>>}
 */
export function createLearningStudyGroupNumerator({ name, prefix, current, suffix, full_number }) {
    return this.request(
        {
            action: ServiceAction.LEARNING_STUDYGROUP_NUMERATOR_CREATE,
            params: {
                name,
                prefix,
                current,
                suffix,
                full_number
            }
        },
        LearningStudyGroupNumeratorEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ?????????????????? ?????????????? ??????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BD%D1%83%D0%BC%D0%B5%D1%80%D0%B0%D1%82%D0%BE%D1%80%D0%B0%D0%BC%D0%B8%20%D1%83%D1%87%D0%B5%D0%B1%D0%BD%D1%8B%D1%85%20%D0%B3%D1%80%D1%83%D0%BF%D0%BF%20(LearningStudyGroupNumerator)/getItemResource-learningstudygroupnumeratorentity-get_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningStudyGroupNumeratorEntityDto, Error>>}
 */
export function getLearningStudyGroupNumeratorById(id) {
    return this.request(
        {
            action: ServiceAction.LEARNING_STUDYGROUP_NUMERATOR_GET_BY_ID,
            pathParams: { id }
        },
        LearningStudyGroupNumeratorEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????? ??????????????: ?????????????????? ?????????????? ??????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BD%D1%83%D0%BC%D0%B5%D1%80%D0%B0%D1%82%D0%BE%D1%80%D0%B0%D0%BC%D0%B8%20%D1%83%D1%87%D0%B5%D0%B1%D0%BD%D1%8B%D1%85%20%D0%B3%D1%80%D1%83%D0%BF%D0%BF%20(LearningStudyGroupNumerator)/putItemResource-learningstudygroupnumeratorentity-put_1
 * @param {string} name
 * @param {string} prefix
 * @param {number} current
 * @param {string} suffix
 * @param {string} full_number
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningStudyGroupNumeratorEntityDto, Error>>}
 */
export function replaceLearningStudyGroupNumerator(id, { name, prefix, current, suffix, full_number }) {
    return this.request(
        {
            action: ServiceAction.LEARNING_STUDYGROUP_NUMERATOR_REPLACE_BY_ID,
            pathParams: { id },
            params: {
                id,
                name,
                prefix,
                current,
                suffix,
                full_number
            }
        },
        LearningStudyGroupNumeratorEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ?????????????????? ?????????????? ??????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BD%D1%83%D0%BC%D0%B5%D1%80%D0%B0%D1%82%D0%BE%D1%80%D0%B0%D0%BC%D0%B8%20%D1%83%D1%87%D0%B5%D0%B1%D0%BD%D1%8B%D1%85%20%D0%B3%D1%80%D1%83%D0%BF%D0%BF%20(LearningStudyGroupNumerator)/deleteItemResource-learningstudygroupnumeratorentity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<boolean, Error>>}
 */
export function deleteLearningStudyGroupNumerator(id) {
    return this.request({
        action: ServiceAction.LEARNING_STUDYGROUP_NUMERATOR_DELETE_BY_ID,
        pathParams: { id }
    });
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ?????????????????? ?????????????? ??????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BD%D1%83%D0%BC%D0%B5%D1%80%D0%B0%D1%82%D0%BE%D1%80%D0%B0%D0%BC%D0%B8%20%D1%83%D1%87%D0%B5%D0%B1%D0%BD%D1%8B%D1%85%20%D0%B3%D1%80%D1%83%D0%BF%D0%BF%20(LearningStudygroupNumerator)/patchItemResource-learningstudygroupnumeratorentity-patch_1
 * @param {string} name
 * @param {string} prefix
 * @param {number} current
 * @param {string} suffix
 * @param {string} full_number
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningStudygroupNumeratorEntityDto, Error>>}
 */
export function updateLearningStudyGroupNumerator(id, { name, prefix, current, suffix, full_number }) {
    return this.request(
        {
            action: ServiceAction.LEARNING_STUDYGROUP_NUMERATOR_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                name,
                prefix,
                current,
                suffix,
                full_number
            }
        },
        LearningStudyGroupNumeratorEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ?????????????? ????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%83%D1%87%D0%B5%D0%B1%D0%BD%D1%8B%D0%BC%D0%B8%20%D0%B3%D1%80%D1%83%D0%BF%D0%BF%D0%B0%D0%BC%D0%B8%20(LearningStudyGroup)/getItemResource-learningstudygroupentity-get_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningStudyGroupDto, Error>>}
 */
export function getLearningStudyGroupById(id) {
    return this.request(
        {
            action: ServiceAction.LEARNING_STUDYGROUP_GET_BY_ID,
            pathParams: { id }
        },
        LearningStudyGroupDto
    );
}

/**
 * @description ?????????????????? ???????????????? ??????????????: ?????????????? ????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%83%D1%87%D0%B5%D0%B1%D0%BD%D1%8B%D0%BC%D0%B8%20%D0%B3%D1%80%D1%83%D0%BF%D0%BF%D0%B0%D0%BC%D0%B8%20(LearningStudyGroup)/putItemResource-learningstudygroupentity-put_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} manual_number
 * @param {number} learning_studygroup_numerator_number
 * @param {LearningStudyGroupNumeratorEntityDto} learning_studygroup_numerator
 * @param {string} full_number
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningStudyGroupDto, Error>>}
 */
export function replaceLearningStudyGroup(
    learningStudyGroupId,
    {
        id,
        date_from,
        date_to,
        manual_number,
        learning_studygroup_numerator_number,
        learning_studygroup_numerator,
        full_number,
        actual
    }
) {
    return this.request(
        {
            action: ServiceAction.LEARNING_STUDYGROUP_REPLACE_BY_ID,
            pathParams: { id: learningStudyGroupId },
            params: {
                id,
                date_from,
                date_to,
                manual_number,
                learning_studygroup_numerator_number,
                learning_studygroup_numerator,
                full_number,
                actual
            }
        },
        LearningStudyGroupDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ?????????????? ????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%83%D1%87%D0%B5%D0%B1%D0%BD%D1%8B%D0%BC%D0%B8%20%D0%B3%D1%80%D1%83%D0%BF%D0%BF%D0%B0%D0%BC%D0%B8%20(LearningStudyGroup)/deleteItemResource-learningstudygroupentity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function deleteLearningStudyGroup(id) {
    return this.request({
        action: ServiceAction.LEARNING_STUDYGROUP_DELETE_BY_ID,
        pathParams: { id }
    });
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ?????????????? ????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%83%D1%87%D0%B5%D0%B1%D0%BD%D1%8B%D0%BC%D0%B8%20%D0%B3%D1%80%D1%83%D0%BF%D0%BF%D0%B0%D0%BC%D0%B8%20(LearningStudyGroup)/patchItemResource-learningstudygroupentity-patch_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} manual_number
 * @param {number} learning_studygroup_numerator_number
 * @param {LearningStudyGroupNumeratorEntityDto} learning_studygroup_numerator
 * @param {string} full_number
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<LearningStudyGroupDto, Error>>}
 */
export function updateLearningStudyGroup(
    id,
    {
        date_from,
        date_to,
        manual_number,
        learning_studygroup_numerator_number,
        learning_studygroup_numerator,
        full_number,
        actual
    }
) {
    return this.request(
        {
            action: ServiceAction.LEARNING_STUDYGROUP_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                date_from,
                date_to,
                manual_number,
                learning_studygroup_numerator_number,
                learning_studygroup_numerator,
                full_number,
                actual
            }
        },
        LearningStudyGroupDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ??????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%81%D0%BE%D0%BE%D0%B1%D1%89%D0%B5%D0%BD%D0%B8%D1%8F%D0%BC%D0%B8%20(Message)/getCollectionResource-messageentity-get_1_1
 *
 * @return {Promise<SafeResult<MessageEntityDto[], Error>>}
 */
export function getMessages(filter) {
    if (filter != null) {
        const { messageId, learningCourseId } = filter;
        if (learningCourseId) {
            return getMessagesThreadsByLearningCourseId.call(this, learningCourseId);
        }
        if (messageId) {
            return getMessagesThread.call(this, messageId);
        }
    }

    return this.request({ action: ServiceAction.MESSAGE_GET }, MessageEntityDto);
}

/**
 * @description ???????????????????? ????????????????: ??????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%81%D0%BE%D0%BE%D0%B1%D1%89%D0%B5%D0%BD%D0%B8%D1%8F%D0%BC%D0%B8%20(Message)/postCollectionResource-messageentity-post_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} message
 * @param {number} employee_id
 * @param {number} parent_id
 * @param {boolean} actual
 *
 * @return {Promise<SafeResult<MessageEntityDto, Error>>}
 */
export function createMessage({ date_from, date_to, message, employee_id, parent_id, actual }) {
    return this.request(
        {
            action: ServiceAction.MESSAGE_CREATE,
            params: {
                date_from,
                date_to,
                message,
                employee_id,
                parent_id,
                actual
            }
        },
        MessageEntityDto
    );
}

/**
 * @description undefined
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%81%D0%BE%D0%BE%D0%B1%D1%89%D0%B5%D0%BD%D0%B8%D1%8F%D0%BC%D0%B8%20(Message)/executeSearch-messageentity-get_1
 * @param {number} messageId
 * @param {string} messageId
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function getMessagesThread(messageId) {
    return this.request(
        {
            action: ServiceAction.MESSAGE_SEARCH_GET_THREAD_GET,
            params: { message_id: messageId }
        },
        MessageEntityDto
    );
}

/**
 * @description undefined
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%81%D0%BE%D0%BE%D0%B1%D1%89%D0%B5%D0%BD%D0%B8%D1%8F%D0%BC%D0%B8%20(Message)/executeSearch-messageentity-get_1_1
 * @param {number} learningCourseId
 *
 * @return {Promise<SafeResult<MessageEntityDto[], Error>>}
 */
export function getMessagesThreadsByLearningCourseId(learningCourseId) {
    return this.request(
        {
            action: ServiceAction.MESSAGE_SEARCH_GET_THREADS_FOR_LEARNING_COURSE_GET,
            params: { learning_course_id: learningCourseId }
        },
        MessageEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ??????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%81%D0%BE%D0%BE%D0%B1%D1%89%D0%B5%D0%BD%D0%B8%D1%8F%D0%BC%D0%B8%20(Message)/getItemResource-messageentity-get_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<MessageEntityDto, Error>>}
 */
export function getMessageById(id) {
    return this.request(
        {
            action: ServiceAction.MESSAGE_GET_BY_ID,
            pathParams: { id }
        },
        MessageEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????? ??????????????: ??????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%81%D0%BE%D0%BE%D0%B1%D1%89%D0%B5%D0%BD%D0%B8%D1%8F%D0%BC%D0%B8%20(Message)/putItemResource-messageentity-put_1
 * @param {string} messageId
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} message
 * @param {number} employee_id
 * @param {number} parent_id
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<MessageEntityDto, Error>>}
 */
export function replaceMessage(messageId, { id, date_from, date_to, message, employee_id, parent_id, actual }) {
    return this.request(
        {
            action: ServiceAction.MESSAGE_REPLACE_BY_ID,
            pathParams: { id: messageId },
            params: {
                id,
                date_from,
                date_to,
                message,
                employee_id,
                parent_id,
                actual
            }
        },
        MessageEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ??????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%81%D0%BE%D0%BE%D0%B1%D1%89%D0%B5%D0%BD%D0%B8%D1%8F%D0%BC%D0%B8%20(Message)/deleteItemResource-messageentity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<boolean, Error>>}
 */
export function deleteMessage(id) {
    return this.request({
        action: ServiceAction.MESSAGE_DELETE_BY_ID,
        pathParams: { id }
    });
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ??????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%81%D0%BE%D0%BE%D0%B1%D1%89%D0%B5%D0%BD%D0%B8%D1%8F%D0%BC%D0%B8%20(Message)/patchItemResource-messageentity-patch_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} message
 * @param {number} employee_id
 * @param {number} parent_id
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<MessageEntityDto, Error>>}
 */
export function updateMessage(id, { date_from, date_to, message, employee_id, parent_id, actual }) {
    return this.request(
        {
            action: ServiceAction.MESSAGE_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                date_from,
                date_to,
                message,
                employee_id,
                parent_id,
                actual
            }
        },
        MessageEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%81%D1%82%D0%B0%D1%82%D1%83%D1%81%D0%B0%D0%BC%D0%B8%20(Status)/getCollectionResource-statusentity-get_1_1
 *
 * @return {Promise<SafeResult<StatusEntityDto, Error>>}
 */
export function getStatuses() {
    return this.request(
        {
            action: ServiceAction.STATUS_GET
        },
        StatusEntityDto
    );
}

/**
 * @description ???????????????????? ????????????????: ????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%81%D1%82%D0%B0%D1%82%D1%83%D1%81%D0%B0%D0%BC%D0%B8%20(Status)/postCollectionResource-statusentity-post_1
 * @param {string} name
 *
 * @return {Promise<SafeResult<StatusEntityDto, Error>>}
 */
export function createStatus({ name }) {
    return this.request(
        {
            action: ServiceAction.STATUS_CREATE,
            params: {
                name
            }
        },
        StatusEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%81%D1%82%D0%B0%D1%82%D1%83%D1%81%D0%B0%D0%BC%D0%B8%20(Status)/getItemResource-statusentity-get_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<StatusEntityDto, Error>>}
 */
export function getStatusById(id) {
    return this.request(
        {
            action: ServiceAction.STATUS_GET_BY_ID,
            pathParams: { id }
        },
        StatusEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????? ??????????????: ????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%81%D1%82%D0%B0%D1%82%D1%83%D1%81%D0%B0%D0%BC%D0%B8%20(Status)/putItemResource-statusentity-put_1
 * @param {string} name
 * @param {string} statusId
 * @param {string} id
 *
 * @return {Promise<SafeResult<StatusEntityDto, Error>>}
 */
export function replaceStatus(statusId, { id, name }) {
    return this.request(
        {
            action: ServiceAction.STATUS_REPLACE_BY_ID,
            pathParams: { id: statusId },
            params: {
                id,
                name
            }
        },
        StatusEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%81%D1%82%D0%B0%D1%82%D1%83%D1%81%D0%B0%D0%BC%D0%B8%20(Status)/deleteItemResource-statusentity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function deleteStatus(id) {
    return this.request({
        action: ServiceAction.STATUS_DELETE_BY_ID,
        pathParams: { id }
    });
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%81%D1%82%D0%B0%D1%82%D1%83%D1%81%D0%B0%D0%BC%D0%B8%20(Status)/patchItemResource-statusentity-patch_1
 * @param {string} name
 * @param {string} id
 *
 * @return {Promise<SafeResult<StatusEntityDto, Error>>}
 */
export function updateStatus(id, { name }) {
    return this.request(
        {
            action: ServiceAction.STATUS_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                name
            }
        },
        StatusEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ??????????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%81%D0%BF%D0%B5%D1%86%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D1%81%D1%82%D1%8F%D0%BC%D0%B8%20(StudyDegree)/getCollectionResource-studydegreeentity-get_1_1
 *
 * @return {Promise<SafeResult<StudyDegreeEntityDto, Error>>}
 */
export function getStudyDegree() {
    return this.request(
        {
            action: ServiceAction.STUDY_DEGREE_GET
        },
        StudyDegreeEntityDto
    );
}

/**
 * @description ???????????????????? ????????????????: ??????????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%81%D0%BF%D0%B5%D1%86%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D1%81%D1%82%D1%8F%D0%BC%D0%B8%20(StudyDegree)/postCollectionResource-studydegreeentity-post_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} code
 * @param {string} name
 * @param {StudyDegreeGroupEntityDto} study_degree_group
 * @param {boolean} actual
 *
 * @return {Promise<SafeResult<StudyDegreeEntityDto, Error>>}
 */
export function createStudyDegree({ date_from, date_to, code, name, study_degree_group, actual }) {
    return this.request(
        {
            action: ServiceAction.STUDY_DEGREE_CREATE,
            params: {
                date_from,
                date_to,
                code,
                name,
                study_degree_group,
                actual
            }
        },
        StudyDegreeEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ?????????????????????? (?????????????????????? ????????????????????????????)
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B3%D1%80%D1%83%D0%BF%D0%BF%D0%B0%D0%BC%D0%B8%20%D1%81%D0%BF%D0%B5%D1%86%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D1%81%D1%82%D0%B5%D0%B9%20(StudyDegreeGroup)/getCollectionResource-studydegreegroupentity-get_1_1
 *
 * @return {Promise<SafeResult<StudyDegreeGroupEntityDto, Error>>}
 */
export function getStudyDegreeGroup() {
    return this.request(
        {
            action: ServiceAction.STUDY_DEGREE_GROUP_GET
        },
        StudyDegreeGroupEntityDto
    );
}

/**
 * @description ???????????????????? ????????????????: ?????????????????????? (?????????????????????? ????????????????????????????)
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B3%D1%80%D1%83%D0%BF%D0%BF%D0%B0%D0%BC%D0%B8%20%D1%81%D0%BF%D0%B5%D1%86%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D1%81%D1%82%D0%B5%D0%B9%20(StudyDegreeGroup)/postCollectionResource-studydegreegroupentity-post_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} name
 * @param {number} parent_id
 * @param {string} code
 * @param {boolean} actual
 *
 * @return {Promise<SafeResult<StudyDegreeGroupEntityDto, Error>>}
 */
export function createStudyDegreeGroup({ date_from, date_to, name, parent_id, code, actual }) {
    return this.request(
        {
            action: ServiceAction.STUDY_DEGREE_GROUP_CREATE,
            params: {
                date_from,
                date_to,
                name,
                parent_id,
                code,
                actual
            }
        },
        StudyDegreeGroupEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ?????????????????????? (?????????????????????? ????????????????????????????)
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B3%D1%80%D1%83%D0%BF%D0%BF%D0%B0%D0%BC%D0%B8%20%D1%81%D0%BF%D0%B5%D1%86%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D1%81%D1%82%D0%B5%D0%B9%20(StudyDegreeGroup)/getItemResource-studydegreegroupentity-get_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyDegreeGroupEntityDto, Error>>}
 */
export function getStudyDegreeGroupById(id) {
    return this.request(
        {
            action: ServiceAction.STUDY_DEGREE_GROUP_GET_BY_ID,
            pathParams: { id }
        },
        StudyDegreeGroupEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????? ??????????????: ?????????????????????? (?????????????????????? ????????????????????????????)
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B3%D1%80%D1%83%D0%BF%D0%BF%D0%B0%D0%BC%D0%B8%20%D1%81%D0%BF%D0%B5%D1%86%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D1%81%D1%82%D0%B5%D0%B9%20(StudyDegreeGroup)/putItemResource-studydegreegroupentity-put_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} name
 * @param {number} parent_id
 * @param {string} code
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyDegreeGroupEntityDto, Error>>}
 */
export function replaceStudyDegreeGroup(id, { date_from, date_to, name, parent_id, code, actual }) {
    return this.request(
        {
            action: ServiceAction.STUDY_DEGREE_GROUP_REPLACE_BY_ID,
            pathParams: { id },
            params: {
                id,
                date_from,
                date_to,
                name,
                parent_id,
                code,
                actual
            }
        },
        StudyDegreeGroupEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ?????????????????????? (?????????????????????? ????????????????????????????)
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B3%D1%80%D1%83%D0%BF%D0%BF%D0%B0%D0%BC%D0%B8%20%D1%81%D0%BF%D0%B5%D1%86%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D1%81%D1%82%D0%B5%D0%B9%20(StudyDegreeGroup)/deleteItemResource-studydegreegroupentity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function deleteStudyDegreeGroup(id) {
    return this.request({
        action: ServiceAction.STUDY_DEGREE_GROUP_DELETE_BY_ID,
        pathParams: { id }
    });
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ?????????????????????? (?????????????????????? ????????????????????????????)
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B3%D1%80%D1%83%D0%BF%D0%BF%D0%B0%D0%BC%D0%B8%20%D1%81%D0%BF%D0%B5%D1%86%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D1%81%D1%82%D0%B5%D0%B9%20(StudyDegreeGroup)/patchItemResource-studydegreegroupentity-patch_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} name
 * @param {number} parent_id
 * @param {string} code
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyDegreeGroupEntityDto, Error>>}
 */
export function updateStudyDegreeGroup(id, { date_from, date_to, name, parent_id, code, actual }) {
    return this.request(
        {
            action: ServiceAction.STUDY_DEGREE_GROUP_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                date_from,
                date_to,
                name,
                parent_id,
                code,
                actual
            }
        },
        StudyDegreeGroupEntityDto
    );
}

/**
 * @description undefined
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%81%D0%BF%D0%B5%D1%86%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D1%81%D1%82%D1%8F%D0%BC%D0%B8%20(StudyDegree)/executeSearch-studydegreeentity-get_1
 * @param {string} name
 * @param {string} name
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function getStudyDegreeByName(name) {
    return this.request({
        action: ServiceAction.STUDY_DEGREE_SEARCH_FIND_BY_NAME_GET,
        params: { name }
    });
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ??????????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%81%D0%BF%D0%B5%D1%86%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D1%81%D1%82%D1%8F%D0%BC%D0%B8%20(StudyDegree)/getItemResource-studydegreeentity-get_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyDegreeEntityDto, Error>>}
 */
export function getStudyDegreeById(id) {
    return this.request(
        {
            action: ServiceAction.STUDY_DEGREE_GET_BY_ID,
            pathParams: { id }
        },
        StudyDegreeEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????? ??????????????: ??????????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%81%D0%BF%D0%B5%D1%86%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D1%81%D1%82%D1%8F%D0%BC%D0%B8%20(StudyDegree)/putItemResource-studydegreeentity-put_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} code
 * @param {string} name
 * @param {StudyDegreeGroupEntityDto} study_degree_group
 * @param {boolean} actual
 * @param {string} id
 * @param {string} studyDegreeId
 *
 * @return {Promise<SafeResult<StudyDegreeEntityDto, Error>>}
 */
export function replaceStudyDegree(studyDegreeId, { id, date_from, date_to, code, name, study_degree_group, actual }) {
    return this.request(
        {
            action: ServiceAction.STUDY_DEGREE_REPLACE_BY_ID,
            pathParams: { id: studyDegreeId },
            params: {
                id,
                date_from,
                date_to,
                code,
                name,
                study_degree_group,
                actual
            }
        },
        StudyDegreeEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ??????????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%81%D0%BF%D0%B5%D1%86%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D1%81%D1%82%D1%8F%D0%BC%D0%B8%20(StudyDegree)/deleteItemResource-studydegreeentity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function deleteStudyDegree(id) {
    return this.request({
        action: ServiceAction.STUDY_DEGREE_DELETE_BY_ID,
        pathParams: { id }
    });
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ??????????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%81%D0%BF%D0%B5%D1%86%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D1%81%D1%82%D1%8F%D0%BC%D0%B8%20(StudyDegree)/patchItemResource-studydegreeentity-patch_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} code
 * @param {string} name
 * @param {StudyDegreeGroupEntityDto} study_degree_group
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyDegreeEntityDto, Error>>}
 */
export function updateStudyDegree(id, { date_from, date_to, code, name, study_degree_group, actual }) {
    return this.request(
        {
            action: ServiceAction.STUDY_DEGREE_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                date_from,
                date_to,
                code,
                name,
                study_degree_group,
                actual
            }
        },
        StudyDegreeEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ?????????????????????? ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BD%D0%B0%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D1%8F%D0%BC%D0%B8%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D1%82%D0%B8%D1%8F%20(StudyDirection)/getCollectionResource-studydirectionentity-get_1_1
 *
 * @return {Promise<SafeResult<StudyDirectionEntityDto[], Error>>}
 */
// prettier-ignore
export function getAllStudyDirections() {
    return this.request(
        { action: ServiceAction.STUDY_DIRECTION_GET_ALL },
        StudyDirectionEntityDto
    );
}

/**
 * @description ???????????????????? ????????????????: ?????????????????????? ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BD%D0%B0%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D1%8F%D0%BC%D0%B8%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D1%82%D0%B8%D1%8F%20(StudyDirection)/postCollectionResource-studydirectionentity-post_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} external_id
 * @param {string} name
 * @param {string} description
 * @param {Array} development_forms
 * @param {boolean} actual
 * @param {string} parent
 *
 * @return {Promise<SafeResult<StudyDirectionEntityDto, Error>>}
 */
export function createStudyDirection({
    date_from,
    date_to,
    external_id,
    name,
    description,
    development_forms,
    actual,
    parent
}) {
    return this.request(
        {
            action: ServiceAction.STUDY_DIRECTION_CREATE,
            params: {
                date_from,
                date_to,
                external_id,
                name,
                description,
                development_forms,
                actual,
                parent
            }
        },
        StudyDirectionEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ?????????????????????? ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BD%D0%B0%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D1%8F%D0%BC%D0%B8%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D1%82%D0%B8%D1%8F%20(StudyDirection)/getItemResource-studydirectionentity-get_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyDirectionEntityDto, Error>>}
 */
export function getStudyDirectionById(id) {
    return this.request(
        {
            action: ServiceAction.STUDY_DIRECTION_GET_BY_ID,
            pathParams: { id }
        },
        StudyDirectionEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????? ??????????????: ?????????????????????? ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BD%D0%B0%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D1%8F%D0%BC%D0%B8%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D1%82%D0%B8%D1%8F%20(StudyDirection)/putItemResource-studydirectionentity-put_1
 *
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} external_id
 * @param {string} name
 * @param {string} description
 * @param {Array} development_forms
 * @param {boolean} actual
 * @param {string} parent
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyDirectionEntityDto, Error>>}
 */
export function replaceStudyDirection(
    studyDirectionId,
    { id, date_from, date_to, external_id, name, description, development_forms, actual, parent }
) {
    return this.request(
        {
            action: ServiceAction.STUDY_DIRECTION_REPLACE_BY_ID,
            pathParams: { id: studyDirectionId },
            params: {
                id,
                date_from,
                date_to,
                external_id,
                name,
                description,
                development_forms,
                actual,
                parent
            }
        },
        StudyDirectionEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ?????????????????????? ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BD%D0%B0%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D1%8F%D0%BC%D0%B8%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D1%82%D0%B8%D1%8F%20(StudyDirection)/deleteItemResource-studydirectionentity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<true, Error>>}
 */
export function deleteStudyDirection(id) {
    return this.request({
        action: ServiceAction.STUDY_DIRECTION_DELETE_BY_ID,
        pathParams: { id }
    });
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ?????????????????????? ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BD%D0%B0%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D1%8F%D0%BC%D0%B8%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D1%82%D0%B8%D1%8F%20(StudyDirection)/patchItemResource-studydirectionentity-patch_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} external_id
 * @param {string} name
 * @param {string} description
 * @param {Array} development_forms
 * @param {boolean} actual
 * @param {string} parent
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyDirectionEntityDto, Error>>}
 */
export function updateStudyDirection(
    id,
    { date_from, date_to, external_id, name, description, development_forms, actual, parent }
) {
    return this.request(
        {
            action: ServiceAction.STUDY_DIRECTION_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                date_from,
                date_to,
                external_id,
                name,
                description,
                development_forms,
                actual,
                parent
            }
        },
        StudyDirectionEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ??????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%8D%D0%BA%D1%81%D0%BF%D0%B5%D1%80%D1%82%D0%B0%D0%BC%D0%B8%20(StudyExpert)/getCollectionResource-studyexpertentity-get_1_1
 *
 * @return {Promise<SafeResult<StudyExpertEntityDto[], Error>>}
 */
// prettier-ignore
export function getStudyExperts() {
    return this.request(
        {  action: ServiceAction.STUDY_EXPERT_GET_ALL },
        StudyExpertEntityDto
    );
}

/**
 * @description ???????????????????? ????????????????: ??????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%8D%D0%BA%D1%81%D0%BF%D0%B5%D1%80%D1%82%D0%B0%D0%BC%D0%B8%20(StudyExpert)/postCollectionResource-studyexpertentity-post_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {number} employee_id
 * @param {string} surname
 * @param {string} name
 * @param {string} inn
 * @param {string} patronymic
 * @param {string} organization
 * @param {string} photo_url
 * @param {string} description
 * @param {StudyProviderEntityDto} study_provider
 * @param {StudyExpertContractTypeEntityDto} study_expert_contract_type
 * @param {boolean} actual
 *
 * @return {Promise<SafeResult<StudyExpertEntityDto, Error>>}
 */
export function createStudyExpert({
    date_from,
    date_to,
    employee_id,
    surname,
    name,
    inn,
    patronymic,
    organization,
    photo_url,
    description,
    study_provider,
    study_expert_contract_type,
    actual
}) {
    return this.request(
        {
            action: ServiceAction.STUDY_EXPERT_CREATE,
            params: {
                date_from,
                date_to,
                employee_id,
                surname,
                name,
                inn,
                patronymic,
                organization,
                photo_url,
                description,
                study_provider,
                study_expert_contract_type,
                actual
            }
        },
        StudyExpertEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ?????????????? ?? ????????????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B4%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D0%B0%D0%BC%D0%B8%20%D1%81%20%D0%BF%D1%80%D0%B5%D0%BF%D0%BE%D0%B4%D0%B0%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8F%D0%BC%D0%B8%20(StudyExpertContract)/getCollectionResource-studyexpertcontractentity-get_1_1
 *
 * @return {Promise<SafeResult<StudyExpertContractEntityDto[], Error>>}
 */
// prettier-ignore
export function getStudyExpertContracts() {
    return this.request(
        { action: ServiceAction.STUDY_EXPERT_CONTRACT_GET },
        StudyExpertContractEntityDto
    );
}

/**
 * @description ???????????????????? ????????????????: ?????????????? ?? ????????????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B4%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D0%B0%D0%BC%D0%B8%20%D1%81%20%D0%BF%D1%80%D0%B5%D0%BF%D0%BE%D0%B4%D0%B0%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8F%D0%BC%D0%B8%20(StudyExpertContract)/postCollectionResource-studyexpertcontractentity-post_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} date_start
 * @param {string} date_end
 * @param {number} hours_limit
 * @param {number} amount_limit
 * @param {StudyExpertEntityDto} study_expert
 * @param {StudyExpertContractTypeEntityDto} study_expert_contract_type
 * @param {boolean} actual
 *
 * @return {Promise<SafeResult<StudyExpertContractEntityDto, Error>>}
 */
export function createStudyExpertContract({
    date_from,
    date_to,
    date_start,
    date_end,
    hours_limit,
    amount_limit,
    study_expert,
    study_expert_contract_type,
    actual
}) {
    return this.request(
        {
            action: ServiceAction.STUDY_EXPERT_CONTRACT_CREATE,
            params: {
                date_from,
                date_to,
                date_start,
                date_end,
                hours_limit,
                amount_limit,
                study_expert,
                study_expert_contract_type,
                actual
            }
        },
        StudyExpertContractEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????????? ???????????????? ?? ????????????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%81%D1%82%D0%B0%D0%B2%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%B2%20%D0%B4%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D0%B0%D1%85%20%D1%81%20%D0%BF%D1%80%D0%B5%D0%BF%D0%BE%D0%B4%D0%B0%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8F%D0%BC%D0%B8%20(StudyExpertContractRate)/getCollectionResource-studyexpertcontractrateentity-get_1_1
 *
 * @return {Promise<SafeResult<StudyExpertContractEntityDto[], Error>>}
 */

export function getAllStudyExpertContractRates() {
    return this.request({ action: ServiceAction.STUDY_EXPERT_CONTRACT_RATE_GET_ALL }, StudyExpertContractRateEntityDto);
}

/**
 * @description ???????????????????? ????????????????: ???????????? ???????????????? ?? ????????????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%81%D1%82%D0%B0%D0%B2%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%B2%20%D0%B4%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D0%B0%D1%85%20%D1%81%20%D0%BF%D1%80%D0%B5%D0%BF%D0%BE%D0%B4%D0%B0%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8F%D0%BC%D0%B8%20(StudyExpertContractRate)/postCollectionResource-studyexpertcontractrateentity-post_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {number} hour_rate
 * @param {StudyExpertContractEntityDto} study_expert_contract
 * @param {StudyExpertContractTypeEntityDto} study_expert_contract_type
 * @param {boolean} actual
 *
 * @return {Promise<SafeResult<StudyExpertContractRateEntityDto, Error>>}
 */
export function createStudyExpertContractRate({
    date_from,
    date_to,
    hour_rate,
    study_expert_contract,
    study_expert_contract_type,
    actual
}) {
    return this.request(
        {
            action: ServiceAction.STUDY_EXPERT_CONTRACT_RATE_CREATE,
            params: {
                date_from,
                date_to,
                hour_rate,
                study_expert_contract,
                study_expert_contract_type,
                actual
            }
        },
        StudyExpertContractRateEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????????? ???????????????? ?? ????????????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%81%D1%82%D0%B0%D0%B2%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%B2%20%D0%B4%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D0%B0%D1%85%20%D1%81%20%D0%BF%D1%80%D0%B5%D0%BF%D0%BE%D0%B4%D0%B0%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8F%D0%BC%D0%B8%20(StudyExpertContractRate)/getItemResource-studyexpertcontractrateentity-get_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyExpertContractRateEntityDto, Error>>}
 */
export function getStudyExpertContractRateById(id) {
    return this.request(
        {
            action: ServiceAction.STUDY_EXPERT_CONTRACT_RATE_GET_BY_ID,
            pathParams: { id }
        },
        StudyExpertContractRateEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????? ??????????????: ???????????? ???????????????? ?? ????????????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%81%D1%82%D0%B0%D0%B2%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%B2%20%D0%B4%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D0%B0%D1%85%20%D1%81%20%D0%BF%D1%80%D0%B5%D0%BF%D0%BE%D0%B4%D0%B0%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8F%D0%BC%D0%B8%20(StudyExpertContractRate)/putItemResource-studyexpertcontractrateentity-put_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {number} hour_rate
 * @param {StudyExpertContractEntityDto} study_expert_contract
 * @param {StudyExpertContractTypeEntityDto} study_expert_contract_type
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyExpertContractRateEntityDto, Error>>}
 */
export function replaceStudyExpertContractRate(
    id,
    { date_from, date_to, hour_rate, study_expert_contract, study_expert_contract_type, actual }
) {
    return this.request(
        {
            action: ServiceAction.STUDY_EXPERT_CONTRACT_RATE_REPLACE_BY_ID,
            pathParams: { id },
            params: {
                id,
                date_from,
                date_to,
                hour_rate,
                study_expert_contract,
                study_expert_contract_type,
                actual
            }
        },
        StudyExpertContractRateEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ???????????? ???????????????? ?? ????????????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%81%D1%82%D0%B0%D0%B2%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%B2%20%D0%B4%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D0%B0%D1%85%20%D1%81%20%D0%BF%D1%80%D0%B5%D0%BF%D0%BE%D0%B4%D0%B0%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8F%D0%BC%D0%B8%20(StudyExpertContractRate)/deleteItemResource-studyexpertcontractrateentity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function deleteStudyExpertContractRate(id) {
    return this.request({
        action: ServiceAction.STUDY_EXPERT_CONTRACT_RATE_DELETE_BY_ID,
        pathParams: { id }
    });
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ???????????? ???????????????? ?? ????????????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%81%D1%82%D0%B0%D0%B2%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%B2%20%D0%B4%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D0%B0%D1%85%20%D1%81%20%D0%BF%D1%80%D0%B5%D0%BF%D0%BE%D0%B4%D0%B0%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8F%D0%BC%D0%B8%20(StudyExpertContractRate)/patchItemResource-studyexpertcontractrateentity-patch_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {number} hour_rate
 * @param {StudyExpertContractEntityDto} study_expert_contract
 * @param {StudyExpertContractTypeEntityDto} study_expert_contract_type
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyExpertContractRateEntityDto, Error>>}
 */
export function updateStudyExpertContractRate(
    id,
    { date_from, date_to, hour_rate, study_expert_contract, study_expert_contract_type, actual }
) {
    return this.request(
        {
            action: ServiceAction.STUDY_EXPERT_CONTRACT_RATE_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                id,
                date_from,
                date_to,
                hour_rate,
                study_expert_contract,
                study_expert_contract_type,
                actual
            }
        },
        StudyExpertContractRateEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ?????? ???????????????? ?? ??????????????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%82%D0%B8%D0%BF%D0%B0%D0%BC%D0%B8%20%D0%B4%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D0%BE%D0%B2%20%D1%81%20%D0%BF%D1%80%D0%B5%D0%BF%D0%BE%D0%B4%D0%B0%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8F%D0%BC%D0%B8%20(StudyExpertContractType)/getCollectionResource-studyexpertcontracttypeentity-get_1_1
 *
 * @return {Promise<SafeResult<StudyExpertContractTypeEntityDto[], Error>>}
 */
export function getStudyExpertContractType() {
    return this.request(
        {
            action: ServiceAction.STUDY_EXPERT_CONTRACT_TYPE_GET
        },
        StudyExpertContractTypeEntityDto
    );
}

/**
 * @description ???????????????????? ????????????????: ?????? ???????????????? ?? ??????????????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%82%D0%B8%D0%BF%D0%B0%D0%BC%D0%B8%20%D0%B4%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D0%BE%D0%B2%20%D1%81%20%D0%BF%D1%80%D0%B5%D0%BF%D0%BE%D0%B4%D0%B0%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8F%D0%BC%D0%B8%20(StudyExpertContractType)/postCollectionResource-studyexpertcontracttypeentity-post_1
 * @param {string} name
 *
 * @return {Promise<SafeResult<StudyExpertContractTypeEntityDto, Error>>}
 */
export function createStudyExpertContractType({ name }) {
    return this.request(
        {
            action: ServiceAction.STUDY_EXPERT_CONTRACT_TYPE_CREATE,
            params: {
                id,
                name
            }
        },
        StudyExpertContractTypeEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ?????? ???????????????? ?? ??????????????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%82%D0%B8%D0%BF%D0%B0%D0%BC%D0%B8%20%D0%B4%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D0%BE%D0%B2%20%D1%81%20%D0%BF%D1%80%D0%B5%D0%BF%D0%BE%D0%B4%D0%B0%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8F%D0%BC%D0%B8%20(StudyExpertContractType)/getItemResource-studyexpertcontracttypeentity-get_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyExpertContractTypeEntityDto, Error>>}
 */
export function getStudyExpertContractTypeById(id) {
    return this.request(
        {
            action: ServiceAction.STUDY_EXPERT_CONTRACT_TYPE_GET_BY_ID,
            pathParams: { id }
        },
        StudyExpertContractTypeEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????? ??????????????: ?????? ???????????????? ?? ??????????????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%82%D0%B8%D0%BF%D0%B0%D0%BC%D0%B8%20%D0%B4%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D0%BE%D0%B2%20%D1%81%20%D0%BF%D1%80%D0%B5%D0%BF%D0%BE%D0%B4%D0%B0%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8F%D0%BC%D0%B8%20(StudyExpertContractType)/putItemResource-studyexpertcontracttypeentity-put_1
 * @param {string} name
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyExpertContractTypeEntityDto, Error>>}
 */
export function replaceStudyExpertContractType(id, { name }) {
    return this.request(
        {
            action: ServiceAction.STUDY_EXPERT_CONTRACT_TYPE_REPLACE_BY_ID,
            pathParams: { id },
            params: {
                id,
                name
            }
        },
        StudyExpertContractTypeEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ?????? ???????????????? ?? ??????????????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%82%D0%B8%D0%BF%D0%B0%D0%BC%D0%B8%20%D0%B4%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D0%BE%D0%B2%20%D1%81%20%D0%BF%D1%80%D0%B5%D0%BF%D0%BE%D0%B4%D0%B0%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8F%D0%BC%D0%B8%20(StudyExpertContractType)/deleteItemResource-studyexpertcontracttypeentity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function deleteStudyExpertContractType(id) {
    return this.request({
        action: ServiceAction.STUDY_EXPERT_CONTRACT_TYPE_DELETE_BY_ID,
        pathParams: { id }
    });
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ?????? ???????????????? ?? ??????????????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%82%D0%B8%D0%BF%D0%B0%D0%BC%D0%B8%20%D0%B4%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D0%BE%D0%B2%20%D1%81%20%D0%BF%D1%80%D0%B5%D0%BF%D0%BE%D0%B4%D0%B0%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8F%D0%BC%D0%B8%20(StudyExpertContractType)/patchItemResource-studyexpertcontracttypeentity-patch_1
 * @param {string} name
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyExpertContractTypeEntityDto, Error>>}
 */
export function updateStudyExpertContractType(id, { name }) {
    return this.request(
        {
            action: ServiceAction.STUDY_EXPERT_CONTRACT_TYPE_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                id,
                name
            }
        },
        StudyExpertContractTypeEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ?????????????? ?? ????????????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B4%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D0%B0%D0%BC%D0%B8%20%D1%81%20%D0%BF%D1%80%D0%B5%D0%BF%D0%BE%D0%B4%D0%B0%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8F%D0%BC%D0%B8%20(StudyExpertContract)/getItemResource-studyexpertcontractentity-get_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyExpertContractEntityDto, Error>>}
 */
export function getStudyExpertContractById(id) {
    return this.request(
        {
            action: ServiceAction.STUDY_EXPERT_CONTRACT_GET_BY_ID,
            pathParams: { id }
        },
        StudyExpertContractEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????? ??????????????: ?????????????? ?? ????????????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B4%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D0%B0%D0%BC%D0%B8%20%D1%81%20%D0%BF%D1%80%D0%B5%D0%BF%D0%BE%D0%B4%D0%B0%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8F%D0%BC%D0%B8%20(StudyExpertContract)/putItemResource-studyexpertcontractentity-put_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} date_start
 * @param {string} date_end
 * @param {number} hours_limit
 * @param {number} amount_limit
 * @param {StudyExpertEntityDto} study_expert
 * @param {StudyExpertContractTypeEntityDto} study_expert_contract_type
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyExpertContractEntityDto, Error>>}
 */
export function replaceStudyExpertContract(
    id,
    {
        date_from,
        date_to,
        date_start,
        date_end,
        hours_limit,
        amount_limit,
        study_expert,
        study_expert_contract_type,
        actual
    }
) {
    return this.request(
        {
            action: ServiceAction.STUDY_EXPERT_CONTRACT_REPLACE_BY_ID,
            pathParams: { id },
            params: {
                id,
                date_from,
                date_to,
                date_start,
                date_end,
                hours_limit,
                amount_limit,
                study_expert,
                study_expert_contract_type,
                actual
            }
        },
        StudyExpertContractEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ?????????????? ?? ????????????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B4%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D0%B0%D0%BC%D0%B8%20%D1%81%20%D0%BF%D1%80%D0%B5%D0%BF%D0%BE%D0%B4%D0%B0%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8F%D0%BC%D0%B8%20(StudyExpertContract)/deleteItemResource-studyexpertcontractentity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function deleteStudyExpertContract(id) {
    return this.request({
        action: ServiceAction.STUDY_EXPERT_CONTRACT_DELETE_BY_ID,
        pathParams: { id }
    });
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ?????????????? ?? ????????????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B4%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D0%B0%D0%BC%D0%B8%20%D1%81%20%D0%BF%D1%80%D0%B5%D0%BF%D0%BE%D0%B4%D0%B0%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8F%D0%BC%D0%B8%20(StudyExpertContract)/patchItemResource-studyexpertcontractentity-patch_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} date_start
 * @param {string} date_end
 * @param {number} hours_limit
 * @param {number} amount_limit
 * @param {StudyExpertEntityDto} study_expert
 * @param {StudyExpertContractTypeEntityDto} study_expert_contract_type
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyExpertContractEntityDto, Error>>}
 */
export function updateStudyExpertContract(
    id,
    {
        date_from,
        date_to,
        date_start,
        date_end,
        hours_limit,
        amount_limit,
        study_expert,
        study_expert_contract_type,
        actual
    }
) {
    return this.request(
        {
            action: ServiceAction.STUDY_EXPERT_CONTRACT_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                id,
                date_from,
                date_to,
                date_start,
                date_end,
                hours_limit,
                amount_limit,
                study_expert,
                study_expert_contract_type,
                actual
            }
        },
        StudyExpertContractEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ??????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%8D%D0%BA%D1%81%D0%BF%D0%B5%D1%80%D1%82%D0%B0%D0%BC%D0%B8%20(StudyExpert)/getItemResource-studyexpertentity-get_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyExpertEntityDto, Error>>}
 */
export function getStudyExpertById(id) {
    return this.request(
        {
            action: ServiceAction.STUDY_EXPERT_GET_BY_ID,
            pathParams: { id }
        },
        StudyExpertEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????? ??????????????: ??????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%8D%D0%BA%D1%81%D0%BF%D0%B5%D1%80%D1%82%D0%B0%D0%BC%D0%B8%20(StudyExpert)/putItemResource-studyexpertentity-put_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {number} employee_id
 * @param {string} surname
 * @param {string} name
 * @param {string} inn
 * @param {string} patronymic
 * @param {string} organization
 * @param {string} photo_url
 * @param {string} description
 * @param {StudyProviderEntityDto} study_provider
 * @param {StudyExpertContractTypeEntityDto} study_expert_contract_type
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyExpertEntityDto, Error>>}
 */
export function replaceStudyExpert(
    id,
    {
        date_from,
        date_to,
        employee_id,
        surname,
        name,
        inn,
        patronymic,
        organization,
        photo_url,
        description,
        study_provider,
        study_expert_contract_type,
        actual
    }
) {
    return this.request(
        {
            action: ServiceAction.STUDY_EXPERT_REPLACE_BY_ID,
            pathParams: { id },
            params: {
                id,
                date_from,
                date_to,
                employee_id,
                surname,
                name,
                inn,
                patronymic,
                organization,
                photo_url,
                description,
                study_provider,
                study_expert_contract_type,
                actual
            }
        },
        StudyExpertEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ??????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%8D%D0%BA%D1%81%D0%BF%D0%B5%D1%80%D1%82%D0%B0%D0%BC%D0%B8%20(StudyExpert)/deleteItemResource-studyexpertentity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function deleteStudyExpert(id) {
    return this.request({
        action: ServiceAction.STUDY_EXPERT_DELETE_BY_ID,
        pathParams: { id }
    });
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ??????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%8D%D0%BA%D1%81%D0%BF%D0%B5%D1%80%D1%82%D0%B0%D0%BC%D0%B8%20(StudyExpert)/patchItemResource-studyexpertentity-patch_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {number} employee_id
 * @param {string} surname
 * @param {string} name
 * @param {string} inn
 * @param {string} patronymic
 * @param {string} organization
 * @param {string} photo_url
 * @param {string} description
 * @param {StudyProviderEntityDto} study_provider
 * @param {StudyExpertContractTypeEntityDto} study_expert_contract_type
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyExpertEntityDto, Error>>}
 */
export function updateStudyExpert(
    id,
    {
        date_from,
        date_to,
        employee_id,
        surname,
        name,
        inn,
        patronymic,
        organization,
        photo_url,
        description,
        study_provider,
        study_expert_contract_type,
        actual
    }
) {
    return this.request(
        {
            action: ServiceAction.STUDY_EXPERT_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                id,
                date_from,
                date_to,
                employee_id,
                surname,
                name,
                inn,
                patronymic,
                organization,
                photo_url,
                description,
                study_provider,
                study_expert_contract_type,
                actual
            }
        },
        StudyExpertEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ??????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%81%D1%82%D0%B8%D0%BF%D0%B5%D0%BD%D0%B4%D0%B8%D1%8F%D0%BC%D0%B8%20(StudyGrant)/getCollectionResource-studygrantentity-get_1_1
 *
 * @return {Promise<SafeResult<StudyGrantEntityDto[], Error>>}
 */
export function getStudyGrant() {
    return this.request(
        {
            action: ServiceAction.STUDY_GRANT_GET
        },
        StudyGrantEntityDto
    );
}

/**
 * @description ???????????????????? ????????????????: ??????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%81%D1%82%D0%B8%D0%BF%D0%B5%D0%BD%D0%B4%D0%B8%D1%8F%D0%BC%D0%B8%20(StudyGrant)/postCollectionResource-studygrantentity-post_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} name
 * @param {string} description
 * @param {boolean} actual
 *
 * @return {Promise<SafeResult<StudyGrantEntityDto, Error>>}
 */
export function createStudyGrant({ date_from, date_to, name, description, actual }) {
    return this.request(
        {
            action: ServiceAction.STUDY_GRANT_CREATE,
            params: {
                id,
                date_from,
                date_to,
                name,
                description,
                actual
            }
        },
        StudyGrantEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????????????????? ??????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BD%D0%B0%D0%B7%D0%BD%D0%B0%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%D0%BC%D0%B8%20%D1%81%D1%82%D0%B8%D0%BF%D0%B5%D0%BD%D0%B4%D0%B8%D0%B8%20(StudyGrantAllocation)/getCollectionResource-studygrantallocationentity-get_1_1
 *
 * @return {Promise<SafeResult<StudyGrantAllocationEntityDto[], Error>>}
 */
export function getStudyGrantAllocation() {
    return this.request(
        {
            action: ServiceAction.STUDY_GRANT_ALLOCATION_GET
        },
        StudyGrantAllocationEntityDto
    );
}

/**
 * @description ???????????????????? ????????????????: ???????????????????? ??????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BD%D0%B0%D0%B7%D0%BD%D0%B0%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%D0%BC%D0%B8%20%D1%81%D1%82%D0%B8%D0%BF%D0%B5%D0%BD%D0%B4%D0%B8%D0%B8%20(StudyGrantAllocation)/postCollectionResource-studygrantallocationentity-post_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} date_start
 * @param {string} date_end
 * @param {number} student_count
 * @param {number} expert_count
 * @param {number} student_amount
 * @param {number} expert_amount
 * @param {StudyGrantEntityDto} study_grant_entity
 * @param {boolean} actual
 *
 * @return {Promise<SafeResult<StudyGrantAllocationEntityDto, Error>>}
 */
export function createStudyGrantAllocation({
    date_from,
    date_to,
    date_start,
    date_end,
    student_count,
    expert_count,
    student_amount,
    expert_amount,
    study_grant_entity,
    actual
}) {
    return this.request(
        {
            action: ServiceAction.STUDY_GRANT_ALLOCATION_CREATE,
            params: {
                id,
                date_from,
                date_to,
                date_start,
                date_end,
                student_count,
                expert_count,
                student_amount,
                expert_amount,
                study_grant_entity,
                actual
            }
        },
        StudyGrantAllocationEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ??????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%BE%D0%B9%20%D0%BF%D1%80%D0%B5%D0%BF%D0%BE%D0%B4%D0%B0%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D0%B5%D0%B9%20%D0%BA%20%D0%BD%D0%B0%D0%B7%D0%BD%D0%B0%D1%87%D0%B5%D0%BD%D0%B8%D1%8E%20%D0%A1%D1%82%D0%B8%D0%BF%D0%B5%D0%BD%D0%B4%D0%B8%D0%B8%20(StudyGrantAllocationStudyExpert)/getCollectionResource-studygrantallocationstudyexpertentity-get_1_1
 *
 * @return {Promise<SafeResult<StudyGrantAllocationStudyExpertEntityDto, Error>>}
 */
export function getStudyGrantAllocationStudyExpert() {
    return this.request(
        {
            action: ServiceAction.STUDY_GRANT_ALLOCATION_STUDY_EXPERT_GET
        },
        StudyGrantAllocationStudyExpertEntityDto
    );
}

/**
 * @description ???????????????????? ????????????????: ??????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%BE%D0%B9%20%D0%BF%D1%80%D0%B5%D0%BF%D0%BE%D0%B4%D0%B0%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D0%B5%D0%B9%20%D0%BA%20%D0%BD%D0%B0%D0%B7%D0%BD%D0%B0%D1%87%D0%B5%D0%BD%D0%B8%D1%8E%20%D0%A1%D1%82%D0%B8%D0%BF%D0%B5%D0%BD%D0%B4%D0%B8%D0%B8%20(StudyGrantAllocationStudyExpert)/postCollectionResource-studygrantallocationstudyexpertentity-post_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {StudyGrantAllocationEntityDto} study_grant_allocation_entity
 * @param {StudyExpertEntityDto} study_expert
 * @param {boolean} actual
 *
 * @return {Promise<SafeResult<StudyGrantAllocationStudyExpertEntityDto, Error>>}
 */
export function createStudyGrantAllocationStudyExpert({
    date_from,
    date_to,
    study_grant_allocation_entity,
    study_expert,
    actual
}) {
    return this.request(
        {
            action: ServiceAction.STUDY_GRANT_ALLOCATION_STUDY_EXPERT_CREATE,
            params: {
                id,
                date_from,
                date_to,
                study_grant_allocation_entity,
                study_expert,
                actual
            }
        },
        StudyGrantAllocationStudyExpertEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ??????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%BE%D0%B9%20%D0%BF%D1%80%D0%B5%D0%BF%D0%BE%D0%B4%D0%B0%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D0%B5%D0%B9%20%D0%BA%20%D0%BD%D0%B0%D0%B7%D0%BD%D0%B0%D1%87%D0%B5%D0%BD%D0%B8%D1%8E%20%D0%A1%D1%82%D0%B8%D0%BF%D0%B5%D0%BD%D0%B4%D0%B8%D0%B8%20(StudyGrantAllocationStudyExpert)/getItemResource-studygrantallocationstudyexpertentity-get_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyGrantAllocationStudyExpertEntityDto, Error>>}
 */
export function getStudyGrantAllocationStudyExpertById(id) {
    return this.request(
        {
            action: ServiceAction.STUDY_GRANT_ALLOCATION_STUDY_EXPERT_GET_BY_ID,
            pathParams: { id }
        },
        StudyGrantAllocationStudyExpertEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????? ??????????????: ??????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%BE%D0%B9%20%D0%BF%D1%80%D0%B5%D0%BF%D0%BE%D0%B4%D0%B0%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D0%B5%D0%B9%20%D0%BA%20%D0%BD%D0%B0%D0%B7%D0%BD%D0%B0%D1%87%D0%B5%D0%BD%D0%B8%D1%8E%20%D0%A1%D1%82%D0%B8%D0%BF%D0%B5%D0%BD%D0%B4%D0%B8%D0%B8%20(StudyGrantAllocationStudyExpert)/putItemResource-studygrantallocationstudyexpertentity-put_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {StudyGrantAllocationEntityDto} study_grant_allocation_entity
 * @param {StudyExpertEntityDto} study_expert
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyGrantAllocationStudyExpertEntityDto, Error>>}
 */
export function replaceStudyGrantAllocationStudyExpert(
    id,
    { date_from, date_to, study_grant_allocation_entity, study_expert, actual }
) {
    return this.request(
        {
            action: ServiceAction.STUDY_GRANT_ALLOCATION_STUDY_EXPERT_REPLACE_BY_ID,
            pathParams: { id },
            params: {
                id,
                date_from,
                date_to,
                study_grant_allocation_entity,
                study_expert,
                actual
            }
        },
        StudyGrantAllocationStudyExpertEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ??????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%BE%D0%B9%20%D0%BF%D1%80%D0%B5%D0%BF%D0%BE%D0%B4%D0%B0%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D0%B5%D0%B9%20%D0%BA%20%D0%BD%D0%B0%D0%B7%D0%BD%D0%B0%D1%87%D0%B5%D0%BD%D0%B8%D1%8E%20%D0%A1%D1%82%D0%B8%D0%BF%D0%B5%D0%BD%D0%B4%D0%B8%D0%B8%20(StudyGrantAllocationStudyExpert)/deleteItemResource-studygrantallocationstudyexpertentity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function deleteStudyGrantAllocationStudyExpert(id) {
    return this.request({
        action: ServiceAction.STUDY_GRANT_ALLOCATION_STUDY_EXPERT_DELETE_BY_ID,
        pathParams: { id }
    });
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ??????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%BE%D0%B9%20%D0%BF%D1%80%D0%B5%D0%BF%D0%BE%D0%B4%D0%B0%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D0%B5%D0%B9%20%D0%BA%20%D0%BD%D0%B0%D0%B7%D0%BD%D0%B0%D1%87%D0%B5%D0%BD%D0%B8%D1%8E%20%D0%A1%D1%82%D0%B8%D0%BF%D0%B5%D0%BD%D0%B4%D0%B8%D0%B8%20(StudyGrantAllocationStudyExpert)/patchItemResource-studygrantallocationstudyexpertentity-patch_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {StudyGrantAllocationEntityDto} study_grant_allocation_entity
 * @param {StudyExpertEntityDto} study_expert
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyGrantAllocationStudyExpertEntityDto, Error>>}
 */
export function updateStudyGrantAllocationStudyExpert(
    id,
    { date_from, date_to, study_grant_allocation_entity, study_expert, actual }
) {
    return this.request(
        {
            action: ServiceAction.STUDY_GRANT_ALLOCATION_STUDY_EXPERT_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                id,
                date_from,
                date_to,
                study_grant_allocation_entity,
                study_expert,
                actual
            }
        },
        StudyGrantAllocationStudyExpertEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????????????? ???????????????? ?? ???????????????????? ??????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%BE%D0%B9%20%D1%83%D1%87%D0%B0%D1%89%D0%B8%D1%85%D1%81%D1%8F%20%D0%BA%20%D0%BD%D0%B0%D0%B7%D0%BD%D0%B0%D1%87%D0%B5%D0%BD%D0%B8%D1%8E%20%D0%A1%D1%82%D0%B8%D0%BF%D0%B5%D0%BD%D0%B4%D0%B8%D0%B8%20(StudyGrantAllocationStudyStudent)/getCollectionResource-studygrantallocationstudystudententity-get_1_1
 *
 * @return {Promise<SafeResult<StudyGrantAllocationStudyStudentEntityDto[], Error>>}
 */
export function getStudyGrantAllocationStudyStudent() {
    return this.request(
        {
            action: ServiceAction.STUDY_GRANT_ALLOCATION_STUDY_STUDENT_GET
        },
        StudyGrantAllocationStudyStudentEntityDto
    );
}

/**
 * @description ???????????????????? ????????????????: ???????????????? ???????????????? ?? ???????????????????? ??????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%BE%D0%B9%20%D1%83%D1%87%D0%B0%D1%89%D0%B8%D1%85%D1%81%D1%8F%20%D0%BA%20%D0%BD%D0%B0%D0%B7%D0%BD%D0%B0%D1%87%D0%B5%D0%BD%D0%B8%D1%8E%20%D0%A1%D1%82%D0%B8%D0%BF%D0%B5%D0%BD%D0%B4%D0%B8%D0%B8%20(StudyGrantAllocationStudyStudent)/postCollectionResource-studygrantallocationstudystudententity-post_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {StudyGrantAllocationEntityDto} study_grant_allocation_entity
 * @param {StudyStudentEntityDto} study_student
 * @param {boolean} actual
 *
 * @return {Promise<SafeResult<StudyGrantAllocationStudyStudentEntityDto, Error>>}
 */
export function createStudyGrantAllocationStudyStudent({
    date_from,
    date_to,
    study_grant_allocation_entity,
    study_student,
    actual
}) {
    return this.request(
        {
            action: ServiceAction.STUDY_GRANT_ALLOCATION_STUDY_STUDENT_CREATE,
            params: {
                id,
                date_from,
                date_to,
                study_grant_allocation_entity,
                study_student,
                actual
            }
        },
        StudyGrantAllocationStudyStudentEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????????????? ???????????????? ?? ???????????????????? ??????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%BE%D0%B9%20%D1%83%D1%87%D0%B0%D1%89%D0%B8%D1%85%D1%81%D1%8F%20%D0%BA%20%D0%BD%D0%B0%D0%B7%D0%BD%D0%B0%D1%87%D0%B5%D0%BD%D0%B8%D1%8E%20%D0%A1%D1%82%D0%B8%D0%BF%D0%B5%D0%BD%D0%B4%D0%B8%D0%B8%20(StudyGrantAllocationStudyStudent)/getItemResource-studygrantallocationstudystudententity-get_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyGrantAllocationStudyStudentEntityDto, Error>>}
 */
export function getStudyGrantAllocationStudyStudentById(id) {
    return this.request(
        {
            action: ServiceAction.STUDY_GRANT_ALLOCATION_STUDY_STUDENT_GET_BY_ID,
            pathParams: { id }
        },
        StudyGrantAllocationStudyStudentEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????? ??????????????: ???????????????? ???????????????? ?? ???????????????????? ??????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%BE%D0%B9%20%D1%83%D1%87%D0%B0%D1%89%D0%B8%D1%85%D1%81%D1%8F%20%D0%BA%20%D0%BD%D0%B0%D0%B7%D0%BD%D0%B0%D1%87%D0%B5%D0%BD%D0%B8%D1%8E%20%D0%A1%D1%82%D0%B8%D0%BF%D0%B5%D0%BD%D0%B4%D0%B8%D0%B8%20(StudyGrantAllocationStudyStudent)/putItemResource-studygrantallocationstudystudententity-put_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {StudyGrantAllocationEntityDto} study_grant_allocation_entity
 * @param {StudyStudentEntityDto} study_student
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyGrantAllocationStudyStudentEntityDto, Error>>}
 */
export function replaceStudyGrantAllocationStudyStudent(
    id,
    { date_from, date_to, study_grant_allocation_entity, study_student, actual }
) {
    return this.request(
        {
            action: ServiceAction.STUDY_GRANT_ALLOCATION_STUDY_STUDENT_REPLACE_BY_ID,
            pathParams: { id },
            params: {
                id,
                date_from,
                date_to,
                study_grant_allocation_entity,
                study_student,
                actual
            }
        },
        StudyGrantAllocationStudyStudentEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ???????????????? ???????????????? ?? ???????????????????? ??????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%BE%D0%B9%20%D1%83%D1%87%D0%B0%D1%89%D0%B8%D1%85%D1%81%D1%8F%20%D0%BA%20%D0%BD%D0%B0%D0%B7%D0%BD%D0%B0%D1%87%D0%B5%D0%BD%D0%B8%D1%8E%20%D0%A1%D1%82%D0%B8%D0%BF%D0%B5%D0%BD%D0%B4%D0%B8%D0%B8%20(StudyGrantAllocationStudyStudent)/deleteItemResource-studygrantallocationstudystudententity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function deleteStudyGrantAllocationStudyStudent(id) {
    return this.request({
        action: ServiceAction.STUDY_GRANT_ALLOCATION_STUDY_STUDENT_DELETE_BY_ID,
        pathParams: { id }
    });
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ???????????????? ???????????????? ?? ???????????????????? ??????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%BE%D0%B9%20%D1%83%D1%87%D0%B0%D1%89%D0%B8%D1%85%D1%81%D1%8F%20%D0%BA%20%D0%BD%D0%B0%D0%B7%D0%BD%D0%B0%D1%87%D0%B5%D0%BD%D0%B8%D1%8E%20%D0%A1%D1%82%D0%B8%D0%BF%D0%B5%D0%BD%D0%B4%D0%B8%D0%B8%20(StudyGrantAllocationStudyStudent)/patchItemResource-studygrantallocationstudystudententity-patch_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {StudyGrantAllocationEntityDto} study_grant_allocation_entity
 * @param {StudyStudentEntityDto} study_student
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyGrantAllocationStudyStudentEntityDto, Error>>}
 */
export function updateStudyGrantAllocationStudyStudent(
    id,
    { date_from, date_to, study_grant_allocation_entity, study_student, actual }
) {
    return this.request(
        {
            action: ServiceAction.STUDY_GRANT_ALLOCATION_STUDY_STUDENT_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                id,
                date_from,
                date_to,
                study_grant_allocation_entity,
                study_student,
                actual
            }
        },
        StudyGrantAllocationStudyStudentEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????????????????? ??????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BD%D0%B0%D0%B7%D0%BD%D0%B0%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%D0%BC%D0%B8%20%D1%81%D1%82%D0%B8%D0%BF%D0%B5%D0%BD%D0%B4%D0%B8%D0%B8%20(StudyGrantAllocation)/getItemResource-studygrantallocationentity-get_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyGrantAllocationEntityDto, Error>>}
 */
export function getStudyGrantAllocationById(id) {
    return this.request(
        {
            action: ServiceAction.STUDY_GRANT_ALLOCATION_GET_BY_ID,
            pathParams: { id }
        },
        StudyGrantAllocationEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????? ??????????????: ???????????????????? ??????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BD%D0%B0%D0%B7%D0%BD%D0%B0%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%D0%BC%D0%B8%20%D1%81%D1%82%D0%B8%D0%BF%D0%B5%D0%BD%D0%B4%D0%B8%D0%B8%20(StudyGrantAllocation)/putItemResource-studygrantallocationentity-put_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} date_start
 * @param {string} date_end
 * @param {number} student_count
 * @param {number} expert_count
 * @param {number} student_amount
 * @param {number} expert_amount
 * @param {StudyGrantEntityDto} study_grant_entity
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyGrantAllocationEntityDto, Error>>}
 */
export function replaceStudyGrantAllocation(
    id,
    {
        date_from,
        date_to,
        date_start,
        date_end,
        student_count,
        expert_count,
        student_amount,
        expert_amount,
        study_grant_entity,
        actual
    }
) {
    return this.request(
        {
            action: ServiceAction.STUDY_GRANT_ALLOCATION_REPLACE_BY_ID,
            pathParams: { id },
            params: {
                id,
                date_from,
                date_to,
                date_start,
                date_end,
                student_count,
                expert_count,
                student_amount,
                expert_amount,
                study_grant_entity,
                actual
            }
        },
        StudyGrantAllocationEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ???????????????????? ??????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BD%D0%B0%D0%B7%D0%BD%D0%B0%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%D0%BC%D0%B8%20%D1%81%D1%82%D0%B8%D0%BF%D0%B5%D0%BD%D0%B4%D0%B8%D0%B8%20(StudyGrantAllocation)/deleteItemResource-studygrantallocationentity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function deleteStudyGrantAllocation(id) {
    return this.request({
        action: ServiceAction.STUDY_GRANT_ALLOCATION_DELETE_BY_ID,
        pathParams: { id }
    });
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ???????????????????? ??????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BD%D0%B0%D0%B7%D0%BD%D0%B0%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%D0%BC%D0%B8%20%D1%81%D1%82%D0%B8%D0%BF%D0%B5%D0%BD%D0%B4%D0%B8%D0%B8%20(StudyGrantAllocation)/patchItemResource-studygrantallocationentity-patch_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} date_start
 * @param {string} date_end
 * @param {number} student_count
 * @param {number} expert_count
 * @param {number} student_amount
 * @param {number} expert_amount
 * @param {StudyGrantEntityDto} study_grant_entity
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyGrantAllocationEntityDto, Error>>}
 */
export function updateStudyGrantAllocation(
    id,
    {
        date_from,
        date_to,
        date_start,
        date_end,
        student_count,
        expert_count,
        student_amount,
        expert_amount,
        study_grant_entity,
        actual
    }
) {
    return this.request(
        {
            action: ServiceAction.STUDY_GRANT_ALLOCATION_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                id,
                date_from,
                date_to,
                date_start,
                date_end,
                student_count,
                expert_count,
                student_amount,
                expert_amount,
                study_grant_entity,
                actual
            }
        },
        StudyGrantAllocationEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ??????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%81%D1%82%D0%B8%D0%BF%D0%B5%D0%BD%D0%B4%D0%B8%D1%8F%D0%BC%D0%B8%20(StudyGrant)/getItemResource-studygrantentity-get_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyGrantEntityDto, Error>>}
 */
export function getStudyGrantById(id) {
    return this.request(
        {
            action: ServiceAction.STUDY_GRANT_GET_BY_ID,
            pathParams: { id }
        },
        StudyGrantEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????? ??????????????: ??????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%81%D1%82%D0%B8%D0%BF%D0%B5%D0%BD%D0%B4%D0%B8%D1%8F%D0%BC%D0%B8%20(StudyGrant)/putItemResource-studygrantentity-put_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} name
 * @param {string} description
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyGrantEntityDto, Error>>}
 */
export function replaceStudyGrant(id, { date_from, date_to, name, description, actual }) {
    return this.request(
        {
            action: ServiceAction.STUDY_GRANT_REPLACE_BY_ID,
            pathParams: { id },
            params: {
                id,
                date_from,
                date_to,
                name,
                description,
                actual
            }
        },
        StudyGrantEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ??????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%81%D1%82%D0%B8%D0%BF%D0%B5%D0%BD%D0%B4%D0%B8%D1%8F%D0%BC%D0%B8%20(StudyGrant)/deleteItemResource-studygrantentity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function deleteStudyGrant(id) {
    return this.request({
        action: ServiceAction.STUDY_GRANT_DELETE_BY_ID,
        pathParams: { id }
    });
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ??????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%81%D1%82%D0%B8%D0%BF%D0%B5%D0%BD%D0%B4%D0%B8%D1%8F%D0%BC%D0%B8%20(StudyGrant)/patchItemResource-studygrantentity-patch_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} name
 * @param {string} description
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyGrantEntityDto, Error>>}
 */
export function updateStudyGrant(id, { date_from, date_to, name, description, actual }) {
    return this.request(
        {
            action: ServiceAction.STUDY_GRANT_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                id,
                date_from,
                date_to,
                name,
                description,
                actual
            }
        },
        StudyGrantEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ?????????? ????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BC%D0%B5%D1%81%D1%82%D0%B0%D0%BC%D0%B8%20%D0%BF%D1%80%D0%BE%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B8%D1%8F%20(StudyLocation)/getCollectionResource-studylocationentity-get_1_1
 *
 * @return {Promise<SafeResult<StudyLocationEntityDto[], Error>>}
 */
export function getStudyLocation() {
    return this.request(
        {
            action: ServiceAction.STUDY_LOCATION_GET
        },
        StudyLocationEntityDto
    );
}

/**
 * @description ???????????????????? ????????????????: ?????????? ????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BC%D0%B5%D1%81%D1%82%D0%B0%D0%BC%D0%B8%20%D0%BF%D1%80%D0%BE%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B8%D1%8F%20(StudyLocation)/postCollectionResource-studylocationentity-post_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} external_id
 * @param {string} name
 * @param {string} description
 * @param {boolean} actual
 *
 * @return {Promise<SafeResult<StudyLocationEntityDto, Error>>}
 */
export function createStudyLocation({ date_from, date_to, external_id, name, description, actual }) {
    return this.request(
        {
            action: ServiceAction.STUDY_LOCATION_CREATE,
            params: {
                id,
                date_from,
                date_to,
                external_id,
                name,
                description,
                actual
            }
        },
        StudyLocationEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ?????????? ????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BC%D0%B5%D1%81%D1%82%D0%B0%D0%BC%D0%B8%20%D0%BF%D1%80%D0%BE%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B8%D1%8F%20(StudyLocation)/getItemResource-studylocationentity-get_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyLocationEntityDto, Error>>}
 */
export function getStudyLocationById(id) {
    return this.request(
        {
            action: ServiceAction.STUDY_LOCATION_GET_BY_ID,
            pathParams: { id }
        },
        StudyLocationEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????? ??????????????: ?????????? ????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BC%D0%B5%D1%81%D1%82%D0%B0%D0%BC%D0%B8%20%D0%BF%D1%80%D0%BE%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B8%D1%8F%20(StudyLocation)/putItemResource-studylocationentity-put_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} external_id
 * @param {string} name
 * @param {string} description
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyLocationEntityDto, Error>>}
 */
export function replaceStudyLocation(id, { date_from, date_to, external_id, name, description, actual }) {
    return this.request(
        {
            action: ServiceAction.STUDY_LOCATION_REPLACE_BY_ID,
            pathParams: { id },
            params: {
                id,
                date_from,
                date_to,
                external_id,
                name,
                description,
                actual
            }
        },
        StudyLocationEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ?????????? ????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BC%D0%B5%D1%81%D1%82%D0%B0%D0%BC%D0%B8%20%D0%BF%D1%80%D0%BE%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B8%D1%8F%20(StudyLocation)/deleteItemResource-studylocationentity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function deleteStudyLocation(id) {
    return this.request({
        action: ServiceAction.STUDY_LOCATION_DELETE_BY_ID,
        pathParams: { id }
    });
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ?????????? ????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BC%D0%B5%D1%81%D1%82%D0%B0%D0%BC%D0%B8%20%D0%BF%D1%80%D0%BE%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B8%D1%8F%20(StudyLocation)/patchItemResource-studylocationentity-patch_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} external_id
 * @param {string} name
 * @param {string} description
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyLocationEntityDto, Error>>}
 */
export function updateStudyLocation(id, { date_from, date_to, external_id, name, description, actual }) {
    return this.request(
        {
            action: ServiceAction.STUDY_LOCATION_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                id,
                date_from,
                date_to,
                external_id,
                name,
                description,
                actual
            }
        },
        StudyLocationEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????? ???????????? (????????????????????????)
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B2%D0%B8%D0%B4%D0%B0%D0%BC%D0%B8%20%D0%BE%D1%86%D0%B5%D0%BD%D0%BA%D0%B8%20(%D1%83%D1%81%D0%BF%D0%B5%D0%B2%D0%B0%D0%B5%D0%BC%D0%BE%D1%81%D1%82%D1%8C)%20(StudyPerformanceType)/getCollectionResource-studyperformancetypeentity-get_1_1
 *
 * @return {Promise<SafeResult<StudyPerformanceTypeEntityDto[], Error>>}
 */
export function getStudyPerformanceType() {
    return this.request(
        {
            action: ServiceAction.STUDY_PERFORMANCE_TYPE_GET
        },
        StudyPerformanceTypeEntityDto
    );
}

/**
 * @description ???????????????????? ????????????????: ???????? ???????????? (????????????????????????)
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B2%D0%B8%D0%B4%D0%B0%D0%BC%D0%B8%20%D0%BE%D1%86%D0%B5%D0%BD%D0%BA%D0%B8%20(%D1%83%D1%81%D0%BF%D0%B5%D0%B2%D0%B0%D0%B5%D0%BC%D0%BE%D1%81%D1%82%D1%8C)%20(StudyPerformanceType)/postCollectionResource-studyperformancetypeentity-post_1
 * @param {string} name
 *
 * @return {Promise<SafeResult<StudyPerformanceTypeEntityDto, Error>>}
 */
export function createStudyPerformanceType({ name }) {
    return this.request(
        {
            action: ServiceAction.STUDY_PERFORMANCE_TYPE_CREATE,
            params: {
                id,
                name
            }
        },
        StudyPerformanceTypeEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????? ???????????? (????????????????????????)
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B2%D0%B8%D0%B4%D0%B0%D0%BC%D0%B8%20%D0%BE%D1%86%D0%B5%D0%BD%D0%BA%D0%B8%20(%D1%83%D1%81%D0%BF%D0%B5%D0%B2%D0%B0%D0%B5%D0%BC%D0%BE%D1%81%D1%82%D1%8C)%20(StudyPerformanceType)/getItemResource-studyperformancetypeentity-get_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyPerformanceTypeEntityDto, Error>>}
 */
export function getStudyPerformanceTypeById(id) {
    return this.request(
        {
            action: ServiceAction.STUDY_PERFORMANCE_TYPE_GET_BY_ID,
            pathParams: { id }
        },
        StudyPerformanceTypeEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????? ??????????????: ???????? ???????????? (????????????????????????)
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B2%D0%B8%D0%B4%D0%B0%D0%BC%D0%B8%20%D0%BE%D1%86%D0%B5%D0%BD%D0%BA%D0%B8%20(%D1%83%D1%81%D0%BF%D0%B5%D0%B2%D0%B0%D0%B5%D0%BC%D0%BE%D1%81%D1%82%D1%8C)%20(StudyPerformanceType)/putItemResource-studyperformancetypeentity-put_1
 * @param {string} name
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyPerformanceTypeEntityDto, Error>>}
 */
export function replaceStudyPerformanceType(id, { name }) {
    return this.request(
        {
            action: ServiceAction.STUDY_PERFORMANCE_TYPE_REPLACE_BY_ID,
            pathParams: { id },
            params: {
                id,
                name
            }
        },
        StudyPerformanceTypeEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ???????? ???????????? (????????????????????????)
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B2%D0%B8%D0%B4%D0%B0%D0%BC%D0%B8%20%D0%BE%D1%86%D0%B5%D0%BD%D0%BA%D0%B8%20(%D1%83%D1%81%D0%BF%D0%B5%D0%B2%D0%B0%D0%B5%D0%BC%D0%BE%D1%81%D1%82%D1%8C)%20(StudyPerformanceType)/deleteItemResource-studyperformancetypeentity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function deleteStudyPerformanceType(id) {
    return this.request({
        action: ServiceAction.STUDY_PERFORMANCE_TYPE_DELETE_BY_ID,
        pathParams: { id }
    });
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ???????? ???????????? (????????????????????????)
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B2%D0%B8%D0%B4%D0%B0%D0%BC%D0%B8%20%D0%BE%D1%86%D0%B5%D0%BD%D0%BA%D0%B8%20(%D1%83%D1%81%D0%BF%D0%B5%D0%B2%D0%B0%D0%B5%D0%BC%D0%BE%D1%81%D1%82%D1%8C)%20(StudyPerformanceType)/patchItemResource-studyperformancetypeentity-patch_1
 * @param {string} name
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyPerformanceTypeEntityDto, Error>>}
 */
export function updateStudyPerformanceType(id, { name }) {
    return this.request(
        {
            action: ServiceAction.STUDY_PERFORMANCE_TYPE_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                id,
                name
            }
        },
        StudyPerformanceTypeEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ?????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D1%89%D0%B8%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20()/getCollectionResource-entity-get_1_1
 *
 * @return {Promise<SafeResult<StudyProviderEntityDto[], Error>>}
 */
export function getStudyProviders() {
    return this.request(
        {
            action: ServiceAction.STUDY_PROVIDER_GET
        },
        StudyProviderEntityDto
    );
}

/**
 * @description ???????????????????? ????????????????: ?????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D1%89%D0%B8%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(StudyProvider)/postCollectionResource-studyproviderentity-post_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {StudyProviderTypeEntityDto} study_provider_type
 * @param {string} external_id
 * @param {string} name
 * @param {string} short_name
 * @param {string} inn
 * @param {boolean} is_anchor
 * @param {boolean} is_head
 * @param {string} description
 * @param {number} code
 * @param {string} provider_url
 * @param {StudyProviderRegionEntityDto} study_provider_region
 * @param {StudyProviderRegionCityEntityDto} study_provider_region_city
 * @param {Array} study_degrees
 * @param {Array} legal_entity_restrictions
 * @param {boolean} actual
 *
 * @return {Promise<SafeResult<StudyProviderEntityDto, Error>>}
 */
export function createStudyProvider({
    date_from,
    date_to,
    study_provider_type,
    external_id,
    name,
    short_name,
    inn,
    is_anchor,
    is_head,
    description,
    code,
    provider_url,
    study_provider_region,
    study_provider_region_city,
    study_degrees,
    legal_entity_restrictions,
    actual
}) {
    return this.request(
        {
            action: ServiceAction.STUDY_PROVIDER_CREATE,
            params: {
                date_from,
                date_to,
                study_provider_type,
                external_id,
                name,
                short_name,
                inn,
                is_anchor,
                is_head,
                description,
                code,
                provider_url,
                study_provider_region,
                study_provider_region_city,
                study_degrees,
                legal_entity_restrictions,
                actual
            }
        },
        StudyProviderEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ?????????????? ?? ?????????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B4%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D0%B0%D0%BC%D0%B8%20%D1%81%20%D0%9F%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D1%89%D0%B8%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%9C%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(StudyProviderContract)/getCollectionResource-studyprovidercontractentity-get_1_1
 *
 * @return {Promise<SafeResult<StudyProviderContractEntityDto[], Error>>}
 */
export function getStudyProviderContract() {
    return this.request(
        {
            action: ServiceAction.STUDY_PROVIDER_CONTRACT_GET
        },
        StudyProviderContractEntityDto
    );
}

/**
 * @description ???????????????????? ????????????????: ?????????????? ?? ?????????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B4%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D0%B0%D0%BC%D0%B8%20%D1%81%20%D0%9F%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D1%89%D0%B8%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%9C%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(StudyProviderContract)/postCollectionResource-studyprovidercontractentity-post_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} external_id
 * @param {string} name
 * @param {string} date_start
 * @param {string} date_end
 * @param {string} attachment_url
 * @param {StudyProviderEntityDto} study_provider
 * @param {Array} contract_subjects
 * @param {boolean} actual
 * @param {boolean} is_active
 *
 * @return {Promise<SafeResult<StudyProviderContractEntityDto, Error>>}
 */
export function createStudyProviderContract({
    date_from,
    date_to,
    external_id,
    name,
    date_start,
    date_end,
    attachment_url,
    study_provider,
    contract_subjects,
    actual,
    is_active
}) {
    return this.request(
        {
            action: ServiceAction.STUDY_PROVIDER_CONTRACT_CREATE,
            params: {
                id,
                date_from,
                date_to,
                external_id,
                name,
                date_start,
                date_end,
                attachment_url,
                study_provider,
                contract_subjects,
                actual,
                is_active
            }
        },
        StudyProviderContractEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ?????????????? ?? ?????????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B4%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D0%B0%D0%BC%D0%B8%20%D1%81%20%D0%9F%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D1%89%D0%B8%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%9C%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(StudyProviderContract)/getItemResource-studyprovidercontractentity-get_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyProviderContractEntityDto, Error>>}
 */
export function getStudyProviderContractById(id) {
    return this.request(
        {
            action: ServiceAction.STUDY_PROVIDER_CONTRACT_GET_BY_ID,
            pathParams: { id }
        },
        StudyProviderContractEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????? ??????????????: ?????????????? ?? ?????????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B4%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D0%B0%D0%BC%D0%B8%20%D1%81%20%D0%9F%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D1%89%D0%B8%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%9C%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(StudyProviderContract)/putItemResource-studyprovidercontractentity-put_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} external_id
 * @param {string} name
 * @param {string} date_start
 * @param {string} date_end
 * @param {string} attachment_url
 * @param {StudyProviderEntityDto} study_provider
 * @param {Array} contract_subjects
 * @param {boolean} actual
 * @param {boolean} is_active
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyProviderContractEntityDto, Error>>}
 */
export function replaceStudyProviderContract(
    id,
    {
        date_from,
        date_to,
        external_id,
        name,
        date_start,
        date_end,
        attachment_url,
        study_provider,
        contract_subjects,
        actual,
        is_active
    }
) {
    return this.request(
        {
            action: ServiceAction.STUDY_PROVIDER_CONTRACT_REPLACE_BY_ID,
            pathParams: { id },
            params: {
                id,
                date_from,
                date_to,
                external_id,
                name,
                date_start,
                date_end,
                attachment_url,
                study_provider,
                contract_subjects,
                actual,
                is_active
            }
        },
        StudyProviderContractEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ?????????????? ?? ?????????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B4%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D0%B0%D0%BC%D0%B8%20%D1%81%20%D0%9F%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D1%89%D0%B8%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%9C%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(StudyProviderContract)/deleteItemResource-studyprovidercontractentity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function deleteStudyProviderContract(id) {
    return this.request({
        action: ServiceAction.STUDY_PROVIDER_CONTRACT_DELETE_BY_ID,
        pathParams: { id }
    });
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ?????????????? ?? ?????????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B4%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D0%B0%D0%BC%D0%B8%20%D1%81%20%D0%9F%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D1%89%D0%B8%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%9C%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(StudyProviderContract)/patchItemResource-studyprovidercontractentity-patch_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} external_id
 * @param {string} name
 * @param {string} date_start
 * @param {string} date_end
 * @param {string} attachment_url
 * @param {StudyProviderEntityDto} study_provider
 * @param {Array} contract_subjects
 * @param {boolean} actual
 * @param {boolean} is_active
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyProviderContractEntityDto, Error>>}
 */
export function updateStudyProviderContract(
    id,
    {
        date_from,
        date_to,
        external_id,
        name,
        date_start,
        date_end,
        attachment_url,
        study_provider,
        contract_subjects,
        actual,
        is_active
    }
) {
    return this.request(
        {
            action: ServiceAction.STUDY_PROVIDER_CONTRACT_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                id,
                date_from,
                date_to,
                external_id,
                name,
                date_start,
                date_end,
                attachment_url,
                study_provider,
                contract_subjects,
                actual,
                is_active
            }
        },
        StudyProviderContractEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ?????? ???????????????????????????? ???? ???????????????? (?????????????? ????????????????)
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B4%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D0%B0%D0%BC%D0%B8%20%D1%81%20%D0%9F%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D1%89%D0%B8%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%9C%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(StudyProviderContract)/followPropertyReference-studyprovidercontractentity-get_1_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<ContractSubjectEntityDto[], Error>>}
 */
export function getStudyProviderContractContractSubjectById(id) {
    return this.request(
        {
            action: ServiceAction.STUDY_PROVIDER_CONTRACT_CONTRACT_SUBJECT_GET_BY_ID,
            pathParams: { id }
        },
        ContractSubjectEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????? ??????????????: ?????? ???????????????????????????? ???? ???????????????? (?????????????? ????????????????)
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B4%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D0%B0%D0%BC%D0%B8%20%D1%81%20%D0%9F%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D1%89%D0%B8%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%9C%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(StudyProviderContract)/createPropertyReference-studyprovidercontractentity-put_1
 * @param {Array} links
 * @param {Array} content
 * @param {string} id
 *
 * @return {Promise<SafeResult<ContractSubjectEntityDto[], Error>>}
 */
export function replaceStudyProviderContractContractSubject(id, { links, content }) {
    return this.request(
        {
            action: ServiceAction.STUDY_PROVIDER_CONTRACT_CONTRACT_SUBJECT_REPLACE_BY_ID,
            pathParams: { id },
            params: {
                links,
                content
            }
        },
        ContractSubjectEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ?????? ???????????????????????????? ???? ???????????????? (?????????????? ????????????????)
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B4%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D0%B0%D0%BC%D0%B8%20%D1%81%20%D0%9F%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D1%89%D0%B8%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%9C%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(StudyProviderContract)/deletePropertyReference-studyprovidercontractentity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
// export function deleteStudyProviderContractContractSubject(id) {
//     return this.request({
//         action: ServiceAction.STUDY_PROVIDER_CONTRACT_CONTRACT_SUBJECT_DELETE_BY_ID,
//         pathParams: { id }
//     });
// }

/**
 * @description ?????????????????? ?????????????? ????????????????: ?????? ???????????????????????????? ???? ???????????????? (?????????????? ????????????????)
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B4%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D0%B0%D0%BC%D0%B8%20%D1%81%20%D0%9F%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D1%89%D0%B8%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%9C%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(StudyProviderContract)/createPropertyReference-studyprovidercontractentity-patch_1
 * @param {Array} links
 * @param {Array} content
 * @param {string} id
 *
 * @return {Promise<SafeResult<ContractSubjectEntityDto[], Error>>}
 */
export function updateStudyProviderContractContractSubject(id, { links, content }) {
    return this.request(
        {
            action: ServiceAction.STUDY_PROVIDER_CONTRACT_CONTRACT_SUBJECT_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                links,
                content
            }
        },
        ContractSubjectEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ?????? ???????????????????????????? ???? ???????????????? (?????????????? ????????????????)
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B4%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D0%B0%D0%BC%D0%B8%20%D1%81%20%D0%9F%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D1%89%D0%B8%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%9C%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(StudyProviderContract)/followPropertyReference-studyprovidercontractentity-get_1
 * @param {string} id
 * @param {string} propertyId
 *
 * @return {Promise<SafeResult<ContractSubjectEntityDto[], Error>>}
 */
export function getStudyProviderContractContractSubject({ id, propertyId }) {
    return this.request(
        {
            action: ServiceAction.STUDY_PROVIDER_CONTRACT_CONTRACT_SUBJECT_GET,
            pathParams: { id, propertyId }
        },
        ContractSubjectEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ?????? ???????????????????????????? ???? ???????????????? (?????????????? ????????????????)
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B4%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D0%B0%D0%BC%D0%B8%20%D1%81%20%D0%9F%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D1%89%D0%B8%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%9C%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(StudyProviderContract)/deletePropertyReferenceId-studyprovidercontractentity-delete_1
 * @param {string} contractId
 * @param {string} contractSubjectId
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function deleteStudyProviderContractContractSubject(contractId, contractSubjectId) {
    return this.request({
        action: ServiceAction.STUDY_PROVIDER_CONTRACT_CONTRACT_SUBJECT_DELETE,
        pathParams: { contractId, contractSubjectId }
    });
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????????? ???????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%80%D0%B5%D0%B3%D0%B8%D0%BE%D0%BD%D0%B0%D0%BC%D0%B8%20%D0%9F%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D1%89%D0%B8%D0%BA%D0%BE%D0%B2%20%D0%9C%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(StudyProviderRegion)/getCollectionResource-studyproviderregionentity-get_1_1
 *
 * @return {Promise<SafeResult<StudyProviderRegionEntityDto, Error>>}
 */
export function getStudyProviderRegions() {
    return this.request(
        {
            action: ServiceAction.STUDY_PROVIDER_REGION_GET
        },
        StudyProviderRegionEntityDto
    );
}

/**
 * @description ???????????????????? ????????????????: ???????????? ???????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%80%D0%B5%D0%B3%D0%B8%D0%BE%D0%BD%D0%B0%D0%BC%D0%B8%20%D0%9F%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D1%89%D0%B8%D0%BA%D0%BE%D0%B2%20%D0%9C%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(StudyProviderRegion)/postCollectionResource-studyproviderregionentity-post_1
 * @param {string} external_id
 * @param {string} name
 * @param {string} country_code_iso
 *
 * @return {Promise<SafeResult<StudyProviderRegionEntityDto, Error>>}
 */
export function createStudyProviderRegion({ external_id, name, country_code_iso }) {
    return this.request(
        {
            action: ServiceAction.STUDY_PROVIDER_REGION_CREATE,
            params: {
                external_id,
                name,
                country_code_iso
            }
        },
        StudyProviderRegionEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????????? ???????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D0%B0%D0%BC%D0%B8%20%D0%B2%20%D1%80%D0%B5%D0%B3%D0%B8%D0%BE%D0%BD%D0%B0%D1%85%20%D0%9F%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D1%89%D0%B8%D0%BA%D0%BE%D0%B2%20%D0%9C%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(StudyProviderRegionCity)/getCollectionResource-studyproviderregioncityentity-get_1_1
 *
 * @return {Promise<SafeResult<StudyProviderRegionCityEntityDto, Error>>}
 */
export function getStudyProviderRegionCities() {
    return this.request(
        {
            action: ServiceAction.STUDY_PROVIDER_REGION_CITY_GET_ALL
        },
        StudyProviderRegionCityEntityDto
    );
}

/**
 * @description ???????????????????? ????????????????: ???????????? ???????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D0%B0%D0%BC%D0%B8%20%D0%B2%20%D1%80%D0%B5%D0%B3%D0%B8%D0%BE%D0%BD%D0%B0%D1%85%20%D0%9F%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D1%89%D0%B8%D0%BA%D0%BE%D0%B2%20%D0%9C%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(StudyProviderRegionCity)/postCollectionResource-studyproviderregioncityentity-post_1
 * @param {string} external_id
 * @param {string} name
 * @param {StudyProviderRegionEntityDto} study_provider_region
 *
 * @return {Promise<SafeResult<StudyProviderRegionCityEntityDto, Error>>}
 */
export function createStudyProviderRegionCity({ external_id, name, study_provider_region }) {
    return this.request(
        {
            action: ServiceAction.STUDY_PROVIDER_REGION_CITY_CREATE,
            params: {
                id,
                external_id,
                name,
                study_provider_region
            }
        },
        StudyProviderRegionCityEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????????? ???????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D0%B0%D0%BC%D0%B8%20%D0%B2%20%D1%80%D0%B5%D0%B3%D0%B8%D0%BE%D0%BD%D0%B0%D1%85%20%D0%9F%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D1%89%D0%B8%D0%BA%D0%BE%D0%B2%20%D0%9C%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(StudyProviderRegionCity)/getItemResource-studyproviderregioncityentity-get_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyProviderRegionCityEntityDto, Error>>}
 */
export function getStudyProviderRegionCityById(id) {
    return this.request(
        {
            action: ServiceAction.STUDY_PROVIDER_REGION_CITY_GET_BY_ID,
            pathParams: { id }
        },
        StudyProviderRegionCityEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????? ??????????????: ???????????? ???????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D0%B0%D0%BC%D0%B8%20%D0%B2%20%D1%80%D0%B5%D0%B3%D0%B8%D0%BE%D0%BD%D0%B0%D1%85%20%D0%9F%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D1%89%D0%B8%D0%BA%D0%BE%D0%B2%20%D0%9C%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(StudyProviderRegionCity)/putItemResource-studyproviderregioncityentity-put_1
 * @param {string} external_id
 * @param {string} name
 * @param {StudyProviderRegionEntityDto} study_provider_region
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyProviderRegionCityEntityDto, Error>>}
 */
export function replaceStudyProviderRegionCity(id, { external_id, name, study_provider_region }) {
    return this.request(
        {
            action: ServiceAction.STUDY_PROVIDER_REGION_CITY_REPLACE_BY_ID,
            pathParams: { id },
            params: {
                external_id,
                name,
                study_provider_region
            }
        },
        StudyProviderRegionCityEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ???????????? ???????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D0%B0%D0%BC%D0%B8%20%D0%B2%20%D1%80%D0%B5%D0%B3%D0%B8%D0%BE%D0%BD%D0%B0%D1%85%20%D0%9F%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D1%89%D0%B8%D0%BA%D0%BE%D0%B2%20%D0%9C%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(StudyProviderRegionCity)/deleteItemResource-studyproviderregioncityentity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function deleteStudyProviderRegionCity(id) {
    return this.request({
        action: ServiceAction.STUDY_PROVIDER_REGION_CITY_DELETE_BY_ID,
        pathParams: { id }
    });
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ???????????? ???????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D0%B0%D0%BC%D0%B8%20%D0%B2%20%D1%80%D0%B5%D0%B3%D0%B8%D0%BE%D0%BD%D0%B0%D1%85%20%D0%9F%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D1%89%D0%B8%D0%BA%D0%BE%D0%B2%20%D0%9C%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(StudyProviderRegionCity)/patchItemResource-studyproviderregioncityentity-patch_1
 * @param {string} external_id
 * @param {string} name
 * @param {StudyProviderRegionEntityDto} study_provider_region
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyProviderRegionCityEntityDto, Error>>}
 */
export function updateStudyProviderRegionCity(id, { external_id, name, study_provider_region }) {
    return this.request(
        {
            action: ServiceAction.STUDY_PROVIDER_REGION_CITY_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                external_id,
                name,
                study_provider_region
            }
        },
        StudyProviderRegionCityEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????????? ???????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%80%D0%B5%D0%B3%D0%B8%D0%BE%D0%BD%D0%B0%D0%BC%D0%B8%20%D0%9F%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D1%89%D0%B8%D0%BA%D0%BE%D0%B2%20%D0%9C%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(StudyProviderRegion)/getItemResource-studyproviderregionentity-get_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyProviderRegionEntityDto, Error>>}
 */
export function getStudyProviderRegionById(id) {
    return this.request(
        {
            action: ServiceAction.STUDY_PROVIDER_REGION_GET_BY_ID,
            pathParams: { id }
        },
        StudyProviderRegionEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????? ??????????????: ???????????? ???????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%80%D0%B5%D0%B3%D0%B8%D0%BE%D0%BD%D0%B0%D0%BC%D0%B8%20%D0%9F%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D1%89%D0%B8%D0%BA%D0%BE%D0%B2%20%D0%9C%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(StudyProviderRegion)/putItemResource-studyproviderregionentity-put_1
 * @param {string} external_id
 * @param {string} name
 * @param {string} country_code_iso
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyProviderRegionEntityDto, Error>>}
 */
export function replaceStudyProviderRegion(id, { external_id, name, country_code_iso }) {
    return this.request(
        {
            action: ServiceAction.STUDY_PROVIDER_REGION_REPLACE_BY_ID,
            pathParams: { id },
            params: {
                external_id,
                name,
                country_code_iso
            }
        },
        StudyProviderRegionEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ???????????? ???????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%80%D0%B5%D0%B3%D0%B8%D0%BE%D0%BD%D0%B0%D0%BC%D0%B8%20%D0%9F%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D1%89%D0%B8%D0%BA%D0%BE%D0%B2%20%D0%9C%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(StudyProviderRegion)/deleteItemResource-studyproviderregionentity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function deleteStudyProviderRegion(id) {
    return this.request({
        action: ServiceAction.STUDY_PROVIDER_REGION_DELETE_BY_ID,
        pathParams: { id }
    });
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ???????????? ???????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%80%D0%B5%D0%B3%D0%B8%D0%BE%D0%BD%D0%B0%D0%BC%D0%B8%20%D0%9F%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D1%89%D0%B8%D0%BA%D0%BE%D0%B2%20%D0%9C%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(StudyProviderRegion)/patchItemResource-studyproviderregionentity-patch_1
 * @param {string} external_id
 * @param {string} name
 * @param {string} country_code_iso
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyProviderRegionEntityDto, Error>>}
 */
export function updateStudyProviderRegion(id, { external_id, name, country_code_iso }) {
    return this.request(
        {
            action: ServiceAction.STUDY_PROVIDER_REGION_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                external_id,
                name,
                country_code_iso
            }
        },
        StudyProviderRegionEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ?????? ???????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%82%D0%B8%D0%BF%D0%B0%D0%BC%D0%B8%20%D0%BF%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D1%89%D0%B8%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(StudyProviderType)/getCollectionResource-studyprovidertypeentity-get_1_1
 *
 * @return {Promise<SafeResult<StudyProviderTypeEntityDto[], Error>>}
 */
export function getStudyProviderType() {
    return this.request(
        {
            action: ServiceAction.STUDY_PROVIDER_TYPE_GET
        },
        StudyProviderTypeEntityDto
    );
}

/**
 * @description ???????????????????? ????????????????: ?????? ???????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%82%D0%B8%D0%BF%D0%B0%D0%BC%D0%B8%20%D0%BF%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D1%89%D0%B8%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(StudyProviderType)/postCollectionResource-studyprovidertypeentity-post_1
 * @param {string} name
 * @param {string} description
 * @param {number} code
 *
 * @return {Promise<SafeResult<StudyProviderTypeEntityDto, Error>>}
 */
export function createStudyProviderType({ name, description, code }) {
    return this.request(
        {
            action: ServiceAction.STUDY_PROVIDER_TYPE_CREATE,
            params: {
                name,
                description,
                code
            }
        },
        StudyProviderTypeEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ?????? ???????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%82%D0%B8%D0%BF%D0%B0%D0%BC%D0%B8%20%D0%BF%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D1%89%D0%B8%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(StudyProviderType)/getItemResource-studyprovidertypeentity-get_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyProviderTypeEntityDto, Error>>}
 */
export function getStudyProviderTypeById(id) {
    return this.request(
        {
            action: ServiceAction.STUDY_PROVIDER_TYPE_GET_BY_ID,
            pathParams: { id }
        },
        StudyProviderTypeEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????? ??????????????: ?????? ???????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%82%D0%B8%D0%BF%D0%B0%D0%BC%D0%B8%20%D0%BF%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D1%89%D0%B8%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(StudyProviderType)/putItemResource-studyprovidertypeentity-put_1
 * @param {string} name
 * @param {string} description
 * @param {number} code
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyProviderTypeEntityDto, Error>>}
 */
export function replaceStudyProviderType(id, { name, description, code }) {
    return this.request(
        {
            action: ServiceAction.STUDY_PROVIDER_TYPE_REPLACE_BY_ID,
            pathParams: { id },
            params: {
                name,
                description,
                code
            }
        },
        StudyProviderTypeEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ?????? ???????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%82%D0%B8%D0%BF%D0%B0%D0%BC%D0%B8%20%D0%BF%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D1%89%D0%B8%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(StudyProviderType)/deleteItemResource-studyprovidertypeentity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function deleteStudyProviderType(id) {
    return this.request({
        action: ServiceAction.STUDY_PROVIDER_TYPE_DELETE_BY_ID,
        pathParams: { id }
    });
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ?????? ???????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%82%D0%B8%D0%BF%D0%B0%D0%BC%D0%B8%20%D0%BF%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D1%89%D0%B8%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(StudyProviderType)/patchItemResource-studyprovidertypeentity-patch_1
 * @param {string} name
 * @param {string} description
 * @param {number} code
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyProviderTypeEntityDto, Error>>}
 */
export function updateStudyProviderType(id, { name, description, code }) {
    return this.request(
        {
            action: ServiceAction.STUDY_PROVIDER_TYPE_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                name,
                description,
                code
            }
        },
        StudyProviderTypeEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ?????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D1%89%D0%B8%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(StudyProvider)/getItemResource-studyproviderentity-get_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyProviderEntityDto, Error>>}
 */
export function getStudyProviderById(id) {
    return this.request(
        {
            action: ServiceAction.STUDY_PROVIDER_GET_BY_ID,
            pathParams: { id }
        },
        StudyProviderEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????? ??????????????: ?????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D1%89%D0%B8%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(StudyProvider)/putItemResource-studyproviderentity-put_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {StudyProviderTypeEntityDto} study_provider_type
 * @param {string} external_id
 * @param {string} name
 * @param {string} short_name
 * @param {string} inn
 * @param {boolean} is_anchor
 * @param {boolean} is_head
 * @param {string} description
 * @param {number} code
 * @param {string} provider_url
 * @param {StudyProviderRegionEntityDto} study_provider_region
 * @param {StudyProviderRegionCityEntityDto} study_provider_region_city
 * @param {Array} study_degrees
 * @param {Array} legal_entity_restrictions
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyProviderEntityDto, Error>>}
 */
export function replaceStudyProvider(
    id,
    {
        date_from,
        date_to,
        study_provider_type,
        external_id,
        name,
        short_name,
        inn,
        is_anchor,
        is_head,
        description,
        code,
        provider_url,
        study_provider_region,
        study_provider_region_city,
        study_degrees,
        legal_entity_restrictions,
        actual
    }
) {
    return this.request(
        {
            action: ServiceAction.STUDY_PROVIDER_REPLACE_BY_ID,
            pathParams: { id },
            params: {
                id,
                date_from,
                date_to,
                study_provider_type,
                external_id,
                name,
                short_name,
                inn,
                is_anchor,
                is_head,
                description,
                code,
                provider_url,
                study_provider_region,
                study_provider_region_city,
                study_degrees,
                legal_entity_restrictions,
                actual
            }
        },
        StudyProviderEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ?????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D1%89%D0%B8%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(StudyProvider)/deleteItemResource-studyproviderentity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function deleteStudyProvider(id) {
    return this.request({
        action: ServiceAction.STUDY_PROVIDER_DELETE_BY_ID,
        pathParams: { id }
    });
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ?????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D1%89%D0%B8%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(StudyProvider)/patchItemResource-studyproviderentity-patch_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {StudyProviderTypeEntityDto} study_provider_type
 * @param {string} external_id
 * @param {string} name
 * @param {string} short_name
 * @param {string} inn
 * @param {boolean} is_anchor
 * @param {boolean} is_head
 * @param {string} description
 * @param {number} code
 * @param {string} provider_url
 * @param {StudyProviderRegionEntityDto} study_provider_region
 * @param {StudyProviderRegionCityEntityDto} study_provider_region_city
 * @param {Array} study_degrees
 * @param {Array} legal_entity_restrictions
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyProviderEntityDto, Error>>}
 */
export function updateStudyProvider(
    id,
    {
        date_from,
        date_to,
        study_provider_type,
        external_id,
        name,
        short_name,
        inn,
        is_anchor,
        is_head,
        description,
        code,
        provider_url,
        study_provider_region,
        study_provider_region_city,
        study_degrees,
        legal_entity_restrictions,
        actual
    }
) {
    return this.request(
        {
            action: ServiceAction.STUDY_PROVIDER_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                date_from,
                date_to,
                study_provider_type,
                external_id,
                name,
                short_name,
                inn,
                is_anchor,
                is_head,
                description,
                code,
                provider_url,
                study_provider_region,
                study_provider_region_city,
                study_degrees,
                legal_entity_restrictions,
                actual
            }
        },
        StudyProviderEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ??????????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D1%89%D0%B8%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(StudyProvider)/followPropertyReference-studyproviderentity-get_1_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyDegreeEntityDto[], Error>>}
 */
export function getStudyProviderStudyDegreeById(id) {
    return this.request(
        {
            action: ServiceAction.STUDY_PROVIDER_STUDY_DEGREE_GET_BY_ID,
            pathParams: { id }
        },
        StudyDegreeEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????? ??????????????: ??????????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D1%89%D0%B8%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(StudyProvider)/createPropertyReference-studyproviderentity-put_1
 * @param {Array} studyDegrees
 * @param {string} studyProviderId
 *
 * @return {Promise<SafeResult<StudyDegreeEntityDto[], Error>>}
 */
export function replaceStudyProviderStudyDegrees(studyProviderId, studyDegrees) {
    return this.request(
        {
            action: ServiceAction.STUDY_PROVIDER_STUDY_DEGREE_REPLACE_BY_ID,
            pathParams: { studyProviderId },
            params: {
                content: studyDegrees
            }
        },
        StudyDegreeEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ??????????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D1%89%D0%B8%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(StudyProvider)/deletePropertyReference-studyproviderentity-delete_1
 * @param {string} studyProviderId
 *
 * @return {Promise<SafeResult<true, Error>>}
 */
export function deleteStudyProviderStudyDegreeBindingsByStudyProviderId(studyProviderId) {
    return this.request({
        action: ServiceAction.STUDY_PROVIDER_STUDY_DEGREE_DELETE_BY_ID,
        pathParams: { studyProviderId }
    });
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ??????????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D1%89%D0%B8%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(StudyProvider)/createPropertyReference-studyproviderentity-patch_1
 * @param {string} studyProviderId
 * @param {Array} studyDegrees
 *
 * @return {Promise<SafeResult<StudyDegreeEntityDto[], Error>>}
 */
export function updateStudyProviderStudyDegreeBindings(studyProviderId, studyDegrees) {
    return this.request(
        {
            action: ServiceAction.STUDY_PROVIDER_STUDY_DEGREE_UPDATE_BY_ID,
            pathParams: { studyProviderId },
            params: {
                content: studyDegrees
            }
        },
        StudyDegreeEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ??????????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D1%89%D0%B8%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(StudyProvider)/followPropertyReference-studyproviderentity-get_1
 * @param {string} studyProviderId
 * @param {string} studyDegreeId
 *
 * @return {Promise<SafeResult<StudyDegreeEntityDto[], Error>>}
 */
export function getStudyProviderStudyDegreeBindingsByKeys(studyProviderId, studyDegreeId) {
    return this.request(
        {
            action: ServiceAction.STUDY_PROVIDER_STUDY_DEGREE_GET_BY_KEYS,
            pathParams: { studyProviderId, studyDegreeId }
        },
        StudyDegreeEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ??????????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D1%89%D0%B8%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9%20(StudyProvider)/deletePropertyReferenceId-studyproviderentity-delete_1
 * @param {string} studyProviderId
 * @param {string} studyDegreeId
 *
 * @return {Promise<SafeResult<true, Error>>}
 */
export function deleteStudyProviderStudyDegreeBindingsByKeys(studyProviderId, studyDegreeId) {
    return this.request({
        action: ServiceAction.STUDY_PROVIDER_STUDY_DEGREE_DELETE_BY_KEYS,
        pathParams: { studyProviderId, studyDegreeId }
    });
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%83%D1%87%D0%B0%D1%89%D0%B8%D0%BC%D0%B8%D1%81%D1%8F%20(StudyStudent)/getCollectionResource-studystudententity-get_1_1
 *
 * @return {Promise<SafeResult<StudyStudentEntityDto[], Error>>}
 */
export function getStudyStudents() {
    return this.request(
        {
            action: ServiceAction.STUDY_STUDENT_GET
        },
        StudyStudentEntityDto
    );
}

/**
 * @description ???????????????????? ????????????????: ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%83%D1%87%D0%B0%D1%89%D0%B8%D0%BC%D0%B8%D1%81%D1%8F%20(StudyStudent)/postCollectionResource-studystudententity-post_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} snils
 * @param {string} name
 * @param {string} surname
 * @param {string} patronymic
 * @param {string} birthdate
 * @param {string} phone
 * @param {string} email
 * @param {string} photo_url
 * @param {number} parent_employee_id
 * @param {boolean} actual
 *
 * @return {Promise<SafeResult<StudyStudentEntityDto, Error>>}
 */
export function createStudyStudent({
    date_from,
    date_to,
    snils,
    name,
    surname,
    patronymic,
    birthdate,
    phone,
    email,
    photo_url,
    parent_employee_id,
    actual
}) {
    return this.request(
        {
            action: ServiceAction.STUDY_STUDENT_CREATE,
            params: {
                date_from,
                date_to,
                snils,
                name,
                surname,
                patronymic,
                birthdate,
                phone,
                email,
                photo_url,
                parent_employee_id,
                actual
            }
        },
        StudyStudentEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%9E%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5%D0%BC%20(StudyStudentEducation)/getCollectionResource-studystudenteducationentity-get_1_1
 *
 * @return {Promise<SafeResult<StudyStudentEducationEntityDto[], Error>>}
 */
export function getStudyStudentEducations() {
    return this.request(
        {
            action: ServiceAction.STUDY_STUDENT_EDUCATION_GET_ALL
        },
        StudyStudentEducationEntityDto
    );
}

/**
 * @description ???????????????????? ????????????????: ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%9E%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5%D0%BC%20(StudyStudentEducation)/postCollectionResource-studystudenteducationentity-post_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} external_id
 * @param {StudyStudentEntityDto} study_student
 * @param {StudyProviderEntityDto} study_provider
 * @param {StudyDegreeEntityDto} study_degree
 * @param {LearningCourseTypeEntityDto} learning_course_type
 * @param {string} date_start
 * @param {string} date_end
 * @param {boolean} actual
 *
 * @return {Promise<SafeResult<StudyStudentEducationEntityDto, Error>>}
 */
export function createStudyStudentEducation({
    date_from,
    date_to,
    external_id,
    study_student,
    study_provider,
    study_degree,
    learning_course_type,
    date_start,
    date_end,
    actual
}) {
    return this.request(
        {
            action: ServiceAction.STUDY_STUDENT_EDUCATION_CREATE,
            params: {
                date_from,
                date_to,
                external_id,
                study_student,
                study_provider,
                study_degree,
                learning_course_type,
                date_start,
                date_end,
                actual
            }
        },
        StudyStudentEducationEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%9E%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5%D0%BC%20(StudyStudentEducation)/getItemResource-studystudenteducationentity-get_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyStudentEducationEntityDto, Error>>}
 */
export function getStudyStudentEducationById(id) {
    return this.request(
        {
            action: ServiceAction.STUDY_STUDENT_EDUCATION_GET_BY_ID,
            pathParams: { id }
        },
        StudyStudentEducationEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????? ??????????????: ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%9E%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5%D0%BC%20(StudyStudentEducation)/putItemResource-studystudenteducationentity-put_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} external_id
 * @param {StudyStudentEntityDto} study_student
 * @param {StudyProviderEntityDto} study_provider
 * @param {StudyDegreeEntityDto} study_degree
 * @param {LearningCourseTypeEntityDto} learning_course_type
 * @param {string} date_start
 * @param {string} date_end
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyStudentEducationEntityDto, Error>>}
 */
export function replaceStudyStudentEducation(
    id,
    {
        date_from,
        date_to,
        external_id,
        study_student,
        study_provider,
        study_degree,
        learning_course_type,
        date_start,
        date_end,
        actual
    }
) {
    return this.request(
        {
            action: ServiceAction.STUDY_STUDENT_EDUCATION_REPLACE_BY_ID,
            pathParams: { id },
            params: {
                date_from,
                date_to,
                external_id,
                study_student,
                study_provider,
                study_degree,
                learning_course_type,
                date_start,
                date_end,
                actual
            }
        },
        StudyStudentEducationEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%9E%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5%D0%BC%20(StudyStudentEducation)/deleteItemResource-studystudenteducationentity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<true, Error>>}
 */
export function deleteStudyStudentEducation(id) {
    return this.request({
        action: ServiceAction.STUDY_STUDENT_EDUCATION_DELETE_BY_ID,
        pathParams: { id }
    });
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%9E%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5%D0%BC%20(StudyStudentEducation)/patchItemResource-studystudenteducationentity-patch_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} external_id
 * @param {StudyStudentEntityDto} study_student
 * @param {StudyProviderEntityDto} study_provider
 * @param {StudyDegreeEntityDto} study_degree
 * @param {LearningCourseTypeEntityDto} learning_course_type
 * @param {string} date_start
 * @param {string} date_end
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyStudentEducationEntityDto, Error>>}
 */
export function updateStudyStudentEducation(
    id,
    {
        date_from,
        date_to,
        external_id,
        study_student,
        study_provider,
        study_degree,
        learning_course_type,
        date_start,
        date_end,
        actual
    }
) {
    return this.request(
        {
            action: ServiceAction.STUDY_STUDENT_EDUCATION_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                date_from,
                date_to,
                external_id,
                study_student,
                study_provider,
                study_degree,
                learning_course_type,
                date_start,
                date_end,
                actual
            }
        },
        StudyStudentEducationEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ????????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%83%D1%81%D0%BF%D0%B5%D0%B2%D0%B0%D0%B5%D0%BC%D0%BE%D1%81%D1%82%D1%8C%D1%8E%20%D1%81%D1%82%D1%83%D0%B4%D0%B5%D0%BD%D1%82%D0%BE%D0%B2%20(StudyStudentPerformance)/getCollectionResource-studystudentperformanceentity-get_1_1
 *
 * @return {Promise<SafeResult<StudyStudentPerformanceEntityDto, Error>>}
 */
export function getStudyStudentPerformances() {
    return this.request(
        {
            action: ServiceAction.STUDY_STUDENT_PERFORMANCE_GET_ALL
        },
        StudyStudentPerformanceEntityDto
    );
}

/**
 * @description ???????????????????? ????????????????: ????????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%83%D1%81%D0%BF%D0%B5%D0%B2%D0%B0%D0%B5%D0%BC%D0%BE%D1%81%D1%82%D1%8C%D1%8E%20%D1%81%D1%82%D1%83%D0%B4%D0%B5%D0%BD%D1%82%D0%BE%D0%B2%20(StudyStudentPerformance)/postCollectionResource-studystudentperformanceentity-post_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {StudyStudentEducationEntityDto} study_student_education
 * @param {StudyPerformanceTypeEntityDto} study_performance_type
 * @param {string} grade_date
 * @param {number} grade
 * @param {boolean} is_average_relevant
 * @param {boolean} actual
 *
 * @return {Promise<SafeResult<StudyStudentPerformanceEntityDto, Error>>}
 */
export function createStudyStudentPerformance({
    date_from,
    date_to,
    study_student_education,
    study_performance_type,
    grade_date,
    grade,
    is_average_relevant,
    actual
}) {
    return this.request(
        {
            action: ServiceAction.STUDY_STUDENT_PERFORMANCE_CREATE,
            params: {
                date_from,
                date_to,
                study_student_education,
                study_performance_type,
                grade_date,
                grade,
                is_average_relevant,
                actual
            }
        },
        StudyStudentPerformanceEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ????????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%83%D1%81%D0%BF%D0%B5%D0%B2%D0%B0%D0%B5%D0%BC%D0%BE%D1%81%D1%82%D1%8C%D1%8E%20%D1%81%D1%82%D1%83%D0%B4%D0%B5%D0%BD%D1%82%D0%BE%D0%B2%20(StudyStudentPerformance)/getItemResource-studystudentperformanceentity-get_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyStudentPerformanceEntityDto[], Error>>}
 */
export function getStudyStudentPerformanceById(id) {
    return this.request(
        {
            action: ServiceAction.STUDY_STUDENT_PERFORMANCE_GET_BY_ID,
            pathParams: { id }
        },
        StudyStudentPerformanceEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????? ??????????????: ????????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%83%D1%81%D0%BF%D0%B5%D0%B2%D0%B0%D0%B5%D0%BC%D0%BE%D1%81%D1%82%D1%8C%D1%8E%20%D1%81%D1%82%D1%83%D0%B4%D0%B5%D0%BD%D1%82%D0%BE%D0%B2%20(StudyStudentPerformance)/putItemResource-studystudentperformanceentity-put_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {StudyStudentEducationEntityDto} study_student_education
 * @param {StudyPerformanceTypeEntityDto} study_performance_type
 * @param {string} grade_date
 * @param {number} grade
 * @param {boolean} is_average_relevant
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyStudentPerformanceEntityDto, Error>>}
 */
export function replaceStudyStudentPerformance(
    id,
    {
        date_from,
        date_to,
        study_student_education,
        study_performance_type,
        grade_date,
        grade,
        is_average_relevant,
        actual
    }
) {
    return this.request(
        {
            action: ServiceAction.STUDY_STUDENT_PERFORMANCE_REPLACE_BY_ID,
            pathParams: { id },
            params: {
                date_from,
                date_to,
                study_student_education,
                study_performance_type,
                grade_date,
                grade,
                is_average_relevant,
                actual
            }
        },
        StudyStudentPerformanceEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ????????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%83%D1%81%D0%BF%D0%B5%D0%B2%D0%B0%D0%B5%D0%BC%D0%BE%D1%81%D1%82%D1%8C%D1%8E%20%D1%81%D1%82%D1%83%D0%B4%D0%B5%D0%BD%D1%82%D0%BE%D0%B2%20(StudyStudentPerformance)/deleteItemResource-studystudentperformanceentity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function deleteStudyStudentPerformance(id) {
    return this.request({
        action: ServiceAction.STUDY_STUDENT_PERFORMANCE_DELETE_BY_ID,
        pathParams: { id }
    });
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ????????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%83%D1%81%D0%BF%D0%B5%D0%B2%D0%B0%D0%B5%D0%BC%D0%BE%D1%81%D1%82%D1%8C%D1%8E%20%D1%81%D1%82%D1%83%D0%B4%D0%B5%D0%BD%D1%82%D0%BE%D0%B2%20(StudyStudentPerformance)/patchItemResource-studystudentperformanceentity-patch_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {StudyStudentEducationEntityDto} study_student_education
 * @param {StudyPerformanceTypeEntityDto} study_performance_type
 * @param {string} grade_date
 * @param {number} grade
 * @param {boolean} is_average_relevant
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyStudentPerformanceEntityDto, Error>>}
 */
export function updateStudyStudentPerformance(
    id,
    {
        date_from,
        date_to,
        study_student_education,
        study_performance_type,
        grade_date,
        grade,
        is_average_relevant,
        actual
    }
) {
    return this.request(
        {
            action: ServiceAction.STUDY_STUDENT_PERFORMANCE_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                date_from,
                date_to,
                study_student_education,
                study_performance_type,
                grade_date,
                grade,
                is_average_relevant,
                actual
            }
        },
        StudyStudentPerformanceEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%83%D1%87%D0%B0%D1%89%D0%B8%D0%BC%D0%B8%D1%81%D1%8F%20(StudyStudent)/getItemResource-studystudententity-get_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyStudentEntityDto, Error>>}
 */
export function getStudyStudentById(id) {
    return this.request(
        {
            action: ServiceAction.STUDY_STUDENT_GET_BY_ID,
            pathParams: { id }
        },
        StudyStudentEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????? ??????????????: ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%83%D1%87%D0%B0%D1%89%D0%B8%D0%BC%D0%B8%D1%81%D1%8F%20(StudyStudent)/putItemResource-studystudententity-put_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} snils
 * @param {string} name
 * @param {string} surname
 * @param {string} patronymic
 * @param {string} birthdate
 * @param {string} phone
 * @param {string} email
 * @param {string} photo_url
 * @param {number} parent_employee_id
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyStudentEntityDto, Error>>}
 */
export function replaceStudyStudent(
    id,
    {
        date_from,
        date_to,
        snils,
        name,
        surname,
        patronymic,
        birthdate,
        phone,
        email,
        photo_url,
        parent_employee_id,
        actual
    }
) {
    return this.request(
        {
            action: ServiceAction.STUDY_STUDENT_REPLACE_BY_ID,
            pathParams: { id },
            params: {
                date_from,
                date_to,
                snils,
                name,
                surname,
                patronymic,
                birthdate,
                phone,
                email,
                photo_url,
                parent_employee_id,
                actual
            }
        },
        StudyStudentEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%83%D1%87%D0%B0%D1%89%D0%B8%D0%BC%D0%B8%D1%81%D1%8F%20(StudyStudent)/deleteItemResource-studystudententity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<boolean, Error>>}
 */
export function deleteStudyStudent(id) {
    return this.request({
        action: ServiceAction.STUDY_STUDENT_DELETE_BY_ID,
        pathParams: { id }
    });
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%83%D1%87%D0%B0%D1%89%D0%B8%D0%BC%D0%B8%D1%81%D1%8F%20(StudyStudent)/patchItemResource-studystudententity-patch_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} snils
 * @param {string} name
 * @param {string} surname
 * @param {string} patronymic
 * @param {string} birthdate
 * @param {string} phone
 * @param {string} email
 * @param {string} photo_url
 * @param {number} parent_employee_id
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<StudyStudentEntityDto, Error>>}
 */
export function updateStudyStudent(
    id,
    {
        date_from,
        date_to,
        snils,
        name,
        surname,
        patronymic,
        birthdate,
        phone,
        email,
        photo_url,
        parent_employee_id,
        actual
    }
) {
    return this.request(
        {
            action: ServiceAction.STUDY_STUDENT_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                date_from,
                date_to,
                snils,
                name,
                surname,
                patronymic,
                birthdate,
                phone,
                email,
                photo_url,
                parent_employee_id,
                actual
            }
        },
        StudyStudentEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ????????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%80%D0%B5%D0%BA%D0%BE%D0%BC%D0%B5%D0%BD%D0%B4%D0%B0%D1%86%D0%B8%D1%8F%D0%BC%D0%B8%20(Suggestion)/getCollectionResource-suggestionentity-get_1_1
 *
 * @return {Promise<SafeResult<SuggestionEntityDto[], Error>>}
 */
export function getSuggestions() {
    return this.request(
        {
            action: ServiceAction.SUGGESTION_GET_ALL
        },
        SuggestionEntityDto
    );
}

/**
 * @description ???????????????????? ????????????????: ????????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%80%D0%B5%D0%BA%D0%BE%D0%BC%D0%B5%D0%BD%D0%B4%D0%B0%D1%86%D0%B8%D1%8F%D0%BC%D0%B8%20(Suggestion)/postCollectionResource-suggestionentity-post_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {number} from_employee_id
 * @param {number} to_employee_id
 * @param {LearningCoursePartyEntityDto} to_learning_course_party
 * @param {boolean} actual
 * @param {number} learning_course
 *
 * @return {Promise<SafeResult<SuggestionEntityDto, Error>>}
 */
export function createSuggestion({
    date_from,
    date_to,
    from_employee_id,
    to_employee_id,
    to_learning_course_party,
    actual,
    learning_course
}) {
    return this.request(
        {
            action: ServiceAction.SUGGESTION_CREATE,
            params: {
                date_from,
                date_to,
                from_employee_id,
                to_employee_id,
                to_learning_course_party,
                actual,
                learning_course
            }
        },
        SuggestionEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ????????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%80%D0%B5%D0%BA%D0%BE%D0%BC%D0%B5%D0%BD%D0%B4%D0%B0%D1%86%D0%B8%D1%8F%D0%BC%D0%B8%20(Suggestion)/getItemResource-suggestionentity-get_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<SuggestionEntityDto, Error>>}
 */
export function getSuggestionById(id) {
    return this.request(
        {
            action: ServiceAction.SUGGESTION_GET_BY_ID,
            pathParams: { id }
        },
        SuggestionEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????? ??????????????: ????????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%80%D0%B5%D0%BA%D0%BE%D0%BC%D0%B5%D0%BD%D0%B4%D0%B0%D1%86%D0%B8%D1%8F%D0%BC%D0%B8%20(Suggestion)/putItemResource-suggestionentity-put_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {number} from_employee_id
 * @param {number} to_employee_id
 * @param {LearningCoursePartyEntityDto} to_learning_course_party
 * @param {boolean} actual
 * @param {number} learning_course
 * @param {string} id
 *
 * @return {Promise<SafeResult<SuggestionEntityDto, Error>>}
 */
export function replaceSuggestion(
    id,
    { date_from, date_to, from_employee_id, to_employee_id, to_learning_course_party, actual, learning_course }
) {
    return this.request(
        {
            action: ServiceAction.SUGGESTION_REPLACE_BY_ID,
            pathParams: { id },
            params: {
                date_from,
                date_to,
                from_employee_id,
                to_employee_id,
                to_learning_course_party,
                actual,
                learning_course
            }
        },
        SuggestionEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ????????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%80%D0%B5%D0%BA%D0%BE%D0%BC%D0%B5%D0%BD%D0%B4%D0%B0%D1%86%D0%B8%D1%8F%D0%BC%D0%B8%20(Suggestion)/deleteItemResource-suggestionentity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function deleteSuggestion(id) {
    return this.request({
        action: ServiceAction.SUGGESTION_DELETE_BY_ID,
        pathParams: { id }
    });
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ????????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%80%D0%B5%D0%BA%D0%BE%D0%BC%D0%B5%D0%BD%D0%B4%D0%B0%D1%86%D0%B8%D1%8F%D0%BC%D0%B8%20(Suggestion)/patchItemResource-suggestionentity-patch_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {number} from_employee_id
 * @param {number} to_employee_id
 * @param {LearningCoursePartyEntityDto} to_learning_course_party
 * @param {boolean} actual
 * @param {number} learning_course
 * @param {string} id
 *
 * @return {Promise<SafeResult<SuggestionEntityDto, Error>>}
 */
export function updateSuggestion(
    id,
    { date_from, date_to, from_employee_id, to_employee_id, to_learning_course_party, actual, learning_course }
) {
    return this.request(
        {
            action: ServiceAction.SUGGESTION_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                date_from,
                date_to,
                from_employee_id,
                to_employee_id,
                to_learning_course_party,
                actual,
                learning_course
            }
        },
        SuggestionEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????????? ???????????????????????? ???? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B7%D0%B0%D0%BF%D0%B8%D1%81%D1%8F%D0%BC%D0%B8%20%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D0%B5%D0%B9%20%D0%BD%D0%B0%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D1%8F%20(UserLearningCourse)/getCollectionResource-userlearningcourseentity-get_1_1
 *
 * @return {Promise<SafeResult<UserLearningCourseEntityDto[], Error>>}
 */
export function getUserLearningCourses() {
    return this.request(
        {
            action: ServiceAction.USER_LEARNING_COURSE_GET
        },
        UserLearningCourseEntityDto
    );
}

/**
 * @description ???????????????????? ????????????????: ???????????? ???????????????????????? ???? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B7%D0%B0%D0%BF%D0%B8%D1%81%D1%8F%D0%BC%D0%B8%20%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D0%B5%D0%B9%20%D0%BD%D0%B0%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D1%8F%20(UserLearningCourse)/postCollectionResource-userlearningcourseentity-post_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {number} user_id
 * @param {string} external_id
 * @param {string} learning_course
 * @param {Array} user_learning_course_steps
 * @param {boolean} actual
 *
 * @return {Promise<SafeResult<UserLearningCourseEntityDto, Error>>}
 */
export function createUserLearningCourse({
    date_from,
    date_to,
    user_id,
    external_id,
    learning_course,
    user_learning_course_steps,
    actual
}) {
    return this.request(
        {
            action: ServiceAction.USER_LEARNING_COURSE_CREATE,
            params: {
                date_from,
                date_to,
                user_id,
                external_id,
                learning_course,
                user_learning_course_steps,
                actual
            }
        },
        UserLearningCourseEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ?????????????????? ???? ?????????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B4%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D0%B0%D0%BC%D0%B8%20%D0%B7%D0%B0%20%D0%BF%D1%80%D0%BE%D1%85%D0%BE%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BA%D1%83%D1%80%D1%81%D0%BE%D0%B2%20%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8F%20(UserLearningCourseDocument)/getCollectionResource-userlearningcoursedocumententity-get_1_1
 *
 * @return {Promise<SafeResult<UserLearningCourseDocumentEntityDto[], Error>>}
 */
export function getUserLearningCourseDocuments() {
    return this.request(
        {
            action: ServiceAction.USER_LEARNING_COURSE_DOCUMENT_GET
        },
        UserLearningCourseDocumentEntityDto
    );
}

/**
 * @description ???????????????????? ????????????????: ?????????????????? ???? ?????????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B4%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D0%B0%D0%BC%D0%B8%20%D0%B7%D0%B0%20%D0%BF%D1%80%D0%BE%D1%85%D0%BE%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BA%D1%83%D1%80%D1%81%D0%BE%D0%B2%20%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8F%20(UserLearningCourseDocument)/postCollectionResource-userlearningcoursedocumententity-post_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} external_id
 * @param {string} number
 * @param {string} user_learning_course
 * @param {string} document_type
 * @param {boolean} actual
 *
 * @return {Promise<SafeResult<UserLearningCourseDocumentEntityDto, Error>>}
 */
export function createUserLearningCourseDocument({
    date_from,
    date_to,
    external_id,
    number,
    user_learning_course,
    document_type,
    actual
}) {
    return this.request(
        {
            action: ServiceAction.USER_LEARNING_COURSE_DOCUMENT_CREATE,
            params: {
                date_from,
                date_to,
                external_id,
                number,
                user_learning_course,
                document_type,
                actual
            }
        },
        UserLearningCourseDocumentEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ?????????????????? ???? ?????????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B4%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D0%B0%D0%BC%D0%B8%20%D0%B7%D0%B0%20%D0%BF%D1%80%D0%BE%D1%85%D0%BE%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BA%D1%83%D1%80%D1%81%D0%BE%D0%B2%20%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8F%20(UserLearningCourseDocument)/getItemResource-userlearningcoursedocumententity-get_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<UserLearningCourseDocumentEntityDto, Error>>}
 */
export function getUserLearningCourseDocumentById(id) {
    return this.request(
        {
            action: ServiceAction.USER_LEARNING_COURSE_DOCUMENT_GET_BY_ID,
            pathParams: { id }
        },
        UserLearningCourseDocumentEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????? ??????????????: ?????????????????? ???? ?????????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B4%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D0%B0%D0%BC%D0%B8%20%D0%B7%D0%B0%20%D0%BF%D1%80%D0%BE%D1%85%D0%BE%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BA%D1%83%D1%80%D1%81%D0%BE%D0%B2%20%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8F%20(UserLearningCourseDocument)/putItemResource-userlearningcoursedocumententity-put_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} external_id
 * @param {string} number
 * @param {string} user_learning_course
 * @param {string} document_type
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<UserLearningCourseDocumentEntityDto, Error>>}
 */
export function replaceUserLearningCourseDocument(
    id,
    { date_from, date_to, external_id, number, user_learning_course, document_type, actual }
) {
    return this.request(
        {
            action: ServiceAction.USER_LEARNING_COURSE_DOCUMENT_REPLACE_BY_ID,
            pathParams: { id },
            params: {
                date_from,
                date_to,
                external_id,
                number,
                user_learning_course,
                document_type,
                actual
            }
        },
        UserLearningCourseDocumentEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ?????????????????? ???? ?????????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B4%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D0%B0%D0%BC%D0%B8%20%D0%B7%D0%B0%20%D0%BF%D1%80%D0%BE%D1%85%D0%BE%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BA%D1%83%D1%80%D1%81%D0%BE%D0%B2%20%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8F%20(UserLearningCourseDocument)/deleteItemResource-userlearningcoursedocumententity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function deleteUserLearningCourseDocument(id) {
    return this.request(
        {
            action: ServiceAction.USER_LEARNING_COURSE_DOCUMENT_DELETE_BY_ID,
            pathParams: { id }
        },
        true
    );
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ?????????????????? ???? ?????????????????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B4%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D0%B0%D0%BC%D0%B8%20%D0%B7%D0%B0%20%D0%BF%D1%80%D0%BE%D1%85%D0%BE%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BA%D1%83%D1%80%D1%81%D0%BE%D0%B2%20%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8F%20(UserLearningCourseDocument)/patchItemResource-userlearningcoursedocumententity-patch_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} external_id
 * @param {string} number
 * @param {string} user_learning_course
 * @param {string} document_type
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<UserLearningCourseDocumentEntityDto, Error>>}
 */
export function updateUserLearningCourseDocument(
    id,
    { date_from, date_to, external_id, number, user_learning_course, document_type, actual }
) {
    return this.request(
        {
            action: ServiceAction.USER_LEARNING_COURSE_DOCUMENT_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                date_from,
                date_to,
                external_id,
                number,
                user_learning_course,
                document_type,
                actual
            }
        },
        UserLearningCourseDocumentEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ?????????????????? ?????????????????????????? ???????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D0%BE%D1%81%D0%B5%D1%89%D0%B5%D0%BD%D0%B8%D1%8F%D0%BC%D0%B8%20%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D0%B5%D0%B9%20%D0%BD%D0%B0%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B8%20(UserLearningCourseStep)/getCollectionResource-userlearningcoursestepentity-get_1_1
 *
 * @return {Promise<SafeResult<UserLearningCourseStepEntityDto[], Error>>}
 */
export function getUserLearningCourseSteps() {
    return this.request(
        {
            action: ServiceAction.USER_LEARNING_COURSE_STEP_GET
        },
        UserLearningCourseStepEntityDto
    );
}

/**
 * @description ???????????????????? ????????????????: ?????????????????? ?????????????????????????? ???????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D0%BE%D1%81%D0%B5%D1%89%D0%B5%D0%BD%D0%B8%D1%8F%D0%BC%D0%B8%20%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D0%B5%D0%B9%20%D0%BD%D0%B0%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B8%20(UserLearningCourseStep)/postCollectionResource-userlearningcoursestepentity-post_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} date_presence_plan
 * @param {string} date_presence_fact
 * @param {string} date_presence_refusal
 * @param {number} score
 * @param {boolean} actual
 * @param {number} learning_course_step
 * @param {number} user_learning_course
 *
 * @return {Promise<SafeResult<UserLearningCourseStepEntityDto, Error>>}
 */
export function createUserLearningCourseStep({
    date_from,
    date_to,
    date_presence_plan,
    date_presence_fact,
    date_presence_refusal,
    score,
    actual,
    learning_course_step,
    user_learning_course
}) {
    return this.request(
        {
            action: ServiceAction.USER_LEARNING_COURSE_STEP_CREATE,
            params: {
                date_from,
                date_to,
                date_presence_plan,
                date_presence_fact,
                date_presence_refusal,
                score,
                actual,
                learning_course_step,
                user_learning_course
            }
        },
        UserLearningCourseStepEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ?????????????????? ?????????????????????????? ???????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D0%BE%D1%81%D0%B5%D1%89%D0%B5%D0%BD%D0%B8%D1%8F%D0%BC%D0%B8%20%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D0%B5%D0%B9%20%D0%BD%D0%B0%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B8%20(UserLearningCourseStep)/getItemResource-userlearningcoursestepentity-get_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<UserLearningCourseStepEntityDto, Error>>}
 */
export function getUserLearningCourseStepById(id) {
    return this.request(
        {
            action: ServiceAction.USER_LEARNING_COURSE_STEP_GET_BY_ID,
            pathParams: { id }
        },
        UserLearningCourseStepEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????? ??????????????: ?????????????????? ?????????????????????????? ???????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D0%BE%D1%81%D0%B5%D1%89%D0%B5%D0%BD%D0%B8%D1%8F%D0%BC%D0%B8%20%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D0%B5%D0%B9%20%D0%BD%D0%B0%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B8%20(UserLearningCourseStep)/putItemResource-userlearningcoursestepentity-put_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} date_presence_plan
 * @param {string} date_presence_fact
 * @param {string} date_presence_refusal
 * @param {number} score
 * @param {boolean} actual
 * @param {number} learning_course_step
 * @param {number} user_learning_course
 * @param {string} id
 *
 * @return {Promise<SafeResult<UserLearningCourseStepEntityDto, Error>>}
 */
export function replaceUserLearningCourseStep(
    id,
    {
        date_from,
        date_to,
        date_presence_plan,
        date_presence_fact,
        date_presence_refusal,
        score,
        actual,
        learning_course_step,
        user_learning_course
    }
) {
    return this.request(
        {
            action: ServiceAction.USER_LEARNING_COURSE_STEP_REPLACE_BY_ID,
            pathParams: { id },
            params: {
                date_from,
                date_to,
                date_presence_plan,
                date_presence_fact,
                date_presence_refusal,
                score,
                actual,
                learning_course_step,
                user_learning_course
            }
        },
        UserLearningCourseStepEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ?????????????????? ?????????????????????????? ???????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D0%BE%D1%81%D0%B5%D1%89%D0%B5%D0%BD%D0%B8%D1%8F%D0%BC%D0%B8%20%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D0%B5%D0%B9%20%D0%BD%D0%B0%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B8%20(UserLearningCourseStep)/deleteItemResource-userlearningcoursestepentity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function deleteUserLearningCourseStep(id) {
    return this.request(
        {
            action: ServiceAction.USER_LEARNING_COURSE_STEP_DELETE_BY_ID,
            pathParams: { id }
        },
        true
    );
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ?????????????????? ?????????????????????????? ???????????? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D0%BE%D1%81%D0%B5%D1%89%D0%B5%D0%BD%D0%B8%D1%8F%D0%BC%D0%B8%20%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D0%B5%D0%B9%20%D0%BD%D0%B0%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B8%20(UserLearningCourseStep)/patchItemResource-userlearningcoursestepentity-patch_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {string} date_presence_plan
 * @param {string} date_presence_fact
 * @param {string} date_presence_refusal
 * @param {number} score
 * @param {boolean} actual
 * @param {number} learning_course_step
 * @param {number} user_learning_course
 * @param {string} id
 *
 * @return {Promise<SafeResult<UserLearningCourseStepEntityDto, Error>>}
 */
export function updateUserLearningCourseStep(
    id,
    {
        date_from,
        date_to,
        date_presence_plan,
        date_presence_fact,
        date_presence_refusal,
        score,
        actual,
        learning_course_step,
        user_learning_course
    }
) {
    return this.request(
        {
            action: ServiceAction.USER_LEARNING_COURSE_STEP_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                date_from,
                date_to,
                date_presence_plan,
                date_presence_fact,
                date_presence_refusal,
                score,
                actual,
                learning_course_step,
                user_learning_course
            }
        },
        UserLearningCourseStepEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????????? ?? ????????????????: ???????????? ???????????????????????? ???? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B7%D0%B0%D0%BF%D0%B8%D1%81%D1%8F%D0%BC%D0%B8%20%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D0%B5%D0%B9%20%D0%BD%D0%B0%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D1%8F%20(UserLearningCourse)/getItemResource-userlearningcourseentity-get_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<UserLearningCourseEntityDto, Error>>}
 */
export function getUserLearningCourseById(id) {
    return this.request(
        {
            action: ServiceAction.USER_LEARNING_COURSE_GET_BY_ID,
            pathParams: { id }
        },
        UserLearningCourseEntityDto
    );
}

/**
 * @description ?????????????????? ???????????????? ??????????????: ???????????? ???????????????????????? ???? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B7%D0%B0%D0%BF%D0%B8%D1%81%D1%8F%D0%BC%D0%B8%20%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D0%B5%D0%B9%20%D0%BD%D0%B0%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D1%8F%20(UserLearningCourse)/putItemResource-userlearningcourseentity-put_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {number} user_id
 * @param {string} external_id
 * @param {string} learning_course
 * @param {Array} user_learning_course_steps
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<UserLearningCourseEntityDto, Error>>}
 */
export function replaceUserLearningCourse(
    id,
    { date_from, date_to, user_id, external_id, learning_course, user_learning_course_steps, actual }
) {
    return this.request(
        {
            action: ServiceAction.USER_LEARNING_COURSE_REPLACE_BY_ID,
            pathParams: { id },
            params: {
                date_from,
                date_to,
                user_id,
                external_id,
                learning_course,
                user_learning_course_steps,
                actual
            }
        },
        UserLearningCourseEntityDto
    );
}

/**
 * @description ???????????????? (????????????????) ????????????????: ???????????? ???????????????????????? ???? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B7%D0%B0%D0%BF%D0%B8%D1%81%D1%8F%D0%BC%D0%B8%20%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D0%B5%D0%B9%20%D0%BD%D0%B0%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D1%8F%20(UserLearningCourse)/deleteItemResource-userlearningcourseentity-delete_1
 * @param {string} id
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function deleteUserLearningCourse(id) {
    return this.request(
        {
            action: ServiceAction.USER_LEARNING_COURSE_DELETE_BY_ID,
            pathParams: { id }
        },
        true
    );
}

/**
 * @description ?????????????????? ?????????????? ????????????????: ???????????? ???????????????????????? ???? ??????????????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B7%D0%B0%D0%BF%D0%B8%D1%81%D1%8F%D0%BC%D0%B8%20%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D0%B5%D0%B9%20%D0%BD%D0%B0%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D1%8F%20(UserLearningCourse)/patchItemResource-userlearningcourseentity-patch_1
 * @param {string} date_from
 * @param {string} date_to
 * @param {number} user_id
 * @param {string} external_id
 * @param {string} learning_course
 * @param {Array} user_learning_course_steps
 * @param {boolean} actual
 * @param {string} id
 *
 * @return {Promise<SafeResult<UserLearningCourseEntityDto, Error>>}
 */
export function updateUserLearningCourse(
    id,
    { date_from, date_to, user_id, external_id, learning_course, user_learning_course_steps, actual }
) {
    return this.request(
        {
            action: ServiceAction.USER_LEARNING_COURSE_UPDATE_BY_ID,
            pathParams: { id },
            params: {
                id,
                date_from,
                date_to,
                user_id,
                external_id,
                learning_course,
                user_learning_course_steps,
                actual
            }
        },
        UserLearningCourseEntityDto
    );
}

/**
 * @description undefined
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%9E%D0%BF%D0%B5%D1%80%D0%B0%D1%86%D0%B8%D0%B8%20%D1%81%20%D0%BF%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D1%89%D0%B8%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9/attachDegree_1
 * @param {number} studyProviderId
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
/*
export function replaceStudyProviderStudyDegree(studyProviderId) {
    return this.request({
        action: ServiceAction.STUDY_PROVIDER_STUDY_DEGREE_REPLACE_BY_STUDY_PROVIDER_ID_ALL,
        pathParams: { studyProviderId }
    });
}
*/

/**
 * @description undefined
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%9E%D0%BF%D0%B5%D1%80%D0%B0%D1%86%D0%B8%D0%B8%20%D1%81%20%D0%BF%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D1%89%D0%B8%D0%BA%D0%B0%D0%BC%D0%B8%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9/attachLegalEntityRestrictions_1
 * @param {number} studyProviderId
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function replaceStudyProviderLegalEntityRestriction(studyProviderId) {
    return this.request({
        action: ServiceAction.STUDY_PROVIDER_LEGAL_ENTITY_RESTRICTION_REPLACE_BY_STUDY_PROVIDER_ID_ALL,
        pathParams: { studyProviderId }
    });
}

/**
 * @description undefined
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%9E%D0%BF%D0%B5%D1%80%D0%B0%D1%86%D0%B8%D0%B8%20%D1%81%20%D0%B4%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D0%B0%D0%BC%D0%B8%20%D1%81%20%D0%BF%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D1%89%D0%B8%D0%BA%D0%BE%D0%BC%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9/attachContractSubject_1
 * @param {number} studyProviderContractId
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
/*
export function replaceStudyProviderContractContractSubject(studyProviderContractId) {
    return this.request({
        action: ServiceAction.STUDY_PROVIDER_CONTRACT_CONTRACT_SUBJECT_REPLACE_BY_STUDY_PROVIDER_CONTRACT_ID_ALL,
        pathParams: { study_provider_contract_id: studyProviderContractId }
    });
}
*/
/**
 * @description undefined
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%9E%D0%BF%D0%B5%D1%80%D0%B0%D1%86%D0%B8%D0%B8%20%D1%81%20%D0%BD%D0%B0%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D1%8F%D0%BC%D0%B8%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F/attachCompetence_1
 * @param {number} studyDirectionId
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function replaceStudyDirectionDevelopmentForm(studyDirectionId) {
    return this.request({
        action: ServiceAction.STUDY_DIRECTION_DEVELOPMENT_FORM_REPLACE_BY_STUDY_DIRECTION_ID_ALL,
        pathParams: { study_direction_id: studyDirectionId }
    });
}

/**
 * @description undefined
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%9E%D0%BF%D0%B5%D1%80%D0%B0%D1%86%D0%B8%D0%B8%20%D1%81%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%D0%B8%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D1%8F%D0%BC%D0%B8/attachParties_1
 * @param {number} learningCourseId
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function replaceLearningCourseLearningParty(learningCourseId) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_LEARNING_PARTY_REPLACE_BY_LEARNING_COURSE_ID,
            pathParams: { learningCourseId }
        },
        true
    );
}

/**
 * @description undefined
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%9E%D0%BF%D0%B5%D1%80%D0%B0%D1%86%D0%B8%D0%B8%20%D1%81%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%D0%B8%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D1%8F%D0%BC%D0%B8/attachCompetence_1_1
 * @param {number} learningCourseId
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function replaceLearningCourseCompetencies(learningCourseId) {
    return this.request({
        action: ServiceAction.LEARNING_COURSE_COMPETENCIES_REPLACE_BY_LEARNING_COURSE_ID_ALL,
        pathParams: { learningCourseId }
    });
}

/**
 * @description undefined
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%9E%D0%BF%D0%B5%D1%80%D0%B0%D1%86%D0%B8%D0%B8%20%D1%81%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%D0%B8%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D1%8F%D0%BC%D0%B8/refuseModulePresence_1
 * @param {number} learningCourseId
 * @param {number} userId
 * @param {number} stepId
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function createLearningCourseModulePresenceRefuse({ learningCourseId, userId, stepId }) {
    return this.request({
        action: ServiceAction.LEARNING_COURSE_MODULE_PRESENCE_REFUSE_CREATE,
        pathParams: { learning_course_id: learningCourseId },
        params: { user_id: userId, step_id: stepId }
    });
}

/**
 * @description undefined
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%9E%D0%BF%D0%B5%D1%80%D0%B0%D1%86%D0%B8%D0%B8%20%D1%81%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%D0%B8%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D1%8F%D0%BC%D0%B8/planModulePresence_1
 * @param {number} learningCourseId
 * @param {number} userId
 * @param {number} stepId
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function createLearningCourseModulePresencePlan({ learningCourseId, userId, stepId }) {
    return this.request({
        action: ServiceAction.LEARNING_COURSE_MODULE_PRESENCE_PLAN_CREATE,
        pathParams: { learning_course_id: learningCourseId },
        params: { user_id: userId, step_id: stepId }
    });
}

/**
 * @description undefined
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%9E%D0%BF%D0%B5%D1%80%D0%B0%D1%86%D0%B8%D0%B8%20%D1%81%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%D0%B8%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D1%8F%D0%BC%D0%B8/factModulePresence_1
 * @param {number} learningCourseId
 * @param {number} userId
 * @param {number} stepId
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function createLearningCourseModulePresenceFact({ learningCourseId, userId, stepId }) {
    return this.request({
        action: ServiceAction.LEARNING_COURSE_MODULE_PRESENCE_FACT_CREATE,
        pathParams: { learning_course_id: learningCourseId },
        params: { user_id: userId, step_id: stepId }
    });
}

/**
 * @description undefined
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%9E%D0%BF%D0%B5%D1%80%D0%B0%D1%86%D0%B8%D0%B8%20%D1%81%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%D0%B8%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D1%8F%D0%BC%D0%B8/addUserToLearningCourse_1
 * @param {number} learningCourseId
 * @param {number} userId
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function createLearningCourseAddUser({ learningCourseId, userId }) {
    return this.request({
        action: ServiceAction.LEARNING_COURSE_ADD_USER_CREATE,
        pathParams: { learning_course_id: learningCourseId },
        params: { user_id: userId }
    });
}

/**
 * @description undefined
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%9E%D0%BF%D0%B5%D1%80%D0%B0%D1%86%D0%B8%D0%B8%20%D1%81%20%D0%BC%D0%BE%D0%B4%D1%83%D0%BB%D1%8F%D0%BC%D0%B8%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D1%85%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B9/changeStepIndex_1
 * @param {number} stepId
 * @param {number} newIndex
 *
 * @return {Promise<SafeResult<LearningCourseStepEntityDto, Error>>}
 */
export function createLearningCourseStepChangeIndex({ stepId, newIndex }) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_STEP_CHANGE_INDEX_CREATE,
            pathParams: { step_id: stepId },
            params: { new_index: newIndex }
        },
        LearningCourseStepEntityDto
    );
}

/**
 * @description undefined
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%9E%D0%BF%D0%B5%D1%80%D0%B0%D1%86%D0%B8%D0%B8%20%D1%81%20%D0%B1%D1%8E%D0%B4%D0%B6%D0%B5%D1%82%D0%BE%D0%BC/copyBudget_1
 * @param {number} budgetId
 *
 * @return {Promise<SafeResult<BudgetEntityDto, Error>>}
 */
export function createBudgetCopy(budgetId) {
    return this.request(
        {
            action: ServiceAction.BUDGET_COPY_CREATE_BY_BUDGET_ID_ALL,
            pathParams: { budget_id: budgetId }
        },
        BudgetEntityDto
    );
}

/**
 * @description undefined
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%9E%D0%BF%D0%B5%D1%80%D0%B0%D1%86%D0%B8%D0%B8%20%D1%81%20%D0%B1%D1%8E%D0%B4%D0%B6%D0%B5%D1%82%D0%BE%D0%BC/confirmBudget_1
 * @param {number} budgetId
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function createBudgetConfirm(budgetId) {
    return this.request({
        action: ServiceAction.BUDGET_CONFIRM_CREATE_BY_BUDGET_ID_ALL,
        pathParams: { budget_id: budgetId }
    });
}

/**
 * @description undefined
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B4%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D0%B0%D0%BC%D0%B8%20%D0%B7%D0%B0%20%D0%BF%D1%80%D0%BE%D1%85%D0%BE%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BA%D1%83%D1%80%D1%81%D0%BE%D0%B2%20%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8F%20(UserLearningCourseDocument)/findDocuments_1
 * @param {boolean} isMandatory
 * @param {string} actualFrom
 * @param {string} actualTo
 * @param {string} dateToFrom
 * @param {string} dateToTo
 *
 * @return {Promise<SafeResult<UserLearningCourseDocumentEntityDto[], Error>>}
 */
export function getUserLearningCourseDocumentsByFilter({ isMandatory, actualFrom, actualTo, dateToFrom, dateToTo }) {
    return this.request(
        {
            action: ServiceAction.USER_LEARNING_COURSE_DOCUMENT_SEARCH_FIND_BY_DATES_GET,
            params: {
                is_mandatory: isMandatory,
                actual_from: actualFrom,
                actual_to: actualTo,
                date_to_from: dateToFrom,
                date_to_to: dateToTo
            }
        },
        UserLearningCourseDocumentEntityDto
    );
}

/**
 * @description undefined
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%80%D0%B5%D0%BA%D0%BE%D0%BC%D0%B5%D0%BD%D0%B4%D0%B0%D1%86%D0%B8%D1%8F%D0%BC%D0%B8%20(Suggestion)/findSuggestions_1
 * @param {number} fromEmployeeId
 * @param {number} toEmployeeId
 * @param {number} toLearningPartyId
 * @param {number} learningCourseId
 *
 * @return {Promise<SafeResult<SuggestionEntityDto[], Error>>}
 */
export function getSuggestionsByFilter({ fromEmployeeId, toEmployeeId, toLearningPartyId, learningCourseId }) {
    return this.request(
        {
            action: ServiceAction.SUGGESTION_SEARCH_FIND_GET,
            params: {
                from_employee_id: fromEmployeeId,
                to_employee_id: toEmployeeId,
                to_learning_party_id: toLearningPartyId,
                learning_course_id: learningCourseId
            }
        },
        SuggestionEntityDto
    );
}

/**
 * @description undefined
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BA%D0%B0%D1%82%D0%B0%D0%BB%D0%BE%D0%B3%D0%B0%D0%BC%D0%B8%20%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20(LearningProgramCatalog)/findAllwithMemberCount_1
 * @param {Array} id
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function getLearningProgramCatalogSearchFindById(id) {
    return this.request({
        action: ServiceAction.LEARNING_PROGRAM_CATALOG_SEARCH_FIND_GET_BY_ID,
        params: { id }
    });
}

/**
 * @description undefined
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BA%D0%B0%D1%82%D0%B0%D0%BB%D0%BE%D0%B3%D0%B0%D0%BC%D0%B8%20%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20(LearningProgramCatalog)/getByName_1
 * @param {string} name
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function getLearningProgramCatalogSearchFindByName(name) {
    return this.request({
        action: ServiceAction.LEARNING_PROGRAM_CATALOG_SEARCH_FIND_BY_NAME_GET_BY_NAME_ALL,
        params: { name }
    });
}

/**
 * @description undefined
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%9E%D0%BF%D0%B5%D1%80%D0%B0%D1%86%D0%B8%D0%B8%20%D1%81%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%D0%B8%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D1%8F%D0%BC%D0%B8/getAllLearningCourses_1
 * @param {Array} competenceId
 * @param {Array} learningCourseTypeId
 * @param {Array} studyProviderId
 * @param {Array} studyExpertId
 * @param {string} startingFrom
 * @param {string} startingTo
 * @param {number} durationDaysFrom
 * @param {number} durationDaysTo
 * @param {undefined} p
 *
 * @return {Promise<SafeResult<PageLearningCourseEntityDto, Error>>}
 */
export function getLearningCourseSearchAll({
    competenceId,
    learningCourseTypeId,
    studyProviderId,
    studyExpertId,
    startingFrom,
    startingTo,
    durationDaysFrom,
    durationDaysTo,
    p
}) {
    return this.request(
        {
            action: ServiceAction.LEARNING_COURSE_SEARCH_ALL_GET,
            params: {
                competence_id: competenceId,
                learning_course_type_id: learningCourseTypeId,
                study_provider_id: studyProviderId,
                study_expert_id: studyExpertId,
                starting_from: startingFrom,
                starting_to: startingTo,
                duration_days_from: durationDaysFrom,
                duration_days_to: durationDaysTo,
                p
            }
        },
        PageLearningCourseEntityDto
    );
}

/**
 * @description undefined
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BA%D0%B0%D1%82%D0%B0%D0%BB%D0%BE%D0%B3%D0%B0%D0%BC%D0%B8%20%D0%BA%D1%83%D1%80%D1%81%D0%BE%D0%B2%20(LearningCourseCatalog)/findAllwithMemberCount_1_1
 * @param {Array} id
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function getLearningCourseCatalogSearchFindById(id) {
    return this.request({
        action: ServiceAction.LEARNING_COURSE_CATALOG_SEARCH_FIND_GET_BY_ID,
        params: { id }
    });
}

/**
 * @description undefined
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BA%D0%B0%D1%82%D0%B0%D0%BB%D0%BE%D0%B3%D0%B0%D0%BC%D0%B8%20%D0%BA%D1%83%D1%80%D1%81%D0%BE%D0%B2%20(LearningCourseCatalog)/getByName_1_1
 * @param {string} name
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function getLearningCourseCatalogSearchFindByName(name) {
    return this.request({
        action: ServiceAction.LEARNING_COURSE_CATALOG_SEARCH_FIND_BY_NAME_GET_BY_NAME_ALL,
        params: { name }
    });
}

/**
 * @description undefined
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%9E%D0%BF%D0%B5%D1%80%D0%B0%D1%86%D0%B8%D0%B8%20%D1%81%20%D0%BD%D1%83%D0%BC%D0%B5%D1%80%D0%B0%D1%82%D0%BE%D1%80%D0%B0%D0%BC%D0%B8/nextNumber_1
 * @param {number} numeratorId
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function createNextNumber(numeratorId) {
    return this.request({
        action: ServiceAction.NEXT_NUMBER_CREATE_BY_NUMERATOR_ID_ALL,
        pathParams: { numerator_id: numeratorId }
    });
}

/**
 * @description ????????-???????????? ?????????? ?????????????? ???? ???????????? GET /api/utils/import-study-degrees-from-xls/template
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%97%D0%B0%D0%B3%D1%80%D1%83%D0%B7%D0%BA%D0%B0%20%D0%B8%D0%B7%20XLS/importStudyDegreeFromXls_1
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function createUtilsImportStudyDegreesFromXls() {
    return this.request({
        action: ServiceAction.UTILS_IMPORT_STUDY_DEGREES_FROM_XLS_CREATE
    });
}

/**
 * @description ????????-???????????? ?????????? ?????????????? ???? ???????????? GET /api/utils/import-learning-courses-from-xls/template
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%97%D0%B0%D0%B3%D1%80%D1%83%D0%B7%D0%BA%D0%B0%20%D0%B8%D0%B7%20XLS/importLearningCoursesFromXls_1
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function createUtilsImportLearningCoursesFromXls() {
    return this.request({
        action: ServiceAction.UTILS_IMPORT_LEARNING_COURSES_FROM_XLS_CREATE
    });
}

/**
 * @description undefined
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%97%D0%B0%D0%B3%D1%80%D1%83%D0%B7%D0%BA%D0%B0%20%D0%B8%D0%B7%20XLS/importLearningCoursesFromPreview_1
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function createUtilsImportLearningCoursesFromPreview() {
    return this.request({
        action: ServiceAction.UTILS_IMPORT_LEARNING_COURSES_FROM_PREVIEW_CREATE
    });
}

/**
 * @description ????????-???????????? ?????????? ?????????????? ???? ???????????? GET /api/utils/import-education-from-xls/template
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%97%D0%B0%D0%B3%D1%80%D1%83%D0%B7%D0%BA%D0%B0%20%D0%B8%D0%B7%20XLS/importEducationFromXls_1
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function createUtilsImportEducationFromXls() {
    return this.request({
        action: ServiceAction.UTILS_IMPORT_EDUCATION_FROM_XLS_CREATE
    });
}

/**
 * @description ????????-???????????? ?????????? ?????????????? ???? ???????????? GET /api/utils/import-learning-courses-from-xls/template
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%97%D0%B0%D0%B3%D1%80%D1%83%D0%B7%D0%BA%D0%B0%20%D0%B8%D0%B7%20XLS/getLearningCoursesPreviewFromXls_1
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function createUtilsGetLearningCoursesPreviewFromXls() {
    return this.request({
        action: ServiceAction.UTILS_GET_LEARNING_COURSES_PREVIEW_FROM_XLS_CREATE
    });
}

/**
 * @description undefined
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%97%D0%B0%D0%B3%D1%80%D1%83%D0%B7%D0%BA%D0%B0%20%D0%B8%D0%B7%20XLS/importStudyDegreeFromXlsTemplate_1
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function getUtilsImportStudyDegreesFromXlsTemplate() {
    return this.request({
        action: ServiceAction.UTILS_IMPORT_STUDY_DEGREES_FROM_XLS_TEMPLATE_GET
    });
}

/**
 * @description undefined
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%97%D0%B0%D0%B3%D1%80%D1%83%D0%B7%D0%BA%D0%B0%20%D0%B8%D0%B7%20XLS/importLearningCoursesFromXlsTemplate_1
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function getUtilsImportLearningCoursesFromXlsTemplate() {
    return this.request({
        action: ServiceAction.UTILS_IMPORT_LEARNING_COURSES_FROM_XLS_TEMPLATE_GET
    });
}

/**
 * @description undefined
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%97%D0%B0%D0%B3%D1%80%D1%83%D0%B7%D0%BA%D0%B0%20%D0%B8%D0%B7%20XLS/importEducationFromXlsTemplate_1
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function getUtilsImportEducationFromXlsTemplate() {
    return this.request({
        action: ServiceAction.UTILS_IMPORT_EDUCATION_FROM_XLS_TEMPLATE_GET
    });
}

/**
 * @description undefined
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A1%D0%B5%D1%80%D0%B2%D0%B8%D1%81%D0%BD%D0%B0%D1%8F%20%D0%B8%D0%BD%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D1%86%D0%B8%D1%8F/get_1
 *
 * @return {Promise<SafeResult<InfoDtoDto, Error>>}
 */
export function getInfo() {
    return this.request(
        {
            action: ServiceAction.INFO_GET
        },
        InfoDtoDto
    );
}

/**
 * @description undefined
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A1%D0%B5%D1%80%D0%B2%D0%B8%D1%81%D0%BD%D0%B0%D1%8F%20%D0%B8%D0%BD%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D1%86%D0%B8%D1%8F/getMe_1
 *
 * @return {Promise<SafeResult<unknown, Error>>}
 */
export function getInfoMe() {
    return this.request({
        action: ServiceAction.INFO_ME_GET
    });
}

/**
 * @description ?????????????????? ???????????????????? ?? ??????????????????: ???????????????? ?????????????????? ?? ?????????????? ????????????
 * @link https://goodt-dev.goodt.me:8466/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0%D1%8E%D1%89%D0%B8%D0%BC%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B5%D0%BC%20(LearningCourse)/followPropertyReference-learningcourseentity-get_7_1
 *
 * @param {string|number} learningCourseId
 * @param {string|number|undefined} [studyExpertId]
 *
 * @return {Promise<SafeResult<LearningCourseStudyExpertBindingDto[], Error>>}
 */
export function getLearningCourseStudyExpertBindings(learningCourseId, studyExpertId) {
    const requestDescriptor =
        studyExpertId != null
            ? {
                  action: ServiceAction.LEARNING_COURSE_TO_STUDY_EXPERT_BINDING_GET_BY_FILTER,
                  pathParams: { learningCourseId, studyExpertId }
              }
            : {
                  action: ServiceAction.LEARNING_COURSE_TO_STUDY_EXPERT_BINDING_GET_ALL,
                  pathParams: { learningCourseId }
              };

    return this.request(requestDescriptor, LearningCourseStudyExpertBindingDto);
}

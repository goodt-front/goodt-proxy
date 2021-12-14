/**
 * @typeof {import('@goodt-common/infra/BaseDto').BaseDto} BaseDto
 */
import { success } from '@goodt-common/utils';
import { applyConstructorOrFactory, BaseDto, buildDtoSafeResult } from '@goodt-common/infra';

/**
 * @template {T} safeResult
 * @param {SafeResult} safeResult
 * @param {import('./utils').DtoConstructorOrFactory} [DtoConstructorOrFactory=BaseDto]
 * @param {import('./utils').ProcessRequestResultOptions} options
 * @return {SafeResult<T, Error>}
 */
export const processRequestResult = (
    safeResult,
    DtoConstructorOrFactory = BaseDto,
    { resultTransformer = (x) => x } = {}
) => {
    const { isError, result } = safeResult;

    if (isError) {
        return safeResult;
    }

    const dtoJson = resultTransformer(result);
    if (BaseDto.isPrototypeOf(DtoConstructorOrFactory)) {
        return buildDtoSafeResult(DtoConstructorOrFactory, dtoJson);
    }
    if (typeof DtoConstructorOrFactory !== 'function') {
        return success(dtoJson);
    }
    return success(applyConstructorOrFactory(DtoConstructorOrFactory, dtoJson));
};

/**
 *
 * @param {LearningCourseApiService} service
 * @param {Record<string, Function>} extensionsDescriptor
 * @return {*}
 */
export function useExtensions(service, extensionsDescriptor) {
    // eslint-disable-next-line
    return Object.assign(service, extensionsDescriptor);
}

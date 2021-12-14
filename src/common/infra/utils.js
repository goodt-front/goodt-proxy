import { success, fail } from '@goodt-common/utils';
import { throwUncaughtError } from '@goodt-common/errors';

/**
 * @param {function} mapper
 * @param {any} value
 * @throws {Error}
 * @return {any|any[]}
 */
const applyMapper = (mapper, value) => (Array.isArray(value) ? value.map(mapper) : mapper(value));

/**
 *
 * @param {function} ConstructorOrFactory
 * @param {any} value
 * @return {any|any[]}
 */
export const applyConstructorOrFactory = (ConstructorOrFactory, value) => {
    try {
        return applyMapper((json) => new ConstructorOrFactory(json), value);
    } catch {
        return applyMapper(ConstructorOrFactory, value);
    }
}


/**
 *
 * @param {import('./BaseDto').BaseDto.constructor} DtoConstructor
 * @param {DtoJson|DtoJson[]} dtoJson
 * @return {import('@goodt-common/utils').SafeResult<BaseDto|BaseDto[], Error>}
 */
export const buildDtoSafeResult = (DtoConstructor, dtoJson) => {
    try {
        return success(applyMapper((json) => new DtoConstructor(json), dtoJson));
    } catch (error) {
        throwUncaughtError(error, buildDtoSafeResult);
        return fail(error);
    }
};

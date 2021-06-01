import { success, fail, SafeResult } from '@goodt/common/utils/either';
import { throwUncaughtError } from '@goodt/common/errors/utils';

/**
 *
 * @param {ObjectConstructor} DtoConstructor
 * @param {DtoJson} dtoJson
 * @return {SafeResult}
 */
export const buildDtoSafeResult = (DtoConstructor, dtoJson) => {
    try {
        const dto = new DtoConstructor(dtoJson);
        return success(dto);
    } catch (error) {
        throwUncaughtError(error, buildDtoSafeResult);
        return fail(error);
    }
};

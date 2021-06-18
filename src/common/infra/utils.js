import { success, fail, SafeResult } from '@goodt/common/utils/either';
import { throwUncaughtError } from '@goodt/common/errors/utils';

/**
 *
 * @param {import('./BaseDto').BaseDto.constructor} DtoConstructor
 * @param {DtoJson|DtoJson[]} dtoJson
 * @return {SafeResult<BaseDto|BaseDto[], Error>}
 */
export const buildDtoSafeResult = (DtoConstructor, dtoJson) => {
    try {
        if (Array.isArray(dtoJson)) {
            const dtoList = dtoJson.map((json) => new DtoConstructor(json));
            return success(dtoList);
        }
        const dto = new DtoConstructor(dtoJson);
        return success(dto);
    } catch (error) {
        throwUncaughtError(error, buildDtoSafeResult);
        return fail(error);
    }
};

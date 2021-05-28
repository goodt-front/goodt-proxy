import { success, fail } from '@/common/utils/either';
import { throwUncaughtError } from '@/common/errors/utils';

export const buildDtoSafeResult = (DtoConstructor, dtoJson) => {
    try {
        const dto = new DtoConstructor(dtoJson);
        return success(dto);
    } catch (error) {
        throwUncaughtError(error, buildDtoSafeResult);
        return fail(error);
    }
};

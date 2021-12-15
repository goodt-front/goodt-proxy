import { SafeResult } from '@goodt-common/utils';
import { BaseDto, DtoJson } from './BaseDto';

/**
 *
 * @template T
 * @param {T} DtoConstructor
 * @param {DtoJson|DtoJson[]} dtoJson
 * @return {SafeResult<InstanceType<T>, Error>}
 */
export function buildDtoSafeResult<T extends ObjectConstructor = typeof BaseDto.constructor>(
    DtoConstructor: T,
    dtoJson: DtoJson | DtoJson[]
): SafeResult<InstanceType<T>, Error>;

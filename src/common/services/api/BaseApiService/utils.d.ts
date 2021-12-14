import { SafeResult } from '@goodt-common/utils';
import { BaseDto } from '@goodt-common/infra';
import { IApiService } from '../types';

export type DtoConstructorOrFactory =
    | typeof BaseDto
    | ObjectConstructor
    | FunctionConstructor
    | ((...args: any[]) => any);

export type ProcessRequestResultOptions<R> = {
    resultTransformer?: (result: R) => any;
};

/**
 *
 * @param {function(...args?: any[]): any} [DtoConstructorOrFactory=BaseDto]
 * @param {SafeResult<any, Error>>} safeResult
 * @param [options]
 * @return {}
 */
export function processRequestResult<R = any, T = DtoConstructorOrFactory>(
    safeResult: SafeResult<R, Error>,
    DtoConstructorOrFactory: T,
    options?: ProcessRequestResultOptions<R>
): SafeResult<T, Error>;

/**
 * @template {S}
 * @template {E}
 * @param {S} service
 * @param {E} extensionsDescriptor
 * @return {S & E}
 */
export function useExtensions<S extends IApiService, E = Record<string, Function>>(
    service: S,
    extensionsDescriptor: E
): S & E;

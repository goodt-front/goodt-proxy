import { BaseError } from '@/common/errors/BaseError';

export const InfrastructureExceptionTypes = Object.freeze({
    ABSTRACT_INVOKE: ''
});

export class InfrastructureException extends BaseError {}

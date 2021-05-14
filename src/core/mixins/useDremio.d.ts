import { IDremioMixinInstance } from '../dremio/mixin';

export * from '../dremio/mixin';

/**
 * Simple dremio mixin wrapper for api consistency & backward compatibility
 */
export function useDremio(): { mixin: IDremioMixinInstance };

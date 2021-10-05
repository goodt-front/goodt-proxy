/**
 * Apollo cache create and initialize
 */
import { InMemoryCache } from '@apollo/client/cache';
import { InvalidationPolicyCache } from 'apollo-invalidation-policies';

/**
 *
 * @param {Function} cache
 * @return {InMemoryCache|InvalidationPolicyCache}
 */
export const createCache = ({ cache = {} }) => {
    const { invalidationPolicies, typePolicies } = cache;
    if (invalidationPolicies) {
        return new InvalidationPolicyCache({
            typePolicies,
            invalidationPolicies
        });
    }

    return new InMemoryCache({
        typePolicies
    });
};

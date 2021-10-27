const SCHEMA_DELIMITER = '://';

/**
 * @param {string} source
 * @param {string} [replaceLeading='']
 * @param {string} [replaceTrailing='']
 * @return {*}
 */
const trimSlashes = (source, replaceLeading = '', replaceTrailing = '') => {
    return source.replace(/^\/+/, replaceLeading).replace(/\/+$/, replaceTrailing);
};

/**
 * Join url path parts resolving leading and trailing slashes problem
 *
 * @param {string} args
 * @return {string}
 */
export const joinPathParts = (...args) => {
    const [base, ...rest] = args;

    // реализация совпадающая с node path.join() по поведению
    const join = (...parts) => {
        const joinedPath = [];
        const [first, ...restParts] = parts;
        const [last] = restParts.splice(-1);

        if (first != null) {
            joinedPath.push(trimSlashes(first, '/'));
        }
        if (restParts.length > 0) {
            joinedPath.push(...restParts.map((part) => trimSlashes(part)));
        }
        if (last != null) {
            joinedPath.push(trimSlashes(last, '', '/'));
        }

        return joinedPath.join('/');
    };

    if (base.includes(SCHEMA_DELIMITER)) {
        const [protocol, restUrlPart] = base.split(SCHEMA_DELIMITER);
        return [protocol, join(restUrlPart, ...rest)].join(SCHEMA_DELIMITER);
    }

    return join(...args);
};

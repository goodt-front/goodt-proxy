const SCHEMA_DELIMITER = '://';

/**
 * Join url path parts resolving leading and trailing slashes problem
 *
 * @param {string[]} args
 * @return {string|*}
 */
export const joinPathParts = (...args) => {
    const [base, ...rest] = args;
    const join = (...jargs) => jargs.map((str) => str.replace(/^\//, '').replace(/\/$/, '')).join('/');

    if (base.includes(SCHEMA_DELIMITER)) {
        const [protocol, restUrlPart] = base.split(SCHEMA_DELIMITER);
        return [protocol, join(restUrlPart, ...rest)].join(SCHEMA_DELIMITER);
    }

    return join(...args);
};

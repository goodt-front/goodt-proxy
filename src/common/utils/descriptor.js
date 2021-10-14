/**
 * @param {Record<string, any>} descriptor
 * @param {string} propName
 * @param {Record<string, any>} [options] // for future use
 * @return {Record<string, any>}
 */
export const extractDescriptorPropMeta = (descriptor, propName, options) => descriptor.props[propName];

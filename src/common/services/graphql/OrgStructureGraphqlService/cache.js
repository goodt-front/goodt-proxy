const EMPLOYEE_TYPE = 'EmployeeDto';
const EMPLOYEE_LIST_TYPE = 'EmployeeList';
const EMPLOYEE_CREATE_TYPE = 'EmployeeCreateResult';
const EMPLOYEE_DELETE_TYPE = 'EmployeeDeleteResult';

const getHash = (input) =>
    input.split('').reduce((accum, b) => {
        // eslint-disable-next-line no-bitwise
        const next = (accum << 5) - accum + b.charCodeAt(0);
        // eslint-disable-next-line no-bitwise
        return next & next;
    }, 0);

export const cache = {
    typePolicies: {
        [EMPLOYEE_LIST_TYPE]: {
            keyFields: (data) => {
                const { list } = data;
                const ids = list
                    .map(({ id }) => Number(id))
                    .sort()
                    .join(':');

                return `${EMPLOYEE_LIST_TYPE}:${getHash(ids)}`;
            }
        }
    },

    invalidationPolicies: {
        timeToLive: 600 * 1000,
        types: {
            // Удаление Employee
            [EMPLOYEE_DELETE_TYPE]: {
                onWrite: {
                    [EMPLOYEE_DELETE_TYPE]: ({ evict }, { parent: { id: parentId } }) => {
                        // выкинуть конкретный удаляемый объект по id
                        evict({
                            id: parentId,
                            broadcast: true
                        });
                        evict({
                            id: parentId.replace(EMPLOYEE_DELETE_TYPE, EMPLOYEE_TYPE),
                            broadcast: true
                        });
                    }
                }
            },
            // Создание Create
            [EMPLOYEE_CREATE_TYPE]: {
                onWrite: {
                    [EMPLOYEE_LIST_TYPE]: ({ evict }, { id }) => {
                        // выкинуть все объекты типа EMPLOYEE_LIST_TYPE
                        evict({
                            id,
                            broadcast: true
                        });
                    },
                    [EMPLOYEE_CREATE_TYPE]: ({ evict }, { id }) => {
                        evict({
                            id,
                            broadcast: true
                        });
                    }
                }
            },
            //
            [EMPLOYEE_LIST_TYPE]: {
                onEvict: {
                    __default: (_cacheOperations, { id }) => {
                        // Объекты какого типа ещё выкинуть,
                        // когда выкидывается EMPLOYEE_LIST
                    }
                }
            },
            //
            [EMPLOYEE_TYPE]: {
                onEvict: {
                    __default: ({ evict }, { id }) => {
                        // Объекты какого типа ещё выкинуть,
                        // когда выкидывается EMPLOYEE_TYPE
                    }
                }
            }
        }
    }
};

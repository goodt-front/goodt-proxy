export const ServiceAction = {
    GET_TASK_TREES: {
        url: 'task/trees/',
        resultTransformer: (result) => result.flatMap(({ tree }) => tree)
    },
    GET_TASK_LINKLIST: { url: 'task/linklist' },
    GET_TASK_INFO: { url: 'task/info' }
};

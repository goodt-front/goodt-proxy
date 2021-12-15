//import { success } from '@goodt-common/utils';
import { BaseApiService, buildRequest, processRequestResult } from '@goodt-common/api';
import { TaskDto } from './dto';
import { ServiceAction } from './config';

/**
 *
 */
export class TaskSettingsApiService extends BaseApiService {
    /**
     *
     * @param {number|number[]} userIds
     * @param {number} typeId
     * @return {Promise<SafeResult<UserTaskTreeDto[], Error>>}
     */
    getUserTaskTrees(userIds, typeId) {
        const request = buildRequest({
            action: ServiceAction.GET_TASK_TREES,
            params: {
                type: typeId,
                users: userIds
            }
        });

        return this.request(request);
    }

    /**
     *
     * @param {number} userId
     * @param {number} typeId
     * @return {Promise<SafeResult<TaskDto[], Error>>}
     */
    async getTaskTree(userId, typeId) {
        const request = buildRequest({
            action: ServiceAction.GET_TASK_TREES,
            params: {
                type: typeId,
                users: userId
            }
        });

        const safeResult = await this.request(request);
        const resultTransformer = (result) => result.flatMap(({ tree }) => tree);

        return processRequestResult(safeResult, TaskDto, { resultTransformer });
    }

    /**
     *
     * @param {number|number[]} userIds
     * @param {number} linkTypeId
     * @return {Promise<SafeResult<TaskLinkDto[], Error>>}
     */
    getTaskLinks(userIds, linkTypeId) {
        const request = buildRequest({
            action: ServiceAction.GET_TASK_LINKLIST,
            params: {
                users: userIds,
                task_link_type_id: linkTypeId
            }
        });

        return this.request(request);
    }

    /**
     *
     * @param {number} taskId
     * @return {Promise<SafeResult<TaskDto, Error>>}
     */
    getTaskById(taskId) {
        const request = buildRequest({
            action: ServiceAction.GET_TASK_INFO,
            params: {
                id: taskId
            }
        });

        return this.request(request);
    }
}

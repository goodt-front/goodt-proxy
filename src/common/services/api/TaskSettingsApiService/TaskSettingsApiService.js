//import { success } from '@goodt-common/utils';
import { BaseApiService, buildRequest, processRequestResult } from '@goodt-common/api';
import { TaskDto, TaskLinkDto, UserTaskTreeDto } from './dto';
import { ServiceAction } from './config';

/**
 *
 */
export class TaskSettingsApiService extends BaseApiService {
    /**
     *
     * @param {IApiServiceRequestOptions} request
     * @param [DtoConstructor]
     * @param [processOptions]
     * @return {Promise<SafeResult<*, Error>>}
     */
    async request(request, DtoConstructor, processOptions) {
        return processRequestResult(await super.request(buildRequest(request)), DtoConstructor, processOptions);
    }

    /**
     * Получение списка сущностей "пользовательское дерево задач" для списка заданных идентификаторов
     * пользователей и заданного типа задачи
     *
     * @param {number|number[]} userIds
     * @param {number} typeId
     * @return {Promise<SafeResult<UserTaskTreeDto[], Error>>}
     */
    getUserTaskTrees(userIds, typeId) {
        // prettier-ignore
        return this.request({
            action: ServiceAction.GET_TASK_TREES,
            params: {
                type: typeId,
                users: userIds
            }
        }, UserTaskTreeDto);
    }

    /**
     * Получение списка сущностей "задача" (одного "дерева" задач) для заданного пользователя
     * и заданного типа задачи
     *
     * @param {number} userId
     * @param {number} typeId
     * @return {Promise<SafeResult<TaskDto[], Error>>}
     */
    async getTaskTree(userId, typeId) {
        // prettier-ignore
        return this.request({
            action: ServiceAction.GET_TASK_TREES,
            params: {
                type: typeId,
                users: userId
            }
        },
        TaskDto,
        { resultTransformer: ServiceAction.GET_TASK_TREES.resultTransformer });
    }

    /**
     *
     * @param {number|number[]} userIds
     * @param {number} linkTypeId
     * @return {Promise<SafeResult<TaskLinkDto[], Error>>}
     */
    async getTaskLinks(userIds, linkTypeId) {
        // prettier-ignore
        return this.request({
            action: ServiceAction.GET_TASK_LINKLIST,
            params: {
                users: userIds,
                task_link_type_id: linkTypeId
            }
        }, TaskLinkDto);
    }

    /**
     * Получение сущности "задача" по её идентификатору
     *
     * @param {number} taskId
     * @return {Promise<SafeResult<TaskDto, Error>>}
     */
    async getTaskById(taskId) {
        // prettier-ignore
        return this.request({
            action: ServiceAction.GET_TASK_INFO,
            params: {
                id: taskId
            }
        }, TaskDto);
    }
}

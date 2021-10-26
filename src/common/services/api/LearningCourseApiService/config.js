export const ServiceAction = {
    BUDGET_GET: { url: 'budget' },
    BUDGET_CREATE: { url: 'budget', options: { method: 'post' } },
    BUDGET_DATA_GET: { url: 'budget-data' },
    BUDGET_DATA_CREATE: { url: 'budget-data', options: { method: 'post' } },
    BUDGET_DATA_GET_BY_ID: { url: 'budget-data/:id' },
    BUDGET_DATA_REPLACE_BY_ID: { url: 'budget-data/:id', options: { method: 'put' } },
    BUDGET_DATA_DELETE_BY_ID: { url: 'budget-data/:id', options: { method: 'delete' } },
    BUDGET_DATA_UPDATE_BY_ID: { url: 'budget-data/:id', options: { method: 'patch' } },
    BUDGET_ITEM_GET: { url: 'budget-item' },
    BUDGET_ITEM_CREATE: { url: 'budget-item', options: { method: 'post' } },
    BUDGET_ITEM_GROUP_GET: { url: 'budget-item-group' },
    BUDGET_ITEM_GROUP_CREATE: { url: 'budget-item-group', options: { method: 'post' } },
    BUDGET_ITEM_GROUP_GET_BY_ID: { url: 'budget-item-group/:id' },
    BUDGET_ITEM_GROUP_REPLACE_BY_ID: { url: 'budget-item-group/:id', options: { method: 'put' } },
    BUDGET_ITEM_GROUP_DELETE_BY_ID: { url: 'budget-item-group/:id', options: { method: 'delete' } },
    BUDGET_ITEM_GROUP_UPDATE_BY_ID: { url: 'budget-item-group/:id', options: { method: 'patch' } },
    BUDGET_ITEM_GET_BY_ID: { url: 'budget-item/:id' },
    BUDGET_ITEM_REPLACE_BY_ID: { url: 'budget-item/:id', options: { method: 'put' } },
    BUDGET_ITEM_DELETE_BY_ID: { url: 'budget-item/:id', options: { method: 'delete' } },
    BUDGET_ITEM_UPDATE_BY_ID: { url: 'budget-item/:id', options: { method: 'patch' } },
    BUDGET_SOURCE_GET: { url: 'budget-source' },
    BUDGET_SOURCE_CREATE: { url: 'budget-source', options: { method: 'post' } },
    BUDGET_SOURCE_GET_BY_ID: { url: 'budget-source/:id' },
    BUDGET_SOURCE_REPLACE_BY_ID: { url: 'budget-source/:id', options: { method: 'put' } },
    BUDGET_SOURCE_DELETE_BY_ID: { url: 'budget-source/:id', options: { method: 'delete' } },
    BUDGET_SOURCE_UPDATE_BY_ID: { url: 'budget-source/:id', options: { method: 'patch' } },
    BUDGET_GET_BY_ID: { url: 'budget/:id' },
    BUDGET_REPLACE_BY_ID: { url: 'budget/:id', options: { method: 'put' } },
    BUDGET_DELETE_BY_ID: { url: 'budget/:id', options: { method: 'delete' } },
    BUDGET_UPDATE_BY_ID: { url: 'budget/:id', options: { method: 'patch' } },
    CLASSROOM_GET: { url: 'classroom' },
    CLASSROOM_CREATE: { url: 'classroom', options: { method: 'post' } },
    CLASSROOM_GET_BY_ID: { url: 'classroom/:id' },
    CLASSROOM_REPLACE_BY_ID: { url: 'classroom/:id', options: { method: 'put' } },
    CLASSROOM_DELETE_BY_ID: { url: 'classroom/:id', options: { method: 'delete' } },
    CLASSROOM_UPDATE_BY_ID: { url: 'classroom/:id', options: { method: 'patch' } },
    CONTENT_TYPE_GET: { url: 'content-type' },
    CONTENT_TYPE_CREATE: { url: 'content-type', options: { method: 'post' } },
    CONTENT_TYPE_GET_BY_ID: { url: 'content-type/:id' },
    CONTENT_TYPE_REPLACE_BY_ID: { url: 'content-type/:id', options: { method: 'put' } },
    CONTENT_TYPE_DELETE_BY_ID: { url: 'content-type/:id', options: { method: 'delete' } },
    CONTENT_TYPE_UPDATE_BY_ID: { url: 'content-type/:id', options: { method: 'patch' } },
    CONTRACT_SUBJECT_GET: { url: 'contract-subject' },
    CONTRACT_SUBJECT_CREATE: { url: 'contract-subject', options: { method: 'post' } },
    CONTRACT_SUBJECT_GET_BY_ID: { url: 'contract-subject/:id' },
    CONTRACT_SUBJECT_REPLACE_BY_ID: { url: 'contract-subject/:id', options: { method: 'put' } },
    CONTRACT_SUBJECT_DELETE_BY_ID: { url: 'contract-subject/:id', options: { method: 'delete' } },
    CONTRACT_SUBJECT_UPDATE_BY_ID: { url: 'contract-subject/:id', options: { method: 'patch' } },
    DOCUMENT_TYPE_GET: { url: 'document-type' },
    DOCUMENT_TYPE_CREATE: { url: 'document-type', options: { method: 'post' } },
    DOCUMENT_TYPE_GET_BY_ID: { url: 'document-type/:id' },
    DOCUMENT_TYPE_REPLACE_BY_ID: { url: 'document-type/:id', options: { method: 'put' } },
    DOCUMENT_TYPE_DELETE_BY_ID: { url: 'document-type/:id', options: { method: 'delete' } },
    DOCUMENT_TYPE_UPDATE_BY_ID: { url: 'document-type/:id', options: { method: 'patch' } },
    DURATION_GET: { url: 'duration' },
    DURATION_CREATE: { url: 'duration', options: { method: 'post' } },
    DURATION_GET_BY_ID: { url: 'duration/:id' },
    DURATION_REPLACE_BY_ID: { url: 'duration/:id', options: { method: 'put' } },
    DURATION_DELETE_BY_ID: { url: 'duration/:id', options: { method: 'delete' } },
    DURATION_UPDATE_BY_ID: { url: 'duration/:id', options: { method: 'patch' } },
    LEARNING_COURSE_GET: { url: 'learning-course' },
    LEARNING_COURSE_CREATE: { url: 'learning-course', options: { method: 'post' } },
    LEARNING_COURSE_ANNOUNCEMENT_GET: { url: 'learning-course-announcement' },
    LEARNING_COURSE_ANNOUNCEMENT_CREATE: { url: 'learning-course-announcement', options: { method: 'post' } },
    LEARNING_COURSE_ANNOUNCEMENT_GET_BY_ID: { url: 'learning-course-announcement/:id' },
    LEARNING_COURSE_ANNOUNCEMENT_REPLACE_BY_ID: {
        url: 'learning-course-announcement/:id',
        options: { method: 'put' }
    },
    LEARNING_COURSE_ANNOUNCEMENT_DELETE_BY_ID: {
        url: 'learning-course-announcement/:id',
        options: { method: 'delete' }
    },
    LEARNING_COURSE_ANNOUNCEMENT_UPDATE_BY_ID: {
        url: 'learning-course-announcement/:id',
        options: { method: 'patch' }
    },
    LEARNING_COURSE_BUDGET_ITEM_GET: { url: 'learning-course-budget-item' },
    LEARNING_COURSE_BUDGET_ITEM_CREATE: { url: 'learning-course-budget-item', options: { method: 'post' } },
    LEARNING_COURSE_BUDGET_ITEM_GET_BY_ID: { url: 'learning-course-budget-item/:id' },
    LEARNING_COURSE_BUDGET_ITEM_REPLACE_BY_ID: {
        url: 'learning-course-budget-item/:id',
        options: { method: 'put' }
    },
    LEARNING_COURSE_BUDGET_ITEM_DELETE_BY_ID: {
        url: 'learning-course-budget-item/:id',
        options: { method: 'delete' }
    },
    LEARNING_COURSE_BUDGET_ITEM_UPDATE_BY_ID: {
        url: 'learning-course-budget-item/:id',
        options: { method: 'patch' }
    },
    LEARNING_COURSE_CATALOG_GET: { url: 'learning-course-catalog' },
    LEARNING_COURSE_CATALOG_CREATE: { url: 'learning-course-catalog', options: { method: 'post' } },
    LEARNING_COURSE_CATALOG_GET_BY_ID: { url: 'learning-course-catalog/:id' },
    LEARNING_COURSE_CATALOG_REPLACE_BY_ID: { url: 'learning-course-catalog/:id', options: { method: 'put' } },
    LEARNING_COURSE_CATALOG_DELETE_BY_ID: { url: 'learning-course-catalog/:id', options: { method: 'delete' } },
    LEARNING_COURSE_CATALOG_UPDATE_BY_ID: { url: 'learning-course-catalog/:id', options: { method: 'patch' } },
    LEARNING_COURSE_CURATOR_GET: { url: 'learning-course-curator' },
    LEARNING_COURSE_CURATOR_CREATE: { url: 'learning-course-curator', options: { method: 'post' } },
    LEARNING_COURSE_CURATOR_GET_BY_ID: { url: 'learning-course-curator/:id' },
    LEARNING_COURSE_CURATOR_REPLACE_BY_ID: { url: 'learning-course-curator/:id', options: { method: 'put' } },
    LEARNING_COURSE_CURATOR_DELETE_BY_ID: { url: 'learning-course-curator/:id', options: { method: 'delete' } },
    LEARNING_COURSE_CURATOR_UPDATE_BY_ID: { url: 'learning-course-curator/:id', options: { method: 'patch' } },
    LEARNING_COURSE_DOCUMENT_TYPE_GET: { url: 'learning-course-document-type' },
    LEARNING_COURSE_DOCUMENT_TYPE_CREATE: { url: 'learning-course-document-type', options: { method: 'post' } },
    LEARNING_COURSE_DOCUMENT_TYPE_GET_BY_ID: { url: 'learning-course-document-type/:id' },
    LEARNING_COURSE_DOCUMENT_TYPE_REPLACE_BY_ID: {
        url: 'learning-course-document-type/:id',
        options: { method: 'put' }
    },
    LEARNING_COURSE_DOCUMENT_TYPE_DELETE_BY_ID: {
        url: 'learning-course-document-type/:id',
        options: { method: 'delete' }
    },
    LEARNING_COURSE_DOCUMENT_TYPE_UPDATE_BY_ID: {
        url: 'learning-course-document-type/:id',
        options: { method: 'patch' }
    },
    LEARNING_COURSE_GROUP_GET: { url: 'learning-course-group' },
    LEARNING_COURSE_GROUP_CREATE: { url: 'learning-course-group', options: { method: 'post' } },
    LEARNING_COURSE_GROUP_GET_BY_ID: { url: 'learning-course-group/:id' },
    LEARNING_COURSE_GROUP_REPLACE_BY_ID: { url: 'learning-course-group/:id', options: { method: 'put' } },
    LEARNING_COURSE_GROUP_DELETE_BY_ID: { url: 'learning-course-group/:id', options: { method: 'delete' } },
    LEARNING_COURSE_GROUP_UPDATE_BY_ID: { url: 'learning-course-group/:id', options: { method: 'patch' } },
    LEARNING_COURSE_LEARNING_COURSE_GROUP_GET: { url: 'learning-course-learning-course-group' },
    LEARNING_COURSE_LEARNING_COURSE_GROUP_CREATE: {
        url: 'learning-course-learning-course-group',
        options: { method: 'post' }
    },
    LEARNING_COURSE_LEARNING_COURSE_GROUP_SEARCH_FIND_BY_GROUP_GET: {
        url: 'learning-course-learning-course-group/search/find-by-group'
    },
    LEARNING_COURSE_LEARNING_COURSE_GROUP_GET_BY_ID: { url: 'learning-course-learning-course-group/:id' },
    LEARNING_COURSE_LEARNING_COURSE_GROUP_REPLACE_BY_ID: {
        url: 'learning-course-learning-course-group/:id',
        options: { method: 'put' }
    },
    LEARNING_COURSE_LEARNING_COURSE_GROUP_DELETE_BY_ID: {
        url: 'learning-course-learning-course-group/:id',
        options: { method: 'delete' }
    },
    LEARNING_COURSE_LEARNING_COURSE_GROUP_UPDATE_BY_ID: {
        url: 'learning-course-learning-course-group/:id',
        options: { method: 'patch' }
    },
    // LEARNING_COURSE_MESSAGE_GET: { url: 'learning-course-message' },
    LEARNING_COURSE_MESSAGE_CREATE: { url: 'learning-course-message', options: { method: 'post' } },
    // LEARNING_COURSE_MESSAGE_GET_BY_ID: { url: 'learning-course-message/:id' },
    // LEARNING_COURSE_MESSAGE_REPLACE_BY_ID: { url: 'learning-course-message/:id', options: { method: 'put' } },
    // LEARNING_COURSE_MESSAGE_DELETE_BY_ID: { url: 'learning-course-message/:id', options: { method: 'delete' } },
    // LEARNING_COURSE_MESSAGE_UPDATE_BY_ID: { url: 'learning-course-message/:id', options: { method: 'patch' } },
    LEARNING_COURSE_PARTY_GET: { url: 'learning-course-party' },
    LEARNING_COURSE_PARTY_CREATE: { url: 'learning-course-party', options: { method: 'post' } },
    LEARNING_COURSE_PARTY_GET_BY_ID: { url: 'learning-course-party/:id' },
    LEARNING_COURSE_PARTY_REPLACE_BY_ID: { url: 'learning-course-party/:id', options: { method: 'put' } },
    LEARNING_COURSE_PARTY_DELETE_BY_ID: { url: 'learning-course-party/:id', options: { method: 'delete' } },
    LEARNING_COURSE_PARTY_UPDATE_BY_ID: { url: 'learning-course-party/:id', options: { method: 'patch' } },
    LEARNING_COURSE_SIMILAR_GET: { url: 'learning-course-similar' },
    LEARNING_COURSE_SIMILAR_CREATE: { url: 'learning-course-similar', options: { method: 'post' } },
    LEARNING_COURSE_SIMILAR_GET_BY_ID: { url: 'learning-course-similar/:id' },
    LEARNING_COURSE_SIMILAR_REPLACE_BY_ID: { url: 'learning-course-similar/:id', options: { method: 'put' } },
    LEARNING_COURSE_SIMILAR_DELETE_BY_ID: { url: 'learning-course-similar/:id', options: { method: 'delete' } },
    LEARNING_COURSE_SIMILAR_UPDATE_BY_ID: { url: 'learning-course-similar/:id', options: { method: 'patch' } },
    LEARNING_COURSE_STEP_GET: { url: 'learning-course-step' },
    LEARNING_COURSE_STEP_CREATE: { url: 'learning-course-step', options: { method: 'post' } },
    LEARNING_COURSE_STEP_GET_BY_ID: { url: 'learning-course-step/:id' },
    LEARNING_COURSE_STEP_REPLACE_BY_ID: { url: 'learning-course-step/:id', options: { method: 'put' } },
    LEARNING_COURSE_STEP_DELETE_BY_ID: { url: 'learning-course-step/:id', options: { method: 'delete' } },
    LEARNING_COURSE_STEP_UPDATE_BY_ID: { url: 'learning-course-step/:id', options: { method: 'patch' } },
    LEARNING_COURSE_STUDY_DIRECTION_GET: { url: 'learning-course-study-direction' },
    LEARNING_COURSE_STUDY_DIRECTION_CREATE: { url: 'learning-course-study-direction', options: { method: 'post' } },
    LEARNING_COURSE_STUDY_DIRECTION_GET_BY_ID: { url: 'learning-course-study-direction/:id' },
    LEARNING_COURSE_STUDY_DIRECTION_REPLACE_BY_ID: {
        url: 'learning-course-study-direction/:id',
        options: { method: 'put' }
    },
    LEARNING_COURSE_STUDY_DIRECTION_DELETE_BY_ID: {
        url: 'learning-course-study-direction/:id',
        options: { method: 'delete' }
    },
    LEARNING_COURSE_STUDY_DIRECTION_UPDATE_BY_ID: {
        url: 'learning-course-study-direction/:id',
        options: { method: 'patch' }
    },
    LEARNING_COURSE_TYPE_GET: { url: 'learning-course-type' },
    LEARNING_COURSE_TYPE_CREATE: { url: 'learning-course-type', options: { method: 'post' } },
    LEARNING_COURSE_TYPE_GET_BY_ID: { url: 'learning-course-type/:id' },
    LEARNING_COURSE_TYPE_REPLACE_BY_ID: { url: 'learning-course-type/:id', options: { method: 'put' } },
    LEARNING_COURSE_TYPE_DELETE_BY_ID: { url: 'learning-course-type/:id', options: { method: 'delete' } },
    LEARNING_COURSE_TYPE_UPDATE_BY_ID: { url: 'learning-course-type/:id', options: { method: 'patch' } },
    LEARNING_COURSE_SEARCH_FIND_BY_CATALOG_GET: { url: 'learning-course/search/find-by-catalog' },
    LEARNING_COURSE_SEARCH_FIND_BY_IDS_GET: { url: 'learning-course/search/find-by-ids' },
    LEARNING_COURSE_SEARCH_FIND_SIMILAR_GET: { url: 'learning-course/search/find-similar' },
    LEARNING_COURSE_GET_BY_ID: { url: 'learning-course/:id' },
    LEARNING_COURSE_REPLACE_BY_ID: { url: 'learning-course/:id', options: { method: 'put' } },
    LEARNING_COURSE_DELETE_BY_ID: { url: 'learning-course/:id', options: { method: 'delete' } },
    LEARNING_COURSE_UPDATE_BY_ID: { url: 'learning-course/:id', options: { method: 'patch' } },
    LEARNING_COURSE_CURATOR_GET_BY_LEARNING_COURSE_ID: { url: 'learning-course/:id/learning-course-curator' },
    LEARNING_COURSE_LEARNING_COURSE_CURATOR_REPLACE_BY_ID: {
        url: 'learning-course/:id/learning-course-curator',
        options: { method: 'put' }
    },
    LEARNING_COURSE_CURATOR_DELETE_BY_LEARNING_COURSE_ID: {
        url: 'learning-course/:id/learning-course-curator',
        options: { method: 'delete' }
    },
    LEARNING_COURSE_CURATOR_UPDATE_BY_LEARNING_COURSE_ID: {
        url: 'learning-course/:id/learning-course-curator',
        options: { method: 'patch' }
    },
    LEARNING_COURSE_CURATOR_GET_BY_COURSE_AND_CURATOR: {
        url: 'learning-course/:id/learning-course-curator/:curatorId'
    },
    LEARNING_COURSE_CURATOR_ATTACHED_DELETE: {
        url: 'learning-course/:learningCourseId/learning-course-curator/:curatorId',
        options: { method: 'delete' }
    },
    LEARNING_COURSE_LEARNING_COURSE_LEARNING_COURSE_GROUP_GET_BY_ID: {
        url: 'learning-course/:id/learning-course-learning-course-group'
    },
    LEARNING_COURSE_LEARNING_COURSE_LEARNING_COURSE_GROUP_REPLACE_BY_ID: {
        url: 'learning-course/:id/learning-course-learning-course-group',
        options: { method: 'put' }
    },
    LEARNING_COURSE_LEARNING_COURSE_LEARNING_COURSE_GROUP_DELETE_BY_ID: {
        url: 'learning-course/:id/learning-course-learning-course-group',
        options: { method: 'delete' }
    },
    LEARNING_COURSE_LEARNING_COURSE_LEARNING_COURSE_GROUP_UPDATE_BY_ID: {
        url: 'learning-course/:id/learning-course-learning-course-group',
        options: { method: 'patch' }
    },
    LEARNING_COURSE_LEARNING_COURSE_LEARNING_COURSE_GROUP_GET: {
        url: 'learning-course/:id/learning-course-learning-course-group/:propertyId'
    },
    LEARNING_COURSE_LEARNING_COURSE_LEARNING_COURSE_GROUP_DELETE: {
        url: 'learning-course/:id/learning-course-learning-course-group/:propertyId',
        options: { method: 'delete' }
    },
    LEARNING_COURSE_PARTY_GET_BY_LEARNING_COURSE_ID: { url: 'learning-course/:learningCourseId/learning-course-party' },
    LEARNING_COURSE_LEARNING_COURSE_PARTY_REPLACE_BY_ID: {
        url: 'learning-course/:id/learning-course-party',
        options: { method: 'put' }
    },
    LEARNING_COURSE_LEARNING_COURSE_PARTY_DELETE_BY_ID: {
        url: 'learning-course/:id/learning-course-party',
        options: { method: 'delete' }
    },
    LEARNING_COURSE_LEARNING_COURSE_PARTY_UPDATE_BY_ID: {
        url: 'learning-course/:id/learning-course-party',
        options: { method: 'patch' }
    },
    LEARNING_COURSE_LEARNING_COURSE_PARTY_GET: {
        url: 'learning-course/:learningCourseId/learning-course-party/:learningCoursePartyId'
    },
    LEARNING_COURSE_LEARNING_COURSE_PARTY_DELETE: {
        url: 'learning-course/:learningCourseId/learning-course-party/:learningCoursePartyId',
        options: { method: 'delete' }
    },
    LEARNING_COURSE_STEP_GET_BY_LEARNING_COURSE_ID: { url: 'learning-course/:learningCourseId/learning-course-step' },
    LEARNING_COURSE_LEARNING_COURSE_STEP_REPLACE_BY_ID: {
        url: 'learning-course/:learningCourseId/learning-course-step',
        options: { method: 'put' }
    },
    LEARNING_COURSE_STEP_DELETE_ALL_BY_LEARNING_COURSE_ID: {
        url: 'learning-course/:learningCourseId/learning-course-step',
        options: { method: 'delete' }
    },
    LEARNING_COURSE_LEARNING_COURSE_STEP_UPDATE_BY_ID: {
        url: 'learning-course/:learningCourseId/learning-course-step',
        options: { method: 'patch' }
    },
    LEARNING_COURSE_LEARNING_COURSE_STEP_GET: {
        url: 'learning-course/:learningCourseId/learning-course-step'
    },
    LEARNING_COURSE_LEARNING_COURSE_STEP_DELETE: {
        url: 'learning-course/:learningCourseId/learning-course-step/:learningCourseStepId',
        options: { method: 'delete' }
    },
    LEARNING_COURSE_MESSAGE_GET_BY_ID: { url: 'learning-course/:id/message' },
    LEARNING_COURSE_MESSAGE_REPLACE_BY_ID: { url: 'learning-course/:id/message', options: { method: 'put' } },
    LEARNING_COURSE_MESSAGE_DELETE_BY_ID: { url: 'learning-course/:id/message', options: { method: 'delete' } },
    LEARNING_COURSE_MESSAGE_UPDATE_BY_ID: { url: 'learning-course/:id/message', options: { method: 'patch' } },
    LEARNING_COURSE_MESSAGE_GET: { url: 'learning-course/:id/message/:propertyId' },
    LEARNING_COURSE_MESSAGE_DELETE: { url: 'learning-course/:id/message/:propertyId', options: { method: 'delete' } },
    LEARNING_FORM_GET: { url: 'learning-form' },
    LEARNING_FORM_CREATE: { url: 'learning-form', options: { method: 'post' } },
    LEARNING_FORM_GET_BY_ID: { url: 'learning-form/:id' },
    LEARNING_FORM_REPLACE_BY_ID: { url: 'learning-form/:id', options: { method: 'put' } },
    LEARNING_FORM_DELETE_BY_ID: { url: 'learning-form/:id', options: { method: 'delete' } },
    LEARNING_FORM_UPDATE_BY_ID: { url: 'learning-form/:id', options: { method: 'patch' } },
    LEARNING_PROGRAM_GET: { url: 'learning-program' },
    LEARNING_PROGRAM_CREATE: { url: 'learning-program', options: { method: 'post' } },
    LEARNING_PROGRAM_CATALOG_GET: { url: 'learning-program-catalog' },
    LEARNING_PROGRAM_CATALOG_CREATE: { url: 'learning-program-catalog', options: { method: 'post' } },
    LEARNING_PROGRAM_CATALOG_GET_BY_ID: { url: 'learning-program-catalog/:id' },
    LEARNING_PROGRAM_CATALOG_REPLACE_BY_ID: { url: 'learning-program-catalog/:id', options: { method: 'put' } },
    LEARNING_PROGRAM_CATALOG_DELETE_BY_ID: { url: 'learning-program-catalog/:id', options: { method: 'delete' } },
    LEARNING_PROGRAM_CATALOG_UPDATE_BY_ID: { url: 'learning-program-catalog/:id', options: { method: 'patch' } },
    LEARNING_PROGRAM_DOCUMENT_TYPE_GET: { url: 'learning-program-document-type' },
    LEARNING_PROGRAM_DOCUMENT_TYPE_CREATE: { url: 'learning-program-document-type', options: { method: 'post' } },
    LEARNING_PROGRAM_DOCUMENT_TYPE_GET_BY_ID: { url: 'learning-program-document-type/:id' },
    LEARNING_PROGRAM_DOCUMENT_TYPE_REPLACE_BY_ID: {
        url: 'learning-program-document-type/:id',
        options: { method: 'put' }
    },
    LEARNING_PROGRAM_DOCUMENT_TYPE_DELETE_BY_ID: {
        url: 'learning-program-document-type/:id',
        options: { method: 'delete' }
    },
    LEARNING_PROGRAM_DOCUMENT_TYPE_UPDATE_BY_ID: {
        url: 'learning-program-document-type/:id',
        options: { method: 'patch' }
    },
    LEARNING_PROGRAM_LEARNING_COURSE_GET: { url: 'learning-program-learning-course' },
    LEARNING_PROGRAM_LEARNING_COURSE_CREATE: { url: 'learning-program-learning-course', options: { method: 'post' } },
    LEARNING_PROGRAM_LEARNING_COURSE_DEPENDENCY_GET: { url: 'learning-program-learning-course-dependency' },
    LEARNING_PROGRAM_LEARNING_COURSE_DEPENDENCY_CREATE: {
        url: 'learning-program-learning-course-dependency',
        options: { method: 'post' }
    },
    LEARNING_PROGRAM_LEARNING_COURSE_DEPENDENCY_SEARCH_FIND_BY_LEARNING_PROGRAM_LEARNING_COURSE_GET: {
        url: 'learning-program-learning-course-dependency/search/find-by-learning-program-learning-course'
    },
    LEARNING_PROGRAM_LEARNING_COURSE_DEPENDENCY_SEARCH_FIND_BY_PREV_LEARNING_PROGRAM_LEARNING_COURSE_GET: {
        url: 'learning-program-learning-course-dependency/search/find-by-prev-learning-program-learning-course'
    },
    LEARNING_PROGRAM_LEARNING_COURSE_DEPENDENCY_GET_BY_ID: {
        url: 'learning-program-learning-course-dependency/:id'
    },
    LEARNING_PROGRAM_LEARNING_COURSE_DEPENDENCY_REPLACE_BY_ID: {
        url: 'learning-program-learning-course-dependency/:id',
        options: { method: 'put' }
    },
    LEARNING_PROGRAM_LEARNING_COURSE_DEPENDENCY_DELETE_BY_ID: {
        url: 'learning-program-learning-course-dependency/:id',
        options: { method: 'delete' }
    },
    LEARNING_PROGRAM_LEARNING_COURSE_DEPENDENCY_UPDATE_BY_ID: {
        url: 'learning-program-learning-course-dependency/:id',
        options: { method: 'patch' }
    },
    LEARNING_PROGRAM_LEARNING_COURSE_PARTY_GET: { url: 'learning-program-learning-course-party' },
    LEARNING_PROGRAM_LEARNING_COURSE_PARTY_CREATE: {
        url: 'learning-program-learning-course-party',
        options: { method: 'post' }
    },
    LEARNING_PROGRAM_LEARNING_COURSE_PARTY_GET_BY_ID: { url: 'learning-program-learning-course-party/:id' },
    LEARNING_PROGRAM_LEARNING_COURSE_PARTY_REPLACE_BY_ID: {
        url: 'learning-program-learning-course-party/:id',
        options: { method: 'put' }
    },
    LEARNING_PROGRAM_LEARNING_COURSE_PARTY_DELETE_BY_ID: {
        url: 'learning-program-learning-course-party/:id',
        options: { method: 'delete' }
    },
    LEARNING_PROGRAM_LEARNING_COURSE_PARTY_UPDATE_BY_ID: {
        url: 'learning-program-learning-course-party/:id',
        options: { method: 'patch' }
    },
    LEARNING_PROGRAM_LEARNING_COURSE_SEARCH_FIND_BY_LEARNING_COURSE_GET: {
        url: 'learning-program-learning-course/search/find-by-learning-course'
    },
    LEARNING_PROGRAM_LEARNING_COURSE_SEARCH_FIND_BY_LEARNING_PROGRAM_GET: {
        url: 'learning-program-learning-course/search/find-by-learning-program'
    },
    LEARNING_PROGRAM_LEARNING_COURSE_GET_BY_ID: { url: 'learning-program-learning-course/:id' },
    LEARNING_PROGRAM_LEARNING_COURSE_REPLACE_BY_ID: {
        url: 'learning-program-learning-course/:id',
        options: { method: 'put' }
    },
    LEARNING_PROGRAM_LEARNING_COURSE_DELETE_BY_ID: {
        url: 'learning-program-learning-course/:id',
        options: { method: 'delete' }
    },
    LEARNING_PROGRAM_LEARNING_COURSE_UPDATE_BY_ID: {
        url: 'learning-program-learning-course/:id',
        options: { method: 'patch' }
    },
    LEARNING_PROGRAM_SEARCH_FIND_BY_CATALOG_GET: { url: 'learning-program/search/find-by-catalog' },
    LEARNING_PROGRAM_GET_BY_ID: { url: 'learning-program/:id' },
    LEARNING_PROGRAM_REPLACE_BY_ID: { url: 'learning-program/:id', options: { method: 'put' } },
    LEARNING_PROGRAM_DELETE_BY_ID: { url: 'learning-program/:id', options: { method: 'delete' } },
    LEARNING_PROGRAM_UPDATE_BY_ID: { url: 'learning-program/:id', options: { method: 'patch' } },
    LEARNING_STUDYGROUP_GET: { url: 'learning-studygroup' },
    LEARNING_STUDYGROUP_CREATE: { url: 'learning-studygroup', options: { method: 'post' } },
    LEARNING_STUDYGROUP_NUMERATOR_GET: { url: 'learning-studygroup-numerator' },
    LEARNING_STUDYGROUP_NUMERATOR_CREATE: { url: 'learning-studygroup-numerator', options: { method: 'post' } },
    LEARNING_STUDYGROUP_NUMERATOR_GET_BY_ID: { url: 'learning-studygroup-numerator/:id' },
    LEARNING_STUDYGROUP_NUMERATOR_REPLACE_BY_ID: {
        url: 'learning-studygroup-numerator/:id',
        options: { method: 'put' }
    },
    LEARNING_STUDYGROUP_NUMERATOR_DELETE_BY_ID: {
        url: 'learning-studygroup-numerator/:id',
        options: { method: 'delete' }
    },
    LEARNING_STUDYGROUP_NUMERATOR_UPDATE_BY_ID: {
        url: 'learning-studygroup-numerator/:id',
        options: { method: 'patch' }
    },
    LEARNING_STUDYGROUP_GET_BY_ID: { url: 'learning-studygroup/:id' },
    LEARNING_STUDYGROUP_REPLACE_BY_ID: { url: 'learning-studygroup/:id', options: { method: 'put' } },
    LEARNING_STUDYGROUP_DELETE_BY_ID: { url: 'learning-studygroup/:id', options: { method: 'delete' } },
    LEARNING_STUDYGROUP_UPDATE_BY_ID: { url: 'learning-studygroup/:id', options: { method: 'patch' } },
    MESSAGE_GET: { url: 'message' },
    MESSAGE_CREATE: { url: 'message', options: { method: 'post' } },
    MESSAGE_SEARCH_GET_THREAD_GET: { url: 'message/search/get-thread' },
    MESSAGE_SEARCH_GET_THREADS_FOR_LEARNING_COURSE_GET: { url: 'message/search/get-threads-for-learning-course' },
    MESSAGE_GET_BY_ID: { url: 'message/:id' },
    MESSAGE_REPLACE_BY_ID: { url: 'message/:id', options: { method: 'put' } },
    MESSAGE_DELETE_BY_ID: { url: 'message/:id', options: { method: 'delete' } },
    MESSAGE_UPDATE_BY_ID: { url: 'message/:id', options: { method: 'patch' } },
    STATUS_GET: { url: 'status' },
    STATUS_CREATE: { url: 'status', options: { method: 'post' } },
    STATUS_GET_BY_ID: { url: 'status/:id' },
    STATUS_REPLACE_BY_ID: { url: 'status/:id', options: { method: 'put' } },
    STATUS_DELETE_BY_ID: { url: 'status/:id', options: { method: 'delete' } },
    STATUS_UPDATE_BY_ID: { url: 'status/:id', options: { method: 'patch' } },
    STUDY_DEGREE_GET: { url: 'study-degree' },
    STUDY_DEGREE_CREATE: { url: 'study-degree', options: { method: 'post' } },
    STUDY_DEGREE_GROUP_GET: { url: 'study-degree-group' },
    STUDY_DEGREE_GROUP_CREATE: { url: 'study-degree-group', options: { method: 'post' } },
    STUDY_DEGREE_GROUP_GET_BY_ID: { url: 'study-degree-group/:id' },
    STUDY_DEGREE_GROUP_REPLACE_BY_ID: { url: 'study-degree-group/:id', options: { method: 'put' } },
    STUDY_DEGREE_GROUP_DELETE_BY_ID: { url: 'study-degree-group/:id', options: { method: 'delete' } },
    STUDY_DEGREE_GROUP_UPDATE_BY_ID: { url: 'study-degree-group/:id', options: { method: 'patch' } },
    STUDY_DEGREE_SEARCH_FIND_BY_NAME_GET: { url: 'study-degree/search/find-by-name' },
    STUDY_DEGREE_GET_BY_ID: { url: 'study-degree/:id' },
    STUDY_DEGREE_REPLACE_BY_ID: { url: 'study-degree/:id', options: { method: 'put' } },
    STUDY_DEGREE_DELETE_BY_ID: { url: 'study-degree/:id', options: { method: 'delete' } },
    STUDY_DEGREE_UPDATE_BY_ID: { url: 'study-degree/:id', options: { method: 'patch' } },
    STUDY_DIRECTION_GET_ALL: { url: 'study-direction' },
    STUDY_DIRECTION_CREATE: { url: 'study-direction', options: { method: 'post' } },
    STUDY_DIRECTION_GET_BY_ID: { url: 'study-direction/:id' },
    STUDY_DIRECTION_REPLACE_BY_ID: { url: 'study-direction/:id', options: { method: 'put' } },
    STUDY_DIRECTION_DELETE_BY_ID: { url: 'study-direction/:id', options: { method: 'delete' } },
    STUDY_DIRECTION_UPDATE_BY_ID: { url: 'study-direction/:id', options: { method: 'patch' } },
    STUDY_EXPERT_GET_ALL: { url: 'study-expert' },
    STUDY_EXPERT_CREATE: { url: 'study-expert', options: { method: 'post' } },
    STUDY_EXPERT_CONTRACT_GET: { url: 'study-expert-contract' },
    STUDY_EXPERT_CONTRACT_CREATE: { url: 'study-expert-contract', options: { method: 'post' } },
    STUDY_EXPERT_CONTRACT_RATE_GET_ALL: { url: 'study-expert-contract-rate' },
    STUDY_EXPERT_CONTRACT_RATE_CREATE: { url: 'study-expert-contract-rate', options: { method: 'post' } },
    STUDY_EXPERT_CONTRACT_RATE_GET_BY_ID: { url: 'study-expert-contract-rate/:id' },
    STUDY_EXPERT_CONTRACT_RATE_REPLACE_BY_ID: { url: 'study-expert-contract-rate/:id', options: { method: 'put' } },
    STUDY_EXPERT_CONTRACT_RATE_DELETE_BY_ID: {
        url: 'study-expert-contract-rate/:id',
        options: { method: 'delete' }
    },
    STUDY_EXPERT_CONTRACT_RATE_UPDATE_BY_ID: {
        url: 'study-expert-contract-rate/:id',
        options: { method: 'patch' }
    },
    STUDY_EXPERT_CONTRACT_TYPE_GET: { url: 'study-expert-contract-type' },
    STUDY_EXPERT_CONTRACT_TYPE_CREATE: { url: 'study-expert-contract-type', options: { method: 'post' } },
    STUDY_EXPERT_CONTRACT_TYPE_GET_BY_ID: { url: 'study-expert-contract-type/:id' },
    STUDY_EXPERT_CONTRACT_TYPE_REPLACE_BY_ID: { url: 'study-expert-contract-type/:id', options: { method: 'put' } },
    STUDY_EXPERT_CONTRACT_TYPE_DELETE_BY_ID: {
        url: 'study-expert-contract-type/:id',
        options: { method: 'delete' }
    },
    STUDY_EXPERT_CONTRACT_TYPE_UPDATE_BY_ID: {
        url: 'study-expert-contract-type/:id',
        options: { method: 'patch' }
    },
    STUDY_EXPERT_CONTRACT_GET_BY_ID: { url: 'study-expert-contract/:id' },
    STUDY_EXPERT_CONTRACT_REPLACE_BY_ID: { url: 'study-expert-contract/:id', options: { method: 'put' } },
    STUDY_EXPERT_CONTRACT_DELETE_BY_ID: { url: 'study-expert-contract/:id', options: { method: 'delete' } },
    STUDY_EXPERT_CONTRACT_UPDATE_BY_ID: { url: 'study-expert-contract/:id', options: { method: 'patch' } },
    STUDY_EXPERT_GET_BY_ID: { url: 'study-expert/:id' },
    STUDY_EXPERT_REPLACE_BY_ID: { url: 'study-expert/:id', options: { method: 'put' } },
    STUDY_EXPERT_DELETE_BY_ID: { url: 'study-expert/:id', options: { method: 'delete' } },
    STUDY_EXPERT_UPDATE_BY_ID: { url: 'study-expert/:id', options: { method: 'patch' } },
    STUDY_GRANT_GET: { url: 'study-grant' },
    STUDY_GRANT_CREATE: { url: 'study-grant', options: { method: 'post' } },
    STUDY_GRANT_ALLOCATION_GET: { url: 'study-grant-allocation' },
    STUDY_GRANT_ALLOCATION_CREATE: { url: 'study-grant-allocation', options: { method: 'post' } },
    STUDY_GRANT_ALLOCATION_STUDY_EXPERT_GET: { url: 'study-grant-allocation-study-expert' },
    STUDY_GRANT_ALLOCATION_STUDY_EXPERT_CREATE: {
        url: 'study-grant-allocation-study-expert',
        options: { method: 'post' }
    },
    STUDY_GRANT_ALLOCATION_STUDY_EXPERT_GET_BY_ID: { url: 'study-grant-allocation-study-expert/:id' },
    STUDY_GRANT_ALLOCATION_STUDY_EXPERT_REPLACE_BY_ID: {
        url: 'study-grant-allocation-study-expert/:id',
        options: { method: 'put' }
    },
    STUDY_GRANT_ALLOCATION_STUDY_EXPERT_DELETE_BY_ID: {
        url: 'study-grant-allocation-study-expert/:id',
        options: { method: 'delete' }
    },
    STUDY_GRANT_ALLOCATION_STUDY_EXPERT_UPDATE_BY_ID: {
        url: 'study-grant-allocation-study-expert/:id',
        options: { method: 'patch' }
    },
    STUDY_GRANT_ALLOCATION_STUDY_STUDENT_GET: { url: 'study-grant-allocation-study-student' },
    STUDY_GRANT_ALLOCATION_STUDY_STUDENT_CREATE: {
        url: 'study-grant-allocation-study-student',
        options: { method: 'post' }
    },
    STUDY_GRANT_ALLOCATION_STUDY_STUDENT_GET_BY_ID: { url: 'study-grant-allocation-study-student/:id' },
    STUDY_GRANT_ALLOCATION_STUDY_STUDENT_REPLACE_BY_ID: {
        url: 'study-grant-allocation-study-student/:id',
        options: { method: 'put' }
    },
    STUDY_GRANT_ALLOCATION_STUDY_STUDENT_DELETE_BY_ID: {
        url: 'study-grant-allocation-study-student/:id',
        options: { method: 'delete' }
    },
    STUDY_GRANT_ALLOCATION_STUDY_STUDENT_UPDATE_BY_ID: {
        url: 'study-grant-allocation-study-student/:id',
        options: { method: 'patch' }
    },
    STUDY_GRANT_ALLOCATION_GET_BY_ID: { url: 'study-grant-allocation/:id' },
    STUDY_GRANT_ALLOCATION_REPLACE_BY_ID: { url: 'study-grant-allocation/:id', options: { method: 'put' } },
    STUDY_GRANT_ALLOCATION_DELETE_BY_ID: { url: 'study-grant-allocation/:id', options: { method: 'delete' } },
    STUDY_GRANT_ALLOCATION_UPDATE_BY_ID: { url: 'study-grant-allocation/:id', options: { method: 'patch' } },
    STUDY_GRANT_GET_BY_ID: { url: 'study-grant/:id' },
    STUDY_GRANT_REPLACE_BY_ID: { url: 'study-grant/:id', options: { method: 'put' } },
    STUDY_GRANT_DELETE_BY_ID: { url: 'study-grant/:id', options: { method: 'delete' } },
    STUDY_GRANT_UPDATE_BY_ID: { url: 'study-grant/:id', options: { method: 'patch' } },
    STUDY_LOCATION_GET: { url: 'study-location' },
    STUDY_LOCATION_CREATE: { url: 'study-location', options: { method: 'post' } },
    STUDY_LOCATION_GET_BY_ID: { url: 'study-location/:id' },
    STUDY_LOCATION_REPLACE_BY_ID: { url: 'study-location/:id', options: { method: 'put' } },
    STUDY_LOCATION_DELETE_BY_ID: { url: 'study-location/:id', options: { method: 'delete' } },
    STUDY_LOCATION_UPDATE_BY_ID: { url: 'study-location/:id', options: { method: 'patch' } },
    STUDY_PERFORMANCE_TYPE_GET: { url: 'study-performance-type' },
    STUDY_PERFORMANCE_TYPE_CREATE: { url: 'study-performance-type', options: { method: 'post' } },
    STUDY_PERFORMANCE_TYPE_GET_BY_ID: { url: 'study-performance-type/:id' },
    STUDY_PERFORMANCE_TYPE_REPLACE_BY_ID: { url: 'study-performance-type/:id', options: { method: 'put' } },
    STUDY_PERFORMANCE_TYPE_DELETE_BY_ID: { url: 'study-performance-type/:id', options: { method: 'delete' } },
    STUDY_PERFORMANCE_TYPE_UPDATE_BY_ID: { url: 'study-performance-type/:id', options: { method: 'patch' } },
    STUDY_PROVIDER_GET: { url: 'study-provider' },
    STUDY_PROVIDER_CREATE: { url: 'study-provider', options: { method: 'post' } },
    STUDY_PROVIDER_CONTRACT_GET: { url: 'study-provider-contract' },
    STUDY_PROVIDER_CONTRACT_CREATE: { url: 'study-provider-contract', options: { method: 'post' } },
    STUDY_PROVIDER_CONTRACT_GET_BY_ID: { url: 'study-provider-contract/:id' },
    STUDY_PROVIDER_CONTRACT_REPLACE_BY_ID: { url: 'study-provider-contract/:id', options: { method: 'put' } },
    STUDY_PROVIDER_CONTRACT_DELETE_BY_ID: { url: 'study-provider-contract/:id', options: { method: 'delete' } },
    STUDY_PROVIDER_CONTRACT_UPDATE_BY_ID: { url: 'study-provider-contract/:id', options: { method: 'patch' } },
    STUDY_PROVIDER_CONTRACT_CONTRACT_SUBJECT_GET_BY_ID: { url: 'study-provider-contract/:id/contract-subject' },
    STUDY_PROVIDER_CONTRACT_CONTRACT_SUBJECT_REPLACE_BY_ID: {
        url: 'study-provider-contract/:id/contract-subject',
        options: { method: 'put' }
    },
    STUDY_PROVIDER_CONTRACT_CONTRACT_SUBJECT_DELETE_BY_ID: {
        url: 'study-provider-contract/:id/contract-subject',
        options: { method: 'delete' }
    },
    STUDY_PROVIDER_CONTRACT_CONTRACT_SUBJECT_UPDATE_BY_ID: {
        url: 'study-provider-contract/:id/contract-subject',
        options: { method: 'patch' }
    },
    STUDY_PROVIDER_CONTRACT_CONTRACT_SUBJECT_GET: { url: 'study-provider-contract/:id/contract-subject/:propertyId' },
    STUDY_PROVIDER_CONTRACT_CONTRACT_SUBJECT_DELETE: {
        url: 'study-provider-contract/:contractId/contract-subject/:contractSubjectId',
        options: { method: 'delete' }
    },
    STUDY_PROVIDER_REGION_GET: { url: 'study-provider-region' },
    STUDY_PROVIDER_REGION_CREATE: { url: 'study-provider-region', options: { method: 'post' } },
    STUDY_PROVIDER_REGION_CITY_GET_ALL: { url: 'study-provider-region-city' },
    STUDY_PROVIDER_REGION_CITY_CREATE: { url: 'study-provider-region-city', options: { method: 'post' } },
    STUDY_PROVIDER_REGION_CITY_GET_BY_ID: { url: 'study-provider-region-city/:id' },
    STUDY_PROVIDER_REGION_CITY_REPLACE_BY_ID: { url: 'study-provider-region-city/:id', options: { method: 'put' } },
    STUDY_PROVIDER_REGION_CITY_DELETE_BY_ID: {
        url: 'study-provider-region-city/:id',
        options: { method: 'delete' }
    },
    STUDY_PROVIDER_REGION_CITY_UPDATE_BY_ID: {
        url: 'study-provider-region-city/:id',
        options: { method: 'patch' }
    },
    STUDY_PROVIDER_REGION_GET_BY_ID: { url: 'study-provider-region/:id' },
    STUDY_PROVIDER_REGION_REPLACE_BY_ID: { url: 'study-provider-region/:id', options: { method: 'put' } },
    STUDY_PROVIDER_REGION_DELETE_BY_ID: { url: 'study-provider-region/:id', options: { method: 'delete' } },
    STUDY_PROVIDER_REGION_UPDATE_BY_ID: { url: 'study-provider-region/:id', options: { method: 'patch' } },
    STUDY_PROVIDER_TYPE_GET: { url: 'study-provider-type' },
    STUDY_PROVIDER_TYPE_CREATE: { url: 'study-provider-type', options: { method: 'post' } },
    STUDY_PROVIDER_TYPE_GET_BY_ID: { url: 'study-provider-type/:id' },
    STUDY_PROVIDER_TYPE_REPLACE_BY_ID: { url: 'study-provider-type/:id', options: { method: 'put' } },
    STUDY_PROVIDER_TYPE_DELETE_BY_ID: { url: 'study-provider-type/:id', options: { method: 'delete' } },
    STUDY_PROVIDER_TYPE_UPDATE_BY_ID: { url: 'study-provider-type/:id', options: { method: 'patch' } },
    STUDY_PROVIDER_GET_BY_ID: { url: 'study-provider/:id' },
    STUDY_PROVIDER_REPLACE_BY_ID: { url: 'study-provider/:id', options: { method: 'put' } },
    STUDY_PROVIDER_DELETE_BY_ID: { url: 'study-provider/:id', options: { method: 'delete' } },
    STUDY_PROVIDER_UPDATE_BY_ID: { url: 'study-provider/:id', options: { method: 'patch' } },
    STUDY_PROVIDER_STUDY_DEGREE_GET_BY_ID: { url: 'study-provider/:id/study-degree' },
    STUDY_PROVIDER_STUDY_DEGREE_REPLACE_BY_ID: {
        url: 'study-provider/:id/study-degree',
        options: { method: 'put' }
    },
    STUDY_PROVIDER_STUDY_DEGREE_DELETE_BY_ID: {
        url: 'study-provider/:id/study-degree',
        options: { method: 'delete' }
    },
    STUDY_PROVIDER_STUDY_DEGREE_UPDATE_BY_ID: {
        url: 'study-provider/:id/study-degree',
        options: { method: 'patch' }
    },
    STUDY_PROVIDER_STUDY_DEGREE_GET: { url: 'study-provider/:id/study-degree/:propertyId' },
    STUDY_PROVIDER_STUDY_DEGREE_DELETE: {
        url: 'study-provider/:id/study-degree/:propertyId',
        options: { method: 'delete' }
    },
    STUDY_STUDENT_GET: { url: 'study-student' },
    STUDY_STUDENT_CREATE: { url: 'study-student', options: { method: 'post' } },
    STUDY_STUDENT_EDUCATION_GET_ALL: { url: 'study-student-education' },
    STUDY_STUDENT_EDUCATION_CREATE: { url: 'study-student-education', options: { method: 'post' } },
    STUDY_STUDENT_EDUCATION_GET_BY_ID: { url: 'study-student-education/:id' },
    STUDY_STUDENT_EDUCATION_REPLACE_BY_ID: { url: 'study-student-education/:id', options: { method: 'put' } },
    STUDY_STUDENT_EDUCATION_DELETE_BY_ID: { url: 'study-student-education/:id', options: { method: 'delete' } },
    STUDY_STUDENT_EDUCATION_UPDATE_BY_ID: { url: 'study-student-education/:id', options: { method: 'patch' } },
    STUDY_STUDENT_PERFORMANCE_GET_ALL: { url: 'study-student-performance' },
    STUDY_STUDENT_PERFORMANCE_CREATE: { url: 'study-student-performance', options: { method: 'post' } },
    STUDY_STUDENT_PERFORMANCE_GET_BY_ID: { url: 'study-student-performance/:id' },
    STUDY_STUDENT_PERFORMANCE_REPLACE_BY_ID: { url: 'study-student-performance/:id', options: { method: 'put' } },
    STUDY_STUDENT_PERFORMANCE_DELETE_BY_ID: { url: 'study-student-performance/:id', options: { method: 'delete' } },
    STUDY_STUDENT_PERFORMANCE_UPDATE_BY_ID: { url: 'study-student-performance/:id', options: { method: 'patch' } },
    STUDY_STUDENT_GET_BY_ID: { url: 'study-student/:id' },
    STUDY_STUDENT_REPLACE_BY_ID: { url: 'study-student/:id', options: { method: 'put' } },
    STUDY_STUDENT_DELETE_BY_ID: { url: 'study-student/:id', options: { method: 'delete' } },
    STUDY_STUDENT_UPDATE_BY_ID: { url: 'study-student/:id', options: { method: 'patch' } },
    SUGGESTION_GET_ALL: { url: 'suggestion' },
    SUGGESTION_CREATE: { url: 'suggestion', options: { method: 'post' } },
    SUGGESTION_GET_BY_ID: { url: 'suggestion/:id' },
    SUGGESTION_REPLACE_BY_ID: { url: 'suggestion/:id', options: { method: 'put' } },
    SUGGESTION_DELETE_BY_ID: { url: 'suggestion/:id', options: { method: 'delete' } },
    SUGGESTION_UPDATE_BY_ID: { url: 'suggestion/:id', options: { method: 'patch' } },
    USER_LEARNING_COURSE_GET: { url: 'user-learning-course' },
    USER_LEARNING_COURSE_CREATE: { url: 'user-learning-course', options: { method: 'post' } },
    USER_LEARNING_COURSE_DOCUMENT_GET: { url: 'user-learning-course-document' },
    USER_LEARNING_COURSE_DOCUMENT_CREATE: { url: 'user-learning-course-document', options: { method: 'post' } },
    USER_LEARNING_COURSE_DOCUMENT_GET_BY_ID: { url: 'user-learning-course-document/:id' },
    USER_LEARNING_COURSE_DOCUMENT_REPLACE_BY_ID: {
        url: 'user-learning-course-document/:id',
        options: { method: 'put' }
    },
    USER_LEARNING_COURSE_DOCUMENT_DELETE_BY_ID: {
        url: 'user-learning-course-document/:id',
        options: { method: 'delete' }
    },
    USER_LEARNING_COURSE_DOCUMENT_UPDATE_BY_ID: {
        url: 'user-learning-course-document/:id',
        options: { method: 'patch' }
    },
    USER_LEARNING_COURSE_STEP_GET: { url: 'user-learning-course-step' },
    USER_LEARNING_COURSE_STEP_CREATE: { url: 'user-learning-course-step', options: { method: 'post' } },
    USER_LEARNING_COURSE_STEP_GET_BY_ID: { url: 'user-learning-course-step/:id' },
    USER_LEARNING_COURSE_STEP_REPLACE_BY_ID: { url: 'user-learning-course-step/:id', options: { method: 'put' } },
    USER_LEARNING_COURSE_STEP_DELETE_BY_ID: { url: 'user-learning-course-step/:id', options: { method: 'delete' } },
    USER_LEARNING_COURSE_STEP_UPDATE_BY_ID: { url: 'user-learning-course-step/:id', options: { method: 'patch' } },
    USER_LEARNING_COURSE_GET_BY_ID: { url: 'user-learning-course/:id' },
    USER_LEARNING_COURSE_REPLACE_BY_ID: { url: 'user-learning-course/:id', options: { method: 'put' } },
    USER_LEARNING_COURSE_DELETE_BY_ID: { url: 'user-learning-course/:id', options: { method: 'delete' } },
    USER_LEARNING_COURSE_UPDATE_BY_ID: { url: 'user-learning-course/:id', options: { method: 'patch' } },
    STUDY_PROVIDER_STUDY_DEGREE_REPLACE_BY_STUDY_PROVIDER_ID_ALL: {
        url: 'study-provider/:studyProviderId/study-degree',
        options: { method: 'put' }
    },
    STUDY_PROVIDER_LEGAL_ENTITY_RESTRICTION_REPLACE_BY_STUDY_PROVIDER_ID_ALL: {
        url: 'study-provider/:studyProviderId/legal-entity-restriction',
        options: { method: 'put' }
    },
    STUDY_PROVIDER_CONTRACT_CONTRACT_SUBJECT_REPLACE_BY_STUDY_PROVIDER_CONTRACT_ID_ALL: {
        url: 'study-provider-contract/:study_provider_contract_id/contract-subject',
        options: { method: 'put' }
    },
    STUDY_DIRECTION_DEVELOPMENT_FORM_REPLACE_BY_STUDY_DIRECTION_ID_ALL: {
        url: 'study-direction/:study_direction_id/development-form',
        options: { method: 'put' }
    },
    LEARNING_COURSE_LEARNING_PARTY_REPLACE_BY_LEARNING_COURSE_ID: {
        url: 'learning-course/:learningCourseId/learning-party',
        options: { method: 'put' }
    },
    LEARNING_COURSE_COMPETENCIES_REPLACE_BY_LEARNING_COURSE_ID_ALL: {
        url: 'learning-course/:learningCourseId/competencies',
        options: { method: 'put' }
    },
    LEARNING_COURSE_MODULE_PRESENCE_REFUSE_CREATE: {
        url: 'learning-course/:learningCourseId/module-presence-refuse',
        options: { method: 'post' }
    },
    LEARNING_COURSE_MODULE_PRESENCE_PLAN_CREATE: {
        url: 'learning-course/:learningCourseId/module-presence-plan',
        options: { method: 'post' }
    },
    LEARNING_COURSE_MODULE_PRESENCE_FACT_CREATE: {
        url: 'learning-course/:learningCourseId/module-presence-fact',
        options: { method: 'post' }
    },
    LEARNING_COURSE_ADD_USER_CREATE: {
        url: 'learning-course/:learningCourseId/add-user',
        options: { method: 'post' }
    },
    LEARNING_COURSE_STEP_CHANGE_INDEX_CREATE: {
        url: 'learning-course-step/:step_id/change-index',
        options: { method: 'post' }
    },
    BUDGET_COPY_CREATE_BY_BUDGET_ID_ALL: { url: 'budget/:budget_id/copy', options: { method: 'post' } },
    BUDGET_CONFIRM_CREATE_BY_BUDGET_ID_ALL: { url: 'budget/:budget_id/confirm', options: { method: 'post' } },
    USER_LEARNING_COURSE_DOCUMENT_SEARCH_FIND_BY_DATES_GET: {
        url: 'user-learning-course-document/search/find-by-dates'
    },
    SUGGESTION_SEARCH_FIND_GET: { url: 'suggestion/search/find' },
    LEARNING_PROGRAM_CATALOG_SEARCH_FIND_GET_BY_ID: { url: 'learning-program-catalog/search/find' },
    LEARNING_PROGRAM_CATALOG_SEARCH_FIND_BY_NAME_GET_BY_NAME_ALL: {
        url: 'learning-program-catalog/search/find-by-name'
    },
    LEARNING_COURSE_SEARCH_ALL_GET: { url: 'learning-course/search/all' },
    LEARNING_COURSE_CATALOG_SEARCH_FIND_GET_BY_ID: { url: 'learning-course-catalog/search/find' },
    LEARNING_COURSE_CATALOG_SEARCH_FIND_BY_NAME_GET_BY_NAME_ALL: { url: 'learning-course-catalog/search/find-by-name' },
    NEXT_NUMBER_CREATE_BY_NUMERATOR_ID_ALL: { url: ':numerator_id/next-number', options: { method: 'post' } },
    UTILS_IMPORT_STUDY_DEGREES_FROM_XLS_CREATE: {
        url: 'utils/import-study-degrees-from-xls',
        options: { method: 'post' }
    },
    UTILS_IMPORT_LEARNING_COURSES_FROM_XLS_CREATE: {
        url: 'utils/import-learning-courses-from-xls',
        options: { method: 'post' }
    },
    UTILS_IMPORT_LEARNING_COURSES_FROM_PREVIEW_CREATE: {
        url: 'utils/import-learning-courses-from-preview',
        options: { method: 'post' }
    },
    UTILS_IMPORT_EDUCATION_FROM_XLS_CREATE: { url: 'utils/import-education-from-xls', options: { method: 'post' } },
    UTILS_GET_LEARNING_COURSES_PREVIEW_FROM_XLS_CREATE: {
        url: 'utils/get-learning-courses-preview-from-xls',
        options: { method: 'post' }
    },
    UTILS_IMPORT_STUDY_DEGREES_FROM_XLS_TEMPLATE_GET: { url: 'utils/import-study-degrees-from-xls/template' },
    UTILS_IMPORT_LEARNING_COURSES_FROM_XLS_TEMPLATE_GET: { url: 'utils/import-learning-courses-from-xls/template' },
    UTILS_IMPORT_EDUCATION_FROM_XLS_TEMPLATE_GET: { url: 'utils/import-education-from-xls/template' },
    INFO_GET: { url: 'info' },
    INFO_ME_GET: { url: 'info/me' }
};

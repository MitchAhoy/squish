const formInfo = {
    organisation: {
        title: 'Add An Organisation',
        fields: [
            { label: 'Organisation Name', inputFor: 'organisationName', type: 'text', value: '' },
            { label: 'Add Users', inputFor: 'organisationUsers', type: 'add-users', value: '' },
        ],
        cta: 'Add Organisation',
        submitBtn: 'Add Organisation'
    },
    project: {
        title: 'Create Project',
        fields: [
            { label: 'Organisation', inputFor: 'projectOrganisation', type: 'select-organisation', value: '' },
            { label: 'Project Name', inputFor: 'projectName', type: 'text', value: '' },
            { label: 'Description', inputFor: 'projectDescription', type: 'text', value: '' },
            { label: 'Project Users', inputFor: 'projectUsers', type: 'add-users', value: '' },
        ],
        cta: 'Create Project',
        submitBtn: 'Create Project'
    },
    task: {
        title: 'Create Task',
        fields: [
            { label: 'Organisation', inputFor: 'taskOrganisation', type: 'select-organisation', value: '' },
            { label: 'Project', inputFor: 'taskProject', type: 'select-project', value: '' },
            { label: 'Task Name', inputFor: 'taskName', type: 'text', value: '' },
            { label: 'Description', inputFor: 'taskDescription', type: 'task-description', value: '' },
            { label: 'Assign To', inputFor: 'taskAssignee', type: 'task-assignee', value: '' },
            { label: 'Priority', inputFor: 'taskPriority', type: 'select-priority', value: '' },
            { label: 'Due Date', inputFor: 'taskDueDate', type: 'select-date', value: '' }

        ],
        cta: 'Create Task',
        submitBtn: 'Create Task'
    }

}

export default formInfo

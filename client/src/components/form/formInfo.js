import axios from 'axios'

const formInfo = {
    organisation: {
        title: 'Add An Organisation',
        fields: [
            { label: 'Organisation Name', inputFor: 'organisationName', type: 'text', value: '' },
            { label: 'Add Users', inputFor: 'organisationUsers', type: 'text', value: '' },
        ],
        cta: 'Add Organisation',
        submitBtn: 'Add Organisation',
        submit: async (formData) => {
            try {
                const response = await axios.post('/api/create_organisation', formData)
                return response
            } catch (err) {
                throw new Error(err)
            }
        }
    },
    project: {
        title: 'Create Project',
        fields: [
            { label: 'Organisation', inputFor: 'projectOrganisation', type: 'select-organisation', value: '' },
            { label: 'Project Name', inputFor: 'projectName', type: 'text', value: '' },
            { label: 'Description', inputFor: 'projectDescription', type: 'text', value: '' },
            { label: 'Invite Users', inputFor: 'projectUsers', type: 'text', value: '' },
        ],
        cta: 'Create Project',
        submitBtn: 'Create Project',
        submit: async (formData) => {
            try {
                const response = await axios.post('/api/create_project', formData)
                return response
            } catch (err) {
                throw new Error(err)
            }
        }
    },
    task: {
        title: 'Create Task',
        fields: [
            { label: 'Organisation', inputFor: 'taskOrganisation', type: 'select-organisation', value: '' },
            { label: 'Project', inputFor: 'taskProject', type: 'select-project', value: '' },
            { label: 'Task Name', inputFor: 'taskName', type: 'text', value: '' },
            { label: 'Description', inputFor: 'taskDescription', type: 'task-description', value: '' },
            { label: 'Assign To', inputFor: 'taskAssignee', type: 'text', value: '' },
            { label: 'Priority', inputFor: 'taskPriority', type: 'select-priority', value: '' },
            { label: 'Due Date', inputFor: 'taskDueDate', type: 'select-date', value: '' }

        ],
        cta: 'Create Task',
        submitBtn: 'Create Task',
        submit: async (formData) => {
            try {
                const response = await axios.post('/api/tasks', formData)
                return response
            } catch (err) {
                throw new Error(err)
            }
        }
    }

}

export default formInfo

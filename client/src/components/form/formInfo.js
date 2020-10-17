import axios from 'axios'

const formInfo = {
    project: {
        title: 'Create Project',
        fields: [
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
            { label: 'Task Name', inputFor: 'taskName', type: 'text', value: '' },
            { label: 'Description', inputFor: 'taskDescription', type: 'text', value: '' },
            { label: 'Assign To', inputFor: 'taskAssignee', type: 'text', value: '' },
            { label: 'Priority', inputFor: 'taskPriority', type: 'select-priority', value: '' },
            { label: 'Due Date', inputFor: 'taskDueDate', type: 'select-date', value: '' },
            { label: 'Tags', inputFor: 'taskTags', type: 'text', value: [] },

        ],
        cta: 'Create Task',
        submitBtn: 'Create Task',
        submit: async (formData) => {
            try {
                const response = await axios.post('/api/create_task', formData)
                return response
            } catch (err) {
                throw new Error(err)
            }
        }
    }

}

export default formInfo

import axios from 'axios'

export const projectForm = {
        title: 'Create A Project',
        fields: [
            {label: 'Project Name', inputFor: 'projectName', type: 'text', value: ''},
            {label: 'Description', inputFor: 'projectDescription', type: 'text', value: ''},
            {label: 'Invite Users', inputFor: 'projectUsers', type: 'text', value: ''},
        ],
        cta: 'Create A Project',
        submitBtn: 'Create',
        submit: async (formData) => {
            try {
                const response = await axios.post('/api/create_project', formData)
                return response
            } catch (err) {
                throw new Error(err)
            }
        }
    
    }

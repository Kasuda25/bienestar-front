import axios from './useAxios';

class ActivitiesService {
    async createActivity(activity) {
        try {
            const response = await axios.post('/actividades/nueva', activity);
            if (response.status === 201) {
                return response.data.data;
            }
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    async getActivities() {
        try {
            const response = await axios.get('/actividades/creadas');
            if (response.status === 200) {
                return response.data.data;
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async getActivity(id) {
        try {
            const response = await axios.get(`/actividades/${id}`);
            if (response.status === 200) {
                return response.data.data;
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async getActivitiesByInstructor(id) {
        try {
            const response = await axios.get(`/actividades/instructor/${id}`);
            if (response.status === 200) {
                return { pagination: response.data.pagination, data: response.data.data };
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async putActivity(id, activity) {
        try {
            const response = await axios.put(`/actividades/${id}`, activity);
            if (response.status === 200) {
                return response.data.data;
            }
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    async deleteActivity(id) {
        try {
            const response = await axios.delete(`/actividades/eliminar/${id}`);
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default new ActivitiesService();

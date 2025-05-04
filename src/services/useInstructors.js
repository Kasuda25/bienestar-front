import axios from './useAxios';

class InstructorsService {
    async createInstructor(instructor) {
        try {
            const response = await axios.post(
                '/admin/agregar-instructor',
                instructor
            );
            if (response.status === 201) {
                return response.data.data;
            }
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    async getInstructors() {
        try {
            const response = await axios.get('/admin/instructores-activos');
            if (response.status === 200) {
                return response.data.data;
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async getInstructor(id) {
        try {
            const response = await axios.get(`/admin/${id}`);
            if (response.status === 200) {
                return response.data.data;
            }
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    async putInstructor(id, instructor) {
        try {
            const response = await axios.put(`/admin/${id}`, instructor);
            if (response.status === 200) {
                return response.data.data;
            }
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    async deleteInstructor(id) {
        try {
            const response = await axios.delete(`/admin/${id}`);
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default new InstructorsService();

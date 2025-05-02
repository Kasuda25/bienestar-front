import axios from './useAxios';

class InstructoresService {
    async getInstructores() {
        try {
            const response = await axios.get('/admin/instructores-activos');
            if (response.status === 200) {
                return response.data.data;
            }
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default new InstructoresService();

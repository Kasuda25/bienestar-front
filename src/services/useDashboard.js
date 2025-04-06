import axios from './useAxios'

class DashboardService {
    async getActividades() {
        try {
            const response = await axios.get('/actividades/creadas')
            if (response.status === 200) {
                return response.data.data
            }
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default new DashboardService()
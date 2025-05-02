import axios from './useAxios';

class ActividadesServices {
    async createActividad(activity) {
        try {
            const response = await axios.post('/actividades/nueva', activity);
            if (response.status === 201) {
                return response.data.data;
            }
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    async getActividades() {
        try {
            const response = await axios.get('/actividades/creadas');
            if (response.status === 200) {
                return response.data.data;
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async getActividad(id) {
        try {
            const response = await axios.get(`/actividades/${id}`);
            if (response.status === 200) {
                return response.data.data;
            }
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default new ActividadesServices();

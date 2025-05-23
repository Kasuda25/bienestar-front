import axios from './useAxios';

class InscriptionsService {
    async createInscription(data) {
        try {
            const response = await axios.post(`/estudiantes/${data.student}/inscribirse/${data.activity}`);
            if (response.status === 201) {
                return response.data.data;
            }
        } catch (error) {
            if (error.response) {
                throw {
                    type: 'backend',
                    message:
                        error.response.data?.message ||
                        'Error desconocido del servidor',
                    status: error.response.status,
                };
            } else if (error.request) {
                throw {
                    type: 'network',
                    message:
                        'No se pudo conectar con el servidor. Verifica tu conexión.',
                };
            } else {
                throw {
                    type: 'unknown',
                    message:
                        error.message || 'Ha ocurrido un error inesperado.',
                };
            }
        }
    }
}

export default new InscriptionsService();
import axios from './useAxios';

class ActivitiesService {
    async createActivity(activity) {
        try {
            const response = await axios.post('/actividades/nueva', activity);
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

    async getActivities() {
        try {
            const response = await axios.get('/actividades/creadas');
            if (response.status === 200) {
                return response.data;
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

    async getActivity(id) {
        try {
            const response = await axios.get(`/actividades/${id}`);
            if (response.status === 200) {
                return response.data;
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

    async getActivitiesByInstructor() {
        try {
            const response = await axios.get(`/admin/mis-actividades`);
            if (response.status === 200) {
                return response.data;
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

    async getActivitiesByInstructorForAdmin(id) {
        try {
            const response = await axios.get(
                `/admin/instructores/${id}/actividades`
            );
            if (response.status === 200) {
                return response.data;
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

    async putActivity(id, activity) {
        try {
            const response = await axios.put(`/actividades/${id}`, activity);
            if (response.status === 200) {
                return response.data;
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

    async deleteActivity(id) {
        try {
            const response = await axios.delete(`/actividades/eliminar/${id}`);
            if (response.status === 200) {
                return response;
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

export default new ActivitiesService();

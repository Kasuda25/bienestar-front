import axios from './useAxios';

class StudentsService {
    async createStudent(student) {
        try {
            const response = await axios.post('/estudiantes/registro', student);
            if (response.status === 201) {
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

    async registerAttendance(data) {
        try {
            const response = await axios.post(
                '/instructores/asistencias',
                data
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

    async registerHours(data) {
        try {
            const response = await axios.post('/instructores/horas', data);
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

    async getStudents(page = 0, size = 10, search = '') {
        try {
            const response = await axios.get(
                `/estudiantes?page=${page}&size=${size}&search=${search}`
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

    async getStudent(id) {
        try {
            const response = await axios.get(`/estudiantes/${id}/perfil`);
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

    async getActivitiesByStudent(page = 0, size = 10, search = '') {
        try {
            const response = await axios.get(
                `/estudiantes/mis-actividades?page=${page}&size=${size}&search=${search}`
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

    async putStudent(id, student) {
        try {
            const response = await axios.put(`/estudiantes/${id}`, student);
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

    async deleteStudent(id) {
        try {
            const response = await axios.delete(`/estudiantes/${id}`);
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
}

export default new StudentsService();

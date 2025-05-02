<template>
    <div class="container-fluid py-2 pe-3">
        <div class="row">
            <div class="col-12">
                <div class="card my-4">
                    <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                        <div class="d-flex justify-content-between bg-gradient-dark shadow-dark border-radius-lg py-3">
                            <h6 class="text-white ps-3 my-auto">
                                Crear Actividad
                            </h6>
                        </div>
                    </div>
                    <div class="card-body pb-2">
                        <div class="row mb-3">
                            <div class="col-12 col-md-4">
                                <label class="form-label" for="nameInput">Nombre</label>
                            </div>
                            <div class="col-12 col-md-8">
                                <input class="form-control" id="nameInput" type="text" />
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-12 col-md-4">
                                <label class="form-label" for="startDateInput">Fecha de inicio</label>
                            </div>
                            <div class="col-12 col-md-8">
                                <input class="form-control" id="startDateInput" type="date" onfocus="this.showPicker()"
                                    onkeydown="return false;" />
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-12 col-md-4">
                                <label class="form-label" for="endDateInput">Fecha de fin</label>
                            </div>
                            <div class="col-12 col-md-8">
                                <input class="form-control" id="endDateInput" type="date" onfocus="this.showPicker()"
                                    onkeydown="return false;" />
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-12 col-md-4">
                                <label class="form-label" for="startHourInput">Hora de inicio</label>
                            </div>
                            <div class="col-12 col-md-8">
                                <input class="form-control" id="startHourInput" type="time"
                                    onfocus="this.showPicker()" />
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-12 col-md-4">
                                <label class="form-label" for="endHourInput">Hora de fin</label>
                            </div>
                            <div class="col-12 col-md-8">
                                <input class="form-control" id="endHourInput" type="time" onfocus="this.showPicker()" />
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-12 col-md-4">
                                <label class="form-label" for="maxStudentsInput">Máximo de estudiantes</label>
                            </div>
                            <div class="col-12 col-md-8">
                                <input class="form-control" id="endHourInput" type="number"
                                    @keydown="blockInvalidNumberKeys" />
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-12 col-md-4">
                                <label class="form-label" for="instructorInput">Instructor</label>
                            </div>
                            <div class="col-12 col-md-8">
                                <select class="form-select" id="instructorInput" type="select">
                                    <option selected disabled></option>
                                    <div v-for="instructor in instructores" :key="instructor">
                                        <option value="{{ instructor.id }}">{{ instructor.usuario.nombre }} {{ instructor.usuario.apellido }}</option>
                                    </div>
                                </select>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-12 col-md-4">
                                <label class="form-label" for="lacationInput">Ubicación</label>
                            </div>
                            <div class="col-12 col-md-8">
                                <input class="form-control" id="lacationInput" type="text" />
                            </div>
                        </div>
                        <div class="w-100 text-end">
                            <div role="button" class="btn bg-gradient-dark mt-3" @click="createActividad">
                                Crear
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

import InstructoresService from '../../services/useInstructores';

const emit = defineEmits();
const instructores = ref([]);

onMounted(async () => {
    instructores.value = await InstructoresService.getInstructores();
})

const createActividad = () => {
    emit('createActividad',);
}

const blockInvalidNumberKeys = (e) => {
    const invalidKeys = ['-', '+', '.', ',', 'e', 'E'];

    if (invalidKeys.includes(e.key)) {
        e.preventDefault();
    }
};
</script>

<style scoped>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.form-label {
    font-size: 0.9rem;
    color: black;
}

.no-select {
    user-select: none;
}

.no-edit::-webkit-inner-spin-button,
.no-edit::-webkit-calendar-picker-indicator {
    opacity: 1;
    pointer-events: auto;
}

.no-edit {
    pointer-events: none;
    /* bloquea interacciones, excepto el calendario */
}

.no-edit:focus {
    pointer-events: auto;
    /* permite abrir el calendario al enfocar */
}
</style>

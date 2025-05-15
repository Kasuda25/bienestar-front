<template>
    <div class="container-fluid py-2 pe-3">
        <div class="row">
            <div class="col-12">
                <div class="card my-4">
                    <div
                        class="card-header p-0 position-relative mt-n4 mx-3 z-index-2"
                    >
                        <div
                            class="d-flex justify-content-between bg-gradient-dark shadow-dark border-radius-lg py-3"
                        >
                            <h6 class="text-white ps-3 my-auto">
                                Crear Actividad
                            </h6>
                        </div>
                    </div>
                    <div class="card-body pb-2">
                        <div v-if="isLoading">
                            <div class="d-flex justify-content-center">
                                <div class="spinner-border" role="status">
                                    <span class="visually-hidden"
                                        >Loading...</span
                                    >
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            <div class="row mb-3">
                                <div class="col-12 col-md-4">
                                    <label class="form-label" for="nameInput"
                                        >Nombre</label
                                    >
                                </div>
                                <div class="col-12 col-md-8">
                                    <div
                                        class="input-group input-group-outline"
                                        :class="{
                                            'is-invalid':
                                                props.validationErrorStatus
                                                    .name,
                                        }"
                                    >
                                        <input
                                            class="form-control"
                                            id="nameInput"
                                            type="text"
                                            v-model="localActivityData.name"
                                        />
                                    </div>
                                    <div class="invalid-feedback">
                                        {{ props.validationErrorMessage.name }}
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-12 col-md-4">
                                    <label
                                        class="form-label"
                                        for="maxStudentsInput"
                                        >Máximo de estudiantes</label
                                    >
                                </div>
                                <div class="col-12 col-md-8">
                                    <div
                                        class="input-group input-group-outline"
                                        :class="{
                                            'is-invalid':
                                                props.validationErrorStatus
                                                    .maxStudents,
                                        }"
                                    >
                                        <input
                                            class="form-control"
                                            id="maxStudentsInput"
                                            type="number"
                                            v-model="
                                                localActivityData.maxStudents
                                            "
                                            @input="filterNumberInput"
                                        />
                                    </div>
                                    <div class="invalid-feedback">
                                        {{
                                            props.validationErrorMessage
                                                .maxStudents
                                        }}
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-12 col-md-4">
                                    <label
                                        class="form-label"
                                        for="instructorInput"
                                        >Instructor</label
                                    >
                                </div>
                                <div class="col-12 col-md-8">
                                    <div
                                        class="input-group input-group-outline"
                                        :class="{
                                            'is-invalid':
                                                props.validationErrorStatus
                                                    .instructor,
                                        }"
                                    >
                                        <select
                                            class="form-control form-select"
                                            id="instructorInput"
                                            v-model="
                                                localActivityData.instructor
                                            "
                                        >
                                            <option
                                                v-if="instructorError"
                                                value=""
                                                selected
                                                disabled
                                            >
                                                No se pudo obtener la lista de
                                                instructores
                                            </option>
                                            <option
                                                v-else
                                                selected
                                                hidden
                                                disabled
                                            >
                                                Selecciona
                                            </option>
                                            <option
                                                v-for="instructor in instructors"
                                                :key="instructor"
                                                :value="instructor.id"
                                            >
                                                {{ instructor.usuario.nombre }}
                                                {{
                                                    instructor.usuario.apellido
                                                }}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="invalid-feedback">
                                        {{
                                            props.validationErrorMessage
                                                .instructor
                                        }}
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-12 col-md-4">
                                    <label
                                        class="form-label"
                                        for="lacationInput"
                                        >Ubicación</label
                                    >
                                </div>
                                <div class="col-12 col-md-8">
                                    <div
                                        class="input-group input-group-outline"
                                        :class="{
                                            'is-invalid':
                                                props.validationErrorStatus
                                                    .location,
                                        }"
                                    >
                                        <select
                                            class="form-control form-select"
                                            id="locationInput"
                                            v-model="localActivityData.location"
                                        >
                                            <option
                                                v-if="locationError"
                                                value=""
                                                selected
                                                disabled
                                            >
                                                No se pudo obtener la lista de
                                                ubicaciones
                                            </option>
                                            <option
                                                v-else
                                                selected
                                                hidden
                                                disabled
                                            >
                                                Selecciona
                                            </option>
                                            <option
                                                v-for="location in locations"
                                                :key="location"
                                                :value="location.id"
                                            >
                                                {{ location.nombre }}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="invalid-feedback">
                                        {{
                                            props.validationErrorMessage
                                                .location
                                        }}
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-12 col-md-4">
                                    <label
                                        class="form-label"
                                        for="startDateInput"
                                        >Fecha de inicio</label
                                    >
                                </div>
                                <div class="col-12 col-md-8">
                                    <div
                                        class="input-group input-group-outline"
                                        :class="[
                                            {
                                                'transparent-placeholder':
                                                    !localActivityData.startDate,
                                                'is-invalid':
                                                    props.validationErrorStatus
                                                        .startDate,
                                            },
                                        ]"
                                    >
                                        <input
                                            class="form-control"
                                            id="startDateInput"
                                            type="date"
                                            v-model="
                                                localActivityData.startDate
                                            "
                                            onfocus="this.showPicker()"
                                            onkeydown="return false;"
                                        />
                                    </div>
                                    <div class="invalid-feedback">
                                        {{
                                            props.validationErrorMessage
                                                .startDate
                                        }}
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-12 col-md-4">
                                    <label class="form-label" for="endDateInput"
                                        >Fecha de fin</label
                                    >
                                </div>
                                <div class="col-12 col-md-8">
                                    <div
                                        class="input-group input-group-outline"
                                        :class="[
                                            {
                                                'transparent-placeholder':
                                                    !localActivityData.endDate,
                                                'is-invalid':
                                                    props.validationErrorStatus
                                                        .endDate,
                                            },
                                        ]"
                                    >
                                        <input
                                            class="form-control"
                                            id="endDateInput"
                                            type="date"
                                            v-model="localActivityData.endDate"
                                            onfocus="this.showPicker()"
                                            onkeydown="return false;"
                                        />
                                    </div>
                                    <div class="invalid-feedback">
                                        {{
                                            props.validationErrorMessage.endDate
                                        }}
                                    </div>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <div class="col-12 col-md-4">
                                    <label
                                        class="form-label"
                                        for="capacityInput"
                                        >Días</label
                                    >
                                </div>
                                <div class="col-12 col-md-8">
                                    <div
                                        class="row row-cols-2 row-cols-sm-3 row-cols-md-4 g-2"
                                    >
                                        <div class="col">
                                            <div class="form-check ps-0">
                                                <input
                                                    class="form-check-input"
                                                    type="checkbox"
                                                    id="checkMonday"
                                                    v-model="
                                                        selectedDays.monday
                                                    "
                                                />
                                                <label
                                                    class="form-check-label"
                                                    for="checkMonday"
                                                    >Lunes</label
                                                >
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="form-check ps-0">
                                                <input
                                                    class="form-check-input"
                                                    type="checkbox"
                                                    id="checkTuesday"
                                                    v-model="
                                                        selectedDays.tuesday
                                                    "
                                                />
                                                <label
                                                    class="form-check-label"
                                                    for="checkTuesday"
                                                    >Martes</label
                                                >
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="form-check ps-0">
                                                <input
                                                    class="form-check-input"
                                                    type="checkbox"
                                                    id="checkWednesday"
                                                    v-model="
                                                        selectedDays.wednesday
                                                    "
                                                />
                                                <label
                                                    class="form-check-label"
                                                    for="checkWednesday"
                                                    >Miércoles</label
                                                >
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="form-check ps-0">
                                                <input
                                                    class="form-check-input"
                                                    type="checkbox"
                                                    id="checkThursday"
                                                    v-model="
                                                        selectedDays.thursday
                                                    "
                                                />
                                                <label
                                                    class="form-check-label"
                                                    for="checkThursday"
                                                    >Jueves</label
                                                >
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="form-check ps-0">
                                                <input
                                                    class="form-check-input"
                                                    type="checkbox"
                                                    id="checkFriday"
                                                    v-model="
                                                        selectedDays.friday
                                                    "
                                                />
                                                <label
                                                    class="form-check-label"
                                                    for="checkFriday"
                                                    >Viernes</label
                                                >
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="form-check ps-0">
                                                <input
                                                    class="form-check-input"
                                                    type="checkbox"
                                                    id="checkSaturday"
                                                    v-model="
                                                        selectedDays.saturday
                                                    "
                                                />
                                                <label
                                                    class="form-check-label"
                                                    for="checkSaturday"
                                                    >Sábado</label
                                                >
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="form-check ps-0">
                                                <input
                                                    class="form-check-input"
                                                    type="checkbox"
                                                    id="checkSunday"
                                                    v-model="
                                                        selectedDays.sunday
                                                    "
                                                />
                                                <label
                                                    class="form-check-label"
                                                    for="checkSunday"
                                                    >Domingo</label
                                                >
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <label v-if="selectedDays.monday">Lunes</label>
                            <div class="row mb-3" v-if="selectedDays.monday">
                                <div class="col-12 col-md-4">
                                    <label
                                        class="form-label"
                                        for="mondayStartInput"
                                        >Hora de inicio</label
                                    >
                                </div>
                                <div class="col-12 col-md-8">
                                    <div
                                        class="input-group input-group-outline"
                                        :class="{
                                            'transparent-placeholder':
                                                !localActivityData.mondayStart,
                                            'is-invalid':
                                                props.validationErrorStatus
                                                    .mondayStart,
                                        }"
                                    >
                                        <input
                                            class="form-control"
                                            id="mondayStartInput"
                                            type="time"
                                            v-model="
                                                localActivityData.mondayStart
                                            "
                                            onfocus="this.showPicker()"
                                        />
                                    </div>
                                    <div class="invalid-feedback">
                                        {{
                                            props.validationErrorMessage
                                                .mondayStart
                                        }}
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3" v-if="selectedDays.monday">
                                <div class="col-12 col-md-4">
                                    <label
                                        class="form-label"
                                        for="mondayEndInput"
                                        >Hora de fin</label
                                    >
                                </div>
                                <div class="col-12 col-md-8">
                                    <div
                                        class="input-group input-group-outline"
                                        :class="{
                                            'transparent-placeholder':
                                                !localActivityData.mondayEnd,
                                            'is-invalid':
                                                props.validationErrorStatus
                                                    .mondayEnd,
                                        }"
                                    >
                                        <input
                                            class="form-control"
                                            id="mondayEndInput"
                                            type="time"
                                            v-model="
                                                localActivityData.mondayEnd
                                            "
                                            onfocus="this.showPicker()"
                                        />
                                    </div>
                                    <div class="invalid-feedback">
                                        {{
                                            props.validationErrorMessage
                                                .mondayEnd
                                        }}
                                    </div>
                                </div>
                            </div>
                            <label v-if="selectedDays.tuesday">Martes</label>
                            <div class="row mb-3" v-if="selectedDays.tuesday">
                                <div class="col-12 col-md-4">
                                    <label
                                        class="form-label"
                                        for="tuesdayStartInput"
                                        >Hora de inicio</label
                                    >
                                </div>
                                <div class="col-12 col-md-8">
                                    <div
                                        class="input-group input-group-outline"
                                        :class="{
                                            'transparent-placeholder':
                                                !localActivityData.tuesdayStart,
                                            'is-invalid':
                                                props.validationErrorStatus
                                                    .tuesdayStart,
                                        }"
                                    >
                                        <input
                                            class="form-control"
                                            id="tuesdayStartInput"
                                            type="time"
                                            v-model="
                                                localActivityData.tuesdayStart
                                            "
                                            onfocus="this.showPicker()"
                                        />
                                    </div>
                                    <div class="invalid-feedback">
                                        {{
                                            props.validationErrorMessage
                                                .tuesdayStart
                                        }}
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3" v-if="selectedDays.tuesday">
                                <div class="col-12 col-md-4">
                                    <label
                                        class="form-label"
                                        for="tuesdayEndInput"
                                        >Hora de fin</label
                                    >
                                </div>
                                <div class="col-12 col-md-8">
                                    <div
                                        class="input-group input-group-outline"
                                        :class="{
                                            'transparent-placeholder':
                                                !localActivityData.tuesdayStart,
                                            'is-invalid':
                                                props.validationErrorStatus
                                                    .tuesdayEnd,
                                        }"
                                    >
                                        <input
                                            class="form-control"
                                            id="tuesdayEndInput"
                                            type="time"
                                            v-model="
                                                localActivityData.tuesdayEnd
                                            "
                                            onfocus="this.showPicker()"
                                        />
                                    </div>
                                    <div class="invalid-feedback">
                                        {{
                                            props.validationErrorMessage
                                                .tuesdayEnd
                                        }}
                                    </div>
                                </div>
                            </div>
                            <label v-if="selectedDays.wednesday"
                                >Miércoles</label
                            >
                            <div class="row mb-3" v-if="selectedDays.wednesday">
                                <div class="col-12 col-md-4">
                                    <label
                                        class="form-label"
                                        for="wednesdayStartInput"
                                        >Hora de inicio</label
                                    >
                                </div>
                                <div class="col-12 col-md-8">
                                    <div
                                        class="input-group input-group-outline"
                                        :class="{
                                            'transparent-placeholder':
                                                !localActivityData.wednesdayStart,
                                            'is-invalid':
                                                props.validationErrorStatus
                                                    .wednesdayStart,
                                        }"
                                    >
                                        <input
                                            class="form-control"
                                            id="tuesdayStartInput"
                                            type="time"
                                            v-model="
                                                localActivityData.wednesdayStart
                                            "
                                            onfocus="this.showPicker()"
                                        />
                                    </div>
                                    <div class="invalid-feedback">
                                        {{
                                            props.validationErrorMessage
                                                .wednesdayStart
                                        }}
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3" v-if="selectedDays.wednesday">
                                <div class="col-12 col-md-4">
                                    <label
                                        class="form-label"
                                        for="wednesdayEndInput"
                                        >Hora de fin</label
                                    >
                                </div>
                                <div class="col-12 col-md-8">
                                    <div
                                        class="input-group input-group-outline"
                                        :class="{
                                            'transparent-placeholder':
                                                !localActivityData.wednesdayEnd,
                                            'is-invalid':
                                                props.validationErrorStatus
                                                    .wednesdayEnd,
                                        }"
                                    >
                                        <input
                                            class="form-control"
                                            id="wednesdayEndInput"
                                            type="time"
                                            v-model="
                                                localActivityData.wednesdayEnd
                                            "
                                            onfocus="this.showPicker()"
                                        />
                                    </div>
                                    <div class="invalid-feedback">
                                        {{
                                            props.validationErrorMessage
                                                .wednesdayEnd
                                        }}
                                    </div>
                                </div>
                            </div>
                            <label v-if="selectedDays.thursday">Jueves</label>
                            <div class="row mb-3" v-if="selectedDays.thursday">
                                <div class="col-12 col-md-4">
                                    <label
                                        class="form-label"
                                        for="thursdayStartInput"
                                        >Hora de inicio</label
                                    >
                                </div>
                                <div class="col-12 col-md-8">
                                    <div
                                        class="input-group input-group-outline"
                                        :class="{
                                            'transparent-placeholder':
                                                !localActivityData.thursdayStart,
                                            'is-invalid':
                                                props.validationErrorStatus
                                                    .thursdayStart,
                                        }"
                                    >
                                        <input
                                            class="form-control"
                                            id="tuesdayStartInput"
                                            type="time"
                                            v-model="
                                                localActivityData.thursdayStart
                                            "
                                            onfocus="this.showPicker()"
                                        />
                                    </div>
                                    <div class="invalid-feedback">
                                        {{
                                            props.validationErrorMessage
                                                .thursdayStart
                                        }}
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3" v-if="selectedDays.thursday">
                                <div class="col-12 col-md-4">
                                    <label
                                        class="form-label"
                                        for="thursdayEndInput"
                                        >Hora de fin</label
                                    >
                                </div>
                                <div class="col-12 col-md-8">
                                    <div
                                        class="input-group input-group-outline"
                                        :class="{
                                            'transparent-placeholder':
                                                !localActivityData.thursdayEnd,
                                            'is-invalid':
                                                props.validationErrorStatus
                                                    .thursdayEnd,
                                        }"
                                    >
                                        <input
                                            class="form-control"
                                            id="thursdayEndInput"
                                            type="time"
                                            v-model="
                                                localActivityData.thursdayEnd
                                            "
                                            onfocus="this.showPicker()"
                                        />
                                    </div>
                                    <div class="invalid-feedback">
                                        {{
                                            props.validationErrorMessage
                                                .thursdayEnd
                                        }}
                                    </div>
                                </div>
                            </div>
                            <label v-if="selectedDays.friday">Viernes</label>
                            <div class="row mb-3" v-if="selectedDays.friday">
                                <div class="col-12 col-md-4">
                                    <label
                                        class="form-label"
                                        for="fridayStartInput"
                                        >Hora de inicio</label
                                    >
                                </div>
                                <div class="col-12 col-md-8">
                                    <div
                                        class="input-group input-group-outline"
                                        :class="{
                                            'transparent-placeholder':
                                                !localActivityData.fridayStart,
                                            'is-invalid':
                                                props.validationErrorStatus
                                                    .fridayStart,
                                        }"
                                    >
                                        <input
                                            class="form-control"
                                            id="tuesdayStartInput"
                                            type="time"
                                            v-model="
                                                localActivityData.fridayStart
                                            "
                                            onfocus="this.showPicker()"
                                        />
                                    </div>
                                    <div class="invalid-feedback">
                                        {{
                                            props.validationErrorMessage
                                                .fridayStart
                                        }}
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3" v-if="selectedDays.friday">
                                <div class="col-12 col-md-4">
                                    <label
                                        class="form-label"
                                        for="fridayEndInput"
                                        >Hora de fin</label
                                    >
                                </div>
                                <div class="col-12 col-md-8">
                                    <div
                                        class="input-group input-group-outline"
                                        :class="{
                                            'transparent-placeholder':
                                                !localActivityData.fridayEnd,
                                            'is-invalid':
                                                props.validationErrorStatus
                                                    .fridayEnd,
                                        }"
                                    >
                                        <input
                                            class="form-control"
                                            id="wednesdayEndInput"
                                            type="time"
                                            v-model="
                                                localActivityData.fridayEnd
                                            "
                                            onfocus="this.showPicker()"
                                        />
                                    </div>
                                    <div class="invalid-feedback">
                                        {{
                                            props.validationErrorMessage
                                                .fridayEnd
                                        }}
                                    </div>
                                </div>
                            </div>
                            <label v-if="selectedDays.saturday">Sábado</label>
                            <div class="row mb-3" v-if="selectedDays.saturday">
                                <div class="col-12 col-md-4">
                                    <label
                                        class="form-label"
                                        for="saturdayStartInput"
                                        >Hora de inicio</label
                                    >
                                </div>
                                <div class="col-12 col-md-8">
                                    <div
                                        class="input-group input-group-outline"
                                        :class="{
                                            'transparent-placeholder':
                                                !localActivityData.saturdayStart,
                                            'is-invalid':
                                                props.validationErrorStatus
                                                    .saturdayStart,
                                        }"
                                    >
                                        <input
                                            class="form-control"
                                            id="tuesdayStartInput"
                                            type="time"
                                            v-model="
                                                localActivityData.saturdayStart
                                            "
                                            onfocus="this.showPicker()"
                                        />
                                    </div>
                                    <div class="invalid-feedback">
                                        {{
                                            props.validationErrorMessage
                                                .saturdayStart
                                        }}
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3" v-if="selectedDays.saturday">
                                <div class="col-12 col-md-4">
                                    <label
                                        class="form-label"
                                        for="saturdayEndInput"
                                        >Hora de fin</label
                                    >
                                </div>
                                <div class="col-12 col-md-8">
                                    <div
                                        class="input-group input-group-outline"
                                        :class="{
                                            'transparent-placeholder':
                                                !localActivityData.saturdayEnd,
                                            'is-invalid':
                                                props.validationErrorStatus
                                                    .saturdayEnd,
                                        }"
                                    >
                                        <input
                                            class="form-control"
                                            id="wednesdayEndInput"
                                            type="time"
                                            v-model="
                                                localActivityData.saturdayEnd
                                            "
                                            onfocus="this.showPicker()"
                                        />
                                    </div>
                                    <div class="invalid-feedback">
                                        {{
                                            props.validationErrorMessage
                                                .saturdayEnd
                                        }}
                                    </div>
                                </div>
                            </div>
                            <label v-if="selectedDays.sunday">Domingo</label>
                            <div class="row mb-3" v-if="selectedDays.sunday">
                                <div class="col-12 col-md-4">
                                    <label
                                        class="form-label"
                                        for="sundayStartInput"
                                        >Hora de inicio</label
                                    >
                                </div>
                                <div class="col-12 col-md-8">
                                    <div
                                        class="input-group input-group-outline"
                                        :class="{
                                            'transparent-placeholder':
                                                !localActivityData.sundayStart,
                                            'is-invalid':
                                                props.validationErrorStatus
                                                    .sundayStart,
                                        }"
                                    >
                                        <input
                                            class="form-control"
                                            id="tuesdayStartInput"
                                            type="time"
                                            v-model="
                                                localActivityData.sundayStart
                                            "
                                            onfocus="this.showPicker()"
                                        />
                                    </div>
                                    <div class="invalid-feedback">
                                        {{
                                            props.validationErrorMessage
                                                .sundayStart
                                        }}
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3" v-if="selectedDays.sunday">
                                <div class="col-12 col-md-4">
                                    <label
                                        class="form-label"
                                        for="sundayEndInput"
                                        >Hora de fin</label
                                    >
                                </div>
                                <div class="col-12 col-md-8">
                                    <div
                                        class="input-group input-group-outline"
                                        :class="{
                                            'transparent-placeholder':
                                                !localActivityData.sundayEnd,
                                            'is-invalid':
                                                props.validationErrorStatus
                                                    .sundayEnd,
                                        }"
                                    >
                                        <input
                                            class="form-control"
                                            id="wednesdayEndInput"
                                            type="time"
                                            v-model="
                                                localActivityData.sundayEnd
                                            "
                                            onfocus="this.showPicker()"
                                        />
                                    </div>
                                    <div class="invalid-feedback">
                                        {{
                                            props.validationErrorMessage
                                                .sundayEnd
                                        }}
                                    </div>
                                </div>
                            </div>

                            <div class="w-100 text-end">
                                <div
                                    v-if="!props.externalLoading"
                                    role="button"
                                    class="btn bg-gradient-dark mt-3"
                                    @click="createActivity"
                                >
                                    Crear
                                </div>
                                <div
                                    v-if="props.externalLoading"
                                    role="button"
                                    class="btn bg-gradient-dark mt-3 px-4"
                                >
                                    <div
                                        class="spinner-border spinner-border-sm"
                                        role="status"
                                    >
                                        <span class="visually-hidden"
                                            >Loading...</span
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted, watch, computed } from 'vue';
    import { useSnackbar } from 'vue3-snackbar';

    import InstructorsService from '@/services/useInstructors';
    import LocationsService from '@/services/useLocations';

    const snackbar = useSnackbar();

    const emit = defineEmits([
        'sendActivityData',
        'update:activityData',
        'update:validationErrorStatus',
        'update:validationErrorMessage',
    ]);
    const props = defineProps({
        activityData: Object,
        validationErrorStatus: Object,
        validationErrorMessage: Object,
        externalLoading: Boolean,
    });
    const isLoading = ref(false);
    const instructorError = ref(false);
    const locationError = ref(false);

    const selectedDays = ref({
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
    });

    const days = [
        { key: 'monday', label: 'LUNES' },
        { key: 'tuesday', label: 'MARTES' },
        { key: 'wednesday', label: 'MIERCOLES' },
        { key: 'thursday', label: 'JUEVES' },
        { key: 'friday', label: 'VIERNES' },
        { key: 'saturday', label: 'SABADO' },
        { key: 'sunday', label: 'DOMINGO' },
    ];

    const horarios = computed(() => {
        return days
            .filter((d) => selectedDays.value[d.key])
            .map((d) => ({
                dia: d.label,
                horaInicio:
                    localActivityData.value[`${d.key}Start`] || '00:00:00',
                horaFin: localActivityData.value[`${d.key}End`] || '00:00:00',
                fechaInicio: localActivityData.value.startDate,
                fechaFin: localActivityData.value.endDate
            }));
    });

    const localActivityData = ref({
        ...props.activityData,
        mondayStart: '',
        mondayEnd: '',
        tuesdayStart: '',
        tuesdayEnd: '',
        wednesdayStart: '',
        wednesdayEnd: '',
        thursdayStart: '',
        thursdayEnd: '',
        fridayStart: '',
        fridayEnd: '',
        saturdayStart: '',
        saturdayEnd: '',
        sundayStart: '',
        sundayEnd: '',
        schedule: horarios,
    });

    watch(
        localActivityData,
        (newVal) => {
            emit('update:activityData', newVal);
        },
        { deep: true }
    );

    const instructors = ref([]);
    const locations = ref([]);

    const resetValues = () => {
        emit('update:activityData', {
            name: '',
            startDate: '',
            endDate: '',
            startHour: '',
            endHour: '',
            day: '',
            maxStudents: null,
            instructor: null,
            location: '',
        });
    };

    const resetErrorStatusAndMessages = () => {
        emit('update:validationErrorStatus', {
            name: false,
            startDate: false,
            endDate: false,
            startHour: false,
            endHour: false,
            day: false,
            maxStudents: false,
            instructor: false,
            location: false,
        });

        emit('update:validationErrorMessage', {
            name: '',
            startDate: '',
            endDate: '',
            startHour: '',
            endHour: '',
            day: '',
            maxStudents: '',
            instructor: '',
            location: '',
        });
    };

    const queryInstructors = async () => {
        await InstructorsService.getInstructors()
            .then((response) => {
                instructors.value = response;
            })
            .catch((error) => {
                if (error) {
                    instructorError.value = true;
                    let message =
                        'Ha ocurrido un error al obtener la lista de instructores. Por favor intenta de nuevo más tarde.';

                    if (error.type === 'backend') {
                        message = error.message;
                    } else if (error.type === 'network') {
                        message = error.message;
                    } else if (error.type === 'unknown') {
                        message = error.message;
                    }

                    snackbar.add({
                        type: 'error',
                        text: message,
                    });
                }
            });
    };

    const queryLocations = async () => {
        await LocationsService.getLocations()
            .then((response) => {
                locations.value = response;
            })
            .catch((error) => {
                locationError.value = true;
                if (error) {
                    let message =
                        'Ha ocurrido un error al obtener la lista de ubicaciones. Por favor intenta de nuevo más tarde.';

                    if (error.type === 'backend') {
                        message = error.message;
                    } else if (error.type === 'network') {
                        message = error.message;
                    } else if (error.type === 'unknown') {
                        message = error.message;
                    }

                    snackbar.add({
                        type: 'error',
                        text: message,
                    });
                }
            });
    };

    onMounted(async () => {
        isLoading.value = true;
        await queryInstructors();
        await queryLocations();
        resetValues();
        resetErrorStatusAndMessages();
        isLoading.value = false;
    });

    const createActivity = () => {
        emit('sendActivityData', 'create');
    };

    const filterNumberInput = (e) => {
        let cleanedValue = e.target.value.replace(/[^\d]/g, '');
        e.target.value = cleanedValue;
        cleanedValue = cleanedValue.slice(0, 3);
        localActivityData.value.maxStudents = cleanedValue;
    };
</script>

<style scoped>
    input[type='number']::-webkit-inner-spin-button,
    input[type='number']::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    .transparent-placeholder::-webkit-datetime-edit {
        color: transparent;
    }

    .transparent-placeholder:focus::-webkit-datetime-edit {
        color: initial;
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

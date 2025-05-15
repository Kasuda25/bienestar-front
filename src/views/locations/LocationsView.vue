<template>
    <router-view
        v-model:locationData="locationData"
        v-model:validationErrorStatus="validationErrorStatus"
        v-model:validationErrorMessage="validationErrorMessage"
        :locations="locations"
        :external-loading="isLoading"
        :list-error="listError"
        :key="viewKey"
        @sendLocationData="validateLocationData"
        @deleteLocation="deleteLocation"
    />
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useSnackbar } from 'vue3-snackbar';

    import LocationService from '@/services/useLocations';

    const router = useRouter();
    const snackbar = useSnackbar();

    const isLoading = ref(false);
    const listError = ref(false);
    const viewKey = ref(0);

    const locations = ref();
    const locationData = ref({
        name: '',
        capacity: '',
        schedule: [],
        id: null,
    });

    const queryLocations = async () => {
        try {
            locations.value = await LocationService.getLocations();
        } catch (error) {
            if (error) {
                listError.value = true;
                let message =
                    'Ha ocurrido un error al obtener la lista de ubicaciones. Por favor intenta de nuevo más tarde.';

                if (
                    error.type === 'backend' ||
                    error.type === 'network' ||
                    error.type === 'unknown'
                ) {
                    message = error.message;
                }

                snackbar.add({
                    type: 'error',
                    text: message,
                });
            }
        }
    };

    onMounted(async () => {
        await queryLocations();
    });

    const validationErrorStatus = ref({
        name: false,
        capacity: false,
        schedule: false,
    });

    const validationErrorMessage = ref({
        name: '',
        capacity: '',
        schedule: '',
    });

    const validateLocationData = async (operation) => {
        if (locationData.value.name === '' || !locationData.value.name) {
            validationErrorStatus.value.name = true;
            validationErrorMessage.value.name = 'El nombre es obligatorio';
        } else {
            validationErrorStatus.value.name = false;
            validationErrorMessage.value.name = '';
        }

        if (
            locationData.value.capacity === '' ||
            !locationData.value.capacity
        ) {
            validationErrorStatus.value.capacity = true;
            validationErrorMessage.value.capacity =
                'La capacidad es obligatoria';
        } else {
            validationErrorStatus.value.capacity = false;
            validationErrorMessage.value.capacity = '';
        }

        if (!locationData.value.schedule || !locationData.value.schedule[0]) {
            validationErrorStatus.value.schedule = true;
            snackbar.add({
                type: 'error',
                text: 'El horario es obligatorio',
            });
        } else {
            validationErrorStatus.value.schedule = false;
        }

        if (
            !validationErrorStatus.value.name &&
            !validationErrorStatus.value.capacity &&
            !validationErrorStatus.value.schedule
        ) {
            sendlocationData(operation);
        }
    };

    const sendlocationData = async (operation) => {
        try {
            isLoading.value = true;
            let response;

            if (operation === 'create') {
                response = await LocationService.createLocation({
                    nombre: locationData.value.name,
                    capacidad: locationData.value.capacity,
                    horarios: locationData.value.schedule,
                });
            }

            if (operation === 'update') {
                response = await LocationService.putLocation(
                    locationData.value.id,
                    {
                        nombre: locationData.value.name,
                        capacidad: locationData.value.capacity,
                        horarios: locationData.value.schedule,
                    }
                );
            }

            if (response) {
                await queryLocations();
                isLoading.value = false;

                if (operation === 'create') {
                    snackbar.add({
                        type: 'success',
                        text: 'ubicación creada exitosamente',
                    });

                    resetValues();

                    router.push({
                        name: 'locations-detail',
                        params: { id: response.id },
                    });
                }

                if (operation === 'update') {
                    snackbar.add({
                        type: 'success',
                        text: 'ubicación actualizada exitosamente',
                    });

                    viewKey.value++;
                }
            }
        } catch (error) {
            if (error) {
                isLoading.value = false;
                snackbar.add({
                    type: 'error',
                    text: error.message,
                });
            }
        }
    };

    const resetValues = () => {
        locationData.value = {
            name: '',
            capacity: '',
            schedule: '',
        };
    };

    const deleteLocation = async (id) => {
        try {
            isLoading.value = true;
            const response = await LocationService.deleteLocation(id);

            if (response) {
                await queryLocations();
                isLoading.value = false;
                snackbar.add({
                    type: 'success',
                    text: 'Se ha eliminado la ubicación',
                });

                router.go(-1);
            }
        } catch (error) {
            isLoading.value = false;
            let message =
                'Ha ocurrido un error al tratar de eliminar la ubicación. Por favor intenta de nuevo más tarde.';

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
    };
</script>

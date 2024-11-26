<template>
    <div class="modal" @click.self="$emit('close')">
        <div class="modal-content">
            <h2>Asignar Curso</h2>
            <form @submit.prevent="asignarCurso">
                <div class="form-group">
                    <label for="nombreUsuario">Se asignará a: {{ usuario.nombreUsuario }}</label>
                </div>
                <div class="form-group">
                    <select v-model="selectedCursoId">
                        <option v-for="curso in cursosDisponibles" :key="curso.idCurso" :value="curso.idCurso">
                            {{ curso.nombreCurso }}
                        </option>
                    </select>
                    <!--<p>{{ selectedCursoId }}</p> -->
                    <!--<p>{{ usuario.idUsuario }}</p> -->
                </div>

                <button type="submit">Asignar Curso</button>
                <button type="button" @click="$emit('close')">Cancelar</button>
            </form>
        </div>
    </div>
</template>

<script>
import AdminService from '@/services/AdminService';
export default {
    name: 'AsignarCursoComp',
    computed: {
        cursosDisponibles() {
            return this.cursos;
        }
    },
    props: {
        usuario: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            cursos: [],
            selectedCursoId: null,
        };
    },
    mounted() {
        this.loadCursos();
    },
    created() {
        this.loadCursos();
    },
    methods: {
        async loadCursos() {
            try {
                const response = await AdminService.mostrarCursosSimple();
                this.cursos = response;
                console.log('Cursos cargados:', this.cursos)
                console.log(response)
            } catch (error) {
                console.error('Error al cargar los cursos:', error);
            }
        },
        async asignarCurso() {
            if (!this.selectedCursoId) {
                alert('Por favor, seleccione un curso');
                return;
            }
            try {
                const response = await AdminService.asignarCursoToUsuario(this.selectedCursoId, this.usuario.idUsuario);
                console.log('Curso asignado correctamente');
                this.$emit('curso-asignado');
            } catch (error) {
                console.error('Error al asignar curso:', error);
            }
        },
    }
};
</script>

<style scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    width: 400px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input,
select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

button {
    background-color: #333;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
    margin-bottom: 10px; /* Añade este margen para separar los botones */

}

button:hover {
    background-color: #555;
}
</style>
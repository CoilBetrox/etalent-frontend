<template>
    <div class="modal" @click.self="$emit('close')">
        <div class="modal-content">
            <h2>Agregar Usuarios Masivamente</h2>
            <p>Descargue <a :href="downloadLink" download>aquí</a> el formato para cargar usuarios masivamente</p>
            <form @submit.prevent="uploadExcelFile">
                <div class="form-group">
                    <label for="fileUpload">Subir Archivo Excel</label>
                    <input id="fileUpload" type="file" @change="handleFileUpload" accept=".xlsx, .xls" required>
                </div>
                <button type="submit">Subir y Agregar Usuarios</button>
                <button type="button" @click="$emit('close')">Cancelar</button>
            </form>
        </div>
    </div>
</template>

<script>
import * as XLSX from 'xlsx';
import AdminService from '@/services/AdminService';

export default {
    name: 'AgregarMasivoComp',
    data() {
        return {
            excelData: null,
            downloadLink: '/FormatoCargaMasiva.xlsx'
        };
    },
    methods: {
        handleFileUpload(event) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                this.excelData = XLSX.utils.sheet_to_json(worksheet);
            };

            reader.readAsArrayBuffer(file);
        },
        async uploadExcelFile() {
            if (this.excelData) {
                const usuariosDtos = this.excelData.map(row => ({
                    nombreUsuario: row.nombreUsuario,
                    sapUsuario: row.sapUsuario,
                    correoUsuario: row.correoUsuario,
                    cargoUsuario: row.cargoUsuario,
                    zonaUsuario: row.zonaUsuario,
                    empresaUsuario: row.empresaUsuario,
                    provinciaUsuario: row.provinciaUsuario,
                    tiendaUsuario: row.tiendaUsuario,
                    jornadaUsuario: row.jornadaUsuario,
                    estadoUsuario: 'Activo',
                    rolUsuario: {
                        id_rol_usuario: 6,
                        nombre_rol_usuairo: 'Empleado Clave'
                    }
                }));
                try {
                    const response = await AdminService.addUsersBulk(usuariosDtos);
                    console.log('Usuarios agregados:', response);
                    this.$emit('close');
                } catch (error) {
                    console.error('Error al agregar usuarios:', error);
                }
            }
        }
    }
};
</script>

<style scoped>
.modal {
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: #fefefe;
    padding: 20px;
    border-radius: 5px;
    width: 80%;
    max-width: 500px;
}

h2 {
    color: #333;
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input[type="file"] {
    display: block;
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 10px;
}

button[type="button"] {
    background-color: #f44336;
}

button:hover {
    opacity: 0.8;
}
</style>
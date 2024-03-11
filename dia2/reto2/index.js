const mongoose = require('mongoose');

const { TeachersModel } = require('./models/teachers');
const { MarksModel } = require('./models/marks');
const { SubjectsModel } = require('./models/subjects');
const { StudentsModel } = require('./models/students');

const urlLocal = 'mongodb://localhost:27017/school';
const urlRemoto = 'mongodb+srv://mmeneses73:' + encodeURIComponent('Meneses23') + '@cluster0.uydobrj.mongodb.net/school';

// Conectar a la base de datos (local o remota)
mongoose.connect(urlRemoto);

// Datos de estudiantes
const estudiantes = [
    { first_name: 'Ignacio', last_name: 'Martínez' },
    { first_name: 'Sandra', last_name: 'Meneses' },
    { first_name: 'Jana', last_name: 'Rodríguez' }
];

// Datos de profesores
const profesores = [
    { first_name: 'Jose', last_name: 'López', group: ['Html'] },
    { first_name: 'Jorge', last_name: 'Rodríguez', group: ['Angular'] },
    { first_name: 'Ruben', last_name: 'González', group: ['MongoDB'] }
];

// Datos de asignaturas
const asignaturas = [
    { title: 'Html' },
    { title: 'Angular' },
    { title: 'MongoDB' }
];

// Datos de notas
const notas = [
    { date: new Date(), mark: 5 },
    { date: new Date(), mark: 9 },
    { date: new Date(), mark: 3 }
];

async function insertarDatos() {
    try {
        // Insertar estudiantes
        for (const estudiante of estudiantes) {
            const nuevoEstudiante = new StudentsModel(estudiante);
            await nuevoEstudiante.save();
            console.log(`Estudiante ${estudiante.first_name} ${estudiante.last_name} guardado correctamente.`);

            // Asignar un profesor aleatorio a cada estudiante
            const profesorAleatorio = profesores[Math.floor(Math.random() * profesores.length)];
            nuevoEstudiante.teacher = profesorAleatorio._id;
            await nuevoEstudiante.save();
            console.log(`Profesor asignado a ${estudiante.first_name} ${estudiante.last_name}: ${profesorAleatorio.first_name} ${profesorAleatorio.last_name}`);

            // Insertar notas para el estudiante
            const notaAleatoria = notas[Math.floor(Math.random() * notas.length)];
            const nuevaNota = new MarksModel({
                student: nuevoEstudiante._id,
                date: notaAleatoria.date,
                mark: notaAleatoria.mark
            });
            await nuevaNota.save();
            console.log(`Nota para ${estudiante.first_name} ${estudiante.last_name}: ${notaAleatoria.mark}`);
        }
    } catch (error) {
        console.error('Error al guardar los datos:', error);
    }
}

// Ejecutar la función para insertar datos
insertarDatos();



async function mostrarInformacionAlumno(nombreEstudiante) {
    try {
        // Buscar al estudiante por nombre
        const estudiante = await StudentsModel.findOne({ first_name: nombreEstudiante });

        if (!estudiante) {
            console.log(`No se encontró al estudiante con el nombre: ${nombreEstudiante}`);
            return;
        }

        // Obtener las notas del estudiante
        const notasEstudiante = await MarksModel.find({ student: estudiante._id });
        console.log(`Notas de ${nombreEstudiante}:`);
        for (const nota of notasEstudiante) {
            console.log(`- Fecha: ${nota.date}, Calificación: ${nota.mark}`);
        }

        // Obtener las asignaturas del estudiante
        const asignaturasEstudiante = await SubjectsModel.find({ _id: { $in: estudiante.subjects } });
        console.log(`Asignaturas de ${nombreEstudiante}:`);
        for (const asignatura of asignaturasEstudiante) {
            console.log(`- ${asignatura.title}`);
        }

        // Obtener los profesores del estudiante
        const profesoresEstudiante = await TeachersModel.find({ _id: estudiante.teacher });
        console.log(`Profesores de ${nombreEstudiante}:`);
        for (const profesor of profesoresEstudiante) {
            console.log(`- ${profesor.first_name} ${profesor.last_name}`);
        }
    } catch (error) {
        console.error('Error al obtener la información del estudiante:', error);
    }
}

// Agrega un retraso de 3 segundos antes de ejecutar la función
setTimeout(() => {
    mostrarInformacionAlumno('Sandra');
}, 3000);



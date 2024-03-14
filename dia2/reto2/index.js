const mongoose = require('mongoose');
const password = require('./models/var');

const { TeachersModel } = require('./models/teachers');
const { MarksModel } = require('./models/marks');
const { SubjectsModel } = require('./models/subjects');
const { StudentsModel } = require('./models/students');

const urlLocal = 'mongodb://localhost:27017/school';
const urlRemoto = 'mongodb+srv://mmeneses73:' + encodeURIComponent(password) + '@cluster0.uydobrj.mongodb.net/school';

// Conectar a la base de datos (local o remota)
mongoose.connect(urlLocal);

async function insertarDatos() {
    try {
        // Crear y guardar las asignaturas en la base de datos
        const asignaturasData = [
            { title: 'Html' },
            { title: 'Angular' },
            { title: 'MongoDB' }
        ];
        const asignaturas = [];
        for (const asignaturaData of asignaturasData) {
            const nuevaAsignatura = new SubjectsModel(asignaturaData);
            await nuevaAsignatura.save();
            asignaturas.push(nuevaAsignatura);
        }

        // Crear y guardar los profesores en la base de datos
        const profesoresData = [
            { first_name: 'Jose', last_name: 'López' },
            { first_name: 'Ruben', last_name: 'González' }
            // Añade más profesores aquí
        ];
        const profesores = [];
        for (const profesorData of profesoresData) {
            const nuevoProfesor = new TeachersModel(profesorData);
            await nuevoProfesor.save();
            profesores.push(nuevoProfesor);
        }

        // Crear y guardar las notas en la base de datos
        const notasData = [
            { date: new Date(), mark: 8 },
            { date: new Date(), mark: 9 },
            { date: new Date(), mark: 10 }
            // Añade más notas aquí
        ];
        const notas = [];
        for (const notaData of notasData) {
            const nuevaNota = new MarksModel(notaData);
            await nuevaNota.save();
            notas.push(nuevaNota);
        }

        // Datos de estudiantes
        const estudiantes = [
            { first_name: 'Ignacio', last_name: 'Martínez' },
            { first_name: 'Sandra', last_name: 'Meneses' },
            { first_name: 'Jana', last_name: 'Rodríguez' }
        ];

        // Insertar estudiantes
        for (const estudiante of estudiantes) {
            const nuevoEstudiante = new StudentsModel(estudiante);

            // Asignar un profesor aleatorio a cada estudiante
            const profesorAleatorio = profesores[Math.floor(Math.random() * profesores.length)];
            nuevoEstudiante.teacher = profesorAleatorio._id;

            // Asignar una asignatura aleatoria a cada estudiante
            const asignaturaAleatoria = asignaturas[Math.floor(Math.random() * asignaturas.length)];
            nuevoEstudiante.subject = asignaturaAleatoria._id;

            // Guardar el estudiante después de asignarle el profesor y la asignatura
            await nuevoEstudiante.save();

            console.log(`Estudiante ${estudiante.first_name} ${estudiante.last_name} guardado correctamente.`);
            console.log(`Profesor asignado a ${estudiante.first_name} ${estudiante.last_name}: ${profesorAleatorio.first_name} ${profesorAleatorio.last_name}`);
            console.log(`Asignatura asignada a ${estudiante.first_name} ${estudiante.last_name}: ${asignaturaAleatoria.title}`);
        }
    } catch (error) {
        console.error('Error insertando datos:', error);
    }
}

insertarDatos();



async function mostrarInformacionAlumno(nombreEstudiante) {
    try {
        // Buscar al estudiante por nombre
        const estudiante = await StudentsModel.findOne({ first_name: nombreEstudiante }).populate('teacher').populate('mark').populate('subject');

        if (!estudiante) {
            console.log(`No se encontró al estudiante con el nombre: ${nombreEstudiante}`);
            return;
        }

        // Mostrar el profesor del estudiante
        if (estudiante.teacher) {
            console.log(`Profesor de ${nombreEstudiante}: ${estudiante.teacher.first_name} ${estudiante.teacher.last_name}`);
        } else {
            console.log(`No se encontró un profesor para el estudiante ${nombreEstudiante}`);
        }

        // Mostrar las asignaturas del estudiante
        console.log(`Asignaturas de ${nombreEstudiante}:`);
        if (estudiante.subject && estudiante.subject.length > 0) {
            for (const asignatura of estudiante.subject) {
                console.log(`- ${asignatura.title}`);
            }
        } else {
            console.log(`No se encontraron asignaturas para el estudiante ${nombreEstudiante}`);
        }

        // Obtener las notas del estudiante
        console.log(`Notas de ${nombreEstudiante}:`);
        if (estudiante.mark && estudiante.mark.length > 0) {
            for (const nota of estudiante.mark) {
                console.log(`- Fecha: ${nota.date}, Calificación: ${nota.mark}`);
            }
        } else {
            console.log(`No se encontraron notas para el estudiante ${nombreEstudiante}`);
        }
    } catch (error) {
        console.error('Error al obtener la información del estudiante:', error);
    }
}

// Añadir un retraso de 3 segundos antes de ejecutar la función
setTimeout(() => {
    mostrarInformacionAlumno('Jana');
}, 3000);

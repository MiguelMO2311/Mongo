const mongoose = require('mongoose');

const { StudentsModel} = require('./models/students');
const { MarksModel} = require('./models/marks');
const { TeachersModel} = require('./models/teachers');
const { SubjectsModel} = require('./models/subjects');

const urlLocal = 'mongodb://localhost:27017/school';
const urlRemoto = 'mongodb+srv://mmeneses73:' + encodeURIComponent('Meneses23') + '@cluster0.uydobrj.mongodb.net/';

// Para conectar a la BD, si no existe, la crea.
mongoose.connect(urlLocal);


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
    { date: new Date(), mark: 'Aprobado' },
    { date: new Date(), mark: 'Sobresaliente' },
    { date: new Date(), mark: 'Suspenso' }
];

// Función para insertar todos los datos
async function insertarDatos() {
    try {
        // Insertar estudiantes
        for (const estudiante of estudiantes) {
            const nuevoEstudiante = new StudentsModel(estudiante);
            await nuevoEstudiante.save();
            console.log(`Estudiante ${estudiante.first_name} ${estudiante.last_name} guardado correctamente.`);
        }

        // Insertar profesores
        for (const profesor of profesores) {
            const nuevoProfesor = new TeachersModel(profesor);
            await nuevoProfesor.save();
            console.log(`Profesor ${profesor.first_name} ${profesor.last_name} guardado correctamente.`);
        }

        // Insertar asignaturas
        for (const asignatura of asignaturas) {
            const nuevaAsignatura = new SubjectsModel(asignatura);
            await nuevaAsignatura.save();
            console.log(`Asignatura ${asignatura.title} guardada correctamente.`);
        }

        // Insertar notas
        for (const nota of notas) {
            const nuevaNota = new MarksModel(nota);
            await nuevaNota.save();
            console.log(`Nota ${nota.mark} guardada correctamente.`);
        }

        console.log('Todos los datos insertados correctamente.');
    } catch (error) {
        console.error('Error al guardar los datos:', error);
    }
}

insertarDatos();
// Función para insertar notas a un estudiante
function insertMarks(student, subject, marks) {
    
    // Buscamos al estudiante por su nombre
    const foundStudent = students.find(s => s.first_name === student);
    if (!foundStudent) {
        console.log(`No se encontró al estudiante ${student}.`);
        return;
    }

    // Actualizamos las notas del estudiante
    foundStudent.mark = marks.join(',');

    console.log(`Notas de ${student} en ${subject}: ${marks.join(', ')}`);
}


// .Mostrar todas las notas de un alumno (reemplaza 'Sandra' con el nombre del alumno)
StudentsModel.findOne({ first_name: 'Sandra' })
    .then((student) => {
        if (!student) {
            console.log('No se encontró ningún estudiante con ese nombre.');
            return;
        }

        console.log(`Notas de Sandra: ${student.mark}`);
    })
    .catch((error) => {
        console.error('Error al buscar el estudiante:', error);
    });


// .Mostrar todos los profesores de un alumno (reemplaza 'Juan' con el nombre del alumno)
StudentsModel.findOne({ first_name: 'Jana' })
    .then((student) => {
        TeachersModel.find({ group: { $in: student.group } }) // Utiliza student.group como un array
            .then((teachers) => {
                console.log('Profesores de Jana:', teachers);
            });
    });

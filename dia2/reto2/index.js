const mongoose = require('mongoose');

const { TeachersModel} = require('./models/teachers');
const { MarksModel } = require('./models/marks');
const { SubjectsModel } = require('./models/subjects');
const { StudentsModel } = require('./models/students');

const urlLocal = 'mongodb://localhost:27017/school';
const urlRemoto = 'mongodb+srv://mmeneses73:' + encodeURIComponent('Meneses23') + '@cluster0.uydobrj.mongodb.net/';

// Conectar a la base de datos (local o remota)
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

async function insertarDatos() {
    try {
        // Insertar estudiantes
        for (const estudiante of estudiantes) {
            const nuevoEstudiante = new StudentsModel(estudiante);
            await nuevoEstudiante.save();
            console.log(`Estudiante ${estudiante.first_name} ${estudiante.last_name} guardado correctamente.`);

            // Asignar un profesor aleatorio a cada estudiante
            const profesorAleatorio = profesores[Math.floor(Math.random() * profesores.length)];
            nuevoEstudiante.teacher = profesorAleatorio;
            await nuevoEstudiante.save();
            console.log(`Profesor asignado a ${estudiante.first_name} ${estudiante.last_name}: ${profesorAleatorio.first_name} ${profesorAleatorio.last_name}`);

            // Insertar notas para el estudiante
            const notaAleatoria = notas[Math.floor(Math.random() * notas.length)];
            const nuevaNota = new MarksModel({
                student: nuevoEstudiante,
                date: notaAleatoria.date,
                mark: notaAleatoria.mark
            });
            await nuevaNota.save();
            console.log(`Nota para ${estudiante.first_name} ${estudiante.last_name}: ${notaAleatoria.mark}`);
        }

        // Insertar asignaturas
        for (const asignatura of asignaturas) {
            const nuevaAsignatura = new SubjectsModel(asignatura);
            await nuevaAsignatura.save();
            console.log(`Asignatura ${asignatura.title} guardada correctamente.`);
        }

        console.log('Todos los datos insertados correctamente.');
    } catch (error) {
        console.error('Error al guardar los datos:', error);
    }
}


insertarDatos();


async function main() {
    try {

        // Muestra todas las notas de Sandra
        const notasSandra = await MarksModel.find({ 'student.first_name': 'Sandra' });
        console.log('Notas de Sandra:');
        notasSandra.forEach(nota => {
            console.log(`- Fecha: ${nota.date}, Nota: ${nota.mark}`);
        });

        // Muestra todas las asignaturas de Jana
        const asignaturasJana = await SubjectsModel.find();
        console.log('Asignaturas de Jana:');
        asignaturasJana.forEach(asignatura => {
            console.log(`- ${asignatura.title}`);
        });

        // Muestra todos los profesores de Ignacio
        const profesoresIgnacio = await StudentsModel.findOne({ 'first_name': 'Ignacio' }).populate('teachers');
        console.log('Profesores de Ignacio:');
        console.log(`- ${profesoresIgnacio.teacher.first_name} ${profesoresIgnacio.teacher.last_name}`);
    } catch (error) {
        console.error('Error:', error);
    }
}

main();

const mongoose = require('mongoose');
const password = require('./models/var');

const { TeachersModel } = require('./models/teachers');
const { MarksModel } = require('./models/marks');
const { SubjectsModel } = require('./models/subjects');
const { StudentsModel } = require('./models/students');

const urlLocal = 'mongodb://localhost:27017/school';
const urlRemoto = 'mongodb+srv://mmeneses73:' + encodeURIComponent(password) + '@cluster0.uydobrj.mongodb.net/school';

// Conectar a la base de datos (local o remota)
mongoose.connect(urlRemoto);

// Datos de estudiantes
const estudiantes = [
    { first_name: 'Ignacio', last_name: 'Martínez' },
    { first_name: 'Sandra', last_name: 'Meneses' },
    { first_name: 'Jana', last_name: 'Rodríguez' }
];

// // Datos de profesores
// const profesores = [
//     { first_name: 'Jose', last_name: 'López', group: ['Html'] },
//     { first_name: 'Jorge', last_name: 'Rodríguez', group: ['Angular'] },
//     { first_name: 'Ruben', last_name: 'González', group: ['MongoDB'] }
// ];


// // Datos de notas
// const notas = [
//     { date: new Date('2024/02/01'), mark: 5 },
//     { date: new Date('2024/02/01'), mark: 9 },
//     { date: new Date('2024/02/01'), mark: 3 }
// ];
// // Crear y guardar las asignaturas en la base de datos
// const asignaturasData = [
//     { title: 'Html' },
//     { title: 'Angular' },
//     { title: 'MongoDB' }
// ];

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

            // Asignar una asignatura aleatoria a cada estudiante
            const asignaturaAleatoria = asignaturas[Math.floor(Math.random() * asignaturas.length)];
            nuevoEstudiante.subject = asignaturaAleatoria._id;
            await nuevoEstudiante.save();
            console.log(`Asignatura asignada a ${estudiante.first_name} ${estudiante.last_name}: ${asignaturaAleatoria.title}`);

            // Asignar una nota aleatoria a cada estudiante
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
if (notasEstudiante.length > 0) {
    for (const nota of notasEstudiante) {
        console.log(`- Fecha: ${nota.date}, Calificación: ${nota.mark}`);
    }
} else {
    console.log(`No se encontraron notas para el estudiante ${nombreEstudiante}`);
}


      // Obtener las asignaturas del estudiante
const asignaturaEstudiante = await SubjectsModel.findOne({ _id: estudiante.subject });
if (asignaturaEstudiante) {
    console.log(`Asignatura de ${nombreEstudiante}: ${asignaturaEstudiante.title}`);
} else {
    console.log(`No se encontró una asignatura para el estudiante ${nombreEstudiante}`);
}

// Obtener los profesores del estudiante
const profesorEstudiante = await TeachersModel.findOne({ _id: estudiante.teacher });
if (profesorEstudiante) {
    console.log(`Profesor de ${nombreEstudiante}: ${profesorEstudiante.first_name} ${profesorEstudiante.last_name}`);
} else {
    console.log(`No se encontró un profesor para el estudiante ${nombreEstudiante}`);
}
    } catch (error) {
        console.error('Error al obtener la información del estudiante:', error);
    }
}

// Añadir un retraso de 3 segundos antes de ejecutar la función
setTimeout(() => {
    mostrarInformacionAlumno('Jana');
}, 3000);





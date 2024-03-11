const mongoose = require('mongoose');
const {PhotosModel}=require('./photos')

const urlLocal = 'mongodb://localhost:27017/photos';
const urlRemoto = 'mongodb+srv://mmeneses73:' + encodeURIComponent('Meneses23') + '@cluster0.uydobrj.mongodb.net/photos';

// Para conectar a la BD, si no existe, la crea.
mongoose.connect(urlRemoto);

// Función para subir fotos
async function subirFotos() {
    const usuarios = ['Pepe', 'Luisa', 'Ana'];
    const urls = [
        'https://www.pepe.com/chat?form=abcd',
        'https://www.luisa.com/chat?form=xyz',
        'https://www.ana.com/chat?form=123',
    ];
    const titulos = ['Vacaciones en la playa', 'Amanecer en la montaña', 'Paseo por el parque'];
    const descripciones = ['Disfrutando del sol y la arena', 'Vistas impresionantes', 'Día soleado y relajante'];

    try {
        for (let i = 0; i < usuarios.length; i++) {
            const nuevaFoto = new PhotosModel({
                user: usuarios[i],
                url: urls[i],
                title: titulos[i],
                description: descripciones[i],
            });
            await nuevaFoto.save();
            console.log(`Foto de ${usuarios[i]} guardada correctamente.`);
        }
    } catch (error) {
        console.error('Error al guardar las fotos:', error);
    }
}

subirFotos('María', 'https://example.com/foto1.jpg', 'Vacaciones en la playa', 'Disfrutando del sol y la arena');
subirFotos('Pedro', 'https://example.com/foto2.jpg', 'Amanecer en la montaña', 'Vistas impresionantes');
subirFotos('Ana', 'https://example.com/foto3.jpg', 'Paseo por el parque', 'Día soleado y relajante');

// Función para obtener todas las fotos de un usuario
async function obtenerFotosPorUsuario(usuario) {
    try {
        const fotos = await PhotosModel.find({ user: usuario });
        console.log(`Fotos del usuario: ${usuario}`);
    } catch (error) {
        console.error('Error al obtener las fotos:', error);
    }
}

obtenerFotosPorUsuario('María');

// Función para modificar la descripción de una foto por título
async function modificarDescripcionFotoPorTitulo(titulo, nuevaDescripcion) {
    try {
        await PhotosModel.updateOne({ title: titulo }, { description: nuevaDescripcion });
        console.log(`Descripción ${nuevaDescripcion} modificada correctamente.`);
    } catch (error) {
        console.error('Error al modificar la descripción:', error);
    }
}

modificarDescripcionFotoPorTitulo('Vacaciones en la playa', 'Jugando al voleibol');

// Función para eliminar una foto por título
async function eliminarFotoPorTitulo(usuario, titulo) {
    try {
        await PhotosModel.deleteOne({ user: usuario, title: titulo });
        console.log(`Foto ${titulo} eliminada correctamente.`);
    } catch (error) {
        console.error('Error al eliminar la foto:', error);
    }
}

// eliminarFotoPorTitulo('Pedro', 'Amanecer en la montaña');

// Función para eliminar todas las fotos de un usuario
async function eliminarTodasLasFotosPorUsuario(usuario) {
    try {
        await PhotosModel.deleteMany({ user: usuario });
        console.log(`Todas las fotos de los usuarios ${usuario} eliminadas correctamente.`);
    } catch (error) {
        console.error('Error al eliminar todas las fotos:', error);
    }
}

eliminarTodasLasFotosPorUsuario('Ana');

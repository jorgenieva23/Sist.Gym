import dotenv from "dotenv";
dotenv.config();
import mongoose from 'mongoose';
import app from './app';

const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGODB_URI!, {
})
.then(() => console.log('Conectado a MongoDB'))
.catch((error) => console.error(error));

const db = mongoose.connection;

db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Conectado a la base de datos'));

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

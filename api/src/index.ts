// import dotenv from "dotenv";
// dotenv.config()
// import mongoose from "mongoose";
// import app from "./app";

// // const HOST = "www.bymgym.com.ar"
// const PORT = process.env.PORT || 3001

// mongoose.connect(process.env.MONGODB_URI!,{})
// .then(()=>console.log("Connected a MongoDB"))
// .catch((error)=>console.error(error))

// const db = mongoose.connection

// db.on("error", (error)=>console.error(error))
// db.once("open",()=>console.log("conectado a la base de datos"))

// // app.listen(PORT, ()=>{
// //     console.log(`Servidor escuchando en el puerto ${HOST}:${PORT}/api/socios/1g2g144875329s6d2vb1gh4h75839e23d2`)
// // })

// app.listen(PORT, () => {
//     console.log(`Servidor escuchando en el puerto ${PORT}`);
//   });
  

import * as dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose';
import app from './app';

console.log(process.env.MONGODB_URI);


const PORT = process.env.PORT || 3001;

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI!, {
 // useNewUrlParser: true,
 // useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch((error) => console.error(error));

// Configurar eventos para la conexión de MongoDB
const db = mongoose.connection;

db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Conectado a la base de datos'));

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

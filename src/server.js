// const express = require ('express'); // vamos a trabajar con export e import  no con require

//importanmos dependencias de librerias antes de los ficheros si los hay.
import express from 'express'; //quitar los bigotes por defecto
import 'dotenv/config';
import { dbConnection } from './database/db.js';
// import  authRoutes  from './routes/auth.routes.js'; // no lleva bigotes porque es default, puedes poner el nombre que quieras porque es el default.
import router from './routes/router.js'; 

const app = express();

//parsea el body
app.use(express.json())

const PORT = process.env.PORT || 4001;

//API routes
app.get('/api/healthy', (req , res) =>{
    res.status(200).json(
        {
            success: true,
            message: "server is healthy"
        }
    )
});

app.use('/api', router);


dbConnection()
.then(()=>{
    console.log('Database connected');
    // run the server on port
    app.listen(PORT,()=>{
        console.log(`server running on port ${PORT}`)
    })
})
.catch(error => {
    console.log (error)
});




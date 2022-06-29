const express = require('express');
const router = express.Router()
const mysql = require('mysql')


//mysql

// //creando conexion
/* const connection = mysql.createConnection({
    //connectionLimit : 10,
    host: 'localhost',
    user: 'root', 
    password: '',
     database: 'crudNode'

 }) */

 const connection = mysql.createConnection({
    host: 'd5c8y7saavsm.us-east-2.psdb.cloud',
    user: 'q88rttdpobfx',
    password: 'pscale_pw_t7MJ3z4nBIYC2kyGDqq97ZEg8qT2jWvDJWyR7bv18TI',
    database: 'crudnode',
    ssl: true
})

 connection.connect(err => {
    if (err) {
      console.error('An error occurred while connecting to the DB')
      throw err
    }
    console.log('Conectado con el identificador ' + connection.threadId);
  })



//definiendo las rutas 

router.get('/', (req, res)=>{

    //realizando las query

    connection.query('SELECT * FROM `tareas`', function (error, results) {
        if (error) throw error; 
        console.log(results);  
        res.render('index.ejs', {
            data : results
        });
    });

    //Fin realizando las query
  

});

router.post('/add', (req, res)=>{
       
     const elemento = { 
         tarea: req.body.tarea,
         importancia: req.body.importancia,
         fecha: Date()
     }
     console.log(`${elemento.fecha}`);
    const query = connection.query(`insert into tareas (importancia, descripcion, fecha) values('${elemento.importancia}', '${elemento.tarea}', '${elemento.fecha}')`, (err, customer) => {
        if (err) throw err
      res.redirect('/');
    })  
});

router.get('/update/:id',(req, res)=>{ 
    const  elemento  = req.params;
    let id = elemento.id
    connection.query("SELECT * FROM tareas WHERE id = ?", id, (err, rows) => {
        res.render('customers_edit.ejs', {
            data: rows[0]
          })  
    });
}); 

//voy por aui
router.post('/update/:id', (req, res)=>{ 
    const id = req.params;
    const newElemento = req.body

    connection.query(`UPDATE tareas set importancia = '${newElemento.importancia}', descripcion = '${newElemento.tarea}', fecha = "${Date()}" where id = ${id.id}` , (err, rows) => {
        if (err) throw err
        res.redirect('/');
        console.log(rows);
      }); 
});

router.get('/delete/:id', (req, res)=>{
    const id = req.params;
    connection.query(`Delete from tareas where id = ${id.id}` , (err, rows) => {
        res.redirect('/');
      }); 
});

    
//exportando archivo
module.exports = router;



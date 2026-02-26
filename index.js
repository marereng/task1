import express from 'express';
import noteRouter from './routes/notes.js'; 
import mongoose from 'mongoose';
import { Post } from './models/index.js'; 

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/notes', noteRouter);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({error: err.message});
});

app.use((err, req, res, next) => {
    res.status(500);
    res.json({
        result: 'fail',
        error:err.message
    })
});

app.use((req, res, next) => {
    res.status(404);
    res.send({
        result: 'fail',
        error: `Page not found ${req.path}`
    })
});


mongoose.connect('mongodb+srv://user_maretha:26011998@kada.rigglbs.mongodb.net/?appName=KADA')
.then(() => {
    return console.log("✅ Berhasil terhubung ke MongoDB!");  
  })

app.listen(3000, () => {
    console.log('Server berjalan di http://localhost:3000');
});


// // using middleware
// // app.use((req, res, next) => {
// //     console.log(`Jalan ke Middleware sebelum ke sini ${req.path}`);
// //     next();
// // });

// // using error middleware
// // app.use((req, res, next) => {
// //     if (false){
// //         next(new Error('Yeay'));
// //         return;
// //     }
// //     next();
// // });

// app.get('/', (req, res) => { 
//     res.send('Rere sukses');
// });

// app.get('')

// // error handling
app.use((er, req, res, next) => {
    console.log('Error:', er);
    res.send('Error Occured');
});

// // using path parameter
// // app.get('/:greeting', (req, res) => {
// //     const { greeting } = req.params;
// //     res.send(greeting);
// // });

// app.get('/maretha', (req, res) => {
//     res.send('enaknya digaji tanpa kerja');
// });

// app.get('/nasikotak', (req, res) => {
//      res.status(401).send("nasi kotak isi nasi uduk, ayam sambal matah, sebuah apel, dan juga air putih");
// });s

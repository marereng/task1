import express from 'express';

const app = express();

// using middleware
// app.use((req, res, next) => {
//     console.log(`Jalan ke Middleware sebelum ke sini ${req.path}`);
//     next();
// });

// using error middleware
app.use((req, res, next) => {
    if (false){
        next(new Error('Yeay'));
        return;
    }
    next();
});

app.get('/', (req, res) => { 
    res.send('Rere sukses');
});

app.use((er, req, res, next) => {
    res.send('Error Occured');
});



// using path parameter
// app.get('/:greeting', (req, res) => {
//     const { greeting } = req.params;
//     res.send(greeting);
// });



app.listen(3000, () => {
    console.log('Server berjalan di http://localhost:3000');
});

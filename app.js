import express from 'express';
import fs from 'fs';
const app = express();



app.get('/', (req, res) => {
    // fs.readFile('notes.txt', 'utf8', (err, data) => {
    //     if (err) {
    //         return res.status(500).send('Could not read notes.txt');
    //     }
    //     res.type('text/plain').send(data);
    // });

// });
fs.writeFile('notes.txt', 'Hello World df ss 45 5 55', (err, data) => {
    if (err) {
        return res.status(500).send('Could not write notes.txt');
    }
    res.type('text/plain').send('File written successfully');
});
});


app.get('/file', (req, res) => {
    fs.readFile('notes.txt', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Could not read notes.txt');
        }
        res.type('text/plain').send(data);
    });

});


// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// }); 

export default app;


// import multer from 'multer'; import path from 'path';
//  import fs from 'fs';

//  const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname);
//     }
//  });

//  const upload = multer({ storage: storage });

 

//  export default upload;
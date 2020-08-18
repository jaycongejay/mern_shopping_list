const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const cors = require('cors');
// const config = require('config');


const app = express();

app.use(bodyParser.json());

const port = process.env.PORT || 5000;


const db = require('./config/keys').mongoURI;

// app.use(cors());
// app.use(express.json()); // Parse json

////// Mongo DB connection ////////////////////////////

mongoose.connect(db, { dbName: 'shopping_list', useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
                .then(() => {
                    console.log('Connected to MongoDB!')
                }).catch(err => console.log(err));
                
                

///////////////////////////////////////////////////////

// const exerciseRouter = require('./routes/exercises');
// const userRouter = require('./routes/users');
// const authRouter = require('./routes/auth');
const items = require('./routes/api/items');

app.use('/api/items', items);
// app.use('/users', userRouter);
// app.use('/auth', authRouter);


// app.get('/', (req, res) => {
//     res.send('We are on home');
// });

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
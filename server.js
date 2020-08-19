const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();
// const cors = require('cors');
///////////////////////////////////////////////////////


const app = express();

// app.use(cors());
app.use(bodyParser.json());
// app.use(express.json()); // Parse json

const port = process.env.PORT || 5000;




////// Mongo DB connection ////////////////////////////
mongoose.connect(process.env.MONGO_URI, { dbName: 'shopping_list', useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
                .then(() => {
                    console.log('Connected to MongoDB!')
                }).catch(err => console.log(err));
///////////////////////////////////////////////////////

// const exerciseRouter = require('./routes/exercises');
// const userRouter = require('./routes/users');
// const authRouter = require('./routes/auth');
const items = require('./routes/api/items');
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');

app.use('/api/items', items);
app.use('/api/users', users);
app.use('/api/auth', auth);


// app.get('/', (req, res) => {
//     res.send('We are on home');
// });


// For PRODUCTION mode (when production mode, automatically access the npm run build file)
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'clinet', 'build', 'index.html'));
    })
}



app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
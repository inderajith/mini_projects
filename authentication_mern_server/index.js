const express = require('express')
const mongoose = require('mongoose');
const authrouter = require('./src/routes/authRoutes');
const eventrouter = require('./src/routes/eventRoutes')

const app = express()

mongoose.connect('mongodb://localhost:27017/eventusNative', {useCreateIndex:true, useUnifiedTopology:true, useNewUrlParser:true});

app.use(express.json())
app.use(authrouter)
app.use(eventrouter)



app.get('/', (req, res) => {
    res.send('this is home')
})

const PORT = 3000

app.listen(PORT, () => {
    console.log('server started on port 3000')
})
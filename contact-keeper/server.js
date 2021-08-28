const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/users');
const contactRoutes = require('./routes/contacts');
const authRoutes = require('./routes/auth');``

const PORT = process.env.PORT || 5000;

// Express
const app = express();
app.use(express.json({extended: false}));

// Connect DB
connectDB();

//Routes
//------
app.get('/', (req,res) => res.json({msg: 'Hello World'}));
app.use('/api/users', userRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, ()=> console.log(`Server Started on port ${PORT}`));
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
const Task = require('./models/Task');
const taskRoutes = require('./routes/taskRoutes');

// Middleware
app.use(express.json());

// Connect to MongoDB
//mongodb+srv://infoflingo:3zAgNuRKGfGJAkDF@cluster0.juqjumg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
mongoose.connect('mongodb+srv://infoflingo:3zAgNuRKGfGJAkDF@cluster0.juqjumg.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/api', taskRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

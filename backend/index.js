const express = require('express');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;
const app = express();

const bookRoutes = require('./routes/bookRoutes');

require('dotenv').config();
connectDB();

app.use('/books', bookRoutes);

app.get('/', (req, res) => {
    res.send('Server Running Successfully');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const app = express();
const cors = require("cors");
app.use(cors());

connectDB();
const PORT = process.env.PORT || 5000;
const bookRoutes = require('./routes/bookRoutes');
app.use(express.json());
app.use('/books', bookRoutes);
app.get('/', (req, res) => {
    res.send('Success running server');
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

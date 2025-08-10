const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes')

const app = express();
app.use(express.json());
app.use('/api/auth',authRoutes);
app.use('/api/notes', noteRoutes);
connectDB().then(()=>{
    app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});
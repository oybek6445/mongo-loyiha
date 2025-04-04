require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { swaggerUi, specs } = require('./config/swagger');
const connectDB = require('./config/db');
const authRoute = require('./route/authRoute');
const subjectRoute = require('./route/subjectRoute');
const gradeRoute = require('./route/gradeRoute');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/auth', authRoute);
app.use('/subjects', subjectRoute);
app.use('/grades', gradeRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

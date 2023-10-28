import express from 'express';
import getStudents from './controller/studentController.js';
import checkAuth from './middlewares/checkAuth.js';
import login from './controller/userController.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.status(200).json({"message":"App is live!!"});
});

app.get('/students',checkAuth, getStudents);
app.post('/login', login);


export default app;

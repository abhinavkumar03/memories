import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import dotenv from 'dotenv';
dotenv.config();



const app = express();


app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/user', userRoutes);

app.get('/', (req,res) => {
    res.send('APP IS RUNNING');
});

// connection
const CONNECTION_URL = process.env.CONNECTION_URL || "mongodb://ak2711474:ak2711474@ac-pjsrkgs-shard-00-00.dxx9jxd.mongodb.net:27017,ac-pjsrkgs-shard-00-01.dxx9jxd.mongodb.net:27017,ac-pjsrkgs-shard-00-02.dxx9jxd.mongodb.net:27017/?ssl=true&replicaSet=atlas-6w9zwt-shard-0&authSource=admin&retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error));

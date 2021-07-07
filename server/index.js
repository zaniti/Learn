import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import routes from './routes/routes.js';
import dotenv  from "dotenv";

dotenv.config({ path: '../.env' });
const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());


// MongoDB Setup
const db = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }) // useNewUrlParser & useUnifiedTopology this make sure to don't get any warning in console
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false); // this make sure to don't get any warning in console.


app.use('/', routes);
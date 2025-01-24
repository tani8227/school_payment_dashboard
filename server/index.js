import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from './config/passport/passport-jwt.js';
import db from './config/mongoose/mongoose.js';
import routes from './routes/index.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;


// Middleware
app.use(cors({
    origin: `${process.env.APP_REQUEST_ORIGIN_UR}`,  
    methods: ['GET', 'POST'],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Passport
app.use(passport.initialize());

// Routes
app.use('/', routes);

// Test Route
app.get('/test', (req, res) => {
    res.send('Server is working!');
});

// Start server
app.listen(port, (err) => {
    if (err) {
        console.log("Error in running the server: ", err);
    } else {
        console.log(`Server is running on port: ${port}`);
    }
});

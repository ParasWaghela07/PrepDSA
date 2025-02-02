const express = require('express');
const app = express();
const cors = require('cors');
const cookieparser = require('cookie-parser');
const dbconnect = require('./config/database');
const cloudinary = require("./config/cloudinary");
const router = require('./routes/route');
const fileUpload = require('express-fileupload');
const aptitudeRoutes = require("./routes/aptitudeRoutes.js"); // ✅ Corrected
require('dotenv').config();
const PORT = process.env.PORT;






app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}))

app.use(express.json());
app.use(cookieparser());
cloudinary.cloudinaryConnect();
app.use(router);
app.use('/api/aptitude', aptitudeRoutes);

app.get('/', (req, res) => {
    res.send("Helloooo....")
})

dbconnect();

app.listen(PORT, () => {
    console.log(`APP IS RUNNING ON PORT ${PORT}`)
});

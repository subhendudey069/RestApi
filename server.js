require('dotenv').config()

const express = require('express')
const cors = require('cors');

const app = express()
app.use(cors());
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser : true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const subscribersRouter = require('./routes/subscribers')
app.use('/subscribers',subscribersRouter)
//'localhost:3000/subscribers/sdfsdf'

// Serve the HTML file from the "routes" folder
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'routes', 'index.html'));
  });
  
  const port = process.env.PORT || 3000; // Use the PORT environment variable or fallback to port 3000
  app.listen(port, () => console.log(`Server started on port ${port}`));

//app.listen(3000, () => console.log('Server started'));
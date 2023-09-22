const express = require('express')
const db =require('./db')
const cors = require('cors')

const app = express()
const port = 5000

app.use(express.json())
app.use(cors())

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
app.use('/api/notes',require("./routes/notes"))
app.use('/api/auth',require('./routes/auth'))

app.listen(port, () => {
  console.log(`Notebook app listening on port http://localhost:${port}`)
})

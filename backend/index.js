const express = require('express')
const cors = require('cors')
const connectDB = require('./mongoose')
const loginRoute = require('./routes/login.routes')
const electionRoute = require("./routes/election.routes")
const candidateRoute = require("./routes/candidate.routes")
const voteRoutes = require('./routes/vote.routes')

const app = express()


app.use(cors({
    origin:"*"
}))
app.use(express.json())

const port = 5000

try {
    (async function (){
        await connectDB()
        app.listen(port, ()=>console.log("Server running on port :" +port))
    }())
} catch (error) {
    console.log(error)
}

app.use('/user',loginRoute)
app.use('/election',electionRoute)
app.use('/candidate', candidateRoute)
app.use('/vote', voteRoutes)
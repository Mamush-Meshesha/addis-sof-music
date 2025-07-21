import express from "express"
import dotenv from "dotenv"
import cors from "cors"
dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/",(req, res) => {
    res.send("Well come to addis song player")
})

app.listen(PORT, () => {
    console.log(`server is finely running on ${PORT}`)
})
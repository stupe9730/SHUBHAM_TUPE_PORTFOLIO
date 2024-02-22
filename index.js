const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config({ path: "./.env" }
)
const path = require("path")

mongoose.connect(process.env.MONGO_URL)
const app = express()
app.use(express.json())

app.use(express.static(path.join(__dirname, "dist")))
app.use(express.static("uploads"))
app.use(cors({ origin: "https://shubham-tupe-portfolio2.onrender.com", credentials: true }))
// app.use(cors())
app.use("/api/admin", require("./routes/adminRoute"))
app.use("/api/project", require("./routes/projectRoute"))




app.use("*", (req, res) => {
    // res.status(404).json({ message: "Resource Not Found" })
    res.sendFile(path.join(__dirname, "dist", "index.html"))
})

mongoose.connection.once("open", () => {
    console.log("MONGO CONNECTED")
    app.listen(process.env.PORT, console.log("server running"))
})
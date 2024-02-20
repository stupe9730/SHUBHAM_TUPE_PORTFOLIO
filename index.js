const express = require("express")
const cors = require("cors")
const path = require("path")
require("dotenv").config({ path: "./.env" }
)

const app = express()
app.use(express.static(path.join(__dirname, "dist")))
app.use(express.json())
// app.use(cors({ origin: "http://localhost:5173" }))
app.use(cors())
app.use("/api/admin", require("./routes/adminRoute"))

app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"))
})

app.listen(process.env.PORT, console.log("server running"))
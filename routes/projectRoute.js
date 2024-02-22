const { addProject, getProject, updateProject, deleteProject } = require("../controller/ProjectController")


const router = require("express").Router()

router
    .post("/add-Project", addProject)
    .get("/get-Project", getProject)
    .put("/update-Project/:id", updateProject)
    .delete("/delete-Project/:id", deleteProject)
module.exports = router

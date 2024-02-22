const Projects = require("../model/Projects")
const { uploadProfile } = require("../utils/upload")
const fs = require("fs/promises")
const path = require("path")

exports.addProject = async (req, res) => {
    try {
        uploadProfile(req, res, async err => {
            console.log(req.body)
            if (err) {
                return res.status(400).json({ message: err.message || "unable to upload image" })
            }
            if (req.file) {
                await Projects.create({ ...req.body, hero: req.file.filename })
            } else {
                await Projects.create(req.body)
            }
            res.status(201).json({ message: "add Poject  Success" })
        })
        // res.status(200).json({ message: "Project Add Success" })
    } catch (error) {
        res.status(500).json({ message: error.message || "Something is Wrong" })

    }
}
exports.getProject = async (req, res) => {
    try {
        const result = await Projects.find()
        res.status(200).json({ message: "Project Get Success", result })
    } catch (error) {
        res.status(500).json({ message: error.message || "Something is Wrong" })
    }
}
exports.updateProject = async (req, res) => {
    try {
        const { id } = req.params
        await Projects.findByIdAndUpdate(id, req.body)
        res.status(200).json({ message: "Project Update Success" })
    } catch (error) {
        res.status(500).json({ message: error.message || "Something is Wrong" })
    }
}
exports.deleteProject = async (req, res) => {
    try {
        const { id } = req.params
        const result = await Projects.findById(id)
        await fs.unlink(path.join(__dirname, "..", "uploads", result.hero))
        await Projects.findByIdAndDelete(id)
        res.status(200).json({ message: "Project Delete Success" })
    } catch (error) {
        res.status(500).json({ message: error.message || "Something is Wrong" })
    }
}
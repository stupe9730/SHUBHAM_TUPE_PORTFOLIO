const multer = require("multer")
const path = require("path")
const { v4: uuid } = require("uuid")

const profileStorage = multer.diskStorage({
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        const fn = uuid() + ext
        cb(null, fn)
    },
    destination: (req, file, cb) => {
        cb(null, "uploads")
    }
})

exports.uploadProfile = multer({ storage: profileStorage }).single("hero")
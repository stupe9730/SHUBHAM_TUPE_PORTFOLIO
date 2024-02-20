const sendEmail = require("../utils/email");


// const html = `<p></p>`

exports.contactEmail = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body
        const x = await sendEmail({
            subject: `${subject}`,
            message: `User Name Is ${name}, and \n  \n User Email Is  ${email} \n 
            Message: ${message}
            `
        })
        const y = await sendEmail({
            to: email,
            subject: "Thanks for contacting",
            message: `Hello ${req.body.subject} \n \n  Thank Your for reaching out! Your message has been received. \n \n
            Mobile No:7498187088
            \n \n I'll get back to you soon!    \n Best Regards SHUBHAM TUPE😎 `
        })
        if (x && y) {
            res.status(200).json({ message: "email send success" })
        } else {
            res.status(400).json({ message: "unable to send email" })
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message || "something went wrong" })
    }
}
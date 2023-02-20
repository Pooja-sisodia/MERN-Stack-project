const taskModel = require("../models/taskModel")

const dateRegex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/

exports.CreateTask = async (req, res) => {
    try {
        let data = req.body
        let { Title, Description, Status, Deadline } = data
        if (!Title) return res.status(400).send({ status: false, message: "Pls provide Title" })
        if (Title.length > 40) return res.status(400).send({ status: false, message: "Pls provide the small Title of length 40 characters only" })
        const isUniqueTitle = await taskModel.findOne({ Title })
        if (isUniqueTitle) return res.status(400).send({ status: false, message: "Pls provide a unique Title" })
        if (!Description) return res.status(400).send({ status: false, message: "Pls provide Description" })
        if (Status) {
            if (!["Open", "Work-In-Progress", "Completed"].includes(Status)) {
                return res.status(400).send({ status: false, message: "Pls provide Status only from - Open,Work-In-Progress,Completed" })
            }
        }
        if (!Deadline) return res.status(400).send({ status: false, message: "Pls provide Deadline" })
        if (!dateRegex.test(Deadline)) return res.status(400).send({ status: false, message: "Pls provide a valid date" })
        let DeadlineDate = new Date(Deadline)
        let today = new Date()
        if (DeadlineDate < today)
            return res.status(400).send({ status: false, message: "Pls provide date of today or after that" })


        const CreateTask = await taskModel.create(data)
        return res.status(201).send({ status: true, message: "Created Successfully", data: CreateTask })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

exports.GetTask = async (req, res) => {
    try {
        const GetTask = await taskModel.find()
        if (GetTask.length == 0) return res.status(404).send({ status: false, message: "No Task Available" })
        return res.status(200).send({ status: true, data: GetTask })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


exports.UpdateTask = async (req, res) => {
    try {
        let data = req.body
        let { Title, Status } = data
        let checkTitle = await taskModel.find({ Title })
        if (!checkTitle) return res.status(404).send({ status: false, message: "No Task with this Title" })
        if (!["Open", "Work-In-Progress", "Completed"].includes(Status)) {
            return res.status(400).send({ status: false, message: "Pls provide Status only from - Open,Work-In-Progress,Completed" })
        }
        const UpdateTask = await taskModel.findOneAndUpdate({ Title }, { $set: { Status } }, { new: true })
        return res.status(200).send({ status: true, message: "Updated Successfully", data: UpdateTask })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}
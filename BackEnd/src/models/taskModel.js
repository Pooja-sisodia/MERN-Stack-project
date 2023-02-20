const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    Title: { type: String, required: true, unique: true },
    Description: { type: String, required: true },
    Status: { type: String, default: "Open", enum: ["Open", "Work-In-Progress", "Completed"] },
    Deadline: { type: Date, required: true },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true })

module.exports = mongoose.model("task", taskSchema)
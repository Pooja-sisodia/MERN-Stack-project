const express = require("express")
const { CreateTask, GetTask, UpdateTask } = require("../controllers/taskController")
const router = express.Router()

router.post("/test-me", (req, res) => {
    res.send("This is the test API!!")
})

router.post("/createtask", CreateTask)
router.get("/gettask", GetTask)
router.put("/updatetask", UpdateTask)

module.exports = router
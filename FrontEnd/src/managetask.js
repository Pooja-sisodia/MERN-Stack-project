import { useEffect, useState } from "react";
import axios from "axios";

const ManageTask = () => {
    let [demo, setDemo] = useState([])
    let [error, setError] = useState("")

    const GetAllTasks = () => {
        axios.get("https://task-management-backend.netlify.app/.netlify/functions/api/gettask")
            .then((res) => { console.log(res.data); setDemo(res.data.data) })
            .catch((err) => { console.log(err.message); setError(err.message) })
    }
    useEffect(() => {
        GetAllTasks()
    }, [])

    const dragstart = (e, Title, Status) => {
        console.log("drag has started")
        e.dataTransfer.setData("Title", Title)
        e.dataTransfer.setData("Status", Status)
    }

    const draggingOver = (e) => {
        e.preventDefault();
        console.log("Dragged Over now")
    }

    const dragDropped = (e, Status) => {
        console.log("You have Dropped")
        let Title = e.dataTransfer.getData("Title")
        let task = demo.filter((dem) => {
            if (dem.Title === Title) {
                dem.Status = Status
                axios.put("https://task-management-backend.netlify.app/.netlify/functions/api/updatetask", { Title, Status })
                    .then((res) => { console.log(res.data) })
                    .catch((err) => { console.log(err.message) })
            }
            return dem
        })
        setDemo(task)
    }

    const dragDroppedComp = (e, Status) => {
        console.log("You have Dropped")
        let Title = e.dataTransfer.getData("Title")
        let task = demo.filter((dem) => {
            if (dem.Title === Title) {
                dem.Status = Status
                axios.put("https://task-management-backend.netlify.app/.netlify/functions/api/updatetask", { Title, Status })
                    .then((res) => { console.log(res.data) })
                    .catch((err) => { console.log(err.message) })
            }
            return dem
        })
        setDemo(task)
    }

    return (
        <div style={{ backgroundColor: "aquamarine", height: "555px" }}>
            <div className="row">
                {error !== "" && <p>{error}</p>}
                <div
                    className="center-block"
                    style={{overflow:"hidden", backgroundColor: "#00FFFF", height: "500px", width: "30%", margin: "10px", float: "center", border: "1.5px solid blue", borderRadius: "10px" }}>
                    <label style={{ borderBottom: "2px solid black", width: "100%", background: "violet", textAlign: "center" }}>
                        Open</label>
                    {demo.map((book, index) => {
                        let { Title, Status, Deadline } = book
                        if (Status === "Open") {
                            return <div
                                key={index} style={{ border: "2px solid yellow", margin: '5px', background: "#FF4500", borderRadius: "10px" }}
                                draggable onDragStart={(e) => dragstart(e, Title, Status)}>
                                <p style={{ margin: "1px" }}>Title : {Title} <br /> Deadline :{Deadline.split("T")[0]}</p>
                            </div>
                        } else return ''
                    })}
                </div>

                <div
                    className="center-block"
                    style={{overflow:"hidden", backgroundColor: "#00FFFF", height: "500px", width: "30%", margin: "10px", float: "center", border: "1.5px solid blue", borderRadius: "10px" }}
                    onDragOver={(e) => draggingOver(e)}
                    onDrop={(e) => dragDropped(e, "Work-In-Progress")}>
                    <label style={{ borderBottom: "2px solid black", width: "100%", background: "violet", textAlign: "center" }}>
                        Work-In-Progress</label>
                    {demo.map((book, index) => {
                        let { Title, Status, Deadline } = book
                        if (Status === "Work-In-Progress") {
                            return <div
                                key={index} style={{ border: "2px solid black", margin: '5px', background: "yellow", borderRadius: "10px" }}
                                draggable onDragStart={(e) => dragstart(e, Title)}>
                                <p style={{ margin: "1px" }}>Title : {Title} <br /> Deadline :{Deadline.split("T")[0]}</p>
                            </div>
                        } else return ''
                    })}
                </div>

                <div
                    className="center-block"
                    style={{overflow:"hidden", backgroundColor: "#00FFFF", height: "500px", width: "30%", margin: "10px", float: "center", border: "1.5px solid blue", borderRadius: "10px" }}
                    onDragOver={(e) => draggingOver(e)}
                    onDrop={(e) => dragDroppedComp(e, "Completed")}>
                    <label style={{ borderBottom: "2px solid black", width: "100%", background: "violet", textAlign: "center" }}>
                        Completed</label>
                    {demo.map((book, index) => {
                        let { Title, Status, Deadline } = book
                        if (Status === "Completed") {
                            return <div
                                key={index} style={{ border: "2px solid red", margin: '5px', background: "#7CFC00", borderRadius: "10px" }}
                                draggable onDragStart={(e) => dragstart(e, Title)}>
                                <p style={{ margin: "1px" }}>Title : {Title} <br /> Deadline :{Deadline.split("T")[0]}</p>
                            </div>
                        } else return ''
                    })}
                </div>
            </div>

        </div>

    )
}

export default ManageTask
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const CreateTask = () => {
    let [Title, setTitle] = useState("")
    let [Description, setDescription] = useState("")
    let [Deadline, setDeadline] = useState("")
    let [create, setCreate] = useState("")
    let [error, setError] = useState("")
    let navigate = useNavigate()

    const onSubmit = (e) => {
        axios.post("https://task-management-backend.netlify.app/.netlify/functions/api/createtask", { Title, Description, Deadline })
            .then((res) => { console.log(res.data); setCreate(res.data) })
            .catch((err) => { console.log(err.message); setError(err.message) })
        e.preventDefault();
    }

    useEffect(() => {

        if (create !== "") { alert("Created Successfully!"); }
        if (create !== "") { navigate("/"); }

    }, [create, navigate])

    return (
        <div style={{ width: "100%", height: "600px", background: "#3366ff", paddingTop: "70px" }}>
            <div style={{
                border: "2px solid black", margin: "auto", background: "#333333", width: "22%", height: "350px", "textAlign": "center",
                borderRadius: "15px", color: "white"
            }}>
                <form onSubmit={(e) => onSubmit(e)}>
                    {create.message !== "Created Successfully" && <p>{create.message}</p>}
                    {error !== "" && <p>{error}</p>}
                    <h2>Create Task</h2>
                    <div className="mb-2 mt-5">
                        <input type="text" required placeholder="Title" onChange={(e) => { setTitle(e.target.value) }}></input>
                    </div>
                    <div className="mb-2">
                        <input type="text" required placeholder="Description" onChange={(e) => { setDescription(e.target.value) }}></input>
                    </div>
                    <div className="mb-5">
                        <input style={{ width: "190px" }} type="Date" required placeholder="Deadline" onChange={(e) => { setDeadline(e.target.value) }}></input>
                    </div>
                    <button className="mb-2"
                        style={{ border: "1.5px solid white", color: "white", background: "#404040", borderRadius: "5px", width: "150px" }}>
                        Create</button>
                </form>
            </div>

        </div>
    )
}

export default CreateTask
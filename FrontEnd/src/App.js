import { useNavigate } from "react-router-dom"

const App = () => {
    let navigate = useNavigate();

    return (
        <div style={{ background: "#00ffff", height: "600px", padding: "30px" }}>
            <p style={{ color: "black", marginLeft: "500px" }}>This is the Task Management</p>
            <div className="btn-group" style={{ marginLeft: "500px", marginTop: "50px" }} >
                <button className="btn btn-info" id="signup" onClick={() => { navigate("/createtask") }}>Create Task</button>
                <button className="btn btn-warning" id="login" onClick={() => { navigate("/managetask") }}>Manage Task</button>
            </div>
        </div>
    )
}

export default App
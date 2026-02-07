
import React, { useEffect, useState } from "react";
import './app.css'
function App() {
  const [input, setInput] = useState("");
  const [students, setStudents] = useState([]);
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [show, setShow] = useState(false);
  const [loaded, setLoaded] = useState(false); 

  
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("students")) || [];
    setStudents(saved);
    setLoaded(true); 
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("students", JSON.stringify(students));
    }
  }, [students, loaded]);

  const add = () => {
    if (input === "") {
      alert("Please enter name");
      return;
    }

    setStudents([
      ...students,
      {
        roll: students.length + 1,
        name: input,
        attendance: {}
      }
    ]);
    setInput("");
  };

  const markAttendance = (roll, status) => {
    setStudents(
      students.map((s) =>
        s.roll === roll
          ? {
              ...s,
              attendance: {
                ...s.attendance,
                [date]: status
              }
            }
          : s
      )
    );
  };

  return (
    <div className="mai-container" >
      <h2>Daily Attendance App</h2>

      <input className="input-box"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter Name"
      />

      <input className="date-box"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <button className="add-btn" onClick={add}>Add</button>
      <button className="view-btn" onClick={() => setShow(!show)}>View Attendance</button>
      
     <div>
      <hr />
       {show &&
        students.map((s) => (
          <div className="attendace-card" key={s.roll} style={{ border: "1px solid gray", padding: "10px" }}>
            <p><b>Roll {s.roll} <br /> <br />
              </b>Name: {s.name}</p>
            <p>Status: <b>{s.attendance[date] || "Not Marked"}</b></p>
            <button onClick={() => markAttendance(s.roll, "Present")}>
              Present
            </button>
            <button onClick={() => markAttendance(s.roll, "Absent")}>
              Absent
            </button>
          </div>
        ))}
     </div>
    </div>
  );
}

export default App;

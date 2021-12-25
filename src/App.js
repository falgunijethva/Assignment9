import "./styles.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Tasks from "./Components/Tasks";
import AddTask from "./Components/AddTask";
import About from "./Components/About";
import Footer from "./Components/Footer";
import "./index.css";
import { useState, createContext } from "react";

//usercontext
export const usercontext = createContext();
export default function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Doctor Appointment",
      day: "feb 5th at 2:30pm",
      reminder: true
    },
    {
      id: 2,
      text: "Meeting at School",
      day: "feb 6th at 1:30pm",
      reminder: true
    },
    {
      id: 3,
      text: "Food shopping",
      day: "feb 5th at 2:30pm",
      reminder: false
    }
  ]);

  //delete task
  const deleteTask = (id) => {
    //console.log('delete',id)
    setTasks(tasks.filter((task) => task.id !== id));
  };

  //toggal reminder
  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  //add task
  const addTask = (task) => {
    //console.log(task);
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = { id, ...task };
    setTasks([...tasks, newTask]);
  };

  return (
    <Router>
      <div className="container">
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <usercontext.Provider value={tasks}>
                  {showAddTask && <AddTask onAdd={addTask} />}
                  {tasks.length > 0 ? (
                    <Tasks onDelete={deleteTask} onToggle={toggleReminder} />
                  ) : (
                    "No tasks to show"
                  )}
                </usercontext.Provider>
              </>
            }
          />
          <Route path="/About" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

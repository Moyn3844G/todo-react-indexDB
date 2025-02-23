import { useEffect, useState } from 'react';
import { MdCheck, MdDelete } from "react-icons/md";
import { addTaskToDB, deleteTaskFromDB, getTasksFromDB, updateTaskInDB } from './indexDB';

function App() {
  const [tasks, setTasks] = useState([]); // ✅ Fix: Initialize with an empty array
  const [input, setInput] = useState("");

  // Fetch tasks from IndexedDB on mount
  useEffect(() => {
    const fetchTasks = async () => {
      const dbTasks = await getTasksFromDB();
      setTasks(dbTasks);
    };
    fetchTasks();
  }, []);

  // Add new task
  const handelFormSubmit = async (e) => {
    e.preventDefault();

    if (!input.trim()) return; // ✅ Prevent empty tasks
    //check if task exist
    // ✅ Fetch tasks from IndexedDB and check for duplicates
    const existingTasks = await getTasksFromDB();
    const isDuplicate = existingTasks.some(task => task.task.toLowerCase() === input.toLowerCase());

    if (isDuplicate) {
      alert("Task already exists!"); // ✅ Show error message
      return;
    }
    const task = {
      id: Date.now(), // ✅ Safer unique ID
      task: input,
      isDone: false
    };

    await addTaskToDB(task); // ✅ Ensure IndexedDB update first
    setTasks((prevTasks) => [...prevTasks, task]); // ✅ Then update state
    setInput(""); // ✅ Clear input
  };

  // Delete task
  const deleteTask = async (id) => {
    await deleteTaskFromDB(id);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  // Toggle task completion
  const toggleTaskCompletion = async (id, isDone) => {
    const updated = await updateTaskInDB(id, { isDone: !isDone });

    if (updated) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, isDone: !isDone } : task
        )
      );
    }
  };

  return (
    <section className='todo-container'>
      <header>
        <h1>To-Do List</h1>
      </header>

      {/* ✅ Fix: onSubmit should be inside <form> */}
      <section className='form'>
        <form onSubmit={handelFormSubmit}>
          <div>
            <input
              type="text"
              className='todo-input'
              autoComplete='off'
              name='task'
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div>
            <button type='submit' className='todo-btn'>Add Task</button>
          </div>
        </form>
      </section>

      <section className='myUnOrdList'>
        <ul>
          {tasks.map((task) => (
            <li className='todo-item' key={task.id}>
              <span className={task.isDone ? "checkList" : ""}>{task.task}</span>
              <button className='check-btn' onClick={() => toggleTaskCompletion(task.id, task.isDone)}>
                <MdCheck />
              </button>
              <button className='delete-btn' onClick={() => deleteTask(task.id)}>
                <MdDelete />
              </button>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}

export default App;

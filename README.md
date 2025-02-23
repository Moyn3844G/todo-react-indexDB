📝 To-Do List with IndexedDB
A simple React To-Do List that uses IndexedDB for persistent storage. 🚀

📌 Features
✅ Add tasks to the list
✅ Prevent duplicate tasks
✅ Mark tasks as completed
✅ Delete tasks
✅ Tasks persist using IndexedDB

🛠️ Technologies Used
React.js ⚛️
IndexedDB (via idb) 🗄️
React Icons 🎨
📂 Project Setup
1️⃣ Clone the repository
sh
Copy
Edit
git clone https://github.com/Moyn3844G/todo-react-indexDB.git
cd todo-react-indexDB
2️⃣ Install dependencies
sh
Copy
Edit
npm install
3️⃣ Run the app
sh
Copy
Edit
npm start
Your app should now be running on http://localhost:3000/ 🚀

💾 IndexedDB Utility Functions
This project includes the following IndexedDB functions:

addTaskToDB(task): Add a task to IndexedDB
deleteTaskFromDB(id): Remove a task
getTasksFromDB(): Retrieve all tasks
updateTaskInDB(id, updates): Update a task

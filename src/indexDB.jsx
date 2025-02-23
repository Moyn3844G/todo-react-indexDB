import { openDB } from 'idb';
const initDB = async () => {
    return openDB('TodoDatabase', 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('tasks')) {
                db.createObjectStore('tasks', { keyPath: 'id', autoIncrement: true });
            }
        },
    });
};
export const addTaskToDB = async (task) => {
    const db = await initDB();
    const tx = db.transaction('tasks', 'readwrite');
    const store = tx.objectStore('tasks');
    await store.put(task);
    await tx.done;
};

// Get all tasks from IndexedDB
export const getTasksFromDB = async () => {
    const db = await initDB();
    return await db.getAll('tasks');
};

// Delete a task from IndexedDB
export const deleteTaskFromDB = async (id) => {
    const db = await initDB();
    const tx = db.transaction('tasks', 'readwrite');
    const store = tx.objectStore('tasks');
    await store.delete(id);
    await tx.done;
};
export const updateTaskInDB = async (id, updatedTask) => {
    const db = await initDB();
    const tx = db.transaction('tasks', 'readwrite');
    const store = tx.objectStore('tasks');
    const existingTask = await store.get(id);

    if (!existingTask) return false; // Task not found

    const newTask = { ...existingTask, ...updatedTask }; // Merge updates
    await store.put(newTask); // Update the task
    await tx.done;
    return true;
};

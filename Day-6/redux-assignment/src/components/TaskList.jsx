import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addTask,
  toggleTask,
  deleteTask,
  editTask,
} from '../features/tasks/tasksSlice';

function TaskList() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const [newTask, setNewTask] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');

  const handleAddTask = () => {
    const trimmed = newTask.trim();
    if (!trimmed) return;
    dispatch(addTask(trimmed));
    setNewTask('');
  };

  const handleEditTask = (task) => {
    setEditingId(task.id);
    setEditedTitle(task.title);
  };

  const handleSaveEdit = (id) => {
    const trimmed = editedTitle.trim();
    if (!trimmed) return;
    dispatch(editTask({ id, title: trimmed }));
    setEditingId(null);
    setEditedTitle('');
  };

  return (
    <div>
      <h2>Task List</h2>

      <div>
        <input
          placeholder="Enter task..."
          
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map((task) => (
          <li key={task.id} style={{ margin: '8px 0' }}>
            {editingId === task.id ? (
              <>
                <input
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
                <button onClick={() => handleSaveEdit(task.id)}>Save</button>
              </>
            ) : (
              <>
                <span
                  onClick={() => dispatch(toggleTask(task.id))}
                  style={{
                    textDecoration: task.completed ? 'line-through' : 'none',
                    cursor: 'pointer',
                    marginRight: '10px',
                  }}
                >
                  {task.title}
                </span>
                <button onClick={() => handleEditTask(task)}>Edit</button>
                <button onClick={() => dispatch(deleteTask(task.id))}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;

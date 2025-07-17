import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = [];

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
      prepare: (title) => ({
        payload: {
          id: nanoid(),
          title,
          completed: false,
        },
      }),
    },
    toggleTask: (state, action) => {
      const task = state.find(t => t.id === action.payload);
      if (task) task.completed = !task.completed;
    },
    deleteTask: (state, action) => {
      const index = state.findIndex(t => t.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    editTask: (state, action) => {
      const t = state.find(x => x.id === action.payload.id);
      if (t) t.title = action.payload.title;
    }
  }
});

export const { addTask, toggleTask, deleteTask, editTask } = tasksSlice.actions;
export default tasksSlice.reducer;

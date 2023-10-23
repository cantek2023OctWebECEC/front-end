import React, { useState } from 'react';
//import {useForm} from 'react-hook-form'


export const AddTodoList: React.FC = () => {
    const [tasks, setTasks] = useState<string[]>([]);
    const [newTask, setNewTask] = useState<string>('');
  
    const addTask = () => {
        if (newTask.trim() !== '') {
          setTasks([...tasks, newTask]);
          setNewTask('');
        }
    };
    const removeTask = (index: number) => {
       const updatedTasks = tasks.filter((_, i) => i !== index);
       setTasks(updatedTasks);
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <div className="flex space-x-2 mb-4">
            <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} className="w-full p-2 border" placeholder="Add a task"/>
            <button onClick={addTask} className="bg-blue-500 text-white p-2 rounded">
              Add
            </button>
          </div>
          <ul>
            {tasks.map((task, index) => (
              <li key={index} className="flex justify-between mb-2">
                <span>{task}</span>
                <button onClick={() => removeTask(index)} className="text-red-500">
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      );
    };
    
export default AddTodoList;
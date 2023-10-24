import React, { useState , useEffect } from 'react';
import fakeTaskData from '../../public/FakeTododata.json'; // Import the JSON data
//import {useForm} from 'react-hook-form'

type Task = {
  task: string;
  status: string;
  assignedTo: string;
};

export const AddTodoList: React.FC = () => {

  const [selectedMember, setSelectedMember] = useState<string>('');

    const [tasks, setTasks] = useState<{ task: string; status: 'active' | 'Complete'| string; assignedTo: string }[]>([]);
    const [newTask, setNewTask] = useState<string>('');
  
    //read fake data
    const [readtasks, setReadTasks] = useState<Task[]>([]);

      useEffect(() => {
        
        setReadTasks(fakeTaskData.tasks); 
      }, []);
      
      //end 

    const addTask = () => {
        if (newTask.trim() !== '') {
          const newTaskItem = {
            task: newTask,
            status: 'active',
            assignedTo: selectedMember, // Assign the selected member
        };
        console.log('New Task Status:', newTaskItem.status);
        console.log('Selected Member:', newTaskItem.assignedTo);
          setTasks([...tasks, newTaskItem,]);
          setNewTask('');
          setSelectedMember('');
        }
        
    };

    const removeReadTask = (index: number) => {
      const updatedTasks = [...readtasks]; // Make a copy of the tasks
      if (updatedTasks[index]) {
        updatedTasks.splice(index, 1);
        setReadTasks(updatedTasks);
      }
    };

    const removeTask = (index: number) => {
      const taskName = tasks[index].task; 
      const updatedTasks = [...tasks];
      updatedTasks.splice(index, 1);
      setTasks(updatedTasks);
      console.log(`Removed task: ${taskName}`);
    };

    const toggleTaskStatus = (index: number) => {
      const updatedTasks = [...tasks];
      const currentStatus = updatedTasks[index].status;
      // Toggle the status between 'Processing' and 'Complete'
      updatedTasks[index].status = currentStatus === 'active' ? 'Complete' : 'active';
      setTasks(updatedTasks);
      console.log("current tasks status: "+ updatedTasks[index].status);
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <div className="flex space-x-2 mb-4">
            <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} className="w-full p-2 border" placeholder="Add a task"/>
            <select
                    value={selectedMember}
                    onChange={(e) => setSelectedMember(e.target.value)}
                    className="p-2 border"
                >
                    <option value="">Select Member</option>
                    <option value="Member 1">Member 1</option>
                    <option value="Member 2">Member 2</option>
                    <option value="Member 3">Member 3</option>
                    {/* Add more members as needed */}
              </select>
            <button onClick={addTask} className="bg-blue-500 text-white p-2 rounded">
              Add
            </button>
          </div>
          <ul>
          
          {readtasks.map((task, index) => (
          <li key={index} className={`flex flex-col md:flex-row justify-between items-start md:items-center mb-2 bg-white shadow-lg hover:bg-300 mt-5 px-5 py-5 w-full ${task.status === 'Complete' ? 'line-through' : ''}`} >       
          <div className="w-2/3" onClick={() => toggleTaskStatus(index)}>
          <div className="mb-2">{task.task}</div>
          <div className="mb-2">
             <span className="mr-4">{task.task}</span>
            </div>
            <div className="w-full my-3 border-b border-gray-200"></div>
            <div className="mb-2">
                <span className="text-sm text-gray-500">Assigned to: {task.assignedTo}</span>
            </div>
        </div>
          <button onClick={() => removeReadTask(index)} className={`text-red-500 ${
                  task.status === 'Complete' ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : ''}`} disabled={task.status === 'Complete'}>
              Remove
          </button>
          </li>
         ))}
          {tasks.map((task, index) => (
                    <li key={index} className={`flex flex-col md:flex-row justify-between items-start md:items-center mb-2 bg-white shadow-lg hover:bg-300 mt-5 px-5 py-5 w-full ${task.status === 'Complete' ? 'line-through' : ''}`} >
                      <div className="w-2/3" onClick={() => toggleTaskStatus(index)}>
                        <div className="mb-2">
                           <span className="mr-4">{task.task}</span>
                          </div>
                          <div className="w-full my-3 border-b border-gray-200"></div>
                          <div className="mb-2">
                              <span className="text-sm text-gray-500">Assigned to: {task.assignedTo}</span>
                          </div>
                      </div>
                        <button onClick={() => removeTask(index)} className={`text-red-500 ${
                                task.status === 'Complete' ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : ''}`} disabled={task.status === 'Complete'}>
                            Remove
                        </button>
                    </li>
                ))}
          </ul>
        </div>
      );
    };
    
export default AddTodoList;
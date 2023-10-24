import React, { useState , useEffect } from 'react';
import fakeTaskData from '../../public/FakeTododata.json'; // Import the JSON data
//import {useForm} from 'react-hook-form'

interface AddTodoListProps {
  selectedFilter: string;
}

export const AddTodoList: React.FC<AddTodoListProps> = ({selectedFilter}) => {
    const [selectedMember, setSelectedMember] = useState<string>('');

    const [tasks, setTasks] = useState<{ task: string; status: 'active' | 'Complete'| string; assignedTo: string }[]>([]);
    const [newTask, setNewTask] = useState<string>('');
  
    //read fake data
      useEffect(() => {
        setTasks(fakeTaskData.tasks);
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
          // Add the new task to the JSON data
          fakeTaskData.tasks.push(newTaskItem);

          setTasks([...tasks, newTaskItem,]);
          setNewTask('');
          setSelectedMember('');

          
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

      //update fake data
      const updatedFakeTaskData = [...fakeTaskData.tasks];
      updatedFakeTaskData[index].status = updatedTasks[index].status;
    };

    return (
        <div className="max-w-md mx-auto p-4 mb-4">
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
          {tasks.filter((task) => {
      if (selectedFilter === 'all') {
        return true; // Show all tasks
      } else if (selectedFilter === 'active') {
        return task.status === 'active'; // Show only active tasks
      } else if (selectedFilter === 'completed') {
        return task.status === 'Complete'; // Show only completed tasks
      }
      return true; // Default to show all tasks
    })        
          .map((task, index) => (
                    <li key={index} className={`flex flex-col md:flex-row justify-between items-start md:items-center mb-2 bg-white shadow-lg hover:bg-300 mt-5 px-5 py-5 w-full ${task.status === 'Complete' ? 'line-through' : ''}`} >
                      <div className="w-2/3" onClick={() => {toggleTaskStatus(index)}}>
                        <div className="mb-2">
                           <span className="mr-4">{task.task}</span>
                          </div>
                          <div className="w-full my-3 border-b border-gray-200"></div>
                          <div className="mb-2 flex flex-col md:flex-row justify-between items-start md:items-center">
                              <span className="text-sm text-gray-500">Assigned to: </span>
                              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm bg-400">
                           {task.assignedTo.substring(0,2).toUpperCase()}
                          </div>
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
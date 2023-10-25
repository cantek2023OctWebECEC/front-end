import React,{ useState , useEffect, useRef } from "react";
import memberData from '../../public/FakeUserdata.json'; // Adjust the path to your JSON file
/*import axios from 'axios';*/

export const MemberController: React.FC = () => {
    /*const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get('https://cantek.ekhome.life/api/user');
            setData(response.data);
        } catch (error) {
            console.error('API request error', error);
        }
        };

        fetchData();
    }, []);
    */

    const [searchInput, setSearchInput] = useState('');
    const [newMemberEmail, setNewMemberEmail] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [addedMembers, setAddedMembers] = useState<{ name: string; email: string }[]>([]);

    const [suggestedEmails, setSuggestedEmails] = useState<string[]>([]); 
    const inputRef = useRef<HTMLInputElement | null>(null);
    const listRef = useRef<HTMLUListElement | null>(null);

    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
          if (
            inputRef.current &&
            listRef.current &&
            !inputRef.current.contains(e.target as Node) &&
            !listRef.current.contains(e.target as Node)
          ) {
            setSuggestedEmails([]); // Hide the list when clicking outside
          }
        };
    
        window.addEventListener('click', handleOutsideClick);
    
        return () => {
          window.removeEventListener('click', handleOutsideClick);
        };
      }, []);


    useEffect(() => {
      if (searchInput) {
        const suggested = memberData.members
          .filter((member) => member.email.includes(searchInput))
          .map((member) => member.email);
        setSuggestedEmails(suggested);
      } else {
        setSuggestedEmails([]); // Clear the suggestions when the input is empty
      }
      
    }, [searchInput]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.trim() !== '') {
          
          setSearchInput(value);
        }
        setNewMemberEmail(value); 
    };

    const handleSuggestedEmailClick = (email: string) => {
        setSearchInput(email);
        setNewMemberEmail(email);
        setSuggestedEmails([]); // Clear the suggestions when a suggestion is selected
    };

    const addMember = () => {
        if (newMemberEmail.trim() !== '') {
          const username = getUsernameByEmail(newMemberEmail);
        
          if (username) {
            const newMember = {
              id: Date.now(),
              name: username,
              email: newMemberEmail,
            };
            console.log("current add user: "+ newMember.name);
            setNewMemberEmail('');
            if(!addedMembers.some((member) => member.email === newMemberEmail)){
                setAddedMembers((prevMembers) => [...prevMembers, newMember]);
            }else {
                alert('User has been added!');
            }
          } else {
            alert('User not found. Please enter a valid email.');
          }
        }
      }
    
    const removeMember = (email: string) => {
        const updatedMembers = addedMembers.filter((member) => member.email !== email);
        setAddedMembers(updatedMembers);
    }
      
    const getUsernameByEmail = (email: string): string | undefined => {
        const user = memberData.members.find((user) => user.email === email);
        return user ? user.name : undefined;
    };

    const openDialog = () => {
      setIsOpen(true);
    };
  
    const closeDialog = () => {
      setIsOpen(false);
    };
   
  return (
    <div>
      <button
        onClick={openDialog}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Edit Members
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 w-full">
          <div className="rounded-lg shadow-md relative w-3/4 h-3/4 bg-[color:white] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-300">
            <div className="max-w-lx mx-auto">
              <nav className="mx-1 w-55rem flex justify-between items-center border-b border-gray-300 text-500">
                <div >Add Members</div>
                <div>
                  <button
                    onClick={closeDialog}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded-3xl rounded bg-slate-200 text-right"
                  >
                    X
                  </button>
                </div>
              </nav>
              <nav className="mx-1 my-1 w-55rem flex justify-between items-center ">
              <div>
                  <input
                  type="text"
                  placeholder="Search by email or Add a new member by email"
                  value={newMemberEmail} // Use newMemberEmail as the value
                  onChange={handleInputChange} // Use handleInputChange to update both fields
                  className="w-64 px-3 py-2 border rounded-lg"
                  ref={(el) => (inputRef.current = el)}
                />               
              </div>
              <div><button onClick={addMember} className="text-red-500 rounded p-2 bg-200 ">Add</button></div>
              </nav>
              <div className="mx-1 my-1 z-50">
                {suggestedEmails.length > 0 && ( // Show the list of suggestions
                  <ul className=" top-10 left-0 right-0 p-2 rounded-lg border border-gray-300"
                  ref={(el) => (listRef.current = el)}
                  >
                    {suggestedEmails.map((email) => (
                      <li
                        key={email}
                        onClick={() => handleSuggestedEmailClick(email)}
                        className="cursor-pointer hover:bg-gray-100"
                      >
                        {email}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mx-1 my-1 w-55rem">
                <div className="my-1.5">Member</div>
                <div>
                {addedMembers.length > 0 && (
                    <div className="mt-4 text-500">
                    <ul>
                        {addedMembers.map((member, index) => (
                        <li key={index} className="flex justify-between items-center">
                            <div>
                            <table>
                                <tr className="p-2">
                                    <td ><div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm bg-400 ml-3">
                                        {member.name.substring(0,2).toUpperCase()}
                                        </div></td>
                                    <td>
                                        <table>
                                        <tr><td className="pl-3.5">{member.name}</td></tr>
                                            <tr><td className="pl-3.5">{member.email}</td></tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            </div>
                            <div>
                                <button className="text-red-500 rounded p-2 bg-200 " onClick={() => removeMember(member.email)}>Remove</button>
                            </div>
                        </li>
                        ))}
                    </ul>
                    </div>
                )}
                </div>
                </div>
                </div>
                
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

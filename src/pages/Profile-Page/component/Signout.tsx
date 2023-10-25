export const Signout = () => {
	const handleSignOutButton = ()=>{
		localStorage.clear()//clear basic auth token
	}
	return (
		<div className="w-4/6 grid grid-row-2 gap-4 text-ellipsis overflow-hidden ...">
			Press here to sign out:
			<button 
			onClick={handleSignOutButton}
			className="p-2 text-white hover-bg-blue-700 cursor-pointer border-solid border-2 border-indigo-600 my-2 text-ellipsis overflow-hidden ... rounded-lg w-1/6"
			>Sign out</button>
		</div>
	);
};

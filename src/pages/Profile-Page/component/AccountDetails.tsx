import { Dummy } from "../assets/DummyData";
export const AccountDetails = () => {
	return (
		<div className="w-4/6">
			<div className="grid grid-row-2 gap-4 font-bold text-2xl text-ellipsis overflow-hidden ...">
				<a className="text-ellipsis overflow-hidden ...">username: {Dummy.username}</a>
				<a className="text-ellipsis overflow-hidden ...">email: {Dummy.email}</a>
			</div>
            
		</div>
	);
};

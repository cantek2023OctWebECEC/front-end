import { useSelector } from "react-redux";
import { RootState } from "../../../redux/rootReducer";
export const AccountDetails = () => {
	const info = useSelector((state: RootState) => state.Auth);
	return (
		<div className="w-4/6">
			<div className="grid grid-row-2 gap-4 font-bold text-2xl text-ellipsis overflow-hidden ...">
				<a className="text-ellipsis overflow-hidden ...">
					username: {info?.userinfo?.username}
				</a>
				<a className="text-ellipsis overflow-hidden ...">
					email: {info.email}
				</a>
			</div>
		</div>
	);
};

import { useSharedAttraction } from "../utils/hooks/useAttractions";


export const AttractionDetails = ({ handleClose }) => {
	const { attr, setAttr } = useSharedAttraction();
	
	return (
		<div>
			<div className="px-4 py-2  flex justify-end items-start absolute top-3 right-3 rounded rounded-3xl bg-slate-200">
				<button
					onClick={() => {
						handleClose();
						setAttr(undefined);
					}}
				>
					X
				</button>
			</div>
			<div>
				<table className="min-w-full divide-y divide-gray-200">
					<tbody className="bg-white divide-y divide-gray-200">
						<tr >
							<td className="px-6 py-4">Name: </td>
						<td className="px-6 py-4">{attr && attr.name ? JSON.stringify(attr.name).replace(/"/g, '') : 'N/A'}</td>
						</tr>
						<tr>
							<td className="px-6 py-4">Location: </td>
						<td className="px-6 py-4">{attr && attr.location ? JSON.stringify(attr.location).replace(/"/g, '') : 'N/A'}</td>
						</tr>
						<tr>
							<td className="px-6 py-4">Postal code: </td>
						<td className="px-6 py-4">{attr && attr.postal_code ? JSON.stringify(attr.postal_code).replace(/"/g, '') : 'N/A'}</td>
						</tr>
						<tr>
							<td className="px-6 py-4">Description: </td>
						<td className="px-6 py-4">{attr && attr.description ? JSON.stringify(attr.description).replace(/"/g, '') : 'N/A'}</td>
						</tr>
						<tr>
							<td className="px-6 py-4">category: </td>
						<td className="px-6 py-4 ">{attr && attr.category ? JSON.stringify(attr.category).replace(/"/g, '') : 'N/A'}</td>
						</tr>
						<tr>
							<td className="px-6 py-4 ">Email: </td>
						<td className="px-6 py-4 ">{attr && attr.email ? JSON.stringify(attr.email).replace(/"/g, '') : 'N/A'}</td>
						</tr>
						<tr>
							<td className="px-6 py-4 ">Phone: </td>
						<td className="px-6 py-4">{attr && attr.phone ? JSON.stringify(attr.phone).replace(/"/g, '') : 'N/A'}</td>
						</tr>
						<tr>
							<td className="px-6 py-4 ">Website: </td>
						<td className="px-6 py-4 ">{attr && attr.website ? JSON.stringify(attr.website).replace(/"/g, '') : 'N/A'}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

import { useSharedAttraction } from "../utils/hooks/useAttractions";

export const AttractionDetails = () => {
	const { attr, setAttr } = useSharedAttraction();
	return (
		<div>
			<button
				onClick={() => {
					setAttr(undefined);
				}}
			>
				close
			</button>
			<p>{JSON.stringify(attr)}</p>
		</div>
	);
};

import { useEffect, useState } from "react";
import usePosts from "./hooks/usePosts";

const PostList = () => {
	const [userId, setUserId] = useState<number>();
	const { data: posts, isLoading, error } = usePosts(userId);

	if (isLoading) return <p>Loading...</p>;

	if (error) return <p>{error.message}</p>;

	// useEffect(() => {
	// 	console.log(userId);
	// }, [userId]);

	return (
		<>
			<select
				onChange={(e) => setUserId(+e.target.value)}
				className="form-select mb-3"
				value={userId}
			>
				<option value=""></option>
				<option value="1">User 1</option>
				<option value="2">User 2</option>
				<option value="3">User 3</option>
			</select>
			<ul className="list-group">
				{posts?.map(({ id, title }) => {
					return (
						<li key={id} className="list-group-item">
							{title}
						</li>
					);
				})}
			</ul>
		</>
	);
};

export default PostList;

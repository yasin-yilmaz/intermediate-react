import { useState } from "react";
import usePosts from "./hooks/usePosts";

const PostList = () => {
	// @todo change with a dropdown selector;
	const pageSize = 10;
	const [page, setPage] = useState(1);

	const { data: posts, isLoading, error } = usePosts({ page, pageSize });

	if (isLoading) return <p>Loading...</p>;

	if (error) return <p>{error.message}</p>;

	return (
		<>
			<ol className="list-group">
				{posts.length === 0 && <h2>NO Post Found</h2>}
				{posts?.map(({ id, title }) => {
					return (
						<li key={id} className="list-group-item">
							{id}: {title}
						</li>
					);
				})}
			</ol>
			<div className="mt-3" role="group">
				<button
					disabled={page === 1}
					type="button"
					className="btn btn-primary"
					onClick={() => setPage((prev) => prev - 1)}
				>
					Previous
				</button>
				<button
					type="button"
					disabled={posts.length === 0}
					className="btn btn-primary ms-1"
					onClick={() => setPage((prev) => prev + 1)}
				>
					Next
				</button>
			</div>
		</>
	);
};

export default PostList;

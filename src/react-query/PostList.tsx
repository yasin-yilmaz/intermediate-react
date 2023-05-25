import usePosts from "./hooks/usePosts";

const PostList = () => {
	const { data: posts, isLoading, error } = usePosts();

	if (isLoading) return <p>Loading...</p>;

	if (error) return <p>{error.message}</p>;

	return (
		<>
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

import useTodos from "./hooks/useTodos";

const TodoLIst = () => {
	const { data: todos, isLoading, error } = useTodos();

	if (isLoading) return <p>Loading...</p>;

	if (error) return <p>{error.message}</p>;

	return (
		<div>
			<ul className="list-group">
				{todos?.map(({ id, title }) => {
					return (
						<li key={id} className="list-group-item">
							{title}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default TodoLIst;

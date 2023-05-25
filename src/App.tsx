import PostList from "./react-query/PostList";
import TodoLIst from "./react-query/TodoLIst";

const App = () => {
	return (
		<div className="app">
			<h2>App</h2>
			{/* <TodoLIst /> */}
			<PostList />
		</div>
	);
};

export default App;

const App = () => {
	return (
		<div className="app">
			<h2>Hello from App</h2>
			<h2>ENV test</h2>
			<p>{process.env.ENV_TEST}</p>
		</div>
	);
};

export default App;

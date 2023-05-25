import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// import types
import { TodoType as Todo } from "../types/types";

const useTodos = (userId: number) => {
	const fetchData = () =>
		axios
			.get<Todo[]>("https://jsonplaceholder.typicode.com/todos", {
				params: {
					userId,
				},
			})
			.then((res) => res.data);

	return useQuery<Todo[], Error>({
		queryKey: ["users", userId, "todos"],
		queryFn: fetchData,
	});
};

export default useTodos;

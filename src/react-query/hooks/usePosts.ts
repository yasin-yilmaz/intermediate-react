import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// import types
import { PostsType as Post } from "../types/types";

const usePosts = () => {
	const fetchData = () =>
		axios
			.get<Post[]>("https://jsonplaceholder.typicode.com/posts")
			.then((res) => res.data);

	return useQuery<Post[], Error>({
		queryKey: ["posts"],
		queryFn: fetchData,
	});
};

export default usePosts;

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// import types
import { PostsType as Post } from "../types/types";

const usePosts = (userId: number | undefined) => {
	const fetchData = () =>
		axios
			.get<Post[]>("https://jsonplaceholder.typicode.com/posts", {
				params: {
					userId: userId || null,
				},
			})
			.then((res) => res.data);

	return useQuery<Post[], Error>({
		queryKey: userId ? ["users", userId, "posts"] : ["posts"],
		queryFn: fetchData,
	});
};

export default usePosts;

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// import types
import { PostsType as Post, PostQuery } from "../types/types";

const usePosts = (query: PostQuery) => {
	const fetchData = () =>
		axios
			.get<Post[]>("https://jsonplaceholder.typicode.com/posts", {
				params: {
					_start: (query.page - 1) * query.pageSize,
					_limit: query.pageSize,
				},
			})
			.then((res) => res.data);

	return useQuery<Post[], Error>({
		queryKey: ["posts", query],
		queryFn: fetchData,
		keepPreviousData: true,
	});
};

export default usePosts;

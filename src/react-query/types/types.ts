export type TodoType = {
	id: number;
	title: string;
	userId: number;
	completed: boolean;
};

export type PostsType = {
	id: number;
	title: string;
	body: string;
	userId: number;
};

export type PostQuery = {
	page: number;
	pageSize: number;
};

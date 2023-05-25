# React Query

## install and initial react-query

```bash
npm i @tanstack/react-query
```

### index.ts

```tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

const root = createRoot(document.getElementById("root"))

root.render(
 <QueryClientProvider client={queryClient}>
  <App>
 </QueryClientProvider>
)
```

## create query

```ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Todo = {
 id: number;
 title: string;
 userId: number;
 completed: boolean;
};

const fetchTodos = () =>
  axios
   .get<Todo[]>("https://jsonplaceholder.typicode.com/todos")
   .then((res) => res.data);
};

const query = useQuery({
 queryKey: ["todos"],
 queryFn: fetchTodos
});

console.log(query.data)
```

### with error and isLoading

```ts
const {
 data: todos,
 error,
 isLoading
} = useQuery<Todos[] | Error>({
 queryKey: ["todos"],
 queryFn: fetchTodos
});

// Error: axios hata da Error type donduruyor

if (loading) return <p>Loading...</p>;

if (error) return <p>{error.message}</p>;

return;
// JSX code....
```

## Install React Query Dev Tools

```bash
npm i @tanstack/react-query-devtools
```

### index.ts

```tsx
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
/**
 * */
root.render(
 <>
  <App />
  <ReactQueryDevtools />
 </>
);
```

_on Browser a flower icon_

## queryClient options

### index.ts

```js
const queryClient = new QueryClient({
 defaultOptions: {
  queries: {
   retry: 3, // kac kes yeniden veriyi cekmeye calisicak
   cacheTime: 300_000, // sorgu sonucu ne kadar sure onbelekte saklanacak. Default ayarlarda saklanmaz.
   staleTime: 1000, // verinin ne kadar sure sonra eski kabul edilecegi.
   refetchOnWindowFocus: false, // browserda tab yada pencere degistiginde verinin tekrar cekilip cekilmeyecegi
   refetchOnReconnect: true, // baglanti kopmalarinda verinin yeniden cekilip cekilmeyecegi
   refetchOnMount: false // Component mount edildiginde verinin yeniden cekilip cekilmeyecegi
  }
 }
});
```

## Query Sample

### Posts.tsx

```tsx
const [userId, setUserId] = useState<number>();

const { data: posts } = usePosts(userId);

return (
 <>
  <select
   onChange={(e) => setUserId(+e.target.value)}
   className="form-select mb-3"
   value={userId}
  >
   <option value=""></option>
   <option value="1">User 1</option>
   <option value="2">User 2</option>
   <option value="3">User 3</option>
  </select>
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
```

### usePosts.ts

```ts
import { PostsType as Post } from "../types/types";

const usePosts = (userId: number | undefined) => {
 return (useQuery = {
  // https://jsonplaceholder.typicode.com/posts/users/1/posts
  queryKey: ["users", userId, "posts"],
  queryFn: () =>
   axios.get<Post[], Error>("https://jsonplaceholder.typicode.com/posts", {
    params: {
     userId
    }
   })
 });
};
```

## Pagination

### Posts.tsx

```tsx
const pageSize = 10; // sample value. normaly must dynamic
const [page, setPage] = useState(1);

const { data: posts, isLoading, error } = usePosts({ page, pageSize }); // send the usePosts

return (
 <>
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
```

### usePosts.ts

```ts
export type PostQuery = {
 page: number;
 pageSize: number;
};

const fetchData = (query: PostQuery) =>
 axios
  .get<Post[]>("https://jsonplaceholder.typicode.com/posts", {
   params: {
    _start: (query.page - 1) * query.pageSize,
    _limit: query.pageSize
   }
   //  _start and _limit are parameters of jsonplaceholder
  })
  .then((res) => res.data);

return useQuery<Post[], Error>({
 queryKey: ["posts", query],
 queryFn: fetchData,
 keepPreviousData: true // to keep the old data on the page until the new data is downloaded
});
```

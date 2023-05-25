## React Query

### install and initial react-query

```bash
npm i @tanstack/react-query
```

index.ts

```Javascript
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

const root = createRoot(document.getElementById("root"))

root.render(
 <QueryClientProvider client={queryClient}>
  <App>
 </QueryClientProvider>
)
```

### create query

```typescript jsx
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

```typescript
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

index.ts

```typescript
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

on Browser a flower icon

## queryClient options

index.ts

```typescript
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

```typescript jsx
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

```typescript
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

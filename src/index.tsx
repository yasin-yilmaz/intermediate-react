import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import App from "./App";

import "bootstrap/dist/css/bootstrap.css";
import "./scss/main.scss";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 10,
		},
	},
});

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
	<QueryClientProvider client={queryClient}>
		<App />
		<ReactQueryDevtools />
	</QueryClientProvider>
);

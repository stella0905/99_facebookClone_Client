import { QueryClient, QueryClientProvider } from "react-query";
import Router from "shared/router";

const queryclient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryclient}>
            <Router />
        </QueryClientProvider>
    );
}

export default App;

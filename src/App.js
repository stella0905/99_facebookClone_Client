import { QueryClient, QueryClientProvider } from "react-query";
import Router from "shared/router";

const queryclient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryclient}>
            <div className="bg-gray-200">
                <Router />
            </div>
        </QueryClientProvider>
    );
}

export default App;

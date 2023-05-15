import { QueryClient, QueryClientProvider } from "react-query";
import Router from "shared/router";

const queryclient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryclient}>
            {/*👇 전체 background color */}
            <div className="bg-gray-200">
                <Router />
            </div>
        </QueryClientProvider>
    );
}

export default App;

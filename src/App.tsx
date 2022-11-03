import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./App.css";
import Router from "./shared/Router";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient();

function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Router />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;

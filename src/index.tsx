import "./neobrutalism.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import { MemoryRouter } from "react-router-dom";

import { App } from "./components/App";
import { DarkModeProvider } from "./components/contexts/darkModeContext";
import { RefreshProvider } from "./components/contexts/refreshContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RefreshProvider>
      <DarkModeProvider>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </DarkModeProvider>
    </RefreshProvider>
  </QueryClientProvider>,
);

window.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  const { x, y } = event;
  window.api.showContextMenu({ x, y });
});

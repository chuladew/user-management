import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";
import { setupStore } from "./store/index.ts";
import App from "./App.tsx";

const store = setupStore();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ErrorBoundary fallback={<p>⚠️Something went wrong</p>}>
          <App />
        </ErrorBoundary>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);

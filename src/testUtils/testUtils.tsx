import { render } from "@testing-library/react";
import { Provider } from "react-redux";

import type { RenderOptions } from "@testing-library/react";
import type React from "react";
import type { PropsWithChildren, JSX } from "react";
import type { AppStore, RootState } from "../store";

import { setupStore } from "../store";
import { PreloadedStateShapeFromReducersMapObject } from "@reduxjs/toolkit";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedStateShapeFromReducersMapObject<RootState>;
  store?: AppStore;
}

function renderWithProviders(
  ui: React.ReactElement,
  { store = setupStore(), ...renderOptions }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export { renderWithProviders };

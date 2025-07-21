import React from "react";
import Index from "./pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/Notfound";
import { Provider } from "react-redux";
import { store } from "./stores/index";

const App = () => {
  return (
    <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Provider>
    </BrowserRouter>
  );
};

export default App;

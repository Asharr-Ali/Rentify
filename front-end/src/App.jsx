import React from 'react';
import { Route, Routes } from "react-router-dom";

//Pages
import DefaultPage from "./pages/defaultPage";

function App() {

  return (
    <React.Fragment>
      <Routes>
        <Route path = "/" element = {<DefaultPage />} />        
      </Routes>
    </React.Fragment>
  );
}

export default App

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useUser } from "./context/userContext";

import Message from "./components/Message/Message";

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  const { currentError } = useUser();

  return (
    <BrowserRouter>
      <div className="container-padding ">
        <Navbar />
        <Message fetchError={currentError.fetchError} success={currentError.success} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;

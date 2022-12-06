import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AddContact from "./components/AddContact";
import EditContact from "./components/EditContact";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <div className="app">
        <ToastContainer />
        <Navbar />

        <Routes>
          <Route exact path="/" element={<Home />} />

          <Route path="/add" element={<AddContact />} />

          <Route path="/edit/:id" element={<EditContact />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

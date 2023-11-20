import { Route, Routes } from "react-router-dom";
import Footer from "./components/Home/Footer";
import Header from "./components/Home/Header";
import ShowUser from "./components/ShowUser";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ShowUser />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

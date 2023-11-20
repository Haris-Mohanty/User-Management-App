import { Route, Routes } from "react-router-dom";
import Footer from "./components/Home/Footer";
import Header from "./components/Home/Header";
import ShowUser from "./components/ShowUser";
import TeamDetails from "./components/Team/TeamDetails";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ShowUser />} />
      </Routes>
      <TeamDetails/>
      <Footer />
    </>
  );
}

export default App;

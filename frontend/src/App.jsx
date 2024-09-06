import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { About } from "../pages/About";
import { Contact } from "../pages/Contact";
import { Home } from "../pages/Home";
import { Landing } from "../pages/Landing";
import { Profile } from "../pages/Profile";
import { ReadBlog } from "../pages/ReadBlog";
import { CreateBlog } from "../pages/CreateBlog";
import { NavBar } from "../components/NavBar";
import { Layout } from "../components/Layout";

function App() {
  //Pages

  //Landing page
  //Home page (filtered by recency)
  //ReadBlog
  //CreateBlog
  //Profile
  //About
  //Contact

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/createblog" element={<CreateBlog />} />
          <Route path="/readblog/:id" element={<ReadBlog />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

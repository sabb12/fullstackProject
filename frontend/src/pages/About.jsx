import { Link } from "react-router-dom";

export function About() {
  return (
    <div>
      <h1>About Us</h1>
      <p>
        Welcome to our lbog website! <Link to="/createBlog">here</Link> you'll
      </p>
    </div>
  );
}

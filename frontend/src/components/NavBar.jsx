import { Link } from "react-router-dom";
import { pageData } from "./pageData";

export function NavBar() {
  return (
    <div className="navbar">
      {pageData.map((page, i) => {
        return (
          <Link key={i} to={page.path} className="navItem">
            <button>{page.name}</button>
          </Link>
        );
      })}
    </div>
  );
}

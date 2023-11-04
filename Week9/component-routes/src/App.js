import Link from "./components/Links"
import SearchPage from "./pages/SearchPage";

export default function App() {

  return (
    <div>
      <div>
        <Link to="/button">Go to Button Page</Link>
        <Link to="/accordion">Go to Accordion Page</Link>
        <Link to="/search">Go to Search Page</Link>
      </div>
      App Page Routes Coming SOON
    </div>
  )
}


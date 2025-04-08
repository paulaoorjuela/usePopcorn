import SearchBar from "./navbar-components/SearchBar";
import Logo from "./navbar-components/Logo";
import NumResults from "./navbar-components/NumResults";

export default function Navbar(){
    return(
        <nav className="nav-bar">
        <Logo />
        <SearchBar/>
        <NumResults />
        </nav>
    )
}
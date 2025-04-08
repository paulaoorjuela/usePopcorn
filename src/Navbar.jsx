import Logo from "./navbar-components/Logo";

export default function Navbar({children}){
    return(
        <nav className="nav-bar">
            <Logo />
            {children}
        </nav>
    )
}
import { Link } from "react-router-dom";


const NavBar = () => {
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
            <Link to='/' className="navbar-brand" >Home</Link>
            <Link to='/appointments' className="navbar-brand" >My Appointments</Link>
            </div>
        </nav>
        </>
    )
}

export default NavBar;
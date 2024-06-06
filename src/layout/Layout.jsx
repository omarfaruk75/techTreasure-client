import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Container from "../components/Shared/Container";
import Footer from "../components/Footer";



const Layout = () => {
    return (
        <div >
            <Navbar />
            <Container>
                <Outlet />

            </Container>
            <Footer />

        </div>
    );
};

export default Layout;
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";

/*Create Layout component for application. nested elements will be flexed vertically. defined min-height property for layout element.
min height is 100% of viewport
Added interface props through which we will pass children to Layout component which will be displayed between header and footer.
Look at App.tsx to understand more.
*/

interface Props {
    children: React.ReactNode;
}

const Layout = ({children}: Props) => {


    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <Hero />
            <div className="container mx-auto py-10 flex-1">
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
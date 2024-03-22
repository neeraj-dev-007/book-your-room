import { Link } from "react-router-dom";

/*Header component will have Links to SignIn page, Home Page. defined background for header in 1st div element.
2nd div element has container property to limit max width of content, auto-margin, flex and justify-between. 
then we have 2 spans which will have links to Home Page and Sign in Page.
In the Sign in page we have css property space-x-2 to define spacing between nested
Added padding to div as px-6 so that at exact breakpoint screen match our container doesn't hug the edges and seems centered.
container mx-auto property is used to center content --------- This is useless so removed because we will override the custom
tailwind container and define our own configuration now for container. We basically added padding to container in tailwind.config.js
*/

const Header = () => {
    return (
        <div className="bg-blue-800 py-6">
            <div className="container mx-auto flex justify-between">
                <span className="text-3xl text-white font-bold tracking-tight">
                    <Link to="/">
                        BookYourRoom.com
                    </Link>
                </span>
                <span className="flex space-x-2">
                    <Link to="/sign-in" className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100">
                        Sign In
                    </Link>
                </span>
            </div>
        </div>
    );
};

export default Header;
import { BrowserRouter, Routes, Navigate, Route } from 'react-router-dom'
import Layout from './layouts/Layout';
import Register from './pages/Register';
import Signin from './pages/Signin';

/* we are passing <p>Home Page</p> and <p>Search Page</p> as children props to layout component.
Later on we can replace them with actual children components for Search Page and Home Page.
*/

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout>
          <p>Home Page</p>
        </Layout>} />
        <Route path="/search" element={<Layout>
          <p>Search Page</p>
        </Layout>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />
        <Route path="/signin" element={<Layout><Signin /></Layout>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

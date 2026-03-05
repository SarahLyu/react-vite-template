import { Outlet } from 'react-router';

import { Footer } from './components/Footer';
import { Header } from './components/Header';

const Layout = () => (
  <>
    <Header title="header" />
    <main className="content">
      <Outlet />
    </main>
    <Footer text="footer" />
  </>
);

export default Layout;

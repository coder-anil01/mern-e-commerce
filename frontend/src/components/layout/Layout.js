import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from 'react-hot-toast';

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content="John Doe"></meta>
        <meta name="author" content={author}></meta>
        <title>{title}</title>
      </Helmet>

      <Header />
      <main style={{ minHeight: "77.5vh" }}>
      <Toaster />
        {children}
        </main>
      <Footer />
    </>
  );
};

Layout.defaultProps = {
  title: "E-commerce app - shop now",
  description: "mern stack project",
  keywords: "mern, react, node, mongodb",
  auther: "coder anil",
};
export default Layout;

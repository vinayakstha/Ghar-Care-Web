import Navbar from "./_components/Navbar";
import Home from "./_components/Home";
import Services from "./_components/Services";
import Footer from "./_components/Footer";

export default function Page() {
  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <Home />
      <Services />
      <Footer />
    </div>
  );
}

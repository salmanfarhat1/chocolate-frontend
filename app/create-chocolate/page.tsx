import Header from "../components/Header";
import CustomChocolateCreator from "../components/CustomChocolateWizard";
import Footer from "../components/Footer";

export default function CreateChocolatePage() {
  return (
    <div className="min-h-screen bg-[#fdfaf5]">
      <Header />
        <CustomChocolateCreator />
      <Footer />
    </div>
  );
}
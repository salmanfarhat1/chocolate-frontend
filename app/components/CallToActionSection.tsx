import Link from "next/link";

export default function CallToActionSection() {
  return (
    <div className="text-center mt-16 pt-8 border-t border-[#e8d5c4]">
      <h2 className="text-2xl font-semibold text-[#5a2a27] mb-4">
        Can't Find What You're Looking For?
      </h2>
      <p className="text-[#7a5a53] mb-6 max-w-2xl mx-auto">
        We also offer custom chocolate creations tailored to your specific tastes and preferences.
      </p>
      <Link 
        href="/create-chocolate"
        className="inline-block bg-[#5a2a27] text-white px-8 py-3 rounded-lg hover:bg-[#6a3a37] transition-colors duration-300 font-semibold"
      >
        Create Your Custom Chocolate
      </Link>
    </div>
  );
}
type HeroSectionProps = {
    title: string;
    description: string;
  };
  
  export default function HeroSection({ title, description }: HeroSectionProps) {
    return (
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-[#5a2a27] mb-4">
          {title}
        </h1>
        <p className="text-lg text-[#7a5a53] max-w-2xl mx-auto">
          {description}
        </p>
      </div>
    );
  }
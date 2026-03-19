'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Cake, 
  Flame, 
  Zap, 
  MapPin, 
  Heart, 
  ChefHat, 
  Truck, 
  Menu, 
  X, 
  Instagram, 
  Mail, 
  Phone, 
  CheckCheck, 
  ImageOff,
  ShoppingBag,
  Star,
  Timer
} from 'lucide-react';

/** --- Safe Image Component --- **/
function SafeImage({ src, alt, fill, width, height, className, priority, fallbackClassName }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean; fallbackClassName?: string;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-primary/60 to-accent/10 ${fallbackClassName ?? className ?? ''}`}>
        <ImageOff size={28} className="text-white/20" />
      </div>
    );
  }
  return (
    <Image 
      src={src} 
      alt={alt} 
      fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} 
      priority={priority}
      onError={() => setError(true)} 
    />
  );
}

/** --- Scroll Reveal Hook --- **/
const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  const brand = {
    name: "Aderaf Entertainment Ventures",
    tagline: "Sweetening Every Celebration in Lagos",
    description: "Aderaf Entertainment Ventures is Lagos premier destination for bespoke celebration cakes and gourmet snacks. We transform high-quality ingredients into edible art, ensuring every milestone is marked with unforgettable flavor and flair.",
    industry: "Food & Celebration"
  };

  const images = {
    hero: "https://images.unsplash.com/photo-1759524322472-3f146a43cf9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    about: "https://images.unsplash.com/photo-1771209633813-6ed84bc7aa44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    products: [
      "https://images.unsplash.com/photo-1488474229303-56bb637803f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      "https://images.unsplash.com/photo-1701547267622-85d049f9ab2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      "https://images.unsplash.com/photo-1761078739411-2ccb6e956c16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      "https://images.unsplash.com/photo-1764740130608-c3cf7214ebfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    ]
  };

  const features = [
    { title: "Bespoke Designs", description: "Your vision, our creation. Every cake is custom-tailored to your event unique theme.", icon: <Cake size={24} /> },
    { title: "Freshly Baked Daily", description: "We don't do shelf-life. Everything is baked from scratch on the day of your order.", icon: <Flame size={24} /> },
    { title: "Premium Ingredients", description: "We use only the finest butter and chocolate to ensure the taste matches the beauty.", icon: <Star size={24} /> },
    { title: "Fast Lagos Delivery", description: "Careful and timely delivery across Lagos to keep your treats in perfect condition.", icon: <Truck size={24} /> }
  ];

  const products = [
    { name: "Signature Red Velvet", description: "Rich, velvety layers with our secret cream cheese frosting, perfect for birthdays.", price: "₦15,000" },
    { name: "Gourmet Chocolate Drip", description: "Decadent dark chocolate sponge finished with a silky ganache and premium toppings.", price: "₦18,500" },
    { name: "Luxury Party Platter", description: "An assortment of meat pies, spring rolls, and samosas for the ultimate Lagos party experience.", price: "₦12,000" },
    { name: "Customized Cupcake Dozen", description: "12 handcrafted cupcakes themed to your celebration with bespoke frosting designs.", price: "₦10,500" }
  ];

  const testimonials = [
    { name: "Tunde Bakare", text: "The best red velvet I have ever tasted in Lagos. Period.", role: "Birthday Client" },
    { name: "Ifeoma Okoro", text: "Their snack platters saved my housewarming party. Everyone wanted the meatpie recipe!", role: "Event Host" },
    { name: "Amina Bello", text: "The attention to detail on my wedding cake was insane. Aderaf is the real deal.", role: "Bride" }
  ];

  const stats = [
    { number: "500+", label: "Cakes Baked" },
    { number: "100%", label: "Sugar Rush" },
    { number: "Lagos", label: "Operating City" }
  ];

  const { ref: featRef, isVisible: featVisible } = useScrollReveal();
  const { ref: prodRef, isVisible: prodVisible } = useScrollReveal();
  const { ref: abRef, isVisible: abVisible } = useScrollReveal();
  const { ref: testRef, isVisible: testVisible } = useScrollReveal();
  const { ref: contRef, isVisible: contVisible } = useScrollReveal();

  return (
    <main className="relative">
      {/* --- Navigation --- */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-primary shadow-2xl py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-accent flex items-center justify-center rounded-lg shadow-lg">
              <span className="text-primary font-black text-2xl">A</span>
            </div>
            <span className="font-heading font-bold text-xl tracking-tight hidden sm:block">ADERAF</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['Home', 'Menu', 'About', 'Order'].map((link) => (
              <a 
                key={link} 
                href={`#${link.toLowerCase()}`} 
                className="text-sm font-bold uppercase tracking-widest hover:text-accent transition-colors"
              >
                {link}
              </a>
            ))}
            <a href="#contact" className="bg-accent text-primary px-6 py-2 rounded-full font-black text-sm hover:scale-105 transition-transform">
              ORDER NOW
            </a>
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* --- Mobile Sidebar --- */}
      <div className={`fixed inset-0 z-[60] transition-transform duration-500 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 bg-black/40" onClick={() => setMobileMenuOpen(false)} />
        <div className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-primary p-10 flex flex-col shadow-2xl">
          <button className="self-end mb-12 text-white" onClick={() => setMobileMenuOpen(false)}>
            <X size={32} />
          </button>
          <div className="flex flex-col gap-6">
            {['Home', 'Menu', 'About', 'Order'].map((link) => (
              <a 
                key={link} 
                href={`#${link.toLowerCase()}`} 
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-heading font-bold uppercase tracking-widest border-b border-white/10 pb-2"
              >
                {link}
              </a>
            ))}
          </div>
          <div className="mt-auto pt-10 border-t border-white/10">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-4">Find us on Instagram</p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <Instagram size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- HERO: HR-B --- */}
      <section id="home" className="min-h-screen relative flex items-end pb-24 px-6 md:px-16 overflow-hidden">
        <SafeImage src={images.hero} alt={brand.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-transparent" />
        <div className="relative z-10 max-w-4xl">
          <h1 className="font-heading text-6xl md:text-9xl font-black text-white leading-[0.85] tracking-tighter uppercase">
            Cakes that Pop, <br /> Snacks that Rock!
          </h1>
          <p className="text-white/80 mt-8 text-xl max-w-2xl leading-relaxed font-light">
            From luxury wedding tiers to the crunchiest party snacks, Aderaf brings the vibes to your tastebuds. Sharp delivery in Lagos.
          </p>
          <div className="flex flex-wrap gap-4 mt-12">
            <a href="#contact" className="bg-accent text-primary px-10 py-5 font-black text-lg
              hover:brightness-110 transition-all rounded-full shadow-[0_10px_30px_rgba(255,230,109,0.3)]">
              Order on Instagram
            </a>
            <a href="#menu" className="text-white border-2 border-white/30 px-10 py-5 font-bold text-lg
              hover:bg-white/10 transition-all rounded-full backdrop-blur-md">
              Explore Menu
            </a>
          </div>
        </div>
      </section>

      {/* --- FEATURES: F-ICON-GRID --- */}
      <section ref={featRef} id="features" className="py-28 px-6 bg-primary">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className={`font-heading text-5xl md:text-7xl font-black text-white uppercase tracking-tighter transition-all duration-700 ${featVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              The Aderaf Standard
            </h2>
            <p className="text-white/60 mt-4 text-lg">Why Lagosians choose us for their biggest moments.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <div 
                key={i} 
                style={{ transitionDelay: `${i * 100}ms` }}
                className={`p-8 rounded-3xl border border-white/10 bg-white/5 hover:bg-secondary/20 hover:border-secondary transition-all duration-500 group cursor-default ${featVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                <div className="mb-6 w-14 h-14 rounded-2xl bg-accent text-primary flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  {f.icon}
                </div>
                <h3 className="font-heading font-black text-white text-2xl uppercase leading-tight mb-3">{f.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- DIVIDER: D-STAT --- */}
      <div className="bg-accent py-16 relative z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-black/10" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-primary/20 text-center">
          {stats.map((s, i) => (
            <div key={i} className="px-8 py-6 md:py-4">
              <p className="text-5xl md:text-6xl font-black text-primary tracking-tighter uppercase">{s.number}</p>
              <p className="text-primary/60 text-sm mt-1 font-bold uppercase tracking-[0.2em]">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-black/10" />
      </div>

      {/* --- PRODUCTS: P-ASYMMETRIC --- */}
      <section ref={prodRef} id="menu" className="py-28 px-6 bg-primary relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <h2 className={`font-heading text-6xl md:text-8xl font-black text-white uppercase leading-none max-w-xl transition-all duration-700 ${prodVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              Our Best Sellers
            </h2>
            <p className="text-white/40 text-lg md:text-right max-w-xs font-light">Treat yourself to our most-loved cakes and party platters.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className={`md:col-span-7 group relative rounded-[40px] overflow-hidden transition-all duration-1000 ${prodVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <div className="relative h-[500px] md:h-[600px]">
                <SafeImage src={images.products[0]} alt={products[0].name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-0 p-10 md:p-14">
                  <span className="bg-secondary text-primary font-black px-4 py-1 rounded-full text-xs uppercase mb-4 inline-block">Featured</span>
                  <h3 className="font-heading text-4xl md:text-6xl font-black text-white uppercase">{products[0].name}</h3>
                  <div className="flex items-center justify-between mt-6 max-w-md">
                    <p className="text-white/70 text-base font-light line-clamp-2">{products[0].description}</p>
                    <span className="text-accent font-black text-3xl ml-8 shrink-0">{products[0].price}</span>
                  </div>
                  <a href="#contact" className="mt-8 inline-flex items-center gap-3 bg-white text-primary px-8 py-4 rounded-full font-black text-sm hover:bg-accent transition-colors">
                    ORDER NOW <ShoppingBag size={18} />
                  </a>
                </div>
              </div>
            </div>

            <div className="md:col-span-5 flex flex-col gap-6">
              {products.slice(1, 3).map((p, i) => (
                <div 
                  key={i} 
                  className={`group relative rounded-[32px] overflow-hidden flex-1 transition-all duration-1000 ${prodVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
                  style={{ transitionDelay: `${i * 200 + 300}ms` }}
                >
                  <div className="relative h-[240px] md:h-full">
                    <SafeImage src={images.products[i + 1]} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-0 p-8">
                      <h3 className="font-heading text-2xl font-black text-white uppercase">{p.name}</h3>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-accent font-black text-xl">{p.price}</span>
                        <a href="#contact" className="text-xs text-white/60 font-bold uppercase tracking-widest hover:text-secondary transition-colors">Select Treat</a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Final Row Item */}
          <div className={`mt-6 p-8 md:p-12 rounded-[40px] bg-secondary/10 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 transition-all duration-700 ${prodVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex items-center gap-8">
               <div className="w-24 h-24 relative rounded-2xl overflow-hidden shrink-0 hidden sm:block">
                  <SafeImage src={images.products[3]} alt={products[3].name} fill className="object-cover" />
               </div>
               <div>
                  <h3 className="font-heading text-3xl font-black text-white uppercase">{products[3].name}</h3>
                  <p className="text-white/40 max-w-md mt-1">{products[3].description}</p>
               </div>
            </div>
            <div className="text-right flex items-center gap-8">
               <span className="text-4xl font-black text-accent">{products[3].price}</span>
               <a href="#contact" className="bg-primary text-white p-5 rounded-full hover:scale-110 transition-transform">
                  <ShoppingBag size={24} />
               </a>
            </div>
          </div>
        </div>
      </section>

      {/* --- ABOUT: SPLIT LAYOUT --- */}
      <section ref={abRef} id="about" className="py-28 bg-white text-primary overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div className={`relative transition-all duration-1000 ${abVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <div className="relative z-10 aspect-[4/5] rounded-[60px] overflow-hidden shadow-2xl">
              <SafeImage src={images.about} alt="Baking Process" fill className="object-cover" />
            </div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent rounded-full -z-0 animate-float" />
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-secondary rounded-full -z-0 opacity-20" />
          </div>
          
          <div className={`transition-all duration-1000 delay-300 ${abVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            <h2 className="font-heading text-6xl md:text-8xl font-black uppercase leading-[0.85] mb-8">
              The Heart <br /> of the Bake
            </h2>
            <p className="text-primary/70 text-xl leading-relaxed mb-8">
              Aderaf Entertainment Ventures started with a simple mission: to make every celebration in Lagos a little bit sweeter. We combine traditional Nigerian baking heart with modern, funky designs to give you treats that taste just as good as they look.
            </p>
            <div className="grid grid-cols-2 gap-8 mb-10">
              <div className="flex gap-4">
                <ChefHat className="text-secondary shrink-0" size={32} />
                <div>
                  <h4 className="font-black text-xl uppercase mb-1">Crafted</h4>
                  <p className="text-primary/50 text-sm">Artisan quality in every slice.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Timer className="text-secondary shrink-0" size={32} />
                <div>
                  <h4 className="font-black text-xl uppercase mb-1">On Time</h4>
                  <p className="text-primary/50 text-sm">Lagos delivery that stays fresh.</p>
                </div>
              </div>
            </div>
            <a href="#contact" className="inline-block bg-primary text-white px-10 py-5 rounded-full font-black text-lg uppercase shadow-xl hover:-translate-y-1 transition-all">
              Join the Celebration
            </a>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS: T-SLIDER --- */}
      <section ref={testRef} className="py-28 bg-primary overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <h2 className={`font-heading text-6xl md:text-8xl font-black text-white uppercase text-center transition-all duration-700 ${testVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Sweet Reviews
          </h2>
        </div>
        <div className="w-full overflow-hidden">
          <div className="flex w-[200%] gap-6 animate-slide-left hover:[animation-play-state:paused]">
            {[...testimonials, ...testimonials].map((t, i) => (
              <div key={i} className="w-80 md:w-[450px] shrink-0 bg-white/5 border border-white/10 rounded-[40px] p-10 backdrop-blur-sm">
                <div className="flex gap-2 mb-8">
                  {[1,2,3,4,5].map(n => <Star key={n} size={16} fill="var(--accent)" className="text-accent" />)}
                </div>
                <p className="text-white text-xl md:text-2xl font-light italic leading-relaxed mb-10">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-5 border-t border-white/10 pt-8">
                  <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center text-primary font-black text-2xl">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-black text-white text-lg uppercase tracking-wider">{t.name}</p>
                    <p className="text-secondary font-bold text-xs uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT: C4 --- */}
      <section id="contact" ref={contRef} className="py-28 px-6 bg-accent">
        <div className="max-w-6xl mx-auto">
          <h2 className={`font-heading text-[12vw] md:text-[10vw] font-black text-primary leading-none mb-12 uppercase tracking-tighter transition-all duration-1000 ${contVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            Let&apos;s Get Baking!
          </h2>
          
          <div className="grid md:grid-cols-[1fr_1.5fr] gap-16 items-start border-t-4 border-primary pt-16">
            <div className="space-y-8">
              <p className="text-primary text-2xl font-black uppercase max-w-xs"> Lagos energy in every box. Reach out for bespoke orders. </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-primary group cursor-pointer">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Instagram size={24} />
                  </div>
                  <span className="font-bold text-xl">@aderaf_entertainment_ventures</span>
                </div>
                <div className="flex items-center gap-4 text-primary">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center">
                    <MapPin size={24} />
                  </div>
                  <span className="font-bold text-xl">Lagos, Nigeria</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-2xl relative">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-20 text-center animate-scaleIn">
                  <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center mb-8 border-2 border-secondary">
                    <CheckCheck size={40} className="text-secondary" />
                  </div>
                  <h3 className="font-heading text-4xl font-black text-primary uppercase">Message Sent!</h3>
                  <p className="text-primary/60 mt-4 text-lg">We&apos;ll get back to you sharp sharp!</p>
                  <button onClick={() => setSent(false)} className="mt-8 text-secondary font-black underline uppercase tracking-widest">Send Another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      required
                      value={formState.name}
                      onChange={e => setFormState({...formState, name: e.target.value})}
                      className="w-full bg-primary/5 border-2 border-primary/10 rounded-2xl px-6 py-4 text-primary font-bold placeholder-primary/30 outline-none focus:border-secondary transition-all" 
                    />
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      required
                      value={formState.email}
                      onChange={e => setFormState({...formState, email: e.target.value})}
                      className="w-full bg-primary/5 border-2 border-primary/10 rounded-2xl px-6 py-4 text-primary font-bold placeholder-primary/30 outline-none focus:border-secondary transition-all" 
                    />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Celebration Date" 
                    value={formState.phone}
                    onChange={e => setFormState({...formState, phone: e.target.value})}
                    className="w-full bg-primary/5 border-2 border-primary/10 rounded-2xl px-6 py-4 text-primary font-bold placeholder-primary/30 outline-none focus:border-secondary transition-all" 
                  />
                  <textarea 
                    rows={4} 
                    placeholder="Tell us about your dream cake..." 
                    required
                    value={formState.message}
                    onChange={e => setFormState({...formState, message: e.target.value})}
                    className="w-full bg-primary/5 border-2 border-primary/10 rounded-2xl px-6 py-4 text-primary font-bold placeholder-primary/30 outline-none focus:border-secondary transition-all resize-none" 
                  />
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-primary text-white py-5 rounded-2xl font-black text-xl uppercase tracking-widest hover:bg-secondary transition-all disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-primary pt-24 pb-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-accent flex items-center justify-center rounded-xl shadow-lg">
                  <span className="text-primary font-black text-3xl">A</span>
                </div>
                <span className="font-heading font-black text-3xl tracking-tight uppercase">ADERAF</span>
              </div>
              <p className="text-white/40 max-w-sm text-lg leading-relaxed">
                Making every milestone in Lagos unforgettable with flavor, flair, and bespoke cake art.
              </p>
              <div className="flex gap-4 mt-8">
                <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-all">
                  <Instagram size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-heading text-xl font-bold uppercase mb-8 tracking-widest text-secondary">Quick Links</h4>
              <ul className="space-y-4">
                {['Home', 'Menu', 'About', 'Order'].map(l => (
                  <li key={l}>
                    <a href={`#${l.toLowerCase()}`} className="text-white/50 hover:text-white transition-colors uppercase font-bold text-sm tracking-widest">{l}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-heading text-xl font-bold uppercase mb-8 tracking-widest text-secondary">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-white/50 text-sm">
                  <MapPin size={18} className="text-accent" /> Lagos, Nigeria
                </li>
                <li className="flex items-center gap-3 text-white/50 text-sm">
                  <Timer size={18} className="text-accent" /> Mon - Sat: 9am - 6pm
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/30 text-xs font-bold uppercase tracking-[0.3em]">
              &copy; {new Date().getFullYear()} Aderaf Entertainment Ventures
            </p>
            <p className="text-white/30 text-xs font-bold uppercase tracking-[0.3em]">
              Crafted in Lagos
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
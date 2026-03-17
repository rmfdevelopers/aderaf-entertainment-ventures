'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  ChefHat, 
  Zap, 
  Leaf, 
  UtensilsCrossed, 
  Instagram, 
  Mail, 
  MapPin, 
  Phone, 
  Menu, 
  X, 
  CheckCheck, 
  ImageOff,
  Award,
  ArrowRight,
  Clock3,
  ShoppingBag
} from 'lucide-react';

// --- DATA FROM BRIEF ---
const brand = {
  name: "Aderaf Entertainment Ventures",
  tagline: "Crafting Moments, One Delightful Bite at a Time.",
  description: "Artisan bakery specializing in bespoke cakes, gourmet pastries, and premium savory snacks, serving the vibrant community of Lagos.",
  industry: "Food & Beverage",
  region: "nigeria",
  currency: "₦"
};

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1685030530162-c2c1333b1629?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  about: "https://images.unsplash.com/photo-1698756315982-ac33959ae685?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  products: [
    "https://images.unsplash.com/photo-1685030530162-c2c1333b1629?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1723476355253-88309fec88a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1587244399104-f12b41169443?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1676984613173-a71a287b3c15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  ]
};

const products = [
  { name: "Royal Chocolate Overload Cake", description: "A towering masterpiece of dark chocolate sponge, ganache filling, and sea salt caramel drizzle.", price: "₦18,500" },
  { name: "Spicy Suya Puffs", description: "Flaky pastry filled with authentic Nigerian spiced meat mixture. A savory snack sensation.", price: "₦4,500" },
  { name: "Red Velvet Mini-Bundt", description: "Classic, moist red velvet cake baked into individual, perfectly portioned bundt shapes.", price: "₦7,200" },
  { name: "Artisan Doughnut Box", description: "Box of six handcrafted doughnuts featuring glazes like mango-chili and coconut-lime.", price: "₦6,800" }
];

const features = [
  { title: "Fresh Ingredients", description: "We source only the freshest local and imported ingredients to guarantee unparalleled taste.", icon: Leaf },
  { title: "Fast Delivery", description: "Quick and reliable order fulfillment across Lagos, ensuring your treats arrive fresh.", icon: Zap },
  { title: "Chef's Special", description: "Weekly rotating specialty items designed by our head baker to surprise your palate.", icon: ChefHat }
];

const testimonials = [
  { name: "Tolu A.", text: "The Royal Chocolate Cake was the centerpiece of my wedding anniversary! Rich, moist, and absolutely stunning.", role: "Event Planner" },
  { name: "Bisi O.", text: "Seriously addicted to the Suya Puffs. I order them every weekend. Best snack in Ikeja!", role: "Frequent Customer" },
  { name: "Dayo K.", text: "Ordering was seamless, way better than sliding into DMs. The delivery was prompt.", role: "Lekki Resident" }
];

const stats = [
  { number: "500+", label: "Satisfied Orders", icon: UtensilsCrossed },
  { number: "3+", label: "Years Baking", icon: ChefHat },
  { number: "98%", label: "5-Star Reviews", icon: Award }
];

// --- UTILITIES ---

function SafeImage({ src, alt, fill, width, height, className, priority, fallbackClassName }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean; fallbackClassName?: string;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-[#FF5733] to-[#FFC300]/30 ${fallbackClassName ?? className ?? ''}`}>
        <ImageOff size={28} className="text-white/20" />
      </div>
    );
  }
  return (
    <Image src={src} alt={alt} fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} priority={priority}
      onError={() => setError(true)} />
  );
}

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

// --- COMPONENTS ---

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#FF5733] shadow-2xl py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-[#FFC300] flex items-center justify-center rounded-lg rotate-3 group-hover:rotate-0 transition-transform">
              <UtensilsCrossed size={22} className="text-black" />
            </div>
            <span className="font-heading text-2xl font-bold tracking-tighter text-white uppercase italic">Aderaf</span>
          </a>
          
          <div className="hidden md:flex items-center gap-10">
            {['Menu', 'About', 'Contact'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className="font-heading text-sm uppercase tracking-widest hover:text-[#FFC300] transition-colors">
                {link}
              </a>
            ))}
            <a href="#contact" className="bg-[#FFC300] text-black px-6 py-2.5 rounded-full font-bold text-sm uppercase tracking-tighter hover:scale-105 transition-all">
              See Menu
            </a>
          </div>

          <button onClick={() => setIsOpen(true)} className="md:hidden text-white">
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-[60] transition-transform duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
        <div className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-[#FF5733] p-10 flex flex-col">
          <button onClick={() => setIsOpen(false)} className="self-end text-white mb-12">
            <X size={32} />
          </button>
          <div className="flex flex-col gap-8">
            {['Menu', 'About', 'Contact'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setIsOpen(false)} className="font-heading text-4xl font-bold uppercase tracking-tighter text-white hover:text-[#FFC300]">
                {link}
              </a>
            ))}
          </div>
          <div className="mt-auto border-t border-white/10 pt-8">
            <p className="font-heading text-[#FFC300] uppercase tracking-widest text-xs mb-4">Follow the vibe</p>
            <div className="flex gap-4">
              <Instagram className="text-white hover:text-[#FFC300] cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function Website() {
  const heroReveal = useScrollReveal();
  const featuresReveal = useScrollReveal();
  const productsReveal = useScrollReveal();
  const aboutReveal = useScrollReveal();
  const testimonialsReveal = useScrollReveal();
  const contactReveal = useScrollReveal();

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1200);
  };

  return (
    <main className="overflow-x-hidden">
      <Navigation />

      {/* HERO - HR-B Variant */}
      <section id="home" className="min-h-screen relative flex items-end pb-24 px-6 md:px-16 overflow-hidden">
        <SafeImage src={IMAGES.hero} alt={brand.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FF5733] via-[#FF5733]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF5733]/60 to-transparent" />
        <div className="relative z-10 max-w-4xl">
          <h1 className="font-heading text-6xl md:text-[9rem] font-black text-white leading-[0.85] tracking-tighter uppercase italic">
            Your Lagos <br /> Sweet Spot.
          </h1>
          <p className="text-white/90 mt-8 text-xl md:text-2xl max-w-2xl font-light leading-relaxed">
            Stop scrolling IG. Order your bespoke cakes and gourmet snacks directly from Aderaf Entertainment Ventures.
          </p>
          <div className="flex flex-wrap gap-4 mt-10">
            <a href="#menu" className="bg-[#FFC300] text-black px-10 py-5 font-black text-xl uppercase tracking-tighter
              hover:brightness-110 hover:-translate-y-1 transition-all rounded-full flex items-center gap-3">
              See The Menu <ArrowRight size={24} />
            </a>
            <a href="#about" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-5 font-bold text-xl uppercase tracking-tighter
              hover:bg-white/20 transition-all rounded-full">
              The Story
            </a>
          </div>
        </div>
      </section>

      {/* DIVIDER D-GRID */}
      <div className="py-12 bg-black border-y-4 border-[#FFC300]">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-12">
          {['Handcrafted', 'Lagos Finest', 'Bespoke Cakes', 'Gourmet Snacks', 'Artisan Bakery'].map((word, i) => (
            <div key={i} className="flex items-center gap-3 text-[#FFC300] text-lg font-heading tracking-widest uppercase italic font-bold">
              <div className="w-2 h-2 rounded-full bg-[#33FF57]" />
              {word}
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES - ICON GRID */}
      <section id="features" ref={featuresReveal.ref} className="py-32 px-6 bg-[#FF5733]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div>
              <h2 className={`font-heading text-6xl md:text-7xl font-black text-white uppercase italic leading-none transition-all duration-700 
                ${featuresReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                Why Choose <br /> <span className="text-[#FFC300]">Aderaf?</span>
              </h2>
            </div>
            <p className="text-white/70 max-w-sm text-lg font-medium border-l-2 border-[#33FF57] pl-6 italic">
              The quality is non-negotiable, the flavor is unforgettable. We don&apos;t just bake; we create.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className={`p-10 rounded-[2.5rem] bg-black group hover:bg-[#33FF57] transition-all duration-500
                ${featuresReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${i * 150}ms` }}>
                <div className="w-16 h-16 rounded-2xl bg-[#FFC300] flex items-center justify-center mb-8 
                  group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                  <f.icon size={32} className="text-black" />
                </div>
                <h3 className="font-heading text-3xl font-bold text-white group-hover:text-black uppercase mb-4">{f.title}</h3>
                <p className="text-white/50 group-hover:text-black/70 text-lg leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS - P-STAGGER */}
      <section id="menu" ref={productsReveal.ref} className="py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="font-heading text-6xl md:text-8xl font-black text-black uppercase italic leading-none text-center">
            Our Current <br /> <span className="text-[#FF5733]">Delights.</span>
          </h2>
        </div>

        <div className="max-w-6xl mx-auto space-y-32">
          {products.map((p, i) => (
            <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24 transition-all duration-1000
              ${productsReveal.isVisible ? 'opacity-100 translate-x-0' : i % 2 === 0 ? 'opacity-0 -translate-x-20' : 'opacity-0 translate-x-20'}`}>
              <div className="w-full md:w-1/2 relative">
                <div className="aspect-square relative rounded-[3rem] overflow-hidden shadow-2xl group border-8 border-[#FFC300]">
                  <SafeImage src={IMAGES.products[i]} alt={p.name} fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className={`absolute -bottom-8 ${i % 2 === 0 ? '-right-8' : '-left-8'} w-32 h-32
                  bg-[#33FF57] rounded-full -z-10 animate-float flex items-center justify-center`}>
                  <UtensilsCrossed size={48} className="text-black/20" />
                </div>
              </div>
              <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'text-left' : 'md:text-right'}`}>
                <span className="font-heading text-[#FF5733] text-2xl font-black uppercase italic mb-4 block tracking-tight">
                  Selection 0{i + 1}
                </span>
                <h3 className="font-heading text-5xl md:text-6xl font-black text-black leading-none uppercase">{p.name}</h3>
                <p className="text-black/60 mt-6 text-xl leading-relaxed font-medium">{p.description}</p>
                <div className={`mt-10 flex flex-col gap-6 ${i % 2 === 0 ? 'items-start' : 'items-start md:items-end'}`}>
                  <span className="text-5xl font-black text-black bg-[#FFC300] px-4 py-2 inline-block -rotate-2">
                    {p.price}
                  </span>
                  <a href="#contact" className="bg-[#FF5733] text-white px-10 py-4 rounded-full font-black uppercase text-lg shadow-xl hover:scale-105 transition-all flex items-center gap-2">
                    <ShoppingBag size={20} /> Order Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT - ASYMMETRIC STATS */}
      <section id="about" ref={aboutReveal.ref} className="py-32 px-6 bg-black relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-[#FFC300]" />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className={`transition-all duration-1000 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <h2 className="font-heading text-6xl md:text-8xl font-black text-white uppercase italic leading-none mb-10">
              The <span className="text-[#33FF57]">Venture</span> Story.
            </h2>
            <p className="text-white/60 text-xl leading-relaxed mb-12">
              Born from a passion for creating joy through food, Aderaf Entertainment Ventures has rapidly become a favorite in the Lagos culinary scene. We believe every gathering deserves a touch of handcrafted excellence, transforming simple snacks and cakes into memorable experiences.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {stats.map((s, i) => (
                <div key={i} className="text-left border-l-2 border-[#FFC300] pl-6 py-2">
                  <div className="text-[#FFC300] mb-2"><s.icon size={24} /></div>
                  <p className="font-heading text-4xl font-black text-white">{s.number}</p>
                  <p className="text-white/40 text-xs uppercase tracking-[0.3em] font-bold mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={`relative aspect-[4/5] md:aspect-square transition-all duration-1000 delay-300 
            ${aboutReveal.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="absolute -inset-4 border-2 border-[#FFC300] rounded-[3rem] -rotate-3" />
            <div className="absolute -inset-4 border-2 border-[#33FF57] rounded-[3rem] rotate-3" />
            <SafeImage src={IMAGES.about} alt="Bakery Process" fill className="object-cover rounded-[3rem] z-10" />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - T-SLIDER */}
      <section id="testimonials" ref={testimonialsReveal.ref} className="py-32 bg-[#FFC300] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="font-heading text-6xl md:text-7xl font-black text-black uppercase italic leading-none">
            What Lagos <br /> <span className="text-white text-stroke-black">is Saying.</span>
          </h2>
          <div className="flex gap-4">
            <div className="p-3 bg-black text-[#FFC300] rounded-full"><Clock3 size={24} /></div>
            <p className="text-black font-bold max-w-[200px] text-sm uppercase leading-tight tracking-tighter">Verified reviews from our community.</p>
          </div>
        </div>
        
        <div className="w-full">
          <div className="flex w-[200%] gap-6 animate-slide-left hover:[animation-play-state:paused] py-10">
            {[...testimonials, ...testimonials].map((t, i) => (
              <div key={i} className="w-[350px] md:w-[450px] shrink-0 bg-white shadow-[12px_12px_0px_rgba(0,0,0,1)] rounded-3xl p-10 border-4 border-black">
                <div className="flex gap-2 mb-6">
                  {[1,2,3,4,5].map(n => <div key={n} className="w-3 h-3 rounded-full bg-[#FF5733]" />)}
                </div>
                <p className="text-black text-xl font-medium leading-relaxed italic mb-8 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-4 border-t-2 border-black/5 pt-6">
                  <div className="w-14 h-14 rounded-full bg-[#33FF57] flex items-center justify-center text-black font-black text-2xl border-2 border-black">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-heading font-black text-black text-xl uppercase tracking-tight">{t.name}</p>
                    <p className="text-black/50 text-sm font-bold uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT - C4 Pattern */}
      <section id="contact" ref={contactReveal.ref} className="py-32 px-6 bg-[#FFC300]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-heading text-7xl md:text-9xl font-black text-black leading-none mb-10 uppercase italic">
                Ready to <br /> <span className="text-[#FF5733]">Order?</span>
              </h2>
              <div className="space-y-8">
                <p className="text-black/70 text-2xl font-medium max-w-sm leading-tight italic">
                  Don&apos;t wait for the weekend. We deliver fresh daily across Lagos.
                </p>
                <div className="flex flex-col gap-4">
                  <a href={`https://instagram.com/aderaf_entertainment_ventures`} target="_blank" 
                    className="flex items-center gap-4 text-black hover:translate-x-2 transition-transform">
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-[#FFC300]">
                      <Instagram size={24} />
                    </div>
                    <span className="font-heading text-xl font-bold uppercase italic">@aderaf_entertainment</span>
                  </a>
                  <div className="flex items-center gap-4 text-black">
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-[#FFC300]">
                      <MapPin size={24} />
                    </div>
                    <span className="font-heading text-xl font-bold uppercase italic">Lagos, Nigeria</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border-8 border-black p-10 rounded-[3rem] shadow-[20px_20px_0px_rgba(0,0,0,1)] relative">
              <div className="absolute -top-10 -right-6 w-24 h-24 bg-[#33FF57] rounded-full border-4 border-black flex items-center justify-center rotate-12">
                <UtensilsCrossed size={40} className="text-black" />
              </div>
              
              {sent ? (
                <div className="flex flex-col items-center justify-center py-16 text-center animate-scaleIn">
                  <div className="w-20 h-20 rounded-full bg-[#33FF57] flex items-center justify-center mb-6 border-4 border-black">
                    <CheckCheck size={40} className="text-black" />
                  </div>
                  <h3 className="font-heading text-4xl font-black text-black uppercase">We Got You!</h3>
                  <p className="text-black/60 mt-4 max-w-xs font-bold uppercase text-sm">Our head baker will contact you shortly to confirm your cravings.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6">
                    {(['name', 'phone', 'email'] as const).map(field => (
                      <div key={field} className="relative group">
                        <input
                          type={field === 'email' ? 'email' : 'text'}
                          placeholder={field.toUpperCase()}
                          value={form[field]}
                          onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
                          required={field !== 'phone'}
                          className="w-full bg-black/5 border-b-4 border-black px-4 py-5
                            text-black placeholder-black/40 text-xl font-heading font-bold outline-none
                            focus:bg-[#33FF57]/10 transition-all" />
                      </div>
                    ))}
                  </div>
                  <textarea rows={3} placeholder="TELL US YOUR CRAVING..."
                    value={form.message}
                    onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                    required
                    className="w-full bg-black/5 border-b-4 border-black px-4 py-5
                      text-black placeholder-black/40 text-xl font-heading font-bold outline-none
                      resize-none focus:bg-[#33FF57]/10 transition-all" />
                  <button type="submit" disabled={loading}
                    className="w-full bg-[#FF5733] text-white py-6 rounded-2xl font-heading font-black text-3xl
                      uppercase italic tracking-tighter shadow-xl hover:brightness-110 active:scale-95 transition-all
                      disabled:opacity-60 disabled:cursor-not-allowed">
                    {loading ? 'Processing...' : 'Place Inquiry'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER - F1 */}
      <footer className="bg-black py-20 px-6 border-t-8 border-[#33FF57]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-md">
            <a href="#" className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-[#FFC300] flex items-center justify-center rounded-xl rotate-3">
                <UtensilsCrossed size={28} className="text-black" />
              </div>
              <span className="font-heading text-4xl font-black tracking-tighter text-white uppercase italic">Aderaf</span>
            </a>
            <p className="text-white/40 text-lg leading-relaxed font-medium">
              Sharp delivery, nationwide. Lagos&apos; preferred choice for artisan treats and event catering.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 w-full md:w-auto">
            <div>
              <h4 className="font-heading text-[#FFC300] uppercase tracking-widest text-sm font-bold mb-6">Explore</h4>
              <ul className="space-y-4">
                {['Menu', 'About', 'Contact'].map(item => (
                  <li key={item}><a href={`#${item.toLowerCase()}`} className="text-white/60 hover:text-white transition-colors uppercase text-sm font-bold tracking-tight">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-heading text-[#33FF57] uppercase tracking-widest text-sm font-bold mb-6">Connect</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-white/60 hover:text-white transition-colors uppercase text-sm font-bold tracking-tight">Instagram</a></li>
                <li><a href="#" className="text-white/60 hover:text-white transition-colors uppercase text-sm font-bold tracking-tight">WhatsApp</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-xs font-bold tracking-[0.3em] uppercase">
            &copy; {new Date().getFullYear()} Aderaf Entertainment Ventures. Built for flavor.
          </p>
          <div className="flex gap-8">
            <span className="text-white/10 text-[10px] font-black uppercase tracking-[0.5em]">Baked in Lagos</span>
          </div>
        </div>
      </footer>

      {/* STYLES FOR ANIMATIONS */}
      <style jsx global>{`
        .text-stroke-black {
          -webkit-text-stroke: 2px black;
        }
        @keyframes slide-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-slide-left {
          animation: slide-left 40s linear infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scaleIn {
          animation: scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </main>
  );
}
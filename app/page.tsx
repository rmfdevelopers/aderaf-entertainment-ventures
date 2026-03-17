'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  UtensilsCrossed, 
  Truck, 
  ChefHat, 
  Instagram, 
  Mail, 
  MapPin, 
  Phone, 
  Menu, 
  X, 
  ImageOff, 
  CheckCheck,
  TrendingUp,
  Clock3,
  Heart
} from 'lucide-react';

// --- Data ---
const BRAND = {
  name: "Aderaf Entertainment Ventures",
  tagline: "Where Every Crumb Tells a Story of Joy.",
  description: "Artisanally crafted cakes and gourmet snacks, baked fresh daily to elevate your celebrations in Lagos and beyond.",
  industry: "food & beverage",
  region: "nigeria",
  currency: "₦"
};

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1694168949272-cd0f0209c5b7?q=80&w=1080",
  products: [
    "https://images.unsplash.com/photo-1607257882338-70f7dd2ae344?q=80&w=1080",
    "https://images.unsplash.com/photo-1741399104858-6ce69d10f22e?q=80&w=1080",
    "https://images.unsplash.com/photo-1685030530162-c2c1333b1629?q=80&w=1080",
    "https://images.unsplash.com/photo-1738932371997-a1a16245250a?q=80&w=1080"
  ]
};

const PRODUCTS = [
  { name: "Velvet Celebration Cake", description: "A rich, deep red velvet cake layered with our signature cream cheese frosting. Perfect for milestone birthdays.", price: "₦18,500" },
  { name: "Chocolate Lava Bites", description: "Decadent, warm chocolate brownie bites, oozing with molten dark chocolate.", price: "₦4,500" },
  { name: "Tropical Punch Cupcakes", description: "Light vanilla cupcakes topped with a bright passionfruit buttercream and coconut flakes.", price: "₦6,000" },
  { name: "Savory Party Pack", description: "A curated box of our best savory puff-puffs, samosas, and mini meat pies. Ideal for gatherings.", price: "₦12,000" }
];

const FEATURES = [
  { title: "Fresh Ingredients", description: "We only source the freshest, high-quality local ingredients for unparalleled taste.", icon: UtensilsCrossed },
  { title: "Fast Delivery", description: "Get your treats delivered hot and fresh straight to your door anywhere in Lagos.", icon: Truck },
  { title: "Chef's Special", description: "Discover our constantly evolving, limited-edition specialty bakes and snacks.", icon: ChefHat }
];

const TESTIMONIALS = [
  { name: "Tosin M.", text: "The cake was a masterpiece! It tasted even better than it looked on Instagram. Top-tier baking!", role: "Event Planner" },
  { name: "Femi O.", text: "The puff-puffs disappeared first at the party. Seriously addictive snacks. Ordering again next week!", role: "Customer" },
  { name: "Funke K.", text: "Incredible customer service and the most beautiful cake I've ever ordered for a wedding shower.", role: "Client" }
];

// --- Components ---

function SafeImage({ src, alt, fill, width, height, className, priority }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-zinc-900 ${className}`}>
        <ImageOff size={24} className="text-white/20" />
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

const useScrollReveal = (threshold = 0.1) => {
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
  const [mobileMenu, setMobileMenu] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
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
    setTimeout(() => { setLoading(false); setSent(true); }, 1200);
  };

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Menu", href: "#products" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <main className="relative overflow-x-hidden">
      
      {/* --- Header --- */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 
        ${scrolled ? 'bg-[#FF6B6B]/95 backdrop-blur-xl shadow-xl' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-[#4ECDC4] flex items-center justify-center rounded-lg rotate-3 group-hover:rotate-0 transition-transform">
              <span className="font-heading font-bold text-xl text-black">A</span>
            </div>
            <span className="font-heading text-xl font-bold tracking-tighter hidden md:block uppercase">Aderaf Entertainment</span>
          </a>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} className="text-sm font-bold uppercase tracking-widest hover:text-[#FFE66D] transition-colors">
                {link.name}
              </a>
            ))}
            <a href="#contact" className="bg-[#FFE66D] text-black px-6 py-2.5 rounded-full font-bold text-sm uppercase tracking-tighter hover:scale-105 transition-transform">
              View Our Menu Now
            </a>
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileMenu(true)}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* --- Mobile Sidebar --- */}
      <div className={`fixed inset-0 z-[60] transition-transform duration-500 ${mobileMenu ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenu(false)} />
        <div className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-[#FF6B6B] p-10 flex flex-col">
          <button className="self-end mb-12" onClick={() => setMobileMenu(false)}><X size={32} /></button>
          <div className="flex flex-col gap-8">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} onClick={() => setMobileMenu(false)} className="font-heading text-4xl font-bold uppercase">
                {link.name}
              </a>
            ))}
            <a href="#contact" onClick={() => setMobileMenu(false)} className="bg-[#FFE66D] text-black py-4 rounded-xl text-center font-bold uppercase mt-4">
              Order Now
            </a>
          </div>
        </div>
      </div>

      {/* --- Hero (HR-B) --- */}
      <section id="home" className="min-h-screen relative flex items-end pb-24 px-6 md:px-16 overflow-hidden bg-black">
        <SafeImage src={IMAGES.hero} alt={BRAND.name} fill className="object-cover opacity-60" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FF6B6B] via-[#FF6B6B]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B6B]/60 to-transparent" />
        <div className="relative z-10 max-w-4xl">
          <h1 className="font-heading text-7xl md:text-[9rem] font-black text-white leading-[0.85] tracking-tighter uppercase">
            Bake.<br />Celebrate.<br /><span className="text-[#FFE66D]">Repeat.</span>
          </h1>
          <p className="text-white/90 mt-8 text-xl md:text-2xl max-w-xl font-medium leading-relaxed">
            Your go-to spot in Lagos for eye-catching cakes and craveable snacks that steal the show.
          </p>
          <div className="flex gap-6 mt-12">
            <a href="#products" className="bg-[#4ECDC4] text-black px-10 py-5 font-black text-lg uppercase tracking-tight
              hover:brightness-110 transition rounded-2xl shadow-[8px_8px_0px_rgba(0,0,0,0.2)] active:translate-y-1 active:shadow-none">
              View Our Menu Now
            </a>
          </div>
        </div>
      </section>

      {/* --- Stats Divider --- */}
      <div className="bg-[#FFE66D] py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Bakes Made", val: "5000+" },
            { label: "Parties Saved", val: "300+" },
            { label: "Years Strong", val: "5+" },
            { label: "Vibe Level", val: "100%" }
          ].map((s, i) => (
            <div key={i} className="text-center md:text-left">
              <p className="font-heading text-5xl font-black text-black leading-none">{s.val}</p>
              <p className="text-black/60 font-bold uppercase text-xs tracking-widest mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* --- Features (F-ICON-GRID) --- */}
      <section className="py-28 px-6 bg-[#FF6B6B]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div>
              <h2 className="font-heading text-6xl md:text-7xl font-black text-white leading-none uppercase">Why Choose Aderaf?</h2>
              <p className="text-white/70 mt-4 text-xl font-medium">We make every moment sweeter.</p>
            </div>
            <div className="w-20 h-2 bg-[#FFE66D]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURES.map((f, i) => (
              <div key={i} className="p-10 rounded-3xl bg-white/10 border-2 border-white/5 hover:bg-white/15 transition-all group">
                <div className="w-16 h-16 rounded-2xl bg-[#4ECDC4] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:-rotate-6 transition-transform">
                  <f.icon size={32} className="text-black" />
                </div>
                <h3 className="font-heading text-3xl font-black text-white uppercase mb-4">{f.title}</h3>
                <p className="text-white/70 text-lg leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Products (P-ASYMMETRIC) --- */}
      <section id="products" className="py-28 px-6 bg-white text-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-heading text-6xl md:text-8xl font-black uppercase leading-none mb-4">The Current Vibe</h2>
            <p className="text-black/50 text-xl font-medium uppercase tracking-widest">Browse our selection of sweet and savory delights.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-7 group relative rounded-[2.5rem] overflow-hidden bg-zinc-100 min-h-[500px]">
              <SafeImage src={IMAGES.products[0]} alt={PRODUCTS[0].name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 p-10">
                <span className="bg-[#4ECDC4] text-black px-4 py-1 rounded-full font-bold text-xs uppercase mb-4 inline-block">Bestseller</span>
                <h3 className="font-heading text-4xl font-bold text-white uppercase">{PRODUCTS[0].name}</h3>
                <p className="text-white/70 mt-4 text-lg max-w-md line-clamp-2">{PRODUCTS[0].description}</p>
                <div className="flex items-center gap-6 mt-8">
                  <span className="text-[#FFE66D] font-black text-3xl">{PRODUCTS[0].price}</span>
                  <a href="#contact" className="bg-white text-black px-8 py-3 rounded-full font-bold text-sm uppercase hover:bg-[#FFE66D] transition-colors">Order Now</a>
                </div>
              </div>
            </div>

            <div className="md:col-span-5 grid grid-rows-2 gap-6">
              {PRODUCTS.slice(1, 3).map((p, i) => (
                <div key={i} className="group relative rounded-[2.5rem] overflow-hidden bg-zinc-100 min-h-[240px]">
                  <SafeImage src={IMAGES.products[i + 1]} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/60" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <h3 className="font-heading text-2xl font-bold text-white uppercase">{p.name}</h3>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-[#4ECDC4] font-black text-xl">{p.price}</span>
                      <a href="#contact" className="text-white font-bold text-sm uppercase underline underline-offset-4 decoration-[#FFE66D]">Order</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="md:col-span-12 group relative rounded-[2.5rem] overflow-hidden bg-[#FFE66D] p-1 items-center">
              <div className="bg-white rounded-[2.3rem] flex flex-col md:flex-row items-center overflow-hidden">
                <div className="relative w-full md:w-1/2 h-64 md:h-[400px]">
                  <SafeImage src={IMAGES.products[3]} alt={PRODUCTS[3].name} fill className="object-cover" />
                </div>
                <div className="w-full md:w-1/2 p-12">
                  <h3 className="font-heading text-5xl font-black uppercase text-black mb-6">{PRODUCTS[3].name}</h3>
                  <p className="text-black/60 text-lg mb-8">{PRODUCTS[3].description}</p>
                  <div className="flex items-center gap-8">
                    <span className="text-5xl font-black text-[#FF6B6B]">{PRODUCTS[3].price}</span>
                    <a href="#contact" className="bg-black text-white px-10 py-4 rounded-full font-black text-lg uppercase tracking-tight hover:scale-105 transition-transform">Get Party Ready</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- About (Story + Stats) --- */}
      <section id="about" className="py-28 px-6 bg-[#FF6B6B] overflow-hidden relative">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#4ECDC4]/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto relative z-10 grid md:grid-cols-2 gap-20 items-center">
          <div>
            <span className="font-heading font-bold uppercase text-[#FFE66D] tracking-[0.3em] text-sm mb-6 block">Our Journey</span>
            <h2 className="font-heading text-6xl md:text-8xl font-black text-white leading-none uppercase mb-10">The Aderaf Story</h2>
            <p className="text-white/80 text-xl leading-relaxed mb-10">
              Started from a home kitchen with a passion for turning simple ingredients into epic celebrations. 
              We believe every snack break should feel like a small party. We&apos;re dedicated to bringing that joy, 
              one beautiful bake at a time, right here in Lagos.
            </p>
            <div className="space-y-6">
              {[
                { label: "Happy Events Catered", val: "300+", icon: TrendingUp },
                { label: "Years Baking", val: "5+", icon: Clock3 },
                { label: "Freshness Guarantee", val: "100%", icon: Heart }
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-6 p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="w-12 h-12 bg-[#FFE66D] rounded-xl flex items-center justify-center text-black">
                    <s.icon size={24} />
                  </div>
                  <div>
                    <p className="font-heading text-2xl font-bold text-white leading-none">{s.val}</p>
                    <p className="text-white/50 text-sm font-bold uppercase">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
             <div className="aspect-square relative rounded-[3rem] overflow-hidden shadow-2xl rotate-3 border-8 border-white/10">
                <SafeImage src="https://images.unsplash.com/photo-1581357618913-4f0b7ccf5909?q=80&w=1080" alt="Baking Joy" fill className="object-cover" />
             </div>
             <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#FFE66D] rounded-full flex items-center justify-center p-8 text-center animate-float">
                <p className="text-black font-black text-xl uppercase leading-tight italic">Sharp delivery across Lagos</p>
             </div>
          </div>
        </div>
      </section>

      {/* --- Testimonials (T-SLIDER) --- */}
      <section className="py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16 flex items-end justify-between">
          <h2 className="font-heading text-6xl font-black text-black uppercase leading-none">What The People Are Saying</h2>
          <div className="hidden md:block w-32 h-2 bg-[#4ECDC4]" />
        </div>
        <div className="w-full overflow-hidden">
          <div className="flex w-[200%] gap-6 animate-slide-left hover:[animation-play-state:paused] py-4">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <div key={i} className="w-80 md:w-[450px] shrink-0 bg-[#FFE66D]/10 border-2 border-black/5 rounded-[2.5rem] p-10 flex flex-col justify-between">
                <div>
                  <div className="flex gap-2 mb-8">
                    {[1,2,3,4,5].map(n => <div key={n} className="w-4 h-4 rounded-full bg-[#FF6B6B]" />)}
                  </div>
                  <p className="text-black text-2xl font-medium leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
                </div>
                <div className="flex items-center gap-4 mt-10 pt-10 border-t border-black/10">
                  <div className="w-14 h-14 rounded-full bg-[#4ECDC4] flex items-center justify-center font-black text-black text-xl">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-heading font-bold text-xl text-black uppercase">{t.name}</p>
                    <p className="text-black/40 text-sm font-bold uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Contact (C4) --- */}
      <section id="contact" className="py-28 px-6 bg-[#4ECDC4]">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-[12vw] md:text-[9vw] font-black text-black leading-[0.8] mb-12 uppercase tracking-tighter">
            Ready to <span className="text-white">Order?</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-16 items-start border-t-4 border-black pt-16">
            <div className="space-y-8">
              <p className="text-black text-2xl font-bold max-w-sm">We take orders for birthdays, weddings, corporate events, and everyday snack cravings.</p>
              <div className="space-y-4">
                <a href="https://instagram.com/aderaf_entertainment_ventures" className="flex items-center gap-4 text-black hover:text-white transition-colors">
                  <Instagram size={24} />
                  <span className="font-bold text-lg uppercase">@aderaf_entertainment_ventures</span>
                </a>
                <div className="flex items-center gap-4 text-black">
                  <MapPin size={24} />
                  <span className="font-bold text-lg uppercase">Available for Delivery in Lagos</span>
                </div>
              </div>
            </div>

            <div className="bg-black text-white rounded-[3rem] p-12 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6B6B]/20 rounded-full blur-3xl" />
               
               {sent ? (
                <div className="text-center py-12 animate-scaleIn">
                  <div className="w-20 h-20 bg-[#FFE66D] rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCheck size={40} className="text-black" />
                  </div>
                  <h3 className="font-heading text-4xl font-bold uppercase mb-4">Message Received</h3>
                  <p className="text-white/60 text-lg">We&apos;ll get back to you sharp-sharp!</p>
                </div>
               ) : (
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="grid md:grid-cols-2 gap-6">
                    <input 
                      type="text" 
                      placeholder="Name"
                      required
                      className="w-full bg-white/10 border-2 border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[#FFE66D] transition-all font-bold placeholder:text-white/20"
                      value={form.name}
                      onChange={e => setForm({...form, name: e.target.value})}
                    />
                    <input 
                      type="email" 
                      placeholder="Email"
                      required
                      className="w-full bg-white/10 border-2 border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[#FFE66D] transition-all font-bold placeholder:text-white/20"
                      value={form.email}
                      onChange={e => setForm({...form, email: e.target.value})}
                    />
                  </div>
                  <input 
                    type="tel" 
                    placeholder="Phone Number"
                    className="w-full bg-white/10 border-2 border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[#FFE66D] transition-all font-bold placeholder:text-white/20"
                    value={form.phone}
                    onChange={e => setForm({...form, phone: e.target.value})}
                  />
                  <textarea 
                    rows={4} 
                    placeholder="What are you craving? (Or event details)"
                    required
                    className="w-full bg-white/10 border-2 border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[#FFE66D] transition-all font-bold placeholder:text-white/20 resize-none"
                    value={form.message}
                    onChange={e => setForm({...form, message: e.target.value})}
                  />
                  <button 
                    disabled={loading}
                    className="w-full bg-[#FFE66D] text-black py-5 rounded-2xl font-black text-xl uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Send Order Request"}
                  </button>
                </form>
               )}
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-black py-20 px-6 text-white border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="md:col-span-2">
              <a href="#home" className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-[#FF6B6B] flex items-center justify-center rounded-xl -rotate-6">
                  <span className="font-heading font-black text-2xl text-black">A</span>
                </div>
                <span className="font-heading text-3xl font-black tracking-tighter uppercase leading-none">Aderaf Entertainment Ventures</span>
              </a>
              <p className="text-white/40 max-w-sm text-lg leading-relaxed">
                Artisanally crafted cakes and gourmet snacks, baked fresh daily to elevate your celebrations in Lagos and beyond.
              </p>
            </div>
            <div>
              <p className="font-heading text-xl font-bold uppercase mb-8 text-[#4ECDC4]">Quick Links</p>
              <ul className="space-y-4">
                {navLinks.map(l => (
                  <li key={l.name}><a href={l.href} className="text-white/60 hover:text-white font-bold uppercase text-sm tracking-widest transition-colors">{l.name}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-heading text-xl font-bold uppercase mb-8 text-[#FFE66D]">Contact Us</p>
              <div className="space-y-4">
                <p className="text-white/60 font-bold text-sm uppercase">Lagos, Nigeria</p>
                <a href="https://instagram.com/aderaf_entertainment_ventures" className="text-white/60 hover:text-white font-bold text-sm uppercase block">Instagram</a>
                <p className="text-white/40 text-xs italic mt-6 font-bold uppercase tracking-widest">Sharp delivery, nationwide context.</p>
              </div>
            </div>
          </div>
          <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/30 text-sm font-bold uppercase tracking-widest">
              © {new Date().getFullYear()} Aderaf Entertainment Ventures. All Rights Reserved.
            </p>
            <div className="flex gap-4">
              <div className="w-2 h-2 rounded-full bg-[#FF6B6B]" />
              <div className="w-2 h-2 rounded-full bg-[#FFE66D]" />
              <div className="w-2 h-2 rounded-full bg-[#4ECDC4]" />
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
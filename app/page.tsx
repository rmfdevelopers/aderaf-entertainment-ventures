'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Leaf, 
  Truck, 
  ChefHat, 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  Menu, 
  X, 
  CheckCheck,
  Calendar,
  Users,
  Feather,
  ImageOff
} from 'lucide-react';

/**
 * UTILS & HOOKS
 */
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

/**
 * DATA
 */
const BRAND = {
  name: "Aderaf Entertainment Ventures",
  tagline: "Where Every Crumb Tells a Story of Joy.",
  description: "Artisanal cakes and delightful snacks crafted with local flair and premium ingredients, perfect for elevating any celebration in Lagos.",
  industry: "food",
  region: "Nigeria"
};

const IMAGES = {
  hero: "https://picsum.photos/seed/food1/1200/800",
  products: [
    "https://picsum.photos/seed/food2/800/600",
    "https://picsum.photos/seed/food3/800/600",
    "https://picsum.photos/seed/food4/800/600",
    "https://picsum.photos/seed/food5/800/600"
  ]
};

const PRODUCTS = [
  { name: "Velvet Dream Cake", description: "A deeply rich red velvet cake layered with our signature cream cheese frosting.", price: "₦18,500" },
  { name: "Chocolate Lava Bombs", description: "Decadent, warm chocolate cakes that erupt with molten dark chocolate ganache.", price: "₦7,800" },
  { name: "Party Pack (30pcs)", description: "Assorted bite-sized snacks: mini-muffins, puff-puffs, and classic sausage rolls.", price: "₦10,500" },
  { name: "Pineapple Upside-Down", description: "A tropical twist on a classic; caramelized pineapple and brown sugar topping.", price: "₦15,000" }
];

const FEATURES = [
  { title: "Fresh Ingredients", description: "We source the freshest local produce and premium imported chocolates.", icon: Leaf },
  { title: "Fast Delivery", description: "Swift and secure delivery across Lagos for your last-minute needs.", icon: Truck },
  { title: "Chef's Special", description: "Rotating secret menu items crafted by Chef Aderaf herself.", icon: ChefHat }
];

const TESTIMONIALS = [
  { name: "Tosin M.", text: "The Red Velvet was divine! Moist, perfectly balanced sweetness. My guests asked where I got it!", role: "Event Planner" },
  { name: "Bolanle O.", text: "Quick service and the snacks are perfect for office meetings. Order via IG was super easy.", role: "Corporate Client" },
  { name: "Kunle F.", text: "The chocolate lava bombs are addictive. 10/10 would recommend for dessert.", role: "Food Enthusiast" }
];

const STATS = [
  { number: "4+", label: "Years in Business", icon: Calendar },
  { number: "200+", label: "Happy Clients Monthly", icon: Users },
  { number: "15+", label: "Signature Recipes", icon: Feather }
];

/**
 * COMPONENTS
 */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handle);
    return () => window.removeEventListener('scroll', handle);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#FF6B6B] shadow-lg py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="text-white font-heading text-2xl font-bold tracking-tighter">
          ADERAF<span className="text-[#FFD93D]">.</span>
        </a>

        <div className="hidden md:flex items-center gap-10">
          {['Menu', 'About', 'Order Now'].map((link) => (
            <a key={link} href={`#${link.toLowerCase().replace(' ', '')}`} className="text-white/90 hover:text-[#FFD93D] transition-colors font-medium text-sm uppercase tracking-widest">
              {link}
            </a>
          ))}
          <a href="#contact" className="bg-[#FFD93D] text-black px-6 py-2.5 font-bold rounded-full hover:scale-105 transition-transform text-sm">
            Book Now
          </a>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsOpen(true)}>
          <Menu size={32} />
        </button>
      </div>

      {/* Mobile Nav */}
      <div className={`fixed inset-0 bg-[#FF6B6B] z-[60] transition-transform duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 flex justify-end">
          <button onClick={() => setIsOpen(false)}><X size={32} className="text-white" /></button>
        </div>
        <div className="flex flex-col items-center justify-center h-[70%] gap-8">
          {['Menu', 'About', 'Contact'].map((link) => (
            <a key={link} href={`#${link.toLowerCase().replace(' ', '')}`} onClick={() => setIsOpen(false)} className="text-4xl font-heading font-bold text-white uppercase tracking-tight">
              {link}
            </a>
          ))}
          <a href="#contact" onClick={() => setIsOpen(false)} className="mt-8 bg-[#FFD93D] text-black px-12 py-4 font-bold rounded-full text-xl">
            Book Now
          </a>
        </div>
      </div>
    </nav>
  );
};

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center animate-scaleIn">
        <div className="w-20 h-20 rounded-full bg-[#FFD93D]/20 flex items-center justify-center mb-6 border border-[#FFD93D]/30">
          <CheckCheck size={36} className="text-[#FFD93D]" />
        </div>
        <h3 className="font-heading text-3xl font-bold text-white">Order Received</h3>
        <p className="text-white/60 mt-2 max-w-xs">We will contact you shortly to confirm your sweet treats.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {['name', 'email'].map(field => (
          <input 
            key={field} 
            type={field === 'email' ? 'email' : 'text'}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field as keyof typeof form]}
            onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
            required 
            className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white placeholder-white/40 focus:border-[#FFD93D] outline-none transition-all" 
          />
        ))}
      </div>
      <input 
        type="text" 
        placeholder="Phone Number" 
        value={form.phone}
        onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
        className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white placeholder-white/40 focus:border-[#FFD93D] outline-none transition-all" 
      />
      <textarea 
        rows={4} 
        placeholder="Your Message (Order details, date, etc.)"
        value={form.message}
        onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
        required 
        className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white placeholder-white/40 focus:border-[#FFD93D] outline-none resize-none transition-all" 
      />
      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-[#FFD93D] text-black py-5 rounded-xl font-bold text-lg hover:brightness-110 transition-all disabled:opacity-50"
      >
        {loading ? 'Processing...' : 'Place Your Order'}
      </button>
    </form>
  );
};

export default function Home() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal();
  const { ref: featRef, isVisible: featVisible } = useScrollReveal();
  const { ref: prodRef, isVisible: prodVisible } = useScrollReveal();
  const { ref: aboutRef, isVisible: aboutVisible } = useScrollReveal();
  const { ref: testRef, isVisible: testVisible } = useScrollReveal();
  const { ref: contactRef, isVisible: contactVisible } = useScrollReveal();

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* HERO - PATTERN HR-B */}
      <section id="home" className="min-h-screen relative flex items-end pb-32 px-6 md:px-16 overflow-hidden">
        <SafeImage src={IMAGES.hero} alt={BRAND.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FF6B6B] via-[#FF6B6B]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B6B]/70 via-transparent to-transparent" />
        
        <div className={`relative z-10 max-w-4xl transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} ref={heroRef}>
          <h1 className="font-heading text-6xl md:text-[9rem] font-black text-white leading-[0.85] tracking-tighter uppercase">
            Baking Up <span className="text-[#FFD93D]">Lagos&#39;</span> <br /> Best Secrets.
          </h1>
          <p className="text-white/80 mt-8 text-xl max-w-xl font-medium leading-relaxed">
            From milestone cakes to everyday cravings, get your order directly from our kitchen to your door.
          </p>
          <div className="flex gap-6 mt-12">
            <a href="#products" className="bg-[#FFD93D] text-black px-10 py-5 font-black text-lg rounded-full hover:scale-105 transition-transform shadow-2xl">
              Explore Menu
            </a>
            <a href="#about" className="flex items-center gap-3 text-white font-bold border-b-2 border-white/30 pb-1 hover:border-[#FFD93D] transition-all">
              Our Story
            </a>
          </div>
        </div>
      </section>

      {/* FEATURES - PATTERN F-NUMBERED */}
      <section id="features" ref={featRef} className="py-28 px-6 bg-[#FF6B6B]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-20">
            <h2 className="font-heading text-5xl md:text-6xl font-black text-white">Why Choose Aderaf?</h2>
            <p className="text-[#FFD93D] mt-2 font-bold uppercase tracking-widest text-sm">Quality wey go loud</p>
          </div>
          <div className="space-y-0 divide-y divide-white/10">
            {FEATURES.map((f, i) => (
              <div key={i} className={`py-12 flex flex-col md:flex-row items-start gap-10 transition-all duration-700 ${featVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${i * 150}ms` }}>
                <span className="font-heading text-[#FFD93D] text-6xl font-black shrink-0 w-24">0{i+1}</span>
                <div className="flex-1">
                  <h3 className="font-heading text-3xl font-bold text-white mb-3">{f.title}</h3>
                  <p className="text-white/70 text-lg leading-relaxed max-w-xl">{f.description}</p>
                </div>
                <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                  <f.icon className="text-[#FFD93D]" size={32} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS - PATTERN P-ASYMMETRIC */}
      <section id="products" ref={prodRef} className="py-28 px-6 bg-white text-[#FF6B6B] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
            <h2 className="font-heading text-6xl md:text-7xl font-black uppercase leading-none">Our Sweet<br />Offerings</h2>
            <p className="text-[#FF6B6B]/60 max-w-xs text-lg font-medium">Explore the current lineup of treats ready for your next event.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Main Featured Product */}
            <div className={`md:col-span-8 group relative rounded-3xl overflow-hidden h-[500px] transition-all duration-1000 ${prodVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <SafeImage src={IMAGES.products[0]} alt={PRODUCTS[0].name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 p-10">
                <span className="bg-[#FFD93D] text-black px-4 py-1.5 rounded-full text-sm font-bold mb-4 inline-block">Bestseller</span>
                <h3 className="font-heading text-4xl font-black text-white">{PRODUCTS[0].name}</h3>
                <p className="text-white/70 mt-2 max-w-md">{PRODUCTS[0].description}</p>
                <div className="flex items-center gap-6 mt-6">
                  <span className="text-[#FFD93D] font-black text-3xl">{PRODUCTS[0].price}</span>
                  <a href="#contact" className="bg-white text-black px-8 py-3 rounded-full font-black hover:bg-[#FFD93D] transition-colors">Order Now</a>
                </div>
              </div>
            </div>

            {/* Side Grid */}
            <div className="md:col-span-4 flex flex-col gap-6">
              {PRODUCTS.slice(1, 3).map((p, i) => (
                <div key={i} className={`flex-1 group relative rounded-3xl overflow-hidden min-h-[240px] transition-all duration-1000 ${prodVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`} style={{ transitionDelay: `${(i + 1) * 200}ms` }}>
                  <SafeImage src={IMAGES.products[i+1]} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                  <div className="absolute bottom-0 p-6">
                    <h3 className="font-heading text-xl font-bold text-white">{p.name}</h3>
                    <p className="text-[#FFD93D] font-black mt-1">{p.price}</p>
                    <a href="#contact" className="text-white/60 text-xs mt-3 block font-bold hover:text-white transition-colors">Place Order →</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS DIVIDER - D-STAT */}
      <div className="bg-[#FFD93D] py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black/10">
          {STATS.map((s, i) => (
            <div key={i} className="flex flex-col items-center justify-center p-8 text-black text-center group">
              <div className="mb-4 bg-black/5 p-4 rounded-full group-hover:scale-110 transition-transform">
                <s.icon size={28} />
              </div>
              <p className="text-6xl font-black font-heading leading-none">{s.number}</p>
              <p className="text-sm font-bold uppercase tracking-widest mt-2 opacity-60">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT - SPLIT LAYOUT */}
      <section id="about" ref={aboutRef} className="py-28 px-6 bg-[#4ECDC4] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className={`relative h-[600px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-1000 ${aboutVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
            <SafeImage src={IMAGES.products[3]} alt="Chef Baking" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/20" />
          </div>
          <div className={`transition-all duration-1000 delay-300 ${aboutVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
            <h2 className="font-heading text-6xl font-black uppercase leading-tight mb-8">The Story<br />Behind The Slice</h2>
            <p className="text-xl leading-relaxed text-white/90 mb-8 font-medium">
              Aderaf Entertainment Ventures started as a passion project fueled by a love for baking and a desire to bring joy through flavor. 
              Serving Lagos one perfect slice at a time, we&#39;re dedicated to quality, fun, and unforgettable taste experiences.
            </p>
            <div className="p-8 bg-black/10 rounded-2xl border border-white/20">
              <p className="italic text-lg text-white/80 leading-relaxed">
                &ldquo;We don&#39;t just bake cakes; we create the centerpieces for your most precious memories. Every crumb is a commitment to excellence.&rdquo;
              </p>
              <p className="mt-4 font-bold text-[#FFD93D] uppercase tracking-widest text-sm">— Chef Aderaf</p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - T-SLIDER */}
      <section ref={testRef} className="py-28 bg-[#FF6B6B] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <h2 className="font-heading text-6xl font-black text-white text-center uppercase tracking-tighter">Voices Of Our Fans</h2>
        </div>
        <div className="w-full overflow-hidden relative">
          <div className="flex w-[200%] gap-6 animate-slide-left hover:[animation-play-state:paused]">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <div key={i} className="w-[350px] md:w-[450px] shrink-0 bg-white/10 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-md">
                <div className="flex gap-1.5 mb-8">
                  {[1,2,3,4,5].map(n => <div key={n} className="w-3 h-3 rounded-full bg-[#FFD93D]" />)}
                </div>
                <p className="text-white text-xl leading-relaxed font-medium mb-10">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-4 border-t border-white/10 pt-8">
                  <div className="w-14 h-14 rounded-full bg-[#FFD93D] flex items-center justify-center text-black font-black text-xl">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg">{t.name}</p>
                    <p className="text-white/40 text-xs uppercase tracking-widest font-bold">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT - PATTERN C4 */}
      <section id="contact" ref={contactRef} className="py-28 px-6 bg-[#FFD93D]">
        <div className="max-w-6xl mx-auto">
          <div className={`transition-all duration-1000 ${contactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <h2 className="font-heading text-[12vw] md:text-[8vw] font-black text-black leading-[0.85] mb-12 uppercase tracking-tighter">
              Ready to Order <br /><span className="text-white stroke-black stroke-2" style={{ WebkitTextStroke: '2px black' }}>Your Delight?</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-16 items-start border-t-4 border-black pt-16">
              <div>
                <p className="text-black text-2xl font-bold max-w-sm mb-12">
                  Have a custom request or need a cake for today? Get in touch and let&#39;s make it happen.
                </p>
                <div className="space-y-6">
                  {BRAND.region && (
                    <div className="flex items-center gap-4 text-black">
                      <MapPin size={24} className="shrink-0" />
                      <span className="font-bold text-lg">Lagos, Nigeria</span>
                    </div>
                  )}
                  <a href="https://instagram.com/aderaf_entertainment_ventures" className="flex items-center gap-4 text-black hover:translate-x-2 transition-transform">
                    <Instagram size={24} />
                    <span className="font-bold text-lg">@aderaf_entertainment_ventures</span>
                  </a>
                  <div className="flex items-center gap-4 text-black">
                    <Mail size={24} />
                    <span className="font-bold text-lg">hello@aderaf.com</span>
                  </div>
                </div>
              </div>
              <div className="bg-black/5 p-8 md:p-12 rounded-[3rem] border-2 border-black/10 shadow-2xl shadow-black/5">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER - PATTERN F1 */}
      <footer className="bg-black py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="md:col-span-2">
              <a href="#home" className="text-white font-heading text-4xl font-bold tracking-tighter block mb-6">
                ADERAF<span className="text-[#FFD93D]">.</span>
              </a>
              <p className="text-white/40 max-w-sm text-lg leading-relaxed mb-8">
                {BRAND.description}
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"><Instagram size={20} /></a>
                <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"><Phone size={20} /></a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Navigation</h4>
              <ul className="space-y-4">
                {['Home', 'Menu', 'About', 'Orders'].map(item => (
                  <li key={item}><a href={`#${item.toLowerCase()}`} className="text-white/40 hover:text-[#FFD93D] transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Legal</h4>
              <ul className="space-y-4">
                {['Privacy Policy', 'Terms of Service', 'Delivery Policy'].map(item => (
                  <li key={item}><a href="#" className="text-white/40 hover:text-[#FFD93D] transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/20 text-sm">
              &copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.
            </p>
            <p className="text-white/20 text-xs tracking-[0.4em] uppercase font-bold">
              Sweetness Guaranteed
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  ChefHat, 
  Truck, 
  Timer, 
  UtensilsCrossed, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin, 
  Menu, 
  X, 
  ImageOff, 
  CheckCheck,
  ChevronRight,
  Clock,
  User,
  Star,
  ShoppingBag
} from 'lucide-react';

// --- Types ---
type Product = { name: string; description: string; price: string; image_url: string };
type Feature = { title: string; description: string; icon: any };
type Testimonial = { name: string; text: string; role: string };

// --- Constants ---
const BRAND = {
  name: "Aderaf Entertainment Ventures",
  tagline: "Crafting Moments, One Delicious Bite at a Time.",
  description: "A premium Lagos-based venture specializing in artisanal cakes, gourmet snacks, and bespoke confectionery for all your celebratory needs. Elevating your events with unforgettable taste.",
  industry: "Food & Beverage",
  region: "nigeria",
  currency: "₦"
};

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1759524322472-3f146a43cf9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
};

const PRODUCTS: Product[] = [
  { name: "Velvet Decadence Cake", description: "A rich, multi-layered red velvet masterpiece with cream cheese frosting, perfect for milestones.", price: "₦22,000", image_url: "https://images.unsplash.com/photo-1759524322472-3f146a43cf9a?q=80&w=1080" },
  { name: "Gourmet Peanut Bites", description: "Crunchy, salted, and perfectly roasted peanut clusters coated in dark chocolate.", price: "₦3,500", image_url: "https://images.unsplash.com/photo-1759524322472-3f146a43cf9a?q=80&w=1080" },
  { name: "Celebration Snack Box", description: "A curated box of mini sausage rolls, samosas, and spicy puff-puffs. Ideal for small gatherings.", price: "₦8,500", image_url: "https://images.unsplash.com/photo-1759524322472-3f146a43cf9a?q=80&w=1080" },
  { name: "Custom Buttercream Dream", description: "Fully customized buttercream cake with choice of two flavors and bespoke decorative elements.", price: "₦18,500", image_url: "https://images.unsplash.com/photo-1759524322472-3f146a43cf9a?q=80&w=1080" }
];

const FEATURES: Feature[] = [
  { title: "Fresh Ingredients", description: "We source the finest, freshest local and imported ingredients for unparalleled flavor.", icon: UtensilsCrossed },
  { title: "Fast Delivery", description: "Swift and reliable delivery service across Lagos to ensure your treats arrive perfectly chilled.", icon: Truck },
  { title: "Chef's Special", description: "Weekly rotating specialty items and limited-edition flavor combinations.", icon: ChefHat },
  { title: "Hand-Crafted", description: "Every bite is prepared manually with love and surgical precision in our kitchen.", icon: Timer }
];

const TESTIMONIALS: Testimonial[] = [
  { name: "Tolu M.", text: "The chocolate cake blew my party away! Next level flavor and the presentation was too clean.", role: "Event Planner" },
  { name: "Seun A.", text: "Ordered the snack box last minute for a game night. Everyone devoured the puff-puffs first!", role: "Satisfied Customer" },
  { name: "Ngozi K.", text: "The artistry on the custom cake was incredible. Exactly what I envisioned, but yummier.", role: "Happy Bride" }
];

// --- Components ---

function SafeImage({ src, alt, fill, width, height, className, priority }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-zinc-900 border border-white/5 ${className}`}>
        <ImageOff size={28} className="text-white/10" />
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

const useScrollReveal = (threshold = 0.1) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

// --- Main Page ---

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="relative">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/10 py-3' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-[var(--primary)] text-black font-black flex items-center justify-center rounded-lg group-hover:rotate-6 transition-transform">
              AE
            </div>
            <span className="font-heading font-bold text-xl tracking-tight hidden md:block">ADERAF</span>
          </a>
          
          <div className="hidden md:flex items-center gap-10">
            {['Menu', 'About', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-bold uppercase tracking-widest hover:text-[var(--primary)] transition-colors">
                {item}
              </a>
            ))}
            <a href="#contact" className="bg-[var(--accent)] text-black px-6 py-2.5 rounded-full font-black text-xs uppercase hover:scale-105 transition-all">
              See The Menu
            </a>
          </div>

          <button onClick={() => setIsMenuOpen(true)} className="md:hidden text-white">
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-[200] transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
        <div className="absolute right-0 top-0 h-full w-[80%] bg-[var(--primary)] p-10 flex flex-col">
          <button onClick={() => setIsMenuOpen(false)} className="self-end mb-12 text-black">
            <X size={32} />
          </button>
          <div className="space-y-8">
            {['Menu', 'About', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} 
                className="block text-4xl font-heading font-black text-black uppercase hover:translate-x-2 transition-transform">
                {item}
              </a>
            ))}
          </div>
          <div className="mt-auto">
            <p className="text-black/60 font-mono text-xs uppercase tracking-widest mb-4">Follow Us</p>
            <div className="flex gap-4">
              <a href="https://instagram.com/aderaf_entertainment_ventures" className="w-10 h-10 rounded-full border border-black/20 flex items-center justify-center text-black">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section id="home" className="min-h-screen relative flex items-end pb-32 px-6 overflow-hidden">
        <SafeImage src={IMAGES.hero} alt="Aderaf Entertainment" fill className="object-cover opacity-50" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
        
        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <div className="animate-fadeIn">
            <h1 className="text-7xl md:text-[9rem] font-black leading-[0.85] tracking-tighter mb-8">
              Lagos Sweet <span className="text-[var(--primary)] italic">Spot.</span>
            </h1>
            <p className="text-white/60 text-lg md:text-2xl max-w-2xl leading-relaxed mb-10 font-light">
              Where passion meets pastry. Order your next show-stopping cake or gourmet snack today. Quality wey go loud!
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <a href="#products" className="bg-[var(--primary)] text-white px-10 py-5 font-black text-lg uppercase flex items-center justify-center gap-3 hover:brightness-110 transition rounded-xl">
                See The Menu <ChevronRight size={20} />
              </a>
              <a href="#about" className="border-2 border-white/20 text-white px-10 py-5 font-black text-lg uppercase flex items-center justify-center hover:bg-white/10 transition rounded-xl">
                Our Story
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Funky Divider */}
      <div className="py-12 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-8 md:gap-16">
          {['Gourmet Snacks', 'Artisanal Cakes', 'Events Management', 'Celebrations'].map((word, i) => (
            <div key={i} className="flex items-center gap-4 text-white/30 text-xs font-mono tracking-[0.3em] uppercase">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              {word}
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-28 px-6 bg-black relative">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-5xl md:text-7xl font-black mb-6">Why Aderaf?</h2>
            <p className="text-[var(--accent)] font-mono text-sm tracking-widest uppercase">The Funky Difference</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((f, i) => (
              <FeatureCard key={i} feature={f} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Products Section - Staggered Layout */}
      <section id="menu" className="py-28 px-6 bg-[#0c0c0c] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
            <h2 className="text-6xl md:text-8xl font-black max-w-xl leading-none">The Hype List</h2>
            <p className="text-white/40 max-w-sm md:text-right text-lg">Our Bestsellers & Signature Snacks — Crafted to perfection for every celebration.</p>
          </div>

          <div className="space-y-32">
            {PRODUCTS.map((p, i) => (
              <ProductRow key={i} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Divider */}
      <div className="bg-[var(--accent)] py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {[
            { number: "4+", label: "Years in Business", icon: Clock },
            { number: "500+", label: "Happy Clients Served", icon: User },
            { number: "20+", label: "Signature Recipes", icon: Star }
          ].map((s, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-12 h-12 bg-black/10 rounded-full flex items-center justify-center mb-4">
                <s.icon className="text-black" />
              </div>
              <p className="text-5xl font-black text-black">{s.number}</p>
              <p className="text-black/60 text-sm font-bold uppercase tracking-widest mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="py-28 px-6 bg-black">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className="relative aspect-square md:aspect-auto md:h-[600px] rounded-3xl overflow-hidden group">
            <SafeImage src={IMAGES.hero} alt="Our Kitchen" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
            <div className="absolute inset-0 bg-[var(--primary)]/20 mix-blend-overlay" />
          </div>
          <div>
            <h2 className="text-6xl font-black mb-8 leading-none">Our Kitchen Story</h2>
            <p className="text-white/60 text-xl leading-relaxed mb-10">
              Started from a dream in a small Ikoyi kitchen, Aderaf Entertainment Ventures is about making every celebration memorable. We believe food is entertainment, and we put our whole vibe into every creation. 
              <br /><br />
              Artisanal cakes aren't just desserts; they're the centerpiece of your story. Gourmet snacks aren't just bites; they're the spark of the party.
            </p>
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-white font-black italic text-2xl">&ldquo;Crafting moments, one delicious bite at a time.&rdquo;</p>
              <p className="text-[var(--accent)] mt-4 font-mono text-sm tracking-widest uppercase">Aderaf Vision</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Marquee */}
      <section className="py-28 bg-[#0a0a0a] overflow-hidden">
        <div className="mb-16 px-6 text-center">
          <h2 className="text-5xl font-black">The Buzz</h2>
        </div>
        <div className="flex w-[200%] gap-6 animate-slide-left hover:[animation-play-state:paused]">
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <div key={i} className="w-[400px] shrink-0 bg-white/5 border border-white/10 p-10 rounded-[2rem] backdrop-blur-sm">
              <div className="flex gap-1 mb-6 text-[var(--accent)]">
                {[1,2,3,4,5].map(n => <Star key={n} size={16} fill="currentColor" />)}
              </div>
              <p className="text-white/80 text-lg italic leading-relaxed mb-8">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                <div className="w-12 h-12 bg-[var(--primary)] rounded-full flex items-center justify-center font-black text-black">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-white text-base">{t.name}</p>
                  <p className="text-white/40 text-xs uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-28 px-6 bg-[var(--accent)]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-[10vw] md:text-[6vw] font-black text-black leading-[0.85] mb-12 uppercase">
            Let's Get This <br /><span className="text-white outline-text">Party Started</span>
          </h2>
          
          <div className="grid md:grid-cols-[1fr_1.5fr] gap-16 items-start border-t-4 border-black pt-16">
            <div className="space-y-10">
              <p className="text-black/70 text-lg leading-relaxed font-bold">
                Ready for that show-stopping cake or a bulk order of gourmet treats? Send us a message and we'll handle the rest.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-black group cursor-default">
                  <div className="w-12 h-12 rounded-full border-2 border-black/20 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                    <Instagram size={20} />
                  </div>
                  <div>
                    <p className="text-xs uppercase font-black opacity-50">Follow Us</p>
                    <p className="font-bold">@aderaf_entertainment_ventures</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-black group cursor-default">
                  <div className="w-12 h-12 rounded-full border-2 border-black/20 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                    <ShoppingBag size={20} />
                  </div>
                  <div>
                    <p className="text-xs uppercase font-black opacity-50">Pickup Point</p>
                    <p className="font-bold">Lagos, Nigeria</p>
                  </div>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-[var(--primary)] text-black font-black flex items-center justify-center rounded text-sm">
                AE
              </div>
              <span className="font-heading font-bold text-xl tracking-tight">ADERAF</span>
            </div>
            <p className="text-white/40 max-w-sm text-sm leading-relaxed mb-8">
              Premium catering and confectionery based in the heart of Lagos. Elevating your moments with unforgettable taste and funky artistry.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-[var(--primary)] transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-[var(--primary)] transition-colors">
                <ShoppingBag size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <p className="text-[var(--accent)] font-black text-xs uppercase tracking-widest mb-6">Explore</p>
            <ul className="space-y-4">
              {['Menu', 'About', 'Contact', 'Privacy Policy'].map(item => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-white/40 hover:text-white text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[var(--accent)] font-black text-xs uppercase tracking-widest mb-6">Say Hello</p>
            <p className="text-white/40 text-sm mb-4">Lagos, Nigeria</p>
            <p className="text-white font-bold text-sm">Sorted delivery nationwide.</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-xs">
            © {new Date().getFullYear()} Aderaf Entertainment Ventures. All rights reserved.
          </p>
          <div className="text-white/20 text-[10px] uppercase tracking-widest font-mono">
            Crafted for Excellence
          </div>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const { ref, isVisible } = useScrollReveal();
  const Icon = feature.icon;

  return (
    <div 
      ref={ref as any}
      style={{ transitionDelay: `${index * 100}ms` }}
      className={`p-10 rounded-3xl border border-white/10 bg-white/[0.03] transition-all duration-700 hover:bg-[var(--primary)] group ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="mb-8 w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-[var(--accent)] group-hover:bg-white/20 group-hover:text-black transition-all">
        <Icon size={32} />
      </div>
      <h3 className="text-2xl font-black mb-4 group-hover:text-black transition-colors">{feature.title}</h3>
      <p className="text-white/40 text-sm leading-relaxed group-hover:text-black/70 transition-colors">
        {feature.description}
      </p>
    </div>
  );
}

function ProductRow({ product, index }: { product: Product; index: number }) {
  const { ref, isVisible } = useScrollReveal();
  const isEven = index % 2 === 0;

  return (
    <div 
      ref={ref as any}
      className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24 relative ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      } transition-all duration-1000`}
    >
      <div className="w-full md:w-1/2 relative group">
        <div className="aspect-[4/5] relative rounded-[3rem] overflow-hidden shadow-2xl z-10">
          <SafeImage src={product.image_url} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
        </div>
        <div className={`absolute -bottom-8 ${isEven ? '-right-8' : '-left-8'} w-full h-full bg-[var(--primary)]/10 rounded-[3rem] -z-0 blur-3xl group-hover:bg-[var(--primary)]/20 transition-all`} />
      </div>
      <div className={`w-full md:w-1/2 ${isEven ? 'text-left' : 'text-right'}`}>
        <span className="font-mono text-[var(--primary)] font-black tracking-[0.4em] uppercase mb-6 block">Signature 0{index + 1}</span>
        <h3 className="text-5xl md:text-7xl font-black text-white leading-[0.9] mb-8 uppercase italic">{product.name}</h3>
        <p className="text-white/50 text-xl leading-relaxed mb-10 max-w-md ml-0 mr-auto">
          {product.description}
        </p>
        <div className={`flex flex-col gap-8 ${isEven ? 'items-start' : 'items-end'}`}>
          <div className="text-5xl font-black text-[var(--accent)]">{product.price}</div>
          <a href="#contact" className="bg-white text-black px-12 py-5 rounded-full font-black uppercase text-sm hover:bg-[var(--primary)] hover:text-white transition-all">
            Order This Piece
          </a>
        </div>
      </div>
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  };

  if (sent) {
    return (
      <div className="bg-black/10 rounded-3xl p-12 text-center flex flex-col items-center animate-scaleIn">
        <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mb-8">
          <CheckCheck size={40} className="text-[var(--accent)]" />
        </div>
        <h3 className="text-3xl font-black text-black uppercase mb-4">Request Sent!</h3>
        <p className="text-black/60 font-bold">We'll get back to you sharp sharp to discuss your sweet treats.</p>
        <button onClick={() => setSent(false)} className="mt-10 font-black text-sm uppercase underline decoration-2 underline-offset-4">Send another message</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <input 
          type="text" 
          placeholder="Your Name" 
          required
          className="w-full bg-black/5 border-2 border-black/10 rounded-2xl px-6 py-4 text-black placeholder:text-black/30 font-bold focus:border-black outline-none transition-all"
          value={form.name}
          onChange={e => setForm({...form, name: e.target.value})}
        />
        <input 
          type="email" 
          placeholder="Email Address" 
          required
          className="w-full bg-black/5 border-2 border-black/10 rounded-2xl px-6 py-4 text-black placeholder:text-black/30 font-bold focus:border-black outline-none transition-all"
          value={form.email}
          onChange={e => setForm({...form, email: e.target.value})}
        />
      </div>
      <textarea 
        rows={6} 
        placeholder="Tell us what you're craving (Cake specs, snack quantities, event date...)" 
        required
        className="w-full bg-black/5 border-2 border-black/10 rounded-2xl px-6 py-4 text-black placeholder:text-black/30 font-bold focus:border-black outline-none transition-all resize-none"
        value={form.message}
        onChange={e => setForm({...form, message: e.target.value})}
      />
      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-black text-white py-6 rounded-2xl font-black uppercase text-xl hover:brightness-125 transition-all disabled:opacity-50"
      >
        {loading ? 'Processing...' : 'Send My Order Request'}
      </button>
    </form>
  );
}
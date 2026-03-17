'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Menu, X, Instagram, Mail, Phone, MapPin, ChefHat, 
  Timer, Leaf, ImageOff, CheckCheck, UtensilsCrossed, 
  Award, TrendingUp, ShoppingBag, ArrowRight
} from 'lucide-react';

// --- SafeImage Component ---
function SafeImage({ src, alt, fill, width, height, className, priority, fallbackClassName }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean; fallbackClassName?: string;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-black/40 to-white/10 ${fallbackClassName ?? className ?? ''}`}>
        <ImageOff size={28} className="text-white/20" />
      </div>
    );
  }
  return (
    <Image 
      src={src} alt={alt} fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} priority={priority}
      onError={() => setError(true)} 
    />
  );
}

// --- Animation Hook ---
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1200);
  };

  const brand = {
    name: "Aderaf Entertainment Ventures",
    tagline: "Crafting Moments, One Delightful Bite at a Time.",
    description: "Artisan bakery specializing in bespoke cakes, gourmet pastries, and premium savory snacks, serving the vibrant community of Lagos.",
    colors: { primary: "#FF5733", secondary: "#33FF57", accent: "#FFC300" }
  };

  const products = [
    { name: "Royal Chocolate Overload", description: "Dark chocolate sponge with ganache and sea salt caramel.", price: "₦18,500", img: "https://images.unsplash.com/photo-1685030530162-c2c1333b1629" },
    { name: "Spicy Suya Puffs", description: "Flaky pastry filled with authentic Nigerian spiced meat.", price: "₦4,500", img: "https://images.unsplash.com/photo-1723476355253-88309fec88a4" },
    { name: "Red Velvet Mini-Bundt", description: "Classic moist red velvet with cream cheese frosting.", price: "₦7,200", img: "https://images.unsplash.com/photo-1587244399104-f12b41169443" },
    { name: "Artisan Doughnut Box", description: "Box of six doughnuts featuring mango-chili and coconut-lime.", price: "₦6,800", img: "https://images.unsplash.com/photo-1676984613173-a71a287b3c15" }
  ];

  const features = [
    { title: "Fresh Ingredients", description: "We source local and imported ingredients for taste perfection.", icon: Leaf },
    { title: "Sharp Delivery", description: "Reliable fulfillment across Lagos, ensuring fresh arrival.", icon: Timer },
    { title: "Chef's Special", description: "Weekly rotating items designed to surprise your palate.", icon: ChefHat }
  ];

  const testimonials = [
    { name: "Tolu A.", role: "Event Planner", text: "The Royal Chocolate Cake was the centerpiece of my wedding anniversary! Rich, moist, and absolutely stunning." },
    { name: "Bisi O.", role: "Frequent Customer", text: "Seriously addicted to the Suya Puffs. I order them every weekend. Best snack in Ikeja!" },
    { name: "Dayo K.", role: "Lekki Resident", text: "Ordering was seamless, way better than sliding into DMs. The delivery was prompt." }
  ];

  const revealHero = useScrollReveal();
  const revealFeatures = useScrollReveal();
  const revealProducts = useScrollReveal();
  const revealAbout = useScrollReveal();
  const revealTestimonials = useScrollReveal();
  const revealContact = useScrollReveal();

  return (
    <main className="bg-primary min-h-screen selection:bg-accent selection:text-black">
      
      {/* --- Navigation --- */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-primary/90 backdrop-blur-xl py-3 shadow-2xl border-b border-white/5' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-accent flex items-center justify-center font-heading font-black text-black text-2xl transform group-hover:rotate-12 transition-transform">A</div>
            <span className="font-heading font-black text-xl tracking-tighter text-white">ADERAF</span>
          </a>
          
          <div className="hidden md:flex items-center gap-8">
            {['Menu', 'About', 'Contact'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-white/70 hover:text-accent font-bold uppercase tracking-widest text-xs transition-colors">{link}</a>
            ))}
            <a href="#products" className="bg-accent text-black px-6 py-2.5 font-black text-xs uppercase tracking-tighter rounded-full hover:scale-105 transition-transform">See The Menu Now</a>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* --- Mobile Sidebar --- */}
      <div className={`fixed inset-0 z-[60] transition-transform duration-500 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
        <div className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-primary border-l border-white/10 p-10 flex flex-col">
          <button className="self-end text-white mb-12" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={32} />
          </button>
          <div className="space-y-8">
            {['Menu', 'About', 'Contact'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setIsMobileMenuOpen(false)} className="block text-4xl font-heading font-black text-white hover:text-accent transition-colors">{link}</a>
            ))}
          </div>
          <div className="mt-auto space-y-4">
            <div className="h-px bg-white/10 w-full" />
            <p className="text-white/40 text-xs font-mono uppercase tracking-[0.3em]">aderaf_entertainment_ventures</p>
          </div>
        </div>
      </div>

      {/* --- HERO: HR-B --- */}
      <section id="home" ref={revealHero.ref} className="relative min-h-screen flex items-end pb-24 px-6 md:px-16 overflow-hidden">
        <SafeImage 
          src="https://images.unsplash.com/photo-1698756315982-ac33959ae685" 
          alt={brand.name} fill className="object-cover" priority 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/70 via-transparent to-transparent" />
        <div className={`relative z-10 max-w-4xl transition-all duration-1000 ${revealHero.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h1 className="font-heading text-6xl md:text-[9rem] font-black text-white leading-[0.85] tracking-tighter">
            Your Lagos <br/><span className="text-accent">Sweet Spot</span>
          </h1>
          <p className="text-white/80 mt-8 text-xl max-w-2xl font-medium leading-relaxed">
            Stop scrolling IG. Order your custom cakes and gourmet snacks directly from Aderaf Entertainment Ventures.
          </p>
          <div className="flex flex-wrap gap-5 mt-12">
            <a href="#products" className="bg-accent text-black px-10 py-5 font-black text-lg shadow-[8px_8px_0px_rgba(0,0,0,0.2)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200">
              See The Menu Now
            </a>
            <a href="#about" className="border-2 border-white/20 text-white px-10 py-5 font-bold text-lg hover:bg-white/10 transition-colors">
              Our Story
            </a>
          </div>
        </div>
      </section>

      {/* --- FEATURES: F-ICON-GRID --- */}
      <section id="features" ref={revealFeatures.ref} className="py-28 px-6 bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-20">
            <h2 className="font-heading text-5xl md:text-7xl font-black text-white leading-none">Why Choose <br/>Aderaf?</h2>
            <p className="text-white/40 mt-4 text-xl max-w-md font-medium uppercase tracking-tight">The quality is non-negotiable, the flavor is unforgettable.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} 
                className={`p-10 bg-white/5 border border-white/10 group hover:border-accent/40 transition-all duration-500 delay-${i * 100}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-16 h-16 bg-accent/20 flex items-center justify-center mb-8 group-hover:bg-accent transition-colors duration-300">
                  <f.icon size={32} className="text-accent group-hover:text-black transition-colors" />
                </div>
                <h3 className="text-2xl font-heading font-black text-white mb-4 uppercase">{f.title}</h3>
                <p className="text-white/50 leading-relaxed font-medium">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Divider --- */}
      <div className="py-10 border-y border-white/5">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-10">
          {['Handcrafted', 'Lagos Finest', 'Artisan Quality', 'Bespoke Designs'].map((word, i) => (
            <div key={i} className="flex items-center gap-3 text-white/30 text-xs font-heading tracking-[0.4em]">
              <div className="w-1.5 h-1.5 rotate-45 bg-accent" />
              {word}
            </div>
          ))}
        </div>
      </div>

      {/* --- PRODUCTS: P-EDITORIAL --- */}
      <section id="menu" ref={revealProducts.ref} className="py-28 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <h2 className="font-heading text-6xl md:text-8xl font-black text-white leading-none">Our Current <br/><span className="text-accent">Delights</span></h2>
            <p className="text-white/40 max-w-sm text-lg md:text-right font-medium">From celebration cakes to savory afternoon bites, we have your cravings covered.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((p, i) => (
              <div key={i} 
                className={`group relative h-[450px] overflow-hidden border border-white/5 transition-all duration-700 ${revealProducts.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <SafeImage src={p.img} alt={p.name} fill className="object-cover opacity-60 group-hover:scale-110 group-hover:opacity-80 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-10 z-10">
                  <span className="bg-accent text-black px-4 py-1 text-sm font-black mb-4 inline-block">{p.price}</span>
                  <h3 className="text-4xl font-heading font-black text-white group-hover:text-accent transition-colors leading-none mb-4">{p.name}</h3>
                  <div className="max-h-0 group-hover:max-h-24 overflow-hidden transition-all duration-500 opacity-0 group-hover:opacity-100">
                    <p className="text-white/60 text-lg mb-6 max-w-sm leading-tight">{p.description}</p>
                  </div>
                  <a href="#contact" className="inline-flex items-center gap-2 text-white font-bold uppercase tracking-widest text-xs border-b border-white/30 pb-1 hover:border-accent hover:text-accent transition-all">
                    Order This Item <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- ABOUT: STATS + STORY --- */}
      <section id="about" ref={revealAbout.ref} className="py-28 px-6 relative overflow-hidden">
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className={`transition-all duration-1000 ${revealAbout.isVisible ? 'opacity-100 -translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <h2 className="font-heading text-5xl md:text-7xl font-black text-white leading-none mb-8">The Venture <br/>Story</h2>
            <p className="text-white/60 text-xl leading-relaxed mb-10 font-medium">
              Born from a passion for creating joy through food, Aderaf Entertainment Ventures has rapidly become a favorite in the Lagos culinary scene. We believe every gathering deserves a touch of handcrafted excellence, transforming simple snacks and cakes into memorable experiences.
            </p>
            <div className="grid grid-cols-3 gap-8 pt-10 border-t border-white/10">
              {[
                { n: '500+', l: 'Orders', i: ShoppingBag },
                { n: '3+', l: 'Years', i: ChefHat },
                { n: '98%', l: 'Happy', i: Award }
              ].map((s, idx) => (
                <div key={idx}>
                  <p className="font-heading text-4xl font-black text-accent">{s.n}</p>
                  <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest mt-1">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={`relative aspect-square transition-all duration-1000 delay-300 ${revealAbout.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="absolute inset-0 border-2 border-accent m-4 rotate-3" />
            <SafeImage src="https://images.unsplash.com/photo-1644554207503-a4ad513ee1ce" alt="Artisan Bakery" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS: T-SLIDER --- */}
      <section ref={revealTestimonials.ref} className="py-28 bg-black/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <h2 className="font-heading text-5xl md:text-7xl font-black text-white text-center">What Lagos <br/>Is Saying</h2>
        </div>
        <div className="w-full">
          <div className="flex w-[250%] gap-8 animate-slide-left hover:[animation-play-state:paused] py-10">
            {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
              <div key={i} className="w-[400px] shrink-0 bg-primary/40 border-4 border-black p-10 shadow-[12px_12px_0px_rgba(0,0,0,1)] relative group">
                <div className="absolute -top-6 -right-6 w-12 h-12 bg-accent flex items-center justify-center">
                  <UtensilsCrossed size={20} className="text-black" />
                </div>
                <div className="flex gap-1 mb-6">
                  {[1,2,3,4,5].map(n => <div key={n} className="w-2.5 h-2.5 bg-accent" />)}
                </div>
                <p className="text-white text-xl font-bold leading-relaxed mb-10 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-4 border-t border-black/20 pt-6">
                  <div className="w-12 h-12 bg-black font-heading font-black text-accent flex items-center justify-center text-xl">{t.name.charAt(0)}</div>
                  <div>
                    <p className="font-heading font-black text-white uppercase text-lg">{t.name}</p>
                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT: C4 --- */}
      <section id="contact" ref={revealContact.ref} className="py-28 px-6 bg-accent relative overflow-hidden">
        <div className="absolute top-0 right-0 font-heading text-[30vw] font-black text-black/5 leading-none select-none -translate-y-1/4">ORDER</div>
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="font-heading text-[12vw] md:text-[8vw] font-black text-black leading-none mb-12">Ready to <br/>Order?</h2>
          
          <div className="grid md:grid-cols-[1fr_1.5fr] gap-20 items-start border-t-4 border-black pt-12">
            <div className="space-y-8">
              <p className="text-black font-bold text-2xl max-w-xs leading-tight">
                Crafting Moments, One Delightful Bite at a Time. Sharp delivery across Lagos!
              </p>
              <div className="space-y-4">
                <a href="https://instagram.com/aderaf_entertainment_ventures" target="_blank" className="flex items-center gap-4 text-black/70 hover:text-black transition-colors font-black uppercase text-sm tracking-widest">
                  <div className="w-10 h-10 border-2 border-black flex items-center justify-center"><Instagram size={18} /></div>
                  @aderaf_entertainment_ventures
                </a>
              </div>
            </div>

            <div className="bg-black p-10 shadow-[20px_20px_0px_rgba(255,255,255,0.2)]">
              {sent ? (
                <div className="py-12 text-center animate-scaleIn">
                  <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCheck size={40} className="text-black" />
                  </div>
                  <h3 className="font-heading text-3xl font-black text-white uppercase mb-2">Message Received!</h3>
                  <p className="text-white/50 font-medium">We&apos;ll get back to you faster than a Suya puff vanishes.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <input 
                      type="text" placeholder="Your Name" required
                      className="w-full bg-white/10 border-2 border-white/10 p-4 text-white placeholder-white/30 focus:border-accent outline-none transition-all font-bold"
                      onChange={e => setForm({...form, name: e.target.value})}
                    />
                    <input 
                      type="email" placeholder="Your Email" required
                      className="w-full bg-white/10 border-2 border-white/10 p-4 text-white placeholder-white/30 focus:border-accent outline-none transition-all font-bold"
                      onChange={e => setForm({...form, email: e.target.value})}
                    />
                  </div>
                  <input 
                    type="tel" placeholder="Phone Number (WhatsApp Preferred)" required
                    className="w-full bg-white/10 border-2 border-white/10 p-4 text-white placeholder-white/30 focus:border-accent outline-none transition-all font-bold"
                    onChange={e => setForm({...form, phone: e.target.value})}
                  />
                  <textarea 
                    rows={4} placeholder="Tell us what you're craving (Cake size, flavors, date etc.)" required
                    className="w-full bg-white/10 border-2 border-white/10 p-4 text-white placeholder-white/30 focus:border-accent outline-none transition-all font-bold resize-none"
                    onChange={e => setForm({...form, message: e.target.value})}
                  />
                  <button 
                    disabled={loading}
                    className="w-full bg-accent text-black p-5 font-black uppercase tracking-widest text-lg hover:bg-white transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Sending Request...' : 'Submit Order Inquiry'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-black py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-accent flex items-center justify-center font-heading font-black text-black text-3xl">A</div>
            <div>
              <p className="font-heading font-black text-white text-2xl leading-none">ADERAF</p>
              <p className="text-white/30 text-[10px] font-mono uppercase tracking-[0.4em] mt-1">Entertainment Ventures</p>
            </div>
          </div>
          
          <div className="flex gap-10">
            {['Menu', 'About', 'Contact'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="text-white/40 hover:text-white font-bold uppercase tracking-widest text-xs transition-colors">{l}</a>
            ))}
          </div>

          <div className="text-white/20 text-[10px] font-bold uppercase tracking-[0.3em]">
            © {new Date().getFullYear()} ADERAF VENTURES. LAGOS, NIGERIA.
          </div>
        </div>
      </footer>

    </main>
  );
}
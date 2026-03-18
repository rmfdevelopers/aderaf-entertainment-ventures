'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Menu, 
  X, 
  Leaf, 
  Timer, 
  ChefHat, 
  UtensilsCrossed, 
  MapPin, 
  HeartPulse, 
  Instagram, 
  Mail, 
  Phone, 
  ImageOff,
  CheckCheck,
  ChevronRight
} from 'lucide-react';

// --- DATA ---
const brand = {
  name: "Aderaf Entertainment Ventures",
  tagline: "Crafting Moments, One Delightful Bite at a Time.",
  description: "A premium bakery specializing in bespoke cakes, artisanal snacks, and delightful confectioneries tailored for Lagos's vibrant celebrations and daily indulgences.",
  industry: "Food & Beverage",
  currency: "₦"
};

const products = [
  { name: "Signature Chocolate Decadence", description: "A rich, five-layer dark chocolate sponge with a velvety ganache filling.", price: "₦18,500", image: "https://picsum.photos/seed/bakery1/800/600" },
  { name: "Spicy Puff-Puff Platter", description: "Nigerian classic dusted with cinnamon and a hint of cayenne for a kick.", price: "₦3,200", image: "https://picsum.photos/seed/bakery2/800/600" },
  { name: "Red Velvet Mini Bites", description: "Portioned red velvet cupcakes with a light, tangy cream cheese frosting.", price: "₦6,500", image: "https://picsum.photos/seed/bakery3/800/600" },
  { name: "Gourmet Party Packs", description: "Savory meat pies, spring rolls, and sweet macaroons for events.", price: "₦22,000", image: "https://picsum.photos/seed/bakery4/800/600" }
];

const features = [
  { title: "Fresh Ingredients", description: "We only use locally sourced, farm-fresh ingredients for peak flavor.", icon: Leaf },
  { title: "Sharp Delivery", description: "Reliable and speedy logistics across Lagos to ensure order integrity.", icon: Timer },
  { title: "Chef's Special", description: "Seasonal menus designed by our lead pastry innovator.", icon: ChefHat }
];

const testimonials = [
  { name: "Tosin M.", role: "Event Planner", text: "The chocolate cake was the talk of the wedding! Flawless execution and flavor." },
  { name: "Chinedu O.", role: "Customer", text: "The puff-puffs saved my Sunday hangout. The slight spice kick is addictive." },
  { name: "Funmi B.", role: "Corporate Client", text: "Needed last-minute snacks for a board meeting. Aderaf delivered on time." }
];

const stats = [
  { number: "4+", label: "Years of Flavor", icon: UtensilsCrossed },
  { number: "300+", label: "Events Catered", icon: MapPin },
  { number: "98%", label: "Satisfaction", icon: HeartPulse }
];

const IMAGES = {
  hero: "https://picsum.photos/seed/bakeryhero/1200/800",
};

// --- COMPONENTS ---

function SafeImage({ src, alt, fill, width, height, className, priority }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-secondary/20 ${className}`}>
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

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1200);
  };

  if (sent) return (
    <div className="flex flex-col items-center justify-center py-12 text-center animate-scaleIn">
      <div className="w-16 h-16 rounded-full bg-black/20 flex items-center justify-center mb-6 border border-black/30">
        <CheckCheck size={28} className="text-black" />
      </div>
      <h3 className="font-heading text-2xl font-bold text-black">Order Request Logged</h3>
      <p className="text-black/70 mt-2 max-w-xs">We will get back to you via DM or WhatsApp shortly.</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input 
        type="text" placeholder="Full Name" required
        className="w-full bg-black/5 border border-black/10 rounded-xl px-5 py-3.5 text-black placeholder-black/40 outline-none focus:border-black/30 transition-all"
        value={form.name} onChange={e => setForm({...form, name: e.target.value})}
      />
      <div className="grid grid-cols-2 gap-4">
        <input 
          type="email" placeholder="Email" required
          className="w-full bg-black/5 border border-black/10 rounded-xl px-5 py-3.5 text-black placeholder-black/40 outline-none focus:border-black/30 transition-all"
          value={form.email} onChange={e => setForm({...form, email: e.target.value})}
        />
        <input 
          type="text" placeholder="Phone"
          className="w-full bg-black/5 border border-black/10 rounded-xl px-5 py-3.5 text-black placeholder-black/40 outline-none focus:border-black/30 transition-all"
          value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
        />
      </div>
      <textarea 
        rows={4} placeholder="What can we bake for you?" required
        className="w-full bg-black/5 border border-black/10 rounded-xl px-5 py-3.5 text-black placeholder-black/40 outline-none resize-none focus:border-black/30 transition-all"
        value={form.message} onChange={e => setForm({...form, message: e.target.value})}
      />
      <button type="submit" disabled={loading}
        className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-black/90 transition-all disabled:opacity-50">
        {loading ? 'Processing...' : 'Send Inquiry'}
      </button>
    </form>
  );
};

// --- MAIN PAGE ---

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const featureReveal = useScrollReveal();
  const productReveal = useScrollReveal();
  const aboutReveal = useScrollReveal();
  const testReveal = useScrollReveal();

  return (
    <main className="relative">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 ${
        scrolled ? 'bg-primary shadow-xl py-3' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-secondary flex items-center justify-center rounded-lg shadow-lg">
              <span className="text-primary font-heading font-black text-2xl">A</span>
            </div>
            <span className="font-heading font-bold text-white tracking-wider text-lg hidden sm:block">ADERAF</span>
          </a>
          
          <div className="hidden md:flex items-center gap-8">
            {['Home', 'Menu', 'Contact'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-white/80 hover:text-secondary font-bold text-sm tracking-widest uppercase transition-colors">
                {link}
              </a>
            ))}
            <a href="#contact" className="bg-accent text-primary px-6 py-2 rounded-full font-black text-sm hover:scale-105 transition-transform">
              Order Now
            </a>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-[60] transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
        <div className="absolute right-0 top-0 h-full w-[75%] bg-primary flex flex-col p-10 shadow-2xl">
          <button className="self-end text-white mb-10" onClick={() => setIsMenuOpen(false)}>
            <X size={32} />
          </button>
          <div className="flex flex-col gap-8">
            {['Home', 'Menu', 'Contact'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} className="text-4xl font-heading font-bold text-white uppercase italic">
                {link}
              </a>
            ))}
          </div>
          <div className="mt-auto">
            <p className="text-white/60 text-xs uppercase tracking-widest mb-4 font-bold">Lagos Finest Flavors</p>
            <div className="flex gap-4">
              <Instagram className="text-secondary" />
              <Mail className="text-secondary" />
            </div>
          </div>
        </div>
      </div>

      {/* HERO-B: Full-bleed image + gradient */}
      <section id="home" className="min-h-screen relative flex items-end pb-24 px-6 md:px-16 overflow-hidden">
        <SafeImage src={IMAGES.hero} alt="Aderaf Bakery" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-transparent" />
        <div className="relative z-10 max-w-4xl animate-slideUp">
          <h1 className="font-heading text-6xl md:text-[8rem] font-black text-white leading-[0.85] tracking-tighter">
            YOUR CELEBRATION<br />STARTS HERE.
          </h1>
          <p className="text-white/80 mt-8 text-xl max-w-xl leading-relaxed font-light">
            Aderaf Entertainment Ventures: Where Lagos finest flavors meet impeccable design. Order your bespoke cakes and snacks today.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 mt-12">
            <a href="#products" className="bg-secondary text-primary px-10 py-5 font-black text-lg uppercase shadow-2xl hover:scale-105 transition-transform flex items-center justify-center gap-2">
              See the Menu Now <ChevronRight size={20} />
            </a>
            <a href="#contact" className="border-2 border-white/40 text-white px-10 py-5 font-bold text-lg uppercase hover:bg-white/10 transition-colors flex items-center justify-center">
              Request a Quote
            </a>
          </div>
        </div>
      </section>

      {/* F-ICON-GRID: Dense grid */}
      <section ref={featureReveal.ref} className="py-28 px-6 bg-primary">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-700 ${featureReveal.isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            <h2 className="font-heading text-5xl font-black text-white">Why We Are Lagos Favorite Bakery</h2>
            <p className="text-secondary mt-4 text-xl font-medium">More than just baking, we are in the business of joy.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div key={i} className={`p-10 rounded-3xl border border-white/10 bg-white/5 group hover:bg-secondary/10 transition-all duration-500 ${
                featureReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`} style={{ transitionDelay: `${i * 150}ms` }}>
                <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
                  <f.icon size={32} strokeWidth={2.5} />
                </div>
                <h3 className="font-heading font-black text-2xl text-white mb-4 uppercase tracking-tight">{f.title}</h3>
                <p className="text-white/60 leading-relaxed text-lg">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* D-GRID Divider */}
      <div className="py-10 border-y border-white/10">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-8 md:gap-16">
          {['Quality', 'Artisanal', 'Bespoke', 'Fresh', 'Lagos'].map((word, i) => (
            <div key={i} className="flex items-center gap-3 text-secondary/50 text-sm font-bold tracking-[0.4em] uppercase">
              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
              {word}
            </div>
          ))}
        </div>
      </div>

      {/* P-ASYMMETRIC: Products */}
      <section id="products" ref={productReveal.ref} className="py-28 px-6 bg-primary">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4">
            <div>
              <h2 className="font-heading text-5xl font-black text-white max-w-sm leading-none">OUR LATEST DELIGHTS</h2>
              <p className="text-white/50 mt-4 max-w-xs">Scroll through our signature treats available for order.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className={`md:col-span-7 group relative rounded-3xl overflow-hidden transition-all duration-1000 ${
              productReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}>
              <div className="relative h-[500px]">
                <SafeImage src={products[0].image} alt={products[0].name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 p-10">
                  <span className="bg-accent text-primary px-4 py-1 rounded-full text-xs font-black uppercase mb-4 inline-block">Bestseller</span>
                  <h3 className="font-heading text-4xl font-black text-white">{products[0].name}</h3>
                  <div className="flex items-center justify-between mt-3 gap-6">
                    <p className="text-white/60 text-lg max-w-sm">{products[0].description}</p>
                    <span className="text-secondary font-black text-3xl shrink-0">{products[0].price}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-5 flex flex-col gap-6">
              {products.slice(1, 3).map((p, i) => (
                <div key={i} className={`group relative rounded-3xl overflow-hidden flex-1 transition-all duration-1000 ${
                  productReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
                }`} style={{ transitionDelay: `${(i + 1) * 200}ms` }}>
                  <div className="relative h-[238px]">
                    <SafeImage src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-0 p-6 w-full">
                      <div className="flex justify-between items-end">
                        <div>
                          <h3 className="font-heading text-xl font-bold text-white uppercase">{p.name}</h3>
                          <p className="text-white/60 text-xs mt-1">{p.description}</p>
                        </div>
                        <span className="text-secondary font-black text-xl">{p.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <div className={`group relative rounded-3xl overflow-hidden transition-all duration-700 ${
              productReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="relative h-[250px] md:h-[200px] flex flex-col md:flex-row bg-white/5 border border-white/10 p-8 items-center gap-10">
                <div className="relative w-full md:w-48 h-full rounded-2xl overflow-hidden shrink-0">
                  <SafeImage src={products[3].image} alt={products[3].name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-3xl font-black text-white">{products[3].name}</h3>
                  <p className="text-white/60 text-lg">{products[3].description}</p>
                </div>
                <div className="text-right">
                  <p className="text-secondary font-black text-4xl">{products[3].price}</p>
                  <a href="#contact" className="text-accent font-bold mt-2 inline-block uppercase tracking-widest text-sm hover:underline">Get Package</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About with Stats */}
      <section ref={aboutReveal.ref} className="py-28 px-6 bg-secondary">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className={`transition-all duration-1000 ${aboutReveal.isVisible ? 'opacity-100 -translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <h2 className="font-heading text-6xl font-black text-primary leading-none mb-8 italic">THE ADERAF STORY</h2>
            <p className="text-primary/70 text-xl leading-relaxed font-medium">
              Founded in 2019 out of a passion for creating edible art, Aderaf has grown from a home kitchen to Lagos go-to provider for unforgettable event catering. We treat every order like a masterpiece.
            </p>
            <div className="mt-12 flex flex-wrap gap-8">
              {stats.map((s, i) => (
                <div key={i} className="flex flex-col">
                  <div className="flex items-center gap-3 text-primary mb-1">
                    <s.icon size={20} strokeWidth={3} />
                    <span className="font-heading text-4xl font-black">{s.number}</span>
                  </div>
                  <span className="text-primary/60 text-xs font-bold uppercase tracking-widest">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={`relative transition-all duration-1000 delay-300 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="aspect-square relative rounded-full overflow-hidden border-[12px] border-primary/10 shadow-2xl">
              <SafeImage src="https://picsum.photos/seed/chef/800/800" alt="Chef at work" fill className="object-cover" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-primary p-8 rounded-3xl shadow-xl animate-float">
              <p className="font-heading text-3xl font-black text-white">EST. 2019</p>
              <p className="text-secondary text-sm font-bold uppercase tracking-[0.2em]">In the heart of Lagos</p>
            </div>
          </div>
        </div>
      </section>

      {/* T-SLIDER: Testimonials */}
      <section ref={testReveal.ref} className="py-28 bg-primary overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <h2 className="font-heading text-5xl font-black text-white text-center italic uppercase">Words from Our Community</h2>
        </div>
        <div className="w-full overflow-hidden flex">
          <div className="flex gap-6 animate-slide-left py-4">
            {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
              <div key={i} className="w-80 md:w-[450px] shrink-0 bg-white/5 border border-white/8 rounded-[2.5rem] p-10 flex flex-col justify-between">
                <p className="text-white/80 text-xl leading-relaxed italic mb-10">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center text-primary font-black text-xl">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-heading font-bold text-white text-lg tracking-wide uppercase">{t.name}</p>
                    <p className="text-secondary text-xs font-black uppercase">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* C4: Contact Split */}
      <section id="contact" className="py-28 px-6 bg-accent">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-[10vw] md:text-[6.5vw] font-black text-primary leading-none mb-10 italic uppercase">
            Ready to Order?
          </h2>
          <div className="grid md:grid-cols-2 gap-16 items-start border-t-4 border-primary/20 pt-16">
            <div className="space-y-8">
              <p className="text-primary font-bold text-2xl leading-snug">
                Let us make your next Lagos celebration truly special with artisanal treats crafted just for you.
              </p>
              <div className="space-y-4">
                <a href="#" className="flex items-center gap-4 text-primary group">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                    <Instagram size={24} />
                  </div>
                  <span className="font-bold text-lg">@aderaf_entertainment_ventures</span>
                </a>
                <div className="flex items-center gap-4 text-primary">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-accent">
                    <MapPin size={24} />
                  </div>
                  <span className="font-bold text-lg">Serving Lagos, Nigeria</span>
                </div>
              </div>
            </div>
            <div className="bg-primary/5 rounded-[2rem] p-10 border-2 border-primary/10">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-secondary flex items-center justify-center rounded-xl">
                  <span className="text-primary font-heading font-black text-2xl">A</span>
                </div>
                <h3 className="font-heading font-bold text-white text-2xl tracking-widest uppercase italic">ADERAF VENTURES</h3>
              </div>
              <p className="text-white/40 max-w-sm leading-relaxed font-medium">
                {brand.description}
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest mb-6">Explore</h4>
              <ul className="space-y-4">
                <li><a href="#home" className="text-white/60 hover:text-accent transition-colors">Home</a></li>
                <li><a href="#products" className="text-white/60 hover:text-accent transition-colors">Menu</a></li>
                <li><a href="#contact" className="text-white/60 hover:text-accent transition-colors">Order Inquiry</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest mb-6">Connect</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-white/60 hover:text-accent transition-colors">Instagram</a></li>
                <li><a href="#" className="text-white/60 hover:text-accent transition-colors">WhatsApp</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/30 text-xs font-bold uppercase tracking-[0.2em]">
              © {new Date().getFullYear()} ADERAF ENTERTAINMENT VENTURES. ALL RIGHTS RESERVED.
            </p>
            <div className="flex gap-8">
              <span className="text-white/30 text-xs font-bold uppercase tracking-widest">Designed for Lagos</span>
              <span className="text-white/30 text-xs font-bold uppercase tracking-widest">Crafted with Heart</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
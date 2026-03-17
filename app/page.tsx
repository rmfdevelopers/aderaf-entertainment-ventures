'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  ChefHat, 
  Leaf, 
  Zap, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCheck, 
  Menu, 
  X, 
  ImageOff, 
  ShoppingBag, 
  Heart, 
  Star, 
  UtensilsCrossed,
  Cake
} from 'lucide-react';

// --- DATA ---
const BRAND = {
  name: "Aderaf Entertainment Ventures",
  tagline: "Crafting Moments, One Sweet Bite at a Time.",
  description: "Artisan bakery specializing in bespoke cakes and premium snacks for every celebration across Lagos.",
  industry: "food & beverage",
  region: "nigeria",
  currency: "₦"
};

const PRODUCTS = [
  { name: "Celebration Layer Cake", description: "A towering 3-layer cake, perfectly balanced vanilla sponge with rich buttercream and edible gold flakes.", price: "₦28,500", img: "https://picsum.photos/seed/food1/800/600" },
  { name: "Gourmet Cookie Box", description: "A dozen assorted cookies featuring triple chocolate chunk, salted caramel, and red velvet crunch.", price: "₦9,800", img: "https://picsum.photos/seed/food2/800/600" },
  { name: "Nigerian Puff-Puff Bites", description: "Our signature fluffy, perfectly sweetened local snack. Ideal for parties and casual munching.", price: "₦4,500", img: "https://picsum.photos/seed/food3/800/600" },
  { name: "Miniature Dessert Cups", description: "A set of 10 vibrant dessert cups, featuring mousse, cheesecake, and fresh fruit layers.", price: "₦15,000", img: "https://picsum.photos/seed/food4/800/600" }
];

const FEATURES = [
  { title: "Fresh Ingredients", description: "We source only the freshest, locally sourced dairy and premium baking essentials for superior taste.", icon: Leaf },
  { title: "Fast Delivery", description: "Ensuring your sweet treats arrive promptly and perfectly chilled across the Lagos metropolis.", icon: Zap },
  { title: "Chef's Special", description: "Rotating weekly specials designed by our lead pastry chef to surprise and delight our customers.", icon: ChefHat }
];

const STATS = [
  { number: "350+", label: "Events Served", icon: Heart },
  { number: "4.9", label: "Average Rating", icon: Star },
  { number: "20+", label: "Snack Varieties", icon: Cake }
];

const TESTIMONIALS = [
  { name: "Tosin Adebayo", text: "That Red Velvet cake was the talk of the party! Flawless texture and the frosting? Next level.", role: "Event Planner" },
  { name: "Jide Okoro", text: "Your puff-puffs vanished first. Seriously addictive. Will be ordering weekly for the office.", role: "Corporate Client" },
  { name: "Nneka Nwafor", text: "Communication was excellent, delivery was on time, and the cake looked exactly like the inspiration photo. 10/10!", role: "Birthday Host" }
];

// --- HOOKS ---
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
  }, []);
  return { ref, isVisible };
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
        <ImageOff size={28} className="text-accent/20" />
      </div>
    );
  }
  return (
    <Image src={src} alt={alt} fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} priority={priority} onError={() => setError(true)} />
  );
}

function SectionHeading({ title, subtitle, light = false }: { title: string; subtitle?: string; light?: boolean }) {
  return (
    <div className="mb-14 max-w-2xl">
      <h2 className={`text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none ${light ? 'text-accent' : 'text-secondary'}`}>
        {title}
      </h2>
      {subtitle && <p className={`mt-4 text-lg font-medium ${light ? 'text-accent/60' : 'text-secondary/70'}`}>{subtitle}</p>}
    </div>
  );
}

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const heroReveal = useScrollReveal();
  const featuresReveal = useScrollReveal();
  const productsReveal = useScrollReveal();
  const aboutReveal = useScrollReveal();
  const testimonialsReveal = useScrollReveal();
  const contactReveal = useScrollReveal();

  return (
    <main className="min-h-screen bg-primary">
      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-4 ${scrolled ? 'bg-primary border-b border-accent/10 shadow-xl py-3' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-accent text-primary flex items-center justify-center font-black text-xl rounded-lg rotate-3">A</div>
            <span className="font-heading text-2xl font-bold tracking-tighter text-accent uppercase hidden sm:block">Aderaf</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {['Menu', 'About', 'Testimonials'].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-accent/80 hover:text-accent font-bold uppercase text-sm tracking-widest transition-colors">
                {link}
              </a>
            ))}
            <a href="#contact" className="bg-accent text-primary px-6 py-2.5 rounded-full font-black text-sm uppercase hover:scale-105 transition-transform">
              Order Now
            </a>
          </div>

          <button className="md:hidden text-accent" onClick={() => setIsMenuOpen(true)}>
            <Menu size={32} />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div className={`fixed inset-0 z-[60] bg-secondary transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-end p-6">
          <button onClick={() => setIsMenuOpen(false)} className="text-accent">
            <X size={40} />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center h-full gap-8 -mt-20">
          {['Menu', 'About', 'Testimonials', 'Contact'].map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} className="text-accent text-4xl font-black uppercase italic tracking-tighter">
              {link}
            </a>
          ))}
        </div>
      </div>

      {/* HERO SECTION (HR-B Pattern) */}
      <section id="home" className="min-h-screen relative flex items-end pb-24 px-6 md:px-16 overflow-hidden">
        <SafeImage 
          src="https://picsum.photos/seed/bakery-hero/1920/1080" 
          alt="Artisan Cakes" 
          fill 
          className="object-cover" 
          priority 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-transparent to-transparent" />
        
        <div className={`relative z-10 max-w-4xl transition-all duration-1000 ${heroReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`} ref={heroReveal.ref}>
          <h1 className="font-heading text-7xl md:text-[10rem] font-black text-accent leading-[0.8] tracking-tighter uppercase mb-8">
            GET THE VIBE
          </h1>
          <p className="text-accent/80 mt-6 text-xl md:text-2xl max-w-2xl leading-tight font-medium">
            {BRAND.description} Lagos' most unforgettable cakes and snacks are just a click away.
          </p>
          <div className="flex flex-wrap gap-4 mt-12">
            <a href="#products" className="bg-accent text-primary px-10 py-5 font-black text-lg uppercase rounded-xl hover:scale-105 transition-all shadow-2xl">
              Check Out The Menu
            </a>
            <a href="#about" className="border-2 border-accent text-accent px-10 py-5 font-bold text-lg uppercase rounded-xl hover:bg-accent hover:text-primary transition-all">
              Our Story
            </a>
          </div>
        </div>
      </section>

      {/* D-GRID DIVIDER */}
      <div className="py-10 border-y border-accent/10 bg-secondary/5">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-x-12 gap-y-6">
          {['Quality', 'Speed', 'Craft', 'Trust', 'Lagos Flavor'].map((word, i) => (
            <div key={i} className="flex items-center gap-3 text-accent/30 text-xs font-bold tracking-[0.4em] uppercase">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              {word}
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES SECTION (F-ICON-GRID Pattern) */}
      <section id="features" ref={featuresReveal.ref} className="py-28 px-6 bg-primary">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Why Aderaf Hits Different" subtitle="Beyond the batter, we bring the entertainment to your event." light />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <div 
                key={i} 
                className={`p-10 rounded-3xl bg-secondary text-accent border border-accent/10 hover:-translate-y-2 transition-all duration-500 group ${featuresReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-8 group-hover:rotate-12 transition-transform">
                  <f.icon size={32} className="text-accent" />
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">{f.title}</h3>
                <p className="text-accent/60 leading-relaxed text-lg">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION (P-ASYMMETRIC Pattern) */}
      <section id="menu" ref={productsReveal.ref} className="py-28 px-6 bg-accent">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Our Current Drops" subtitle="From celebration centerpieces to your daily indulgence, find your flavor." />
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Main Featured Item */}
            <div className={`md:col-span-8 group relative rounded-[2rem] overflow-hidden h-[500px] shadow-2xl transition-all duration-1000 ${productsReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <SafeImage src={PRODUCTS[0].img} alt={PRODUCTS[0].name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/20 to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 p-10 w-full">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="bg-primary text-accent px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-4 inline-block">Best Seller</span>
                    <h3 className="text-4xl md:text-6xl font-black text-accent uppercase tracking-tighter leading-none">{PRODUCTS[0].name}</h3>
                    <p className="text-accent/70 mt-4 max-w-md hidden md:block">{PRODUCTS[0].description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-black text-primary mb-2">{PRODUCTS[0].price}</p>
                    <a href="#contact" className="bg-accent text-primary px-6 py-3 rounded-xl font-black uppercase text-sm hover:brightness-110 transition-all">Add to Cart</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Grid Items */}
            <div className="md:col-span-4 flex flex-col gap-6">
              {PRODUCTS.slice(1, 3).map((p, i) => (
                <div key={i} className={`flex-1 group relative rounded-[2rem] overflow-hidden shadow-xl transition-all duration-1000 ${productsReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`} style={{ transitionDelay: `${i * 200}ms` }}>
                  <SafeImage src={p.img} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-secondary/40 group-hover:bg-secondary/60 transition-colors" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <h4 className="text-2xl font-black text-accent uppercase tracking-tighter leading-tight">{p.name}</h4>
                    <p className="text-primary font-black text-lg mt-1">{p.price}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Row Item */}
            <div className={`md:col-span-12 group relative rounded-[2rem] overflow-hidden h-[300px] shadow-xl transition-all duration-1000 ${productsReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: '400ms' }}>
              <SafeImage src={PRODUCTS[3].img} alt={PRODUCTS[3].name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-secondary/60" />
              <div className="absolute inset-0 flex items-center justify-between px-10">
                <div className="max-w-md">
                  <h4 className="text-4xl font-black text-accent uppercase tracking-tighter">{PRODUCTS[3].name}</h4>
                  <p className="text-accent/60 mt-2">{PRODUCTS[3].description}</p>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-black text-primary italic mb-4">{PRODUCTS[3].price}</p>
                  <a href="#contact" className="bg-primary text-accent px-8 py-4 rounded-xl font-black uppercase hover:scale-105 transition-transform">Order Drop</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" ref={aboutReveal.ref} className="py-28 px-6 bg-secondary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className={`transition-all duration-1000 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <SectionHeading title="The Sweet Story" light />
            <p className="text-accent/70 text-xl leading-relaxed mb-8">
              Aderaf Entertainment Ventures started as a passion project during lockdown, focused on bringing joy through expertly crafted baked goods. We've grown by prioritizing flavor over hype, but never skipping the party aesthetic.
            </p>
            <p className="text-accent font-bold text-lg italic border-l-4 border-primary pl-6 mb-12">
              "Quality wey go loud" &mdash; we are proudly Lagos-based and dedicated to making every order a memorable experience.
            </p>
            <div className="grid grid-cols-3 gap-6">
              {STATS.map((s, i) => (
                <div key={i} className="text-center md:text-left">
                  <p className="text-4xl md:text-5xl font-black text-primary leading-none tracking-tighter">{s.number}</p>
                  <p className="text-accent/40 text-xs font-bold uppercase tracking-[0.2em] mt-3">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={`relative aspect-square rounded-[3rem] overflow-hidden border-8 border-accent/5 transition-all duration-1000 delay-300 ${aboutReveal.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <SafeImage src="https://picsum.photos/seed/bakery-vibe/1000/1000" alt="Baking Passion" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS (T-SLIDER Pattern) */}
      <section id="testimonials" ref={testimonialsReveal.ref} className="py-28 bg-primary overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <SectionHeading title="What The People Are Saying" light />
        </div>
        <div className="w-full overflow-hidden relative">
          <div className="flex w-[200%] gap-6 animate-[slide-left_40s_linear_infinite] hover:[animation-play-state:paused]">
            {[...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <div key={i} className="w-80 md:w-[450px] shrink-0 bg-accent rounded-[2.5rem] p-10 shadow-2xl">
                <div className="flex gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map(n => <Star key={n} size={18} fill="#FF6F61" className="text-primary" />)}
                </div>
                <p className="text-secondary text-xl font-medium leading-relaxed mb-8">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-4 border-t border-secondary/10 pt-8">
                  <div className="w-14 h-14 rounded-full bg-secondary text-accent flex items-center justify-center font-black text-xl">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-black text-secondary text-lg uppercase tracking-tight">{t.name}</p>
                    <p className="text-secondary/50 text-xs font-bold uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION (C4 Pattern) */}
      <section id="contact" ref={contactReveal.ref} className="py-28 px-6 bg-accent border-t-8 border-secondary">
        <div className="max-w-7xl mx-auto">
          <h2 className={`font-heading text-[12vw] md:text-[8vw] font-black text-secondary leading-none mb-16 transition-all duration-1000 ${contactReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            READY TO ORDER?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-20 items-start">
            <div className={`transition-all duration-1000 delay-300 ${contactReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <p className="text-secondary/70 text-2xl font-medium mb-12 leading-tight">
                Hit us up for your custom birthday cakes, corporate snack packs, or just a personal box of vibes.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                    <Instagram size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-secondary/40 uppercase tracking-widest">Follow Us</p>
                    <p className="text-xl font-bold text-secondary">@aderaf_entertainment_ventures</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-accent">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-secondary/40 uppercase tracking-widest">Our Location</p>
                    <p className="text-xl font-bold text-secondary">Lagos, Nigeria</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`bg-primary p-10 rounded-[3rem] shadow-2xl transition-all duration-1000 delay-500 ${contactReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-secondary pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary text-accent flex items-center justify-center font-black text-2xl rounded-xl rotate-6">A</div>
                <h2 className="text-3xl font-black text-accent uppercase tracking-tighter">Aderaf Entertainment</h2>
              </div>
              <p className="text-accent/50 max-w-sm text-lg leading-relaxed">
                Making Lagos sweeter, one bespoke creation at a time. Quality ingredients meets artistic entertainment.
              </p>
            </div>
            <div>
              <h4 className="text-primary font-black uppercase tracking-widest mb-6">Explore</h4>
              <ul className="space-y-4">
                {['Home', 'Menu', 'About', 'Contact'].map(item => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="text-accent/60 hover:text-accent font-bold uppercase text-sm tracking-widest transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-primary font-black uppercase tracking-widest mb-6">Social</h4>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 rounded-full bg-accent/5 border border-accent/10 flex items-center justify-center text-accent hover:bg-primary hover:text-accent transition-all">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-accent/5 border border-accent/10 flex items-center justify-center text-accent hover:bg-primary hover:text-accent transition-all">
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-accent/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-accent/30 text-sm font-bold uppercase tracking-widest">
              © {new Date().getFullYear()} Aderaf Entertainment Ventures. All Vibes Reserved.
            </p>
            <div className="flex gap-8 text-accent/30 text-xs font-black uppercase tracking-widest">
              <a href="#" className="hover:text-primary">Privacy</a>
              <a href="#" className="hover:text-primary">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

function ContactForm() {
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
      <div className="flex flex-col items-center justify-center py-10 text-center animate-scaleIn">
        <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-6 border-2 border-accent">
          <CheckCheck size={40} className="text-accent" />
        </div>
        <h3 className="text-3xl font-black text-accent uppercase tracking-tighter">Vibe Received!</h3>
        <p className="text-accent/70 mt-4 max-w-xs font-medium">We'll reach out faster than a puff-puff disappears!</p>
        <button onClick={() => setSent(false)} className="mt-8 text-accent underline font-black uppercase text-sm">Send Another</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <input 
          type="text" placeholder="Full Name" required
          value={form.name} onChange={e => setForm({...form, name: e.target.value})}
          className="w-full bg-secondary/20 border-2 border-accent/10 rounded-2xl px-6 py-4 text-accent placeholder:text-accent/30 focus:border-accent outline-none transition-all"
        />
        <input 
          type="email" placeholder="Email Address" required
          value={form.email} onChange={e => setForm({...form, email: e.target.value})}
          className="w-full bg-secondary/20 border-2 border-accent/10 rounded-2xl px-6 py-4 text-accent placeholder:text-accent/30 focus:border-accent outline-none transition-all"
        />
      </div>
      <input 
        type="tel" placeholder="WhatsApp / Phone Number" required
        value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
        className="w-full bg-secondary/20 border-2 border-accent/10 rounded-2xl px-6 py-4 text-accent placeholder:text-accent/30 focus:border-accent outline-none transition-all"
      />
      <textarea 
        rows={4} placeholder="Tell us about your event / order details..." required
        value={form.message} onChange={e => setForm({...form, message: e.target.value})}
        className="w-full bg-secondary/20 border-2 border-accent/10 rounded-2xl px-6 py-4 text-accent placeholder:text-accent/30 focus:border-accent outline-none resize-none transition-all"
      />
      <button 
        type="submit" disabled={loading}
        className="w-full bg-accent text-primary py-5 rounded-2xl font-black uppercase text-lg hover:brightness-110 transition-all disabled:opacity-50"
      >
        {loading ? 'Sending Vibe...' : 'Submit Order Enquiry'}
      </button>
    </form>
  );
}
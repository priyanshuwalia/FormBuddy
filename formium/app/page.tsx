"use client"
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/ui/ModeToggle";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles, Zap, Shield, Code2, BarChart3, Users, Star, TrendingUp, Globe, Lock } from "lucide-react";

export default function Home() {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Mesh Gradient Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-linear-to-br from-background via-primary/5 to-background" />
        <div className="absolute top-0 -left-4 w-[500px] h-[500px] bg-primary/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
        <div className="absolute top-0 -right-4 w-[500px] h-[500px] bg-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-[500px] h-[500px] bg-pink-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-background/60 border-b border-border/50 shadow-lg shadow-primary/5 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-br from-primary to-purple-600 rounded-xl blur-md opacity-75 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-10 h-10 rounded-xl bg-linear-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-primary-foreground animate-pulse" />
                </div>
              </div>
              <span className="text-2xl font-bold bg-linear-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Formium
              </span>
            </div>

            <div className="flex items-center gap-4">
              <ModeToggle />
              <Link href="/login">
                <Button variant="ghost" className="hidden sm:inline-flex hover:bg-primary/10 transition-all duration-300">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="group relative overflow-hidden bg-linear-to-r from-primary to-purple-600 hover:shadow-xl hover:shadow-primary/50 transition-all duration-300">
                  <span className="relative z-10 flex items-center gap-2">
                    Get Started
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-linear-to-r from-primary/20 via-purple-500/20 to-pink-500/20 border border-primary/30 backdrop-blur-xl shadow-lg shadow-primary/10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <div className="relative">
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                <div className="absolute inset-0 bg-primary/50 blur-sm" />
              </div>
              <span className="text-sm font-semibold bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Generate and Integrate Forms Easily
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100">
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight">
                <span className="block mb-2">Build Beautiful</span>
                <span className="block bg-linear-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent animate-linear bg-[length:200%_auto]">
                  Forms in Minutes
                </span>
              </h1>

              <p className="text-xl sm:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
                Create stunning, responsive forms with our intuitive drag-and-drop builder.
                <span className="text-foreground font-medium"> Integrate seamlessly</span> with your favorite tools and start collecting data instantly.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
              <Link href="/signup">
                <Button size="lg" className="group relative overflow-hidden text-lg px-10 py-7 bg-linear-to-r from-primary to-purple-600 hover:shadow-2xl hover:shadow-primary/50 transition-all duration-500 hover:scale-105">
                  <span className="relative z-10 flex items-center gap-2 font-semibold">
                    Start Building Free
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2 duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="text-lg px-10 py-7 border-2 hover:bg-primary/10 hover:border-primary transition-all duration-300 hover:scale-105 backdrop-blur-xl">
                  <span className="flex items-center gap-2 font-semibold">
                    <Globe className="h-5 w-5" />
                    View Demo
                  </span>
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 pt-8 text-sm text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>Free forever plan</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>Cancel anytime</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
              {[
                { label: "Active Users", value: "10K+", icon: Users, color: "from-blue-500 to-cyan-500" },
                { label: "Forms Created", value: "50K+", icon: BarChart3, color: "from-purple-500 to-pink-500" },
                { label: "Response Rate", value: "98%", icon: TrendingUp, color: "from-green-500 to-emerald-500" },
                { label: "Uptime", value: "99.9%", icon: Shield, color: "from-orange-500 to-red-500" }
              ].map((stat, i) => (
                <div key={i} className="group relative p-6 rounded-2xl bg-card/50 backdrop-blur-xl border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/10">
                  <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative space-y-2">
                    <div className={`w-10 h-10 rounded-lg bg-linear-to-br ${stat.color} flex items-center justify-center mb-3 shadow-lg`}>
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-4xl font-bold bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-linear-to-b from-muted/50 to-background" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-5xl sm:text-6xl font-bold">
              Everything You Need to
              <span className="block mt-2 bg-linear-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Build Amazing Forms
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Powerful features designed to make form creation effortless and data collection seamless.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Build forms in minutes with our intuitive drag-and-drop interface. No coding required.",
                color: "from-yellow-500 to-orange-500",
                delay: "0"
              },
              {
                icon: Shield,
                title: "Secure & Compliant",
                description: "Enterprise-grade security with GDPR compliance. Your data is always protected.",
                color: "from-green-500 to-emerald-500",
                delay: "100"
              },
              {
                icon: Code2,
                title: "Easy Integration",
                description: "Connect with 100+ tools and platforms. Embed anywhere with a single line of code.",
                color: "from-blue-500 to-cyan-500",
                delay: "200"
              },
              {
                icon: BarChart3,
                title: "Advanced Analytics",
                description: "Get real-time insights with powerful analytics and detailed response tracking.",
                color: "from-purple-500 to-pink-500",
                delay: "300"
              },
              {
                icon: Users,
                title: "Team Collaboration",
                description: "Work together seamlessly with role-based permissions and real-time updates.",
                color: "from-indigo-500 to-purple-500",
                delay: "400"
              },
              {
                icon: Lock,
                title: "Smart Validation",
                description: "Ensure data quality with intelligent validation rules and conditional logic.",
                color: "from-pink-500 to-rose-500",
                delay: "500"
              }
            ].map((feature, i) => (
              <div
                key={i}
                className="group relative p-8 rounded-3xl bg-card/50 backdrop-blur-xl border border-border/50 hover:border-primary/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20"
                style={{ animationDelay: `${feature.delay}ms` }}
              >
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-purple-500/5 to-pink-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative space-y-4">
                  <div className="relative w-16 h-16">
                    <div className={`absolute inset-0 bg-linear-to-br ${feature.color} rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className={`relative w-16 h-16 rounded-2xl bg-linear-to-br ${feature.color} flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Trusted by
              <span className="bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent"> Thousands</span>
            </h2>
            <p className="text-xl text-muted-foreground">Join teams who are already building better forms</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "Product Manager at TechCorp",
                content: "Formium transformed how we collect user feedback. The interface is intuitive and the analytics are incredibly helpful. Our response rates increased by 60%!",
                rating: 5
              },
              {
                name: "Marcus Rodriguez",
                role: "Startup Founder",
                content: "Best form builder I've used. Clean, fast, and powerful. Our conversion rates improved by 40% within the first month of using Formium.",
                rating: 5
              },
              {
                name: "Emily Watson",
                role: "Marketing Director",
                content: "The customization options are endless. We created beautiful forms that perfectly match our brand identity. Highly recommended!",
                rating: 5
              }
            ].map((testimonial, i) => (
              <div
                key={i}
                className="group relative p-8 rounded-3xl bg-card/50 backdrop-blur-xl border border-border/50 hover:border-primary/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20"
              >
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative space-y-4">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-foreground leading-relaxed text-lg">{testimonial.content}</p>
                  <div className="pt-4 border-t border-border/50">
                    <div className="font-semibold text-lg">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-purple-500/20 to-pink-500/20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/30 rounded-full blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto relative">
          <div className="relative p-16 rounded-3xl bg-card/30 backdrop-blur-2xl border border-border/50 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-purple-500/10 to-pink-500/10" />
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px]" />

            <div className="relative text-center space-y-8">
              <h2 className="text-5xl sm:text-6xl font-bold">
                Ready to Transform Your
                <span className="block mt-2 bg-linear-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Form Experience?
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Join thousands of teams already using Formium to create beautiful, high-converting forms.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link href="/signup">
                  <Button size="lg" className="group relative overflow-hidden text-lg px-10 py-7 bg-linear-to-r from-primary to-purple-600 hover:shadow-2xl hover:shadow-primary/50 transition-all duration-500 hover:scale-105">
                    <span className="relative z-10 flex items-center gap-2 font-semibold">
                      Get Started for Free
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2 duration-300" />
                    </span>
                    <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline" className="text-lg px-10 py-7 border-2 hover:bg-primary/10 hover:border-primary transition-all duration-300 hover:scale-105 backdrop-blur-xl">
                    <span className="font-semibold">Sign In</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-border/50 py-16 px-4 sm:px-6 lg:px-8 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h4 className="font-bold text-lg mb-6 text-foreground">Product</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li><Link href="#" className="hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">Features</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">Pricing</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">Templates</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">Integrations</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6 text-foreground">Company</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li><Link href="#" className="hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">About</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">Blog</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">Careers</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6 text-foreground">Resources</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li><Link href="#" className="hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">Documentation</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">API Reference</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">Support</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">Status</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6 text-foreground">Legal</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li><Link href="#" className="hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">Privacy</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">Terms</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">Security</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">GDPR</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-br from-primary to-purple-600 rounded-lg blur-md opacity-75 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-8 h-8 rounded-lg bg-linear-to-br from-primary to-purple-600 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
              </div>
              <span className="font-bold text-lg">Formium</span>
            </div>
            <p className="text-muted-foreground">
              © 2025 Formium. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
        
        .bg-grid-white\/\[0\.02\] {
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
        }
      `}</style>
    </div>
  );
}

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  Sparkles, 
  Zap, 
  Shield, 
  Users, 
  BarChart3, 
  Palette,
  ArrowRight,
  CheckCircle2,
  Star
} from "lucide-react";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Build forms in minutes with our intuitive drag-and-drop interface",
      gradient: "from-amber-400 to-orange-500"
    },
    {
      icon: Palette,
      title: "Fully Customizable",
      description: "Design forms that match your brand with extensive styling options",
      gradient: "from-purple-400 to-pink-500"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security to protect your data and responses",
      gradient: "from-blue-400 to-cyan-500"
    },
    {
      icon: BarChart3,
      title: "Analytics Built-in",
      description: "Track responses and gain insights with powerful analytics",
      gradient: "from-green-400 to-emerald-500"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Work together seamlessly with your team in real-time",
      gradient: "from-indigo-400 to-purple-500"
    },
    {
      icon: Sparkles,
      title: "Smart Features",
      description: "AI-powered suggestions and automation to save you time",
      gradient: "from-rose-400 to-red-500"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager",
      content: "FormBuddy transformed how we collect user feedback. The interface is intuitive and the analytics are incredibly helpful.",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Startup Founder",
      content: "Best form builder I've used. Clean, fast, and powerful. Our conversion rates improved by 40%!",
      rating: 5
    },
    {
      name: "Emily Watson",
      role: "Marketing Director",
      content: "The customization options are endless. We created beautiful forms that perfectly match our brand.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        />
        <div 
          className="absolute bottom-1/4 -right-48 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"
          style={{ transform: `translateY(${-scrollY * 0.2}px)` }}
        />
        <div 
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse"
          style={{ transform: `translate(-50%, -50%) scale(${1 + scrollY * 0.0005})` }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-6 md:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              FormBuddy
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <Link 
              to="/login" 
              className="px-6 py-2.5 rounded-xl font-medium transition-all duration-300 hover:bg-white/10 backdrop-blur-sm"
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-medium shadow-lg shadow-purple-500/50 transition-all duration-300 hover:shadow-purple-500/70 hover:scale-105"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20 md:py-32 md:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium">Empower Creativity, Simplify Form Building</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Build Beautiful Forms
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
              In Minutes, Not Hours
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            The most intuitive form builder for modern teams. Create stunning forms, 
            collect responses, and gain insights—all in one powerful platform.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link 
              to="/register" 
              className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold text-lg shadow-2xl shadow-purple-500/50 transition-all duration-300 hover:shadow-purple-500/70 hover:scale-105 flex items-center gap-2"
            >
              Start Building Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/create-form" 
              className="px-8 py-4 bg-white/10 backdrop-blur-md rounded-xl font-semibold text-lg border border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-105"
            >
              View Demo
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { value: "50K+", label: "Forms Created" },
              { value: "99.9%", label: "Uptime" },
              { value: "10M+", label: "Responses Collected" }
            ].map((stat, index) => (
              <div 
                key={index}
                className="p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-6 py-20 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need to
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Succeed</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Powerful features designed to make form building effortless and enjoyable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:border-white/30 cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 px-6 py-20 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Loved by
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Thousands</span>
            </h2>
            <p className="text-xl text-gray-300">See what our users have to say</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="relative p-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-3xl border border-white/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 animate-pulse" />
            
            <div className="relative z-10 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of teams already building better forms with FormBuddy
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <Link 
                  to="/register" 
                  className="group px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold text-lg shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
                >
                  Create Your First Form
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span>Free forever plan</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 md:px-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold">FormBuddy</span>
            </div>
            
            <div className="text-gray-400 text-sm">
              © 2025 FormBuddy. All rights reserved.
            </div>
            
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}

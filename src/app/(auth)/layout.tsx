// 'use client';
// import { ReactNode } from 'react';
import { ArrowRight, Sparkles, Wrench } from 'lucide-react';

// interface AuthLayoutProps {
//   children: ReactNode;
//   title: string;
//   subtitle?: string;
//   showLogo?: boolean;
// }

/**
 * Layout pour les pages d'authentification
 * Design moderne avec split-screen
 */
export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Gradient Orbs */}
                <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-indigo-500/20 via-purple-500/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f10_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f10_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

                {/* Floating Particles */}
                <div className="absolute inset-0">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-float"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${5 + Math.random() * 10}s`,
                            }}
                        ></div>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex items-center justify-center p-4 sm:p-8 relative z-10">
                <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    {/* Left Side - Branding */}
                    <div className="hidden lg:block space-y-8 text-white">
                        {/* Logo */}
                        <div className="inline-flex items-center gap-3 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl">
                            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                                <Wrench className="h-8 w-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                                    GMAO Pro
                                </h1>
                                <p className="text-sm text-blue-200">Gestion de Maintenance</p>
                            </div>
                        </div>

                        {/* Features */}
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-4xl font-bold mb-4 leading-tight">
                                    Gérez votre maintenance
                                    <br />
                                    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                        en toute simplicité
                                    </span>
                                </h2>
                                <p className="text-lg text-blue-100/80">
                                    Optimisez vos interventions, suivez vos équipements et pilotez votre activité avec une solution complète et intuitive.
                                </p>
                            </div>

                            <div className="space-y-4">
                                {[
                                    { icon: Sparkles, text: 'Interface moderne et intuitive' },
                                    { icon: ArrowRight, text: 'Planification intelligente' },
                                    { icon: ArrowRight, text: 'Suivi en temps réel' },
                                    { icon: ArrowRight, text: 'Rapports détaillés' },
                                ].map((feature, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3 p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                                    >
                                        <div className="p-2 bg-blue-500/20 rounded-lg">
                                            <feature.icon className="h-5 w-5 text-blue-400" />
                                        </div>
                                        <span className="text-blue-50">{feature.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { value: '10k+', label: 'Utilisateurs' },
                                { value: '99.9%', label: 'Uptime' },
                                { value: '24/7', label: 'Support' },
                            ].map((stat, index) => (
                                <div
                                    key={index}
                                    className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 text-center"
                                >
                                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                                    <div className="text-sm text-blue-200">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side - Login Form */}
                    <div className="w-full">
                        {/* Mobile Logo */}
                        <div className="lg:hidden flex justify-center mb-8">
                            <div className="inline-flex items-center gap-3 p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                                <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                                    <Wrench className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-white">GMAO Pro</h1>
                                    <p className="text-xs text-blue-200">Maintenance</p>
                                </div>
                            </div>
                        </div>

                        <>{children}</>

                        {/* Footer */}
                        <div className="mt-8 text-center">
                            <p className="text-sm text-blue-300/60">
                                © 2024 GMAO Pro. Tous droits réservés.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Animations */}
            {/* <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(50px);
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style> */}
        </div>
    );
}
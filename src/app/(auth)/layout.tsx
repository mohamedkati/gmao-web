'use client';

// import { ReactNode } from 'react';
import Link from 'next/link';
import { Wrench } from 'lucide-react';

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
        <div className="min-h-screen flex">
            {/* Left Side - Branding avec gradient animé */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden">
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-4000"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
                    {/* Logo */}
                    {
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl group-hover:bg-white/20 transition-all duration-300">
                                <Wrench className="h-8 w-8" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">GMAO Pro</h1>
                                <p className="text-sm text-blue-100">Gestion de Maintenance</p>
                            </div>
                        </Link>
                    }

                    {/* Features */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-4xl font-bold mb-4 leading-tight">
                                Gérez votre maintenance
                                <br />
                                en toute simplicité
                            </h2>
                            <p className="text-lg text-blue-100">
                                Optimisez vos interventions, suivez vos équipements et pilotez
                                votre activité avec une solution complète et intuitive.
                            </p>
                        </div>

                        {/* Features list */}
                        <div className="space-y-4">
                            {[
                                'Planification intelligente des interventions',
                                'Suivi en temps réel de vos équipements',
                                'Rapports et analytics avancés',
                                'Application mobile pour vos techniciens',
                            ].map((feature, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                    <span className="text-blue-50">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-sm text-blue-200">
                        © 2024 GMAO Pro. Tous droits réservés.
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex items-center justify-center p-8 bg-background">
                <div className="w-full max-w-md space-y-8">
                    {/* Mobile Logo */}
                    {/* {showLogo && ( */}
                        <div className="lg:hidden flex justify-center mb-8">
                            <Link href="/" className="flex items-center gap-2">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <Wrench className="h-6 w-6 text-primary" />
                                </div>
                                <span className="text-xl font-bold">GMAO Pro</span>
                            </Link>
                        </div>
                    {/* )} */}

                    {/* Title */}
                    {/* <div className="text-center space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                        {subtitle && (
                            <p className="text-muted-foreground">{subtitle}</p>
                        )}
                    </div> */}

                    {/* Form Content */}
                    <div className="bg-card border rounded-xl p-8 shadow-sm">{children}</div>

                    {/* Additional Links - will be added by pages */}
                </div>
            </div>

            <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
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
      `}</style>
        </div>
    );
}
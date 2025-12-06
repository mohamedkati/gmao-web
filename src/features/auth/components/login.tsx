'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/shared/components/shadcnui/button';
import { Input } from '@/shared/components/shadcnui/input';
import { Label } from '@/shared/components/shadcnui/label';
import { Checkbox } from '@/shared/components/shadcnui/checkbox';
import { LoadingSpinner } from '@/shared/components/feedback/loading-spinner';
import { useAuth } from '@/shared/hooks/use-auth';
import { cn } from '@/shared/lib/utils/cn';
import { apiClient } from '@/shared/lib/api/api-client';
import { ApiResponse, ApiValidationResponse } from '@/shared/types/common.types';
import { AuthResponse } from '@/shared/types/auth.types';
import { isValidationError } from '@/shared/lib/api/api-error-handler';

// const backEndUrl = process.env.NEXT_PUBLIC_API_URL;

const loginSchema = z.object({
    email: z.string().email('Email invalide'),
    password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
    rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const { authenticate, } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setErrors] = useState<string[] | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError: setErrorOnField,
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
    });

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true);
        setErrors(null);

        try {
            const result: ApiResponse<AuthResponse> | ApiValidationResponse = await apiClient.post("/auth/login", data);
            if (isValidationError(result)) {
                const validationResult = result as ApiValidationResponse;
                if (!validationResult || !validationResult.errors) return;

                Object.entries(validationResult.errors).map(([key, errors]) => {
                    if (key === "credentials") {
                        setErrors(errors);
                    }
                    else {
                        const fieldName = key === 'email' ? 'email' : key === 'password' ? 'password' : 'rememberMe';
                        setErrorOnField(fieldName, { type: 'value', message: errors.join("<br/>") });
                    }
                });
            }
            else {
                const authResponse = result as ApiResponse<AuthResponse>;
                authenticate(authResponse.data.token, "");
                location.href = "/dashboard";
                location.reload();
            }
        } catch (err) {
            console.log(err);
            setErrors(['Email ou mot de passe incorrect']);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Form Card */}
            < div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 sm:p-10" >
                {/* Header */}
                < div className="text-center mb-8" >
                    <h2 className="text-3xl font-bold text-white mb-2">Bienvenue !</h2>
                    <p className="text-blue-200">Connectez-vous à votre compte</p>
                </div >

                {/* Form */}
                < form onSubmit={handleSubmit(onSubmit)} className="space-y-6" >
                    {/* Email */}
                    < div className="space-y-2" >
                        <Label htmlFor="email" className="text-white font-medium">
                            Email
                        </Label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-300 group-focus-within:text-blue-400 transition-colors" />
                            <Input
                                id="email"
                                type="email"
                                placeholder="john.doe@example.com"
                                {...register('email')}
                                disabled={isLoading}
                                className={cn(
                                    'pl-12 h-12 bg-white/10 border-white/20 text-white placeholder:text-blue-200/50',
                                    'focus:bg-white/15 focus:border-blue-400/50 transition-all duration-300',
                                    'hover:bg-white/15',
                                    errors.email && 'border-red-400/50'
                                )}
                            />
                        </div>
                        {
                            errors.email && (
                                <p className="text-xs text-red-300 flex items-center gap-1 mt-1">
                                    <span>⚠</span>
                                    {errors.email.message}
                                </p>
                            )
                        }
                    </div >

                    {/* Password */}
                    < div className="space-y-2" >
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password" className="text-white font-medium">
                                Mot de passe
                            </Label>
                            <Link
                                href="/forgot-password"
                                className="text-xs text-blue-300 hover:text-blue-200 transition-colors"
                            >
                                Mot de passe oublié ?
                            </Link>
                        </div>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-300 group-focus-within:text-blue-400 transition-colors" />
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                {...register('password')}
                                disabled={isLoading}
                                className={cn(
                                    'pl-12 pr-12 h-12 bg-white/10 border-white/20 text-white placeholder:text-blue-200/50',
                                    'focus:bg-white/15 focus:border-blue-400/50 transition-all duration-300',
                                    'hover:bg-white/15',
                                    errors.password && 'border-red-400/50'
                                )}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-300 hover:text-blue-200 transition-colors"
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                        {
                            errors.password && (
                                <p className="text-xs text-red-300 flex items-center gap-1 mt-1">
                                    <span>⚠</span>
                                    {errors.password.message}
                                </p>
                            )
                        }
                    </div >

                    {/* Remember Me */}
                    < div className="flex items-center space-x-2" >
                        <Checkbox
                            id="rememberMe"
                            {...register('rememberMe')}
                            className="border-white/30 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                        />
                        <label
                            htmlFor="rememberMe"
                            className="text-sm text-blue-100 cursor-pointer select-none"
                        >
                            Se souvenir de moi
                        </label>
                    </div >

                    {/* Error Message */}
                    {
                        error && (
                            <div className="p-4 bg-red-500/10 border border-red-400/30 rounded-xl backdrop-blur-sm">
                                <p className="text-sm text-red-300 flex items-center gap-2">
                                    <span className="text-lg">⚠</span>
                                    {error}
                                </p>
                            </div>
                        )
                    }

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className={cn(
                            'w-full h-12 text-base font-semibold',
                            'bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600',
                            'hover:from-blue-600 hover:via-blue-700 hover:to-indigo-700',
                            'shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-600/50',
                            'transition-all duration-300 transform hover:scale-[1.02]',
                            'border-0'
                        )}
                    >
                        {isLoading ? (
                            <>
                                <LoadingSpinner size="sm" className="mr-2" />
                                Connexion en cours...
                            </>
                        ) : (
                            <>
                                Se connecter
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </>
                        )}
                    </Button>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/20"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-transparent text-blue-200">ou</span>
                        </div>
                    </div>

                    {/* Social Login (Optional) */}
                    <div className="grid grid-cols-2 gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            className="h-11 bg-white/5 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
                        >
                            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            Google
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            className="h-11 bg-white/5 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
                        >
                            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" />
                            </svg>
                            Microsoft
                        </Button>
                    </div>

                    {/* Register Link */}
                    <div className="text-center">
                        <p className="text-sm text-blue-200">
                            Pas encore de compte ?{' '}
                            <Link
                                href="/register"
                                className="font-semibold text-blue-300 hover:text-white transition-colors underline underline-offset-4"
                            >
                                Créer un compte
                            </Link>
                        </p>
                    </div>
                </form >
            </div >
        </>

    );
}
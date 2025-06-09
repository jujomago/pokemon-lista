"use client";

import type React from "react";

import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, Lock, LogIn, Zap } from "lucide-react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (!success) {
        setError("Credenciales inválidas. Intenta de nuevo.");
      }
      // La navegación se maneja automáticamente en el contexto
    } catch (error) {
      setError("Error al iniciar sesión. Intenta de nuevo.");
      console.error("Error de inicio de sesión:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#3761a8]/10 p-4">
      <Card className="w-full max-w-md relative z-10 shadow-2xl border-0">
        <CardHeader className="space-y-1 text-center pb-8">
          <div className="mx-auto w-16 h-16 bg-[#3761a8] rounded-full flex items-center justify-center mb-4">
            <Zap className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold text-[#3761a8]">
            PokeList
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#3761a8] font-medium">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#3761a8]/60" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 h-12 border-2 border-[#3761a8]/20 focus:border-[#3761a8] rounded-xl"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#3761a8] font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#3761a8]/60" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 h-12 border-2 border-[#3761a8]/20 focus:border-[#3761a8] rounded-xl"
                  required
                />
              </div>
            </div>

            {error && (
              <Alert
                variant="destructive"
                className="border-[#ef5350]/30 bg-[#ef5350]/10"
              >
                <AlertDescription className="text-[#ef5350]">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full h-12 bg-[#3761a8] hover:bg-[#3761a8]/90 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3" />
                  Iniciando sesión...
                </>
              ) : (
                <>
                  <LogIn className="mr-3 h-5 w-5" />
                  Iniciar Sesión
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <div className="inline-flex items-center space-x-2 bg-[#feca1b]/10 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-[#feca1b] rounded-full animate-pulse"></div>
              <p className="text-[#ef5350] text-sm font-medium">
                Demo: Usa cualquier email y contraseña para acceder
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

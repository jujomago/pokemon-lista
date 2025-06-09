import Link from "next/link";
import { User, LogOut, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";

export function HeaderBar() {
  const { user, logout } = useAuth();

  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[#3761a8]"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white drop-shadow-lg">
                  PokéDashboard
                </h1>
                <p className="text-white/80 text-sm">
                  Explora el mundo Pokémon
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/profile">
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 hover:bg-white/20 transition-all duration-300 cursor-pointer">
                <User className="h-4 w-4 text-white" />
                <span className="text-sm font-medium text-white">
                  {user?.name}
                </span>
              </div>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={() => logout()}
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-[#ef5350] transition-all duration-300"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

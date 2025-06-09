import { Zap } from "lucide-react";

export function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#3761a8]/5 via-[#feca1b]/5 to-[#ef5350]/5">
      <div className="text-center">
        <div className="relative mb-6">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-[#feca1b] border-t-[#ef5350] mx-auto"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Zap className="h-8 w-8 text-[#3761a8] animate-pulse" />
          </div>
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-[#3761a8] to-[#ef5350] bg-clip-text text-transparent mb-2">
          PokéDashboard
        </h2>
        <p className="text-[#3761a8] font-medium">Cargando aplicación...</p>
        <div className="mt-4 flex justify-center space-x-1">
          <div className="w-2 h-2 bg-[#ef5350] rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-[#feca1b] rounded-full animate-bounce delay-100"></div>
          <div className="w-2 h-2 bg-[#3761a8] rounded-full animate-bounce delay-200"></div>
        </div>
      </div>
    </div>
  );
}

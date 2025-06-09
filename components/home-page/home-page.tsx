"use client";

import { useState, useEffect } from "react";

import { apiService } from "@/services/api-service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, RefreshCw, Zap } from "lucide-react";
import { VirtualizedList } from "./components/virtualized-list";
import { HeaderBar } from "../header-bar";

import { DataItem } from "@/lib/interfaces";
import { StatCards } from "./components/stat-cards";
import { PokemonCard } from "../pokemon-card";


export function HomePage() {
  const [data, setData] = useState<DataItem[]>([]);
  const [filteredData, setFilteredData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const renderItem = (item: DataItem, index: number) => (
    <PokemonCard key={item.id} item={item} index={index} />
  );

  useEffect(() => {
    // Filtrar datos basado en el término de búsqueda
    if (searchTerm) {
      const filtered = data.filter(
        (item) =>
          item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [searchTerm, data]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      const result = await apiService.getLargeDataset();
      setData(result);
      setFilteredData(result);
    } catch (error) {
      setError("Error al cargar los datos. Intenta de nuevo.");
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderBar />

      {loading && (
        <div className="min-h-screen flex items-center justify-center bg-[#3761a8]/5">
          <div className="text-center">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#feca1b] border-t-[#ef5350] mx-auto mb-4"></div>
              <Zap className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-[#3761a8]" />
            </div>
            <p className="text-[#3761a8] font-medium text-lg">
              Cargando PokéDatos...
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-[#3761a8] mb-2">
                Datos Pokémon ({filteredData.length.toLocaleString()})
              </h2>
              <p className="text-gray-600">
                Explora la base de datos más completa de Pokémon
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={loadData}
                className="bg-[#ef5350] hover:bg-[#ef5350]/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Actualizar Datos
              </Button>
            </div>
          </div>

          {/* Search mejorado */}
          <div className="mt-6 relative max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#3761a8]/60" />
            <Input
              placeholder="Buscar Pokémon, movimientos, objetos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 border-2 border-[#3761a8]/20 focus:border-[#3761a8] rounded-xl shadow-sm"
            />
          </div>
          <StatCards data={data} />
        </div>

        {error && (
          <div className="mb-6 p-4 bg-[#ef5350]/10 border border-[#ef5350]/30 rounded-lg">
            <p className="text-[#ef5350] font-medium">{error}</p>
          </div>
        )}

        {/* Lista Virtualizada */}
        <VirtualizedList
          items={filteredData}
          renderItem={renderItem}
          itemHeight={200}
          containerHeight={600}
        />
      </main>
    </div>
  );
}

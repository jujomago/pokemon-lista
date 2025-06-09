import axios, { type AxiosInstance } from "axios";
import { authService } from "./auth-service";
import {
  PokemonListResponse,
  NamedAPIResource,
  NamedAPIResourceList,
} from "./interfaces";

type ResourceList = {
  results: NamedAPIResource[];
};

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: "https://pokeapi.co/api/v2",
      timeout: 15000,
    });

    // Interceptor para agregar token a todas las requests

    // Sobre el ultimo punto del challenge, en un futuro se podria implemente un sistema de cache
    // para evitar hacer peticiones repetidas a la misma URL y mejorar el rendimiento de la aplicacion.
    // Por ejemplo, se podria usar una libreria como `axios-cache-adapter` o implementar un cache manualmente.
    // Esto es util para evitar peticiones innecesarias y mejorar la experiencia del usuario.

    // Tambien se podria implementar un sistema de paginacion para manejar grandes cantidades de datos
    // y evitar cargar todo de una vez, lo que podria causar problemas de rendimiento.

    // Tambien existen librerias como `react-query` o `swr` que facilitan la gestion de datos asincronos
    // y permiten manejar el cache de manera eficiente, ademas de proporcionar funcionalidades como
    // reintentos automáticos, actualizaciones en segundo plano y manejo de errores.

    this.api.interceptors.request.use(
      (config) => {
        const token = authService.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Interceptor para manejar respuestas
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Token expirado o inválido
          authService.removeToken();
          window.location.reload();
        }
        return Promise.reject(error);
      }
    );
  }

  async getPokemonList(limit = 2000, offset = 0): Promise<PokemonListResponse> {
    const response = await this.api.get(
      `/pokemon?limit=${limit}&offset=${offset}`
    );
    return response.data;
  }

  async getSpeciesList(limit = 500): Promise<NamedAPIResourceList> {
    const response = await this.api.get(`/pokemon-species?limit=${limit}`);
    return response.data;
  }

  async getTypesList(): Promise<NamedAPIResourceList> {
    const response = await this.api.get(`/type`);
    return response.data;
  }

  async getAbilitiesList(limit = 300): Promise<NamedAPIResourceList> {
    const response = await this.api.get(`/ability?limit=${limit}`);
    return response.data;
  }

  async getMovesList(limit = 500): Promise<NamedAPIResourceList> {
    const response = await this.api.get(`/move?limit=${limit}`);
    return response.data;
  }

  async getItemsList(limit = 300): Promise<NamedAPIResourceList> {
    const response = await this.api.get(`/item?limit=${limit}`);
    return response.data;
  }

  makeMappedList(
    list: ResourceList,
    type: "pokemon" | "species" | "type" | "ability" | "move" | "item",
    descriptionTemplate: (name: string, index: number) => string
  ) {
    return list.results.map((item, index) => ({
      id: `${type}-${index + 1}`,
      name: item.name,
      url: item.url,
      type,
      description: descriptionTemplate(item.name, index),
    }));
  }

  // Método para obtener 2000+ elementos combinando diferentes endpoints
  async getLargeDataset() {
    try {
      const [
        pokemonList,
        speciesList,
        typesList,
        abilitiesList,
        movesList,
        itemsList,
      ] = await Promise.all([
        this.getPokemonList(1200, 0), // Aumentar de 1000 a 1300
        this.getSpeciesList(600), // Aumentar de 500 a 600
        this.getTypesList(),
        this.getAbilitiesList(400), // Aumentar de 300 a 400
        this.getMovesList(500), // Nuevo endpoint
        this.getItemsList(300), // Nuevo endpoint
      ]);

      //Combino las listas para tener mas de
      const combinedData = [
        ...this.makeMappedList(
          pokemonList,
          "pokemon",
          (name, index) => `Pokémon #${index + 1}: ${name}`
        ),
        ...this.makeMappedList(
          speciesList,
          "species",
          (name) => `Especie de Pokémon: ${name}`
        ),
        ...this.makeMappedList(
          typesList,
          "type",
          (name) => `Tipo de Pokémon: ${name}`
        ),
        ...this.makeMappedList(
          abilitiesList,
          "ability",
          (name) => `Habilidad: ${name}`
        ),
        ...this.makeMappedList(
          movesList,
          "move",
          (name) => `Movimiento: ${name}`
        ),
        ...this.makeMappedList(itemsList, "item", (name) => `Objeto: ${name}`),
      ];

      console.log(`Total de elementos cargados: ${combinedData.length}`);
      return combinedData; // Remover el .slice(0, 2000) para mostrar todos
    } catch (error) {
      console.error("Error fetching Pokemon dataset:", error);
      throw error;
    }
  }
}

export const apiService = new ApiService();

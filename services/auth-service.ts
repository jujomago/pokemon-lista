import { LoginResponse } from "./interfaces";

class AuthService {
  private readonly TOKEN_KEY = "auth_token";

  async login(email: string, password: string): Promise<LoginResponse> {
    // Simular llamada a API con delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Fake login - acepta cualquier email/password
    if (email && password) {
      const fakeToken = `fake_token_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;
      const user = {
        id: "1",
        email: email,
        name: email.split("@")[0],
      };

      return {
        success: true,
        token: fakeToken,
        user,
      };
    }

    throw new Error("Invalid credentials");
  }

  setToken(token: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  getToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  removeToken(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(this.TOKEN_KEY);
    }
  }

  getUserFromToken(token: string) {
    // En una app real, se decofificaría el token JWT para extraer los datos del usuario
    console.log("Decoding token:", token);
    // Aquí simulamos extraer datos del token
    return {
      id: "1",
      email: "user@example.com",
      name: "User",
    };
  }
}

export const authService = new AuthService();

export interface DataItem {
  id: string;
  name: string;
  url: string;
  type: "pokemon" | "species" | "type" | "ability" | "move" | "item";
  description: string;
}
export interface VirtualizedListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  itemHeight: number;
  containerHeight: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

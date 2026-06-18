export interface Agent {
  id: string;
  name: string;
  role: string;
  description: string;
  icon: string;
  color: string;
  status: "active" | "idle";
  lastActivity: string;
  specialty: string[];
  currentTask: string;
  avatarAnimal: string;
  avatarSymbol: string;
}

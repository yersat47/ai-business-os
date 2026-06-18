import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Department, Employee } from "@/lib/types/employee.types";
import type { UserRole } from "@/lib/types/company.types";
import {
  DEFAULT_DEPARTMENTS,
  mockEmployees,
} from "@/lib/mock/employees.mock";
import { enrichEmployeeWithAI } from "@/lib/utils/ai-assignment";
import { generateAccessCode } from "@/lib/utils/employee-helpers";

interface EmployeesState {
  employees: Employee[];
  departments: Department[];
  addEmployee: (data: {
    name: string;
    jobTitle: string;
    department: string;
    systemRole: UserRole;
    phone?: string;
    email?: string;
  }) => void;
  updateEmployee: (id: string, data: Partial<Employee>) => void;
  deactivateEmployee: (id: string) => void;
  regenerateCode: (id: string) => void;
  addDepartment: (name: string) => string;
  renameDepartment: (id: string, name: string) => void;
  removeDepartment: (id: string) => void;
  getOwner: () => Employee | undefined;
  getDepartmentsWithEmployees: () => Array<Department & { employees: Employee[] }>;
}

function withAI(employee: Employee, businessType?: string): Employee {
  return enrichEmployeeWithAI(employee, businessType);
}

export const useEmployeesStore = create<EmployeesState>()(
  persist(
    (set, get) => ({
      employees: mockEmployees,
      departments: DEFAULT_DEPARTMENTS,

      addEmployee: (data) => {
        const employee = withAI({
          id: String(Date.now()),
          name: data.name,
          jobTitle: data.jobTitle,
          department: data.department,
          systemRole: data.systemRole,
          phone: data.phone,
          email: data.email,
          accessCode: generateAccessCode(),
          isActive: true,
          hasAI: false,
          aiAgentName: null,
        });
        set((state) => ({ employees: [...state.employees, employee] }));
      },

      updateEmployee: (id, data) => {
        set((state) => ({
          employees: state.employees.map((emp) => {
            if (emp.id !== id) return emp;
            const updated = { ...emp, ...data };
            return withAI(updated);
          }),
        }));
      },

      deactivateEmployee: (id) => {
        get().updateEmployee(id, { isActive: false });
      },

      regenerateCode: (id) => {
        get().updateEmployee(id, { accessCode: generateAccessCode() });
      },

      addDepartment: (name) => {
        const id = `dept-${Date.now()}`;
        set((state) => ({
          departments: [
            ...state.departments,
            { id, nameKey: "custom", customName: name },
          ],
        }));
        return id;
      },

      renameDepartment: (id, name) => {
        set((state) => ({
          departments: state.departments.map((dept) =>
            dept.id === id ? { ...dept, customName: name } : dept
          ),
        }));
      },

      removeDepartment: (id) => {
        if (id === "management") return;
        set((state) => ({
          departments: state.departments.filter((d) => d.id !== id),
          employees: state.employees.map((emp) =>
            emp.department === id
              ? { ...emp, department: "operations" }
              : emp
          ),
        }));
      },

      getOwner: () => get().employees.find((e) => e.systemRole === "owner"),

      getDepartmentsWithEmployees: () => {
        const { departments, employees } = get();
        const active = employees.filter((e) => e.systemRole !== "owner");
        return departments.map((dept) => ({
          ...dept,
          employees: active.filter((e) => e.department === dept.id && e.isActive),
        }));
      },
    }),
    { name: "ai-bos-employees" }
  )
);

"use client";

import React, { useEffect } from "react";
import { create } from "zustand";
import { toast } from "sonner";
import { fetchOperatorByEmpId } from "@/lib/api/minpop";
import { validateEmployeeId } from "@/lib/validators/minpop";

interface Operator {
  empId: string;
  name: string;
}

interface AuthState {
  operator: Operator | null;
  isLoading: boolean;
  login: (empId: string) => Promise<boolean>;
  logout: () => void;
  initialize: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  operator: null,
  isLoading: false,

  login: async (empId: string) => {
    const validation = validateEmployeeId(empId);
    if (!validation.valid) {
      toast.error("Validation Error", { description: validation.message });
      return false;
    }

    set({ isLoading: true });
    try {
      const data = await fetchOperatorByEmpId(empId.trim());
      if (data && data.length > 0) {
        const record = data[0];
        const nameVal = record.P_EMPNAME || record.OPERATOR_NAME || `Operator ${empId.trim()}`;
        
        const newOperator = {
          empId: (record.OPERATOR_CODE as string) || empId.trim(),
          name: String(nameVal),
        };
        
        set({ operator: newOperator });
        localStorage.setItem("iws_operator", JSON.stringify(newOperator));
        
        toast.success(`Welcome, ${newOperator.name}`);
        return true;
      } else {
        toast.error("Not Found", { description: `Operator code ${empId} not found.` });
        return false;
      }
    } catch (error: any) {
      toast.error("Error", { description: error.message || "Failed to login." });
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    set({ operator: null });
    localStorage.removeItem("iws_operator");
    toast.info("Logged out successfully");
  },

  initialize: () => {
    const saved = localStorage.getItem("iws_operator");
    if (saved) {
      try {
        set({ operator: JSON.parse(saved) });
      } catch (e) {
        console.error("Failed to parse saved operator");
      }
    }
  }
}));

// Provide a dummy AuthProvider for backward compatibility in layout.tsx
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const initialize = useAuth((state) => state.initialize);
  
  useEffect(() => {
    initialize();
  }, [initialize]);

  return <>{children}</>;
}

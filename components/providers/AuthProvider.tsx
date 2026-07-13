"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { fetchOperatorByEmpId } from "@/lib/api/minpop";
import { validateEmployeeId } from "@/lib/validators/minpop";

interface Operator {
  empId: string;
  name: string;
}

interface AuthContextType {
  operator: Operator | null;
  login: (empId: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [operator, setOperator] = useState<Operator | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("iws_operator");
    if (saved) {
      try {
        setOperator(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved operator");
      }
    }
  }, []);

  const login = async (empId: string): Promise<boolean> => {
    const validation = validateEmployeeId(empId);
    if (!validation.valid) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: validation.message,
        confirmButtonColor: "#2563EB",
      });
      return false;
    }

    setIsLoading(true);
    try {
      const data = await fetchOperatorByEmpId(empId.trim());
      if (data && data.length > 0) {
        // Find the operator record
        const record = data[0];
        
        // Handle IWS Schema P_EMPNAME, fallback to OPERATOR_NAME or generic
        const nameVal = record.P_EMPNAME || record.OPERATOR_NAME || `Operator ${empId.trim()}`;
        
        const newOperator = {
          empId: (record.OPERATOR_CODE as string) || empId.trim(),
          name: String(nameVal),
        };
        setOperator(newOperator);
        localStorage.setItem("iws_operator", JSON.stringify(newOperator));
        
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: `Welcome, ${newOperator.name}`,
          timer: 1500,
          showConfirmButton: false,
        });
        return true;
      } else {
        Swal.fire({
          icon: "error",
          title: "Not Found",
          text: `Operator code ${empId} not found.`,
          confirmButtonColor: "#2563EB",
        });
        return false;
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Failed to login.",
        confirmButtonColor: "#2563EB",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setOperator(null);
    localStorage.removeItem("iws_operator");
  };

  return (
    <AuthContext.Provider value={{ operator, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

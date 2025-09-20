"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  image?: string
  phone?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  // Load user from localStorage on initial render
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser)
        setUser(parsedUser)
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error)
      }
    }
  }, [])

  const login = async (email: string, password: string) => {
    // In a real app, this would make an API call to authenticate
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Mock successful login
        if (email && password) {
          const newUser: User = {
            id: "user-1",
            name: "Mbappe",
            email: email,
            image: "",
          }

          setUser(newUser)
          localStorage.setItem("user", JSON.stringify(newUser))
          resolve()
        } else {
          reject(new Error("Invalid credentials"))
        }
      }, 1000)
    })
  }

  const register = async (name: string, email: string, password: string) => {
    // In a real app, this would make an API call to register
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Mock successful registration
        if (name && email && password) {
          const newUser: User = {
            id: `user-${Date.now()}`,
            name,
            email,
            image: "",
          }

          setUser(newUser)
          localStorage.setItem("user", JSON.stringify(newUser))
          resolve()
        } else {
          reject(new Error("Invalid registration data"))
        }
      }, 1000)
    })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)


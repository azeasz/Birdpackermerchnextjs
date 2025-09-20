"use client"

import type React from "react"

import { useAuth } from "@/components/providers/auth-provider"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { User, Package, CreditCard, LogOut } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  })

  const [isUpdating, setIsUpdating] = useState(false)

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdating(true)

    // Simulate profile update
    setTimeout(() => {
      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully.",
      })
      setIsUpdating(false)
    }, 1000)
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (!user) {
    router.push("/login")
    return null
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <Card className="p-6">
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <User className="h-12 w-12 text-primary" />
              </div>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
            </div>

            <Separator className="my-4" />

            <nav className="space-y-2">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/profile">
                  <User className="mr-2 h-5 w-5" />
                  Profile
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/profile/orders">
                  <Package className="mr-2 h-5 w-5" />
                  Orders
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/profile/payment-methods">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Payment Methods
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-5 w-5" />
                Logout
              </Button>
            </nav>
          </Card>
        </div>

        <div className="md:col-span-3">
          <Card className="p-6">
            <Tabs defaultValue="personal">
              <TabsList className="mb-6">
                <TabsTrigger value="personal">Personal Information</TabsTrigger>
                <TabsTrigger value="address">Addresses</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <h3 className="text-xl font-bold mb-4">Personal Information</h3>
                <form onSubmit={handleProfileUpdate}>
                  <div className="grid grid-cols-1 gap-4 mb-6">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <Button type="submit" disabled={isUpdating}>
                    {isUpdating ? "Updating..." : "Update Profile"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="address">
                <h3 className="text-xl font-bold mb-4">Your Addresses</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <Card className="p-4 border-2 border-primary">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Default Address</span>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-500">
                          Delete
                        </Button>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p>123 Batu</p>
                      <p>Apt 4B</p>
                      <p>Batu, Ngalam</p>
                      <p>Indo</p>
                      <p>Phone: {user.phone || "(555) 123-4567"}</p>
                    </div>
                  </Card>

                  <Card className="p-4 border-dashed border-2 flex items-center justify-center">
                    <Button variant="ghost">+ Add New Address</Button>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="password">
                <h3 className="text-xl font-bold mb-4">Change Password</h3>
                <form>
                  <div className="grid grid-cols-1 gap-4 mb-6">
                    <div>
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>

                    <div>
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>

                    <div>
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>

                  <Button type="submit">Change Password</Button>
                </form>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </main>
  )
}


import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface RegisterPageProps {
  onRegister: () => void;
}

export function RegisterPage({ onRegister }: RegisterPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // In a real app, you would have actual registration logic here
    if (email && password) {
      onRegister();
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <div
      className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[calc(100vh-10rem)] bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506126613408-4e63a4b095e5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
      data-oid="gxc4lvh"
    >
      <Card
        className="w-full max-w-sm bg-white/80 backdrop-blur-sm"
        data-oid="6pyd_vv"
      >
        <CardHeader data-oid="bv74ovc">
          <CardTitle data-oid="st_pu2m">Register</CardTitle>
        </CardHeader>
        <CardContent data-oid="zxdut.n">
          <div className="space-y-4" data-oid="b0n0a3l">
            <div className="space-y-2" data-oid="vje6jqo">
              <Label htmlFor="email" data-oid="fp7mtza">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-oid="zs9.f8-"
              />
            </div>
            <div className="space-y-2" data-oid="ivf1nau">
              <Label htmlFor="password" data-oid="ur5rro0">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                data-oid="24p5:ix"
              />
            </div>
            <div className="space-y-2" data-oid="l1bihqn">
              <Label htmlFor="confirm-password" data-oid="jo_j-a:">
                Confirm Password
              </Label>
              <Input
                id="confirm-password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                data-oid="kee9ng:"
              />
            </div>
            <Button
              onClick={handleRegister}
              className="w-full"
              data-oid="o929iet"
            >
              Register
            </Button>
            <div className="text-center text-sm" data-oid="ohtjgl6">
              Already have an account?{" "}
              <Link to="/login" className="underline" data-oid="5k-3kio">
                Login
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

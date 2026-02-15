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
      data-oid="1a-cyk-"
    >
      <Card
        className="w-full max-w-sm bg-white/80 backdrop-blur-sm"
        data-oid="3cl418k"
      >
        <CardHeader data-oid="5u4e7m8">
          <CardTitle data-oid="_rn4599">Register</CardTitle>
        </CardHeader>
        <CardContent data-oid="9g39.tp">
          <div className="space-y-4" data-oid="7_ev_hx">
            <div className="space-y-2" data-oid="m-_8lop">
              <Label htmlFor="email" data-oid="-_xtgy-">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-oid="i0ucp5b"
              />
            </div>
            <div className="space-y-2" data-oid=".xodhul">
              <Label htmlFor="password" data-oid="-p2n_2q">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                data-oid="18j:aub"
              />
            </div>
            <div className="space-y-2" data-oid="lftn6m.">
              <Label htmlFor="confirm-password" data-oid="f6.c8gi">
                Confirm Password
              </Label>
              <Input
                id="confirm-password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                data-oid="j8_iru3"
              />
            </div>
            <Button
              onClick={handleRegister}
              className="w-full"
              data-oid="3p.0m06"
            >
              Register
            </Button>
            <div className="text-center text-sm" data-oid="vm2r45i">
              Already have an account?{" "}
              <Link to="/login" className="underline" data-oid="5bjxqy:">
                Login
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

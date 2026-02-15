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
      data-oid="s10o7iz"
    >
      <Card
        className="w-full max-w-sm bg-white/80 backdrop-blur-sm"
        data-oid="44k_reo"
      >
        <CardHeader data-oid="7cxrsns">
          <CardTitle data-oid="wmj52nx">Register</CardTitle>
        </CardHeader>
        <CardContent data-oid="ecxwwaq">
          <div className="space-y-4" data-oid="bqlj179">
            <div className="space-y-2" data-oid="xhigx_b">
              <Label htmlFor="email" data-oid=".kjn.6s">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-oid="6x1qfxz"
              />
            </div>
            <div className="space-y-2" data-oid="f2_67a:">
              <Label htmlFor="password" data-oid="f8_w5ez">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                data-oid="hfo6lff"
              />
            </div>
            <div className="space-y-2" data-oid="jg1x.ll">
              <Label htmlFor="confirm-password" data-oid="fx.zia4">
                Confirm Password
              </Label>
              <Input
                id="confirm-password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                data-oid="c7qj0m5"
              />
            </div>
            <Button
              onClick={handleRegister}
              className="w-full"
              data-oid="e:5vmmn"
            >
              Register
            </Button>
            <div className="text-center text-sm" data-oid="4y65yu.">
              Already have an account?{" "}
              <Link to="/login" className="underline" data-oid="_-ps09q">
                Login
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

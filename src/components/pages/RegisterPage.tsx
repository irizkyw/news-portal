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
      data-oid="dg0bi8m"
    >
      <Card
        className="w-full max-w-sm bg-white/80 backdrop-blur-sm"
        data-oid="nqocvie"
      >
        <CardHeader data-oid="ktsv003">
          <CardTitle data-oid="8cl_4qe">Register</CardTitle>
        </CardHeader>
        <CardContent data-oid="y5j_ar7">
          <div className="space-y-4" data-oid="1fphhj8">
            <div className="space-y-2" data-oid="vhm28p:">
              <Label htmlFor="email" data-oid="-yojsz-">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-oid="gygdq1d"
              />
            </div>
            <div className="space-y-2" data-oid="--9yrvo">
              <Label htmlFor="password" data-oid="vrp.ajc">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                data-oid="peud5_3"
              />
            </div>
            <div className="space-y-2" data-oid="77i049w">
              <Label htmlFor="confirm-password" data-oid="8kpm3b9">
                Confirm Password
              </Label>
              <Input
                id="confirm-password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                data-oid="ib7pryk"
              />
            </div>
            <Button
              onClick={handleRegister}
              className="w-full"
              data-oid="hhbd78a"
            >
              Register
            </Button>
            <div className="text-center text-sm" data-oid="44gam8j">
              Already have an account?{" "}
              <Link to="/login" className="underline" data-oid="0rhe9ot">
                Login
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

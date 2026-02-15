import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // In a real app, you would have actual authentication logic here
    if (email && password) {
      onLogin();
    } else {
      alert("Please enter email and password");
    }
  };

  return (
    <div
      className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[calc(100vh-10rem)] bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506126613408-4e63a4b095e5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
      data-oid="2o2:y4j"
    >
      <Card
        className="w-full max-w-sm bg-white/80 backdrop-blur-sm"
        data-oid="w0j_g02"
      >
        <CardHeader data-oid="a2yll1k">
          <CardTitle data-oid="v6hu7z.">Login</CardTitle>
        </CardHeader>
        <CardContent data-oid="hnuf8ua">
          <div className="space-y-4" data-oid="c_yga24">
            <div className="space-y-2" data-oid="w769tkt">
              <Label htmlFor="email" data-oid="nregii6">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-oid="t.7lp-t"
              />
            </div>
            <div className="space-y-2" data-oid="4_hqtje">
              <Label htmlFor="password" data-oid="ri8i0kz">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                data-oid="97333js"
              />
            </div>
            <Button onClick={handleLogin} className="w-full" data-oid=".1qb.pd">
              Login
            </Button>
            <div className="text-center text-sm" data-oid="ff-ug_6">
              Don't have an account?{" "}
              <Link to="/register" className="underline" data-oid="1j3_fnl">
                Register
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

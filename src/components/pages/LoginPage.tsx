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
      data-oid="r7xpfw3"
    >
      <Card
        className="w-full max-w-sm bg-white/80 backdrop-blur-sm"
        data-oid="qoh06ck"
      >
        <CardHeader data-oid="zlf1jfk">
          <CardTitle data-oid="zkepsth">Login</CardTitle>
        </CardHeader>
        <CardContent data-oid="ur2s3fk">
          <div className="space-y-4" data-oid="e6wik3p">
            <div className="space-y-2" data-oid=":t2-5t5">
              <Label htmlFor="email" data-oid="-tg-vpm">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-oid=".gpx0ek"
              />
            </div>
            <div className="space-y-2" data-oid="7ea00t4">
              <Label htmlFor="password" data-oid="2cnipvu">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                data-oid="on5wtcp"
              />
            </div>
            <Button onClick={handleLogin} className="w-full" data-oid="2c:qv5j">
              Login
            </Button>
            <div className="text-center text-sm" data-oid="-5zgj.1">
              Don't have an account?{" "}
              <Link to="/register" className="underline" data-oid="n0u9m2g">
                Register
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

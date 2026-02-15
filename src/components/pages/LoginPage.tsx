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
      data-oid="kkfipgb"
    >
      <Card
        className="w-full max-w-sm bg-white/80 backdrop-blur-sm"
        data-oid="_npj_j6"
      >
        <CardHeader data-oid="i_ob_rn">
          <CardTitle data-oid="-d9u_1g">Login</CardTitle>
        </CardHeader>
        <CardContent data-oid="bh5o45m">
          <div className="space-y-4" data-oid="v0d9p_5">
            <div className="space-y-2" data-oid="dhon5lf">
              <Label htmlFor="email" data-oid="laya_lo">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-oid="une:1-s"
              />
            </div>
            <div className="space-y-2" data-oid="o5gnhuw">
              <Label htmlFor="password" data-oid="6q48ad.">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                data-oid=".1qbj2i"
              />
            </div>
            <Button onClick={handleLogin} className="w-full" data-oid="btvuf_t">
              Login
            </Button>
            <div className="text-center text-sm" data-oid="mgzxzdg">
              Don't have an account?{" "}
              <Link to="/register" className="underline" data-oid=".i:-hu_">
                Register
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

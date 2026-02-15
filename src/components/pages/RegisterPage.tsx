import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-sm">
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

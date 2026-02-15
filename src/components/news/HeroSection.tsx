import React from "react";
import { Button } from "../ui/button";

export function HeroSection() {
  return (
    <section className="relative bg-cover bg-center h-[500px] flex items-center justify-center text-white" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517646698188-e24c2ed5512b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center space-y-4">
        <h1 className="text-5xl font-bold">Discover the Latest News</h1>
        <p className="text-xl">Stay informed with in-depth articles and breaking stories.</p>
        <Button size="lg" className="bg-primary hover:bg-primary-dark text-white">Read More</Button>
      </div>
    </section>
  );
}

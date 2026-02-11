import React from "react";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t" data-oid="tamcus4">
      <div className="container mx-auto px-4 py-12" data-oid="pr90fhg">
        <div
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          data-oid="yym::i:"
        >
          {/* Brand */}
          <div className="space-y-4" data-oid="9dhdy85">
            <div className="flex items-center space-x-2" data-oid="paiqlo3">
              <div
                className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center"
                data-oid="fviy6:n"
              >
                <span
                  className="text-primary-foreground font-bold text-lg"
                  data-oid="r1:bo3b"
                >
                  N
                </span>
              </div>
              <span className="font-bold text-xl" data-oid="-1vjj81">
                NewsFlow
              </span>
            </div>
            <p className="text-sm text-muted-foreground" data-oid="s2y98z3">
              Your trusted source for breaking news, in-depth analysis, and
              compelling stories from around the world.
            </p>
            <div className="flex space-x-2" data-oid="3o9_svl">
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0"
                data-oid=":02z0pu"
              >
                <Facebook className="h-4 w-4" data-oid="biqn_ma" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0"
                data-oid="u9ykaig"
              >
                <Twitter className="h-4 w-4" data-oid="l9gu30b" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0"
                data-oid="9h:52iq"
              >
                <Instagram className="h-4 w-4" data-oid=".j38d3." />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0"
                data-oid="_.08e9c"
              >
                <Linkedin className="h-4 w-4" data-oid="nudgggz" />
              </Button>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4" data-oid="asychcr">
            <h3 className="font-semibold" data-oid="vxv8f65">
              Categories
            </h3>
            <ul className="space-y-2 text-sm" data-oid="w1tng7u">
              <li data-oid="isp-xx7">
                <a
                  href="/category/politics"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="8x6x7ua"
                >
                  Politics
                </a>
              </li>
              <li data-oid="nwma_83">
                <a
                  href="/category/tech"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="lm6_1mz"
                >
                  Technology
                </a>
              </li>
              <li data-oid="0s7ace1">
                <a
                  href="/category/sports"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="gb.dc9f"
                >
                  Sports
                </a>
              </li>
              <li data-oid="i-twzot">
                <a
                  href="/category/lifestyle"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="1du1m83"
                >
                  Lifestyle
                </a>
              </li>
              <li data-oid="-shl7:2">
                <a
                  href="/category/business"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="_n0g4jq"
                >
                  Business
                </a>
              </li>
              <li data-oid="0-73mrb">
                <a
                  href="/category/health"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="-ytgrt7"
                >
                  Health
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4" data-oid="f509-hq">
            <h3 className="font-semibold" data-oid="hd4_p07">
              Company
            </h3>
            <ul className="space-y-2 text-sm" data-oid="imi0yyt">
              <li data-oid="-tott9s">
                <a
                  href="/about"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="0zeacpb"
                >
                  About Us
                </a>
              </li>
              <li data-oid="2nd5xff">
                <a
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid=":p:w58s"
                >
                  Contact
                </a>
              </li>
              <li data-oid="sxra08p">
                <a
                  href="/careers"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="jr.6qlq"
                >
                  Careers
                </a>
              </li>
              <li data-oid="qj:splj">
                <a
                  href="/privacy"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="slj4fih"
                >
                  Privacy Policy
                </a>
              </li>
              <li data-oid="en5n9dg">
                <a
                  href="/terms"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="s7j878k"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4" data-oid="iw73mti">
            <h3 className="font-semibold" data-oid="pkc7lxq">
              Newsletter
            </h3>
            <p className="text-sm text-muted-foreground" data-oid="s0-ra.w">
              Stay updated with our latest news and articles.
            </p>
            <div className="flex space-x-2" data-oid="xktv:7g">
              <Input
                placeholder="Enter your email"
                className="flex-1"
                data-oid="t9:pwhn"
              />

              <Button size="sm" data-oid="gn0puqn">
                <Mail className="h-4 w-4" data-oid="rt0ipxb" />
              </Button>
            </div>
          </div>
        </div>

        <div
          className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground"
          data-oid="pfi01.y"
        >
          <p data-oid="t04he2e">&copy; 2024 NewsFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

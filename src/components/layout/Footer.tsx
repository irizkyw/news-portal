import React from "react";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t" data-oid="4au2au2">
      <div className="container mx-auto px-4 py-12" data-oid="g1lhyz3">
        <div
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          data-oid="ez:284j"
        >
          {/* Brand */}
          <div className="space-y-4" data-oid="wy.k35x">
            <div className="flex items-center space-x-2" data-oid="7zjdcay">
              <div
                className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center"
                data-oid="5tkmt_t"
              >
                <span
                  className="text-primary-foreground font-bold text-lg"
                  data-oid="2a.j3d5"
                >
                  N
                </span>
              </div>
              <span className="font-bold text-xl" data-oid="kh_ayn2">
                NewsFlow
              </span>
            </div>
            <p className="text-sm text-muted-foreground" data-oid="dn_-0tz">
              Your trusted source for breaking news, in-depth analysis, and
              compelling stories from around the world.
            </p>
            <div className="flex space-x-2" data-oid="3c:wn9i">
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0"
                data-oid="an_rw1x"
              >
                <Facebook className="h-4 w-4" data-oid="o:njwlb" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0"
                data-oid="a-5fo5w"
              >
                <Twitter className="h-4 w-4" data-oid="1verjrf" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0"
                data-oid="2q9j800"
              >
                <Instagram className="h-4 w-4" data-oid="1npw87x" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0"
                data-oid="jh1j9s9"
              >
                <Linkedin className="h-4 w-4" data-oid="ya3h8qz" />
              </Button>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4" data-oid="r86pwid">
            <h3 className="font-semibold" data-oid="k01ge-y">
              Categories
            </h3>
            <ul className="space-y-2 text-sm" data-oid="r-w434n">
              <li data-oid="vrb4yr0">
                <a
                  href="/category/politics"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="rlqqut-"
                >
                  Politics
                </a>
              </li>
              <li data-oid="99l_pzc">
                <a
                  href="/category/tech"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="v_ph.h7"
                >
                  Technology
                </a>
              </li>
              <li data-oid="0.e:cyy">
                <a
                  href="/category/sports"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="13j:6l8"
                >
                  Sports
                </a>
              </li>
              <li data-oid="gvrqwn-">
                <a
                  href="/category/lifestyle"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="pg99bpt"
                >
                  Lifestyle
                </a>
              </li>
              <li data-oid="hg6xggs">
                <a
                  href="/category/business"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="dg8t6s6"
                >
                  Business
                </a>
              </li>
              <li data-oid="wkwrb56">
                <a
                  href="/category/health"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="l0--287"
                >
                  Health
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4" data-oid="9z9mh7r">
            <h3 className="font-semibold" data-oid="y:gthh2">
              Company
            </h3>
            <ul className="space-y-2 text-sm" data-oid="ksnozz:">
              <li data-oid="rrdnn7u">
                <a
                  href="/about"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="7qksqwq"
                >
                  About Us
                </a>
              </li>
              <li data-oid="ixq_hwr">
                <a
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="eu8hn.k"
                >
                  Contact
                </a>
              </li>
              <li data-oid="jl02:w5">
                <a
                  href="/careers"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="j-f3ibw"
                >
                  Careers
                </a>
              </li>
              <li data-oid="pflq_:s">
                <a
                  href="/privacy"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="joyhyx0"
                >
                  Privacy Policy
                </a>
              </li>
              <li data-oid="w2rsuad">
                <a
                  href="/terms"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="1w60ro7"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4" data-oid="tko8eu1">
            <h3 className="font-semibold" data-oid="1.6b-6p">
              Newsletter
            </h3>
            <p className="text-sm text-muted-foreground" data-oid=":z.doc1">
              Stay updated with our latest news and articles.
            </p>
            <div className="flex space-x-2" data-oid="k5btzbw">
              <Input
                placeholder="Enter your email"
                className="flex-1"
                data-oid="gvt9wyh"
              />

              <Button size="sm" data-oid="zznny4x">
                <Mail className="h-4 w-4" data-oid="m6znet-" />
              </Button>
            </div>
          </div>
        </div>

        <div
          className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground"
          data-oid="bryrmgm"
        >
          <p data-oid="34mq9lc">&copy; 2024 NewsFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

import React from "react";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t" data-oid="k2oa937">
      <div className="container mx-auto px-4 py-12" data-oid="n3i22xm">
        <div
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          data-oid="a-_.:kd"
        >
          {/* Brand */}
          <div className="space-y-4" data-oid="cnmh-jb">
            <div className="flex items-center space-x-2" data-oid="91g.rof">
              <div
                className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center"
                data-oid="m9f9ein"
              >
                <span
                  className="text-primary-foreground font-bold text-lg"
                  data-oid="7uh7523"
                >
                  N
                </span>
              </div>
              <span className="font-bold text-xl" data-oid="9ood1u3">
                NewsFlow
              </span>
            </div>
            <p className="text-sm text-muted-foreground" data-oid="ncxejt2">
              Your trusted source for breaking news, in-depth analysis, and
              compelling stories from around the world.
            </p>
            <div className="flex space-x-2" data-oid="qgyia_l">
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0"
                data-oid=":l8lvz6"
              >
                <Facebook className="h-4 w-4" data-oid="-hbuo2l" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0"
                data-oid="gek3fy5"
              >
                <Twitter className="h-4 w-4" data-oid="t9ef6p:" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0"
                data-oid=":ontdot"
              >
                <Instagram className="h-4 w-4" data-oid="..4ok_e" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0"
                data-oid="sy584xa"
              >
                <Linkedin className="h-4 w-4" data-oid="ts4hoti" />
              </Button>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4" data-oid="-zaxo18">
            <h3 className="font-semibold" data-oid="9qu-qlm">
              Categories
            </h3>
            <ul className="space-y-2 text-sm" data-oid="xprc:b.">
              <li data-oid="voinrvt">
                <a
                  href="/category/politics"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="7fp-iok"
                >
                  Politics
                </a>
              </li>
              <li data-oid="0trdi56">
                <a
                  href="/category/tech"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="_1.y:4s"
                >
                  Technology
                </a>
              </li>
              <li data-oid="bpzo5wj">
                <a
                  href="/category/sports"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="4je2-8."
                >
                  Sports
                </a>
              </li>
              <li data-oid="iros0_x">
                <a
                  href="/category/lifestyle"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid=":b5dhuz"
                >
                  Lifestyle
                </a>
              </li>
              <li data-oid="acx7oq_">
                <a
                  href="/category/business"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="4e_niww"
                >
                  Business
                </a>
              </li>
              <li data-oid="eq2v3ra">
                <a
                  href="/category/health"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="x_o4am9"
                >
                  Health
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4" data-oid="4qd1y.u">
            <h3 className="font-semibold" data-oid="7-jxkpk">
              Company
            </h3>
            <ul className="space-y-2 text-sm" data-oid="1cx45ui">
              <li data-oid="qx01cqr">
                <a
                  href="/about"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="ewoah3q"
                >
                  About Us
                </a>
              </li>
              <li data-oid="zt0.tyo">
                <a
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="18_ht15"
                >
                  Contact
                </a>
              </li>
              <li data-oid="udo2gii">
                <a
                  href="/careers"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="u4:9-in"
                >
                  Careers
                </a>
              </li>
              <li data-oid="o9b7bjv">
                <a
                  href="/privacy"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="_1aruke"
                >
                  Privacy Policy
                </a>
              </li>
              <li data-oid="56.2hip">
                <a
                  href="/terms"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="p0sn05g"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4" data-oid="cetvmcv">
            <h3 className="font-semibold" data-oid="n9f8cre">
              Newsletter
            </h3>
            <p className="text-sm text-muted-foreground" data-oid=":yenilj">
              Stay updated with our latest news and articles.
            </p>
            <div className="flex space-x-2" data-oid="detcmi8">
              <Input
                placeholder="Enter your email"
                className="flex-1"
                data-oid="14r3sfg"
              />

              <Button size="sm" data-oid="px60.:z">
                <Mail className="h-4 w-4" data-oid="flq-:zx" />
              </Button>
            </div>
          </div>
        </div>

        <div
          className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground"
          data-oid="64a0tu1"
        >
          <p data-oid="mr8n5_m">&copy; 2024 NewsFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

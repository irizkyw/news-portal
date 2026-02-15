import React from "react";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t" data-oid="oz1k:0y">
      <div className="container mx-auto px-4 py-12" data-oid="59li4mp">
        <div
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          data-oid="xgi5vb0"
        >
          {/* Brand */}
          <div className="space-y-4" data-oid="8e35s5s">
            <div className="flex items-center space-x-2" data-oid="nqfm1fv">
              <div
                className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center"
                data-oid="2f2r.0k"
              >
                <span
                  className="text-primary-foreground font-bold text-lg"
                  data-oid="f80giv5"
                >
                  N
                </span>
              </div>
              <span className="font-bold text-xl" data-oid="nidg8c:">
                NewsFlow
              </span>
            </div>
            <p className="text-sm text-muted-foreground" data-oid="lzhb:fz">
              Your trusted source for breaking news, in-depth analysis, and
              compelling stories from around the world.
            </p>
            <div className="flex space-x-2" data-oid="q-kuidy">
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0"
                data-oid="d.3vcq."
              >
                <Facebook className="h-4 w-4" data-oid="-n3idna" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0"
                data-oid="ay306qj"
              >
                <Twitter className="h-4 w-4" data-oid="jy95rx-" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0"
                data-oid="iyfqnij"
              >
                <Instagram className="h-4 w-4" data-oid="ojtrz7e" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0"
                data-oid="3enqo8w"
              >
                <Linkedin className="h-4 w-4" data-oid="-7c5327" />
              </Button>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4" data-oid="ot.ggle">
            <h3 className="font-semibold" data-oid="awe-.bg">
              Categories
            </h3>
            <ul className="space-y-2 text-sm" data-oid="w3wgt0f">
              <li data-oid="dq71m_l">
                <a
                  href="/category/politics"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="9bv-jtt"
                >
                  Politics
                </a>
              </li>
              <li data-oid="oulrwzz">
                <a
                  href="/category/tech"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="f36ob.u"
                >
                  Technology
                </a>
              </li>
              <li data-oid="ez4u.qh">
                <a
                  href="/category/sports"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="y3nwfg7"
                >
                  Sports
                </a>
              </li>
              <li data-oid="pvvdv4b">
                <a
                  href="/category/lifestyle"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="gm6clgb"
                >
                  Lifestyle
                </a>
              </li>
              <li data-oid="5t_0s.b">
                <a
                  href="/category/business"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid=":gmxb88"
                >
                  Business
                </a>
              </li>
              <li data-oid="0i0:.td">
                <a
                  href="/category/health"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="6nr38ym"
                >
                  Health
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4" data-oid="ltrih-.">
            <h3 className="font-semibold" data-oid="tezv71w">
              Company
            </h3>
            <ul className="space-y-2 text-sm" data-oid="ra-9:e2">
              <li data-oid="4e:e1l1">
                <a
                  href="/about"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="aoopgu0"
                >
                  About Us
                </a>
              </li>
              <li data-oid="qz3:pb6">
                <a
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="bcc14h7"
                >
                  Contact
                </a>
              </li>
              <li data-oid="k-jq99o">
                <a
                  href="/careers"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="6wk.7rh"
                >
                  Careers
                </a>
              </li>
              <li data-oid="lxf3d::">
                <a
                  href="/privacy"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid=".e548ir"
                >
                  Privacy Policy
                </a>
              </li>
              <li data-oid=".a6_3:a">
                <a
                  href="/terms"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="f94.r0j"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4" data-oid="brf43sg">
            <h3 className="font-semibold" data-oid=":rhj.3m">
              Newsletter
            </h3>
            <p className="text-sm text-muted-foreground" data-oid="i04w_7d">
              Stay updated with our latest news and articles.
            </p>
            <div className="flex space-x-2" data-oid="cya9-i0">
              <Input
                placeholder="Enter your email"
                className="flex-1"
                data-oid="t_wh_la"
              />

              <Button size="sm" data-oid="xa14t1z">
                <Mail className="h-4 w-4" data-oid="i-r0xz6" />
              </Button>
            </div>
          </div>
        </div>

        <div
          className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground"
          data-oid="hd.9dnp"
        >
          <p data-oid="gbp_g2n">&copy; 2024 NewsFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

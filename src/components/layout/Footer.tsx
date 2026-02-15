import React from "react";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t" data-oid="xojl.g7">
      <div className="container mx-auto px-4 py-12" data-oid="zfiheyl">
        <div
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          data-oid="r_3sfjy"
        >
          {/* Brand */}
          <div className="space-y-4" data-oid="lu_wz:q">
            <div className="flex items-center space-x-2" data-oid="7:di72n">
              <div
                className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center"
                data-oid="x_1nh9g"
              >
                <span
                  className="text-primary-foreground font-bold text-lg"
                  data-oid="kcc2gri"
                >
                  N
                </span>
              </div>
              <span className="font-bold text-xl" data-oid="3.0fdre">
                NewsFlow
              </span>
            </div>
            <p className="text-sm text-muted-foreground" data-oid="tlg02gb">
              Your trusted source for breaking news, in-depth analysis, and
              compelling stories from around the world.
            </p>
            <div className="flex space-x-2" data-oid="sm373:k">
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0"
                data-oid="af66n1o"
              >
                <Facebook className="h-4 w-4" data-oid="6hra9fr" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0"
                data-oid="n50imus"
              >
                <Twitter className="h-4 w-4" data-oid="zb7t.le" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0"
                data-oid="1if9dp:"
              >
                <Instagram className="h-4 w-4" data-oid="-_1laj:" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0"
                data-oid="ug-0n84"
              >
                <Linkedin className="h-4 w-4" data-oid="scmey_8" />
              </Button>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4" data-oid="33me59x">
            <h3 className="font-semibold" data-oid="id38ycx">
              Categories
            </h3>
            <ul className="space-y-2 text-sm" data-oid="qzmegiv">
              <li data-oid="bqabg.l">
                <a
                  href="/category/politics"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="xclnxd6"
                >
                  Politics
                </a>
              </li>
              <li data-oid="d0.1u6w">
                <a
                  href="/category/tech"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="c7-:dil"
                >
                  Technology
                </a>
              </li>
              <li data-oid="g8m817u">
                <a
                  href="/category/sports"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="b7fn0y3"
                >
                  Sports
                </a>
              </li>
              <li data-oid="p::v.pb">
                <a
                  href="/category/lifestyle"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid=":b2cbs3"
                >
                  Lifestyle
                </a>
              </li>
              <li data-oid="z.wf69o">
                <a
                  href="/category/business"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="s56jjka"
                >
                  Business
                </a>
              </li>
              <li data-oid="z093vrb">
                <a
                  href="/category/health"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="xz4m48y"
                >
                  Health
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4" data-oid="ssq97lz">
            <h3 className="font-semibold" data-oid="9bo:geg">
              Company
            </h3>
            <ul className="space-y-2 text-sm" data-oid="0nn:udd">
              <li data-oid="kcq3wof">
                <a
                  href="/about"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="5tzm1_q"
                >
                  About Us
                </a>
              </li>
              <li data-oid="pocz7ql">
                <a
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="4m6rqjc"
                >
                  Contact
                </a>
              </li>
              <li data-oid="x144i-.">
                <a
                  href="/careers"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="rfcsmkn"
                >
                  Careers
                </a>
              </li>
              <li data-oid="i-pu98q">
                <a
                  href="/privacy"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="_4zyu.v"
                >
                  Privacy Policy
                </a>
              </li>
              <li data-oid="m90-jwv">
                <a
                  href="/terms"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="8h1_c_0"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4" data-oid="vtf1ask">
            <h3 className="font-semibold" data-oid="ywmiuo9">
              Newsletter
            </h3>
            <p className="text-sm text-muted-foreground" data-oid="6d8jsnr">
              Stay updated with our latest news and articles.
            </p>
            <div className="flex space-x-2" data-oid="2ficqqb">
              <Input
                placeholder="Enter your email"
                className="flex-1"
                data-oid="8h2vear"
              />

              <Button size="sm" data-oid="_8otmtn">
                <Mail className="h-4 w-4" data-oid="2_ezuko" />
              </Button>
            </div>
          </div>
        </div>

        <div
          className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground"
          data-oid="5m38av:"
        >
          <p data-oid="lsrct3y">&copy; 2024 NewsFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

import React from "react";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t" data-oid="ibm8u5y">
      <div className="container mx-auto px-4 py-12" data-oid="hvrur24">
        <div
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          data-oid="3gc_jnv"
        >
          {/* Brand */}
          <div className="space-y-4" data-oid="pzhahp3">
            <div className="flex items-center space-x-2" data-oid=".grc9sc">
              <div
                className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center"
                data-oid=".bxyd7."
              >
                <span
                  className="text-primary-foreground font-bold text-lg"
                  data-oid="rqrhxw7"
                >
                  N
                </span>
              </div>
              <span className="font-bold text-xl" data-oid="_k5i.7c">
                NewsFlow
              </span>
            </div>
            <p className="text-sm text-muted-foreground" data-oid="pcd6x3s">
              Your trusted source for breaking news, in-depth analysis, and
              compelling stories from around the world.
            </p>
            <div className="flex space-x-2" data-oid="81ngkr9">
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0"
                data-oid="wak1ujq"
              >
                <Facebook className="h-4 w-4" data-oid="jz-rltr" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0"
                data-oid="l.l5pn8"
              >
                <Twitter className="h-4 w-4" data-oid="yk9z_cu" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0"
                data-oid="dtlmeei"
              >
                <Instagram className="h-4 w-4" data-oid=":1hp970" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0"
                data-oid="_lyr9uu"
              >
                <Linkedin className="h-4 w-4" data-oid="3:ulhck" />
              </Button>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4" data-oid="jjrhq.6">
            <h3 className="font-semibold" data-oid="53o.h4j">
              Categories
            </h3>
            <ul className="space-y-2 text-sm" data-oid="lefa.--">
              <li data-oid="nub9yam">
                <a
                  href="/category/politics"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="9sgfhr4"
                >
                  Politics
                </a>
              </li>
              <li data-oid="-l:hhs2">
                <a
                  href="/category/tech"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="6jgy3rh"
                >
                  Technology
                </a>
              </li>
              <li data-oid="4wdh2:l">
                <a
                  href="/category/sports"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="5ymn:70"
                >
                  Sports
                </a>
              </li>
              <li data-oid="o3463or">
                <a
                  href="/category/lifestyle"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="hnustht"
                >
                  Lifestyle
                </a>
              </li>
              <li data-oid="wu2ncs9">
                <a
                  href="/category/business"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="_al3bib"
                >
                  Business
                </a>
              </li>
              <li data-oid="w98qdc7">
                <a
                  href="/category/health"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="m-eze4j"
                >
                  Health
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4" data-oid="au3pyh6">
            <h3 className="font-semibold" data-oid="ym9135d">
              Company
            </h3>
            <ul className="space-y-2 text-sm" data-oid="cmcxqqg">
              <li data-oid="c6gxuz0">
                <a
                  href="/about"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="54cxwke"
                >
                  About Us
                </a>
              </li>
              <li data-oid="t7k8oag">
                <a
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid=":ljdrcf"
                >
                  Contact
                </a>
              </li>
              <li data-oid="thk:txg">
                <a
                  href="/careers"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="hgnqt5t"
                >
                  Careers
                </a>
              </li>
              <li data-oid="gezqtd:">
                <a
                  href="/privacy"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="a6vxnui"
                >
                  Privacy Policy
                </a>
              </li>
              <li data-oid="qet.cqb">
                <a
                  href="/terms"
                  className="text-muted-foreground hover:text-foreground"
                  data-oid="6deo28o"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4" data-oid="48txv85">
            <h3 className="font-semibold" data-oid="4yt4zce">
              Newsletter
            </h3>
            <p className="text-sm text-muted-foreground" data-oid="ct2umxy">
              Stay updated with our latest news and articles.
            </p>
            <div className="flex space-x-2" data-oid="86xnxg2">
              <Input
                placeholder="Enter your email"
                className="flex-1"
                data-oid=":kl3-1m"
              />

              <Button size="sm" data-oid="6bae3fu">
                <Mail className="h-4 w-4" data-oid="iln5brr" />
              </Button>
            </div>
          </div>
        </div>

        <div
          className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground"
          data-oid="6nj.ebo"
        >
          <p data-oid="c4c:4yn">&copy; 2024 NewsFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

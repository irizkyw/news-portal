import React from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export function Newsletter() {
  return (
    <section className="container mx-auto px-4 py-12" data-oid="u33_96f">
      <Card className="bg-primary text-primary-foreground" data-oid="gqd.yz2">
        <CardContent className="p-8 text-center" data-oid="h.nbox2">
          <div className="max-w-2xl mx-auto" data-oid="l-3o::a">
            <Mail
              className="h-12 w-12 mx-auto mb-4 opacity-90"
              data-oid="k2fzyb-"
            />

            <h2 className="text-3xl font-bold mb-4" data-oid="kdruyvk">
              Stay Informed
            </h2>
            <p className="text-lg mb-6 opacity-90" data-oid="p-cydxx">
              Get the latest news and updates delivered straight to your inbox.
              Join thousands of readers who trust NewsFlow for their daily news.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              data-oid="0.qt1bj"
            >
              <Input
                placeholder="Enter your email address"
                className="flex-1 bg-background text-foreground"
                data-oid="adweoac"
              />

              <Button
                variant="secondary"
                className="whitespace-nowrap"
                data-oid="0rinvsj"
              >
                Subscribe Now
              </Button>
            </div>
            <p className="text-sm mt-4 opacity-75" data-oid="1gqjt8p">
              No spam, unsubscribe at any time.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

import React from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export function Newsletter() {
  return (
    <section className="container mx-auto px-4 py-12" data-oid="z.7-gld">
      <Card className="bg-primary text-primary-foreground" data-oid="vw9w4eu">
        <CardContent className="p-8 text-center" data-oid="7ldemir">
          <div className="max-w-2xl mx-auto" data-oid="mjz71k6">
            <Mail
              className="h-12 w-12 mx-auto mb-4 opacity-90"
              data-oid="517f.b5"
            />

            <h2 className="text-3xl font-bold mb-4" data-oid="e9iszhh">
              Stay Informed
            </h2>
            <p className="text-lg mb-6 opacity-90" data-oid="z4.cjo5">
              Get the latest news and updates delivered straight to your inbox.
              Join thousands of readers who trust NewsFlow for their daily news.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              data-oid="x2jdouk"
            >
              <Input
                placeholder="Enter your email address"
                className="flex-1 bg-background text-foreground"
                data-oid="ogtjyud"
              />

              <Button
                variant="secondary"
                className="whitespace-nowrap"
                data-oid="n4fplky"
              >
                Subscribe Now
              </Button>
            </div>
            <p className="text-sm mt-4 opacity-75" data-oid="juk5svw">
              No spam, unsubscribe at any time.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

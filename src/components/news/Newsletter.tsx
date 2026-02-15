import React from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export function Newsletter() {
  return (
    <section className="container mx-auto px-4 py-12" data-oid="yyh.06f">
      <Card className="bg-primary text-primary-foreground" data-oid="l8ln2ei">
        <CardContent className="p-8 text-center" data-oid="dfgid6i">
          <div className="max-w-2xl mx-auto" data-oid="saxpia7">
            <Mail
              className="h-12 w-12 mx-auto mb-4 opacity-90"
              data-oid="ib7kc2i"
            />

            <h2 className="text-3xl font-bold mb-4" data-oid="cidgqdm">
              Stay Informed
            </h2>
            <p className="text-lg mb-6 opacity-90" data-oid="2o:w6:c">
              Get the latest news and updates delivered straight to your inbox.
              Join thousands of readers who trust NewsFlow for their daily news.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              data-oid="77of1ll"
            >
              <Input
                placeholder="Enter your email address"
                className="flex-1 bg-background text-foreground"
                data-oid="9cupyv0"
              />

              <Button
                variant="secondary"
                className="whitespace-nowrap"
                data-oid="e3nd_tv"
              >
                Subscribe Now
              </Button>
            </div>
            <p className="text-sm mt-4 opacity-75" data-oid="s89cjwb">
              No spam, unsubscribe at any time.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

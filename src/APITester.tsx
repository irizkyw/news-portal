import React, { useRef, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export function APITester() {
  const responseInputRef = useRef<HTMLTextAreaElement>(null);

  const testEndpoint = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      const endpoint = formData.get("endpoint") as string;
      const url = new URL(endpoint, location.href);
      const method = formData.get("method") as string;
      const res = await fetch(url, { method });

      const data = await res.json();
      responseInputRef.current!.value = JSON.stringify(data, null, 2);
    } catch (error) {
      responseInputRef.current!.value = String(error);
    }
  };

  return (
    <div
      className="mt-8 mx-auto w-full max-w-2xl text-left flex flex-col gap-4"
      data-oid="33t9.-s"
    >
      <form
        onSubmit={testEndpoint}
        className="flex items-center gap-2 bg-card p-3 rounded-xl font-mono border border-input w-full"
        data-oid="xyx8d7u"
      >
        <Select name="method" defaultValue="GET" data-oid="_j3_-l9">
          <SelectTrigger className="w-[100px]" data-oid="t5tic0f">
            <SelectValue placeholder="Method" data-oid="kjf8nfj" />
          </SelectTrigger>
          <SelectContent data-oid="4sh400_">
            <SelectItem value="GET" data-oid="g_hfxte">
              GET
            </SelectItem>
            <SelectItem value="PUT" data-oid="8d.xdrn">
              PUT
            </SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="text"
          name="endpoint"
          defaultValue="/api/hello"
          className={cn(
            "flex-1 font-mono",
            "bg-transparent border-0 shadow-none",
            "focus-visible:ring-0 focus-visible:ring-offset-0",
          )}
          placeholder="/api/hello"
          data-oid="pyv0buh"
        />

        <Button type="submit" variant="secondary" data-oid="lcb472z">
          Send
        </Button>
      </form>

      <textarea
        ref={responseInputRef}
        readOnly
        placeholder="Response will appear here..."
        className={cn(
          "w-full min-h-[140px] bg-card",
          "border border-input rounded-xl p-3",
          "font-mono resize-y",
          "placeholder:text-muted-foreground",
        )}
        data-oid="_0ruj:b"
      />
    </div>
  );
}

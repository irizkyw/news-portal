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
      data-oid=".tbexxd"
    >
      <form
        onSubmit={testEndpoint}
        className="flex items-center gap-2 bg-card p-3 rounded-xl font-mono border border-input w-full"
        data-oid="fcb:4hz"
      >
        <Select name="method" defaultValue="GET" data-oid="_3-e:w4">
          <SelectTrigger className="w-[100px]" data-oid="eaza:f.">
            <SelectValue placeholder="Method" data-oid="xtjmbjf" />
          </SelectTrigger>
          <SelectContent data-oid="f1h9es:">
            <SelectItem value="GET" data-oid="h851w-d">
              GET
            </SelectItem>
            <SelectItem value="PUT" data-oid="pfssoqt">
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
          data-oid="yp1zi.9"
        />

        <Button type="submit" variant="secondary" data-oid="rmr3ctx">
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
        data-oid="zst1ijq"
      />
    </div>
  );
}

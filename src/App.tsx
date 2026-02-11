import "./index.css";
import { APITester } from "./APITester";
import { Card, CardContent } from "@/components/ui/card";

import logo from "./logo.svg";
import reactLogo from "./react.svg";

export function App() {
  return (
    <div
      className="container mx-auto p-8 text-center relative z-10"
      data-oid="26e9urd"
    >
      <div
        className="flex justify-center items-center gap-8 mb-8"
        data-oid=":tt1vtr"
      >
        <img
          src={logo}
          alt="Bun Logo"
          className="h-36 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#646cffaa] scale-120"
          data-oid="xj.jwos"
        />

        <img
          src={reactLogo}
          alt="React Logo"
          className="h-36 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#61dafbaa] [animation:spin_20s_linear_infinite]"
          data-oid="_8tp84d"
        />
      </div>

      <Card
        className="bg-card/50 backdrop-blur-sm border-muted"
        data-oid="xthjp.6"
      >
        <CardContent className="pt-6" data-oid="si:j77j">
          <h1
            className="text-5xl font-bold my-4 leading-tight"
            data-oid="-va6nsx"
          >
            Bun + React
          </h1>
          <p data-oid="lkt1kii">
            Edit{" "}
            <code
              className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm"
              data-oid=".zszr:q"
            >
              src/App.tsx
            </code>{" "}
            and save to test HMR
          </p>
          <APITester data-oid="heb87i6" />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;

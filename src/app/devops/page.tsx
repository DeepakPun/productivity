import DevOpsComponent from "@/app/components/DevOpsComponent";
import { Suspense } from "react";
import { Icon } from "../lib/Icons";

export default function DevOpsPage() {
  return (
    <main className="text-slate-100 pt-1 px-6 md:px-12 lg:max-w-8xl mx-auto pb-12">
      <header className="mb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2 uppercase tracking-widest">
          <span>System Focus Matrix</span>
          {" // "}
          <span>DevSecOps Roadmap</span>
        </div>
        <h1 className="flex items-center gap-3 text-2xl font-black tracking-tight text-slate-100 sm:text-3xl">
          <span className="flex items-center justify-center animate-bg-pulse border-2 rounded-lg px-2">
            <Icon name="devops" className="size-8 sm:size-10" />
          </span>
          DevOps & DevSecOps Roadmap
        </h1>
        <p className="mt-2 text-sm font-mono text-slate-500">
          Step-by-step master list. Start with the highlighted tools in each
          section.
        </p>
      </header>

      <Suspense
        fallback={
          <div className="p-12 text-center text-xs font-mono text-slate-500 border border-slate-900 rounded-xl animate-pulse">
            {"//"} STREAMING_TOOLCHAIN_MANIFEST...
          </div>
        }
      >
        <DevOpsComponent />
      </Suspense>
    </main>
  );
}

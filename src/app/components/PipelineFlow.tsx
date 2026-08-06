import React from "react";

interface Step {
  id: string;
  label: string;
  description: string;
  status: "active" | "pending";
}

export default function PipelineFlow() {
  const pipelineSteps: Step[] = [
    {
      id: "01",
      label: "Plan",
      description: "Architect timeline & core theories",
      status: "active",
    },
    {
      id: "02",
      label: "Code",
      description: "Build secure sandbox routing",
      status: "active",
    },
    {
      id: "03",
      label: "Build",
      description: "Compile monolithic asset stacks",
      status: "active",
    },
    {
      id: "04",
      label: "Test",
      description: "Verify gateway API compliance",
      status: "active",
    },
    {
      id: "05",
      label: "Deploy",
      description: "Orchestrate via Droplet nodes",
      status: "pending",
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      {/* Visual Title Anchor */}
      <div className="mb-8 space-y-1">
        <p className="text-[10px] font-mono font-black tracking-widest text-red-500 uppercase">
          Automation Lifecycle
        </p>
        <h3 className="text-xl font-bold tracking-tight text-slate-100 font-sans md:text-2xl">
          Monolith Deployment Pipeline
        </h3>
      </div>

      {/* Main Flow Container */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-2 w-full">
        {pipelineSteps.map((step, idx) => {
          const isActive = step.status === "active";

          return (
            <React.Fragment key={step.id}>
              {/* Step Card Box */}
              <div
                className={`w-full lg:w-48 bg-slate-900/40 border rounded-xl p-5 flex flex-col justify-between min-h-[140px] relative overflow-hidden backdrop-blur-sm shadow-xl transition-all duration-300 ${
                  isActive
                    ? "border-red-900/40 hover:border-red-600/50"
                    : "border-slate-900 opacity-50"
                }`}
              >
                {/* Radial Glow for Active Blocks */}
                {isActive && (
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.03)_0%,transparent_60%)] pointer-events-none" />
                )}

                {/* Box Header Info */}
                <div className="flex items-center justify-between relative z-10">
                  <span className="text-[10px] font-mono font-bold text-slate-500 tracking-wider">
                    {step.id}
                  </span>
                  {isActive && (
                    <span className="flex h-1.5 w-1.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                    </span>
                  )}
                </div>

                {/* Content Payload */}
                <div className="mt-4 space-y-1 relative z-10">
                  <h4
                    className={`font-bold text-sm tracking-tight font-sans ${isActive ? "text-slate-100" : "text-slate-400"}`}
                  >
                    {step.label}
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-normal font-normal">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Connecting Chevron Arrow (Hidden after the final step) */}
              {idx < pipelineSteps.length - 1 && (
                <div className="flex items-center justify-center p-1 select-none relative z-10 shrink-0">
                  {/* Desktop Right Chevron Arrow */}
                  <svg
                    className={`hidden lg:block h-5 w-5 ${isActive ? "text-red-600/50 animate-pulse" : "text-slate-800"}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>

                  {/* Mobile Down Chevron Arrow */}
                  <svg
                    className={`block lg:hidden h-5 w-5 my-1 ${isActive ? "text-red-600/50 animate-pulse" : "text-slate-800"}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

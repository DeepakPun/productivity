const ROADMAP = [
  {
    title: "1. Container Orchestration & Local Dev",
    nonAws: [
      { name: "Kubernetes (K8s)", icon: "☸", start: true },
      { name: "Minikube / Kind", icon: "📦", start: false },
      { name: "Skaffold", icon: "🛠", start: false },
    ],
    aws: [
      { name: "EKS", icon: "☸", start: true },
      { name: "ECS", icon: "📦", start: false },
      { name: "Copilot", icon: "🤖", start: false },
    ],
  },
  {
    title: "2. CI/CD Pipeline Automation",
    nonAws: [
      { name: "GitHub Actions", icon: "🚀", start: true },
      { name: "GitLab CI/CD", icon: "🦊", start: false },
      { name: "ArgoCD", icon: "🔄", start: false },
    ],
    aws: [
      { name: "CodePipeline", icon: "🚀", start: true },
      { name: "CodeBuild", icon: "🏗", start: false },
      { name: "CodeDeploy", icon: "📦", start: false },
    ],
  },
  {
    title: "3. DevSecOps (Security & Compliance)",
    nonAws: [
      { name: "Trivy", icon: "🛡", start: true },
      { name: "SonarQube", icon: "🔍", start: false },
      { name: "OWASP ZAP", icon: "🕷", start: false },
      { name: "HashiCorp Vault", icon: "🔐", start: false },
    ],
    aws: [
      { name: "Secrets Manager", icon: "🔐", start: true },
      { name: "Amazon Inspector", icon: "🛡", start: false },
      { name: "AWS CodeGuru", icon: "🔍", start: false },
      { name: "AWS WAF", icon: "🧱", start: false },
    ],
  },
  {
    title: "4. Inter-Service Communication",
    nonAws: [
      { name: "RabbitMQ", icon: "🐰", start: true },
      { name: "Apache Kafka", icon: "📨", start: false },
      { name: "Kong / APISIX", icon: "🚪", start: false },
      { name: "Istio / Linkerd", icon: "🧬", start: false },
    ],
    aws: [
      { name: "API Gateway", icon: "🚪", start: true },
      { name: "Amazon MQ", icon: "🐰", start: false },
      { name: "Amazon MSK", icon: "📨", start: false },
      { name: "App Mesh", icon: "🧬", start: false },
      // { name: "App Mesh", icon: "🩻", start: false },
      // { name: "App Mesh", icon: "🕸", start: false },
    ],
  },
  {
    title: "5. Observability (Logs & Metrics)",
    nonAws: [
      { name: "Prometheus & Grafana", icon: "📊", start: true },
      { name: "Loki / Fluentd", icon: "📜", start: false },
      { name: "Jaeger", icon: "🔎", start: false },
    ],
    aws: [
      { name: "CloudWatch", icon: "👁", start: true },
      { name: "AWS X-Ray", icon: "🔎", start: false },
      { name: "Amazon Managed Prometheus & Grafana", icon: "📊", start: false },
    ],
  },
];

type Tool = { name: string; icon: string; start: boolean };

function ToolList({ items }: { items: Tool[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li
          key={item.name}
          className={`flex items-center justify-between rounded-lg border px-4 py-3 transition ${
            item.start
              ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-100"
              : "border-slate-800 bg-slate-950/60 text-slate-300"
          }`}
        >
          <span className="flex items-center gap-2.5">
            <span className="text-sm sm:text-base">{item.icon}</span>
            <span className="text-xs sm:text-sm">{item.name}</span>
          </span>
          {item.start && (
            <span className="ml-3 shrink-0 rounded-full bg-cyan-400 px-2.5 py-0.5 text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-slate-950">
              Start Here
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function DevOpsComponent() {
  return (
    <div className="space-y-6">
      {ROADMAP.map((cat) => (
        <section
          key={cat.title}
          className="w-full rounded-xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8"
        >
          <h2 className="mb-6 text-xs sm:text-sm font-black uppercase tracking-widest text-slate-100">
            {cat.title}
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
            <div>
              <h3 className="mb-3 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
                Non-AWS{" "}
                <span className="text-slate-500 normal-case">
                  (Cloud-Agnostic)
                </span>
              </h3>
              <ToolList items={cat.nonAws} />
            </div>

            <div>
              <h3 className="mb-3 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-widest text-amber-300">
                AWS-Native
              </h3>
              <ToolList items={cat.aws} />
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

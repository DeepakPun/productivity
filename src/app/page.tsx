import AdminLogin from "./components/AdminLogin";
import { isAuthenticatedCheck } from "./actions/auth";
import PipelineFlow from "./components/PipelineFlow";

export default async function LandingPage() {
  const isAuth = await isAuthenticatedCheck();

  return (
    <main className="bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 max-w-2xl mx-auto text-center min-h-[70vh] pb-12 gap-8">
      {/* System Status Banner */}
      <div className="w-full flex flex-col items-center">
        <div
          className={`mb-6 font-mono text-[10px] tracking-widest border px-3 py-1 rounded-full uppercase transition-all ${
            isAuth
              ? "text-emerald-400 bg-emerald-950/30 border-emerald-900/50"
              : "text-indigo-400 bg-indigo-950/30 border-indigo-900/50"
          }`}
        >
          System Core // {isAuth ? "Online" : "Offline"}
        </div>

        <h1 className="text-3xl font-black tracking-tight text-slate-100 sm:text-4xl">
          {isAuth ? "Admin Console Active" : "Administrative Access"}
        </h1>

        <p className="text-sm text-slate-400 mt-3 leading-relaxed max-w-md mb-4">
          {isAuth
            ? "You are successfully logged in. Select an administrative tool from the Navbar dropdown above to start managing your tasks."
            : "Please enter your security credentials below to log in and perform administrative tasks."}
        </p>

        {!isAuth && <AdminLogin />}
      </div>
    </main>
  );
}

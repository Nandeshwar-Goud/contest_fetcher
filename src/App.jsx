import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Schedule from "./pages/Schedule";
import Rankings from "./pages/Rankings";
import Settings from "./pages/Settings";
import { useContests } from "./hooks/useContests";

const App = () => {
  const [view, setView] = useState("dashboard");

  // SINGLE SOURCE OF TRUTH
  const contestState = useContests();

  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-blue-500/30">
      <Navbar setView={setView} currentView={view} />

      <main className="flex-1 h-screen overflow-y-auto">
        {view === "dashboard" && (
          <Home contestState={contestState} />
        )}

        {view === "schedule" && (
          <Schedule contests={contestState.filtered} />
        )}
        {view === "rankings" && <Rankings />}
        {view === "settings" && <Settings />}
      </main>
    </div>
  );
};

export default App;

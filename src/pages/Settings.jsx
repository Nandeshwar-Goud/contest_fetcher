import { Construction } from "lucide-react";

const Settings = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full p-6 lg:p-10 text-center">
            <div className="bg-slate-900/30 border border-slate-800/60 rounded-3xl p-10 max-w-md w-full">
                <Construction
                    size={48}
                    className="mx-auto mb-6 text-yellow-500"
                />

                <h1 className="text-2xl font-bold text-slate-200 mb-2">
                    Settings Under Development
                </h1>

                <p className="text-sm text-slate-500 leading-relaxed">
                    This section is currently being built.
                    Configuration options, preferences, and advanced controls
                    will be available here soon.
                </p>

                <div className="mt-6 text-[10px] font-mono uppercase tracking-widest text-slate-600">
                    STATUS: IN_PROGRESS
                </div>
            </div>
        </div>
    );
};

export default Settings;

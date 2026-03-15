import { cn } from "@/lib/utils";
import JsonLd from "@/lib/json_ld";

export default function Website() {
    return (
        <div className="relative min-h-screen flex flex-col w-full bg-background overflow-x-hidden">
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-background focus:border focus:border-border focus:rounded-md focus:text-foreground"
            >
                Skip to main content
            </a>

            <main
                id="main-content"
                className={cn(
                    "relative z-[1] flex-1 flex flex-col items-center justify-center w-full text-center m-0 gap-8 overflow-y-auto overflow-x-hidden",
                )}
                role="main"
            >
                Next OpenNext Issue Test Project
            </main>
        </div>
    );
}
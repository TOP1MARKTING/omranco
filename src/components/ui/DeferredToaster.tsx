import { lazy, Suspense, useEffect, useState } from "react";

const Toaster = lazy(() =>
  import("@/components/ui/sonner").then((m) => ({ default: m.Toaster })),
);

/** Mount sonner after hydration so it is not in the critical initial JS. */
export function DeferredToaster() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) return null;

  return (
    <Suspense fallback={null}>
      <Toaster position="top-center" richColors closeButton />
    </Suspense>
  );
}

export function LoadingDots() {
  return (
    <span className="flex items-center gap-1">
      <span className="h-2 w-2 animate-pulse rounded-full bg-primary-200" />
      <span className="h-2 w-2 animate-pulse rounded-full bg-primary-300" style={{ animationDelay: "150ms" }} />
      <span className="h-2 w-2 animate-pulse rounded-full bg-primary-400" style={{ animationDelay: "300ms" }} />
    </span>
  );
}

export function BronzeDivider() {
  return (
    <div className="relative my-8">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-border" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-background px-4 text-accent text-xs uppercase tracking-widest">
          ◆
        </span>
      </div>
    </div>
  );
}

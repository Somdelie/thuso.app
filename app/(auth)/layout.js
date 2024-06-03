export default function ClientLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      {children}
    </div>
  );
}

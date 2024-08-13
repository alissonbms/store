import { LoadingSpinner } from "@/components/ui/loading";

const LoadingPage = () => {
  return (
    <div className="flex h-full w-full flex-row items-center justify-center gap-3">
      <LoadingSpinner />
      <p className="text-xl">Loading...</p>
    </div>
  );
};

export default LoadingPage;

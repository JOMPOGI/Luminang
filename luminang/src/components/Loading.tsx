interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
}

export function Loading({ message = "Loading your experience", fullScreen = true }: LoadingProps) {
  return (
    <div
      className={`${fullScreen ? 'min-h-screen' : 'min-h-[400px]'} bg-black flex items-center justify-center`}
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <div className="text-center">
        <div
          className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-500 mb-4"
          aria-hidden="true"
        ></div>
        <p className="text-amber-400 font-serif text-xl">{message}</p>
        <p className="text-gray-500 text-sm mt-2">Please wait...</p>
      </div>
    </div>
  );
}
import { Appbar } from "../pages/Appbar";

export const SkeletonLoader = () => {
  return (
    <div>
      <Appbar />
      <div className="font-semibold text-xl p-3">
        Users
      </div>
      <div className="p-3">
        <div className="skeleton-loader skeleton-text w-48"></div>
      </div>
      <div>
        {Array(20).fill(0).map((_, index) => (
          <div key={index} className="flex justify-between p-3 border-b">
            <div className="flex">
              <div className="rounded-full h-12 w-12 skeleton-loader skeleton-avatar mt-1 mr-2 bg-gray-300"></div>
              <div className="flex flex-col justify-center h-full">
                <div className="skeleton-loader skeleton-text w-32 bg-gray-200"></div>
              </div>
            </div>
            <div className="flex flex-col justify-center h-full">
              <div className="skeleton-loader skeleton-button w-24 h-10 bg-gray-200"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

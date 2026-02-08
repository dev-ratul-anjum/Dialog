import NavigationRail from "@/app/rooms/components/NavigationRail";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ReactNode, Suspense } from "react";
import RoomsLayoutContent from "./components/RoomsLayoutContent";

const RoomsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#d1d7db] text-[#111b21] relative">
      <Suspense fallback={<LoadingSpinner />}>
        <RoomsLayoutContent navigationRail={<NavigationRail />}>
          {children}
        </RoomsLayoutContent>
      </Suspense>
    </div>
  );
};

export default RoomsLayout;

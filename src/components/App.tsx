import { Satellite } from "lucide-react";
import { useEffect, useRef } from "react";
import { Route, Routes } from "react-router-dom";

import { ScrollArea, TopBar } from "@/components/ui";
import { cn } from "@/lib/utils";
import { useFetchNewListings } from "@/queries/jobs";

import { useDarkMode } from "./contexts/darkModeContext";
import { useRefreshProgressListener } from "./contexts/refreshListener";
import { NavBar } from "./NavBar";
import {
  GeneralListings,
  HiddenListings,
  SearchManager,
  Settings,
  SortedCategories,
} from "./pages";

export function App() {
  useRefreshProgressListener();
  const hasFetchedRef = useRef(false);
  const { mutate: fetchNewListing } = useFetchNewListings();
  const { isDark } = useDarkMode();

  useEffect(() => {
    // @ts-ignore - inDevMode used to stop refresh on app load and avoid all the API calls while developing
    const inDevMode = import.meta.env.DEV;
    if (!inDevMode && !hasFetchedRef.current) {
      hasFetchedRef.current = true;
      fetchNewListing();
    }
  }, [fetchNewListing]);

  const rootClass = cn(
    isDark ? "dark" : "light",
    "bg-background text-foreground",
  );

  return (
    <>
      <div className={rootClass}>
        <TopBar>
          <div className="flex items-center">
            <Satellite className="mr-2 h-4 w-4" />
            <p>JobSeeker</p>
          </div>
        </TopBar>
        <NavBar />
        <ScrollArea className="h-page">
          <div className="my-5 max-w-sm md:max-w-3xl mx-auto">
            <Routes>
              <Route index element={<GeneralListings />} />
              <Route
                path="/jobs-saved"
                element={<SortedCategories category="saved" />}
              />
              <Route
                path="/jobs-applied"
                element={<SortedCategories category="applied" />}
              />
              <Route path="/jobs-hidden" element={<HiddenListings />} />
              <Route path="/searches" element={<SearchManager />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </ScrollArea>
      </div>
    </>
  );
}

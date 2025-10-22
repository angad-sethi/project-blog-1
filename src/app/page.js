"use client";
import React, { useState, Suspense, useEffect, useRef } from "react";
import TabNavigation from "@/components/TabNavigation";
import BlogView from "@/components/BlogView";
import ComponentLibraryView from "@/components/ComponentLibraryView";
import {
  AnimatedView,
  useMounted,
} from "@/components/TabNavigation/AnimatedView";
import styles from "./homepage.module.css";

function HomeContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [blogData, setBlogData] = useState(null);

  // Render Views only after mount since container width needs to be measured first
  const isMounted = useMounted();

  const viewsContainerRef = useRef(null);
  const [viewsContainerWidth, setViewsContainerWidth] = useState(0);

  // Refs for measuring view heights
  const blogViewRef = useRef(null);
  const componentViewRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState("auto");

  useEffect(() => {
    const updateWidth = () => {
      if (viewsContainerRef.current) {
        const width = viewsContainerRef.current.getBoundingClientRect().width;
        setViewsContainerWidth(width);
      }
    };

    // Initial measurement
    updateWidth();

    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  // Measure and update container height based on active view
  useEffect(() => {
    const activeViewRef = activeTab === 0 ? blogViewRef : componentViewRef;
    if (activeViewRef.current) {
      const height = activeViewRef.current.scrollHeight;
      setContainerHeight(height);
    }
  }, [activeTab, blogData, isMounted, viewsContainerWidth]);

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
  };

  const handleBlogDataLoaded = (data) => {
    setBlogData(data);
  };

  return (
    <div className={styles.pageContainer}>
      <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />

      <div
        ref={viewsContainerRef}
        className={styles.viewsContainer}
        style={{ height: containerHeight }}
      >
        {isMounted && viewsContainerWidth > 0 && (
          <>
            <AnimatedView
              containerWidth={viewsContainerWidth}
              viewIndex={0}
              activeIndex={activeTab}
              contentRef={blogViewRef}
            >
              <BlogView
                cachedData={blogData}
                onDataLoaded={handleBlogDataLoaded}
              />
            </AnimatedView>

            <AnimatedView
              containerWidth={viewsContainerWidth}
              viewIndex={1}
              activeIndex={activeTab}
              contentRef={componentViewRef}
            >
              <ComponentLibraryView />
            </AnimatedView>
          </>
        )}
      </div>
    </div>
  );
}

function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}

export default Home;

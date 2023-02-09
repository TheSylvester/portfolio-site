function findBreakPoint(windowSize) {
  const breakPoints = [
    { type: "desktop", minWidth: 1000, topBarHeight: 100, sideBarWidth: 0 },
    {
      type: "tablet",
      minWidth: 600,
      topBarHeight: 75,
      sideBarWidth: 0,
    },
    {
      type: "Mobile",
      minWidth: 0,
      topBarHeight: 60,
      sideBarWidth: 0,
    },
  ];

  // find adaptive page breakpoint
  return breakPoints.find(
    (breakPoint) => windowSize.width > breakPoint.minWidth
  );
}

export default findBreakPoint;

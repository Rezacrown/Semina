import React from "react";
import Skeleton, { SkeletonTheme, SkeletonProps } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonLoading = ({ children, childComponent }) => {
  return (
    <>
      <SkeletonTheme baseColor="#efefefef" highlightColor="#444">
        <Skeleton count={5}
            height="20px"
            className="my-3"
            style={{ margin: "20%" }}
            width="60%"
            />
      </SkeletonTheme>
    </>
  );
};

export default SkeletonLoading;

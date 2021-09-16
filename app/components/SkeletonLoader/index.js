import React from "react";
import * as skeleton from '../../utils/skeleton'

function SkeletonLoader(props) {
    return (
      <div className={`noDataOuter skeletonLoader ${props.mode === "fullView" ? "noDataFullOuter" : props.mode === "middleView" ? "noDataMidOuter" : ""}`}>
        {skeleton[props.skeleton]}
    </div>
  );
}

SkeletonLoader.propTypes = {};

export default SkeletonLoader;

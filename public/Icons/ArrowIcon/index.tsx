import * as React from "react";
const ArrowIcon = ({
  className,
  fill = "#0c2c67",
}: {
  className?: string;
  fill?: string;
}) => (
  // <svg
  //   xmlns="http://www.w3.org/2000/svg"
  //   viewBox="-19.04 0 75.804 75.804"
  //   className={className}
  // >
  //   <g data-name="Group 65">
  //     <path
  //       fill={fill}
  //       d="M1.5 75.804a1.5 1.5 0 0 1-1.061-2.561l33.557-33.56a2.53 2.53 0 0 0 0-3.564L.439 2.561A1.5 1.5 0 0 1 2.561.44l33.556 33.558a5.53 5.53 0 0 1 0 7.807L2.56 75.365a1.5 1.5 0 0 1-1.06.439Z"
  //       data-name="Path 57"
  //     />
  //   </g>
  // </svg>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    stroke="#000"
    strokeWidth={7.58}
    viewBox="-19.04 0 75.804 75.804"
    className={className}
    aria-label="Arrow icon"
  >
    <g data-name="Group 65">
      <path
        fill={fill}
        d="M1.5 75.804a1.5 1.5 0 0 1-1.061-2.561l33.557-33.56a2.53 2.53 0 0 0 0-3.564L.439 2.561A1.5 1.5 0 0 1 2.561.44l33.556 33.558a5.53 5.53 0 0 1 0 7.807L2.56 75.365a1.5 1.5 0 0 1-1.06.439Z"
        data-name="Path 57"
      />
    </g>
  </svg>
);
export default ArrowIcon;

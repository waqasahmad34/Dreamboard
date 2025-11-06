import type { SVGProps } from 'react';

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
}

// SVG icons with proper accessibility support including title elements and aria-labels

export const IconChair = ({ size = 24, className, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 200"
    width={size}
    height={size}
    className={className}
    aria-label="Chair icon"
    {...props}
  >
    <title>Chair</title>
    <rect x="85" y="72" width="30" height="30" />
    <rect x="85" y="106" width="30" height="30" />
    <rect x="77" y="64" width="46" height="4" />
    <rect x="77" y="68" width="4" height="34" />
    <rect x="119" y="68" width="4" height="34" />
  </svg>
);

export const IconSofa = ({ size = 24, className, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 200"
    width={size}
    height={size}
    className={className}
    aria-label="Sofa icon"
    {...props}
  >
    <title>Sofa</title>
    <rect x="51" y="89" width="30" height="30" />
    <rect x="85" y="89" width="30" height="30" />
    <rect x="119" y="89" width="30" height="30" />
    <rect x="43" y="81" width="114" height="4" />
    <rect x="43" y="85" width="4" height="34" />
    <rect x="153" y="85" width="4" height="34" />
  </svg>
);

export const IconSectional = ({
  size = 24,
  className,
  ...props
}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 200"
    width={size}
    height={size}
    className={className}
    aria-label="Sectional sofa icon"
    {...props}
  >
    <title>Sectional Sofa</title>
    <rect x="43" y="106" width="38" height="38" />
    <rect x="51" y="72" width="30" height="30" />
    <rect x="85" y="72" width="30" height="30" />
    <rect x="43" y="64" width="114" height="4" />
    <rect x="43" y="68" width="4" height="34" />
    <rect x="119" y="72" width="30" height="30" />
    <rect x="153" y="68" width="4" height="34" />
  </svg>
);

export const IconExtendedSofa = ({
  size = 24,
  className,
  ...props
}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 200"
    width={size}
    height={size}
    className={className}
    aria-label="Extended sofa icon"
    {...props}
  >
    <title>Extended Sofa</title>
    <rect x="51" y="102" width="30" height="30" />
    <rect x="119" y="102" width="30" height="30" />
    <rect x="51" y="68" width="30" height="30" />
    <rect x="85" y="68" width="30" height="30" />
    <rect x="119" y="68" width="30" height="30" />
    <rect x="43" y="60" width="114" height="4" />
    <rect x="43" y="64" width="4" height="72" />
    <rect x="153" y="64" width="4" height="72" />
    <rect x="43" y="136" width="38" height="4" />
    <rect x="119" y="136" width="38" height="4" />
  </svg>
);

// Default export for the icon collection
export default {
  IconChair,
  IconSofa,
  IconSectional,
  IconExtendedSofa,
};

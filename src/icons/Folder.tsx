import * as React from "react";

export const Folder = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M56.011 28.174l-1.623 21.077a3.002 3.002 0 01-2.995 2.77H12.649a3.003 3.003 0 01-2.995-2.77L8.03 28.174a2.001 2.001 0 011.997-2.153h43.988a2.001 2.001 0 011.997 2.153zm-1.99-8.153v3a1 1 0 01-1 1h-42a1 1 0 01-1-1v-9a2 2 0 012-2h11.343a4 4 0 012.828 1.172l3.657 3.656a4 4 0 002.829 1.172H52.02a2 2 0 012 2z"
        fillRule="evenodd"
        fill="currentColor"
      />
    </svg>
  );
};

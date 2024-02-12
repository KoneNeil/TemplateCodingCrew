import React, { useState } from 'react';
import { MoveUpRight } from 'lucide-react';
// import { useClient } from '@supabase/ui';

export const MoveUpRightButton = () => {
  const [isHovered, setIsHovered] = useState(false);
 // useClient();

  return (
    <MoveUpRight>
      <button
        className={`font-normal font-sans text-medium text-ui-fg-interactive group transition-transform transform hover:rotate-45 duration-150 ${
          isHovered ? 'translate-x-[100%] translate-y-[100%]' : ''
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        View all
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none">
          <path
            className={`${
              isHovered ? 'text-ui-fg-hover' : 'text-ui-fg-interactive'
            }`}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="m5.75 14.25 8.5-8.5m0 0h-7.5m7.5 0v7.5"
          ></path>
        </svg>
      </button>
    </MoveUpRight>
  );
};

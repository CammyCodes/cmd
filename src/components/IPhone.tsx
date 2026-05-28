import { forwardRef, type ReactNode } from 'react';

/** CSS iPhone mockup with a Dynamic Island. Children render inside the screen. */
export const IPhone = forwardRef<HTMLDivElement, { children?: ReactNode; className?: string }>(
  function IPhone({ children, className }, ref) {
    return (
      <div ref={ref} className={`iphone${className ? ' ' + className : ''}`} aria-hidden="true">
        <div className="iphone-island" />
        <div className="iphone-screen">{children}</div>
      </div>
    );
  },
);

import type { ReactNode } from 'react';
import { ReactQueryProvider } from './providers';

function AppLayout({ children }: { children: ReactNode }) {
  return (
    <ReactQueryProvider>
      <div className="m-auto box-border grid w-2/3 grid-cols-2 gap-x-6 p-8">
        {children}
      </div>
    </ReactQueryProvider>
  );
}

export default AppLayout;

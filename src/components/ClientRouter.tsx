'use client';

import { MemoryRouter } from 'react-router';

export default function ClientRouter({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MemoryRouter>{children}</MemoryRouter>;
}

import { createFileRoute, Outlet } from '@tanstack/react-router';

import { m } from '@/paraglide/messages.js';

export const Route = createFileRoute('/(auth)')({
  head: () => ({ meta: [{ name: 'robots', content: 'noindex,nofollow' }] }),
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <>
      <Outlet />
      <p className="text-muted-foreground mx-auto max-w-3xl px-4 pb-8 text-center text-xs leading-relaxed">
        {m['pc.footer.disclaimer']()}
      </p>
    </>
  );
}

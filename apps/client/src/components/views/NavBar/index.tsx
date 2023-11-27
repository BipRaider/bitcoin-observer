import React, { useEffect } from 'react';

import { SignIn } from './SingIn';
import { SignUp } from './SingUp';
import { useCMCStore, useSessionStore, useToggleStore } from '@src/store';
import { Button } from '@src/components';

export const Navbar: React.FC = (): JSX.Element => {
  const { setSingInToggle } = useToggleStore();
  const {
    session: { user },
    reset,
  } = useSessionStore();
  const cmcStore = useCMCStore();

  const handleSignOut = () => {
    try {
      reset();
      cmcStore.reset();
      setSingInToggle.on();
    } catch {
      return;
    }
  };

  useEffect(() => {
    if (!user.id) handleSignOut();
  }, [user]);

  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      <div className="flex w-full items-center">
        <div className="flex items-center w-full md:w-2/3">Crypto coin</div>
        <div className="flex justify-end items-center md:w-1/3">
          {user.id && <p className="text-base text-gray-900 dark:text-white">{user.username}</p>}
          <div className="ml-4 hidden md:flex md:justify-end gap-1">
            {user.id && <Button onClick={handleSignOut}>Sign Out</Button>}
            {!user.id && <SignIn />}
            <SignUp />
          </div>
        </div>
      </div>
    </nav>
  );
};

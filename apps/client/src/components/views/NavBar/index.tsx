import React, { useEffect } from 'react';

import { SignIn } from './SingIn';
import { SignUp } from './SingUp';
import { useCMCStore, useSessionStore, useToggleStore } from '@src/store';
import { Button } from '@src/components';
import { Setting } from './Setting';

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
      <div className="flex w-full items-center flex-col md:flex-row">
        <div className="flex justify-end  items-center w-full">
          {user.id && <p className="text-base text-gray-900 dark:text-white">{user.username}</p>}
          <div className="ml-4 flex justify-end gap-1">
            {!user.id && <SignIn />}
            {!user.id && <SignUp />}
            {user.id && <Setting />}
            {user.id && <Button onClick={handleSignOut}>Sign Out</Button>}
          </div>
        </div>
      </div>
    </nav>
  );
};

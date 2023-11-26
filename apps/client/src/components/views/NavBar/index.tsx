import React from 'react';

import { SignIn } from './SingIn';
import { SignUp } from './SingUp';

export const Navbar: React.FC = (): JSX.Element => {
  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      <div className="flex w-full items-center">
        <div className="flex w-full md:w-2/3">{'String(isShowing)'}</div>
        <div className="flex justify-end md:w-1/3">
          <div className="ml-4 hidden md:flex md:justify-end gap-1">
            <SignIn />
            <SignUp />
          </div>
        </div>
      </div>
    </nav>
  );
};

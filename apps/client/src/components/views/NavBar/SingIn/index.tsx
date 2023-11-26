import React, { useState, Suspense } from 'react';

import { Drawer, Button, SignInForm, ButtonClose } from '@src/components';

export const SignIn: React.FC = (): JSX.Element => {
  const [isShowing, setIsShowing] = useState(false);
  return (
    <>
      <Suspense>
        <div>
          <Button onClick={() => setIsShowing(pre => !pre)}>Sign In</Button>
        </div>
        <Drawer
          isShowing={isShowing}
          title={'Sign Up'}
          onShow={(value: boolean): void => {
            setIsShowing(value);
          }}
        >
          <SignInForm />
          <ButtonClose type="button" onClick={() => setIsShowing(pre => !pre)}>
            Close
          </ButtonClose>
        </Drawer>
      </Suspense>
    </>
  );
};

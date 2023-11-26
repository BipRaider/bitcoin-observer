import React, { useState, Suspense } from 'react';

import { Drawer, Button, SignUpForm, ButtonClose } from '@src/components';

export const SignUp: React.FC = (): JSX.Element => {
  const [isShowing, setIsShowing] = useState(false);
  return (
    <>
      <Suspense>
        <div>
          <Button onClick={() => setIsShowing(pre => !pre)}>Sign Up</Button>
        </div>
        <Drawer
          isShowing={isShowing}
          title={'Sign Up'}
          onShow={(value: boolean): void => {
            setIsShowing(value);
          }}
        >
          <SignUpForm />
          <ButtonClose type="button" onClick={() => setIsShowing(pre => !pre)}>
            Close
          </ButtonClose>
        </Drawer>
      </Suspense>
    </>
  );
};

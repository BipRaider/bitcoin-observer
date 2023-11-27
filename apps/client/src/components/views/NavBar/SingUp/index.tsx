import React, { Suspense, useEffect } from 'react';

import { Drawer, Button, SignUpForm, ButtonClose } from '@src/components';
import { useToggleStore } from '@src/store';

export const SignUp: React.FC = (): JSX.Element => {
  const {
    toggles: { signUpToggle },
    setSingUpToggle,
    setSingInToggle,
  } = useToggleStore();

  useEffect(() => {
    try {
      if (signUpToggle) setSingInToggle.on();
    } catch {
      return;
    }
  }, [signUpToggle]);

  return (
    <>
      <Suspense>
        <div>
          <Button onClick={() => setSingUpToggle.toggle()}>Sign Up</Button>
        </div>
        <Drawer
          isShowing={signUpToggle}
          title={'Sign Up'}
          onShow={(value: boolean): void => {
            if (value) setSingUpToggle.on();
            else setSingUpToggle.off();
          }}
        >
          <SignUpForm />
          <ButtonClose type="button" onClick={() => setSingUpToggle.toggle()}>
            Close
          </ButtonClose>
        </Drawer>
      </Suspense>
    </>
  );
};

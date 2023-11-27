import React, { Suspense } from 'react';

import { Drawer, Button, SignInForm, ButtonClose } from '@src/components';
import { useToggleStore } from '@src/store';

export const SignIn: React.FC = (): JSX.Element => {
  const {
    toggles: { signInToggle },
    setSingInToggle,
  } = useToggleStore();

  return (
    <>
      <Suspense>
        <div>
          <Button onClick={() => setSingInToggle.on()}>Sign In</Button>
        </div>
        <Drawer
          isShowing={signInToggle}
          title={'Sign In'}
          onShow={(value: boolean): void => {
            try {
              if (value) setSingInToggle.on();
              else setSingInToggle.off();
            } catch {
              return;
            }
          }}
        >
          <SignInForm />
          <ButtonClose type="button" onClick={() => setSingInToggle.off()}>
            Close
          </ButtonClose>
        </Drawer>
      </Suspense>
    </>
  );
};

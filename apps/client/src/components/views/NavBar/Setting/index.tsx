import React, { Suspense } from 'react';

import { Drawer, Button, UpdateUserForm, ButtonClose } from '@src/components';
import { useToggleStore } from '@src/store';

export const Setting: React.FC = (): JSX.Element => {
  const {
    toggles: { settingToggle },
    setSettingToggle,
  } = useToggleStore();

  return (
    <>
      <Suspense>
        <div>
          <Button onClick={() => setSettingToggle.on()}>Setting</Button>
        </div>
        <Drawer
          isShowing={settingToggle}
          title={'Setting'}
          onShow={(value: boolean): void => {
            try {
              if (value) setSettingToggle.on();
              else setSettingToggle.off();
            } catch {
              return;
            }
          }}
        >
          <UpdateUserForm />
          <ButtonClose type="button" onClick={() => setSettingToggle.off()}>
            Close
          </ButtonClose>
        </Drawer>
      </Suspense>
    </>
  );
};

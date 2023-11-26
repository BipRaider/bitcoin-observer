import React, { Suspense } from 'react';

import { Button } from '@src/components';

export const MainPage: React.FC = (): JSX.Element => {
  return (
    <>
      <Suspense>
        <div>
          <Button onClick={() => console.dir('first')}>Click</Button>
        </div>
      </Suspense>
    </>
  );
};

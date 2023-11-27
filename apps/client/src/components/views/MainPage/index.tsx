import React, { Suspense } from 'react';

import { Tables } from './Tables';

export const MainPage: React.FC = (): JSX.Element => {
  return (
    <>
      <Suspense>
        <Tables />
      </Suspense>
    </>
  );
};

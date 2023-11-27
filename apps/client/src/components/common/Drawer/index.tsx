import { Fragment, Suspense } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import cn from 'classnames';

import { Props } from './props';

export const Drawer: React.FC<Props> = ({
  onClick,
  className,
  children,
  title,
  isOpen = true,
  isShowing = false,
  left,
  onShow,
}): JSX.Element => {
  return (
    <>
      <Suspense>
        <Transition show={isShowing} onClick={onClick}>
          <Dialog open={isOpen} onClose={onShow} className="relative z-50">
            <Transition.Child
              as={Fragment}
              enter="transition-all ease-in-out duration-300"
              enterFrom="opacity-0 backdrop-blur-none"
              enterTo="opacity-100 backdrop-blur-[.5px]"
              leave="transition-all ease-in-out duration-200"
              leaveFrom="opacity-100 backdrop-blur-[.5px]"
              leaveTo="opacity-0 backdrop-blur-none"
            >
              <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition-all ease-in-out duration-300"
              enterFrom={left ? 'translate-x-[-100%]' : 'translate-x-full'}
              enterTo="translate-x-0"
              leave="transition-all ease-in-out duration-200"
              leaveFrom="translate-x-0"
              leaveTo={left ? 'translate-x-[-100%]' : 'translate-x-full'}
            >
              <Dialog.Panel
                className={cn(
                  'flex h-full w-full flex-col md:w-1/2',
                  'bg-white pb-6 dark:bg-black',
                  'fixed',
                  { ['bottom-0 left-0 top-0']: left },
                  { ['bottom-0 right-0 top-0']: !left },
                  className,
                )}
              >
                <Dialog.Title className={cn('uppercase text-center p-2 text-lg  my-5')}>
                  {title}
                </Dialog.Title>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </Dialog>
        </Transition>
      </Suspense>
    </>
  );
};

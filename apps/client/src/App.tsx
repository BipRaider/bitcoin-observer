import { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <div className="card">
        <button onClick={() => setCount(count => count + 1)}>count is {count}</button>
        <button onClick={() => setIsOpen(true)}>Open</button>
      </div>
      <Transition show={isOpen}>
        <Dialog
          open={isOpen}
          onClose={() => {
            console.dir('first');
          }}
          className="relative z-50"
        >
          <Transition.Child
            as="div"
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
            as="div"
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-[-100%]"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-[-100%]"
          >
            <Dialog.Panel className="fixed bottom-0 left-0 right-0 top-0 flex h-full w-full flex-col bg-white pb-6 dark:bg-black">
              <Dialog.Title>Deactivate account</Dialog.Title>
              <Dialog.Description>This will permanently deactivate your account</Dialog.Description>
              <button onClick={() => setIsOpen(false)}>Cancel</button>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}

export default App;

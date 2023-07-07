import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

function MyModal() {
  let [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        Open Modal
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={setIsOpen}
        >
          <div className="min-h-screen px-4 text-center">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Dialog.Title
              as="h2"
              className="text-lg font-medium leading-6 text-gray-900"
            >
              Modal Title
            </Dialog.Title>
            <Dialog.Description
              as="p"
              className="text-sm text-gray-500"
            >
              Modal description.
            </Dialog.Description>
            <div className="mt-4">
              <button
                type="button"
                className="text-sm font-semibold text-blue-600 hover:text-blue-500"
                onClick={() => setIsOpen(false)}
              >
                Got it, thanks!
              </button>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

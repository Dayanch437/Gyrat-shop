import React, { ReactNode, useEffect, useRef } from 'react';
import { AiOutlineClose } from 'react-icons/ai'; // Import the close icon

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    hasError: boolean;
    isPending: boolean;
    inputRef: React.RefObject<HTMLInputElement> | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, hasError, isPending, inputRef }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && inputRef && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen, inputRef]);


    if (!isOpen) return null;

    return (
        <div
            className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            role="dialog"
            aria-modal="true"
        >
            <div
                ref={modalRef}
                className={`bg-white p-10 rounded-xl shadow-xl transform transition-transform duration-300 ease-out ${isOpen ? 'scale-100' : 'scale-95'}`}
                aria-labelledby="modal-title"
            >
                {(hasError || isPending) && (
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none p-1 rounded-full bg-gray-100"
                    >
                        <AiOutlineClose className="h-4 w-4" />
                    </button>
                )}
                {children}
            </div>
        </div>
    );
};

export default Modal;
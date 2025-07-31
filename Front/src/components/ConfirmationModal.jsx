import React, { useEffect, useRef } from 'react';

export const ConfirmationModal = ({ isOpen, title, message, onConfirm, onCancel, confirmText = 'Confirm', cancelText = 'Cancel' }) => {
	const modalRef = useRef(null);
	const firstFocusableRef = useRef(null);
	const lastFocusableRef = useRef(null);

	useEffect(() => {
		if (isOpen) {
			// Enfocar el primer elemento cuando se abre el modal
			firstFocusableRef.current?.focus();
			
			// Bloquear el scroll del body
			document.body.style.overflow = 'hidden';
			
			const handleEscape = (e) => {
				if (e.key === 'Escape') {
					onCancel();
				}
			};

			const handleTab = (e) => {
				if (e.key === 'Tab') {
					if (e.shiftKey) {
						// Shift + Tab (hacia atrás)
						if (document.activeElement === firstFocusableRef.current) {
							e.preventDefault();
							lastFocusableRef.current?.focus();
						}
					} else {
						// Tab (hacia adelante)
						if (document.activeElement === lastFocusableRef.current) {
							e.preventDefault();
							firstFocusableRef.current?.focus();
						}
					}
				}
			};

			document.addEventListener('keydown', handleEscape);
			document.addEventListener('keydown', handleTab);

			return () => {
				document.removeEventListener('keydown', handleEscape);
				document.removeEventListener('keydown', handleTab);
				document.body.style.overflow = 'unset';
			};
		}
	}, [isOpen, onCancel]);

	if (!isOpen) return null;

	const handleKeyDown = (e, action) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			action();
		}
	};

	return (
		<div 
			className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50"
			onClick={onCancel}
		>
			<div 
				ref={modalRef}
				className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
				onClick={(e) => e.stopPropagation()}
				role="dialog"
				aria-modal="true"
				aria-labelledby="modal-title"
				aria-describedby="modal-description"
			>
				<h3 
					id="modal-title"
					className="text-lg font-semibold text-gray-900 mb-4 text-center" 
					ref={firstFocusableRef}
					tabIndex={0}
				>
					{title}
				</h3>
				<p 
					id="modal-description"
					className="text-gray-600 mb-6 text-center" 
					tabIndex={0}
				>
					{message}
				</p>
				<div className="flex gap-4 justify-center">
					<button
						onClick={onCancel}
						onKeyDown={(e) => handleKeyDown(e, onCancel)}
						className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
						tabIndex={0}
					>
						{cancelText}
					</button>
					<button
						onClick={onConfirm}
						onKeyDown={(e) => handleKeyDown(e, onConfirm)}
						className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
						ref={lastFocusableRef}
						tabIndex={0}
					>
						{confirmText}
					</button>
				</div>
			</div>
		</div>
	);
};

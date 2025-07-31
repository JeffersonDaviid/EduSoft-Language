import React from 'react';

export const ConfirmationModal = ({ isOpen, title, message, onConfirm, onCancel, confirmText = 'Confirm', cancelText = 'Cancel' }) => {
	if (!isOpen) return null;

	const handleKeyDown = (e, action) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			action();
		}
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
				<h3 className="text-lg font-semibold text-gray-900 mb-4" tabIndex={0}>
					{title}
				</h3>
				<p className="text-gray-600 mb-6" tabIndex={0}>
					{message}
				</p>
				<div className="flex gap-4 justify-end">
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
						tabIndex={0}
					>
						{confirmText}
					</button>
				</div>
			</div>
		</div>
	);
};

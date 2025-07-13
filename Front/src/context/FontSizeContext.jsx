// FontSizeContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

const FontSizeContext = createContext({
	scale: 'md',
	increaseFont: () => {},
	decreaseFont: () => {},
});

export const useFontSize = () => useContext(FontSizeContext);

const fontScales = ['sm', 'md', 'lg', 'xl'];

export const FontSizeProvider = ({ children }) => {
	const [index, setIndex] = useState(1); // 'md'

	useEffect(() => {
		const html = document.documentElement;
		html.classList.remove(...fontScales.map((s) => `font-scale-${s}`));
		html.classList.add(`font-scale-${fontScales[index]}`);
	}, [index]);

	const increaseFont = () => {
		if (index < fontScales.length - 1) setIndex(index + 1);
	};

	const decreaseFont = () => {
		if (index > 0) setIndex(index - 1);
	};

	return (
		<FontSizeContext.Provider
			value={{ scale: fontScales[index], increaseFont, decreaseFont }}
		>
			{children}
		</FontSizeContext.Provider>
	);
};

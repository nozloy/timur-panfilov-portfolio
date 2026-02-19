import React, { useEffect } from 'react'
import { Language, siteContent } from '../content/siteContent';

interface HeaderProps {
	language: Language;
}

const Header: React.FC<HeaderProps> = ({ language }) => {
	const content = siteContent[language];

	useEffect(() => {
		const darkImage = new Image()
		darkImage.src = '/images/dark.png'
	}, [])

	return (
		<header className='relative'>
			<div className='h-[500px] w-full overflow-hidden relative group'>
				<img
					alt={content.hero.portraitAlt}
					className='absolute inset-0 w-full h-full object-cover object-top filter grayscale contrast-110 brightness-90 group-hover:grayscale-0 transition-all duration-700 opacity-100 dark:opacity-0'
					decoding='async'
					loading='eager'
					src='/images/photo.jpeg'
				/>
				<img
					alt=''
					aria-hidden='true'
					className='absolute inset-0 w-full h-full object-cover object-top filter grayscale contrast-110 brightness-90 group-hover:grayscale-0 transition-all duration-700 opacity-0 dark:opacity-100'
					decoding='async'
					loading='eager'
					src='/images/dark.png'
				/>
				<div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent'></div>
				<div className='absolute bottom-0 left-0 w-full p-6 text-white z-10'>
					<h1 className='font-display text-[3.15rem] leading-[0.92] font-extrabold mb-2 tracking-[-0.015em] text-white'>
						{content.hero.fullName}
					</h1>
					<p className='text-gray-300 text-[0.72rem] tracking-[0.34em] uppercase font-semibold'>
						{content.hero.subtitle}
					</p>
				</div>
			</div>
		</header>
	)
}

export default Header

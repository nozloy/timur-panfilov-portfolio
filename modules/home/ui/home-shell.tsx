'use client'

import { useEffect, useMemo, useState } from 'react'
import { Language, siteContent } from '@/content/siteContent'
import Clients from '@/modules/home/ui/clients'
import DesktopLayout from '@/modules/home/ui/desktop-layout'
import Experience from '@/modules/home/ui/experience'
import Footer from '@/modules/home/ui/footer'
import GridMotion from '@/modules/home/ui/grid-motion'
import Header from '@/modules/home/ui/header'
import LanguageToggle from '@/modules/home/ui/language-toggle'
import Services from '@/modules/home/ui/services'
import ThemeToggle from '@/modules/home/ui/theme-toggle'
import HomeCarousel from '@/modules/carousel/ui/home-carousel'
import type { CarouselSlide } from '@/modules/carousel/types'

const LANGUAGE_STORAGE_KEY = 'preferred-language'

type HomeShellProps = {
	initialSlides: CarouselSlide[]
}

const resolveInitialLanguage = (): Language => {
	if (typeof window === 'undefined') {
		return 'ru'
	}

	const languageFromQuery = new URLSearchParams(window.location.search).get(
		'lang',
	)
	if (languageFromQuery === 'ru' || languageFromQuery === 'en') {
		return languageFromQuery
	}

	try {
		const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
		if (savedLanguage === 'ru' || savedLanguage === 'en') {
			return savedLanguage
		}
	} catch {
		// Ignore storage read errors in strict browser modes.
	}

	return 'ru'
}

export default function HomeShell({ initialSlides }: HomeShellProps) {
	const [isDarkMode, setIsDarkMode] = useState(false)
	const [language, setLanguage] = useState<Language>(() =>
		resolveInitialLanguage(),
	)
	const [isDesktop, setIsDesktop] = useState(() => {
		if (
			typeof window === 'undefined' ||
			typeof window.matchMedia !== 'function'
		) {
			return false
		}

		return window.matchMedia('(min-width: 1024px)').matches
	})

	const gridItems = useMemo(
		() =>
			Array.from(
				{ length: 28 },
				() =>
					'https://images.unsplash.com/photo-1748370987492-eb390a61dcda?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
			),
		[],
	)

	useEffect(() => {
		const root = window.document.documentElement
		if (isDarkMode) {
			root.classList.add('dark')
		} else {
			root.classList.remove('dark')
		}
	}, [isDarkMode])

	useEffect(() => {
		if (typeof window === 'undefined') {
			return
		}

		const content = siteContent[language]
		try {
			window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
		} catch {
			// Ignore storage write errors.
		}

		window.document.documentElement.lang = language
		window.document.title = content.seo.title

		const descriptionMeta = window.document.querySelector<HTMLMetaElement>(
			"meta[name='description']",
		)
		if (descriptionMeta) {
			descriptionMeta.content = content.seo.description
		}
	}, [language])

	useEffect(() => {
		if (typeof window.matchMedia !== 'function') {
			setIsDesktop(false)
			return
		}

		const desktopMediaQuery = window.matchMedia('(min-width: 1024px)')
		const handleViewportChange = () => {
			setIsDesktop(desktopMediaQuery.matches)
		}

		handleViewportChange()
		if (typeof desktopMediaQuery.addEventListener === 'function') {
			desktopMediaQuery.addEventListener('change', handleViewportChange)
			return () => {
				desktopMediaQuery.removeEventListener('change', handleViewportChange)
			}
		}

		desktopMediaQuery.addListener(handleViewportChange)
		return () => {
			desktopMediaQuery.removeListener(handleViewportChange)
		}
	}, [])

	const languageTogglePositionClass = isDesktop
		? 'bottom-4 right-20'
		: 'left-4 top-[calc(env(safe-area-inset-top)+0.75rem)]'
	const themeTogglePositionClass = isDesktop
		? 'bottom-4 right-4'
		: 'right-4 top-[calc(env(safe-area-inset-top)+0.75rem)]'

	return (
		<div className='relative min-h-screen'>
			{isDesktop ? (
				<div className='desktop-grid-background' aria-hidden='true'>
					<GridMotion items={gridItems} gradientColor='black' />
				</div>
			) : null}
			<div
				className={`pointer-events-none fixed inset-0 z-[5] transition-opacity duration-500 ${
					isDarkMode ? 'bg-black/45 opacity-100' : 'bg-black/0 opacity-0'
				}`}
				aria-hidden='true'
			/>

			{isDesktop ? (
				<DesktopLayout language={language} slides={initialSlides} />
			) : (
				<div className='relative z-10 mx-auto min-h-screen max-w-md overflow-hidden bg-card-light shadow-2xl dark:bg-card-dark'>
					<Header language={language} />
					<div className='flex flex-col'>
						<Experience language={language} />
						<Services language={language} />
						<HomeCarousel slides={initialSlides} language={language} />
					</div>
					<Clients language={language} />
					<Footer language={language} />
				</div>
			)}

			<LanguageToggle
				language={language}
				onChange={setLanguage}
				ariaLabel={siteContent[language].ui.languageToggleAria}
				switchToRussianAria={siteContent[language].ui.switchToRussianAria}
				switchToEnglishAria={siteContent[language].ui.switchToEnglishAria}
				positionClassName={languageTogglePositionClass}
			/>
			<ThemeToggle
				isDarkMode={isDarkMode}
				toggleTheme={() => setIsDarkMode(prev => !prev)}
				ariaLabel={siteContent[language].ui.themeToggleAria}
				positionClassName={themeTogglePositionClass}
			/>
		</div>
	)
}

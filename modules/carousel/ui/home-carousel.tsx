'use client'

import { type TouchEvent, useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import {
	Carousel,
	CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'
import { Badge } from '@/components/ui/badge'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from '@/components/ui/dialog'
import type { CarouselSlide, SlideLanguage } from '@/modules/carousel/types'

interface HomeCarouselProps {
	slides: CarouselSlide[]
	language: SlideLanguage
}

const uiLabels: Record<
	SlideLanguage,
	{
		heading: string
		subheading: string
		empty: string
		prevAria: string
		nextAria: string
		openPreviewAria: string
		previewPrevAria: string
		previewNextAria: string
	}
> = {
	ru: {
		heading: 'Портфолио',
		subheading: 'Актуальные проекты',
		empty: 'Слайды пока не опубликованы.',
		prevAria: 'Предыдущий слайд',
		nextAria: 'Следующий слайд',
		openPreviewAria: 'Открыть увеличенное изображение',
		previewPrevAria: 'Предыдущее изображение',
		previewNextAria: 'Следующее изображение',
	},
	en: {
		heading: 'Portfolio',
		subheading: 'Featured projects',
		empty: 'No published slides yet.',
		prevAria: 'Previous slide',
		nextAria: 'Next slide',
		openPreviewAria: 'Open image preview',
		previewPrevAria: 'Previous image',
		previewNextAria: 'Next image',
	},
}

export default function HomeCarousel({ slides, language }: HomeCarouselProps) {
	const labels = uiLabels[language]
	const [api, setApi] = useState<CarouselApi>()
	const [currentSlide, setCurrentSlide] = useState(1)
	const [snapCount, setSnapCount] = useState(0)
	const [isPreviewOpen, setIsPreviewOpen] = useState(false)
	const [activeSlideIndex, setActiveSlideIndex] = useState(0)
	const touchStartX = useRef<number | null>(null)

	const items = useMemo(
		() =>
			slides.map(slide => {
				const localizedText =
					language === 'en'
						? {
								title: slide.titleEn,
								alt: slide.altEn,
							}
						: {
								title: slide.titleRu,
								alt: slide.altRu,
							}

				return {
					...slide,
					title: localizedText.title,
					alt: localizedText.alt,
				}
			}),
		[language, slides],
	)

	useEffect(() => {
		if (!api) {
			return
		}

		const syncSlideState = () => {
			setCurrentSlide(api.selectedScrollSnap() + 1)
			setSnapCount(api.scrollSnapList().length)
		}

		syncSlideState()
		api.on('select', syncSlideState)
		api.on('reInit', syncSlideState)

		return () => {
			api.off('select', syncSlideState)
			api.off('reInit', syncSlideState)
		}
	}, [api])

	useEffect(() => {
		if (!isPreviewOpen || items.length <= 1) {
			return
		}

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'ArrowLeft') {
				event.preventDefault()
				setActiveSlideIndex(prev => (prev - 1 + items.length) % items.length)
			} else if (event.key === 'ArrowRight') {
				event.preventDefault()
				setActiveSlideIndex(prev => (prev + 1) % items.length)
			}
		}

		window.addEventListener('keydown', handleKeyDown)

		return () => {
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [isPreviewOpen, items.length])

	const formatCounter = (value: number) => String(value).padStart(2, '0')
	const activeSlide = items[activeSlideIndex] ?? null

	const openPreview = (index: number) => {
		setActiveSlideIndex(index)
		setIsPreviewOpen(true)
	}

	const showPrevPreview = () => {
		setActiveSlideIndex(prev => (prev - 1 + items.length) % items.length)
	}

	const showNextPreview = () => {
		setActiveSlideIndex(prev => (prev + 1) % items.length)
	}

	const onPreviewTouchStart = (event: TouchEvent<HTMLDivElement>) => {
		touchStartX.current = event.touches[0]?.clientX ?? null
	}

	const onPreviewTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
		if (touchStartX.current === null || items.length <= 1) {
			touchStartX.current = null
			return
		}

		const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX.current
		const swipeDistance = touchEndX - touchStartX.current
		touchStartX.current = null

		if (Math.abs(swipeDistance) < 46) {
			return
		}

		if (swipeDistance > 0) {
			showPrevPreview()
			return
		}

		showNextPreview()
	}

	return (
		<section className='relative overflow-hidden border-b border-zinc-200 bg-gradient-to-b from-zinc-100 via-zinc-50 to-zinc-100 p-6 dark:border-zinc-700 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800/80 lg:p-6 xl:p-8'>
			<div className='mb-7 flex items-center justify-between gap-4 lg:mb-8'>
				<div>
					<h2 className='mt-2 text-3xl font-extrabold uppercase tracking-tight text-zinc-900 dark:text-zinc-100 xl:text-3xl'>
						{labels.heading}
					</h2>
					<p className='text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-zinc-500 dark:text-zinc-400'>
						{labels.subheading}
					</p>
				</div>
				<Badge
					variant='secondary'
					className='rounded-full border border-zinc-300/70 bg-white/80 px-3 py-1 text-xs uppercase tracking-[0.16em] text-zinc-700 shadow-sm backdrop-blur-sm dark:border-zinc-600 dark:bg-zinc-900/80 dark:text-zinc-200'
				>
					{items.length}
				</Badge>
			</div>

			{items.length === 0 ? (
				<div className='rounded-2xl border border-dashed border-zinc-300 bg-white/70 px-4 py-10 text-sm font-medium text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800/40 dark:text-zinc-400'>
					<p>{labels.empty}</p>
				</div>
			) : (
				<div>
					<Carousel
						opts={{
							align: 'start',
							loop: false,
						}}
						setApi={setApi}
						className='w-full'
					>
						<CarouselContent>
							{items.map((slide, index) => (
								<CarouselItem
									key={slide.id}
									className='basis-[92%] sm:basis-[72%] md:basis-1/2 2xl:basis-1/3'
								>
									<button
										type='button'
										onClick={() => openPreview(index)}
										className='group block w-full overflow-hidden rounded-2xl border border-zinc-200/80 bg-white text-left shadow-[0_10px_28px_rgba(15,23,42,0.08)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-[0_18px_40px_rgba(15,23,42,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-800/70 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-100 dark:border-zinc-700/80 dark:bg-zinc-900 dark:shadow-[0_10px_28px_rgba(0,0,0,0.32)] dark:hover:border-zinc-500 dark:hover:shadow-[0_20px_42px_rgba(0,0,0,0.42)] dark:focus-visible:ring-zinc-200 dark:focus-visible:ring-offset-zinc-900'
										aria-label={`${labels.openPreviewAria}: ${slide.title || slide.alt}`}
									>
										<article>
											<div className='relative aspect-[16/10] overflow-hidden'>
												<img
													src={slide.publicUrl}
													alt={slide.alt}
													loading='lazy'
													decoding='async'
													className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]'
												/>
												<div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/12 to-transparent' />
												<div className='absolute inset-x-0 bottom-0 px-4 pb-4 pt-10'>
													<p className='truncate text-sm font-semibold uppercase tracking-[0.08em] text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]'>
														{slide.title || slide.alt}
													</p>
												</div>
											</div>
										</article>
									</button>
								</CarouselItem>
							))}
						</CarouselContent>
						<div className='mt-6 flex items-center justify-between'>
							<div className='rounded-full border border-zinc-300/80 bg-white/80 px-3 py-1 text-xs font-semibold tracking-[0.16em] text-zinc-700 backdrop-blur-sm dark:border-zinc-600 dark:bg-zinc-900/80 dark:text-zinc-200'>
								{formatCounter(currentSlide)} / {formatCounter(snapCount || 1)}
							</div>
							<div className='flex items-center gap-2'>
								<CarouselPrevious
									aria-label={labels.prevAria}
									className='static h-10 w-10 translate-y-0 border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-100 disabled:opacity-45 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800'
								/>
								<CarouselNext
									aria-label={labels.nextAria}
									className='static h-10 w-10 translate-y-0 border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-100 disabled:opacity-45 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800'
								/>
							</div>
						</div>
					</Carousel>

					{activeSlide ? (
						<Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
							<DialogContent className='carousel-preview-dialog left-0 top-0 h-[100dvh] max-h-[100dvh] w-screen max-w-none translate-x-0 translate-y-0 border-0 bg-black/95 p-0 text-zinc-100 shadow-none sm:left-[50%] sm:top-[50%] sm:h-auto sm:max-h-[92vh] sm:max-w-6xl sm:translate-x-[-50%] sm:translate-y-[-50%] sm:rounded-2xl sm:border sm:border-zinc-700/60 sm:bg-zinc-950/95 sm:shadow-[0_28px_90px_rgba(0,0,0,0.7)] sm:backdrop-blur-xl [&>button]:right-3 [&>button]:top-[max(0.75rem,env(safe-area-inset-top))] [&>button]:inline-flex [&>button]:h-11 [&>button]:w-11 [&>button]:items-center [&>button]:justify-center [&>button]:rounded-full [&>button]:border [&>button]:border-white/20 [&>button]:bg-black/60 [&>button]:text-white [&>button]:opacity-100 [&>button]:transition-[background-color,transform] [&>button]:hover:scale-[1.04] [&>button]:hover:bg-black/80 [&>button]:focus:ring-0 [&>button]:focus-visible:ring-2 [&>button]:focus-visible:ring-white/80 [&>button]:focus-visible:ring-offset-0 [&>button_svg]:h-5 [&>button_svg]:w-5 sm:[&>button]:top-3'>
								<DialogTitle className='sr-only'>
									{activeSlide.title || labels.heading}
								</DialogTitle>
								<DialogDescription className='sr-only'>
									{activeSlide.alt}
								</DialogDescription>

								<div className='relative h-full min-h-0'>
									<header className='pointer-events-none absolute left-4 right-24 top-4 z-10 sm:left-5 sm:right-28 sm:top-5'>
										<p className='truncate whitespace-nowrap text-base font-semibold uppercase tracking-[0.24em] text-zinc-400'>
											{labels.subheading}
										</p>
										<p className='mt-1 truncate text-lg font-semibold uppercase tracking-[0.08em] text-zinc-100'>
											{activeSlide.title || activeSlide.alt}
										</p>
									</header>
									<div
										className='flex h-full min-h-0 items-center justify-center px-3 pt-[max(5.25rem,env(safe-area-inset-top)+4.75rem)] pb-[calc(env(safe-area-inset-bottom)+5.75rem)] sm:px-5 sm:pt-24 sm:pb-24'
										onTouchStart={onPreviewTouchStart}
										onTouchEnd={onPreviewTouchEnd}
									>
										<div className='carousel-preview-media relative w-full overflow-hidden rounded-2xl border border-white/20 bg-black/70 shadow-[0_16px_40px_rgba(0,0,0,0.45)]'>
											<img
												key={`${activeSlide.id}-${activeSlideIndex}`}
												src={activeSlide.publicUrl}
												alt={activeSlide.alt}
												loading='eager'
												decoding='async'
												className='carousel-preview-image max-h-[72dvh] w-full object-contain sm:max-h-[74vh]'
											/>
										</div>
									</div>

									<div className='pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/90 via-black/55 to-transparent' />
									<div className='pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/90 via-black/60 to-transparent' />
									<footer className='absolute inset-x-0 bottom-0 px-4 pb-[max(0.9rem,env(safe-area-inset-bottom)+0.5rem)] pt-3 sm:px-5'>
										<div className='flex items-center justify-between gap-3'>
											<span className='inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold tracking-[0.16em] text-zinc-100'>
												{formatCounter(activeSlideIndex + 1)} /{' '}
												{formatCounter(items.length)}
											</span>
											<div className='ml-auto flex shrink-0 items-center gap-2'>
												<button
													type='button'
													onClick={showPrevPreview}
													aria-label={labels.previewPrevAria}
													disabled={items.length <= 1}
													className='inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/90 disabled:cursor-not-allowed disabled:opacity-40'
												>
													<ArrowLeft className='h-6 w-6' aria-hidden='true' />
												</button>
												<button
													type='button'
													onClick={showNextPreview}
													aria-label={labels.previewNextAria}
													disabled={items.length <= 1}
													className='inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/90 disabled:cursor-not-allowed disabled:opacity-40'
												>
													<ArrowRight className='h-6 w-6' aria-hidden='true' />
												</button>
											</div>
										</div>
									</footer>
								</div>
							</DialogContent>
						</Dialog>
					) : null}
				</div>
			)}
		</section>
	)
}

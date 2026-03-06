'use client'

import { Language, siteContent } from '@/content/siteContent'

interface ServicesProps {
	language: Language
}

export default function Services({ language }: ServicesProps) {
	const content = siteContent[language].mobile

	return (
		<section className='bg-card-light p-6 dark:bg-card-dark'>
			<div className='mb-8 flex items-start justify-between'>
				<h2 className='text-3xl font-extrabold uppercase tracking-tight text-zinc-900 dark:text-zinc-100 xl:text-3xl'>
					{content.servicesTitle}
				</h2>
				<div className='select-none font-display text-5xl font-extrabold leading-none text-gray-100 dark:text-gray-800'>
					02
				</div>
			</div>
			<div className='space-y-6'>
				{content.services.map((service, index) => (
					<div
						key={index}
						className='group relative border-l-2 border-gray-200 pl-4 transition-colors duration-300 hover:border-primary dark:border-zinc-700 dark:hover:border-white'
					>
						<h3 className='mb-1 text-[0.83rem] font-semibold uppercase tracking-[0.08em] text-primary dark:text-white'>
							{service.title}
						</h3>
						<p className='text-[0.78rem] font-medium leading-relaxed text-gray-500 dark:text-gray-400'>
							{service.description}
						</p>
					</div>
				))}
			</div>
		</section>
	)
}

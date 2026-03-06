'use client'

import { Language, siteContent } from '@/content/siteContent'

interface ExperienceProps {
	language: Language
}

export default function Experience({ language }: ExperienceProps) {
	const content = siteContent[language].mobile

	return (
		<section className='border-b bg-card-light p-6 dark:border-gray-800 dark:bg-card-dark'>
			<div className='mb-6 flex items-start justify-between'>
				<h2 className='text-3xl font-extrabold uppercase tracking-tight text-zinc-900 dark:text-zinc-100 xl:text-3xl'>
					{content.experienceTitle}
				</h2>
				<div className='select-none font-display text-5xl font-extrabold leading-none text-gray-100 dark:text-gray-800'>
					01
				</div>
			</div>
			<div className='grid grid-cols-1 gap-4'>
				<div className='rounded-lg border border-gray-100 bg-gray-50 p-5 dark:border-zinc-800 dark:bg-zinc-800/50'>
					<ul className='space-y-4'>
						{content.experienceItems.map((item, index) => (
							<li key={index} className='flex items-start gap-3'>
								<i
									className={`${item.icon} mt-1 text-xs text-primary dark:text-white`}
								/>
								<span className='text-sm font-medium leading-snug text-gray-700 dark:text-gray-300'>
									{item.text}
								</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	)
}

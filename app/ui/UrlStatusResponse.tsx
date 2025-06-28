import type { BackResponse } from '@/types/BackResponse';

export function UrlStatusResponse({ message, data, status }: BackResponse) {
    const { original_url, short_url } = data

    return (
        message && <section className='p-6 rounded-lg bg-gray text-gray-300'>
            <article>
                {original_url && <p>Original URL: {original_url}</p>}
                {short_url && <p>Short URL: {short_url}</p>}
                <p>
                    <span
                        className={
                            status === 200 ? 'text-green-500' : 'text-red-600'
                        }
                    >
                        {message}
                    </span>
                </p>
            </article>
        </section>
    )
}
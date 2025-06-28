import { FormProps } from '@/types/FormProps';

export function ShortenerForm({ handleSubmit, handleChange }: FormProps) {
    return (
        <form
            className="flex flex-col items-center justify-center text-white gap-6"
            onSubmit={handleSubmit}
        >
            <label
                htmlFor="urlInput"
                className='flex flex-col text-xl text-gray-300 gap-y-2'
            >
                short your links here!
                <input
                    type="text"
                    placeholder="http://www.example.com . . ."
                    onChange={handleChange}
                    className='border border-gray-300 rounded-lg p-2'
                />
            </label>
            <button
                type="submit"
                className='w-full text-amber-500 bg-gray-900 py-2 px-4 rounded-lg font-semibold'
            >
                SHORT
            </button>
        </form>
    )
}
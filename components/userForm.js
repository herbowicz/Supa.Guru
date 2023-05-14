import { useState } from 'react';

const UserForm = ({ sendData = {}, data = {} }) => {
    const [content, setContent] = useState(data)

    const updateContent = (e, key) => {
        e.preventDefault()
        setContent({ ...content, [key]: e.target.value })
    }

    const submit = (e, content) => sendData(e, content)

    const capitalized = word => word.charAt(0).toUpperCase() + word.slice(1)

    return (
        <div className='mx-auto py-5'>
            <form onSubmit={e => submit(e, content)}>
                <div className='grid gap-4 mb-2 md:grid-cols-2'>
                    {Object.keys(content).map((el, i) => {
                        const disabled = ['id', 'points'].includes(el)

                        return (
                            <div key={i} className='relative'>
                                <input disabled={disabled} className={`peer pt-7 pb-2 px-3 border border-green-400 ${disabled || `bg-gray-900`} rounded-lg focus:text-white focus:ring-blue-500 focus:border-blue-500 block w-full`} type="text"
                                    placeholder={data[el]} 
                                    onChange={(e) => updateContent(e, el)}
                                    value={content[el]} />
                                <label className='absolute left-2 top-1 text-pink-300 text-sm '>{capitalized(el)}</label>
                            </div>
                        )
                    })}
                </div>

                <button className='text-white bg-blue-700 hover:bg-blue-800 rounded-lg px-5 py-2' type="submit">
                    Save
                </button>
            </form>
        </div>
    )
}

export default UserForm

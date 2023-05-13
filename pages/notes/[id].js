import { supabase } from '../../utils/supabase'

const NoteDetails = ({ note }) => {
    console.log({ note })
    return (
        <div className='w-full max-2-3xl mx-auto py-16 px-8'>
            <h1 className="text-3xl mb-6">{note.title}</h1>
            <p>{note.description}</p>
        </div>
    )
}

export const getStaticPaths = async () => {
    const { data: notes } = await supabase.from('notes').select('id')

    const paths = notes.map(({ id }) => ({
        params: {
            id: id.toString()
        }
    }))

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async ({ params: { id } }) => {
    const { data: note } = await supabase.from('notes').select('*').eq('id', id).single()

    return {
        props: {
            note
        }
    }
}
export default NoteDetails
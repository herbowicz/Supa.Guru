import { supabase } from '../utils/supabase'
import Link from 'next/link'
import { useUser } from '../context/user'

export default function Notes({ notes }) {
  const { user } = useUser()
  console.log(user)

  return (
    <div
      className={`w-full max-w-3xl mx-auto my-16 px-2`}
    >
      {notes.map((note) => (
        <Link 
          key={note.id} 
          href={`/${note.id}`} 
          className="p-8 h-40 mb-4 roundeed shadow test-xl flex"
        >
          {note.title}
        </Link>
      ))}

    </div>
  )
}

export const getStaticProps = async () => {
  const { data: notes } = await supabase.from('notes').select('*')

  return {
    props: {
      notes
    }
  }
}

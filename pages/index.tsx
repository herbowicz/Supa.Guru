import { supabase } from '../utils/supabase'
import Link from 'next/link'

import { Note, Notes } from '../types'

export default function Home({ notes }: { notes: Notes}) {

  supabase.auth.getUser().then((user) => console.log(user.data.user))

  return (
    <main
      className={`w-full max-w-3xl mx-auto my-16 px-2`}
    >
      {notes.map((note: Note) => (
        <Link 
          key={note.id} 
          href={`/${note.id}`} 
          className="p-8 h-40 mb-4 roundeed shadow test-xl flex"
        >
          {note.title}
        </Link>
      ))}
    </main>
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

import { supabase } from '../utils/supabase'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

type Notes = {
  [key: string]: {
    title: string;
    description: string;
  }
}

export default function Home({ notes }: { notes: Notes}) {

  console.log({ notes })
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      {notes.map((note: any) => (
        <p key={note.id}>{note.title}</p>
      ))}
    </main>
  )
}

export const getStaticProps = async () => {
  let { data: notes } = await supabase.from('notes').select('*')

  return {
    props: {
      notes
    }
  }
}

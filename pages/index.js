import Welcome from '../components/welcome'

const Hi = () => {
    return (
        <div className={`w-full max-w-sm mx-auto my-5 px-2`}>
            <div >
                <h1 className={`text-center text-5xl text-green-400 font-thin leading-loose`}>Supa Guru</h1>
            </div>
            <Welcome />
        </div>
    )
}

export default Hi
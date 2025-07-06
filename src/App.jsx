// const Card=({actors})=>{
//   return(
//     <div>
//       {actors.map((actor, index) => (
//         <h2 key={index}>I like {actor.name}</h2>
//       ))}
//     </div>
//   )
// }


// const App=()=>{
  //   return(
//     <div>
//       <h1>Hello world</h1>
//       <Card title="Avatar" actors={[{name:"Kiara Advani"},{name:"Alia Bhatt"}]}/>


//     </div>
//   )
// }

// export default App



// const Card=({title})=>{
  //   return(
    //     <div className="card" style={ //inline styling
    //       {
      //         border:"1px"
      //       }
//     }>
//       <h2>{title}</h2>
//     </div>
//   )
// }




import React, { useEffect } from 'react'
import Search from './components/Search'
import { useState } from 'react'
import { useEffect } from 'react'

const API_BASE_URL="https://api.themoviedb.org/3"

const API_KEY=import.meta.env.VITE_TMDB_API_KEY

const App = () => {

  const [searchTerm, setSearchTerm] = useState('') //you cannot change state variables

  useEffect(()=>{

  })
  return (
    <main>

      <div className='pattern'/>

      <div className='wrapper'>
        <header>
          <img src="/hero.png" alt="Hero Banner" />
        <h1>Find <span className='text-gradient'>Movies</span> You will enjoy without the hassle</h1>
        </header>

        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>

      </div>
    </main>
  )
}

export default App

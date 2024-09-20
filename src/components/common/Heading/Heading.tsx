import { memo } from "react"

const Heading = memo(({title} : {title:string}) => {

  return (<h2 className="mb-10px" style={{fontSize :"20px"}}>{title}</h2>)
})

export default Heading

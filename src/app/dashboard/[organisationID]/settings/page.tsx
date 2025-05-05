import React from 'react'

type Props = {
    params: {
        organisationID: string
    }
}

const Settings = async ({params}: Props) => {
    const p = await params
    console.log("==>Params: ", p)
  return (
    <div>Organisation Settings ({p.organisationID})</div>
  )
}

export default Settings
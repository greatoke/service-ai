import React from 'react'

type Props = {
    params: {
        organisationID: string
    }
}

const Settings = async ({params}: Props) => {
    const p = params
  return (
    <div>Organisation Settings ({p.organisationID})</div>
  )
}

export default Settings
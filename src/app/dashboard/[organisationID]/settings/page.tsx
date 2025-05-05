import React from 'react'

type Props = {
    params: Promise<{
        organisationID: string
    }>
}

const Settings = async ({params}: Props) => {
    const p = await params
  return (
    <div>Organisation Settings ({p.organisationID})</div>
  )
}

export default Settings
import * as React from 'react'

interface INoUserFoundProps {
    userName: string
}

const NoUserFound: React.FunctionComponent<INoUserFoundProps> = ({ userName }) => <div className='no_user_found'>No user found for { userName }. Please try another search.</div>

export default NoUserFound
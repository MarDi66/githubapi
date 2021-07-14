import * as React from 'react'
import { GitHubUser } from '../classes/GitHubUser'

interface IUserCardProps {
    user: GitHubUser
}

const UserCard: React.FunctionComponent<IUserCardProps> = ({ user }) => {

    return (
        <a className='user_card' href={ user.html_url } target='_blank' rel='noreferrer'>

            <div className='user_avatar' style={{ background: `url('${ user.avatar_url }')` }}></div>
            
            <h4>{ user.login }</h4>

        </a>
    )

}

export default UserCard
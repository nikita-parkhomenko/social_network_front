import React from 'react';
import { gql, useQuery } from '@apollo/client';

const USERS_QUERY = gql`
    query USERS_QUERY {
        allUsers {
            id,
            name,
        }
    }
`

interface User {
    name: string,
    id: string,
}

const Users = () => {
    const { loading, error, data } = useQuery(USERS_QUERY);
    console.log('data ', data);

    if (loading) return <h3>loading...</h3>
    if (error) return <h3>error!</h3>

    return (
        <div>
            <h1>Users Page</h1>
            {data.allUsers.map((user: User) => (
                <h5 key={user.id}>{user.name}</h5>
            ))}
        </div>
    );
};

export default Users;

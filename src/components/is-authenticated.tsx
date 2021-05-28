import React from 'react';
import {Redirect} from 'react-router-dom';
import {gql, useQuery} from '@apollo/client';

const IS_AUTHENTICATED = gql`
    {
        me {
            id
        }
    }
`

interface Props {
    children?: React.ReactNode,
}

const IsAuthenticated = ({ children }: Props) => {
    const {data, loading, error} = useQuery(IS_AUTHENTICATED);
    if (loading) {
        return <h3>loading...</h3>
    }
    if (error) {
        return <h3>{error.message}</h3>
    }
    if (!data.me) {
        return <Redirect to='/login' />;
    }
    return <>{children}</>;
};

export default IsAuthenticated;

import React from 'react';
import { Container } from 'react-bootstrap';
import NavigationHeader from '../components/NavigationHeader';
import UserFilter from '../components/UserFilter';
import UserTable from '../components/UserTable';

const UserListPage = () => {
  return (
    <>
      <NavigationHeader />
      <Container>
        <UserFilter />
        <UserTable />
      </Container>
    </>
  );
};

export default UserListPage;
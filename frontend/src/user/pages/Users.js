import React, { useEffect, useState } from "react";

import UsersList from "../components/UsersList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const Users = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedUsers, setLoadedUsers] = useState([]);

  // const USERS = [
  //   {
  //     id: 'u1',
  //     name: 'Max Schwarz',
  //     image:
  //       'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  //     places: 3
  //   }
  // ];
  useEffect(() => {
    const fetchRequest = async () => {
      try {
        setIsLoading(true);

        const response = await fetch("http://localhost:5000/api/users");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setLoadedUsers(data.users);
      } catch (err) {
        setError(err.message);
      }

      setIsLoading(false);
    };
    fetchRequest();
  }, []);

  const errorHandler = () => {    
    setError(null);
  };
   
  return (
    <>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </>
  );
};

export default Users;

import { useEffect, useState } from "react";
import { listUsers, User } from "../../services/user.service";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  useEffect(() => {
    if (!loaded) {
      listUsers().then((response) => {
        setUsers(response);
        setLoaded(true);
      });
    }
  }, [users, loaded]);
  return (
    <>
      <h1 className="mb-5">Users</h1>
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table
              id="kt_table_users"
              className="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer"
            >
              <thead>
                <tr className="text-start text-muted fw-bolder fs-7 text-uppercase gs-0">
                  <th>User name</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 fw-bold">
                {users.map((user) => {
                  return (
                    <tr key={user.useruid}>
                      <td>{user.username}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

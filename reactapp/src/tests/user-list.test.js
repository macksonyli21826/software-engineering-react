import {UserList} from "../components/profile/user-list"; // import UserList component
import {screen, render} from "@testing-library/react"; // for rendering component
import {HashRouter} from "react-router-dom"; // for navigation

// import REST service
import {findAllUsers} from "../services/users-service";

// import axios library
import axios from "axios";

// mock axios library
jest.mock('axios');

// sample users rendered by userlist
const MOCKED_USERS = [
  {username: 'ellen_ripley', password: 'lv426', email: 'repley@weyland.com', _id: "123"},
  {username: 'sarah_conor', password: 'illbeback', email: 'sarah@bigjeff.com', _id: "234"},
]

// test rendering user array
test('user list renders static user array', () => {

  // render user array
  render(
    <HashRouter>
      <UserList users={MOCKED_USERS}/>
    </HashRouter>);

  // verify user appears in screen somewhere
  const linkElement = screen.getByText(/ellen_ripley/i);
  expect(linkElement).toBeInTheDocument();
});

// test rendering data from remote RESTful API
test('user list renders async', async () => {

  // retrieve users from REST
  const users = await findAllUsers();

  // render users
  render(
    <HashRouter>
      <UserList users={users}/>
    </HashRouter>);

  // verify user appears in screen somewhere
  const linkElement = screen.getByText(/NASA/i);
  expect(linkElement).toBeInTheDocument();
})

// Mocking RESTful Web service APIs to isolate user interface tests
test('user list renders mocked', async () => {

  // simulate response from REST with static response
  axios.get.mockImplementation(() =>
    Promise.resolve({ data: {users: MOCKED_USERS} }));

  // retrieve users from Mock
  const response = await findAllUsers();
  const users = response.users;

  // render users retrieved from
  render(
    <HashRouter>
      <UserList users={users}/>
    </HashRouter>);

  // verify user appears in screen somewhere
  const user = screen.getByText(/ellen_ripley/i);
  expect(user).toBeInTheDocument();
});

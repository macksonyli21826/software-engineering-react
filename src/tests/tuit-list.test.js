import {Tuits} from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";

jest.mock('axios');

const MOCKED_USERS = [
  "alice", "bob", "charlie"
];

const MOCKED_TUITS = [
    {tuit: "hello world1"},
    {tuit: "hello world2"},
    {tuit: "hello world3"}
];

test('tuit list renders static tuit array', () => {

  // render tuit array
  render(
      <HashRouter>
        <Tuits tuits={MOCKED_TUITS}/>
      </HashRouter>);

  // verify tuit appears in screen somewhere
    const newtuit = screen.getByText('hello world1');
    expect(newtuit).toBeInTheDocument();

});

test('tuit list renders async', async () => {

    // find all tuits
    const newTuits = await findAllTuits();

    // render all tuits
    render(
        <HashRouter>
            <Tuits tuits={newTuits}/>
        </HashRouter>
    )

    // verify tuit appear somewhere
    const tuit1 = screen.getByText('hello world from Max');
    expect(tuit1).toBeInTheDocument();
});

test('tuit list renders mocked', async () => {
    axios.get.mockImplementation(() =>
        Promise.resolve({ data: {tuits: MOCKED_TUITS} }));

    //retrieve tuits from Mock
    const response = await findAllTuits();
    const tuits = response.tuits;

    // render tuits
    render(
        <HashRouter>
            <Tuits tuits={tuits}/>
        </HashRouter>);

    // verify tuit appears in screen somewhere
    const newtuit = screen.getByText('hello world1');
    expect(newtuit).toBeInTheDocument();
});

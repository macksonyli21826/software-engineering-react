import {
    createUser,
    deleteUsersByUsername, findUserById,
} from "../services/users-service";

import {
    createTuit,
    deleteTuit,
    findTuitById, findTuitByUser, deleteTuitsByUser
} from "../services/tuits-service";


describe('can create tuit with REST API', () => {

    // create a user with username user001
    const user001 = {
        username: 'user001',
        password: '123456',
        email: 'user001@abc.com',
    };

    // prepare for the data clean up
    let tuitId = null;

    // create a tuit with content hello world
    const tuit001 = {
        tuit: 'hello world! 01'
    }
    // setup test before running test
    beforeAll(() => {
        // remove any/all users to make sure we create it in the test
        return deleteUsersByUsername(user001.username);
    })

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        deleteTuit(tuitId);
        return deleteUsersByUsername(user001.username);
    })

    test('can insert new users with REST API', async () => {

        // insert new user in the database
        const newUser = await createUser(user001);

        // verify inserted user's properties match parameter user
        expect(newUser.username).toEqual(user001.username);
        expect(newUser.password).toEqual(user001.password);
        expect(newUser.email).toEqual(user001.email);

        // insert new tuit in the database using createTuit
        const newTuit = await createTuit(newUser._id, tuit001);

        // verify the tuit's properties match parameter tuit
        expect(newTuit.tuit).toEqual(tuit001.tuit);

        // prepare for clean up
        tuitId = newTuit._id;
    });
});

describe('can delete tuit wtih REST API', () => {

    // prepare to create a sample user
    const user002 = {
        username: 'user002',
        password: '123456',
        email: 'user002@def.com'
    };

    // prepare to create a sample tuit
    const tuit002 = {
        tuit: 'hello world 02'
    }

    // setup test before running test
    beforeAll(() => {
        // remove any/all users to make sure we create it in the test
        return deleteUsersByUsername(user002.username);
    })

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        return deleteUsersByUsername(user002.username);
    })
    test('can delete tuit with REST API', async () => {

        // insert new user in the database
        const newUser = await createUser(user002);

        // verify inserted user's properties match parameter user
        expect(newUser.username).toEqual(user002.username);
        expect(newUser.password).toEqual(user002.password);
        expect(newUser.email).toEqual(user002.email);

        // insert new tuit in the database using createTuit
        const newTuit = await createTuit(newUser._id, tuit002);
        // verify the tuit's properties match parameter tuit
        expect(newTuit.tuit).toEqual(tuit002.tuit);

        // delete tuit by tuit id
        const status = await deleteTuit(newTuit._id);
        // verify we deleted at least one tuit
        expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    });
});

describe('can retrieve a tuit by their primary key with REST API', () => {
    // prepare to create a sample user
    const user003 = {
        username: 'user003',
        password: '123456',
        email: 'user003@ghi.com'
    };
    // prepare for the data clean up
    let tuitId = null;

    // prepare to create a sample tuit
    const tuit003 = {
        tuit: 'hello world 03'
    }

    // setup test before running test
    beforeAll(() => {
        // remove any/all users to make sure we create it in the test
        return deleteUsersByUsername(user003.username);
    })

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        deleteTuit(tuitId);
        return deleteUsersByUsername(user003.username);
    })
    test('can retrieve a tuit by their primary key with REST API', async () => {
        // insert the user in the database
        const newUser = await createUser(user003);

        // verify new user matches the parameter user
        expect(newUser.username).toEqual(user003.username);
        expect(newUser.password).toEqual(user003.password);
        expect(newUser.email).toEqual(user003.email);

        // insert new tuit in the database using createTuit
        const newTuit = await createTuit(newUser._id, tuit003);
        // verify the tuit's properties match parameter tuit
        expect(newTuit.tuit).toEqual(tuit003.tuit);

        // retrieve the tuit from the database by its primary key
        const existingTuit = await findTuitById(newTuit._id);

        // verify retrieved tuit matches parameter user
        expect(existingTuit.tuit).toEqual(newTuit.tuit);
        expect(existingTuit.postedBy._id).toEqual(newTuit.postedBy);
        expect(existingTuit._id).toEqual(newTuit._id);

        tuitId = newTuit._id;

    });
});

describe('can retrieve all tuits with REST API', () => {
// prepare to create a sample user
    const user004 = {
        username: 'user004',
        password: '123456',
        email: 'user004@ghi.com'
    };
    // prepare to clean up
    let uid004 = null;
    // prepare to create sample tuits
    const tuitGroup = [
        {tuit: 'hello world 04'},
        {tuit: 'hello world 05'},
        {tuit: 'hello world 06'}
    ]

    // setup test before running test
    beforeAll(async () => {
        // remove any/all users to make sure we create it in the test
        return deleteUsersByUsername(user004.username);
    })

    // clean up after test runs
    afterAll(async () => {
        // remove any data we created
        await deleteTuitsByUser(uid004);
        return deleteUsersByUsername(user004.username);
    });
    test('can retrieve all tuits with REST API', async () => {
        // insert the user in the database
        const newUser = await createUser(user004);

        // verify new user matches the parameter user
        expect(newUser.username).toEqual(user004.username);
        expect(newUser.password).toEqual(user004.password);
        expect(newUser.email).toEqual(user004.email);

        uid004 = newUser._id

        // insert new tuits in the database using createTuit
        const newTuitGroup = await Promise.all(
            tuitGroup.map(tuit=>
                {return createTuit(newUser._id, tuit);}
            )
        );

        // retrieve the all tuits from the database by its primary key
        const existingTuits = await findTuitByUser(newUser._id);

        // three tuits total should equal to assumption
        expect(existingTuits.length).toBeGreaterThanOrEqual(tuitGroup.length);

    });
});

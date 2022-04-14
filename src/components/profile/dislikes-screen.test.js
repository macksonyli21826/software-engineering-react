import MyDislikes from "./my-dislikes.js";
import {act, create} from "react-test-renderer";
import {HashRouter} from "react-router-dom";
import {screen} from "@testing-library/react";

test('my-dislikes render', () => {
    let MyDislikesRender
    act(() => {
        MyDislikesRender = create(
            <HashRouter>
                <MyDislikes
                />
            </HashRouter>
        )
    })
    console.log(MyDislikesRender);
    const root = MyDislikesRender.root;
    console.log(root);
    const tuitItems = root.findAllByProps({className: 'the-tuit'});
    console.log(tuitItems);
})
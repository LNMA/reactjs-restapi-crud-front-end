import React from "react";
import {HomeHead} from "./HomeHead";
import {HomeBodyComp} from "./HomeBodyComp";

export class HomeComp extends React.Component<any, any> {

    render() {
        return (
            <div>
                <HomeHead/>
                <HomeBodyComp/>
            </div>
        );
    }
}
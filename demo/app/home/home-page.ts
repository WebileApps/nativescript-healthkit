/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

import { NavigatedData, Page } from "tns-core-modules/ui/page";
import { getHealthDataSince } from "@webileapps/nativescript-healthkit";

import { HomeViewModel } from "./home-view-model";
export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;

    page.bindingContext = new HomeViewModel();
}

export async function onButtonTapped(args : any) {
    const date = new Date();
    date.setDate(date.getDate() - 60);
    try {
        const data = await getHealthDataSince(date);
        console.log(data.active_minutes, data.calories_expended, data.distance, data.heart_rate, data.step_count);

    } catch (error) {
        console.error(error);
    }
}

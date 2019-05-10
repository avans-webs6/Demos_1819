import { Timestamp } from "@firebase/firestore-types";

export class Blog
{
    public id: string;
    public name: string;
    public author: string;
    public date: Date = new Date();
}
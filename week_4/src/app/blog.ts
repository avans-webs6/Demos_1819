import { Timestamp } from "@firebase/firestore-types";

export class Blog
{
    public name: string;
    public author: string;
    public date: Date = new Date();
}
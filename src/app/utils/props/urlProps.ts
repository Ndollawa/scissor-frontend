export interface urlProps{
    _id:string | number;
	originalURL: string;
	user: string;
    traffic:any;
	shortURL: string;
	clicks: number;
	status: string;
    createdAt?:Date;
    updatedAt?:Date;
}
export interface ICommit {
	sha: string,
	message: string,
	commitUrl: string,
	date: Date,
	author: IAuthor,

}

export interface IAuthor {
	id: number,
	login: string,
	name: string,
	email: string,
	avatar: string,
}
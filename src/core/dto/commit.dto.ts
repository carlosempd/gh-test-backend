import { ApiProperty } from "@nestjs/swagger";
import { IAuthor, ICommit } from "../interfaces/commit";

export class CommitDto implements ICommit {
    @ApiProperty({
        type: String,
        description: 'SHA commit code'
    })
    sha: string;

    @ApiProperty({
        type: String,
        description: 'Commit message'
    })
	message: string;

    @ApiProperty({
        type: String,
        description: 'Url of the commit in the repo'
    })
	commitUrl: string;
    
    @ApiProperty({
        type: String,
        description: 'Commit date'
    })
	date: Date;

    @ApiProperty({
        type: String,
        description: 'Commit author object'
    })
	author: IAuthor;
}
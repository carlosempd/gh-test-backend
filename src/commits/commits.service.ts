import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ICommit } from 'src/core/interfaces/commit';

@Injectable()
export class CommitsService {
	baseUrl: string;
	headers = {};

	constructor(private configService: ConfigService) {
		this.baseUrl = this.configService.get<string>('GITHUB_BASE_URL');
		this.headers = {
			'Authorization': `Bearer ${this.configService.get('GITHUB_ACCESS_TOKEN')}`,
			'Accept': 'application/vnd.github+json'
		};   
	}

	async getAll(repository: 'backend' | 'frontend' = 'backend'): Promise<ICommit[]> {
		const githubEntity = 'repos';
		const githubUsername = this.configService.get<string>('GITHUB_USERNAME');
		const githubRepository = `gh-test-${ repository }`;
		const url = new URL(
			`${ githubEntity }/${ githubUsername }/${ githubRepository }/commits`,
			this.baseUrl,
		);
		const response = await fetch(
			url,
			{
				method: 'GET', headers: this.headers
			}
		);
		
		return response.json().then(data => 
			data.map(element => ({
				sha: element.sha,
				message: element.commit.message,
				commitUrl: element.commit.url,
				date: element.commit.author.date,
				author: {
					id: element.author.id,
					login: element.author.login,
					name: element.commit.author.name,
					email: element.commit.author.email,
					avatar: element.author.avatar_url
				}

			}))
		);
		// try {

		// } catch (error) {
		// 	throw new InternalServerErrorException({
		// 		message: 'An error has ocurred, please try again',
		// 		error
		// 	})
		// }
		
	}
}

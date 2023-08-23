import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CommitsService {
	baseUrl: string;
	headers: Headers;

	constructor(private configService: ConfigService) {
		this.baseUrl = this.configService.get<string>('GITHUB_BASE_URL');
		this.headers = new Headers();
		this.headers = new Headers({
			'Authorization': `Bearer ${this.configService.get('GITHUB_ACCESS_TOKEN')}`,
			'Accept': 'application/vnd.github+json'
		})       
	}

	async getAll(repository: 'backend' | 'frontend' = 'backend') {
		const githubEntity = 'repos';
		const githubUsername = this.configService.get<string>('GITHUB_USERNAME');
		const githubRepository = `gh-test-${ repository }`;
		const url = new URL(
			`${ githubEntity }/${ githubUsername }/${ githubRepository }/commits`,
			this.baseUrl,
		);
		try {
			const response = await fetch(
				url,
				{
					method: 'GET', headers: this.headers
				}
			);
			
			return response.json().then(data => {
				return data.map(element => ({
					sha: element.sha,
					message: element['commit']['message'],
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
			});

		} catch (error) {
			throw new InternalServerErrorException({
				message: 'An error has ocurred, please try again'
			})
		}
		
	}
}

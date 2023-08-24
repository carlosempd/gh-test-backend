import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { Observable, firstValueFrom } from 'rxjs';
import { ICommit } from 'src/core/interfaces/commit';

@Injectable()
export class CommitsService {
	baseUrl: string;
	headers = {};

	constructor(
		private configService: ConfigService,
		private readonly httpService: HttpService,
	) {
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

		try {
			const observable = this.httpService.get(url.href, {
				headers: this.headers
			});
			const response = await firstValueFrom(observable);
	
			return response.data.map(element => ({
				sha: element.sha,
				message: element.commit.message,
				commitUrl: element.html_url,
				date: element.commit.author.date,
				author: {
					id: element.author.id,
					login: element.author.login,
					name: element.commit.author.name,
					email: element.commit.author.email,
					avatar: element.author.avatar_url
				}
	
			}));
		} catch (error) {
			throw new InternalServerErrorException({
				message: 'An error has ocurred',
				error
			})
		}

		
	}
}

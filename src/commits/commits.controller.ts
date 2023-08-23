import { Controller, Get, Query } from '@nestjs/common';
import { CommitsService } from './commits.service';
import { ICommit } from 'src/core/interfaces/commit';

@Controller('commits')
export class CommitsController {
	constructor(
		private readonly commitsService: CommitsService
	) {}

	@Get()
	findAll(@Query('repository') repository: 'backend' | 'frontend'): Promise<ICommit[]> {
		return this.commitsService.getAll(repository);
	}
}

import { Controller, Get, Query } from '@nestjs/common';
import { CommitsService } from './commits.service';
import { ICommit } from 'src/core/interfaces/commit';
import { ApiInternalServerErrorResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CommitDto } from 'src/core/dto/commit.dto';

@ApiTags('Commits')
@Controller('commits')
export class CommitsController {
	constructor(
		private readonly commitsService: CommitsService
	) {}

	@ApiOkResponse({ 
		description: 'Ok response',
		type: [CommitDto],
	})
	@ApiInternalServerErrorResponse({ 
		description: 'Error fetching the data',
		schema: {
			example: {
				message: "An error has ocurred"
			}
		}
	})
	@ApiQuery({
		name: 'repository',
		enum: ['backend', 'frontend']
	})
	@Get()
	findAll(@Query('repository') repository: 'backend' | 'frontend'): Promise<ICommit[]> {
		return this.commitsService.getAll(repository);
	}
}

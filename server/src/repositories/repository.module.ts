import {Global, Module} from '@nestjs/common';
import * as ImportRepository from './index';
import {PrismaService} from '../services/prisma.service';
const repositories = Object.values(ImportRepository);

@Global()
@Module({providers: [...repositories, PrismaService], exports: repositories})
export class RepositoryModule {}

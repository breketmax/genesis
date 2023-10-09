import { Module } from '@nestjs/common';
import { AppController } from './Controllers/app.controller';
import { AppService } from './Services/app.service';
import { HttpModule } from '@nestjs/axios';
import { AuthController } from './Controllers/auth.controller';
import { AuthService } from './Services/auth.service';
import { ContactController } from './Controllers/contact.controller';
import { ContactService } from './Services/contact.service';
import { LeadsController } from './Controllers/leads.controller';
import { CompaniesController } from './Controllers/companies.controller';
import { LeadsService } from './Services/leads.service';
import { CompaniesService } from './Services/companies.service';

@Module({
  imports: [HttpModule],
  controllers: [
    AppController,
    AuthController,
    ContactController,
    LeadsController,
    CompaniesController,
  ],
  providers: [
    AppService,
    AuthService,
    ContactService,
    LeadsService,
    CompaniesService,
  ],
})
export class AppModule {}

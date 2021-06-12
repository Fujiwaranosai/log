import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { expect } from 'chai';
import { LogEntity, Severity } from 'db';
import { SinonSandbox } from 'sinon';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import Chai = require('chai');
import Sinon = require('sinon');
import SinonChai = require('sinon-chai');
import Faker = require('faker');

Chai.use(SinonChai);

describe('AppService', () => {
  let app: TestingModule;
  let sandbox: SinonSandbox;
  let appService: AppService;
  let repoStub;

  before(async () => {
    repoStub = { save: () => ({}) };
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: getRepositoryToken(LogEntity),
          useValue: repoStub,
        },
        AppService,
      ],
    }).compile();

    appService = app.get(AppService);
  });

  beforeEach(() => {
    sandbox = Sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('log should work', () => {
    const stub = sandbox.stub(repoStub, 'save').resolves();
    const entity = {
      channel: Faker.random.word(),
      content: Faker.random.word(),
      severity: Faker.random.word(),
    };
    appService.log(entity);
    expect(stub).to.be.calledWith(entity);
  });
});

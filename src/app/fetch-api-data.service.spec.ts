import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UserLoginService } from './fetch-api-data.service';

describe('UserLoginService', () => {
  let service: UserLoginService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserLoginService],
    });

    service = TestBed.inject(UserLoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send login request and return token', () => {
    const mockResponse = { token: 'fake-jwt-token' };
    const userData = { username: 'testuser', password: 'testpass' };

    service.loginUser(userData).subscribe((response) => {
      expect(response.token).toBe('fake-jwt-token');
    });

    const req = httpMock.expectOne(
      'https://nicks-flix-364389a40fe7.herokuapp.com/login'
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  afterEach(() => {
    httpMock.verify();
  });
});

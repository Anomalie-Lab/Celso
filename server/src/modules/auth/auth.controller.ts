import {Controller, Get, Post, Body, Res, Req, UsePipes, ValidationPipe, HttpStatus, Param, UseGuards, Patch} from '@nestjs/common';
import {AuthService} from './auth.service';
import {isPublic} from '../../decorators/public.decorator';
import type {Response as ExpressResponse, Request as ExpressRequest} from 'express';
import {ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags} from '@nestjs/swagger';
import {RegisterDto, ForgotPasswordUserDto, LoginDto, ResetPasswordUserDto} from 'src/dtos/auth.dto';
import {ErrorDefaultSwagger, ErrorFieldsSwagger} from 'src/docs/errors.doc';
import {UserResponseSwagger} from 'src/docs/account.doc';
import {LogoutUser} from 'src/services/cookies.service';
import {User} from 'src/decorators/user.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @isPublic()
  @Post('register')
  @ApiOperation({summary: 'Creates a user account'})
  @ApiBody({type: RegisterDto, description: 'The request body should contain the user details, including name, email, password, and phone.'})
  @ApiResponse({status: 400, description: 'Invalid request data. Please ensure all fields are correct.', type: ErrorFieldsSwagger})
  @ApiResponse({status: 201, description: 'User successfully created. The response may contain additional details or errors.'})
  async register(@Body() dto: RegisterDto, @Res() res) {
    const user = await this.authService.register(dto, res);
    return res.status(HttpStatus.CREATED).json(user);
  }

  @isPublic()
  @Post('login')
  @ApiOperation({summary: 'Logs the user in and returns user data in a cookie.'})
  @ApiResponse({status: 200, description: 'User successfully logged in.', type: UserResponseSwagger})
  @ApiResponse({status: 400, description: 'Invalid request data. Please ensure all fields are correct.', type: ErrorFieldsSwagger})
  @ApiResponse({status: 401, description: 'Incorrect password. Please check your credentials and try again.', type: ErrorDefaultSwagger})
  @ApiResponse({status: 404, description: 'User not found. Please check the provided credentials.', type: ErrorDefaultSwagger})
  @ApiBody({type: LoginDto, description: 'The request body must contain the user registration details.'})
  @UsePipes(new ValidationPipe({whitelist: true, transform: true}))
  async login(@Res() res: ExpressResponse, @Body() dto: LoginDto) {
    const user = await this.authService.login(dto, res);
    return res.status(HttpStatus.OK).json(user);
  }

  @Get('logout')
  @ApiOperation({summary: 'Log out user and clear session cookies.', description: 'Clears the authentication session by deleting the session cookie.'})
  @ApiResponse({status: 200, description: 'User successfully logged out.'})
  async logout(@Res() res: ExpressResponse) {
    LogoutUser(res);
    return res.status(HttpStatus.OK).end();
  }

  @isPublic()
  @Get('google')
  @ApiOperation({summary: 'Authenticate user via Google and return session data'})
  @ApiResponse({status: 200, description: 'User successfully authenticated via Google. Session data returned.'})
  @ApiResponse({status: 400, description: 'Failed Google authentication. User may be logged out or session expired.'})
  @ApiQuery({name: 'code', required: true, description: 'Authorization code provided by Google after user grants permissions.'})
  async google(@Res() res: ExpressResponse, @Req() req: ExpressRequest) {
    await this.authService.google(res, req);
  }

  @Get('me')
  @ApiOperation({summary: 'capture user session and return via body'})
  @ApiResponse({status: 200, description: 'data captured and returned.'})
  @ApiResponse({status: 400, description: 'logged out user.'})
  async getMe(@Res() res: ExpressResponse, @Req() req: ExpressRequest, @User() user) {
    return res.status(HttpStatus.OK).json(user);
  }

  @isPublic()
  @Post('forgot-password')
  @ApiOperation({summary: 'Request a password reset link for the user.', description: 'This endpoint allows users to request a password reset link by providing their registered email address. If the email is valid and associated with an account, a password reset link will be sent to that email.'})
  @ApiResponse({status: 200, description: 'Password reset link sent successfully.'})
  @ApiResponse({status: 400, description: 'Invalid request data. Please ensure all fields are correct.', type: ErrorFieldsSwagger})
  @ApiResponse({status: 404, description: 'No account found associated with the provided email.', type: ErrorDefaultSwagger})
  @ApiResponse({status: 500, description: 'An internal server error occurred.'})
  @ApiBody({type: ForgotPasswordUserDto, description: "The request body should contain the user's email address in the format: { email: string }."})
  @UsePipes(new ValidationPipe({whitelist: true, transform: true}))
  async forgotPassword(@Res() res: ExpressResponse, @Body() dto: ForgotPasswordUserDto) {
    await this.authService.forgotPassword(res, dto.email);
  }

  @isPublic()
  @Post('reset-password')
  @ApiOperation({summary: "Reset the user's password using a token.", description: 'This endpoint allows users to reset their password by providing a valid token and a new password. The token must match the email associated with the account.'})
  @ApiResponse({status: 200, description: 'Password reset successfully.'})
  @ApiResponse({status: 400, description: 'Invalid request data. Please ensure all fields are correct.', type: ErrorFieldsSwagger})
  @ApiResponse({status: 406, description: 'The provided token is expired, invalid, or the email does not match.'})
  @ApiResponse({status: 500, description: 'An internal server error occurred.'})
  @ApiBody({type: ResetPasswordUserDto, description: 'The request body should contain the reset token and new password in the format: { token: string, email: string, password: string }.'})
  async resetPassword(@Res() res: ExpressResponse, @Body() dto: ResetPasswordUserDto) {
    await this.authService.resetPassword(res, dto);
  }
}

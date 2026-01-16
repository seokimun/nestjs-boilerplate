import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const GoogleOAuthSwagger = {
  Contoller: () => applyDecorators(),

  GoogleLogin: () =>
    applyDecorators(
      ApiOperation({
        summary: 'Google OAuth Login',
        description: 'Use in a browser, not Swagger Try it out.',
      }),
      ApiResponse({
        status: 302,
        description: 'Redirect to Google OAuth',
      }),
    ),

  GoogleLoginCallback: () =>
    applyDecorators(
      ApiOperation({
        summary: 'Google OAuth callback',
        description: 'Returns JWT access token after successful login.',
      }),
      ApiResponse({
        status: 200,
        schema: {
          type: 'string',
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....',
        },
        description: 'JWT issued',
      }),
    ),
};

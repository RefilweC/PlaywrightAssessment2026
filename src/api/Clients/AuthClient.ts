import type { APIRequestContext, APIResponse } from '@playwright/test';
import { API_BASE_URL } from '../api-config';
import type { LoginRequest } from '../Models/ApiRequests';
import type { LoginResponse } from '../Models/ApiResponses';

export class AuthClient {
	constructor(
		private readonly request: APIRequestContext,
		private readonly baseUrl = API_BASE_URL,
	) {}

	login(credentials: LoginRequest): Promise<APIResponse> {
		return this.request.post(`${this.baseUrl}/login`, { data: credentials });
	}

	async getAccessToken(response: APIResponse): Promise<string> {
		const body = (await response.json()) as LoginResponse;
		const token =
			body.token ??
			body.accessToken ??
			body.access_token ??
			body.data?.token ??
			body.data?.accessToken ??
			body.data?.access_token;

		if (typeof token !== 'string' || token.trim().length === 0) {
			throw new Error('Login response did not contain a non-empty access token.');
		}

		return token;
	}
}

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import type { APIRequestContext, APIResponse } from '@playwright/test';
import { API_BASE_URL } from '../api-config';
import type { ProfilePictureUploadRequest } from '../Models/ApiRequests';

export class ProfileClient {
	constructor(
		private readonly request: APIRequestContext,
		private readonly baseUrl = API_BASE_URL,
	) {}

	getProfile(accessToken: string): Promise<APIResponse> {
		return this.request.get(`${this.baseUrl}/profile`, {
			headers: this.authorizationHeaders(accessToken),
		});
	}

	async updateProfilePicture(
		accessToken: string,
		upload: ProfilePictureUploadRequest,
	): Promise<APIResponse> {
		const filePath = path.resolve(upload.filePath);
		const fileBuffer = await readFile(filePath);

		return this.request.post(`${this.baseUrl}/profile/image`, {
			multipart: {
				profileImage: {
					name: path.basename(filePath),
					mimeType: 'image/png',
					buffer: fileBuffer,
				},
			},
			headers: this.authorizationHeaders(accessToken),
		});
	}

	private authorizationHeaders(accessToken: string): Record<string, string> {
		return { Authorization: `Bearer ${accessToken}` };
	}
}

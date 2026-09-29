export interface ApiEnvelope<T = unknown> {
	success?: boolean;
	message?: string;
	data?: T;
}

export interface LoginResponse extends ApiEnvelope {
	token?: string;
	accessToken?: string;
	access_token?: string;
	data?: {
		token?: string;
		accessToken?: string;
		access_token?: string;
	};
}

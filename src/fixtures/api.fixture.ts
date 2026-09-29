import { test as base, expect } from '@playwright/test';
import { AuthClient } from '../api/Clients/AuthClient';
import { ProfileClient } from '../api/Clients/ProfileClient';

type ApiFixtures = {
	authClient: AuthClient;
	profileClient: ProfileClient;
};

export const test = base.extend<ApiFixtures>({
	authClient: async ({ request }, use) => {
		await use(new AuthClient(request));
	},
	profileClient: async ({ request }, use) => {
		await use(new ProfileClient(request));
	},
});

export { expect };

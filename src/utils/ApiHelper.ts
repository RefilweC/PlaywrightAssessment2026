import { APIResponse, expect } from '@playwright/test';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type EndpointExpectation = {
  name: string;
  method: HttpMethod;
  url: string;
  expectedStatusCodes: number[];
};

export async function assertResponseCode(
  response: APIResponse,
  endpointName: string,
): Promise<void> {
  const actualStatus = response.status();
  const responseBody = await response.text();

  expect(actualStatus, `${endpointName} returned ${actualStatus} (${response.statusText()}). Body: ${responseBody}`).toBe(200);
}

export async function getBearerToken(response: APIResponse): Promise<string> {
  const body: unknown = await response.json();
  const root = body as Record<string, unknown>;
  const data = root.data as Record<string, unknown> | undefined;
  const token = root.token ?? root.accessToken ?? root.access_token ?? data?.token ?? data?.accessToken ?? data?.access_token;

  expect(token, 'Login response did not contain a bearer token').toEqual(expect.any(String));
  return token as string;
}

export function buildEndpointList(): EndpointExpectation[] {
  return [
    {
      name: 'login',
      method: 'POST',
      url: 'https://www.ndosiautomation.co.za/APIDEV/login',
      expectedStatusCodes: [200],
    },
    {
      name: 'get user profile',
      method: 'GET',
      url: 'https://www.ndosiautomation.co.za/APIDEV/profile',
      expectedStatusCodes: [200],
    },
    {
      name: 'update profile picture',
      method: 'POST',
      url: 'https://www.ndosiautomation.co.za/APIDEV/profile/image',
      expectedStatusCodes: [200],
    },
  ];
}

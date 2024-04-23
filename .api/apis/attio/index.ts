import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core'
import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from './openapi.json';

class SDK {
  spec: Oas;
  core: APICore;

  constructor() {
    this.spec = Oas.init(definition);
    this.core = new APICore(this.spec, 'attio/2.0.0 (api/6.1.1)');
  }

  /**
   * Optionally configure various options that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
   * should be represented in milliseconds.
   */
  config(config: ConfigOptions) {
    this.core.setConfig(config);
  }

  /**
   * If the API you're using requires authentication you can supply the required credentials
   * through this method and the library will magically determine how they should be used
   * within your API request.
   *
   * With the exception of OpenID and MutualTLS, it supports all forms of authentication
   * supported by the OpenAPI specification.
   *
   * @example <caption>HTTP Basic auth</caption>
   * sdk.auth('username', 'password');
   *
   * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
   * sdk.auth('myBearerToken');
   *
   * @example <caption>API Keys</caption>
   * sdk.auth('myApiKey');
   *
   * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
   * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
   * @param values Your auth credentials for the API; can specify up to two strings or numbers.
   */
  auth(...values: string[] | number[]) {
    this.core.setAuth(...values);
    return this;
  }

  /**
   * If the API you're using offers alternate server URLs, and server variables, you can tell
   * the SDK which one to use with this method. To use it you can supply either one of the
   * server URLs that are contained within the OpenAPI definition (along with any server
   * variables), or you can pass it a fully qualified URL to use (that may or may not exist
   * within the OpenAPI definition).
   *
   * @example <caption>Server URL with server variables</caption>
   * sdk.server('https://{region}.api.example.com/{basePath}', {
   *   name: 'eu',
   *   basePath: 'v14',
   * });
   *
   * @example <caption>Fully qualified server URL</caption>
   * sdk.server('https://eu.api.example.com/v14');
   *
   * @param url Server URL
   * @param variables An object of variables to replace into the server URL.
   */
  server(url: string, variables = {}) {
    this.core.setServer(url, variables);
  }

  /**
   * Lists person records, with the option to filter and sort results.
   *
   * Required scopes: `record_permission:read`, `object_configuration:read`.
   *
   * @summary List person records 
   * @throws FetchError<400, types.PostV2ObjectsPeopleRecordsQueryResponse400> Bad Request
   * @throws FetchError<404, types.PostV2ObjectsPeopleRecordsQueryResponse404> Not Found
   */
  postV2ObjectsPeopleRecordsQuery(body: types.PostV2ObjectsPeopleRecordsQueryBodyParam): Promise<FetchResponse<200, types.PostV2ObjectsPeopleRecordsQueryResponse200>> {
    return this.core.fetch('/v2/objects/people/records/query', 'post', body);
  }

  /**
   * Creates a new person Record. This endpoint will throw on conflicts of unique attributes,
   * like `email_addresses`. If you would prefer to update person records on conflicts,
   * please use the Assert person record endpoint instead. Please note, the `avatar_url`
   * attribute cannot currently be set via the API.
   *
   * Required scopes: `record_permission:read-write`, `object_configuration:read`.
   *
   * @summary Create a person Record
   * @throws FetchError<400, types.PostV2ObjectsPeopleRecordsResponse400> Bad Request
   * @throws FetchError<404, types.PostV2ObjectsPeopleRecordsResponse404> Not Found
   */
  postV2ObjectsPeopleRecords(body: types.PostV2ObjectsPeopleRecordsBodyParam): Promise<FetchResponse<200, types.PostV2ObjectsPeopleRecordsResponse200>> {
    return this.core.fetch('/v2/objects/people/records', 'post', body);
  }

  /**
   * Use this endpoint to create or update person records, using a unique attribute to search
   * for existing People (for example the `email_addresses` attribute). If a person is found
   * with the same value for the matching attribute, that person will be updated. If no
   * person with the same value for the matching attribute is found, a new person will be
   * created instead. If you would like to avoid matching, please use the Create person
   * endpoint.
   *
   *
   * If the matching attribute is a multiselect attribute, new values will be added and
   * existing values will not be deleted. For any other multiselect attribute, all values
   * will be either created or deleted as necessary to match the list of supplied values.
   *
   * Required scopes: `record_permission:read-write`, `object_configuration:read`.
   *
   * @summary Assert a person Record
   * @throws FetchError<400, types.PutV2ObjectsPeopleRecordsResponse400> Bad Request
   * @throws FetchError<404, types.PutV2ObjectsPeopleRecordsResponse404> Not Found
   */
  putV2ObjectsPeopleRecords(body: types.PutV2ObjectsPeopleRecordsBodyParam, metadata: types.PutV2ObjectsPeopleRecordsMetadataParam): Promise<FetchResponse<200, types.PutV2ObjectsPeopleRecordsResponse200>> {
    return this.core.fetch('/v2/objects/people/records', 'put', body, metadata);
  }

  /**
   * Gets a single person record by its `record_id`.
   *
   * Required scopes: `record_permission:read`, `object_configuration:read`.
   *
   * @summary Get a person Record
   * @throws FetchError<404, types.GetV2ObjectsPeopleRecordsRecordIdResponse404> Not Found
   */
  getV2ObjectsPeopleRecordsRecord_id(metadata: types.GetV2ObjectsPeopleRecordsRecordIdMetadataParam): Promise<FetchResponse<200, types.GetV2ObjectsPeopleRecordsRecordIdResponse200>> {
    return this.core.fetch('/v2/objects/people/records/{record_id}', 'get', metadata);
  }

  /**
   * Use this endpoint to update person records by `record_id`. If the update payload
   * includes multiselect attributes, the values supplied will be created and prepended to
   * the list of values that already exist (if any). Use the [Assert person
   * endpoint](/reference/put_v2-objects-people-records) to overwrite or remove multiselect
   * attribute values. Please note, the `avatar_url` attribute cannot currently be updated
   * via the API.
   *
   * Required scopes: `record_permission:read-write`, `object_configuration:read`.
   *
   * @summary Update a person Record
   * @throws FetchError<400, types.PatchV2ObjectsPeopleRecordsRecordIdResponse400> Bad Request
   * @throws FetchError<404, types.PatchV2ObjectsPeopleRecordsRecordIdResponse404> Not Found
   */
  patchV2ObjectsPeopleRecordsRecord_id(body: types.PatchV2ObjectsPeopleRecordsRecordIdBodyParam, metadata: types.PatchV2ObjectsPeopleRecordsRecordIdMetadataParam): Promise<FetchResponse<200, types.PatchV2ObjectsPeopleRecordsRecordIdResponse200>> {
    return this.core.fetch('/v2/objects/people/records/{record_id}', 'patch', body, metadata);
  }

  /**
   * Deletes a single person record by ID.
   *
   * Required scopes: `object_configuration:read`, `record_permission:read-write`.
   *
   * @summary Delete a person Record
   * @throws FetchError<404, types.DeleteV2ObjectsPeopleRecordsRecordIdResponse404> Not Found
   */
  deleteV2ObjectsPeopleRecordsRecord_id(metadata: types.DeleteV2ObjectsPeopleRecordsRecordIdMetadataParam): Promise<FetchResponse<200, types.DeleteV2ObjectsPeopleRecordsRecordIdResponse200>> {
    return this.core.fetch('/v2/objects/people/records/{record_id}', 'delete', metadata);
  }

  /**
   * Gets all values for a given attribute on a person Record. If the attribute is historic,
   * this endpoint has the ability to return all historic values using the `show_historic`
   * query param.
   *
   * Required scopes: `record_permission:read`, `object_configuration:read`.
   *
   * @summary List person record attribute values
   * @throws FetchError<400, types.GetV2ObjectsPeopleRecordsRecordIdAttributesAttributeValuesResponse400> Bad Request
   * @throws FetchError<404, types.GetV2ObjectsPeopleRecordsRecordIdAttributesAttributeValuesResponse404> Not Found
   */
  getV2ObjectsPeopleRecordsRecord_idAttributesAttributeValues(metadata: types.GetV2ObjectsPeopleRecordsRecordIdAttributesAttributeValuesMetadataParam): Promise<FetchResponse<200, types.GetV2ObjectsPeopleRecordsRecordIdAttributesAttributeValuesResponse200>> {
    return this.core.fetch('/v2/objects/people/records/{record_id}/attributes/{attribute}/values', 'get', metadata);
  }

  /**
   * List all entries, across all lists, for which this person record is the parent.
   *
   * Required scopes: `record_permission:read`, `object_configuration:read`,
   * `list_entry:read`.
   *
   * @summary List person record entries
   */
  getV2ObjectsPeopleRecordsRecord_idEntries(metadata: types.GetV2ObjectsPeopleRecordsRecordIdEntriesMetadataParam): Promise<FetchResponse<200, types.GetV2ObjectsPeopleRecordsRecordIdEntriesResponse200>> {
    return this.core.fetch('/v2/objects/people/records/{record_id}/entries', 'get', metadata);
  }

  /**
   * Lists company records, with the option to filter and sort results.
   *
   * Required scopes: `record_permission:read`, `object_configuration:read`.
   *
   * @summary List company records
   * @throws FetchError<400, types.PostV2ObjectsCompaniesRecordsQueryResponse400> Bad Request
   * @throws FetchError<404, types.PostV2ObjectsCompaniesRecordsQueryResponse404> Not Found
   */
  postV2ObjectsCompaniesRecordsQuery(body: types.PostV2ObjectsCompaniesRecordsQueryBodyParam): Promise<FetchResponse<200, types.PostV2ObjectsCompaniesRecordsQueryResponse200>> {
    return this.core.fetch('/v2/objects/companies/records/query', 'post', body);
  }

  /**
   * Creates a new company record. This endpoint will throw on conflicts of unique
   * attributes, like `domains`. If you would prefer to update company records on conflicts,
   * please use the Assert company record endpoint instead. Please note, the `logo_url`
   * attribute cannot currently be set via the API.
   *
   * Required scopes: `record_permission:read-write`, `object_configuration:read`.
   *
   * @summary Create a company record
   * @throws FetchError<400, types.PostV2ObjectsCompaniesRecordsResponse400> Bad Request
   * @throws FetchError<404, types.PostV2ObjectsCompaniesRecordsResponse404> Not Found
   */
  postV2ObjectsCompaniesRecords(body: types.PostV2ObjectsCompaniesRecordsBodyParam): Promise<FetchResponse<200, types.PostV2ObjectsCompaniesRecordsResponse200>> {
    return this.core.fetch('/v2/objects/companies/records', 'post', body);
  }

  /**
   * Use this endpoint to create or update company records, using a unique attribute to
   * search for existing companies (for example, the `domains` attribute). If a company is
   * found with the same value for the matching attribute, that company will be updated. If
   * no company with the same value for the matching attribute is found, a new company will
   * be created instead. If you would like to avoid matching, please use the Create company
   * endpoint.
   *
   *
   * If the matching attribute is a multiselect attribute, new values will be added and
   * existing values will not be deleted. For any other multiselect attribute, all values
   * will be either created or deleted as necessary to match the list of supplied values.
   *
   * Required scopes: `record_permission:read-write`, `object_configuration:read`.
   *
   * @summary Assert a company record
   * @throws FetchError<400, types.PutV2ObjectsCompaniesRecordsResponse400> Bad Request
   * @throws FetchError<404, types.PutV2ObjectsCompaniesRecordsResponse404> Not Found
   */
  putV2ObjectsCompaniesRecords(body: types.PutV2ObjectsCompaniesRecordsBodyParam, metadata: types.PutV2ObjectsCompaniesRecordsMetadataParam): Promise<FetchResponse<200, types.PutV2ObjectsCompaniesRecordsResponse200>> {
    return this.core.fetch('/v2/objects/companies/records', 'put', body, metadata);
  }

  /**
   * Gets a single company record by its `record_id`.
   *
   * Required scopes: `record_permission:read`, `object_configuration:read`.
   *
   * @summary Get a company record
   * @throws FetchError<404, types.GetV2ObjectsCompaniesRecordsRecordIdResponse404> Not Found
   */
  getV2ObjectsCompaniesRecordsRecord_id(metadata: types.GetV2ObjectsCompaniesRecordsRecordIdMetadataParam): Promise<FetchResponse<200, types.GetV2ObjectsCompaniesRecordsRecordIdResponse200>> {
    return this.core.fetch('/v2/objects/companies/records/{record_id}', 'get', metadata);
  }

  /**
   * Use this endpoint to update company records by `record_id`. If the update payload
   * includes multiselect attributes, the values supplied will be created and prepended to
   * the list of values that already exist (if any). Use the [Assert company
   * endpoint](/reference/put_v2-objects-companies-records) to overwrite or remove
   * multiselect attribute values. Please note, the `logo_url` attribute cannot currently be
   * updated via the API.
   *
   * Required scopes: `record_permission:read-write`, `object_configuration:read`.
   *
   * @summary Update a company record
   * @throws FetchError<400, types.PatchV2ObjectsCompaniesRecordsRecordIdResponse400> Bad Request
   * @throws FetchError<404, types.PatchV2ObjectsCompaniesRecordsRecordIdResponse404> Not Found
   */
  patchV2ObjectsCompaniesRecordsRecord_id(body: types.PatchV2ObjectsCompaniesRecordsRecordIdBodyParam, metadata: types.PatchV2ObjectsCompaniesRecordsRecordIdMetadataParam): Promise<FetchResponse<200, types.PatchV2ObjectsCompaniesRecordsRecordIdResponse200>> {
    return this.core.fetch('/v2/objects/companies/records/{record_id}', 'patch', body, metadata);
  }

  /**
   * Deletes a single company record by ID.
   *
   * Required scopes: `object_configuration:read`, `record_permission:read-write`.
   *
   * @summary Delete a company record
   * @throws FetchError<404, types.DeleteV2ObjectsCompaniesRecordsRecordIdResponse404> Not Found
   */
  deleteV2ObjectsCompaniesRecordsRecord_id(metadata: types.DeleteV2ObjectsCompaniesRecordsRecordIdMetadataParam): Promise<FetchResponse<200, types.DeleteV2ObjectsCompaniesRecordsRecordIdResponse200>> {
    return this.core.fetch('/v2/objects/companies/records/{record_id}', 'delete', metadata);
  }

  /**
   * Gets all values for a given attribute on a company record. If the attribute is historic,
   * this endpoint has the ability to return all historic values using the `show_historic`
   * query param.
   *
   * Required scopes: `record_permission:read`, `object_configuration:read`.
   *
   * @summary List company record attribute values
   * @throws FetchError<400, types.GetV2ObjectsCompaniesRecordsRecordIdAttributesAttributeValuesResponse400> Bad Request
   * @throws FetchError<404, types.GetV2ObjectsCompaniesRecordsRecordIdAttributesAttributeValuesResponse404> Not Found
   */
  getV2ObjectsCompaniesRecordsRecord_idAttributesAttributeValues(metadata: types.GetV2ObjectsCompaniesRecordsRecordIdAttributesAttributeValuesMetadataParam): Promise<FetchResponse<200, types.GetV2ObjectsCompaniesRecordsRecordIdAttributesAttributeValuesResponse200>> {
    return this.core.fetch('/v2/objects/companies/records/{record_id}/attributes/{attribute}/values', 'get', metadata);
  }

  /**
   * List all entries, across all lists, for which this company record is the parent.
   *
   * Required scopes: `record_permission:read`, `object_configuration:read`,
   * `list_entry:read`.
   *
   * @summary List company record entries
   */
  getV2ObjectsCompaniesRecordsRecord_idEntries(metadata: types.GetV2ObjectsCompaniesRecordsRecordIdEntriesMetadataParam): Promise<FetchResponse<200, types.GetV2ObjectsCompaniesRecordsRecordIdEntriesResponse200>> {
    return this.core.fetch('/v2/objects/companies/records/{record_id}/entries', 'get', metadata);
  }

  /**
   * Lists user records, with the option to filter and sort results.
   *
   * Required scopes: `record_permission:read`, `object_configuration:read`.
   *
   * @summary List user records
   * @throws FetchError<400, types.PostV2ObjectsUsersRecordsQueryResponse400> Bad Request
   * @throws FetchError<404, types.PostV2ObjectsUsersRecordsQueryResponse404> Not Found
   */
  postV2ObjectsUsersRecordsQuery(body: types.PostV2ObjectsUsersRecordsQueryBodyParam): Promise<FetchResponse<200, types.PostV2ObjectsUsersRecordsQueryResponse200>> {
    return this.core.fetch('/v2/objects/users/records/query', 'post', body);
  }

  /**
   * Creates a new user record. This endpoint will throw on conflicts of unique attributes,
   * like `primary_email_address`. If you would prefer to update user records on conflicts,
   * please use the Assert user record endpoint instead. Please note, the `avatar_url`
   * attribute cannot currently be set via the API.
   *
   * Required scopes: `record_permission:read-write`, `object_configuration:read`.
   *
   * @summary Create a user record
   * @throws FetchError<400, types.PostV2ObjectsUsersRecordsResponse400> Bad Request
   * @throws FetchError<404, types.PostV2ObjectsUsersRecordsResponse404> Not Found
   */
  postV2ObjectsUsersRecords(body: types.PostV2ObjectsUsersRecordsBodyParam): Promise<FetchResponse<200, types.PostV2ObjectsUsersRecordsResponse200>> {
    return this.core.fetch('/v2/objects/users/records', 'post', body);
  }

  /**
   * Use this endpoint to create or update user records, using a unique attribute to search
   * for existing users (for example the `primary_email_address` attribute). If a user is
   * found with the same value for the matching attribute, that user will be updated,
   * otherwise a new user will be created instead. If the matching attribute is a multiselect
   * attribute, new values will be added and existing values will not be deleted. For any
   * other multiselect attribute, all values will be either created or deleted as necessary
   * to match the list of supplied values.
   *
   * Required scopes: `record_permission:read-write`, `object_configuration:read`.
   *
   * @summary Assert a user record
   * @throws FetchError<400, types.PutV2ObjectsUsersRecordsResponse400> Bad Request
   * @throws FetchError<404, types.PutV2ObjectsUsersRecordsResponse404> Not Found
   */
  putV2ObjectsUsersRecords(body: types.PutV2ObjectsUsersRecordsBodyParam, metadata: types.PutV2ObjectsUsersRecordsMetadataParam): Promise<FetchResponse<200, types.PutV2ObjectsUsersRecordsResponse200>> {
    return this.core.fetch('/v2/objects/users/records', 'put', body, metadata);
  }

  /**
   * Gets a single user record by its `record_id`.
   *
   * Required scopes: `record_permission:read`, `object_configuration:read`.
   *
   * @summary Get a user record
   * @throws FetchError<404, types.GetV2ObjectsUsersRecordsRecordIdResponse404> Not Found
   */
  getV2ObjectsUsersRecordsRecord_id(metadata: types.GetV2ObjectsUsersRecordsRecordIdMetadataParam): Promise<FetchResponse<200, types.GetV2ObjectsUsersRecordsRecordIdResponse200>> {
    return this.core.fetch('/v2/objects/users/records/{record_id}', 'get', metadata);
  }

  /**
   * Use this endpoint to update user records by `record_id`. If the update payload includes
   * multiselect attributes, the values supplied will be created and prepended to the list of
   * values that already exist (if any). Use the [Assert user
   * endpoint](/reference/put_v2-objects-users-records) to overwrite or remove multiselect
   * attribute values. Please note, the `avatar_url` attribute cannot currently be updated
   * via the API.
   *
   * Required scopes: `record_permission:read-write`, `object_configuration:read`.
   *
   * @summary Update a user Record
   * @throws FetchError<400, types.PatchV2ObjectsUsersRecordsRecordIdResponse400> Bad Request
   * @throws FetchError<404, types.PatchV2ObjectsUsersRecordsRecordIdResponse404> Not Found
   */
  patchV2ObjectsUsersRecordsRecord_id(body: types.PatchV2ObjectsUsersRecordsRecordIdBodyParam, metadata: types.PatchV2ObjectsUsersRecordsRecordIdMetadataParam): Promise<FetchResponse<200, types.PatchV2ObjectsUsersRecordsRecordIdResponse200>> {
    return this.core.fetch('/v2/objects/users/records/{record_id}', 'patch', body, metadata);
  }

  /**
   * Deletes a single user record by ID.
   *
   * Required scopes: `object_configuration:read`, `record_permission:read-write`.
   *
   * @summary Delete a user record
   * @throws FetchError<404, types.DeleteV2ObjectsUsersRecordsRecordIdResponse404> Not Found
   */
  deleteV2ObjectsUsersRecordsRecord_id(metadata: types.DeleteV2ObjectsUsersRecordsRecordIdMetadataParam): Promise<FetchResponse<200, types.DeleteV2ObjectsUsersRecordsRecordIdResponse200>> {
    return this.core.fetch('/v2/objects/users/records/{record_id}', 'delete', metadata);
  }

  /**
   * Gets all values for a given attribute on a user record. If the attribute is historic,
   * this endpoint has the ability to return all historic values using the `show_historic`
   * query param.
   *
   * Required scopes: `record_permission:read`, `object_configuration:read`.
   *
   * @summary List user record attribute values
   * @throws FetchError<400, types.GetV2ObjectsUsersRecordsRecordIdAttributesAttributeValuesResponse400> Bad Request
   * @throws FetchError<404, types.GetV2ObjectsUsersRecordsRecordIdAttributesAttributeValuesResponse404> Not Found
   */
  getV2ObjectsUsersRecordsRecord_idAttributesAttributeValues(metadata: types.GetV2ObjectsUsersRecordsRecordIdAttributesAttributeValuesMetadataParam): Promise<FetchResponse<200, types.GetV2ObjectsUsersRecordsRecordIdAttributesAttributeValuesResponse200>> {
    return this.core.fetch('/v2/objects/users/records/{record_id}/attributes/{attribute}/values', 'get', metadata);
  }

  /**
   * List all entries, across all lists, for which this user record is the parent.
   *
   * Required scopes: `record_permission:read`, `object_configuration:read`,
   * `list_entry:read`.
   *
   * @summary List user record entries
   */
  getV2ObjectsUsersRecordsRecord_idEntries(metadata: types.GetV2ObjectsUsersRecordsRecordIdEntriesMetadataParam): Promise<FetchResponse<200, types.GetV2ObjectsUsersRecordsRecordIdEntriesResponse200>> {
    return this.core.fetch('/v2/objects/users/records/{record_id}/entries', 'get', metadata);
  }

  /**
   * Use this endpoint to create or update deal records, using a unique attribute to search
   * for existing deals. By default, deals do not have a unique attribute, so you should add
   * your own attribute with a unique constraint to use this API. If a deal is found with the
   * same value for the matching attribute, that deal will be updated, otherwise a new deal
   * will be created instead. If the matching attribute is a multiselect attribute, new
   * values will be added and existing values will not be deleted. For any other multiselect
   * attribute, all values will be either created or deleted as necessary to match the list
   * of supplied values.
   *
   * Required scopes: `record_permission:read-write`, `object_configuration:read`.
   *
   * @summary Assert a deal record
   * @throws FetchError<400, types.PutV2ObjectsDealsRecordsResponse400> Bad Request
   * @throws FetchError<404, types.PutV2ObjectsDealsRecordsResponse404> Not Found
   */
  putV2ObjectsDealsRecords(body: types.PutV2ObjectsDealsRecordsBodyParam, metadata: types.PutV2ObjectsDealsRecordsMetadataParam): Promise<FetchResponse<200, types.PutV2ObjectsDealsRecordsResponse200>> {
    return this.core.fetch('/v2/objects/deals/records', 'put', body, metadata);
  }

  /**
   * Creates a new deal record. This endpoint will throw on conflicts of unique attributes,
   * if defined. If you would prefer to update deal records on conflicts, please use the
   * Assert deal record endpoint instead.
   *
   * Required scopes: `record_permission:read-write`, `object_configuration:read`.
   *
   * @summary Create a deal record
   * @throws FetchError<400, types.PostV2ObjectsDealsRecordsResponse400> Bad Request
   * @throws FetchError<404, types.PostV2ObjectsDealsRecordsResponse404> Not Found
   */
  postV2ObjectsDealsRecords(body: types.PostV2ObjectsDealsRecordsBodyParam): Promise<FetchResponse<200, types.PostV2ObjectsDealsRecordsResponse200>> {
    return this.core.fetch('/v2/objects/deals/records', 'post', body);
  }

  /**
   * Deletes a single deal record by ID.
   *
   * Required scopes: `object_configuration:read`, `record_permission:read-write`.
   *
   * @summary Delete a deal record
   * @throws FetchError<404, types.DeleteV2ObjectsDealsRecordsRecordIdResponse404> Not Found
   */
  deleteV2ObjectsDealsRecordsRecord_id(metadata: types.DeleteV2ObjectsDealsRecordsRecordIdMetadataParam): Promise<FetchResponse<200, types.DeleteV2ObjectsDealsRecordsRecordIdResponse200>> {
    return this.core.fetch('/v2/objects/deals/records/{record_id}', 'delete', metadata);
  }

  /**
   * Gets a single deal record by its `record_id`.
   *
   * Required scopes: `record_permission:read`, `object_configuration:read`.
   *
   * @summary Get a deal record
   * @throws FetchError<404, types.GetV2ObjectsDealsRecordsRecordIdResponse404> Not Found
   */
  getV2ObjectsDealsRecordsRecord_id(metadata: types.GetV2ObjectsDealsRecordsRecordIdMetadataParam): Promise<FetchResponse<200, types.GetV2ObjectsDealsRecordsRecordIdResponse200>> {
    return this.core.fetch('/v2/objects/deals/records/{record_id}', 'get', metadata);
  }

  /**
   * Use this endpoint to update deal records by `record_id`. If the update payload includes
   * multiselect attributes, the values supplied will be created and prepended to the list of
   * values that already exist (if any). Use the [Assert deal
   * endpoint](/reference/put_v2-objects-deals-records) to overwrite or remove multiselect
   * attribute values.
   *
   * Required scopes: `record_permission:read-write`, `object_configuration:read`.
   *
   * @summary Update a deal record
   * @throws FetchError<400, types.PatchV2ObjectsDealsRecordsRecordIdResponse400> Bad Request
   * @throws FetchError<404, types.PatchV2ObjectsDealsRecordsRecordIdResponse404> Not Found
   */
  patchV2ObjectsDealsRecordsRecord_id(body: types.PatchV2ObjectsDealsRecordsRecordIdBodyParam, metadata: types.PatchV2ObjectsDealsRecordsRecordIdMetadataParam): Promise<FetchResponse<200, types.PatchV2ObjectsDealsRecordsRecordIdResponse200>> {
    return this.core.fetch('/v2/objects/deals/records/{record_id}', 'patch', body, metadata);
  }

  /**
   * Gets all values for a given attribute on a deal record. If the attribute is historic,
   * this endpoint has the ability to return all historic values using the `show_historic`
   * query param.
   *
   * Required scopes: `record_permission:read`, `object_configuration:read`.
   *
   * @summary List deal record attribute values
   * @throws FetchError<400, types.GetV2ObjectsDealsRecordsRecordIdAttributesAttributeValuesResponse400> Bad Request
   * @throws FetchError<404, types.GetV2ObjectsDealsRecordsRecordIdAttributesAttributeValuesResponse404> Not Found
   */
  getV2ObjectsDealsRecordsRecord_idAttributesAttributeValues(metadata: types.GetV2ObjectsDealsRecordsRecordIdAttributesAttributeValuesMetadataParam): Promise<FetchResponse<200, types.GetV2ObjectsDealsRecordsRecordIdAttributesAttributeValuesResponse200>> {
    return this.core.fetch('/v2/objects/deals/records/{record_id}/attributes/{attribute}/values', 'get', metadata);
  }

  /**
   * List all entries, across all lists, for which this deal record is the parent.
   *
   * Required scopes: `record_permission:read`, `object_configuration:read`,
   * `list_entry:read`.
   *
   * @summary List deal record entries
   */
  getV2ObjectsDealsRecordsRecord_idEntries(metadata: types.GetV2ObjectsDealsRecordsRecordIdEntriesMetadataParam): Promise<FetchResponse<200, types.GetV2ObjectsDealsRecordsRecordIdEntriesResponse200>> {
    return this.core.fetch('/v2/objects/deals/records/{record_id}/entries', 'get', metadata);
  }

  /**
   * Lists deal records, with the option to filter and sort results.
   *
   * Required scopes: `record_permission:read`, `object_configuration:read`.
   *
   * @summary List deal records
   * @throws FetchError<400, types.PostV2ObjectsDealsRecordsQueryResponse400> Bad Request
   * @throws FetchError<404, types.PostV2ObjectsDealsRecordsQueryResponse404> Not Found
   */
  postV2ObjectsDealsRecordsQuery(body: types.PostV2ObjectsDealsRecordsQueryBodyParam): Promise<FetchResponse<200, types.PostV2ObjectsDealsRecordsQueryResponse200>> {
    return this.core.fetch('/v2/objects/deals/records/query', 'post', body);
  }

  /**
   * Use this endpoint to create or update workspace records, using a unique attribute to
   * search for existing workspaces (for example the `workspace_id` attribute). If a
   * workspace is found with the same value for the matching attribute, that workspace will
   * be updated, otherwise a new workspace will be created instead. If the matching attribute
   * is a multiselect attribute, new values will be added and existing values will not be
   * deleted. For any other multiselect attribute, all values will be either created or
   * deleted as necessary to match the list of supplied values.
   *
   * Required scopes: `record_permission:read-write`, `object_configuration:read`.
   *
   * @summary Assert a workspace record
   * @throws FetchError<400, types.PutV2ObjectsWorkspacesRecordsResponse400> Bad Request
   * @throws FetchError<404, types.PutV2ObjectsWorkspacesRecordsResponse404> Not Found
   */
  putV2ObjectsWorkspacesRecords(body: types.PutV2ObjectsWorkspacesRecordsBodyParam, metadata: types.PutV2ObjectsWorkspacesRecordsMetadataParam): Promise<FetchResponse<200, types.PutV2ObjectsWorkspacesRecordsResponse200>> {
    return this.core.fetch('/v2/objects/workspaces/records', 'put', body, metadata);
  }

  /**
   * Creates a new workspace record. This endpoint will throw on conflicts of unique
   * attributes, like `workspace_id`. If you would prefer to update workspace records on
   * conflicts, please use the Assert workspace record endpoint instead.
   *
   * Required scopes: `record_permission:read-write`, `object_configuration:read`.
   *
   * @summary Create a workspace record
   * @throws FetchError<400, types.PostV2ObjectsWorkspacesRecordsResponse400> Bad Request
   * @throws FetchError<404, types.PostV2ObjectsWorkspacesRecordsResponse404> Not Found
   */
  postV2ObjectsWorkspacesRecords(body: types.PostV2ObjectsWorkspacesRecordsBodyParam): Promise<FetchResponse<200, types.PostV2ObjectsWorkspacesRecordsResponse200>> {
    return this.core.fetch('/v2/objects/workspaces/records', 'post', body);
  }

  /**
   * Deletes a single workspace record by ID.
   *
   * Required scopes: `object_configuration:read`, `record_permission:read-write`.
   *
   * @summary Delete a workspace record
   * @throws FetchError<404, types.DeleteV2ObjectsWorkspacesRecordsRecordIdResponse404> Not Found
   */
  deleteV2ObjectsWorkspacesRecordsRecord_id(metadata: types.DeleteV2ObjectsWorkspacesRecordsRecordIdMetadataParam): Promise<FetchResponse<200, types.DeleteV2ObjectsWorkspacesRecordsRecordIdResponse200>> {
    return this.core.fetch('/v2/objects/workspaces/records/{record_id}', 'delete', metadata);
  }

  /**
   * Gets a single workspace record by its `record_id`.
   *
   * Required scopes: `record_permission:read`, `object_configuration:read`.
   *
   * @summary Get a workspace record
   * @throws FetchError<404, types.GetV2ObjectsWorkspacesRecordsRecordIdResponse404> Not Found
   */
  getV2ObjectsWorkspacesRecordsRecord_id(metadata: types.GetV2ObjectsWorkspacesRecordsRecordIdMetadataParam): Promise<FetchResponse<200, types.GetV2ObjectsWorkspacesRecordsRecordIdResponse200>> {
    return this.core.fetch('/v2/objects/workspaces/records/{record_id}', 'get', metadata);
  }

  /**
   * Use this endpoint to update workspace records by `record_id`. If the update payload
   * includes multiselect attributes, the values supplied will be created and prepended to
   * the list of values that already exist (if any). Use the [Assert workspace
   * endpoint](/reference/put_v2-objects-workspaces-records) to overwrite or remove
   * multiselect attribute values.
   *
   * Required scopes: `record_permission:read-write`, `object_configuration:read`.
   *
   * @summary Update a workspace Record
   * @throws FetchError<400, types.PatchV2ObjectsWorkspacesRecordsRecordIdResponse400> Bad Request
   * @throws FetchError<404, types.PatchV2ObjectsWorkspacesRecordsRecordIdResponse404> Not Found
   */
  patchV2ObjectsWorkspacesRecordsRecord_id(body: types.PatchV2ObjectsWorkspacesRecordsRecordIdBodyParam, metadata: types.PatchV2ObjectsWorkspacesRecordsRecordIdMetadataParam): Promise<FetchResponse<200, types.PatchV2ObjectsWorkspacesRecordsRecordIdResponse200>> {
    return this.core.fetch('/v2/objects/workspaces/records/{record_id}', 'patch', body, metadata);
  }

  /**
   * Gets all values for a given attribute on a workspace record. If the attribute is
   * historic, this endpoint has the ability to return all historic values using the
   * `show_historic` query param.
   *
   * Required scopes: `record_permission:read`, `object_configuration:read`.
   *
   * @summary List workspace record attribute values
   * @throws FetchError<400, types.GetV2ObjectsWorkspacesRecordsRecordIdAttributesAttributeValuesResponse400> Bad Request
   * @throws FetchError<404, types.GetV2ObjectsWorkspacesRecordsRecordIdAttributesAttributeValuesResponse404> Not Found
   */
  getV2ObjectsWorkspacesRecordsRecord_idAttributesAttributeValues(metadata: types.GetV2ObjectsWorkspacesRecordsRecordIdAttributesAttributeValuesMetadataParam): Promise<FetchResponse<200, types.GetV2ObjectsWorkspacesRecordsRecordIdAttributesAttributeValuesResponse200>> {
    return this.core.fetch('/v2/objects/workspaces/records/{record_id}/attributes/{attribute}/values', 'get', metadata);
  }

  /**
   * List all entries, across all lists, for which this workspace record is the parent.
   *
   * Required scopes: `record_permission:read`, `object_configuration:read`,
   * `list_entry:read`.
   *
   * @summary List workspace record entries
   */
  getV2ObjectsWorkspacesRecordsRecord_idEntries(metadata: types.GetV2ObjectsWorkspacesRecordsRecordIdEntriesMetadataParam): Promise<FetchResponse<200, types.GetV2ObjectsWorkspacesRecordsRecordIdEntriesResponse200>> {
    return this.core.fetch('/v2/objects/workspaces/records/{record_id}/entries', 'get', metadata);
  }

  /**
   * Lists workspace records, with the option to filter and sort results.
   *
   * Required scopes: `record_permission:read`, `object_configuration:read`.
   *
   * @summary List workspace records
   * @throws FetchError<400, types.PostV2ObjectsWorkspacesRecordsQueryResponse400> Bad Request
   * @throws FetchError<404, types.PostV2ObjectsWorkspacesRecordsQueryResponse404> Not Found
   */
  postV2ObjectsWorkspacesRecordsQuery(body: types.PostV2ObjectsWorkspacesRecordsQueryBodyParam): Promise<FetchResponse<200, types.PostV2ObjectsWorkspacesRecordsQueryResponse200>> {
    return this.core.fetch('/v2/objects/workspaces/records/query', 'post', body);
  }
}

const createSDK = (() => { return new SDK(); })()
;

export default createSDK;

export type { DeleteV2ObjectsCompaniesRecordsRecordIdMetadataParam, DeleteV2ObjectsCompaniesRecordsRecordIdResponse200, DeleteV2ObjectsCompaniesRecordsRecordIdResponse404, DeleteV2ObjectsDealsRecordsRecordIdMetadataParam, DeleteV2ObjectsDealsRecordsRecordIdResponse200, DeleteV2ObjectsDealsRecordsRecordIdResponse404, DeleteV2ObjectsPeopleRecordsRecordIdMetadataParam, DeleteV2ObjectsPeopleRecordsRecordIdResponse200, DeleteV2ObjectsPeopleRecordsRecordIdResponse404, DeleteV2ObjectsUsersRecordsRecordIdMetadataParam, DeleteV2ObjectsUsersRecordsRecordIdResponse200, DeleteV2ObjectsUsersRecordsRecordIdResponse404, DeleteV2ObjectsWorkspacesRecordsRecordIdMetadataParam, DeleteV2ObjectsWorkspacesRecordsRecordIdResponse200, DeleteV2ObjectsWorkspacesRecordsRecordIdResponse404, GetV2ObjectsCompaniesRecordsRecordIdAttributesAttributeValuesMetadataParam, GetV2ObjectsCompaniesRecordsRecordIdAttributesAttributeValuesResponse200, GetV2ObjectsCompaniesRecordsRecordIdAttributesAttributeValuesResponse400, GetV2ObjectsCompaniesRecordsRecordIdAttributesAttributeValuesResponse404, GetV2ObjectsCompaniesRecordsRecordIdEntriesMetadataParam, GetV2ObjectsCompaniesRecordsRecordIdEntriesResponse200, GetV2ObjectsCompaniesRecordsRecordIdMetadataParam, GetV2ObjectsCompaniesRecordsRecordIdResponse200, GetV2ObjectsCompaniesRecordsRecordIdResponse404, GetV2ObjectsDealsRecordsRecordIdAttributesAttributeValuesMetadataParam, GetV2ObjectsDealsRecordsRecordIdAttributesAttributeValuesResponse200, GetV2ObjectsDealsRecordsRecordIdAttributesAttributeValuesResponse400, GetV2ObjectsDealsRecordsRecordIdAttributesAttributeValuesResponse404, GetV2ObjectsDealsRecordsRecordIdEntriesMetadataParam, GetV2ObjectsDealsRecordsRecordIdEntriesResponse200, GetV2ObjectsDealsRecordsRecordIdMetadataParam, GetV2ObjectsDealsRecordsRecordIdResponse200, GetV2ObjectsDealsRecordsRecordIdResponse404, GetV2ObjectsPeopleRecordsRecordIdAttributesAttributeValuesMetadataParam, GetV2ObjectsPeopleRecordsRecordIdAttributesAttributeValuesResponse200, GetV2ObjectsPeopleRecordsRecordIdAttributesAttributeValuesResponse400, GetV2ObjectsPeopleRecordsRecordIdAttributesAttributeValuesResponse404, GetV2ObjectsPeopleRecordsRecordIdEntriesMetadataParam, GetV2ObjectsPeopleRecordsRecordIdEntriesResponse200, GetV2ObjectsPeopleRecordsRecordIdMetadataParam, GetV2ObjectsPeopleRecordsRecordIdResponse200, GetV2ObjectsPeopleRecordsRecordIdResponse404, GetV2ObjectsUsersRecordsRecordIdAttributesAttributeValuesMetadataParam, GetV2ObjectsUsersRecordsRecordIdAttributesAttributeValuesResponse200, GetV2ObjectsUsersRecordsRecordIdAttributesAttributeValuesResponse400, GetV2ObjectsUsersRecordsRecordIdAttributesAttributeValuesResponse404, GetV2ObjectsUsersRecordsRecordIdEntriesMetadataParam, GetV2ObjectsUsersRecordsRecordIdEntriesResponse200, GetV2ObjectsUsersRecordsRecordIdMetadataParam, GetV2ObjectsUsersRecordsRecordIdResponse200, GetV2ObjectsUsersRecordsRecordIdResponse404, GetV2ObjectsWorkspacesRecordsRecordIdAttributesAttributeValuesMetadataParam, GetV2ObjectsWorkspacesRecordsRecordIdAttributesAttributeValuesResponse200, GetV2ObjectsWorkspacesRecordsRecordIdAttributesAttributeValuesResponse400, GetV2ObjectsWorkspacesRecordsRecordIdAttributesAttributeValuesResponse404, GetV2ObjectsWorkspacesRecordsRecordIdEntriesMetadataParam, GetV2ObjectsWorkspacesRecordsRecordIdEntriesResponse200, GetV2ObjectsWorkspacesRecordsRecordIdMetadataParam, GetV2ObjectsWorkspacesRecordsRecordIdResponse200, GetV2ObjectsWorkspacesRecordsRecordIdResponse404, PatchV2ObjectsCompaniesRecordsRecordIdBodyParam, PatchV2ObjectsCompaniesRecordsRecordIdMetadataParam, PatchV2ObjectsCompaniesRecordsRecordIdResponse200, PatchV2ObjectsCompaniesRecordsRecordIdResponse400, PatchV2ObjectsCompaniesRecordsRecordIdResponse404, PatchV2ObjectsDealsRecordsRecordIdBodyParam, PatchV2ObjectsDealsRecordsRecordIdMetadataParam, PatchV2ObjectsDealsRecordsRecordIdResponse200, PatchV2ObjectsDealsRecordsRecordIdResponse400, PatchV2ObjectsDealsRecordsRecordIdResponse404, PatchV2ObjectsPeopleRecordsRecordIdBodyParam, PatchV2ObjectsPeopleRecordsRecordIdMetadataParam, PatchV2ObjectsPeopleRecordsRecordIdResponse200, PatchV2ObjectsPeopleRecordsRecordIdResponse400, PatchV2ObjectsPeopleRecordsRecordIdResponse404, PatchV2ObjectsUsersRecordsRecordIdBodyParam, PatchV2ObjectsUsersRecordsRecordIdMetadataParam, PatchV2ObjectsUsersRecordsRecordIdResponse200, PatchV2ObjectsUsersRecordsRecordIdResponse400, PatchV2ObjectsUsersRecordsRecordIdResponse404, PatchV2ObjectsWorkspacesRecordsRecordIdBodyParam, PatchV2ObjectsWorkspacesRecordsRecordIdMetadataParam, PatchV2ObjectsWorkspacesRecordsRecordIdResponse200, PatchV2ObjectsWorkspacesRecordsRecordIdResponse400, PatchV2ObjectsWorkspacesRecordsRecordIdResponse404, PostV2ObjectsCompaniesRecordsBodyParam, PostV2ObjectsCompaniesRecordsQueryBodyParam, PostV2ObjectsCompaniesRecordsQueryResponse200, PostV2ObjectsCompaniesRecordsQueryResponse400, PostV2ObjectsCompaniesRecordsQueryResponse404, PostV2ObjectsCompaniesRecordsResponse200, PostV2ObjectsCompaniesRecordsResponse400, PostV2ObjectsCompaniesRecordsResponse404, PostV2ObjectsDealsRecordsBodyParam, PostV2ObjectsDealsRecordsQueryBodyParam, PostV2ObjectsDealsRecordsQueryResponse200, PostV2ObjectsDealsRecordsQueryResponse400, PostV2ObjectsDealsRecordsQueryResponse404, PostV2ObjectsDealsRecordsResponse200, PostV2ObjectsDealsRecordsResponse400, PostV2ObjectsDealsRecordsResponse404, PostV2ObjectsPeopleRecordsBodyParam, PostV2ObjectsPeopleRecordsQueryBodyParam, PostV2ObjectsPeopleRecordsQueryResponse200, PostV2ObjectsPeopleRecordsQueryResponse400, PostV2ObjectsPeopleRecordsQueryResponse404, PostV2ObjectsPeopleRecordsResponse200, PostV2ObjectsPeopleRecordsResponse400, PostV2ObjectsPeopleRecordsResponse404, PostV2ObjectsUsersRecordsBodyParam, PostV2ObjectsUsersRecordsQueryBodyParam, PostV2ObjectsUsersRecordsQueryResponse200, PostV2ObjectsUsersRecordsQueryResponse400, PostV2ObjectsUsersRecordsQueryResponse404, PostV2ObjectsUsersRecordsResponse200, PostV2ObjectsUsersRecordsResponse400, PostV2ObjectsUsersRecordsResponse404, PostV2ObjectsWorkspacesRecordsBodyParam, PostV2ObjectsWorkspacesRecordsQueryBodyParam, PostV2ObjectsWorkspacesRecordsQueryResponse200, PostV2ObjectsWorkspacesRecordsQueryResponse400, PostV2ObjectsWorkspacesRecordsQueryResponse404, PostV2ObjectsWorkspacesRecordsResponse200, PostV2ObjectsWorkspacesRecordsResponse400, PostV2ObjectsWorkspacesRecordsResponse404, PutV2ObjectsCompaniesRecordsBodyParam, PutV2ObjectsCompaniesRecordsMetadataParam, PutV2ObjectsCompaniesRecordsResponse200, PutV2ObjectsCompaniesRecordsResponse400, PutV2ObjectsCompaniesRecordsResponse404, PutV2ObjectsDealsRecordsBodyParam, PutV2ObjectsDealsRecordsMetadataParam, PutV2ObjectsDealsRecordsResponse200, PutV2ObjectsDealsRecordsResponse400, PutV2ObjectsDealsRecordsResponse404, PutV2ObjectsPeopleRecordsBodyParam, PutV2ObjectsPeopleRecordsMetadataParam, PutV2ObjectsPeopleRecordsResponse200, PutV2ObjectsPeopleRecordsResponse400, PutV2ObjectsPeopleRecordsResponse404, PutV2ObjectsUsersRecordsBodyParam, PutV2ObjectsUsersRecordsMetadataParam, PutV2ObjectsUsersRecordsResponse200, PutV2ObjectsUsersRecordsResponse400, PutV2ObjectsUsersRecordsResponse404, PutV2ObjectsWorkspacesRecordsBodyParam, PutV2ObjectsWorkspacesRecordsMetadataParam, PutV2ObjectsWorkspacesRecordsResponse200, PutV2ObjectsWorkspacesRecordsResponse400, PutV2ObjectsWorkspacesRecordsResponse404 } from './types';

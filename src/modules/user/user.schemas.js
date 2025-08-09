import S from 'fluent-json-schema'

const tags = ['users']

export const usersScheme = {
	tags,
	querystring: S.object()
		.prop('page', S.integer().minimum(1).default(1))
		.prop('limit', S.integer().minimum(1).maximum(100).default(3))
		.prop('sortBy', S.string().enum(['username', 'firstName', 'lastName', 'birthdate']).default('username'))
		.prop('sortOrder', S.string().enum(['asc', 'desc']).default('asc'))
		.prop('search', S.string().default(''))
		.prop('birthdateFrom', S.string())
		.prop('birthdateTo', S.string()),
};

export const deleteUserScheme = {
	tags,
	param: S.object()
		.prop('id', S.string().required()),
}

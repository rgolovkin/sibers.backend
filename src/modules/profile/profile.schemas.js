import S from 'fluent-json-schema'

const tags = ['profile']

export const profileScheme = {
	tags,
};

export const getUserProfileScheme = {
	tags,
	params: S.object()
		.prop('id', S.string().required())
};

export const editProfileSchema = {
	tags,
	query: S.object()
	.prop('id', S.string()),
	body: S.object()
		.prop('firstName', S.string().minLength(1).maxLength(100).required())
		.prop('lastName', S.string().minLength(1).maxLength(100).required())
		.prop('gender', S.string().enum(['MALE', 'FEMALE', 'OTHER']).required())
}

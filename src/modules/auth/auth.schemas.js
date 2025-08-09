import S from 'fluent-json-schema';

const tags = ['auth']

export const registerSchema = {
		tags,
		body: S.object()
				.prop('username', S.string().minLength(3).maxLength(50).required())
				.prop('password', S.string().minLength(6).maxLength(100).required())
				.prop('firstName', S.string().minLength(1).maxLength(100).required())
				.prop('lastName', S.string().minLength(1).maxLength(100).required())
				.prop('gender', S.string().enum(['MALE', 'FEMALE', 'OTHER']).required())
				.prop('birthdate', S.string().format('date').required()),
};

export const loginSchema = {
		tags,
		body: S.object()
				.prop('username', S.string().minLength(3).maxLength(50).required())
				.prop('password', S.string().minLength(6).maxLength(100).required())
}

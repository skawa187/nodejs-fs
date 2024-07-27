const createPostValidation = {
    title: {
        notEmpty: {
            errorMessage: 'Post should have a title',
        },
        isString: {
            errorMessage: 'Title must be a string',
        },
        isLength: {
            options: {
                min: 3,
            },
            errorMessage: 'Provide a title longer than 3 characters',
        },
    }
}

export {createPostValidation};
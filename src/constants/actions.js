export const actions = [
    {
        name: 'login',
        reqParams: ['source']
    },

    {
        name: 'confirm',
        reqParams: ['source', 'paymentnumber']
    },

    {
        name: 'sign',
        reqParams: ['source', 'documentid']
    }
]
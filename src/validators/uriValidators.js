import { actions } from '../constants/actions.js'
import { parameters } from '../constants/parameters.js'
import { isUuid } from '../helpers/isUuid.js'

export const validateUriParameters = (uriAction, uriParameters) => {

    // Get the list of parameters required for the action
    const { reqParams } = actions.find(action => action.name === uriAction)

    reqParams.forEach(reqParameter => {
        const { type } = parameters.find(parameter => parameter.name === reqParameter)
        const uriParameterValue = uriParameters[reqParameter]

        // Handle missing parameter / empty parameter value
        if (!uriParameterValue) {
            throw new Error(`Required parameter is missing: "${reqParameter}"`)
        }

        // Handle wrong parameter type
        if (type === 'UUID' && !isUuid(uriParameterValue)) {
            throw new Error(`Wrong format of UUID`)
        } else if (type !== 'UUID' && typeof uriParameterValue !== type) {
            throw new Error(`Wrong type of parameter: "${reqParameter}"`)
        }
    })
}

export const validateUriScheme = uriScheme => {
    if (uriScheme !== 'visma-identity') {
        throw new Error(`Wrong URI scheme "${uriScheme}"`)
    }
}

export const validateUriAction = uriAction => {
    if (!actions.find(action => action.name === uriAction)) {
        throw new Error(`Wrong action type "${uriAction}"`)
    }
}

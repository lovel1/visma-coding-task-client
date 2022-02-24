import { validateUriParameters, validateUriScheme, validateUriAction } from '../validators/uriValidators.js'

export class VismaIdentityRequest {

    constructor(uri) {
        
        // URI type validation
        if (typeof uri !== 'string') {
            throw new Error(`Wrong type of URI: ${typeof uri}`)
        }

        // Scheme initialization & validation
        this.scheme = uri.split('://')[0]
        validateUriScheme(this.scheme)

        // Action initialization & validation
        this.action = uri.split('://')[1].split('?')[0]
        validateUriAction(this.action)

        // Parameters initialization
        uri.split('?')[1].split('&').forEach(param => 
            this[param.split('=')[0]] = param.split('=')[1]
        )

        // Parameters validation
        validateUriParameters(this.action, this)
    }
}
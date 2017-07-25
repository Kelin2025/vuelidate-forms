import get from 'lodash/get'
import set from 'lodash/set'
import mapValues from 'lodash/mapValues'
import { buildObject, createDataFromSchema, createValidationsFromSchema } from './utils'

export default (Vue) => {
  Vue.mixin({
    data () {
      return !this.$options.forms
      ? {}
      : buildObject(this, createDataFromSchema)
    },
    beforeCreate () {
      if (!this.$options.forms) return {}
      this.$options.validations = buildObject(this, createValidationsFromSchema)
      let methods = {
        reset (name) {
          if (!get(this, name)) {
            console.warn(`[Vuelidate form] $forms.reset | Form ${name} not found`)
            return
          }
          set(
            this,
            name,
            createDataFromSchema(this.$options.forms[name])
          )
        },
        validate (name) {
          let validator = get(this.$v, name)
          if (!validator) {
            console.warn(`[Vuelidate form] $form.validate() | Validator ${name} not found`)
            return
          }
          return validator.$touch() || !validator.$invalid
        }
      }
      this.$forms = mapValues(methods, item => item.bind(this))
    }
  })
}

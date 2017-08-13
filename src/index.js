import get from 'lodash-es/get'
import set from 'lodash-es/set'
import mapValues from 'lodash-es/mapValues'
import { buildObject, createDataFromSchema, createValidationsFromSchema } from './utils'

export default (Vue) => {

  let methods = {
    // Set previous state to form
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
    // Check if form has errors
    validate (name) {
      let $v = get(this.$v, name)
      if (!$v) {
        console.warn(`[Vuelidate form] $form.validate() | Validator ${name} not found`)
        return
      }
      $v.$touch()
      set(this.$v, name, $v)
      return !$v.$invalid
    }
  }

  Vue.mixin({
    data () {
      return !this.$options.forms
      ? {}
      : buildObject(this, createDataFromSchema)
    },
    beforeCreate () {
      // Generate validations option
      if (this.$options.forms) {
        this.$options.validations = buildObject(this, createValidationsFromSchema)
      }
      // Default $forms.reset(name)
      this.$forms = mapValues(methods, item => item.bind(this))
      // Alternative style $form(name).reset()
      this.$form = name => mapValues(
        this.$forms,
        callback => (...args) => callback(name, ...args)
      )
    }
  })
}

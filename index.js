const fromPairs = pairs =>
  pairs.reduce((res, [key, value]) => {
    res[key] = value
    return res
  }, {})

/**
 * Generates data object from forms schema
 * @param {Object} forms Forms schema
 * @returns {Object} Data object
 */
const createData = forms =>
  Object.entries(forms).reduce((data, [key, item]) => {
    if (typeof item === "function") return data
    if (typeof item !== "object") return data
    if ("$value" in item) {
      data[key] = item.$value
      return data
    }
    if (item.$each) {
      data[key] =
        item.$value || item.$length
          ? new Array(item.$length).fill(createData(item.$each))
          : []
      return data
    }
    const tmp = createData(item)
    data[key] = !Object.keys(tmp).length
      ? null
      : "$value" in tmp
        ? tmp.$value
        : fromPairs(Object.entries(tmp).filter(([key]) => !key.startsWith("$")))
    return data
  }, {})

/**
 * Generates vuelidate schema from forms schema
 * @param {Object} forms Forms schema
 * @returns {Object} Vuelidate schema
 */
const createValidations = forms =>
  Object.entries(forms).reduce((validations, [key, item]) => {
    if (item === null) return validations
    if (typeof item === "function") {
      validations[key] = item
      return validations
    }
    if (typeof item === "object") {
      if (!Object.keys(item).length) {
        return validations
      }
      validations[key] = createValidations(item)
      return validations
    }
    return validations
  }, {})

const formMethods = {
  // Set previous state to form
  reset(name) {
    if (!(name in this)) {
      console.warn(`[vuelidate-forms.reset] Form ${name} not found`)
      return
    }
    this[name] = createData(this.$options.forms[name])
  },
  // Check if form has errors
  validate(name) {
    let $v = this.$v[name]
    if (!$v) {
      console.warn(`[vuelidate-forms.validate] Validator ${name} not found`)
      return
    }
    $v.$touch()
    return !$v.$invalid
  }
}

const VuelidateFormsMixin = {
  data() {
    return !this.$options.forms ? {} : createData(this.$options.forms)
  },
  beforeCreate() {
    if (this.$options.forms) {
      this.$options.validations = createValidations(this.$options.forms)
    }

    const bindedMethods = Object.entries(formMethods).map(pair => [
      pair[0],
      pair[1].bind(this)
    ])

    // Default $forms.reset(name)
    this.$forms = fromPairs(bindedMethods)

    // Alternative style $form(name).reset()
    this.$form = name =>
      fromPairs(
        bindedMethods.map(pair => [
          pair[0],
          (...args) => pair[1](formName, ...args)
        ])
      )
  }
}

module.exports = Vue => {
  Vue.mixin(VuelidateFormsMixin)
}

exports.createData = createData
exports.createValidations = createValidations
exports.VuelidateFormsMixin = VuelidateFormsMixin

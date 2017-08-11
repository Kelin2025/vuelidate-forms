import omitBy from 'lodash-es/omitBy'
import mapValues from 'lodash-es/mapValues'
import isFunction from 'lodash-es/isFunction'
import isPlainObject from 'lodash-es/isPlainObject'

// Get schemas from Vue instance
// convert schema declared as function to schema object
// map schemas with callback
export const buildObject = (vm, callback) => mapValues(
  vm.$options.forms,
  item => callback(
    isFunction(item)
    ? item.bind(vm)()
    : item
  )
)

// Convert schema object to data object
export const createDataFromSchema = form =>
  mapValues(
    omitBy(form, isFunction),
    item => {
      if (!isPlainObject(item)) return item
      if (item.$each) {
        return item.$value || []
      }
      let tmp = createDataFromSchema(item)
      return !Object.keys(tmp).length
        ? null
        : tmp.$value
          ? tmp.$value
          : omitBy(tmp, (item, key) => key.startsWith('$'))
    }
  )

// Convert schema object to validations object
export const createValidationsFromSchema = form =>
  omitBy(
    mapValues(
      form,
      item =>
        isPlainObject(item)
        ? createValidationsFromSchema(item)
        : isFunction(item)
          ? item
          : null
    ),
    item =>
      item === null ||
      (isPlainObject(item) && !Object.keys(item).length)
  )

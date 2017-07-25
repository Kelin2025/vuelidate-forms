import omitBy from 'lodash/omitBy'
import mapValues from 'lodash/mapValues'
import isFunction from 'lodash/isFunction'
import isPlainObject from 'lodash/isPlainObject'
import zipObjectDeep from 'lodash/zipObjectDeep'

// Get schemas from Vue instance
// convert schema declared as function to schema object
// map schemas with callback
const buildObject = (vm, callback) => mapValues(
  vm.$options.forms,
  item => callback(
    isFunction(item)
    ? item.bind(vm)()
    : item
  )
)

// Convert schema object to data object
const createDataFromSchema = form =>
  mapValues(
    omitBy(form, isFunction),
    item => {
      if (!isPlainObject(item)) return item
      if (item.$each) return []
      let tmp = createDataFromSchema(item)
      return !Object.keys(tmp).length
        ? null
        : tmp.$value
          ? tmp.$value
          : tmp
    }
  )

// Convert schema object to validations object
const createValidationsFromSchema = form =>
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

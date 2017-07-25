# Vuelidate-forms
Combine data object and validation schema in one declaration
## Installation
1. Install vuelidate and vuelidate-forms
```
npm install vuelidate vuelidate-forms
```
2. Import and write Vue.use
```javascript
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VuelidateForms from 'vuelidate-forms'

Vue.use(Vuelidate)
Vue.use(VuelidateForms)
```
## Usage
### Default fields
```javascript
new Vue({
  forms: {
    test: {
      field: {
        required
      },
      anotherField: {
        required,
        numeric
      }
    }
  }
})
```
Is equal to
```javascript
new Vue({
  data: {
    test: {
      field: null,
      anotherField: null
    }
  },
  validations: {
    field: { required },
    anotherField: { required, numeric }
  }
})
```
### Fields with default value
```javascript
new Vue({
  forms: {
    test: {
      field: 'test',
      anotherField: {
        required,
        numeric,
        $value: 5
      }
    }
  }
})
```
Is equal to
```javascript
new Vue({
  data: {
    test: {
      field: 'test',
      anotherField: 5
    }
  },
  validations: {
    anotherField: {
      required,
      numeric
    }
  }
})
```
### Array validation
```javascript
new Vue({
  forms: {
    test: {
      list: {
        minLength: minLength(5),
        $each: {
          field: {
            required
          },
          anotherField: {
            required,
            numeric
          }
        }
      }
    }
  }
})
```
Is equal to
```javascript
new Vue({
  data: {
    list: []
  },
  validations: {
    list: {
      minLength: minLength(5),
      $each: {
        field: {
          required
        },
        anotherField: {
          required,
          numeric
        }
      }
    }
  }
})
```
## TODO:
[] Finish plugin
[] Write tests

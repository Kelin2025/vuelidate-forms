# Vuelidate-forms
Combine data object and validation schema in one declaration  
[Vuelidate docs](https://monterail.github.io/vuelidate/)
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

Vue.use(VuelidateForms)
Vue.use(Vuelidate)
```
**Important**: you should connect VuelidateForms _before_ Vuelidate.
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
    test: {
      field: { required },
      anotherField: { required, numeric }
    }
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
    test: {
      anotherField: {
        required,
        numeric
      }
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
    test: {
      list: []
    }
  },
  validations: {
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
## TODO:
- [ ] Finish plugin
- [ ] Write tests

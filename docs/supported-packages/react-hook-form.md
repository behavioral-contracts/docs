---
title: react-hook-form
---

# react-hook-form

| Property | Value |
|----------|-------|
| **Package** | `react-hook-form` |
| **Versions Covered** | `^7.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | Mon Feb 23 2026 19:00:00 GMT-0500 (Eastern Standard Time) |
| **Maintainer** | behavioral-contracts |

## Installation

```bash
npm install react-hook-form
```

## Covered Functions

This contract covers 3 function(s):

### `handleSubmit()`

Form submission handler that validates form and executes onSubmit callback

**Import:**
```typescript
import { handleSubmit } from 'react-hook-form';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - async-submit-unhandled-error**

**Condition:** onSubmit callback is async and contains operations that can throw (API calls, database operations, etc.)
without try-catch wrapping


**Throws:** `UnhandledPromiseRejection`

**Required Handling:**

MUST wrap async operations in try-catch within onSubmit callback.

handleSubmit does NOT catch errors thrown inside onSubmit - errors will become unhandled promise rejections.

Correct pattern:
  const onSubmit = async (data) => {
    try {
      await apiCall(data);
      // success handling
    } catch (error) {
      // error handling (toast, setError, etc.)
    }
  };

Incorrect pattern:
  const onSubmit = async (data) => {
    await apiCall(data);  // ❌ No error handling
  };


📖 [Source](https://react-hook-form.com/docs/useform/handlesubmit)

**ℹ️ INFO - empty-catch-block-silent-failure**

**Condition:** WITHIN a handleSubmit onSubmit callback function, try-catch exists but catch block is empty,
only logs to console, or doesn't call setError/toast/user feedback mechanisms


**Throws:** `N/A (silent failure - users unaware of submission failure)`

**Required Handling:**

In form submission handlers (onSubmit callbacks), catch blocks MUST provide user feedback
about submission failures. This rule ONLY applies to react-hook-form submission contexts.

Users should be informed when form submission fails through:
- Toast notifications (toast.error, notification APIs)
- Form error state via setError()
- Alert/modal dialogs
- Form-level error display

Note: Backend logging code, utility functions, and non-form code should NOT trigger this rule.
This is specifically for user-facing form submission error handling.

Incorrect patterns (in onSubmit callbacks):
  catch (error) { }                           // ❌ Empty catch
  catch (error) { console.log(error); }       // ❌ Only logs (no user feedback)
  catch (error) { /* TODO: handle */ }        // ❌ No implementation

Correct patterns (in onSubmit callbacks):
  catch (error) {
    toast.error('Failed to submit form');     // ✅ User feedback
    setError('root', { message: error.message });
  }

Acceptable patterns (outside form contexts - should NOT trigger):
  // Logging code
  catch (error) { console.error('Log failed:', error); }  // ✅ OK for loggers

  // Backend/API code
  catch (error) { logger.error(error); }                  // ✅ OK for servers


📖 [Source](https://react-hook-form.com/advanced-usage)

**⚠️ WARNING - server-validation-error-not-displayed**

**Condition:** Server/API returns validation errors but setError() is not called to display them to users


**Throws:** `N/A (validation feedback missing)`

**Required Handling:**

MUST use setError() to display server validation errors to users.

When your API returns field-specific errors:
  const onSubmit = async (data) => {
    try {
      const response = await api.submit(data);
    } catch (error) {
      if (error.validationErrors) {
        Object.entries(error.validationErrors).forEach(([field, message]) => {
          setError(field, { type: 'manual', message });
        });
      }
    }
  };

For global/form-level errors:
  setError('root.serverError', {
    type: '400',
    message: 'Server validation failed'
  });


📖 [Source](https://react-hook-form.com/docs/useform/seterror)

---

### `useFormContext()`

Hook to access form context in deeply nested components

**Import:**
```typescript
import { useFormContext } from 'react-hook-form';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - missing-form-provider**

**Condition:** useFormContext() called in component tree without FormProvider wrapper

**Throws:** `TypeError`

**Required Handling:**

MUST wrap your form with FormProvider component before using useFormContext in child components.

useFormContext returns null when FormProvider is missing, causing TypeError when accessing properties.

Correct pattern:
  import { useForm, FormProvider, useFormContext } from 'react-hook-form';

  function ParentForm() {
    const methods = useForm();
    return (
      <FormProvider {...methods}>
        <form>
          <NestedComponent />
        </form>
      </FormProvider>
    );
  }

  function NestedComponent() {
    const { control, formState } = useFormContext(); // ✅ Safe
    return <input />;
  }

Incorrect pattern:
  function NestedComponent() {
    const { control } = useFormContext(); // ❌ Crashes if no provider
  }


📖 [Source](https://react-hook-form.com/docs/useformcontext)

**🔴 ERROR - useformcontext-property-access-error**

**Condition:** Destructuring properties from useFormContext without null check when FormProvider might be missing


**Throws:** `TypeError (Cannot destructure property 'X' of 'Object(...)' as it is null)`

**Required Handling:**

Check for null before accessing useFormContext properties, or ensure FormProvider is always present.

Defensive pattern:
  const methods = useFormContext();
  if (!methods) {
    throw new Error('Component must be used within FormProvider');
  }
  const { control, formState } = methods;

Or add runtime validation:
  const { control } = useFormContext() ?? {};
  if (!control) return null; // or throw error


📖 [Source](https://react-hook-form.com/docs/useformcontext)

---

### `useFieldArray()`

Hook to manage dynamic form field arrays

**Import:**
```typescript
import { useFieldArray } from 'react-hook-form';
```

#### Postconditions

What happens **after** calling this function:

**⚠️ WARNING - unhandled-field-array-operations**

**Condition:** Field array operations (append, remove, update) fail due to validation errors but error is not handled


**Throws:** `ValidationError`

**Required Handling:**

Handle validation errors when manipulating field arrays.

Field array operations respect validation rules. If adding/removing fields violates
validation (e.g., min/max array length), handle appropriately.

Example:
  const { append, fields } = useFieldArray({ name: 'items', control });

  const handleAdd = () => {
    try {
      append({ name: '', value: '' });
    } catch (error) {
      // Handle validation error
      toast.error('Cannot add more items');
    }
  };


📖 [Source](https://react-hook-form.com/docs/usefieldarray)

---

## Example: Proper Error Handling

```typescript
import react-hook-form from 'react-hook-form';

async function example() {
  try {
    const result = await handleSubmit(/* args */);
    // Handle success
    return result;
  } catch (error) {
    // Handle error according to contract postconditions
    console.error('Error:', error);
    throw error;
  }
}
```

## See Also

- [Contract Schema Reference](../contract-schema/schema-reference.md)
- [All Supported Packages](./overview.md)
- [How to Use verify-cli](../cli-reference/overview.md)
